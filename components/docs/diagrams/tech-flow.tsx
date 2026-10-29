import { Arrow, Diagram, Label, Line, Node } from "./tech-svg";

/** Claim → working directory → provider CLI → report. */
export function HarnessDiagram() {
  return (
    <Diagram width={960} height={330} minWidth={760}>
      <Node x={10} y={36} w={200} h={64} title="1 · Claim the task" sub={["daemon claims over /api/daemon", "gets context + MCP credentials"]} />
      <Node x={250} y={36} w={200} h={64} title="2 · Sync the soul" sub={["agent instructions, MCP config,", "workspace skills → local disk"]} />
      <Node x={490} y={36} w={200} h={64} title="3 · Assemble workdir" sub={["CLAUDE.md · IDENTITY.md", "skills · .mcp.json · memory"]} tone="primary" />
      <Node x={730} y={36} w={200} h={64} title="4 · Resolve model" sub={["intelligence → model", "thinking → effort"]} />
      <Line x1={210} y1={68} x2={248} y2={68} />
      <Line x1={450} y1={68} x2={488} y2={68} />
      <Line x1={690} y1={68} x2={728} y2={68} />
      <Arrow d="M 830 100 L 830 136 L 110 136 L 110 166" />

      <Node x={10} y={170} w={200} h={64} title="5 · Spawn provider CLI" sub={["resume the session, or", "fresh with a system prompt"]} />
      <Node x={250} y={170} w={200} h={64} title="6 · Stream" sub={["messages + tool calls", "tokens per model"]} />
      <Node x={490} y={170} w={200} h={64} title="7 · Hand off" sub={["continuation summary", "result · session id · usage"]} tone="primary" />
      <Line x1={210} y1={202} x2={248} y2={202} />
      <Line x1={450} y1={202} x2={488} y2={202} />

      <Node x={730} y={170} w={200} h={64} title="Next task starts with" sub={["resume, else the summary,", "else the run brief"]} dashed />
      <Line x1={690} y1={202} x2={728} y2={202} dashed />

      <Node x={250} y={264} w={200} h={46} title="MCP service" sub="every action goes here" />
      <Line x1={350} y1={234} x2={350} y2={262} both />
    </Diagram>
  );
}

/** Run phases. */
export function RunStateDiagram() {
  return (
    <Diagram width={960} height={380} minWidth={760}>
      <Node x={40} y={112} w={170} h={56} title="Working" sub="plan, implement, verify" tone="primary" />
      <Node x={395} y={112} w={170} h={56} title="Checking" sub="reviewer or self-check" tone="primary" />
      <Node x={750} y={112} w={170} h={56} title="Done" sub={["auto-complete:", "reopen for 3 days"]} tone="success" />
      <Node x={395} y={252} w={170} h={56} title="Waiting" sub={["on agent · assistant", "human · runtime"]} dashed />
      <Node x={750} y={312} w={170} h={52} title="Stopped" sub="cancelled or recovery gave up" tone="danger" dashed />

      <Line x1={210} y1={140} x2={393} y2={140} />
      <Label x={302} y={130} size={10.5}>handoff</Label>
      <Label x={302} y={156} size={10}>criteria verified</Label>

      <Line x1={565} y1={140} x2={748} y2={140} />
      <Label x={657} y={130} size={10.5}>pass</Label>
      <Label x={657} y={156} size={10}>risk below escalate_at</Label>

      <Arrow d="M 450 112 C 450 44, 125 44, 125 110" dashed />
      <Label x={290} y={52} size={10.5}>fail → rework (up to max_iterations)</Label>

      <Arrow d="M 125 168 C 125 280, 250 280, 393 280" dashed />
      <Label x={200} y={298} anchor="start" size={10.5}>question · risk · stall</Label>

      <Line x1={480} y1={168} x2={480} y2={250} dashed />
      <Label x={490} y={214} anchor="start" size={10.5}>sign-off needed</Label>
      <Label x={490} y={228} anchor="start" size={10}>risk ≥ escalate_at</Label>

      <Arrow d="M 565 270 C 700 270, 835 250, 835 170" dashed />
      <Label x={700} y={246} size={10.5}>person signs off</Label>

      <Line x1={565} y1={296} x2={748} y2={332} dashed />
      <Label x={640} y={330} size={10}>cancelled</Label>

      <Label x={125} y={330} anchor="start" size={10.5}>Waiting resumes the phase it left (resume_phase).</Label>
    </Diagram>
  );
}

