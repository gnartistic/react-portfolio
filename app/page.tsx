import { Header } from "@/components/Header";
import { Identity } from "@/components/sections/Identity";
import { Workshop } from "@/components/sections/Workshop";
import { Lab } from "@/components/sections/Lab";
import { Contact } from "@/components/sections/Contact";
import { CommandPalette } from "@/components/CommandPalette";
import { profile } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Identity />
        <Workshop />
        <Lab />
        <Contact />
      </main>
      <footer className="px-6 md:px-12 pt-10 pb-28 border-t border-line">
        <div className="max-w-6xl mx-auto w-full flex flex-wrap items-center justify-between gap-3 font-mono text-xs uppercase tracking-wider text-ink-soft">
          <span>© {profile.name}</span>
          <span>Built with atoms &amp; code · {profile.location}</span>
        </div>
      </footer>
      <CommandPalette />
    </>
  );
}
