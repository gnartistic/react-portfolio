import { NextResponse } from "next/server";
import { generateText, tool, stepCountIs } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { z } from "zod";
import { profile, projects, toolkit, services, serviceAddOns } from "@/lib/content";
import { scriptedAgent, type AgentAction } from "@/lib/agent-fallback";

// The agent runs server-side via Anthropic directly (ANTHROPIC_API_KEY).
// Model is configurable; default is the current flagship Claude. For a public
// site you may prefer a cheaper/faster model — set AGENT_MODEL=claude-haiku-4-5
// to cut cost ~5x (it's plenty for nav + short Q&A).
const MODEL = process.env.AGENT_MODEL ?? "claude-opus-4-8";

// Grounding context — the agent may only speak to what's here. Built from the
// single content source so it can never drift from the site.
const KNOWLEDGE = `
${profile.bio}

PROJECTS (selected work):
${projects.map((p) => `- ${p.name} (#project-${p.slug})${p.role ? ` [${p.role}]` : ""}: ${p.blurb} Skills: ${p.skills.join(", ")}. Live: ${p.link}`).join("\n")}

TOOLKIT (Skills):
${toolkit.map((t) => `- ${t.group}: ${t.tools.join(", ")}`).join("\n")}

SERVICES (freelance — he's taking client work; #services): ${services.map((s) => `${s.name} (${s.tagline})`).join("; ")}. Add-ons: ${serviceAddOns.map((a) => a.name).join(", ")}. No fixed prices — interested visitors request a quote. Reviews are at #reviews. If someone wants a website/app/store built or asks about hiring, pricing, or availability, point them to services and contact.

CONTACT: email ${profile.email}, GitHub ${profile.github}. He also publishes an npm package that prints his contact card in the terminal — run \`npm install ${profile.npmCard}\`.

There's also a live security demo on the page: "Break Charles AI" (#breach) — a prompt-injection challenge where visitors try to make a guardian agent leak a secret flag across three levels of defense. It shows he builds AI agents AND red-teams them. Point security-minded or AI-curious visitors there.

SECTIONS you can navigate to (use the navigate tool): identity, skills, breach, lab, services, reviews, contact. Projects: project-<slug> (e.g. project-shenhav).
`.trim();

const SYSTEM = `You are "Charles AI" — a terse, helpful guide to Charles Houston's portfolio, with a workshop personality (he's an engineer who also works in wood, metal, music, and security).

Rules:
- Answer ONLY from the knowledge below. If you don't know, say "Ask Charles directly" — never invent facts about him.
- Always speak about Charles in the third person ("he", "his") — you are his guide, not him. Never reply as "I" when referring to Charles.
- Keep replies to 1–2 short sentences. Workshop-flavored is good ("Let me pull that up…") but don't overdo it.
- When the user wants to see something, CALL the navigate tool with the right target, then give a one-line reply. Always navigate when a section or project is relevant.

KNOWLEDGE:
${KNOWLEDGE}`;

export async function POST(req: Request) {
  let query = "";
  try {
    const body = await req.json();
    query = String(body?.query ?? "").slice(0, 500);
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
  if (!query.trim()) {
    return NextResponse.json({ error: "empty query" }, { status: 400 });
  }

  // No API key available (e.g. preview without env set) → tell the client to
  // use its scripted fallback. The site stays fully functional.
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ degraded: true }, { status: 503 });
  }

  try {
    let action: AgentAction = { type: "none" };

    const result = await generateText({
      model: anthropic(MODEL),
      system: SYSTEM,
      prompt: query,
      tools: {
        navigate: tool({
          description:
            "Scroll the visitor to a section or project on the page. Call this whenever a section or project is relevant to the question.",
          inputSchema: z.object({
            target: z
              .string()
              .describe(
                "One of: identity, skills, breach, lab, contact, or project-<slug> like project-fetch",
              ),
          }),
          execute: async ({ target }) => {
            action = { type: "navigate", target };
            return { ok: true, target };
          },
        }),
        pluckStrings: tool({
          description: "Play the guitar strings in the hero. Use when the visitor asks to hear music or play guitar.",
          inputSchema: z.object({}),
          execute: async () => {
            action = { type: "pluck" };
            return { ok: true };
          },
        }),
      },
      // allow a tool call then a final text reply
      stopWhen: stepCountIs(3),
    });

    const reply = result.text?.trim() || "Here you go.";
    return NextResponse.json({ reply, action });
  } catch (err) {
    // Model error / rate limit / outage → graceful scripted fallback, server-side.
    console.error("agent route error:", err);
    const fb = scriptedAgent(query);
    return NextResponse.json({ ...fb, degraded: true });
  }
}
