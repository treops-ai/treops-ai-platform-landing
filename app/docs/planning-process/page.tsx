import type { Metadata } from "next";
import { PlanningDiagram } from "@/components/docs/diagrams/tech-flow";
import { Callout, Code, Figure, Prose, RefTable, Section } from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "Planning layer",
  description: "Agents propose, people edit, one approval creates the work.",
};

export default function PlanningProcessPage() {
  return (
    <>
      <Section
        title="Propose, edit, apply"
        intro="Planning separates proposing from creating. The agent can only write a draft."
      >
        <Figure caption="Everything before Apply is reversible; Apply is the single approval.">
          <PlanningDiagram />
        </Figure>
      </Section>

      <Section title="What the draft guarantees">
        <RefTable
          headers={["Property", "How"]}
          rows={[
            ["Bounded", "At most 30 items. Items are new or refer to existing stories."],
            ["Rich", "Each new item can carry assignee, reviewer, risk, priority, acceptance criteria and dependencies."],
            ["Lenient for agents", "Invalid items are skipped and reported back so the agent can correct itself."],
            ["Strict for people", "An invalid edit is an error."],
            ["Stable under rewrites", "User overrides are stored apart from the agent’s content, so a rewrite never undoes an untick or a rename."],
            ["Enforced in the backend", "PLANNING mode swaps the create tools for planning_draft_set, and the backend returns 403 to a daemon create carrying X-Planning-Session-Id."],
          ]}
        />
      </Section>

      <Section title="What apply does">
        <Prose>
          Applying creates the milestones and stories, assigns them, links dependencies and starts the ones that
          are not blocked, each as a story run. A dependency that clears starts the next story. When a story has
          no assignee or reviewer and the project’s autonomy is <Code>act_and_tell</Code>, TreOps picks one
          deterministically — skill match, then workload, then experience with the story type — and records why
          on the story.
        </Prose>
        <div className="mt-4">
          <Callout>
            Planning tasks follow the same routing rule as any other: <Code>route_session</Code> sets the
            runtime before the task is queued, and the requester is passed because a person started it.
          </Callout>
        </div>
      </Section>

      <Section
        title="The per-story plan"
        intro="Planning happens twice. The project plan decides what stories exist; each story’s assignee then plans its own approach."
      >
        <RefTable
          headers={["", "Project plan", "Per-story plan"]}
          rows={[
            ["Who writes it", "The planning agent, edited by a person", "The story’s assignee"],
            ["Form", "A draft of stories, milestones and dependencies", "A plan entry on the run thread, posted before any work"],
            ["Approval", "Apply: one approval for everything", "A plan checkpoint, only when baseline risk reaches escalate_at (or always, by policy)"],
            ["Mechanism", "planning_draft_set, then apply", "A plan-only work task that ends after the plan; approve_plan releases the work"],
            ["If wrong", "Edit the draft", "Send it back; the plan stays in the thread the reviewer reads"],
          ]}
        />
        <Prose className="mt-4">
          The plan stays on the run thread, so the reviewer later checks the work against it as well as against
          the criteria. Low-risk work skips the checkpoint and the plan simply becomes context.
        </Prose>
      </Section>
    </>
  );
}
