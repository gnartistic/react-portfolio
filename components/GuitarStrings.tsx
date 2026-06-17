"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Standard tuning, low to high. Played top-to-bottom visually.
const NOTES = ["E2", "A2", "D3", "G3", "B3", "E4"];

// Open-position chord voicings (note per string, low→high; null = muted).
// Each strum advances to the next chord: C → D → Em → G → …
const CHORDS: { name: string; notes: (string | null)[] }[] = [
  { name: "C", notes: [null, "C3", "E3", "G3", "C4", "E4"] }, // x32010
  { name: "D", notes: [null, null, "D3", "A3", "D4", "F#4"] }, // xx0232
  { name: "Em", notes: ["E2", "B2", "E3", "G3", "B3", "E4"] }, // 022000
  { name: "G", notes: ["G2", "B2", "D3", "G3", "B3", "G4"] }, // 320003
];

type StringState = { amp: number; t: number; dir: number };

/**
 * Six pluckable strings. Moving the pointer across a string (or tab+enter /
 * click) plucks it: the line vibrates with a damped sine and a real note fires
 * via Tone.js. Audio is lazy-loaded on the first pluck (a user gesture, so no
 * autoplay) and can be muted. Vibration honors prefers-reduced-motion.
 */
export function GuitarStrings() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const states = useRef<StringState[]>(NOTES.map(() => ({ amp: 0, t: 0, dir: 1 })));
  const raf = useRef<number | null>(null);
  // One synth voice per string (real polyphony — a single PluckSynth is
  // monophonic and throws when two notes hit the same audio time).
  const voices = useRef<{ triggerAttackRelease: (n: string, d: string, t: number) => void; now: () => number }[] | null>(null);
  const voiceTime = useRef<number[]>(NOTES.map(() => 0)); // last scheduled time per voice
  const lastPlucked = useRef<number>(-1);
  const apprenticeChord = useRef(0); // cycles only for the apprentice's auto-strum

  const [muted, setMuted] = useState(true); // opt-in: sound off until enabled
  const [reduced, setReduced] = useState(false);

  const W = 1000;
  const H = 220;
  const gap = H / (NOTES.length + 1);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  // Lazy audio init — creates the voices and resumes the AudioContext. Must run
  // inside a real user gesture (browsers block audio that starts on hover).
  // Safe to call even when muted: it only builds the synth pool, never plays.
  const ensureSynth = useCallback(async () => {
    if (voices.current) return;
    const Tone = await import("tone");
    await Tone.start();
    if (voices.current) return; // guard against a concurrent init
    voices.current = NOTES.map(() => {
      const v = new Tone.PluckSynth({
        attackNoise: 1,
        dampening: 4000,
        resonance: 0.9,
      }).toDestination();
      v.volume.value = -8;
      return v;
    });
  }, []);

  // Pluck string `i`. `note === undefined` → open string; an explicit note plays
  // that pitch; `null` means muted (silent, no vibration — for chord voicings).
  const pluck = useCallback(
    (i: number, strength = 1, note?: string | null) => {
      if (i < 0 || i >= NOTES.length) return;
      const playNote = note === undefined ? NOTES[i] : note;
      if (!playNote) return; // muted string in this chord
      const s = states.current[i];
      s.amp = Math.min(18, 8 + strength * 10);
      s.t = 0;
      s.dir = Math.random() > 0.5 ? 1 : -1;
      if (!muted) {
        ensureSynth().then(() => {
          const v = voices.current?.[i];
          if (!v) return;
          // strictly-increasing start time per voice (Tone throws otherwise)
          const t = Math.max(v.now(), voiceTime.current[i] + 0.02);
          voiceTime.current[i] = t;
          v.triggerAttackRelease(playNote, "8n", t);
        });
      }
    },
    [muted, ensureSynth],
  );

  // Which chord a strum at horizontal position `clientX` sounds: the strings
  // are divided into quarters left→right, one chord each (C · D · Em · G).
  const chordForX = useCallback((clientX: number) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return CHORDS[0];
    const frac = (clientX - rect.left) / rect.width;
    const i = Math.max(0, Math.min(CHORDS.length - 1, Math.floor(frac * CHORDS.length)));
    return CHORDS[i];
  }, []);

  // Enable sound — runs inside the button click (a real gesture, so the browser
  // lets us start audio) and primes the synth so the next strum plays.
  const enableSound = useCallback(() => {
    setMuted(false);
    ensureSynth();
  }, [ensureSynth]);

  // The apprentice (command palette) auto-strum has no position → cycle chords.
  const strumChord = useCallback(() => {
    const c = CHORDS[apprenticeChord.current % CHORDS.length];
    c.notes.forEach((note, i) => setTimeout(() => pluck(i, 0.9, note), i * 90));
    apprenticeChord.current += 1;
  }, [pluck]);

  // The apprentice (command palette) can ask for a strum via a window event.
  useEffect(() => {
    window.addEventListener("apprentice:pluck", strumChord);
    return () => window.removeEventListener("apprentice:pluck", strumChord);
  }, [strumChord]);

  // Single rAF loop animates all six strings' damped vibration.
  useEffect(() => {
    if (reduced) return;
    let prev = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(48, now - prev);
      prev = now;
      states.current.forEach((s, i) => {
        const p = pathRefs.current[i];
        if (!p) return;
        const y = gap * (i + 1);
        if (s.amp > 0.05) {
          s.t += dt / 1000;
          // damped oscillation
          const env = Math.exp(-s.t * 6);
          const wobble = Math.sin(s.t * 60) * s.amp * env * s.dir;
          s.amp = 18 * env > 0.05 ? s.amp : s.amp * 0.96;
          p.setAttribute("d", `M0 ${y} Q ${W / 2} ${y + wobble} ${W} ${y}`);
          if (env < 0.01) {
            s.amp = 0;
            p.setAttribute("d", `M0 ${y} L ${W} ${y}`);
          }
        }
      });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [reduced, gap]);

  // Map pointer Y to the nearest string; each string sounds the chord for the
  // quarter the pointer is currently over (horizontal position picks the chord).
  const onPointerMove = (e: React.PointerEvent) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const ry = ((e.clientY - rect.top) / rect.height) * H;
    const idx = Math.round(ry / gap) - 1;
    if (idx >= 0 && idx < NOTES.length && Math.abs(ry - gap * (idx + 1)) < 14) {
      if (idx !== lastPlucked.current) {
        lastPlucked.current = idx;
        const strength = Math.min(1, Math.abs(e.movementY) / 12 + 0.3);
        pluck(idx, strength, chordForX(e.clientX).notes[idx]);
      }
    } else {
      lastPlucked.current = -1;
    }
  };

  // Single string tap — always sounds, using the chord for the tap's position,
  // falling back to the open note if that chord mutes the string. Keyboard
  // activation has no position, so it plays the open note.
  const tapString = (i: number, clientX?: number) => {
    if (clientX === undefined) {
      pluck(i, 1);
      return;
    }
    const note = chordForX(clientX).notes[i];
    pluck(i, 1, note ?? NOTES[i]);
  };

  return (
    <div className="w-full select-none">
      <div
        ref={wrapRef}
        onPointerMove={onPointerMove}
        onPointerLeave={() => (lastPlucked.current = -1)}
        onPointerUp={() => (lastPlucked.current = -1)}
        className="relative w-full cursor-crosshair"
        style={{ aspectRatio: `${W} / ${H}` }}
        role="group"
        aria-label="Interactive guitar strings — strum across them to play chords"
      >
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
          {NOTES.map((note, i) => {
            const y = gap * (i + 1);
            return (
              <g key={note}>
                {/* generous invisible hit area */}
                <line
                  x1={0}
                  y1={y}
                  x2={W}
                  y2={y}
                  stroke="transparent"
                  strokeWidth={gap * 0.8}
                  style={{ cursor: "crosshair" }}
                  tabIndex={0}
                  aria-label={`Pluck string ${i + 1}, note ${note}`}
                  onPointerDown={(e) => tapString(i, e.clientX)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      tapString(i);
                    }
                  }}
                />
                <path
                  ref={(el) => {
                    pathRefs.current[i] = el;
                  }}
                  d={`M0 ${y} L ${W} ${y}`}
                  fill="none"
                  stroke={i % 2 === 0 ? "var(--steel)" : "var(--ink-soft)"}
                  // low notes (top, e.g. E2) are the thick strings, like a real guitar
                  strokeWidth={1 + (NOTES.length - 1 - i) * 0.5}
                  strokeLinecap="round"
                  className="pointer-events-none"
                />
              </g>
            );
          })}
        </svg>
      </div>
      <button
        onClick={() => (muted ? enableSound() : setMuted(true))}
        className="mt-3 font-mono text-[11px] uppercase tracking-wider text-ink-soft hover:text-weld transition-colors"
        aria-pressed={!muted}
      >
        {muted ? "🔊 enable sound" : "🔊 sound on · strum me"}
      </button>
    </div>
  );
}
