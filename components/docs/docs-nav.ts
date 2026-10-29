/**
 * Single source of truth for the docs site: navigation order, breadcrumbs,
 * page headers, and prev/next. Pages read their own entry from here so the
 * sidebar, the article header, and the pager can never drift apart.
 *
 * These are product docs. Pages are named for what the reader is trying to do,
 * and the prose describes behaviour rather than implementation — no internal
 * state names, config field names, or API paths outside Self-hosting and Technical.
 */

export interface DocsPage {
  /** Sidebar group heading. Consecutive pages sharing one label form a section. */
  group: string;
  /** Sidebar label, breadcrumb tail, and <h1>. */
  title: string;
  /** Route under /docs. The overview page is "" (i.e. /docs itself). */
  slug: string;
  /** Small uppercase label above the <h1>. */
  kicker: string;
  /** Pill on the right of the breadcrumb row. */
  meta: string;
  /** Standfirst under the <h1>. */
  lead: string;
  /** "On this page" entries. Must match the <Section> headings the page renders. */
  toc: string[];
}

/** The docs entry point. Named so `resolvePage` always has a real fallback. */
const OVERVIEW: DocsPage = {
  group: "Getting started",
  title: "What is TreOps",
  slug: "",
  kicker: "Overview",
  meta: "start here",
  lead:
    "TreOps is a place to hand work to AI agents and actually keep track of it — they plan, you approve, they do the work, and it gets checked before anything is called done.",
  toc: ["The idea", "How work moves", "What you can hand over", "What stays yours"],
};

