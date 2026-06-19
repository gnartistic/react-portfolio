"use client";

import { useEffect, useRef, useState } from "react";
import { breachLevels, type BreachLevel } from "@/lib/breach";

type Msg = { role: "you" | "vault"; text: string; breached?: boolean; system?: boolean };

const STORAGE_KEY = "breach:v1";

type Saved = { solved: string[]; flags: Record<string, string> };

function loadSaved(): Saved {
  if (typeof window === "undefined") return { solved: [], flags: {} };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Saved;
  } catch {}
  return { solved: [], flags: {} };
}

export function BreachChallenge() {
  const [active, setActive] = useState<BreachLevel>(breachLevels[0]);
  const [logs, setLogs] = useState<Record<string, Msg[]>>({});
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [solved, setSolved] = useState<Set<string>>(new Set());
  const [flags, setFlags] = useState<Record<string, string>>({});
  const [showDefense, setShowDefense] = useState(false);
  const [total, setTotal] = useState<number | null>(null);

  const threadRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Restore progress + best-effort global breach count. Restoring after mount
  // (rather than in a lazy initializer) keeps SSR output empty and avoids a
  // localStorage hydration mismatch — the intended one-time-hydration pattern.
  useEffect(() => {
    const s = loadSaved();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage
    setSolved(new Set(s.solved));
    setFlags(s.flags ?? {});
    fetch("/api/breach")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && typeof d.total === "number" && setTotal(d.total))
      .catch(() => {});
  }, []);

  // Pin the thread to the latest line (scrolls the console, not the page).
  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [logs, active, busy]);

  const log = logs[active.key] ?? [];
  const isSolved = solved.has(active.key);

  function persist(nextSolved: Set<string>, nextFlags: Record<string, string>) {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ solved: [...nextSolved], flags: nextFlags }),
      );
    } catch {}
  }

  function push(key: string, msg: Msg) {
    setLogs((l) => ({ ...l, [key]: [...(l[key] ?? []), msg] }));
  }

  async function attempt(raw: string) {
    const text = raw.trim();
    if (!text || busy) return;
    const key = active.key;
    setInput("");
    push(key, { role: "you", text });
    setBusy(true);

    try {
      const res = await fetch("/api/breach", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ input: text, level: key }),
      });

      if (res.status === 429) {
        const d = await res.json().catch(() => ({}));
        push(key, { role: "vault", text: d.reply ?? "Rate limited — try again in a minute.", system: true });
      } else if (res.ok) {
        const d = await res.json();
        push(key, { role: "vault", text: d.reply, breached: d.breached });
        if (d.breached && d.flag) {
          const nextSolved = new Set(solved).add(key);
          const nextFlags = { ...flags, [key]: d.flag };
          setSolved(nextSolved);
          setFlags(nextFlags);
          persist(nextSolved, nextFlags);
          setTotal((t) => (t === null ? t : t + 1));
        }
      } else {
        push(key, {
          role: "vault",
          text: "The live model is offline right now — this challenge needs it running. Try again later.",
          system: true,
        });
      }
    } catch {
      push(key, { role: "vault", text: "Network error — try again.", system: true });
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  }

  return (
    <div className="rounded-2xl border border-line overflow-hidden bg-ink/[0.015] dark:bg-white/[0.02]">
      {/* level tabs */}
      <div className="flex flex-wrap gap-1.5 px-3 pt-3">
        {breachLevels.map((lvl) => {
          const done = solved.has(lvl.key);
          const isActive = lvl.key === active.key;
          return (
            <button
              key={lvl.key}
              onClick={() => setActive(lvl)}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
                isActive
                  ? "bg-weld text-paper"
                  : "text-ink-soft hover:text-weld border border-transparent hover:border-line"
              }`}
            >
              <span className="opacity-60">L{lvl.id}</span>
              {lvl.name}
              {done && <span aria-label="breached">🚩</span>}
            </button>
          );
        })}
      </div>

      {/* level tagline + defense toggle */}
      <div className="px-4 pt-3 pb-2">
        <p className="text-ink-soft text-sm">{active.tagline}</p>
        <button
          onClick={() => setShowDefense((s) => !s)}
          className="mt-2 font-mono text-[11px] uppercase tracking-wider text-steel hover:text-weld transition-colors"
        >
          {showDefense ? "− Hide the defense" : "+ How the defense works"}
        </button>
        {showDefense && (
          <ul className="mt-2 space-y-1.5 border-l-2 border-line pl-3">
            {active.defense.map((d, i) => (
              <li key={i} className="text-sm text-ink-soft">
                {d}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* trophy banner */}
      {isSolved && (
        <div className="mx-4 mb-1 rounded-lg border border-weld/50 bg-weld/10 px-4 py-3">
          <p className="font-mono text-[11px] uppercase tracking-wider text-weld mb-1">🚩 Breached</p>
          <code className="text-ink break-all text-sm">{flags[active.key]}</code>
        </div>
      )}

      {/* console header */}
      <div className="mt-2 flex items-center gap-2 px-4 py-3 border-y border-line bg-background/50">
        <span className={`h-2 w-2 rounded-full ${isSolved ? "bg-weld" : "bg-steel"} animate-pulse`} />
        <span className="font-mono text-xs uppercase tracking-wider text-ink">Vault</span>
        <span className="font-mono text-xs uppercase tracking-wider text-ink-soft">
          · {isSolved ? "compromised" : "guarding the flag"}
        </span>
      </div>

      {/* thread */}
      <div ref={threadRef} className="h-[300px] overflow-y-auto px-4 py-4 space-y-3 font-mono text-sm">
        {log.length === 0 && (
          <p className="text-ink-soft">
            Make the guardian leak its secret flag. Type an attempt below, or tap a starter.
          </p>
        )}
        {log.map((m, i) => (
          <div key={i}>
            <span
              className={`text-[10px] uppercase tracking-wider ${
                m.role === "you" ? "text-steel" : m.breached ? "text-weld" : "text-ink-soft"
              }`}
            >
              {m.role === "you" ? "you ›" : m.breached ? "vault › leaked 🚩" : "vault ›"}
            </span>
            <p className={`whitespace-pre-wrap break-words ${m.system ? "text-ink-soft italic" : "text-ink"}`}>
              {m.text}
            </p>
          </div>
        ))}
        {busy && <p className="text-ink-soft animate-pulse">vault › thinking…</p>}
      </div>

      {/* starters */}
      <div className="px-4 pb-2 flex flex-wrap gap-1.5">
        {active.starters.map((s) => (
          <button
            key={s}
            onClick={() => setInput(s)}
            disabled={busy}
            className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-ink-soft hover:text-weld hover:border-weld transition-colors disabled:opacity-40 max-w-full truncate"
            title={s}
          >
            {s}
          </button>
        ))}
      </div>

      {/* input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          attempt(input);
        }}
        className="flex items-center gap-3 px-4 py-3 border-t border-line"
      >
        <span className="font-mono text-weld">›</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Try to break level ${active.id} — ${active.hint}`}
          className="flex-1 bg-transparent outline-none text-ink placeholder:text-ink-soft font-mono text-sm"
          aria-label={`Prompt injection attempt for level ${active.id}`}
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          className="font-mono text-xs uppercase tracking-wider text-weld disabled:opacity-30 hover:underline"
        >
          send ↵
        </button>
      </form>

      {/* footer */}
      <div className="px-4 py-2 border-t border-line flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-ink-soft">
        <span>{solved.size}/3 levels breached</span>
        {total !== null && <span>{total} total breaches</span>}
      </div>
    </div>
  );
}
