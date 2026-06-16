import { Reveal } from "@/components/Reveal";
import { WorkshopChat } from "@/components/WorkshopChat";

// The Workshop — skills presented as a "Charles AI" chat: tap a bench, get the stack.
export function Workshop() {
  return (
    <section id="workshop" className="px-6 md:px-12 py-28 border-t border-line">
      <div className="max-w-3xl mx-auto w-full">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-weld mb-3">01 — The Workshop</p>
          <h2 className="display text-[clamp(2rem,6vw,4.5rem)] text-ink mb-4">The toolkit</h2>
          <p className="text-ink-soft max-w-xl mb-10">
            Ask about a bench — front end, back end, data, cloud, AI, security, or the shop.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <WorkshopChat />
        </Reveal>
      </div>
    </section>
  );
}