export const DOCS_PAGES: DocsPage[] = [
  OVERVIEW,
  {
    group: "Getting started",
    title: "Your first piece of work",
    slug: "first-task",
    kicker: "Walkthrough",
    meta: "10 minutes",
    lead:
      "Start to finish: write down something you want done, hand it to an agent, approve its plan, and sign off the result.",
    toc: [
      "Before you start",
      "1. Write down what you want",
      "2. Say what \u201cdone\u201d looks like",
      "3. Hand it to an agent",
      "4. Approve the plan",
      "5. Check the result",
      "What to try next",
    ],
  },

  {
    group: "Core concepts",
    title: "Stories",
    slug: "stories",
    kicker: "Concept",
    meta: "the unit of work",
    lead:
      "A story is one thing you want done. Everything else in TreOps exists to move stories forward.",
    toc: [
      "What a story looks like",
      "Type",
      "Priority",
      "Status",
      "Seeing them as a board",
      "Acceptance criteria",
      "A complete story",
    ],
  },
  {
    group: "Core concepts",
    title: "Projects",
    slug: "projects",
    kicker: "Concept",
    meta: "where work lives",
    lead:
      "A project groups stories toward a purpose. It is also the boundary of what an agent is allowed to touch.",
    toc: ["What a project looks like", "What a project holds", "Goals and milestones", "Why the boundary matters"],
  },
  {
    group: "Core concepts",
    title: "Agents",
    slug: "agents",
    kicker: "Concept",
    meta: "who does the work",
    lead:
      "An agent is a configured teammate. It appears wherever people do, and you assign work to it the same way.",
    toc: ["Your roster", "What an agent is made of", "What an agent is doing", "What agents cannot do"],
  },
  {
    group: "Core concepts",
    title: "Skills",
    slug: "skills",
    kicker: "Concept",
    meta: "what agents know",
    lead:
      "A skill is a written-down way of doing something. Attach it to an agent and it follows that method every time.",
    toc: ["What a skill looks like", "What goes in one", "How a skill reaches an agent"],
  },
  {
    group: "Core concepts",
    title: "Flows",
    slug: "flows",
    kicker: "Concept",
    meta: "repeatable work",
    lead:
      "A flow is a procedure you write once and run whenever you need it \u2014 the same steps, in the same order, every time.",
    toc: [
      "What a flow is",
      "The steps you can use",
      "Passing work between steps",
      "Running one",
      "Flows or a story?",
    ],
  },
  {
    group: "Core concepts",
    title: "Vault",
    slug: "vault",
    kicker: "Concept",
    meta: "files & knowledge",
    lead:
      "Where your documents and code live, who can reach them, and how you make them searchable so agents can draw on them while they work.",
    toc: [
      "What the vault looks like",
      "Three places a file can live",
      "From file to answer",
      "Repositories",
      "What the vault is not",
    ],
  },
  {
    group: "Core concepts",
    title: "Runtimes",
    slug: "runtimes",
    kicker: "Concept",
    meta: "where agents run",
    lead:
      "A runtime is the machine an agent works on. It decides what an agent can reach, and it is the answer to most \u201cwhy didn\u0027t that work?\u201d questions.",
    toc: [
      "Your machines",
      "What happens when work lands on a machine",
      "Three ways to run an agent",
      "What a machine can reach",
      "When a machine goes offline",
    ],
  },

  {
    group: "Best practices",
    title: "Capturing & organising work",
    slug: "organising",
    kicker: "Best practice",
    meta: "guide",
    lead:
      "How to write things down so they're actually actionable, and how to keep a growing workspace navigable.",
    toc: ["Write the outcome, not the activity", "When to split work up", "Milestones and deadlines", "Finding things again"],
  },
  {
    group: "Best practices",
    title: "Handing work to an agent",
    slug: "handing-over",
    kicker: "Best practice",
    meta: "guide",
    lead:
      "What happens after you assign work to an agent, how to follow along, and what to do when it goes wrong.",
    toc: ["Assigning the work", "Watching it happen", "Reading what it did", "When something goes wrong", "Stopping or redirecting it"],
  },
  {
    group: "Best practices",
    title: "Checkpoints & approvals",
    slug: "checkpoints",
    kicker: "Best practice",
    meta: "important",
    lead:
      "You decide where an agent has to stop and check in with you. This is the part that keeps agents useful instead of alarming.",
    toc: [
      "The rhythm of a piece of work",
      "Choosing your checkpoints",
      "Approving or sending it back",
      "Saying what \u201cdone\u201d means",
      "When an agent gets stuck",
    ],
  },
  {
    group: "Best practices",
    title: "Creating an agent",
    slug: "creating-an-agent",
    kicker: "Best practice",
    meta: "guide",
    lead:
      "Writing a brief that actually shapes behaviour, and building a small team of agents rather than one that does everything.",
    toc: ["Writing a good brief", "Two jobs an agent can do", "Building a small team"],
  },
  {
    group: "Best practices",
    title: "Teaching skills",
    slug: "teaching-skills",
    kicker: "Best practice",
    meta: "guide",
    lead:
      "The fix for explaining the same thing over and over \u2014 and how to write a skill an agent will actually apply correctly.",
    toc: ["When to write one", "Writing your first skill", "Attaching skills to agents", "Borrowing skills from others"],
  },
  {
    group: "Best practices",
    title: "Connecting tools",
    slug: "connecting-tools",
    kicker: "Best practice",
    meta: "guide",
    lead:
      "Give your agents access to the systems you already use, and decide carefully which agents get what.",
    toc: ["Why connect a tool", "Connecting something", "Deciding who gets access", "Turning access off"],
  },
  {
    group: "Best practices",
    title: "Files & knowledge",
    slug: "knowledge",
    kicker: "Best practice",
    meta: "guide",
    lead:
      "Choosing what to index, asking questions about your documents, and letting agents draw on them while they work.",
    toc: ["Choosing what to index", "Asking questions about your documents", "Seeing how things connect"],
  },

  {
    group: "Staying on top of it",
    title: "Planning a project",
    slug: "planning",
    kicker: "Oversight",
    meta: "guide",
    lead:
      "Set out what a project is for, break it into milestones, and think it through with an agent before anyone starts building.",
    toc: ["Saying what the project is for", "Planning it out together", "Turning a plan into work", "Keeping the plan honest"],
  },
  {
    group: "Staying on top of it",
    title: "Letting an agent manage it",
    slug: "autopilot",
    kicker: "Oversight",
    meta: "guide",
    lead:
      "Put an agent in charge of watching a project. It checks in on its own schedule and tells you when something needs your attention.",
    toc: ["What a manager agent does", "Turning it on", "Reading its suggestions", "Keeping it quiet"],
  },
  {
    group: "Staying on top of it",
    title: "Your daily assistant",
    slug: "assistant",
    kicker: "Oversight",
    meta: "guide",
    lead:
      "A chat that already knows your projects \u2014 for asking what happened, what is stuck, and what you should look at first.",
    toc: ["What it's for", "What it opens on", "Acting without leaving the chat"],
  },

  {
    group: "Self-hosting",
    title: "Install & run",
    slug: "install",
    kicker: "Admin",
    meta: "technical",
    lead:
      "TreOps runs on your own machines. This section is for whoever sets it up and keeps it running \u2014 you don't need it to use the product.",
    toc: ["What you need", "Getting it running", "How the pieces fit", "Where your data lives"],
  },
  {
    group: "Self-hosting",
    title: "Adding machines",
    slug: "machines",
    kicker: "Admin",
    meta: "technical",
    lead:
      "Registering a machine so agents can run on it, claiming hosted compute, and keeping an eye on cost.",
    toc: ["Adding a machine", "Free hosted compute", "Keeping an eye on cost"],
  },
  {
    group: "Self-hosting",
    title: "Models & keys",
    slug: "models",
    kicker: "Admin",
    meta: "technical",
    lead:
      "TreOps doesn't sell you model usage \u2014 you bring your own keys, and you choose which model backs each agent.",
    toc: ["Bring your own keys", "Choosing a model per agent", "Keeping keys safe"],
  },
  {
    group: "Self-hosting",
    title: "Access & permissions",
    slug: "access",
    kicker: "Admin",
    meta: "technical",
    lead:
      "Who can see what, what an agent is allowed to touch, and why an agent can't quietly grant itself more room.",
    toc: ["People and roles", "What an agent can reach", "Credentials", "What we guarantee"],
  },
  {
    group: "Self-hosting",
    title: "Command line",
    slug: "cli",
    kicker: "Admin",
    meta: "reference",
    lead:
      "A terminal client for scripting and administration. Everything here can also be done in the app.",
    toc: ["Install", "Command reference", "Common options"],
  },

  {
    group: "Technical",
    title: "Architecture",
    slug: "architecture",
    kicker: "Overview",
    meta: "overview",
    lead:
      "The whole system, from context to deployment: containers, backend structure, one run end to end, state, and scaling limits.",
    toc: ["Three planes at a glance", "System context", "Containers", "Backend structure", "One story run, end to end", "State and data", "Deployment", "Scaling and limits", "Technology stack", "Invariants worth memorising"],
  },
  {
    group: "Technical",
    title: "Agent layers",
    slug: "agent-layers",
    kicker: "Layer map",
    meta: "reference model",
    lead:
      "The standard layers of an agent platform, mapped onto what TreOps actually implements and what it does not.",
    toc: ["The layer stack", "Layer by layer", "Built, partial, not built"],
  },
  {
    group: "Technical",
    title: "Orchestration layer",
    slug: "run-engine",
    kicker: "Layer · Orchestration",
    meta: "control plane",
    lead:
      "The run state machine, acceptance criteria that make done provable, and who is asked when it stalls.",
    toc: ["Run phases", "Acceptance criteria", "Checklist is not criteria", "Who gets asked", "Run policy"],
  },
  {
    group: "Technical",
    title: "Multi-agent architecture",
    slug: "multi-agent",
    kicker: "Orchestration",
    meta: "control plane",
    lead:
      "Two ways agents cooperate: roles in a governed run that share one thread, and a team that runs as one lead session.",
    toc: ["Two shapes of multi-agent", "Roles in a run", "Teams", "Who controls whom", "Concurrency and limits"],
  },
  {
    group: "Technical",
    title: "Planning layer",
    slug: "planning-process",
    kicker: "Layer · Planning",
    meta: "control plane",
    lead:
      "Two levels of planning: a project plan that people approve once, and a per-story plan the assignee posts before it works.",
    toc: ["Propose, edit, apply", "What the draft guarantees", "What apply does", "The per-story plan"],
  },
  {
    group: "Technical",
    title: "Reasoning layer",
    slug: "model-selection",
    kicker: "Layer · Reasoning",
    meta: "configuration",
    lead:
      "The plan, act, verify, review loop, and how a model and a thinking level are picked for it.",
    toc: ["The reasoning loop", "How a model is chosen", "Where tiers are used", "What is not built"],
  },
  {
    group: "Technical",
    title: "System 1 and System 2",
    slug: "system-1-pilot",
    kicker: "Layer · Reasoning",
    meta: "fast vs deliberate",
    lead:
      "A slow reasoning model owns the goal; a fast decision model, backed by OpenAI’s Decisions API, takes one constrained step at a time.",
    toc: ["Two systems, one browser", "One step, in detail", "Why a Decisions API", "Boundaries and budgets", "How a run ends", "Built, and not built"],
  },
  {
    group: "Technical",
    title: "Memory layer",
    slug: "memory-learning",
    kicker: "Layer · Memory",
    meta: "intelligence",
    lead:
      "Short-term and long-term memory, the episodic, semantic and procedural stores, and how knowledge moves between them.",
    toc: ["Short-term and long-term", "Long-term stores", "The consolidation loop", "Why a person approves", "Other feedback loops"],
  },
  {
    group: "Technical",
    title: "Knowledge & ontology layer",
    slug: "rag",
    kicker: "Layer · Knowledge",
    meta: "intelligence",
    lead:
      "Vector search plus an entity graph, the ontologies that constrain them, and how this differs from memory.",
    toc: ["Ontologies", "Ingest", "Search", "Memory or knowledge?"],
  },
  {
    group: "Technical",
    title: "Vault & object storage",
    slug: "vault-storage",
    kicker: "Layer · Storage",
    meta: "files",
    lead:
      "Files and the object store behind them: presigned upload and download, scoping, and how the vault differs from knowledge.",
    toc: ["Presigned flow", "What a file is linked to", "Vault and knowledge"],
  },
  {
    group: "Technical",
    title: "Enterprise data integration",
    slug: "enterprise-data",
    kicker: "Design guidance",
    meta: "recommended",
    lead:
      "The recommended approach for data scattered across ERP, Jira, CRM and documents, and what TreOps does and does not do today.",
    toc: ["The principle", "Choose an access mode per source", "A small business ontology", "Permissions", "Writes and conflicts", "What TreOps does today", "Gaps and build order"],
  },
  {
    group: "Technical",
    title: "Automation layer",
    slug: "automation-layer",
    kicker: "Layer · Automation",
    meta: "control plane",
    lead:
      "Flows, schedules and channels, plus the event-driven starts and watchdogs that keep work moving without clicks.",
    toc: ["Flows", "Event-driven work", "Watchdogs", "Why it is safe to run twice"],
  },
  {
    group: "Technical",
    title: "Tool layer",
    slug: "mcp-service",
    kicker: "Layer · Tools",
    meta: "agent tools",
    lead:
      "The thin MCP proxy agents use for every action, and how it decides which tools they see.",
    toc: ["Visibility pipeline", "Fail modes", "Adding a tool"],
  },
  {
    group: "Technical",
    title: "Guardrails & tool safety",
    slug: "guardrails",
    kicker: "Cross-cutting",
    meta: "safety",
    lead:
      "Defence in depth around every tool call: what is prevented, what is detected, what is corrected, and what a person decides.",
    toc: ["Preventive controls", "Detective and corrective controls", "Human checkpoints", "What a guardrail is not"],
  },
  {
    group: "Technical",
    title: "Agent isolation",
    slug: "isolation",
    kicker: "Cross-cutting",
    meta: "safety",
    lead:
      "The nested boundaries around an agent process, what each stops, and where isolation honestly ends.",
    toc: ["Boundaries, outside in", "What each agent can reach", "Browser isolation", "Where isolation ends"],
  },
  {
    group: "Technical",
    title: "Identity layer",
    slug: "authentication",
    kicker: "Layer · Identity",
    meta: "tokens & actors",
    lead:
      "Four token types, how a runtime registers, and how a daemon request becomes a specific agent.",
    toc: ["Token types", "Registering a runtime", "Who is really acting", "Guards"],
  },
  {
    group: "Technical",
    title: "Secrets & login chain",
    slug: "secrets",
    kicker: "Cross-cutting",
    meta: "credentials",
    lead:
      "Every credential in the system: how it is issued, stored, released to an agent, and what protects it.",
    toc: ["The credential chain", "Credential inventory", "Encryption at rest", "Releasing a secret to an agent", "Browser sign-ins", "What the platform will not hold"],
  },
  {
    group: "Technical",
    title: "Execution layer: task & harness",
    slug: "agent-harness",
    kicker: "Layer · Execution",
    meta: "execution",
    lead:
      "The unit of work, and everything the daemon builds around the model before it runs.",
    toc: ["The task row", "Task modes", "The harness pipeline", "What goes in the working directory", "Keeping context between tasks"],
  },
  {
    group: "Technical",
    title: "Execution layer: runtimes",
    slug: "runtime-routing",
    kicker: "Layer · Execution",
    meta: "execution",
    lead:
      "Where a task runs, the kinds of runtime, and what happens when one is offline.",
    toc: ["Choosing a runtime", "Kinds of runtime", "Failures and waiting"],
  },
  {
    group: "Technical",
    title: "Containers & orchestration",
    slug: "containers",
    kicker: "Layer · Execution",
    meta: "docker → kube",
    lead:
      "How runtimes are started as Docker containers today, the supervisor seam, and what Kubernetes would change.",
    toc: ["Docker today", "Lifecycle", "Resource and safety limits", "Who holds the Docker socket", "The single-host stack", "Toward Kubernetes"],
  },
  {
    group: "Technical",
    title: "Assistant browser",
    slug: "browser",
    kicker: "Layer · Tools",
    meta: "execution",
    lead:
      "A real Chromium the Assistant drives and a person can watch and steer, per assistant thread.",
    toc: ["Shape", "Two ways in", "Control protocol", "Staying signed in"],
  },
];

/** Route for a page, e.g. "" -> "/docs", "work" -> "/docs/work". */
export function docsHref(slug: string): string {
  return slug ? `/docs/${slug}` : "/docs";
}

/** Sidebar sections, preserving DOCS_PAGES order. */
export function docsGroups(): { group: string; pages: DocsPage[] }[] {
  const groups: { group: string; pages: DocsPage[] }[] = [];
  for (const page of DOCS_PAGES) {
    const last = groups[groups.length - 1];
    if (last && last.group === page.group) last.pages.push(page);
    else groups.push({ group: page.group, pages: [page] });
  }
  return groups;
}

/** Look up a page, falling back to the overview for an unknown slug. */
export function resolvePage(slug: string): DocsPage {
  return DOCS_PAGES.find((p) => p.slug === slug) ?? OVERVIEW;
}

/** Neighbours in flat nav order — undefined at either end. */
export function siblings(slug: string): { prev?: DocsPage; next?: DocsPage } {
  const i = DOCS_PAGES.findIndex((p) => p.slug === slug);
  if (i === -1) return {};
  return { prev: DOCS_PAGES[i - 1], next: DOCS_PAGES[i + 1] };
}