/** Acceptance criteria lifecycle and the hard gate. */
export function CriteriaDiagram() {
  return (
    <Diagram width={960} height={300} minWidth={760}>
      <Node x={10} y={40} w={165} h={64} title="Story text" sub="title + description" />
      <Node x={205} y={40} w={165} h={64} title="Propose" sub={["deterministic parse,", "then LLM augment"]} />
      <Node x={400} y={40} w={165} h={64} title="Person accepts" sub="proposed → accepted" tone="primary" />
      <Node x={595} y={40} w={165} h={64} title="Assignee verifies" sub="met / not_met + evidence" />
      <Node x={790} y={40} w={160} h={64} title="Reviewer re-checks" sub="every criterion" />
      <Line x1={175} y1={72} x2={203} y2={72} />
      <Line x1={370} y1={72} x2={398} y2={72} />
      <Line x1={565} y1={72} x2={593} y2={72} />
      <Line x1={760} y1={72} x2={788} y2={72} />

      <Node x={595} y={160} w={165} h={64} title="Hard gate" sub={["work cannot complete while", "an accepted item is pending"]} tone="danger" />
      <Line x1={677} y1={104} x2={677} y2={158} dashed />

      <Node x={790} y={160} w={160} h={64} title="Verdict" sub={["pass → done path", "fail → rework round"]} tone="success" />
      <Line x1={870} y1={104} x2={870} y2={158} />

      <Node x={10} y={160} w={360} h={64} title="Stale detection" sub={["source_hash = sha256(title + description).", "Edit the text and the criteria are marked stale."]} dashed />
      <Line x1={92} y1={104} x2={92} y2={158} dashed />

      <Label x={480} y={270} size={11}>Checklist items are a separate, lightweight to-do list. The run engine never reads them.</Label>
    </Diagram>
  );
}

/** Who gets asked when a run is stuck. */
export function EscalationDiagram() {
  return (
    <Diagram width={960} height={250} minWidth={800}>
      <Node x={10} y={40} w={150} h={64} title="Question, risk, stall" />
      <Node x={240} y={40} w={150} h={64} title="Peer agent" sub="reviewer or assignee" />
      <Node x={480} y={40} w={150} h={64} title="TreOps Assistant" sub="wake_assistant" tone="primary" />
      <Node x={720} y={34} w={230} h={76} title="A person" sub={["with a recommended answer", "never an open question"]} tone="success" />
      <Line x1={160} y1={72} x2={238} y2={72} />
      <Line x1={390} y1={72} x2={478} y2={72} />
      <Line x1={630} y1={72} x2={718} y2={72} />
      <Label x={199} y={62} size={10.5}>route</Label>
      <Label x={434} y={62} size={10.5}>unresolved</Label>
      <Label x={674} y={62} size={10.5}>can’t decide</Label>

      <Arrow d="M 85 40 C 85 6, 835 6, 835 32" dashed />
      <Label x={460} y={28} size={10.5}>no assistant: straight to a person</Label>

      <Node x={10} y={160} w={200} h={64} title="Infrastructure failure" sub="auth · quota · network" tone="danger" dashed />
      <Node x={270} y={160} w={230} h={64} title="Waiting on the runtime" sub="no rework round is spent" />
      <Node x={560} y={160} w={230} h={64} title="Resumes when healthy" sub="same phase, same brief" />
      <Line x1={210} y1={192} x2={268} y2={192} />
      <Line x1={500} y1={192} x2={558} y2={192} />
    </Diagram>
  );
}

