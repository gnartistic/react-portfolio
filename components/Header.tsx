"use client";

import { ThemeToggle } from "./ThemeToggle";

const NAV = [
  { id: "workshop", label: "Workshop" },
  { id: "lab", label: "Work" },
  { id: "contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-30 backdrop-blur-sm bg-background/70 border-b border-line/60">
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between px-6 md:px-12 h-14">
        <a
          href="#identity"
          className="font-display font-extrabold tracking-tight text-ink hover:text-weld transition-colors"
        >
          CH<span className="text-weld">.</span>
        </a>
        <nav className="flex items-center gap-5 md:gap-7">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="hidden sm:inline font-mono text-xs uppercase tracking-wider text-ink-soft hover:text-weld transition-colors"
            >
              {n.label}
            </a>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
