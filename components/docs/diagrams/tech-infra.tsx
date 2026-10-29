import { Arrow, Diagram, Group, Label, Line, Node } from "./tech-svg";

/** Agents coordinate through one shared, append-only thread. */
export function MultiAgentDiagram() {
  return (
    <Diagram width={960} height={420} minWidth={800} legend>
      <Node x={370} y={10} w={220} h={50} title="Run engine" sub="dispatches tasks, records lifecycle" />
      <Line x1={480} y1={60} x2={480} y2={98} dashed />

      <Node x={370} y={100} w={220} h={200} title="Run thread" sub={["shared and append-only", "plan · question · evidence", "risk · verdict · decision"]} tone="primary" />

      <Node x={20} y={112} w={190} h={64} title="Assignee agent" sub="work task" />
      <Node x={20} y={224} w={190} h={64} title="Reviewer agent" sub="check task" />
      <Node x={750} y={112} w={190} h={64} title="TreOps Assistant" sub="coordinate task" />
      <Node x={750} y={224} w={190} h={64} title="A person" sub="sign-off and decisions" tone="success" />
      <Node x={370} y={326} w={220} h={56} title="Peer agent" sub="answer task, when asked" />

      <Line x1={210} y1={144} x2={368} y2={144} both />
      <Label x={289} y={126} size={10.5}>run_post · ac_verify</Label>
      <Label x={289} y={170} size={10.5}>run_handoff · run_ask</Label>
      <Line x1={210} y1={256} x2={368} y2={256} both />
      <Label x={289} y={248} size={10.5}>run_check_submit</Label>
      <Line x1={750} y1={144} x2={592} y2={144} both />
      <Label x={671} y={126} size={10.5}>wake_assistant</Label>
      <Label x={671} y={170} size={10.5}>run_escalate</Label>
      <Line x1={750} y1={256} x2={592} y2={256} both />
      <Label x={671} y={248} size={10.5}>sign off · decide</Label>
      <Line x1={480} y1={326} x2={480} y2={302} both />
      <Label x={560} y={318} size={10.5}>run_answer</Label>

      <Label x={10} y={404} anchor="start" size={11}>Inside a run, agents do not message each other: they read and write one thread, and the engine decides who is woken next.</Label>
    </Diagram>
  );
}

/** A team is one lead session with sub-agents inside it. */
export function TeamDiagram() {
  return (
    <Diagram width={960} height={270} minWidth={800}>
      <Group x={10} y={14} w={610} h={170} label="ONE LEAD SESSION · one task, one provider CLI, one runtime" />
      <Node x={30} y={46} w={176} h={96} title="Lead agent" sub={["runs the session", "routes by delegation hint"]} tone="primary" />
      <Node x={256} y={46} w={106} h={96} title="Member" sub={["sub-agent", "role label"]} />
      <Node x={378} y={46} w={106} h={96} title="Member" sub={["sub-agent", "role label"]} />
      <Node x={500} y={46} w={106} h={96} title="Member" sub={["sub-agent", "role label"]} />
      <Line x1={206} y1={94} x2={254} y2={94} dashed />
      <Arrow d="M 118 142 L 118 164 L 553 164" dashed plain />
      <Line x1={309} y1={164} x2={309} y2={144} dashed />
      <Line x1={431} y1={164} x2={431} y2={144} dashed />
      <Line x1={553} y1={164} x2={553} y2={144} dashed />

      <Node x={660} y={40} w={290} h={64} title="Team playbook" sub={["a workspace Skill on the lead", "versioned, rehearsed before it goes live"]} />
      <Node x={660} y={118} w={290} h={56} title="Team thinking" sub="overrides the lead's effort on team turns" />

      <Label x={10} y={214} anchor="start" size={11}>Members are written into the working directory as provider sub-agents. They share the lead’s task, runtime,</Label>
      <Label x={10} y={232} anchor="start" size={11}>working directory and token budget: parallel expertise inside one session, not separate processes.</Label>
      <Label x={10} y={254} anchor="start" size={11}>A team can also be a story’s assignee: the run engine dispatches the lead, and the members work under it.</Label>
    </Diagram>
  );
}

