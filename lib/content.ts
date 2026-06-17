// Single source of truth for the whole site.
// The sections render from this, AND the AI agent is grounded in this — so the
// agent can never claim something that isn't here. Keep it factual.

export const profile = {
  name: "Charles Houston",
  location: "Blacksburg, VA",
  // The brand: atoms and code.
  tagline: "I build things — some out of wood and steel, some out of TypeScript.",
  role: "Engineer & maker",
  since: 2016,
  email: "gn4rtistic@gmail.com",
  github: "https://github.com/gnartistic",
  githubUser: "gnartistic",
  // A published npm package that prints Charles's contact card in the terminal.
  npmCard: "gnartistic",
  npmUrl: "https://www.npmjs.com/package/gnartistic",
  // Grounding bio the agent answers from.
  bio: `Charles Houston is a full-stack engineer and maker based in Blacksburg,
Virginia, building software since 2016. He works across modern TypeScript and
Python: React, Next.js, and Angular on the front end; Node, tRPC, Auth0, and
serverless on the back end; PostgreSQL, Neon, Drizzle, and Prisma for data; and
AWS (Lambda, S3, SES, Bedrock), Cloudflare, and Vercel for infra. He's deep into
building AI products and agentic interfaces on the Anthropic and OpenAI APIs. He
also works in security — a side bug-bounty hunter, available for security
testing, secure implementation, and analysis. Off the screen he works with his
hands: woodworking, metal fabrication and welding, mechanical builds, and guitar.
He approaches code the way he approaches the shop: design for the constraint,
respect the material, and stop when it's right.`,
} as const;

export type Project = {
  slug: string;
  name: string;
  blurb: string;
  // Optional title/role on the project (e.g. "CTO").
  role?: string;
  skills: string[];
  link: string;
};

export const projects: Project[] = [
  {
    slug: "shenhav",
    name: "Shenhav",
    role: "CTO",
    blurb: "CTO — leading engineering and product across the whole stack.",
    skills: ["CTO", "Architecture", "Full-Stack", "UI Design"],
    link: "https://shenhav.com",
  },
  {
    slug: "maria-martin-notary",
    name: "Maria Martin Notary",
    blurb: "Brand and website for a mobile notary service.",
    skills: ["UI Design", "Front End"],
    link: "https://www.mariamartinnotary.com/",
  },
  {
    slug: "cabco",
    name: "Cabco",
    blurb: "Website design and build for Cabco.",
    skills: ["UI Design", "Front End"],
    link: "https://www.cabco.pro/",
  },
  {
    slug: "last-pouch",
    name: "Last Pouch",
    blurb: "Product design and build for the Last Pouch app.",
    skills: ["UI Design", "Front End", "Back End", "App"],
    link: "https://www.lastpouch.app/",
  },
  {
    slug: "virtuai",
    name: "VirtuAI Chatbot",
    blurb: "An AI chatbot product — the first serious dive into building with LLMs.",
    skills: ["Back End", "UI Design", "Front End", "AI"],
    link: "https://virtuai-chatbot.vercel.app/",
  },
  {
    slug: "atims",
    name: "ATIMs Aviation",
    blurb: "Front end + UI for an aviation maintenance platform.",
    skills: ["Front End", "UI Design"],
    link: "https://mx.atimsaviation.com/#/login",
  },
  {
    slug: "s61c",
    name: "S61C",
    blurb: "Shipped iOS app — design through native build and back end.",
    skills: ["UI Design", "iOS", "Front End", "Back End"],
    link: "https://apps.apple.com/us/app/s61c/id1508988735",
  },
  {
    slug: "raptor-labs",
    name: "Raptor Labs",
    blurb: "Front-end and UI work, shipped and live.",
    skills: ["UI Design", "Front End"],
    link: "https://gnartistic.github.io/this/",
  },
];

// The Workshop — skills as a craftsman's toolkit. Rendered as a "Charles AI"
// chat: each group is a suggested prompt; `prompt` is the chip + user message,
// `reply` is what Charles AI answers with (alongside the tool pills).
export const toolkit: { group: string; tools: string[]; prompt: string; reply: string }[] = [
  {
    group: "Languages",
    tools: ["TypeScript", "JavaScript", "Python"],
    prompt: "What languages does he use?",
    reply: "Day to day I'm in TypeScript and JavaScript, with Python for AI, scripting, and data work.",
  },
  {
    group: "Front end",
    tools: ["React", "Next.js", "Angular", "Tailwind", "Motion"],
    prompt: "What's his front-end stack?",
    reply: "I build interfaces in React and Next.js — and Angular when a project calls for it — styled with Tailwind and animated with Motion.",
  },
  {
    group: "Back end",
    tools: ["Node", "tRPC", "Auth0", "REST APIs", "Serverless"],
    prompt: "Tell me about the back end",
    reply: "Services on Node with tRPC for end-to-end type safety, Auth0 for auth, REST where it fits, and serverless for the rest.",
  },
  {
    group: "Data",
    tools: ["PostgreSQL", "Neon", "Drizzle", "Prisma"],
    prompt: "What does he use for data?",
    reply: "PostgreSQL is home base — usually on Neon — with Drizzle or Prisma as the ORM.",
  },
  {
    group: "Cloud & infra",
    tools: ["AWS Lambda", "S3", "SES", "Cloudflare", "Vercel"],
    prompt: "What about cloud & infra?",
    reply: "I deploy on Vercel and Cloudflare, and run compute and storage on AWS — Lambda, S3, and SES.",
  },
  {
    group: "AI",
    tools: ["Anthropic API", "OpenAI API", "AWS Bedrock", "AI SDK", "RAG & agents"],
    prompt: "Is he any good with AI?",
    reply: "I build with the Anthropic and OpenAI APIs and AWS Bedrock, using the Vercel AI SDK to ship agents, tools, and RAG. This chat is one example.",
  },
  {
    group: "Security",
    tools: ["Bug bounty", "Pen testing", "Secure implementation", "Threat analysis", "Hardening"],
    prompt: "Does he do security work?",
    reply: "On the side I hunt bugs, and I take security work: testing, secure implementation, threat analysis, and hardening.",
  },
  {
    group: "The shop",
    tools: ["Woodworking", "Welding / metal", "Mechanical builds", "Guitar"],
    prompt: "What does he build off the screen?",
    reply: "Off the screen I build with my hands — woodworking, welding and metal fab, mechanical builds — and I play guitar.",
  },
];

// Suggested prompts shown in the command palette to seed interaction.
export const agentSuggestions = [
  "What's his biggest project?",
  "Is he any good with AI?",
  "Does he do security work?",
  "How do I get in touch?",
] as const;
