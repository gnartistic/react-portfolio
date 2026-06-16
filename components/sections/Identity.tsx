import { profile } from "@/lib/content";
import { GuitarStrings } from "@/components/GuitarStrings";

export function Identity() {
  return (
    <section id="identity" className="min-h-[100svh] flex flex-col justify-center px-6 md:px-12 pt-28 pb-16">
      <div className="max-w-6xl mx-auto w-full">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-weld mb-6">
          {profile.role} · {profile.location} · since {profile.since}
        </p>

        <h1 className="display text-[clamp(2.75rem,11vw,9rem)] text-ink">
          Charles
          <br />
          <span className="text-steel">Houston</span>
        </h1>

        <div className="mt-10 grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-end">
          <p className="text-xl md:text-2xl leading-snug text-ink max-w-xl">
            {profile.tagline}
          </p>
          <div className="hidden md:block">
            <GuitarStrings />
          </div>
        </div>

        <div className="md:hidden mt-10">
          <GuitarStrings />
        </div>

        <p className="mt-12 font-mono text-xs uppercase tracking-wider text-ink-soft">
          ↓ scroll · or press{" "}
          <kbd className="border border-line rounded px-1.5 py-0.5">⌘K</kbd> to ask Charles AI
        </p>
      </div>
    </section>
  );
}
