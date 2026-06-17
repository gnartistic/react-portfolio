import { projects, profile } from "./content";

// A site action the agent (or the fallback) can ask the client to perform.
// Kept deterministic on the client so "driving the site" never depends on the model.
export type AgentAction =
  | { type: "navigate"; target: string } // section id or `project-<slug>`
  | { type: "pluck" }
  | { type: "none" };

export type AgentReply = { reply: string; action: AgentAction };

const SECTIONS = ["identity", "workshop", "lab", "workbench", "contact"];

/**
 * Scripted intent matcher. Runs entirely on the client and is used whenever the
 * real LLM route is unavailable (no key, rate-limited, error, offline). It's
 * intentionally simple — keyword + project-name matching — so the palette is
 * always useful even with the AI layer off.
 */
export function scriptedAgent(raw: string): AgentReply {
  const q = raw.toLowerCase().trim();

  // Direct project name / slug match.
  const proj = projects.find(
    (p) => q.includes(p.name.toLowerCase()) || q.includes(p.slug.replace("-", " ")),
  );
  if (proj) {
    return {
      reply: `Pulling ${proj.name} off the bench. ${proj.blurb}`,
      action: { type: "navigate", target: `project-${proj.slug}` },
    };
  }

  if (/(hard|tough|difficult|proud|best|impressive|biggest|main)/.test(q)) {
    const flagship = projects.find((p) => p.slug === "shenhav")!;
    return {
      reply: `The big one is ${flagship.name} — he's the CTO, leading engineering and product across the whole stack.`,
      action: { type: "navigate", target: `project-${flagship.slug}` },
    };
  }
  if (/(security|cyber|bug ?bounty|pen ?test|pentest|hack|vuln|exploit|harden|appsec|infosec)/.test(q)) {
    return {
      reply: "Yes — he hunts bugs on the side and takes security work: testing, secure implementation, and analysis. Here's the security bench.",
      action: { type: "navigate", target: "workshop" },
    };
  }
  if (/(\bai\b|llm|agent|machine learning|ml|gpt|model)/.test(q)) {
    return {
      reply: "Yes — he's deep in AI right now. VirtuAI was the first dive; this very page runs a tool-calling agent. Sending you to the AI bench.",
      action: { type: "navigate", target: "workshop" },
    };
  }
  if (/(wood|weld|metal|steel|mechanic|physical|hand|craft|build.*thing|off.?screen|guitar|music)/.test(q)) {
    return {
      reply: "Off the screen he works in wood, steel, and mechanisms — and plays guitar. Ask the shop bench in the workshop.",
      action: { type: "navigate", target: "workshop" },
    };
  }
  if (/(contact|hire|email|reach|touch|talk|message|available|freelance|npm|install|card)/.test(q)) {
    return {
      reply: `Easiest is email: ${profile.email} — or run \`npm install ${profile.npmCard}\` for his contact card. Taking you to contact.`,
      action: { type: "navigate", target: "contact" },
    };
  }
  if (/(skill|stack|tech|know|tool|language|framework)/.test(q)) {
    return {
      reply: "Here's the full toolkit — front end, back end, an AI bench, and the physical shop.",
      action: { type: "navigate", target: "workshop" },
    };
  }
  if (/(project|work|portfolio|built|made|ship)/.test(q)) {
    return {
      reply: "Here's the lab — every project framed by the question it was testing.",
      action: { type: "navigate", target: "lab" },
    };
  }
  if (/(who|about|you|charles|background|story)/.test(q)) {
    return {
      reply: profile.tagline,
      action: { type: "navigate", target: "identity" },
    };
  }
  if (/(play|guitar|sound|music|note|pluck|string)/.test(q)) {
    return { reply: "Pluck the strings up top — go on.", action: { type: "pluck" } };
  }

  // Generic section name fallthrough.
  const sec = SECTIONS.find((s) => q.includes(s));
  if (sec) return { reply: `Heading to ${sec}.`, action: { type: "navigate", target: sec } };

  return {
    reply: "Not sure I caught that — try asking about his projects, AI work, the shop, or how to get in touch.",
    action: { type: "none" },
  };
}
