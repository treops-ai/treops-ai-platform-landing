import { Arrow, Diagram, Group, Label, Line, Node } from "./tech-svg";

/** The three planes and the one bridge between them. */
export function PlanesDiagram() {
  return (
    <Diagram width={960} height={400} minWidth={760}>
      <Group x={20} y={16} w={500} h={240} label="CONTROL PLANE · backend :8080" />
      <Node x={40} y={50} w={140} h={52} title="Run engine" sub="story runs" tone="primary" />
      <Node x={200} y={50} w={140} h={52} title="Planning" sub="draft → apply" />
      <Node x={360} y={50} w={140} h={52} title="Task queue" sub="runtime-routed" />
      <Node x={40} y={140} w={140} h={52} title="Postgres" sub="+ pgvector" />
      <Node x={200} y={140} w={140} h={52} title="Auth + actors" sub="tokens, X-Agent-ID" />
      <Node x={360} y={140} w={140} h={52} title="API routers" sub="/api/*" tone="primary" />
      <Label x={270} y={228} size={10.5}>
        every rule is enforced here — nothing else is a security boundary
      </Label>

      <Group x={20} y={282} w={500} h={104} label="INTELLIGENCE PLANE" />
      <Node x={40} y={314} w={108} h={56} title="Memory" sub="facts → rules" />
      <Node x={160} y={314} w={108} h={56} title="Knowledge" sub="vectors + graph" />
      <Node x={280} y={314} w={108} h={56} title="Skills" sub="how-to bundles" />
      <Node x={400} y={314} w={108} h={56} title="Utility LLMs" sub="fast tier" />
      <Line x1={270} y1={282} x2={270} y2={258} both dashed />

      <Group x={750} y={16} w={190} h={240} label="EXECUTION PLANE" />
      <Node x={770} y={50} w={150} h={44} title="Daemon" sub="on a runtime" />
      <Node x={770} y={116} w={150} h={44} title="Agent harness" sub="builds the workdir" />
      <Node x={770} y={182} w={150} h={44} title="Provider CLI" sub="claude · gemini" />
      <Line x1={845} y1={94} x2={845} y2={114} />
      <Line x1={845} y1={160} x2={845} y2={180} />

      <Node x={560} y={130} w={150} h={84} title="MCP service" sub={[":8300", "mode × role × actor", "thin proxy"]} tone="primary" />

      <Arrow d="M 500 76 L 770 70" />
      <Label x={636} y={62}>claim task</Label>
      <Line x1={770} y1={204} x2={712} y2={190} />
      <Label x={742} y={236}>tool calls</Label>
      <Line x1={560} y1={166} x2={502} y2={166} />
      <Label x={531} y={186} size={10}>forward</Label>

      <Label x={560} y={300} anchor="start" strong>Only MCP crosses from agent to backend.</Label>
      <Label x={560} y={318} anchor="start">The agent can only act through tools; the backend</Label>
      <Label x={560} y={334} anchor="start">re-authorizes every call it forwards.</Label>
    </Diagram>
  );
}

/** Registration token → session token. */
export function TokenExchangeDiagram() {
  return (
    <Diagram width={960} height={190} minWidth={800}>
      <Node x={10} y={40} w={200} h={72} title="Admin creates token" sub={["tdt_ registration token", "single use · 10 minutes"]} />
      <Node x={250} y={40} w={200} h={72} title="Daemon registers" sub={["presents the tdt_ token", "token is marked used"]} />
      <Node x={490} y={40} w={200} h={72} title="Backend binds a runtime" sub={["issues tds_ session token", "bound to that one runtime"]} tone="primary" />
      <Node x={730} y={40} w={200} h={72} title="Heartbeat refreshes" sub={["session slides forward", "24 h hosted · 30 d other"]} />
      <Line x1={210} y1={76} x2={248} y2={76} />
      <Line x1={450} y1={76} x2={488} y2={76} />
      <Line x1={690} y1={76} x2={728} y2={76} />
      <Label x={830} y={140} size={10.5}>mint and refresh both use session_ttl_for()</Label>
      <Label x={480} y={164} size={11}>Daemon tokens carry no user identity. Role is fixed to “daemon”, which fails every owner/admin check.</Label>
    </Diagram>
  );
}

