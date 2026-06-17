"use client";

import { useState } from "react";

// A faux-terminal block showing an npm command with one-tap copy.
export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked — no-op */
    }
  }

  return (
    <button
      onClick={copy}
      className="group inline-flex items-center gap-3 rounded-lg border border-line bg-ink/[0.03] dark:bg-white/[0.03] px-4 py-3 font-mono text-sm text-ink hover:border-weld transition-colors"
      aria-label={`Copy: ${command}`}
    >
      <span className="text-weld select-none">$</span>
      <span>{command}</span>
      <span className="ml-1 text-[11px] uppercase tracking-wider text-ink-soft group-hover:text-weld transition-colors">
        {copied ? "copied ✓" : "copy"}
      </span>
    </button>
  );
}