/** Docker today; the supervisor is the seam for Kubernetes. */
export function ContainerTopologyDiagram() {
  return (
    <Diagram width={960} height={440} minWidth={800}>
      <Group x={10} y={14} w={340} h={376} label="BACKEND HOST" />
      <Node x={30} y={46} w={300} h={52} title="Runtime service" sub="claim · grant bookkeeping · teardown" />
      <Node x={30} y={112} w={300} h={64} title="Hosted supervisor" sub={["Docker SDK", "name = treops-hosted-<runtime id>"]} tone="primary" />
      <Node x={30} y={190} w={300} h={52} title="Native supervisor" sub="native worker image" tone="primary" />
      <Node x={30} y={256} w={300} h={52} title="Docker engine" sub="socket never given to workloads" />
      <Node x={30} y={322} w={300} h={52} title="Postgres · MinIO · MCP · API" sub="the stack the containers dial" />
      <Line x1={180} y1={98} x2={180} y2={110} />
      <Line x1={180} y1={176} x2={180} y2={188} />

      <Group x={390} y={14} w={560} h={250} label="WORKLOAD CONTAINERS — one per runtime" />
      <Node x={410} y={46} w={520} h={100} title="Hosted runtime container" sub={["non-root user · 2 GB memory · 1 CPU · pid cap 512 · no docker socket", "restart on failure, at most 3 · outbound-only, opens no port", "daemon + Claude CLI + Chromium + Playwright MCP"]} tone="primary" />
      <Node x={410} y={160} w={520} h={86} title="Native worker container" sub={["LangChain engine process in its own image", "reads the database directly; model keys arrive as env"]} />
      <Line x1={330} y1={144} x2={408} y2={100} />
      <Label x={368} y={112} size={10}>run</Label>
      <Line x1={330} y1={216} x2={408} y2={204} />

      <Node x={390} y={286} w={260} h={92} title="Bring-your-own machine" sub={["your daemon, registered with a tdt_ token", "outbound-only; isolation is yours"]} dashed />
      <Node x={670} y={286} w={280} h={92} title="Kubernetes — not built" sub={["same seam: start(), stop(), limits", "Pod or Job per runtime, NetworkPolicy", "for egress, Secret for the session token"]} tone="danger" dashed />

      <Label x={390} y={408} anchor="start" size={10.5}>Containers dial out to the API and MCP; nothing dials in.</Label>
      <Label x={390} y={426} anchor="start" size={10.5}>The Docker socket is never exposed to a workload.</Label>
    </Diagram>
  );
}

/** Nested trust boundaries around one agent process. */
export function IsolationDiagram() {
  const rings = [
    { x: 10, y: 10, w: 940, h: 332, name: "Workspace", desc: "every row carries workspace_id · tokens are scoped to one workspace" },
    { x: 50, y: 58, w: 860, h: 256, name: "Runtime / container", desc: "non-root · resource caps · outbound-only · one platform runtime per workspace" },
    { x: 90, y: 106, w: 780, h: 180, name: "Task directory", desc: "a working directory and git worktree per task · pruned after 30 days" },
    { x: 130, y: 154, w: 700, h: 104, name: "CLI sandbox", desc: "bubblewrap · network allowlist: API host and object store only" },
  ];
  return (
    <Diagram width={960} height={440} minWidth={780}>
      {rings.map((r) => (
        <g key={r.name}>
          <rect x={r.x} y={r.y} width={r.w} height={r.h} rx={16} fill="none" stroke="var(--border)" strokeWidth={1.2} />
          <text x={r.x + 16} y={r.y + 25} fontSize="14.5" fontWeight="600" fill="var(--foreground)">
            {r.name}
          </text>
          <text x={r.x + 16 + r.name.length * 8.4 + 16} y={r.y + 25} fontSize="12.5" fill="var(--muted-foreground)">
            {r.desc}
          </text>
        </g>
      ))}
      <Node x={170} y={196} w={620} h={46} title="Agent process" sub="provider CLI with its tools" tone="primary" />

      <Node x={10} y={364} w={300} h={64} title="Browser" sub={["egress guard: public IPs only", "Chromium policy: no file:, no downloads"]} />
      <Node x={330} y={364} w={300} h={64} title="Credentials" sub={["per agent, claimed per task", "only by a runtime holding a live task"]} />
      <Node x={650} y={364} w={300} h={64} title="Known limit" sub={["containers share a kernel", "tasks in one container share a user"]} tone="danger" dashed />
    </Diagram>
  );
}

