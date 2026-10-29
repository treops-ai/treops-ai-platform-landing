import { Arrow, Diagram, Group, Label, Line, Node } from "./tech-svg";

const LAYERS: [string, string][] = [
  ["Interface layer", "Web and desktop app · Assistant chat · daily brief · inbox"],
  ["Orchestration layer", "Story-run state machine · escalation chain · workspace run policy"],
  ["Planning layer", "Planning sessions and draft · run plan and plan checkpoint"],
  ["Reasoning layer", "Model tier · thinking effort · ask, assume, flag risk · independent review"],
  ["Memory layer", "Short-term: session, brief · Long-term: episodic, semantic, procedural"],
  ["Knowledge & ontology layer", "Vector store + entity graph · fixed ontology · read-only search"],
  ["Automation layer", "Flows · schedules · channels · dependency auto-start · watchdogs"],
  ["Tool layer", "MCP tools · mode × role × actor visibility · thin proxy"],
  ["Execution layer", "Daemon · agent harness · provider CLI · runtimes"],
  ["Persistence & telemetry", "Postgres + pgvector · event bus · run thread · task usage"],
];

const GUARDS = [
  "Evidence on every verdict",
  "Acceptance-criteria gate",
  "Iteration and question budgets",
  "Risk-based human sign-off",
  "Autonomy: suggest or act",
  "Backend-only authorization",
  "Task and project pinning",
  "Egress guard on the browser",
  "Compute allowance",
];

/** The standard layered view of an agent platform, mapped to TreOps. */
export function LayersDiagram() {
  const ROW = 52;
  const top = 20;
  return (
    <Diagram width={960} height={top + LAYERS.length * ROW + 10} minWidth={780}>
      {LAYERS.map(([name, desc], i) => {
        const y = top + i * ROW;
        return (
          <g key={name}>
            <rect x={10} y={y} width={210} height={42} rx={10} fill="color-mix(in oklch, var(--primary) 8%, var(--card))" stroke="var(--primary)" strokeWidth={1.4} />
            <text x={115} y={y + 26} textAnchor="middle" fontSize="15" fontWeight="600" fill="var(--foreground)">
              {name}
            </text>
            <rect x={230} y={y} width={480} height={42} rx={10} fill="var(--card)" stroke="var(--border)" />
            <text x={244} y={y + 26} fontSize="13.5" fill="var(--muted-foreground)">
              {desc}
            </text>
            {i >= 1 && i <= 8 ? <Line x1={738} y1={y + 21} x2={712} y2={y + 21} dashed /> : null}
          </g>
        );
      })}
      <rect x={740} y={top + ROW} width={210} height={8 * ROW - 10} rx={12} fill="color-mix(in oklch, var(--destructive) 6%, transparent)" stroke="var(--destructive)" strokeWidth={1.4} />
      <text x={845} y={top + ROW + 28} textAnchor="middle" fontSize="15" fontWeight="600" fill="var(--foreground)">
        Guardrails
      </text>
      <text x={845} y={top + ROW + 44} textAnchor="middle" fontSize="12" fill="var(--muted-foreground)">
        cross-cutting, not a layer
      </text>
      {GUARDS.map((g, i) => (
        <text key={g} x={756} y={top + ROW + 76 + i * 34} fontSize="12.5" fill="var(--muted-foreground)">
          • {g}
        </text>
      ))}
    </Diagram>
  );
}

