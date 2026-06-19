"use client";

import { useEffect, useRef, useState } from "react";
import { toolkit } from "@/lib/content";

type Msg = { role: "you" | "ai"; text: string; tools?: string[] };

const GREETING: Msg = {
  role: "ai",
  text: "Hey — I'm Charles AI. Pick a topic and I'll tell you what he works with.",
};

export function WorkshopChat() {
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [typing, setTyping] = useState(false);
  const [asked, setAsked] = useState<Set<string>>(new Set());
  const threadRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep the thread pinned to the latest message (scrolls the panel, not the page).
  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  function ask(item: (typeof toolkit)[number]) {
    if (typing) return;
    setAsked((s) => new Set(s).add(item.group));
    setMessages((m) => [...m, { role: "you", text: item.prompt }]);
    setTyping(true);
    timer.current = setTimeout(() => {
      setMessages((m) => [...m, { role: "ai", text: item.reply, tools: item.tools }]);
      setTyping(false);
    }, 480);
  }

  return (
    <div className="rounded-2xl border border-line overflow-hidden bg-ink/[0.015] dark:bg-white/[0.02]">
      {/* header bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-line">
        <span className="h-2 w-2 rounded-full bg-weld animate-pulse" />
        <span className="font-mono text-xs uppercase tracking-wider text-ink">Charles AI</span>
        <span className="font-mono text-xs uppercase tracking-wider text-ink-soft">· skills</span>
      </div>

      {/* thread */}
      <div ref={threadRef} className="h-[340px] overflow-y-auto px-4 py-5 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "you" ? "flex justify-end" : "flex justify-start"}>
            <div
              className={
                m.role === "you"
                  ? "max-w-[80%] rounded-2xl rounded-br-sm bg-weld text-paper px-4 py-2.5"
                  : "max-w-[85%] rounded-2xl rounded-bl-sm border border-line bg-background px-4 py-2.5"
              }
            >
              <p className={m.role === "you" ? "" : "text-ink"}>{m.text}</p>
              {m.tools && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {m.tools.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[11px] uppercase tracking-wider text-steel border border-line rounded px-2 py-1 bg-background"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-sm border border-line bg-background px-4 py-3">
              <span className="flex gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-ink-soft animate-bounce [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-ink-soft animate-bounce [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-ink-soft animate-bounce" />
              </span>
            </div>
          </div>
        )}
      </div>

      {/* suggested prompts */}
      <div className="border-t border-line px-4 py-3">
        <p className="font-mono text-[10px] uppercase tracking-wider text-ink-soft mb-2.5">Suggested — tap a topic</p>
        <div className="flex flex-wrap gap-2">
          {toolkit.map((item) => (
            <button
              key={item.group}
              onClick={() => ask(item)}
              disabled={typing}
              className={`rounded-full border px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors disabled:opacity-50 ${
                asked.has(item.group)
                  ? "border-line text-ink-soft hover:text-weld hover:border-weld"
                  : "border-weld/40 text-weld hover:bg-weld hover:text-paper"
              }`}
            >
              {item.group}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
