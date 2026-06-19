import { projects } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

// Selected work — shipped products and the roles behind them.
export function Lab() {
  return (
    <section id="lab" className="px-6 md:px-12 py-28 border-t border-line">
      <div className="max-w-6xl mx-auto w-full">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-weld mb-3">03 — Work</p>
          <h2 className="display text-[clamp(2rem,6vw,4.5rem)] text-ink mb-4">Selected work</h2>
          <p className="text-ink-soft max-w-xl mb-14">
            Products shipped end-to-end — design, front end, and back end.
          </p>
        </Reveal>

        <ul>
          {projects.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 50}>
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                id={`project-${p.slug}`}
                className="group block border-t border-line py-7 transition-colors hover:bg-ink/[0.025] dark:hover:bg-white/[0.02] -mx-4 px-4 rounded-sm scroll-mt-24"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="display text-[clamp(1.5rem,4vw,2.75rem)] text-ink group-hover:text-weld transition-colors flex items-baseline gap-3 flex-wrap">
                    {p.name}
                    {p.role && (
                      <span className="font-mono text-xs uppercase tracking-wider text-paper bg-weld rounded px-2 py-1 align-middle not-italic">
                        {p.role}
                      </span>
                    )}
                  </h3>
                  <span className="font-mono text-xl text-steel group-hover:text-weld group-hover:translate-x-1 transition-all">
                    ↗
                  </span>
                </div>
                <div className="mt-3">
                  <p className="text-ink max-w-2xl">{p.blurb}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.skills.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[11px] uppercase tracking-wider text-steel border border-line rounded px-2 py-1"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