/** Defence in depth around one tool call. */
export function GuardrailsDiagram() {
  const checks = [
    { x: 10, t: "1 · Visibility", s: ["mode × role × actor", "decides the tool list"], r: "tool absent" },
    { x: 195, t: "2 · Identity", s: ["who is really acting", "runtime_may_act_as"], r: "403" },
    { x: 380, t: "3 · Scope", s: ["pinned to the task's", "project (X-Task-ID)"], r: "403" },
    { x: 565, t: "4 · Domain rules", s: ["criteria gate, evidence,", "planning guard, autonomy"], r: "400 · 403 · 409" },
    { x: 750, t: "5 · Budgets", s: ["iterations, questions,", "compute allowance"], r: "escalated" },
  ];
  return (
    <Diagram width={960} height={390} minWidth={780}>
      <Label x={10} y={22} anchor="start" strong tone="primary">PREVENTIVE — every tool call passes through these, in the backend</Label>
      {checks.map((c, i) => (
        <g key={c.t}>
          <Node x={c.x} y={36} w={160} h={70} title={c.t} sub={c.s} tone="primary" />
          <Label x={c.x + 80} y={128} size={10.5}>else: {c.r}</Label>
          {i < checks.length - 1 ? <Line x1={c.x + 160} y1={71} x2={c.x + 183} y2={71} /> : null}
        </g>
      ))}
      <Node x={790} y={160} w={160} h={52} title="Allowed" sub="executed and logged" tone="success" />
      <Line x1={896} y1={106} x2={896} y2={158} />

      <Label x={10} y={246} anchor="start" strong tone="primary">DETECTIVE · CORRECTIVE · HUMAN</Label>
      <Node x={10} y={258} w={290} h={96} title="Detective" sub={["watchdogs find parked runs,", "hung tasks, unanswered Assistant,", "and runtimes that recovered"]} />
      <Node x={335} y={258} w={290} h={96} title="Corrective" sub={["recover → Assistant → person", "infrastructure failures wait on", "the runtime, no rework spent"]} />
      <Node x={660} y={258} w={290} h={96} title="Human checkpoints" sub={["plan checkpoint · sign-off at", "escalate_at · decisions that", "carry a recommended answer"]} tone="success" />
    </Diagram>
  );
}

/** Flows, schedules, deliveries, plus event-driven starts. */
export function AutomationDiagram() {
  return (
    <Diagram width={960} height={360} minWidth={780}>
      <Label x={10} y={20} anchor="start" strong tone="primary">FLOWS — a procedure you wrote once</Label>
      <Node x={10} y={34} w={170} h={56} title="Schedule" sub="hourly · daily · weekdays · weekly" />
      <Node x={10} y={104} w={170} h={56} title="Manual run" sub="a person presses run" />
      <Node x={230} y={52} w={210} h={90} title="Flow runner" sub={["steps in order", "per-step model tier", "team and runtime routed"]} tone="primary" />
      <Node x={490} y={52} w={210} h={90} title="Steps run on a runtime" sub={["agent, research, MCP action,", "reasoning group …"]} />
      <Node x={750} y={52} w={200} h={90} title="Deliveries" sub={["a story, a Slack channel,", "or members' email"]} tone="success" />
      <Line x1={180} y1={62} x2={228} y2={80} />
      <Line x1={180} y1={132} x2={228} y2={116} />
      <Line x1={440} y1={97} x2={488} y2={97} />
      <Line x1={700} y1={97} x2={748} y2={97} />

      <Label x={10} y={206} anchor="start" strong tone="primary">WORK — started by events, not by clicks</Label>
      <Node x={10} y={220} w={170} h={56} title="Blocker done" sub="dependency clears" />
      <Node x={230} y={220} w={210} h={56} title="Dependency scanner" sub="calls start_work, never sets status" />
      <Node x={490} y={220} w={210} h={56} title="Story run" sub="plan → work → check" tone="primary" />
      <Line x1={180} y1={248} x2={228} y2={248} />
      <Line x1={440} y1={248} x2={488} y2={248} />

      <Node x={750} y={208} w={200} h={80} title="Watchdogs" sub={["parked runs · hung tasks", "unanswered Assistant", "stale flow waits"]} dashed />
      <Arrow d="M 750 248 L 702 248" dashed />
      <Arrow d="M 770 208 L 698 144" dashed />

      <Label x={10} y={316} anchor="start" size={10.5}>The automation loop claims due schedules and pending deliveries with SKIP LOCKED, so several backend processes can run it safely.</Label>
      <Label x={10} y={332} anchor="start" size={10.5}>A schedule slot is skipped while the flow’s previous scheduled run is still going, so runs never pile up behind an offline runtime.</Label>
    </Diagram>
  );
}