/** The assistant browser, end to end. */
export function BrowserDiagram() {
  return (
    <Diagram width={960} height={400} minWidth={780}>
      <Node x={10} y={34} w={150} h={56} title="Claude CLI" sub="MCP over stdio" />
      <Node x={200} y={34} w={160} h={56} title="Playwright MCP" sub="browser_* tools" />
      <Node x={400} y={34} w={160} h={56} title="CDP broker" sub="127.0.0.1 only" />
      <Node x={600} y={34} w={150} h={56} title="Chromium" sub="headless, per thread" tone="primary" />
      <Node x={790} y={34} w={160} h={56} title="Egress guard" sub="proxy, public IPs only" tone="danger" />
      <Line x1={160} y1={62} x2={198} y2={62} />
      <Line x1={360} y1={62} x2={398} y2={62} />
      <Line x1={560} y1={62} x2={598} y2={62} />
      <Line x1={750} y1={62} x2={788} y2={62} />
      <Label x={950} y={112} anchor="end" size={10.5}>→ the internet, never the host network</Label>

      <Node x={600} y={150} w={150} h={56} title="Browser manager" sub="launch · screencast · input" />
      <Line x1={675} y1={90} x2={675} y2={148} both />
      <Label x={685} y={124} anchor="start" size={10}>CDP</Label>

      <Node x={600} y={250} w={150} h={56} title="Browser hub" sub="in the backend" tone="primary" />
      <Line x1={675} y1={206} x2={675} y2={248} both />
      <Label x={685} y={232} anchor="start" size={10}>runtime socket</Label>

      <Node x={790} y={250} w={160} h={56} title="Browser pane" sub="canvas of JPEG frames" tone="success" />
      <Line x1={750} y1={278} x2={788} y2={278} both />

      <Node x={400} y={250} w={160} h={56} title="Cookie jar" sub="encrypted, per member" />
      <Line x1={560} y1={278} x2={598} y2={278} both />
      <Label x={580} y={268} size={10}>profile</Label>

      <Label x={10} y={150} anchor="start" size={10.5}>Policy: no file:, chrome:, devtools:, view-source:</Label>
      <Label x={10} y={166} anchor="start" size={10.5}>No downloads, file pickers, password manager or extensions.</Label>
      <Label x={10} y={190} anchor="start" size={10.5}>1280×800 viewport · at most 2 browsers per daemon (LRU)</Label>
      <Label x={10} y={206} anchor="start" size={10.5}>Idle for 900 s: closed, profile directory wiped.</Label>

      <Node x={10} y={316} w={360} h={62} title="Cheaper path: the browse MCP" sub={["read: fetch a page as text", "run: a pilot loop on the platform's own model key"]} dashed />
    </Diagram>
  );
}

