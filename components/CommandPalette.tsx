"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { scriptedAgent, type AgentAction, type AgentReply } from "@/lib/agent-fallback";
import { agentSuggestions } from "@/lib/content";

function runAction(action: AgentAction) {
  if (action.type === "navigate") {
    const el = document.getElementById(action.target);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  } else if (action.type === "pluck") {
    document.getElementById("identity")?.scrollIntoView({ behavior: "smooth" });
    window.dispatchEvent(new CustomEvent("apprentice:pluck"));
  }
}

type Msg = { role: "you" | "ai"; text: string; degraded?: boolean };

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [log, setLog] = useState<Msg[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // ⌘K / Ctrl+K to toggle, Esc to close.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  const ask = useCallback(async (raw: string) => {
    const q = raw.trim();
    if (!q || busy) return;
    setInput("");
    setLog((l) => [...l, { role: "you", text: q }]);
    setBusy(true);

    let result: AgentReply & { degraded?: boolean };
    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ query: q }),
      });
      if (res.ok) {
        result = await res.json();
      } else {
        // 503 (no model configured) or error → scripted fallback on the client
        result = { ...scriptedAgent(q), degraded: true };
      }
    } catch {
      result = { ...scriptedAgent(q), degraded: true };
    }

    setLog((l) => [...l, { role: "ai", text: result.reply, degraded: result.degraded }]);
    setBusy(false);
    if (result.action) runAction(result.action);
  }, [busy]);

  return (
    <>
      {/* Trigger — fixed, unobtrusive */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border border-line bg-background/80 backdrop-blur px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-ink-soft shadow-sm hover:text-weld hover:border-weld transition-colors"
        aria-label="Ask Charles AI"
      >
        <span className="h-2 w-2 rounded-full bg-weld animate-pulse" />
        Ask Charles AI
        <kbd className="hidden sm:inline border border-line rounded px-1.5 py-0.5">⌘K</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[12vh] bg-ink/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="w-full max-w-xl rounded-2xl border border-line bg-background shadow-2xl overflow-hidden"
              initial={{ y: 16, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 8, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  ask(input);
                }}
                className="flex items-center gap-3 px-4 py-3.5 border-b border-line"
              >
                <span className="font-mono text-weld">›</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Charles — his work, security, the shop, AI…"
                  className="flex-1 bg-transparent outline-none text-ink placeholder:text-ink-soft font-sans"
                  aria-label="Ask Charles AI a question"
                />
                {busy && <span className="font-mono text-xs text-ink-soft animate-pulse">…</span>}
              </form>

              <div className="max-h-[40vh] overflow-y-auto px-4 py-3 space-y-3">
                {log.length === 0 ? (
                  <div className="space-y-1.5">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-ink-soft mb-2">Try asking</p>
                    {agentSuggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => ask(s)}
                        className="block w-full text-left rounded-lg px-3 py-2 text-ink hover:bg-weld/10 hover:text-weld transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                ) : (
                  log.map((m, i) => (
                    <div key={i} className={m.role === "you" ? "text-right" : ""}>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-ink-soft mb-0.5">
                        {m.role === "you" ? "you" : "apprentice"}
                      </p>
                      <p className={m.role === "you" ? "text-ink-soft" : "text-ink"}>{m.text}</p>
                    </div>
                  ))
                )}
              </div>

              <div className="px-4 py-2 border-t border-line flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-ink-soft">
                <span>↵ to send · esc to close</span>
                {log.some((m) => m.degraded) && <span title="AI offline — using scripted answers">offline mode</span>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
