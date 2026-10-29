import { Arrow, Chip, Diagram, Group, Label, Line, Node, Step } from "./tech-svg";

/* ------------------------------------------------------------------ */
/* 1 · System context                                                   */
/* ------------------------------------------------------------------ */

/** TreOps as one box: who uses it, and what it depends on. */
export function SystemContextDiagram() {
  return (
    <Diagram width={960} height={434} minWidth={800} legend>
      <Group x={10} y={14} w={230} h={250} label="PEOPLE" />
      <Node x={24} y={46} w={202} h={86} title="Workspace members" sub={["plan, approve, sign off", "and steer the Assistant"]} />
      <Node x={24} y={146} w={202} h={86} title="Operators and admins" sub={["deploy, add runtimes,", "manage keys and policy"]} />

      <Node x={330} y={70} w={300} h={196} title="TreOps platform" sub={["Control plane: state, rules, run engine", "Execution plane: daemons, runtimes", "Intelligence plane: memory, knowledge", "self-hosted · AGPL-3.0"]} tone="primary" />

      <Group x={720} y={14} w={230} h={380} label="EXTERNAL SYSTEMS" />
      <Node x={734} y={46} w={202} h={84} title="LLM providers" sub={["Anthropic and Google CLIs", "OpenAI: embeddings, decisions"]} />
      <Node x={734} y={144} w={202} h={74} title="Enterprise tools" sub={["Jira · ERP · CRM · GitHub", "reached as MCP servers"]} />
      <Node x={734} y={232} w={202} h={64} title="Channels" sub="Slack webhook · email" />
      <Node x={734} y={310} w={202} h={64} title="Git repositories" sub="checked out per task" />

      <Node x={330} y={310} w={300} h={56} title="Object storage" sub="S3 or MinIO · presigned URLs" />
      <Node x={10} y={310} w={230} h={56} title="MLflow tracing" sub="optional · off by default" dashed />

      <Line x1={226} y1={89} x2={328} y2={130} both />
      <Label x={283} y={150} size={10.5}>HTTPS · WS</Label>
      <Line x1={226} y1={189} x2={328} y2={200} both />
      <Label x={283} y={224} size={10.5}>CLI · API</Label>

      <Line x1={632} y1={110} x2={732} y2={92} both />
      <Line x1={632} y1={160} x2={732} y2={178} both />
      <Label x={656} y={150} anchor="start" size={10}>MCP</Label>
      <Line x1={632} y1={210} x2={732} y2={262} />
      <Line x1={632} y1={246} x2={732} y2={340} both />
      <Label x={668} y={306} anchor="start" size={10}>git</Label>
      <Line x1={480} y1={268} x2={480} y2={308} both />
      <Label x={492} y={294} anchor="start" size={10}>S3 API</Label>
      <Arrow d="M 340 268 L 340 288 L 125 288 L 125 308" dashed />

      <Label x={10} y={420} anchor="start" size={11}>Every external call is initiated by TreOps. Nothing external is trusted: all data from tools and models is treated as input to be authorized.</Label>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ */
/* 2 · Containers                                                       */
/* ------------------------------------------------------------------ */

/** Every deployable, how they connect, and the eight numbered flows. */
export function ContainerDiagram() {
  return (
    <Diagram width={960} height={690} minWidth={820} legend>
      {/* clients */}
      <Group x={10} y={10} w={940} h={92} label="CLIENTS" />
      <Node x={24} y={38} w={215} h={52} title="Web app" sub="Next.js · TanStack Query" />
      <Node x={252} y={38} w={200} h={52} title="Desktop app" sub="Electron shell" />
      <Node x={466} y={38} w={200} h={52} title="CLI" sub="Typer · people and scripts" />
      <Node x={680} y={38} w={256} h={52} title="Landing and docs" sub="Next.js · static, no API calls" />

      {/* edge */}
      <Node x={10} y={122} w={940} h={46} title="Caddy · TLS edge" sub="app. → web · api. → backend · mcp. → mcp · storage. → object store · apex → landing · WebSocket upgrades pass through" />
      <Line x1={131} y1={102} x2={131} y2={120} />
      <Line x1={352} y1={102} x2={352} y2={120} />
      <Line x1={566} y1={102} x2={566} y2={120} />
      <Line x1={808} y1={102} x2={808} y2={120} />
      <Step x={147} y={111} n={1} />

      {/* control plane */}
      <Group x={10} y={186} w={634} h={346} label="CONTROL PLANE" tone="primary" />
      <Group x={24} y={210} w={372} h={308} label="BACKEND · FastAPI · :8080" />
      <Node x={36} y={238} w={170} h={48} title="REST routers" sub="/api/* · /api/daemon/*" />
      <Node x={214} y={238} w={170} h={48} title="WebSockets" sub="/ws · interactive · browser" />
      <Node x={36} y={294} w={170} h={48} title="Auth + guards" sub="tokens · actors · authz" />
      <Node x={214} y={294} w={170} h={48} title="Domain services" sub="work · agents · knowledge" />
      <Node x={36} y={350} w={170} h={48} title="Run engine" sub="state machine · policy" tone="primary" />
      <Node x={214} y={350} w={170} h={48} title="Task queue" sub="routed by runtime" />
      <Node x={36} y={406} w={170} h={48} title="Background loops" sub="six sweeps and watchdogs" />
      <Node x={214} y={406} w={170} h={48} title="Event bus" sub="in-process pub/sub" />
      <Node x={36} y={462} w={348} h={46} title="AI services" sub="extractors · generators · embeddings · pilot decisions" />

      <Node x={424} y={310} w={206} h={124} title="MCP service · :8300" sub={["thin, stateless proxy", "tools by mode × role × actor", "forwards Authorization and ids", "public host: mcp."]} tone="primary" />
      <Line x1={424} y1={372} x2={398} y2={372} />
      <Step x={411} y={358} n={6} />

      {/* state */}
      <Group x={10} y={548} w={634} h={130} label="STATE" />
      <Node x={24} y={578} w={296} h={84} title="PostgreSQL 17 + pgvector" sub={["relational and JSONB state", "vectors · entity graph · checkpoints", "encrypted columns (Fernet)"]} />
      <Node x={334} y={578} w={296} h={84} title="Object storage · S3 or MinIO" sub={["vault files and attachments", "presigned URLs · 5 GB quota", "reached directly by clients"]} />
      <Line x1={172} y1={518} x2={172} y2={576} />
      <Step x={188} y={547} n={3} />
      <Line x1={330} y1={518} x2={420} y2={576} />

      {/* execution */}
      <Group x={664} y={186} w={286} h={346} label="EXECUTION · runtimes" />
      <Node x={678} y={216} w={258} h={64} title="Daemon" sub={["claims tasks · builds the workdir", "heartbeats every 15 s"]} />
      <Node x={678} y={312} w={124} h={64} title="Provider CLI" sub="claude · gemini" />
      <Node x={812} y={312} w={124} h={64} title="Chromium" sub="assistant browser" />
      <Node x={730} y={408} w={206} h={58} title="Native worker" sub="LangChain · LangGraph" dashed />
      <Label x={826} y={492} size={10.5}>BYO machine · hosted container</Label>
      <Label x={826} y={508} size={10.5}>platform container (Assistant)</Label>
      <Line x1={740} y1={280} x2={740} y2={310} />
      <Line x1={874} y1={280} x2={874} y2={310} />

      {/* external */}
      <Group x={664} y={548} w={286} h={130} label="EXTERNAL" tone="danger" />
      <Node x={678} y={574} w={258} h={44} title="LLM providers" sub="Anthropic · Google · OpenAI" />
      <Node x={678} y={626} w={258} h={44} title="Connectors and channels" sub="MCP servers · Slack · email" />

      {/* flows */}
      <Line x1={170} y1={168} x2={170} y2={208} />
      <Step x={186} y={188} n={2} />

      <Arrow d="M 680 248 L 398 248" both />
      <Label x={540} y={238} size={10.5}>claim · report · heartbeat</Label>
      <Step x={440} y={262} n={4} />

      <Arrow d="M 678 344 L 632 372" />
      <Step x={655} y={352} n={5} />

      <Arrow d="M 700 376 L 700 546" />
      <Step x={716} y={440} n={8} />

      <Arrow d="M 398 486 L 652 486 L 652 596 L 662 596" dashed />
      <Label x={560} y={478} size={10.5}>utility LLMs · embeddings</Label>
      <Step x={424} y={486} n={7} />
    </Diagram>
  );
}

/* ------------------------------------------------------------------ */
/* 3 · Backend modules                                                  */
/* ------------------------------------------------------------------ */

const MODULE_ZONES: { name: string; modules: string[]; tone?: "primary" | "success" }[] = [
  { name: "WORK", modules: ["stories", "projects", "milestones", "comments", "tags", "story_types", "inbox", "pins"] },
  { name: "ORCHESTRATION", modules: ["loops", "coordination", "attention", "briefs"], tone: "primary" },
  { name: "PLANNING", modules: ["planning", "planning_boards"] },
  { name: "AGENTS", modules: ["agents", "teams", "skills", "mcp", "memory"] },
  { name: "EXECUTION", modules: ["tasks", "daemon", "runtimes"], tone: "primary" },
  { name: "KNOWLEDGE", modules: ["knowledge", "vault", "explore"] },
  { name: "AUTOMATION", modules: ["flows"] },
  { name: "EXPERIENCE", modules: ["assistant", "chat", "shell", "onboarding", "workspace", "auth", "ai"] },
];

/** The modular monolith: eight domain groups over one shared core. */
export function BackendModulesDiagram() {
  const ZW = 224;
  const ZH = 178;
  return (
    <Diagram width={960} height={546} minWidth={820}>
      <Node x={10} y={10} w={940} h={52} title="HTTP and WebSocket surface" sub="/api/* · /api/daemon/* (runtime tokens) · /ws · /ws/daemon/interactive · /ws/assistant/browser" />
      {MODULE_ZONES.map((z, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const x = 10 + col * (ZW + 11);
        const y = 80 + row * (ZH + 14);
        return (
          <g key={z.name}>
            <Group x={x} y={y} w={ZW} h={ZH} label={z.name} tone={z.tone ?? "default"} />
            {z.modules.map((m, j) => (
              <Chip key={m} x={x + 12 + (j % 2) * 102} y={y + 34 + Math.floor(j / 2) * 34} w={98} label={m} />
            ))}
          </g>
        );
      })}
      <Node x={10} y={466} w={940} h={70} title="Core, shared by every domain" sub={["auth and dependencies (actors, guards) · models and enums (one source of literals) · events", "crypto · async database · tracing · request logging and CORS"]} tone="primary" />
    </Diagram>
  );
}

/* ------------------------------------------------------------------ */
/* 4 · One story run                                                    */
/* ------------------------------------------------------------------ */

type Msg = {
  n: number;
  y: number;
  from?: number;
  to?: number;
  label: string;
  dashed?: boolean;
  note?: { x: number; w: number };
};

/** One story run, end to end, as a sequence. */
export function EndToEndDiagram() {
  const lanes = [
    { x: 100, name: "Person", sub: "web app" },
    { x: 290, name: "Backend", sub: "run engine" },
    { x: 480, name: "Daemon", sub: "on a runtime" },
    { x: 670, name: "Agent", sub: "provider CLI" },
    { x: 860, name: "MCP", sub: "thin proxy" },
  ];
  const X = Object.fromEntries(lanes.map((l, i) => [i, l.x])) as Record<number, number>;
  const msgs: Msg[] = [
    { n: 1, y: 100, from: 0, to: 1, label: "approve plan · start work" },
    { n: 2, y: 140, label: "start_work: run created, work task queued with runtime_id", note: { x: 302, w: 400 } },
    { n: 3, y: 184, from: 2, to: 1, label: "claim task (tds_ token)" },
    { n: 4, y: 218, from: 1, to: 2, label: "task context, brief, MCP credentials", dashed: true },
    { n: 5, y: 258, from: 2, to: 3, label: "build workdir · spawn CLI" },
    { n: 6, y: 298, from: 3, to: 4, label: "post plan · verify · hand off" },
    { n: 7, y: 334, from: 4, to: 1, label: "forward and authorize (X-Agent-ID, X-Task-ID)" },
    { n: 8, y: 374, from: 3, to: 2, label: "exit: result · usage · summary", dashed: true },
    { n: 9, y: 410, from: 2, to: 1, label: "complete task" },
    { n: 10, y: 450, label: "check task to the reviewer: repeat 3 to 9, then a verdict", note: { x: 302, w: 400 } },
    { n: 11, y: 490, label: "risk below escalate_at: done · else wait for sign-off", note: { x: 302, w: 400 } },
    { n: 12, y: 534, from: 1, to: 0, label: "event bus → /ws: run changed", dashed: true },
    { n: 13, y: 574, label: "memory extraction: facts, then the summary page", note: { x: 302, w: 400 } },
  ];
  return (
    <Diagram width={960} height={612} minWidth={820}>
      {lanes.map((l) => (
        <g key={l.name}>
          <Node x={l.x - 75} y={8} w={150} h={46} title={l.name} sub={l.sub} tone={l.name === "Backend" ? "primary" : "default"} />
          <line x1={l.x} y1={56} x2={l.x} y2={604} stroke="var(--border)" strokeWidth={1.4} strokeDasharray="4 4" />
        </g>
      ))}
      {msgs.map((m) => {
        if (m.note) {
          return (
            <g key={m.n}>
              <rect x={m.note.x} y={m.y - 16} width={m.note.w} height={32} rx={8} fill="color-mix(in oklch, var(--primary) 8%, var(--card))" stroke="var(--primary)" strokeWidth={1.2} />
              <text x={m.note.x + 40} y={m.y + 4.5} fontSize="12.5" fill="var(--foreground)">
                {m.label}
              </text>
              <Step x={m.note.x + 20} y={m.y} n={m.n} />
            </g>
          );
        }
        const x1 = X[m.from!]!;
        const x2 = X[m.to!]!;
        const dir = x2 > x1 ? 1 : -1;
        const mid = (x1 + x2) / 2;
        return (
          <g key={m.n}>
            <Arrow d={`M ${x1 + dir * 4} ${m.y} L ${x2 - dir * 4} ${m.y}`} dashed={m.dashed} />
            <Label x={mid} y={m.y - 8} size={10.5}>
              {m.label}
            </Label>
            <Step x={x1 - dir * 20} y={m.y} n={m.n} />
          </g>
        );
      })}
    </Diagram>
  );
}

/* ------------------------------------------------------------------ */
/* 5 · State                                                            */
/* ------------------------------------------------------------------ */

/** What lives where, and who writes it. */
export function DataStoresDiagram() {
  return (
    <Diagram width={960} height={500} minWidth={820} legend>
      <Node x={10} y={10} w={160} h={52} title="Backend API" sub="the main writer" tone="primary" />
      <Node x={180} y={10} w={160} h={52} title="Native worker" sub="writes directly" />
      <Node x={352} y={10} w={190} h={52} title="Clients and agents" sub="presigned URLs only" />
      <Node x={554} y={10} w={200} h={52} title="Daemon" sub="writes only its own disk" />
      <Node x={766} y={10} w={184} h={52} title="Backend process" sub="owns it, rebuilt on restart" />

      <Group x={10} y={116} w={330} h={332} label="POSTGRESQL 17 + PGVECTOR" tone="primary" />
      <Node x={22} y={144} w={306} h={44} title="Work state" sub="stories · projects · runs · tasks · usage" />
      <Node x={22} y={196} w={306} h={44} title="JSONB documents" sub="criteria · drafts · policies · configs" />
      <Node x={22} y={248} w={306} h={44} title="Vectors" sub="knowledge chunks · entity embeddings" />
      <Node x={22} y={300} w={306} h={44} title="Graph" sub="entity · edge · mention, with provenance" />
      <Node x={22} y={352} w={306} h={44} title="Memory" sub="facts · promotions · the derived summary page" />
      <Node x={22} y={404} w={306} h={36} title="Secrets and checkpoints" sub="Fernet columns · LangGraph state" tone="danger" />

      <Group x={352} y={116} w={190} h={332} label="OBJECT STORE" />
      <Node x={364} y={144} w={166} h={52} title="Vault files" sub="documents · images" />
      <Node x={364} y={204} w={166} h={52} title="Attachments" sub="comments · chat replies" />
      <Node x={364} y={264} w={166} h={52} title="Quota" sub="5 GB per workspace" />
      <Node x={364} y={324} w={166} h={52} title="Access" sub="presigned PUT and GET only" tone="danger" />

      <Group x={554} y={116} w={200} h={332} label="RUNTIME DISK" />
      <Node x={566} y={144} w={176} h={52} title="Task directory" sub="workdir · .mcp.json · logs" />
      <Node x={566} y={204} w={176} h={52} title="Git cache" sub="a worktree per task" />
      <Node x={566} y={264} w={176} h={52} title="Soul and skills" sub="instructions · MCP · skills" />
      <Node x={566} y={324} w={176} h={52} title="Pruned" sub="after 30 days" dashed />

      <Group x={766} y={116} w={184} h={332} label="IN MEMORY" />
      <Node x={778} y={144} w={160} h={52} title="Event bus" sub="queue and fan-out" />
      <Node x={778} y={204} w={160} h={52} title="Coalescing state" sub="locks · dirty flags" />
      <Node x={778} y={264} w={160} h={52} title="Browser hub" sub="frames, never stored" />
      <Node x={778} y={324} w={160} h={52} title="Socket registry" sub="interactive daemons" />

      <Line x1={90} y1={62} x2={90} y2={114} />
      <Line x1={260} y1={62} x2={260} y2={114} />
      <Line x1={447} y1={62} x2={447} y2={114} />
      <Line x1={654} y1={62} x2={654} y2={114} />
      <Line x1={858} y1={62} x2={858} y2={114} dashed />
      <Label x={10} y={474} anchor="start" size={10.5}>Every row carries workspace_id. The in-memory pieces are why the backend runs as one process today; see Scaling and limits.</Label>
    </Diagram>
  );
}

/* ------------------------------------------------------------------ */
/* 6 · Deployment                                                       */
/* ------------------------------------------------------------------ */

/** The single-host production topology. */
export function DeploymentDiagram() {
  return (
    <Diagram width={960} height={580} minWidth={820} legend>
      <Group x={10} y={10} w={940} h={74} label="INTERNET" />
      <Node x={24} y={36} w={200} h={40} title="ACME" sub="Let's Encrypt" />
      <Node x={240} y={36} w={230} h={40} title="LLM APIs, MCP connectors" sub="egress only" />
      <Node x={486} y={36} w={210} h={40} title="Remote daemons" sub="BYO machines" />
      <Node x={712} y={36} w={224} h={40} title="Browsers and CLI" />

      <Group x={10} y={104} w={940} h={394} label="ONE HOST · EC2 via CloudFormation · docker compose" tone="primary" />
      <Node x={24} y={132} w={912} h={46} title="caddy · :80 :443" sub="five virtual hosts · automatic TLS · zstd and gzip" />
      <Line x1={591} y1={84} x2={591} y2={130} />
      <Line x1={824} y1={84} x2={824} y2={130} />
      <Label x={706} y={96} size={10.5}>HTTPS · 443</Label>

      <Node x={24} y={204} w={130} h={64} title="web" sub="Next.js :3000" />
      <Node x={166} y={204} w={130} h={64} title="landing" sub="Next.js :3000" />
      <Node x={320} y={204} w={130} h={64} title="mcp" sub="python · :8300" />
      <Node x={484} y={204} w={160} h={64} title="backend" sub="FastAPI · :8080" tone="primary" />
      <Node x={676} y={204} w={140} h={64} title="daemon" sub="provider CLIs" />
      <Node x={828} y={204} w={108} h={64} title="migrate" sub="one-shot" dashed />
      <Line x1={89} y1={178} x2={89} y2={202} />
      <Line x1={231} y1={178} x2={231} y2={202} />
      <Line x1={385} y1={178} x2={385} y2={202} />
      <Line x1={564} y1={178} x2={564} y2={202} />
      <Line x1={450} y1={236} x2={482} y2={236} />
      <Line x1={676} y1={236} x2={646} y2={236} />

      <Node x={24} y={324} w={200} h={64} title="db" sub="pgvector pg17 · pgdata" />
      <Node x={236} y={324} w={200} h={64} title="minio" sub=":9000 · minio_data" />
      <Arrow d="M 564 268 L 564 296 L 124 296 L 124 322" />
      <Arrow d="M 336 296 L 336 322" />

      <Group x={448} y={310} w={488} h={118} label="SIBLING CONTAINERS · started through docker.sock" dashed />
      <Node x={462} y={340} w={142} h={64} title="hosted runtime" sub="per workspace claim" />
      <Node x={616} y={340} w={142} h={64} title="hosted runtime" sub="per workspace claim" />
      <Node x={770} y={340} w={152} h={64} title="platform runtime" sub="the Assistant" />
      <Arrow d="M 610 268 L 610 296 L 692 296 L 692 308" dashed />
      <Label x={652} y={288} size={10}>docker API</Label>

      <Node x={24} y={412} w={412} h={62} title="backend holds /var/run/docker.sock" sub={["root-equivalent on the host: an API compromise is a host", "compromise. A socket proxy would narrow it."]} tone="danger" />
      <Chip x={452} y={446} w={110} label="pgdata" />
      <Chip x={570} y={446} w={110} label="minio_data" />
      <Chip x={688} y={446} w={110} label="daemon_home" />
      <Chip x={806} y={446} w={116} label="caddy_data" />

      <Node x={10} y={514} w={940} h={50} title="AWS resources (CloudFormation)" sub="VPC and subnet · security group 80 and 443 (22 opt-in) · EC2 with gp3 disk · Elastic IP · IAM instance role" />
    </Diagram>
  );
}