/** How a daemon request becomes an agent. */
export function ActorDiagram() {
  return (
    <Diagram width={960} height={330} minWidth={760}>
      <Node x={10} y={36} w={150} h={52} title="Daemon request" />
      <Node x={210} y={36} w={190} h={52} title="Session token?" sub="tds_ bound to a runtime" />
      <Node x={450} y={36} w={190} h={52} title="X-Agent-ID sent?" />
      <Node x={690} y={30} w={260} h={64} title="Agent in workspace AND" sub="runtime holds a live task of it?" tone="primary" />
      <Line x1={160} y1={62} x2={208} y2={62} />
      <Line x1={400} y1={62} x2={448} y2={62} />
      <Line x1={640} y1={62} x2={688} y2={62} />
      <Label x={424} y={52} size={10}>yes</Label>
      <Label x={664} y={52} size={10}>yes</Label>

      <Node x={210} y={140} w={190} h={50} title="Registration only" sub="tdt_ can do nothing else" dashed />
      <Line x1={305} y1={88} x2={305} y2={138} dashed />
      <Label x={316} y={118} anchor="start" size={10}>no</Label>

      <Node x={450} y={140} w={190} h={50} title="Member-level access" sub="role = daemon, no agent" />
      <Line x1={545} y1={88} x2={545} y2={138} dashed />
      <Label x={556} y={118} anchor="start" size={10}>no</Label>

      <Node x={690} y={140} w={120} h={50} title="403" sub="cannot act as it" tone="danger" dashed />
      <Node x={830} y={140} w={120} h={50} title="Acts as agent" tone="success" />
      <Line x1={760} y1={94} x2={750} y2={138} dashed />
      <Line x1={890} y1={94} x2={890} y2={138} />
      <Label x={770} y={122} anchor="start" size={10}>no</Label>
      <Label x={900} y={122} anchor="start" size={10}>yes</Label>

      <Node x={560} y={250} w={190} h={60} title="TreOps Assistant" sub={["reads every project", "writes held to its task's project"]} />
      <Node x={770} y={250} w={180} h={60} title="Any other agent" sub={["no manager endpoints", "writes: own task's project"]} />
      <Line x1={880} y1={190} x2={680} y2={248} />
      <Line x1={890} y1={190} x2={860} y2={248} />
    </Diagram>
  );
}

/** Tool visibility and forwarding. */
export function McpDiagram() {
  return (
    <Diagram width={960} height={330} minWidth={760}>
      <Node x={10} y={36} w={190} h={64} title="Agent in provider CLI" sub="MCP over streamable HTTP" />
      <Node x={250} y={36} w={190} h={64} title="MCP server" sub={["reads four headers", "mode · role · actor · loop kind"]} />
      <Node x={490} y={36} w={210} h={64} title="Policy intersection" sub={["MODE ∩ ROLE ∩ ACTOR", "+ loop-kind capabilities"]} tone="primary" />
      <Node x={750} y={36} w={190} h={64} title="Visible tool list" sub="capabilities → tool names" />
      <Line x1={200} y1={68} x2={248} y2={68} />
      <Line x1={440} y1={68} x2={488} y2={68} />
      <Line x1={700} y1={68} x2={748} y2={68} />

      <Node x={750} y={170} w={190} h={64} title="Tool handler" sub="tools_*.py · thin proxy" />
      <Node x={490} y={170} w={210} h={64} title="Backend /api/*" sub="real authorization" tone="primary" />
      <Line x1={845} y1={100} x2={845} y2={168} />
      <Label x={856} y={140} anchor="start" size={10.5}>agent calls a tool</Label>
      <Line x1={750} y1={202} x2={702} y2={202} />
      <Label x={726} y={192} size={10}>forwards</Label>
      <Label x={726} y={254} size={10}>auth + agent id</Label>

      <Node x={10} y={160} w={430} h={84} title="Visibility is UX, not security" sub={["Missing mode header → every tool (dev clients).", "Unknown or forbidden mode → no tools.", "The backend re-checks each call anyway."]} tone="danger" dashed />
      <Label x={480} y={300} size={11}>Adding a tool = handler + capability in modes.py + grant to a mode policy. A test fails if either is missing.</Label>
    </Diagram>
  );
}

/** Picking where a task runs. */
export function RuntimeRoutingDiagram() {
  return (
    <Diagram width={960} height={350} minWidth={760}>
      <Node x={10} y={40} w={150} h={52} title="New task" />
      <Node x={200} y={34} w={190} h={64} title="TreOps Assistant?" />
      <Node x={440} y={40} w={200} h={52} title="Platform runtime" sub="hosted · allowance-metered" tone="primary" />
      <Line x1={160} y1={66} x2={198} y2={66} />
      <Line x1={390} y1={66} x2={438} y2={66} />
      <Label x={414} y={56} size={10}>yes</Label>

      <Node x={200} y={140} w={190} h={64} title="Person-started and" sub="member has own runtime?" />
      <Node x={440} y={146} w={200} h={52} title="Member's runtime" sub="preferred_runtime_id" />
      <Line x1={295} y1={98} x2={295} y2={138} />
      <Label x={306} y={122} anchor="start" size={10}>no</Label>
      <Line x1={390} y1={172} x2={438} y2={172} />
      <Label x={414} y={162} size={10}>yes</Label>

      <Node x={200} y={248} w={190} h={52} title="Workspace runtime" sub="workspace.runtime_id" />
      <Line x1={295} y1={204} x2={295} y2={246} />
      <Label x={306} y={230} anchor="start" size={10}>no</Label>

      <Arrow d="M 640 66 L 690 66 L 690 172" plain />
      <Line x1={640} y1={172} x2={728} y2={172} />
      <Arrow d="M 390 274 L 690 274 L 690 172" plain />

      <Node x={730} y={140} w={210} h={64} title="task.runtime_id set" sub="before it is queued or pushed" tone="primary" />
      <Node x={730} y={248} w={210} h={72} title="Runtime online?" sub={["yes: daemon claims it", "no: it waits, then resumes"]} dashed />
      <Line x1={835} y1={204} x2={835} y2={246} />
    </Diagram>
  );
}
