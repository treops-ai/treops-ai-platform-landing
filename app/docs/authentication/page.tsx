import type { Metadata } from "next";
import { ActorDiagram, TokenExchangeDiagram } from "@/components/docs/diagrams/tech-system";
import { Callout, Code, Figure, Prose, RefTable, Section, Term } from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Four token types, how a runtime registers, and how a daemon request becomes a specific agent.",
};

export default function AuthenticationPage() {
  return (
    <>
      <Section title="Token types" intro="Resolved in one place: _resolve_token in core/dependencies.py.">
        <RefTable
          headers={["Prefix", "What it is", "Lifetime", "Resolves to"]}
          rows={[
            ["JWT", "A user session", "session", "A real user"],
            [<Code key="p">tre_</Code>, "Personal access token", "until revoked", "A real user"],
            [<Code key="r">tdt_</Code>, "Daemon registration token", "single use, 10 minutes", "A workspace; no runtime"],
            [<Code key="s">tds_</Code>, "Daemon session token", "24 h hosted, 30 d otherwise", "A workspace and exactly one runtime"],
          ]}
        />
        <Prose className="mt-4">
          Daemon tokens have no user identity; no phantom user id is ever generated. Their role is fixed to{" "}
          <Code>daemon</Code>, which allows member-level reads and writes but fails every{" "}
          <Code>member.role in (&quot;owner&quot;, &quot;admin&quot;)</Code> check.
        </Prose>
      </Section>

      <Section title="Registering a runtime">
        <Figure caption="The registration token is spent once; everything after that uses a session token bound to the runtime.">
          <TokenExchangeDiagram />
        </Figure>
        <Prose className="mt-5">
          Session lifetime depends on where the runtime runs, so minting <Term>and</Term> the heartbeat’s sliding
          refresh must both go through <Code>session_ttl_for()</Code>. Runtime-level endpoints (heartbeat, claim,
          deregister, usage, ping result) require a <Code>tds_</Code> token for that runtime or a sibling, via{" "}
          <Code>require_daemon_runtimes</Code>.
        </Prose>
      </Section>

      <Section
        title="Who is really acting"
        intro="A daemon token is not an agent. The X-Agent-ID header says which agent, and the server checks the claim."
      >
        <Figure caption="Without the live-task check, one machine could act as every agent in the workspace.">
          <ActorDiagram />
        </Figure>
        <Prose className="mt-5">
          The agent must exist in the workspace, and the token’s runtime (or a sibling sharing its{" "}
          <Code>daemon_id</Code>) must hold a live task of that agent routed to it. That is{" "}
          <Code>runtime_may_act_as</Code>. It matters because claiming a task returns that agent’s decrypted MCP
          credentials.
        </Prose>
      </Section>

      <Section title="Guards">
        <RefTable
          headers={["Guard", "Enforces"]}
          rows={[
            [<Code key="1">runtime_may_report_on</Code>, "A runtime only reports on tasks routed to it."],
            [<Code key="2">daemon_live_task</Code>, "The task in X-Task-ID is live, owned by the calling agent, on this runtime."],
            [<Code key="3">check_daemon_task_project</Code>, "Writes are held to that task’s project. Call it on every endpoint that changes project state."],
            [<Code key="4">check_daemon_project_manager</Code>, "Manager-only endpoints are reserved for the TreOps Assistant."],
            [<Code key="5">daemon_acts_as_assistant</Code>, "True only when X-Agent-ID names the assistant and this runtime may act as it."],
            [<Code key="6">planning/guards.py</Code>, "403 on any daemon create of a story or milestone carrying X-Planning-Session-Id."],
          ]}
        />
        <div className="mt-5">
          <Callout>
            Workspace endpoints are read-only for daemons (get workspace, list members, timeline). Project
            create, delete, archive and restore are blocked outright, and a daemon cannot change a project’s
            assignee or its <Code>pm_policy</Code>.
          </Callout>
        </div>
      </Section>
    </>
  );
}
