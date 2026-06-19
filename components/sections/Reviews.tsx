import { reviews } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export function Reviews() {
  const hasPlaceholders = reviews.some((r) => r.placeholder);

  return (
    <section id="reviews" className="px-6 md:px-12 py-28 border-t border-line">
      <div className="max-w-6xl mx-auto w-full">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-weld mb-3">05 — Reviews</p>
          <h2 className="display text-[clamp(2rem,6vw,4.5rem)] text-ink mb-4">What clients say</h2>
          {hasPlaceholders && (
            // Honest flag so these never read as real testimonials until replaced.
            <p className="font-mono text-xs uppercase tracking-wider text-ember mb-10">
              ⚠ Sample layout — replace with real client quotes in lib/content.ts
            </p>
          )}
        </Reveal>

        <div className="grid md:grid-cols-3 gap-px bg-line">
          {reviews.map((r, i) => (
            <Reveal key={i} delay={i * 80} className="bg-background p-7 flex flex-col">
              <span className="text-4xl text-wood leading-none mb-3" aria-hidden>
                &ldquo;
              </span>
              <p className="text-ink flex-1">{r.quote}</p>
              <div className="mt-6 flex items-center justify-between gap-2">
                <div>
                  <p className="font-mono text-sm text-ink">{r.name}</p>
                  <p className="font-mono text-xs text-ink-soft">{r.role}</p>
                </div>
                {r.placeholder && (
                  <span className="font-mono text-[10px] uppercase tracking-wider text-ember border border-ember/40 rounded px-1.5 py-0.5">
                    sample
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