/** Short-term vs long-term memory, and how knowledge moves between them. */
export function MemoryTaxonomyDiagram() {
  return (
    <Diagram width={960} height={420} minWidth={780}>
      <Group x={10} y={16} w={260} h={340} label="SHORT-TERM · WORKING MEMORY" />
      <Node x={30} y={50} w={220} h={56} title="Context window" sub="the live provider session" />
      <Node x={30} y={120} w={220} h={56} title="Session resume" sub="same CLI session, full history" />
      <Node x={30} y={190} w={220} h={56} title="Run brief" sub="rebuilt for every task of a run" />
      <Node x={30} y={260} w={220} h={56} title="Handoff summary" sub="when resume is not possible" />

      <Group x={290} y={16} w={665} h={340} label="LONG-TERM MEMORY" />
      <Node x={305} y={50} w={165} h={56} title="Episodic" sub="what happened" tone="primary" />
      <Node x={545} y={50} w={165} h={56} title="Semantic" sub="what is true" tone="primary" />
      <Node x={785} y={50} w={165} h={56} title="Procedural" sub="how to do it" tone="primary" />
      <Line x1={470} y1={78} x2={543} y2={78} />
      <Label x={507} y={68} size={10}>consolidate</Label>
      <Line x1={710} y1={78} x2={783} y2={78} />
      <Label x={747} y={68} size={10}>promote</Label>

      <Node x={305} y={140} w={165} h={150} title="Stores" sub={["run thread entries", "task message stream", "continuation summary", "comments"]} />
      <Node x={545} y={140} w={165} h={150} title="Stores" sub={["MemoryFact", "lesson · preference", "decision · fact", "summary page (derived)"]} />
      <Node x={785} y={140} w={165} h={150} title="Stores" sub={["project instructions", "(4 000 chars)", "workspace Skills"]} />
      <Label x={387} y={316} size={10}>written by the harness</Label>
      <Label x={627} y={316} size={10}>written by the extractor</Label>
      <Label x={867} y={316} size={10}>written by approval only</Label>

      <Arrow d="M 620 356 L 620 384 L 140 384 L 140 358" />
      <Label x={380} y={402} size={10.5}>injected at task start — whole page, no retrieval step</Label>
    </Diagram>
  );
}