/** Presigned upload and download. */
export function VaultDiagram() {
  return (
    <Diagram width={960} height={300} minWidth={780}>
      <Node x={10} y={34} w={200} h={72} title="1 · Reserve" sub={["row created, quota checked", "presigned PUT returned"]} tone="primary" />
      <Node x={250} y={34} w={200} h={72} title="2 · Upload" sub={["straight to object storage", "curl -T or a browser PUT"]} />
      <Node x={490} y={34} w={200} h={72} title="3 · Finalize" sub={["backend confirms it landed", "byte size recorded"]} tone="primary" />
      <Node x={730} y={34} w={210} h={72} title="4 · Linked" sub={["to a project, story, comment,", "chat reply or task"]} />
      <Line x1={210} y1={70} x2={248} y2={70} />
      <Line x1={450} y1={70} x2={488} y2={70} />
      <Line x1={690} y1={70} x2={728} y2={70} />

      <Node x={730} y={160} w={210} h={72} title="5 · Download" sub={["short presigned GET", "~60 seconds, as attachment"]} tone="success" />
      <Line x1={835} y1={106} x2={835} y2={158} />
      <Node x={490} y={160} w={200} h={72} title="Knowledge indexing" sub={["optional: chunk, embed,", "extract graph"]} dashed />
      <Line x1={730} y1={196} x2={692} y2={196} dashed />

      <Node x={10} y={160} w={440} h={72} title="What the client never gets" sub={["bucket credentials · a listing of the bucket", "a URL that outlives its few minutes"]} tone="danger" dashed />
      <Label x={10} y={270} anchor="start" size={10.5}>The agent sandbox allows the object-store host so the upload can run; nothing else is opened for it.</Label>
    </Diagram>
  );
}

/** The credential chain from a person to an agent's tool call. */
export function LoginChainDiagram() {
  return (
    <Diagram width={960} height={390} minWidth={780}>
      <Node x={10} y={34} w={200} h={72} title="Person signs in" sub={["email one-time code", "no passwords stored"]} />
      <Node x={250} y={34} w={200} h={72} title="User JWT" sub={["HS256 · 30 days", "carries a token version"]} />
      <Node x={490} y={34} w={200} h={72} title="tdt_ registration" sub={["single use · 10 minutes", "stored as a SHA-256 hash"]} />
      <Node x={730} y={34} w={210} h={72} title="tds_ session" sub={["bound to one runtime", "hashed · 24 h or 30 d"]} tone="primary" />
      <Line x1={210} y1={70} x2={248} y2={70} />
      <Line x1={450} y1={70} x2={488} y2={70} />
      <Line x1={690} y1={70} x2={728} y2={70} />

      <Node x={730} y={160} w={210} h={72} title="Claim a task" sub={["only if this runtime", "may act as that agent"]} />
      <Node x={490} y={160} w={200} h={72} title="Decrypt credentials" sub={["agent's MCP secrets", "Fernet, in the backend"]} tone="danger" />
      <Node x={250} y={160} w={200} h={72} title="Task directory" sub={[".mcp.json and process env", "plaintext lives only here"]} tone="danger" dashed />
      <Node x={10} y={160} w={200} h={72} title="Agent’s tool call" sub={["Authorization + X-Agent-ID", "re-checked by the backend"]} tone="success" />
      <Line x1={835} y1={106} x2={835} y2={158} />
      <Line x1={730} y1={196} x2={692} y2={196} />
      <Line x1={490} y1={196} x2={452} y2={196} />
      <Line x1={250} y1={196} x2={212} y2={196} />

      <Label x={10} y={278} anchor="start" strong>Stored hashed (SHA-256):</Label>
      <Label x={200} y={278} anchor="start" size={11}>personal access tokens, registration tokens, session tokens.</Label>
      <Label x={10} y={298} anchor="start" strong>Stored encrypted (Fernet):</Label>
      <Label x={200} y={298} anchor="start" size={11}>MCP private headers, OAuth client secret and tokens, Slack webhooks, browser cookie jars.</Label>
      <Label x={10} y={318} anchor="start" strong>No such field exists:</Label>
      <Label x={200} y={318} anchor="start" size={11}>user passwords (sign-in is an emailed code); the browser’s password manager is disabled.</Label>
      <Label x={10} y={350} anchor="start" size={10.5}>The hosted runtime’s bootstrap credentials arrive only as container environment, never in a file the API can read.</Label>
    </Diagram>
  );
}