/** Where model choice is decided. */
export function ModelDiagram() {
  return (
    <Diagram width={960} height={370} minWidth={760}>
      <Node x={10} y={30} w={240} h={52} title="Agent config" sub="intelligence · thinking · model" tone="primary" />
      <Node x={10} y={100} w={240} h={52} title="Team turn" sub="team thinking overrides the lead's" />
      <Node x={10} y={170} w={240} h={52} title="Flow step" sub="a tier per step, or the agent’s own" />

      <Line x1={250} y1={56} x2={290} y2={56} plain />
      <Line x1={250} y1={126} x2={290} y2={126} plain />
      <Line x1={250} y1={196} x2={290} y2={196} plain />
      <Line x1={290} y1={56} x2={290} y2={196} plain />
      <Arrow d="M 290 82 L 326 82" />
      <Arrow d="M 290 170 L 326 170" />

      <Node x={330} y={42} w={270} h={72} title="Daemon resolver" sub={["claude: haiku · sonnet · opus", "gemini: flash-lite · flash · pro"]} />
      <Node x={330} y={138} w={270} h={72} title="Backend engine resolver" sub={["MODEL_MATRIX: provider × tier", "explicit model beats the matrix"]} />

      <Node x={660} y={42} w={290} h={72} title="Provider CLI" sub={["--model, thinking level", "falls back to the runtime default"]} />
      <Node x={660} y={138} w={290} h={72} title="LangChain chat model" sub={["init_chat_model(provider:model)", "anthropic: adaptive thinking + effort"]} />
      <Line x1={600} y1={78} x2={658} y2={78} />
      <Line x1={600} y1={174} x2={658} y2={174} />

      <Node x={10} y={290} w={450} h={64} title="Not built: pick the model from run signals" sub={["risk, rework round, retries and cost could move the tier", "hooks: LoopService._dispatch, the daemon resolver"]} tone="danger" dashed />
      <Arrow d="M 220 290 L 220 232 L 180 232 L 180 224" dashed />
      <Label x={480} y={326} anchor="start" size={11}>Every task’s tokens are recorded per (provider, model) for cost.</Label>
    </Diagram>
  );
}

/** Memory: from a closed task to standing rules. */
export function MemoryDiagram() {
  return (
    <Diagram width={960} height={340} minWidth={760}>
      <Node x={10} y={40} w={200} h={64} title="Task or run closes" sub="own session, never blocks" />
      <Node x={250} y={40} w={200} h={64} title="Extractor LLM" sub={["sees the run summary,", "comments, ALL active facts"]} tone="primary" />
      <Node x={490} y={40} w={200} h={64} title="Memory facts" sub={["create · supersede ·", "reinforce"]} />
      <Node x={730} y={40} w={200} h={64} title="Summary page" sub="rebuilt from active facts" />
      <Line x1={210} y1={72} x2={248} y2={72} />
      <Line x1={450} y1={72} x2={488} y2={72} />
      <Line x1={690} y1={72} x2={728} y2={72} />

      <Node x={730} y={196} w={200} h={64} title="Next task prompt" sub="whole page injected" tone="success" />
      <Line x1={830} y1={104} x2={830} y2={194} />
      <Label x={842} y={152} anchor="start" size={10.5}>no retrieval step</Label>

      <Node x={490} y={196} w={200} h={64} title="Promotion proposed" sub="reinforced 3+ times" dashed />
      <Line x1={590} y1={104} x2={590} y2={194} dashed />
      <Node x={250} y={196} w={200} h={64} title="Person approves" sub="the only gate" tone="primary" />
      <Node x={10} y={196} w={200} h={64} title="Standing rule" sub="project instructions or a Skill" />
      <Line x1={490} y1={228} x2={452} y2={228} dashed />
      <Line x1={250} y1={228} x2={212} y2={228} dashed />
      <Arrow d="M 110 260 L 110 300 L 830 300 L 830 262" />
      <Label x={470} y={318} size={10.5}>approved rules are injected every task, and the facts behind them are archived</Label>
    </Diagram>
  );
}

