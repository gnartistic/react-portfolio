import { services, serviceAddOns, profile } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

// Pre-filled "request a quote" email per package — no prices on the page.
function quoteHref(pkg: string) {
  const subject = encodeURIComponent(`Quote request: ${pkg}`);
  const body = encodeURIComponent(
    `Hi Charles,\n\nI'm interested in a ${pkg.toLowerCase()} project. Here's a bit about it:\n\n- What it's for:\n- Rough timeline:\n- Budget range:\n\nThanks!`,
  );
  return `mailto:${profile.email}?subject=${subject}&body=${body}`;
}

export function Services() {
  return (
    <section id="services" className="px-6 md:px-12 py-28 border-t border-line">
      <div className="max-w-6xl mx-auto w-full">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-weld mb-3">04 — Services</p>
          <h2 className="display text-[clamp(2rem,6vw,4.5rem)] text-ink mb-4">What I build for clients</h2>
          <p className="text-ink-soft max-w-xl mb-14">
            Pick the closest fit and request a quote — every project is scoped to you.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-px bg-line">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 70} className="bg-background p-7 flex flex-col group">
              <h3 className="display text-2xl md:text-3xl text-ink group-hover:text-weld transition-colors">{s.name}</h3>
              <p className="text-ink-soft mt-1 mb-5">{s.tagline}</p>
              <ul className="space-y-2 mb-7 flex-1">
                {s.includes.map((inc) => (
                  <li key={inc} className="flex items-start gap-2.5 text-ink">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-wood shrink-0" />
                    {inc}
                  </li>
                ))}
              </ul>
              <a
                href={quoteHref(s.name)}
                className="self-start font-mono text-xs uppercase tracking-wider border border-ink rounded-full px-5 py-2.5 text-ink hover:bg-weld hover:border-weld hover:text-paper transition-colors"
              >
                Request a quote →
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-px grid sm:grid-cols-2 gap-px bg-line">
          {serviceAddOns.map((a) => (
            <div key={a.name} className="bg-background p-7">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-weld border border-weld/40 rounded px-2 py-0.5">
                  add-on
                </span>
                <h3 className="display text-xl text-ink">{a.name}</h3>
              </div>
              <p className="text-ink-soft">{a.tagline}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
