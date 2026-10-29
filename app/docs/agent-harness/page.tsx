import type { Metadata } from "next";
import { HarnessDiagram } from "@/components/docs/diagrams/tech-flow";
import { Callout, Code, Figure, Prose, RefTable, Section, Term } from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "Agent task & harness",
  description: "The unit of work, and everything the daemon builds around the model before it runs.",
};

export default function AgentHarnessPage() {
  return (
    <>
      <Section
        title="The task row"
        intro="Everything an agent does happens inside one AgentTaskQueue row."
      >
        <RefTable
          headers={["Column", "Purpose"]}
          rows={[
            [<Code key="1">agent_id, story_id, project_id, team_id</Code>, "Whose work, on what. Authorization and memory scope derive from these."],
            [<Code key="2">runtime_id</Code>, "Where it runs. Set before queueing; claims, billing and authz read it."],
            [<Code key="3">status</Code>, "held, pending, dispatched, running, completed, failed, cancelled."],
            [<Code key="4">context</Code>, "JSON the daemon receives: mode, run brief, memory document, skills, MCP config."],
            [<Code key="5">session_id, work_dir</Code>, "Let a follow-up task resume the same CLI session."],
            [<Code key="6">continuation_summary</Code>, "Handoff note when resume is impossible; also the input to memory extraction."],
            [<Code key="7">hold_reason</Code>, "Why a task is parked instead of pending."],
            [<Code key="8">TaskMessage, TaskUsage</Code>, "Ordered tool_use / text / thinking stream, and tokens per (provider, model) including cache."],
          ]}
        />
      </Section>

      <Section
        title="Task modes"
        intro="What an agent may do is derived from three independent facts, never fused into one enum."
      >
        <RefTable
          headers={["Fact", "Values", "Answers"]}
          rows={[
            ["TaskMode", "chat, planning, project_management, project_comment, autopilot, story_assignment, story_comment, flow", "What it is doing"],
            ["ProjectRole", "member, project_manager", "Its authority ceiling"],
            ["ActorKind", "agent, human, system", "Who is behind the call"],
          ]}
        />
        <Prose className="mt-4">
          Story runs add a loop kind: <Code>work</Code>, <Code>check</Code> and <Code>answer</Code> map to
          story_assignment, <Code>coordinate</Code> maps to project_management. All four are derived in{" "}
          <Code>shared/treops_modes</Code> and sent to MCP as headers.
        </Prose>
      </Section>

      <Section
        title="The harness pipeline"
        intro="Everything between “task claimed” and “provider CLI exits”. It is provider-agnostic: Claude Code and Gemini CLI are subprocesses behind one options object."
      >
        <Figure caption="The same seven steps run for every task, whichever provider backs the agent.">
          <HarnessDiagram />
        </Figure>
      </Section>

      <Section title="What goes in the working directory" intro="Built by execenv.py for each task.">
        <RefTable
          headers={["Artifact", "Content"]}
          rows={[
            [<Code key="1">CLAUDE.md</Code>, "Platform foundation: MCP-tool mandate, mentions format, output rules, knowledge-base hint, project memory section, predecessor handoffs."],
            [<Code key="2">IDENTITY.md</Code>, "Personality, instructions, mission, and the team section."],
            ["Run brief", "For story runs, the whole run thread re-rendered for this task kind."],
            ["Skills", "Workspace and agent skills linked into the provider’s skills directory."],
            ["Sub-agents", "Team members written as provider sub-agents."],
            [<Code key="3">.mcp.json</Code>, "The treops MCP server with its token, plus optional browser servers."],
          ]}
        />
        <div className="mt-5">
          <Callout>
            A treops MCP server that fails to connect is silent: the agent just reports having no TreOps tools.
            Check the task’s <Code>.mcp.json</Code> and curl that URL from the runtime’s machine. A loopback URL
            is dead on any daemon that is not on the backend’s host.
          </Callout>
        </div>
      </Section>

      <Section title="Keeping context between tasks" intro="Three layers, cheapest first.">
        <RefTable
          headers={["Layer", "How", "When it applies"]}
          rows={[
            [<Term key="1">Resume</Term>, "The provider’s --resume with the prior session id; a retry gets only a short “you were interrupted” header.", "Same session still exists"],
            [<Term key="2">Continuation summary</Term>, "Structured markdown: files touched, tools used, a capped output excerpt.", "Fresh session"],
            [<Term key="3">Run brief</Term>, "The run thread: plan, evidence, findings, answers.", "Any task in a story run, including the reviewer"],
          ]}
        />
        <Prose className="mt-4">
          Hosted runtimes bake <Code>cli/</Code> and <Code>shared/</Code> into a Docker image. After any change
          there, rebuild <Code>treops-hosted-runtime:local</Code> and stop and start the runtime, or agents keep
          running the old daemon.
        </Prose>
      </Section>
    </>
  );
}