/** The two ontologies: what work is made of, and what documents are about. */
export function OntologyDiagram() {
  const entity = ["person", "team", "system", "concept", "document", "decision", "event", "location", "other"];
  const relation = ["relates_to", "part_of", "depends_on", "authored_by", "mentions", "causes", "precedes", "located_in"];
  const risk = ["scope", "security", "data", "external", "cost", "deadline", "quality", "dependency"];
  return (
    <Diagram width={960} height={470} minWidth={780}>
      <Label x={10} y={20} anchor="start" strong tone="primary">WORK ONTOLOGY — what the platform reasons about</Label>
      <Node x={10} y={34} w={130} h={44} title="Workspace" />
      <Node x={170} y={34} w={130} h={44} title="Project" />
      <Node x={330} y={34} w={130} h={44} title="Milestone" />
      <Node x={490} y={34} w={130} h={44} title="Story" tone="primary" />
      <Node x={650} y={34} w={130} h={44} title="Run" tone="primary" />
      <Node x={810} y={34} w={130} h={44} title="Task" />
      <Line x1={140} y1={56} x2={168} y2={56} />
      <Line x1={300} y1={56} x2={328} y2={56} />
      <Line x1={460} y1={56} x2={488} y2={56} />
      <Line x1={620} y1={56} x2={648} y2={56} />
      <Line x1={780} y1={56} x2={808} y2={56} />

      <Node x={330} y={114} w={130} h={44} title="Story type" />
      <Node x={490} y={114} w={130} h={44} title="Criteria" sub="accepted · result" />
      <Node x={650} y={114} w={130} h={44} title="Risk" sub="low · medium · high" />
      <Node x={810} y={114} w={130} h={44} title="Agent / Team" sub="assignee · reviewer" />
      <Line x1={460} y1={136} x2={510} y2={80} />
      <Line x1={555} y1={114} x2={555} y2={80} />
      <Line x1={715} y1={114} x2={715} y2={80} />
      <Line x1={875} y1={114} x2={875} y2={80} />
      <Label x={10} y={104} anchor="start" size={10.5}>Stories also link to each other (blocked_by),</Label>
      <Label x={10} y={120} anchor="start" size={10.5}>which is what the dependency scanner reads.</Label>

      <Label x={10} y={196} anchor="start" strong tone="primary">KNOWLEDGE ONTOLOGY — what documents are about (fixed)</Label>
      <Label x={10} y={216} anchor="start" size={10.5}>Entity types</Label>
      {entity.map((e, i) => (
        <Node key={e} x={10 + i * 104} y={224} w={98} h={30} title={e} />
      ))}
      <Label x={10} y={282} anchor="start" size={10.5}>Relation types</Label>
      {relation.map((e, i) => (
        <Node key={e} x={10 + i * 118} y={290} w={112} h={30} title={e} />
      ))}

      <Label x={10} y={360} anchor="start" strong tone="primary">RISK ONTOLOGY — what can go wrong on a run</Label>
      <Label x={10} y={380} anchor="start" size={10.5}>Categories</Label>
      {risk.map((e, i) => (
        <Node key={e} x={10 + i * 118} y={388} w={112} h={30} title={e} />
      ))}
      <Label x={10} y={448} anchor="start" size={10.5}>Unknown values are coerced to the fallback (other, relates_to), so extraction can never invent new types.</Label>
    </Diagram>
  );
}

/** Plan → act → verify → review → decide. */
export function ReasoningLoopDiagram() {
  const steps = [
    { x: 10, t: "Plan", s: ["post the approach", "before touching anything"] },
    { x: 205, t: "Act", s: ["work through MCP tools", "in the working directory"] },
    { x: 400, t: "Verify", s: ["ac_verify with evidence", "met or not_met"] },
    { x: 595, t: "Review", s: ["a different agent checks", "every criterion"] },
    { x: 790, t: "Decide", s: ["pass → done path", "fail → rework"] },
  ];
  return (
    <Diagram width={960} height={290} minWidth={780}>
      {steps.map((s, i) => (
        <g key={s.t}>
          <Node x={s.x} y={64} w={160} h={64} title={s.t} sub={s.s} tone={s.t === "Review" ? "primary" : "default"} />
          {i < steps.length - 1 ? <Line x1={s.x + 160} y1={96} x2={s.x + 193} y2={96} /> : null}
        </g>
      ))}
      <Arrow d="M 870 64 C 870 8, 285 8, 285 62" dashed />
      <Label x={578} y={24} size={10.5}>rework, bounded by max_iterations</Label>

      <Node x={10} y={190} w={160} h={64} title="Thinking effort" sub={["low · medium · high", "per agent or team"]} dashed />
      <Node x={205} y={190} w={160} h={64} title="Ask" sub={["run_ask: block, or", "assume and keep going"]} dashed />
      <Node x={400} y={190} w={160} h={64} title="Flag risk" sub={["run_flag_risk", "recomputes run risk"]} dashed />
      <Line x1={90} y1={190} x2={90} y2={130} dashed />
      <Line x1={285} y1={190} x2={285} y2={130} dashed />
      <Line x1={480} y1={190} x2={480} y2={130} dashed />
      <Label x={590} y={206} anchor="start" size={10.5}>Self-check is allowed only when no reviewer</Label>
      <Label x={590} y={222} anchor="start" size={10.5}>can be dispatched, and is recorded as a fallback.</Label>
    </Diagram>
  );
}
