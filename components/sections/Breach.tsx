import { Reveal } from "@/components/Reveal";
import { BreachChallenge } from "@/components/BreachChallenge";

// Break Charles AI — a live prompt-injection challenge. The portfolio's own
// agent pattern, turned into a security demo: break the guardian, get the flag.
export function Breach() {
  return (
    <section id="breach" className="px-6 md:px-12 py-28 border-t border-line">
      <div className="max-w-3xl mx-auto w-full">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-weld mb-3">02 — Red Team</p>
          <h2 className="display text-[clamp(2rem,6vw,4.5rem)] text-ink mb-4">Break Charles AI</h2>
          <p className="text-ink-soft max-w-xl mb-10">
            I build agents — and I break them. This guardian is hiding a secret flag behind three
            levels of defense, from a naive system prompt to a guard-model gauntlet. Try to make it
            leak. Most people get level one.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <BreachChallenge />
        </Reveal>
      </div>
    </section>
  );
}