/** How a sign-in in the browser pane survives a restart. */
export function CookieJarDiagram() {
  return (
    <Diagram width={960} height={320} minWidth={780}>
      <Node x={10} y={34} w={165} h={72} title="Person signs in" sub={["inside the browser pane", "the agent never sees it"]} />
      <Node x={205} y={34} w={165} h={72} title="Chromium" sub={["holds cookies", "in a temp profile"]} />
      <Node x={400} y={34} w={165} h={72} title="Daemon" sub={["profile_put every 30 s", "and on close"]} />
      <Node x={595} y={34} w={165} h={72} title="Backend merge" sub={["drop removed keys", "cap 2000 / 1 MB"]} tone="primary" />
      <Node x={790} y={34} w={160} h={72} title="Encrypted jar" sub={["Fernet in", "cookies_enc"]} tone="danger" />
      <Line x1={175} y1={70} x2={203} y2={70} />
      <Line x1={370} y1={70} x2={398} y2={70} />
      <Line x1={565} y1={70} x2={593} y2={70} />
      <Line x1={760} y1={70} x2={788} y2={70} />

      <Arrow d="M 870 106 L 870 170 L 287 170 L 287 108" dashed />
      <Label x={578} y={162} size={10.5}>restore at launch: profile_get → decrypt → set cookies (5 s timeout, else start signed out)</Label>

      <Node x={10} y={210} w={450} h={72} title="Kept" sub={["cookies only, per member and workspace", "other threads of the same member share the jar"]} tone="success" dashed />
      <Node x={500} y={210} w={450} h={72} title="Not kept" sub={["passwords, local and session storage, open tabs,", "partitioned cookies, anything on a bring-your-own runtime"]} tone="danger" dashed />
    </Diagram>
  );
}

/** Scattered enterprise data: live connectors, a curated index, and an entity map. */
export function EnterpriseDataDiagram() {
  return (
    <Diagram width={960} height={400} minWidth={780}>
      <Group x={10} y={14} w={200} h={300} label="SYSTEMS OF RECORD" />
      <Node x={24} y={46} w={172} h={50} title="ERP" sub="orders, stock, finance" />
      <Node x={24} y={108} w={172} h={50} title="Jira" sub="tickets, sprints" />
      <Node x={24} y={170} w={172} h={50} title="CRM and email" sub="customers, threads" />
      <Node x={24} y={232} w={172} h={50} title="Wiki and documents" sub="specs, policies" />

      <Node x={260} y={46} w={210} h={84} title="Live connector (MCP)" sub={["queried at ask time", "volatile, transactional data", "the source keeps the data"]} tone="primary" />
      <Node x={260} y={190} w={210} h={84} title="Curated index" sub={["chunks, embeddings, graph", "slow, text-heavy, broadly visible", "re-synced on a schedule"]} tone="primary" />
      <Line x1={196} y1={71} x2={258} y2={80} />
      <Line x1={196} y1={133} x2={258} y2={95} />
      <Line x1={196} y1={195} x2={258} y2={110} />
      <Line x1={196} y1={257} x2={258} y2={232} />

      <Node x={520} y={110} w={190} h={110} title="Entity ID map" sub={["customer · order · ticket", "one id across systems", "provenance to each record"]} tone="danger" dashed />
      <Line x1={470} y1={88} x2={518} y2={138} />
      <Line x1={470} y1={232} x2={518} y2={192} />

      <Node x={760} y={110} w={190} h={110} title="Agent" sub={["asks through tools", "cites every source", "flags conflicts"]} tone="success" />
      <Line x1={710} y1={165} x2={758} y2={165} />

      <Node x={520} y={252} w={430} h={62} title="Permission gate and write gate" sub={["reads: filtered by the caller's rights in the source", "writes: one specific tool, risk-gated, person above escalate_at"]} tone="danger" dashed />
      <Line x1={855} y1={220} x2={855} y2={250} dashed />

      <Label x={10} y={346} anchor="start" size={10.5}>Dashed red boxes are not built today: there is no cross-system ID map and no per-user permission filtering.</Label>
      <Label x={10} y={364} anchor="start" size={10.5}>Live connectors and the document index exist; connector-driven ingestion and re-sync do not.</Label>
    </Diagram>
  );
}