/** Ingest and search for the knowledge base. */
export function RagDiagram() {
  return (
    <Diagram width={960} height={350} minWidth={760}>
      <Label x={10} y={22} anchor="start" strong tone="primary">INGEST</Label>
      <Node x={10} y={34} w={150} h={56} title="Upload" sub="pdf · text" />
      <Node x={200} y={34} w={150} h={56} title="Chunk" sub="split + clean" />
      <Node x={390} y={34} w={150} h={56} title="Embed" sub="OpenAI key required" />
      <Node x={580} y={34} w={170} h={56} title="Vector store" sub="pgvector" tone="primary" />
      <Line x1={160} y1={62} x2={198} y2={62} />
      <Line x1={350} y1={62} x2={388} y2={62} />
      <Line x1={540} y1={62} x2={578} y2={62} />

      <Node x={200} y={124} w={150} h={56} title="Extract entities" sub="LLM · fixed ontology" dashed />
      <Node x={390} y={124} w={150} h={56} title="Normalize" sub="dedup · drop bad edges" />
      <Node x={580} y={124} w={170} h={56} title="Graph tables" sub="entity · edge · mention" tone="primary" />
      <Line x1={275} y1={90} x2={275} y2={122} dashed />
      <Line x1={350} y1={152} x2={388} y2={152} />
      <Line x1={540} y1={152} x2={578} y2={152} />
      <Label x={10} y={146} anchor="start" size={10.5}>No LLM key: skipped,</Label>
      <Label x={10} y={162} anchor="start" size={10.5}>document still ready.</Label>

      <Label x={10} y={232} anchor="start" strong tone="primary">SEARCH</Label>
      <Node x={10} y={244} w={150} h={56} title="knowledge_search" sub="MCP tool" />
      <Node x={200} y={244} w={150} h={56} title="Seed chunks" sub="nearest by vector" />
      <Node x={390} y={244} w={150} h={56} title="Walk the graph" sub="1–2 hops via mentions" />
      <Node x={580} y={244} w={170} h={56} title="Answer context" sub="chunks + entities + edges" tone="success" />
      <Line x1={160} y1={272} x2={198} y2={272} />
      <Line x1={350} y1={272} x2={388} y2={272} />
      <Line x1={540} y1={272} x2={578} y2={272} />

      <Label x={780} y={62} anchor="start" size={10.5}>every row carries workspace_id</Label>
      <Label x={780} y={78} anchor="start" size={10.5}>so every query is scoped</Label>
      <Label x={780} y={152} anchor="start" size={10.5}>edges keep provenance, so</Label>
      <Label x={780} y={168} anchor="start" size={10.5}>re-ingest replaces facts cleanly</Label>
    </Diagram>
  );
}

/** Propose, edit, apply. */
export function PlanningDiagram() {
  return (
    <Diagram width={960} height={330} minWidth={760}>
      <Node x={10} y={40} w={200} h={64} title="Person states a goal" sub="in a planning session" />
      <Node x={250} y={40} w={200} h={64} title="Planning agent" sub="PLANNING mode · PM role" tone="primary" />
      <Node x={490} y={40} w={200} h={64} title="Draft" sub={["planning_draft_set", "up to 30 items"]} />
      <Node x={730} y={40} w={200} h={64} title="Person edits" sub="strict: bad edit = error" />
      <Line x1={210} y1={72} x2={248} y2={72} />
      <Line x1={450} y1={72} x2={488} y2={72} />
      <Line x1={690} y1={72} x2={728} y2={72} both />
      <Label x={709} y={62} size={10}>overrides</Label>

      <Node x={730} y={170} w={200} h={64} title="Apply" sub="one approval" tone="success" />
      <Line x1={830} y1={104} x2={830} y2={168} />
      <Node x={490} y={160} w={200} h={84} title="Create everything" sub={["stories · milestones", "assignee · reviewer · risk", "criteria · dependencies"]} />
      <Node x={250} y={170} w={200} h={64} title="Start unblocked stories" sub="each becomes a run" tone="primary" />
      <Line x1={730} y1={202} x2={692} y2={202} />
      <Line x1={490} y1={202} x2={452} y2={202} />
      <Label x={480} y={316} size={10.5}>↻ a cleared dependency starts the next story</Label>

      <Node x={10} y={170} w={200} h={64} title="Backend guard" sub={["agent creates are 403", "while planning"]} tone="danger" dashed />
      <Line x1={110} y1={170} x2={300} y2={106} dashed />
      <Label x={10} y={262} anchor="start" size={10.5}>Agent writes are lenient: bad items are skipped</Label>
      <Label x={10} y={278} anchor="start" size={10.5}>and reported back so the agent can correct itself.</Label>
    </Diagram>
  );
}
