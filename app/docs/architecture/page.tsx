import type { Metadata } from "next";
import { PlanesDiagram } from "@/components/docs/diagrams/tech-system";
import {
  BackendModulesDiagram,
  ContainerDiagram,
  DataStoresDiagram,
  DeploymentDiagram,
  EndToEndDiagram,
  SystemContextDiagram,
} from "@/components/docs/diagrams/tech-architecture";
import { Callout, Code, Figure, Prose, RefTable, Section, Term } from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "Architecture",
  description: "The whole system, from context to deployment: containers, backend structure, one run end to end, state, and scaling limits.",
};

export default function ArchitecturePage() {
  return (
    <>
      <Callout>
        This is the reference page for the whole system. It goes from the outside in: who uses TreOps and what it
        depends on, the deployable containers, the structure inside the backend, one run traced end to end, where
        state lives, and how it is deployed. Every other page in this section zooms into one part of it.
      </Callout>

      <Section
        title="Three planes at a glance"
        intro="Keep these separate in your head and most of the code makes sense."
      >
        <Figure caption="One bridge crosses from the execution plane to the control plane: the MCP service.">
          <PlanesDiagram />
        </Figure>
        <div className="mt-5">
          <RefTable
            headers={["Plane", "Its job", "Where it lives"]}
            rows={[
              ["Control", "Owns all state, rules and authorization, and runs the story-run state machine.", <Code key="1">backend/app/domains/*</Code>],
              ["Execution", "Runs an LLM agent on a machine and builds the working directory around it.", <Code key="2">cli/treops/daemon/*</Code>],
              ["Intelligence", "What the agent knows and how it improves: memory, knowledge, skills, model choice.", <Code key="3">domains/memory · knowledge · backend/ai</Code>],
            ]}
          />
        </div>
      </Section>

      <Section
        title="System context"
        intro="TreOps as a single box. Everything outside it is something it calls, never something it trusts."
      >
        <Figure caption="People on the left, external systems on the right, storage and tracing underneath.">
          <SystemContextDiagram />
        </Figure>
        <div className="mt-5">
          <RefTable
            headers={["External system", "What TreOps uses it for", "Direction and protocol"]}
            rows={[
              [<Term key="1">LLM providers</Term>, "Agents run on Claude and Gemini CLIs. OpenAI serves embeddings, utility calls and the browser pilot’s decisions.", "Outbound HTTPS, from runtimes and from the backend"],
              [<Term key="2">Enterprise tools</Term>, "Jira, ERP, CRM, GitHub and others, attached per agent as MCP servers.", "Outbound MCP, from the agent’s runtime"],
              [<Term key="3">Channels</Term>, "Flow results to a Slack webhook or to members’ email.", "Outbound HTTPS, from the backend’s automation loop"],
              [<Term key="4">Git repositories</Term>, "Code an agent needs, checked out as a worktree per task.", "Outbound git, from the runtime"],
              [<Term key="5">Object storage</Term>, "Vault files and attachments, through presigned URLs.", "S3 API from the backend; direct from clients"],
              [<Term key="6">MLflow</Term>, "Optional tracing of knowledge ingestion and the native worker.", "Off unless enabled and given a URI"],
            ]}
          />
        </div>
      </Section>

      <Section
        title="Containers"
        intro="Every deployable, how they connect, and the eight flows that carry the system."
      >
        <Figure caption="Blue is the core; the backend is the only component that owns state and authorization.">
          <ContainerDiagram />
        </Figure>
        <div className="mt-5">
          <RefTable
            headers={["#", "Flow", "Protocol", "Credential"]}
            rows={[
              ["1", "Client → Caddy", "HTTPS; WebSocket upgrades pass through", "User JWT or PAT"],
              ["2", "Caddy → backend", "REST under /api, and /ws for events. The web app’s server also proxies /api, /ws and the browser socket, so a browser only talks to one host.", "As above"],
              ["3", "Backend → Postgres", "asyncpg through async SQLAlchemy; Alembic runs once per deploy", "Database URL in the environment"],
              ["4", "Daemon ↔ backend", "REST under /api/daemon (claim, start, messages, usage, complete, heartbeat) and /ws/daemon/interactive", "tds_ session token, one runtime"],
              ["5", "Provider CLI → MCP", "MCP over streamable HTTP, with mode, role, actor and loop-kind headers", "The task’s token and X-Agent-ID"],
              ["6", "MCP → backend", "HTTP to /api, forwarding Authorization, X-Agent-ID, X-Task-ID and X-Planning-Session-Id", "Same, unchanged"],
              ["7", "Backend → LLM APIs", "HTTPS for extractors, generators, embeddings and pilot decisions", "Server-side keys, never given to daemons"],
              ["8", "Provider CLI → providers and connectors", "HTTPS and MCP, from inside the CLI sandbox", "Per-agent credentials; platform seat for the Assistant"],
            ]}
          />
        </div>
        <Prose className="mt-4">
          The backend process contains the REST routers, the WebSockets, the auth guards, the domain services, the
          run engine, the task queue, six background loops, the in-process event bus and the AI services. They
          ship as one deployable on purpose: a transaction can span a story, its run and its task without a
          network hop. The MCP service is a separate process built from the same image, because it faces agents
          and should hold no state.
        </Prose>
      </Section>

      <Section
        title="Backend structure"
        intro="A modular monolith: eight groups of domain modules over one shared core."
      >
        <Figure caption="Each domain is a router, a service and its models. Modules talk through services, not through each other’s tables.">
          <BackendModulesDiagram />
        </Figure>
        <div className="mt-5">
          <RefTable
            headers={["Background loop", "Default interval", "What it does"]}
            rows={[
              ["Dependency scanner", "300 s", "Starts stories whose blockers finished, through start_work."],
              ["Run watchdog", "300 s", "Hands parked runs, hung tasks and unanswered Assistants to recovery."],
              ["Flow watchdog", "60 s", "Stops flow runs waiting on a runtime that never connects."],
              ["Flow automation", "10 s", "Starts due schedules and sends pending deliveries, with row locks."],
              ["Brief sweep", "300 s", "Builds each member’s daily brief at their chosen time."],
              ["Interactive task sweeper", "900 s", "Fails interactive tasks orphaned by a dead daemon."],
            ]}
          />
        </div>
        <Prose className="mt-4">
          Intervals come from <Code>TREOPS_*_INTERVAL</Code> environment variables. A failed sweep logs and tries
          again on the next tick; none of them can stop the API.
        </Prose>
      </Section>

      <Section
        title="One story run, end to end"
        intro="Thirteen steps from an approval to a finished, remembered result."
      >
        <Figure caption="Steps 3 to 9 repeat for the reviewer’s check task. Dashed arrows are returns and pushes.">
          <EndToEndDiagram />
        </Figure>
        <div className="mt-5">
          <RefTable
            headers={["Steps", "What happens", "Owner of the step"]}
            rows={[
              ["1–2", "A person approves; start_work creates the run, queues a work task and sets its runtime before queueing.", "Backend"],
              ["3–4", "The daemon claims; the backend returns the task context, the run brief and the agent’s decrypted MCP credentials, only because this runtime holds a live task of that agent.", "Backend, runtime-authorized"],
              ["5", "The daemon assembles the working directory and spawns the provider CLI with the resolved model and thinking level.", "Daemon"],
              ["6–7", "The agent posts its plan and verifies criteria through MCP; each call is forwarded and re-authorized.", "Agent, MCP, backend"],
              ["8–9", "The CLI exits; the daemon reports the result, usage and a continuation summary and completes the task. Completion is refused while accepted criteria are pending.", "Daemon, backend"],
              ["10–11", "The engine dispatches an independent check task. On a pass, risk below escalate_at completes the run; otherwise it waits for a person.", "Backend"],
              ["12", "The event bus pushes the change to every connected viewer over /ws.", "Backend"],
              ["13", "A background job extracts facts from the run and regenerates the project’s summary page.", "Backend"],
            ]}
          />
        </div>
      </Section>

      <Section
        title="State and data"
        intro="Four places hold state, with different owners and lifetimes."
      >
        <Figure caption="Only the backend and the native worker write the database. A daemon writes only its own disk.">
          <DataStoresDiagram />
        </Figure>
        <Prose className="mt-5">
          Postgres is the single source of truth, including vectors and the entity graph, so retrieval and
          transactions share one store. Object storage holds bytes only. A runtime’s disk is a cache: it can be
          lost without losing the work, because the run thread and summaries live in the database. The in-memory
          pieces are coordination, not state, and are rebuilt on restart.
        </Prose>
      </Section>

      <Section
        title="Deployment"
        intro="Production today is one host running docker compose, optionally created by CloudFormation."
      >
        <Figure caption="Caddy is the only thing exposed. Hosted runtimes are siblings started through the Docker socket.">
          <DeploymentDiagram />
        </Figure>
        <div className="mt-5">
          <RefTable
            headers={["Virtual host", "Routes to", "Notes"]}
            rows={[
              [<Code key="1">apex, www</Code>, "landing", "Marketing and docs; makes no API calls."],
              [<Code key="2">app.</Code>, "web", "The Next.js server proxies /api and /ws, so the browser needs no CORS."],
              [<Code key="3">api.</Code>, "backend", "Daemons, the CLI, webhooks and any direct API client."],
              [<Code key="4">mcp.</Code>, "mcp", "Agents and daemons. Exposure is safe because auth is the boundary, not the network."],
              [<Code key="5">storage.</Code>, "minio", "Presigned URLs for browsers. Absent when using AWS S3."],
            ]}
          />
        </div>
        <div className="mt-5">
          <Callout>
            The backend mounts the host’s Docker socket so it can start hosted runtimes. That is root-equivalent
            on the host: a compromise of the API becomes a compromise of the machine. It is mounted on the backend
            alone, never on a workload. Putting a socket proxy that whitelists create, inspect and remove in front
            of it is the recommended hardening.
          </Callout>
        </div>
      </Section>

      <Section
        title="Scaling and limits"
        intro="What the current design assumes, so you know what changes first."
      >
        <RefTable
          headers={["Concern", "Today", "To scale out"]}
          rows={[
            ["Backend processes", "One. The event bus, browser hub and interactive-daemon registry are in memory, so a second process would not see the first one’s sockets or events.", "Move the event bus and socket fan-out behind an external broker or pub/sub."],
            ["Background loops", "Already safe to run twice: schedules and deliveries are claimed with row locks that skip rows another process holds.", "None for the loops."],
            ["Database", "One Postgres with pgvector.", "Read replicas for search; partition run and task history by age."],
            ["Runtimes", "Per-daemon cap on concurrent tasks (3 in the compose file, 20 by default). Each task is a full CLI process.", "More runtimes, not a bigger one; this is the memory-hungry tier."],
            ["Orchestration", "Docker on one host. No Kubernetes code exists.", "A second supervisor implementation behind the same start and stop calls."],
            ["Object storage", "MinIO, or S3 by changing the endpoint.", "Already horizontal."],
          ]}
        />
      </Section>

      <Section title="Technology stack">
        <RefTable
          headers={["Layer", "Technology", "Notes"]}
          rows={[
            ["Backend", "Python 3.12+, FastAPI, async SQLAlchemy, asyncpg, Alembic", "Run with uv. One migration job per deploy."],
            ["Database", "PostgreSQL 17 with pgvector", "Vectors, graph and JSONB in the same store."],
            ["Agent engine", "LangChain and LangGraph, with a Postgres checkpointer", "The native worker; provider CLIs are separate processes."],
            ["Provider CLIs", "Claude Code and Gemini CLI", "Sandboxed by the CLI; spawned by the daemon."],
            ["Tools", "MCP over streamable HTTP", "One proxy service; Playwright MCP for the browser."],
            ["Web", "Next.js, React, TanStack Query, Zustand, Tailwind", "pnpm workspaces with Turbo; shared UI package."],
            ["Desktop", "Electron with electron-vite", "Shares the web modules."],
            ["CLI", "Python and Typer", "For people and scripts; agents use MCP instead."],
            ["Edge", "Caddy 2", "Automatic TLS."],
            ["Storage", "MinIO or AWS S3", "Presigned access only."],
            ["Observability", "Request logging, per-task token usage, the run thread; MLflow optional", "Tracing is off unless configured."],
          ]}
        />
      </Section>

      <Section title="Invariants worth memorising">
        <RefTable
          headers={["Invariant", "Why it exists"]}
          rows={[
            ["All authorization lives in the backend.", "MCP tool visibility is a convenience. Hiding a tool never protects anything."],
            ["The daemon role fails every owner/admin check.", "A compromised machine must not be able to manage agents, members or settings."],
            ["A task’s runtime is set before it is queued.", "Claims, pushes, billing and daemon authorization all read task.runtime_id."],
            ["Only StoryService.start_work starts work.", "Loop-enabled stories never receive legacy assignee tasks."],
            ["Runs fail loud.", "Stalls go to the Assistant, then a person; infrastructure failures wait on the runtime."],
            ["Enum literals live in app.core.enums.", "Tool schemas import them so they can never drift."],
            ["One bridge between execution and control.", "Agents act only through MCP, so there is one place to enforce policy."],
          ]}
        />
      </Section>
    </>
  );
}
