import { profile } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { CopyCommand } from "@/components/CopyCommand";

export function Contact() {
  return (
    <section id="contact" className="px-6 md:px-12 py-28 border-t border-line">
      <div className="max-w-6xl mx-auto w-full">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-weld mb-3">03 — Get in touch</p>
          <h2 className="display text-[clamp(2.5rem,9vw,7rem)] text-ink leading-[0.9]">
            Let&apos;s build
            <br />
            <span className="text-steel">something.</span>
          </h2>
        </Reveal>

        <Reveal delay={120} className="mt-12 flex flex-wrap gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="font-mono text-sm uppercase tracking-wider border border-ink rounded-full px-6 py-3 text-ink hover:bg-weld hover:border-weld hover:text-paper transition-colors"
          >
            {profile.email} ↗
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm uppercase tracking-wider border border-line rounded-full px-6 py-3 text-ink-soft hover:text-weld hover:border-weld transition-colors"
          >
            github / {profile.githubUser} ↗
          </a>
        </Reveal>

        <Reveal delay={200} className="mt-10">
          <p className="font-mono text-xs uppercase tracking-wider text-ink-soft mb-3">
            Prefer the terminal? Install my contact card:
          </p>
          <CopyCommand command={`npm install ${profile.npmCard}`} />
          <a
            href={profile.npmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 font-mono text-xs uppercase tracking-wider text-ink-soft hover:text-weld transition-colors"
          >
            view on npm ↗
          </a>
        </Reveal>
      </div>
    </section>
  );
}
