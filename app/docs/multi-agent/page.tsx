import type { Metadata } from "next";
import { MultiAgentDiagram, TeamDiagram } from "@/components/docs/diagrams/tech-infra";
import { Callout, Code, Figure, Prose, RefTable, Section, Term } from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "Multi-agent architecture",
  description: "Two ways agents cooperate: roles in a governed run that share one thread, and a team that runs as one lead session.",
};

export default function MultiAgentPage() {
  return (
    <>
      <Section
        title="Two shapes of multi-agent"
        intro="TreOps does not run a free-for-all swarm. Cooperation takes one of two shapes, each with a different boundary."
      >
        <RefTable
          headers={["", "Run roles", "Team"]}
          rows={[
            ["Unit", "Separate tasks for assignee, reviewer, peer, Assistant", "One lead task with members as sub-agents"],
            ["Processes", "Several provider CLIs, possibly on different runtimes", "One provider CLI session"],
            ["Shared state", "The run thread in the database", "The lead’s session and working directory"],
            ["Independence", "High: a reviewer never sees the assignee’s private reasoning", "Low: members share the lead’s context budget"],
            ["Good for", "Governance: check the work, escalate, sign off", "Parallel expertise inside one piece of work"],
          ]}
        />
      </Section>

      <Section
        title="Roles in a run"
        intro="Agents coordinate by writing to a shared thread, the blackboard pattern, and the run engine decides who is woken next."
      >
        <Figure caption="Every arrow is a tool call. The run engine, not the agents, owns the sequence.">
          <MultiAgentDiagram />
        </Figure>
        <div className="mt-5">
          <RefTable
            headers={["Role", "Task kind", "Mode it gets", "Authority"]}
            rows={[
              [<Term key="1">Assignee</Term>, <Code key="a">work</Code>, "story_assignment", "Plans, implements, verifies criteria, hands off, asks, flags risk."],
              [<Term key="2">Reviewer</Term>, <Code key="b">check</Code>, "story_assignment", "Re-verifies every criterion and submits a verdict with evidence."],
              [<Term key="3">Peer</Term>, <Code key="c">answer</Code>, "story_assignment", "Answers one routed question, then stops."],
              [<Term key="4">Assistant</Term>, <Code key="d">coordinate</Code>, "project_management", "Answers, approves plans, recovers stalls; blocked from sign-off at or above escalate_at."],
              [<Term key="5">Person</Term>, "—", "—", "Signs off, decides, answers what the Assistant forwards."],
            ]}
          />
        </div>
        <Prose className="mt-4">
          Independence is the point of the reviewer role: it gets its own task, its own context, and the run
          brief, but not the assignee’s session. If no dispatchable reviewer exists, the run falls back to a
          recorded self-check, and sign-off still follows <Code>escalate_at</Code>.
        </Prose>
      </Section>

      <Section
        title="Teams"
        intro="A team is a lead plus members, run as the lead’s session."
      >
        <Figure caption="A team behaves like one agent from the outside: one task, one runtime, one bill.">
          <TeamDiagram />
        </Figure>
        <Prose className="mt-5">
          Members are written into the working directory as provider sub-agents. The lead reads each member’s{" "}
          <em>delegation hint</em> to decide whom to route to. A team’s <Code>thinking</Code> overrides the lead’s
          own on team turns only, and a team can be a story’s assignee: the engine dispatches the lead and the
          members work under it.
        </Prose>
      </Section>

      <Section title="Who controls whom" intro="Orchestration is centralised on purpose; agents never get to wake each other.">
        <RefTable
          headers={["Decision", "Made by", "Not made by"]}
          rows={[
            ["Which task runs next", "Run engine", "An agent"],
            ["Which runtime it runs on", "Routing rules, before queueing", "The agent or the runtime"],
            ["Who reviews", "Story’s reviewer, or auto-pick under act_and_tell", "The assignee"],
            ["Whether a stall is recoverable", "The Assistant, within backend-enforced limits", "The stalled agent"],
            ["Whether risky work ships", "A person, at escalate_at", "Any agent, including the Assistant"],
          ]}
        />
        <div className="mt-5">
          <Callout>
            Outside a run, an @mention in a comment can wake an agent, and a flow can chain agent steps. Both go
            through the same task queue and the same authorization, so they are not a back channel.
          </Callout>
        </div>
      </Section>

      <Section title="Concurrency and limits">
        <RefTable
          headers={["Limit", "Value", "Where"]}
          rows={[
            ["Tasks one daemon runs at once", "20 by default", <Code key="1">max_concurrent_tasks</Code>],
            ["Claude CLIs in one hosted container", "Sized for about three", "hosted image memory limit"],
            ["Questions per run before the Assistant reassesses", "6", <Code key="2">max_questions</Code>],
            ["Rework rounds before the Assistant is woken", "3", <Code key="3">max_iterations</Code>],
          ]}
        />
      </Section>
    </>
  );
}
