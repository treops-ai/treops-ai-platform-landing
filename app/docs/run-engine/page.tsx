import type { Metadata } from "next";
import { CriteriaDiagram, EscalationDiagram, RunStateDiagram } from "@/components/docs/diagrams/tech-flow";
import { Callout, Code, Figure, Prose, RefTable, Section, Term } from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "Runs & acceptance criteria",
  description: "The run state machine, the criteria that make done provable, and who is asked when it stalls.",
};

export default function RunEnginePage() {
  return (
    <>
      <Section
        title="Run phases"
        intro="A run carries one story from start to done. Only StoryService.start_work starts one."
      >
        <Figure caption="Waiting is always on exactly one of: agent, assistant, human, runtime.">
          <RunStateDiagram />
        </Figure>
        <Prose className="mt-5">
          Four task kinds are dispatched: <Code>work</Code> (assignee), <Code>check</Code> (reviewer),{" "}
          <Code>answer</Code> (the peer a question was routed to) and <Code>coordinate</Code> (the Assistant).
          The run is an append-only thread of entries — plan, progress, assumption, question, answer, evidence,
          risk, verdict, decision — and it is both the audit log and the agent’s context. Mutations take a row
          lock, so transitions cannot race.
        </Prose>
        <Prose>
          The run’s risk is the highest of the story’s baseline and its open risk entries. It decides escalation,
          the plan checkpoint and sign-off. It does <Term>not</Term> choose a model.
        </Prose>
      </Section>

      <Section
        title="Acceptance criteria"
        intro="The contract that makes done objective. Stored on the story as JSON."
      >
        <Figure caption="Only accepted items bind the run. Evidence is required for both met and not_met.">
          <CriteriaDiagram />
        </Figure>
        <div className="mt-5">
          <RefTable
            headers={["Field", "Values", "Meaning"]}
            rows={[
              [<Code key="1">origin</Code>, "human_explicit, llm_suggested, manual", "Where the item came from."],
              [<Code key="2">decision</Code>, "proposed, accepted, rejected", "The human gate. Only accepted items count."],
              [<Code key="3">result</Code>, "pending, met, not_met", "Verification outcome."],
              [<Code key="4">evidence, verified_by</Code>, "text; assignee, reviewer, member", "Required whenever a result is set."],
              [<Code key="5">state</Code>, "empty, active, stale", "Stale when the story text no longer matches the hash."],
            ]}
          />
        </div>
        <Prose className="mt-4">
          Generation is deterministic first (sections like “Done when”, checkboxes, keyword lines), then an LLM
          can augment. In augment mode the LLM call is skipped when three items are already accepted.
        </Prose>
      </Section>

      <Section title="Checklist is not criteria">
        <RefTable
          headers={["", "Acceptance criteria", "Checklist"]}
          rows={[
            ["Storage", "JSON on the story", "Own table: title, checked, position"],
            ["Evidence", "Mandatory", "None"],
            ["Gates the run", "Yes — hard gate before work can complete", "No — the run engine never reads it"],
            ["Purpose", "What does done mean, provably?", "A lightweight to-do list"],
          ]}
        />
      </Section>

      <Section title="Who gets asked" intro="One routing chain, and a person sees a recommendation rather than an open question.">
        <Figure caption="Infrastructure failures never spend a rework round; they wait for the runtime.">
          <EscalationDiagram />
        </Figure>
        <div className="mt-5">
          <Callout>
            The Assistant can coordinate but can never sign off at or above <Code>escalate_at</Code>, change{" "}
            <Code>escalate_at</Code> or project autonomy, or write to another project. The backend enforces
            each of these.
          </Callout>
        </div>
      </Section>

      <Section title="Run policy" intro="A workspace setting, snapshotted onto each run when it starts.">
        <RefTable
          headers={["Setting", "Default", "Effect"]}
          rows={[
            [<Code key="1">escalate_at</Code>, "high", "Risk at or above this needs sign-off, a plan checkpoint, and an immediate notification."],
            [<Code key="2">plan_checkpoint</Code>, "risk", "Pause after the plan only when baseline risk reaches escalate_at, or always."],
            [<Code key="3">review_mode</Code>, "agent_reviewer", "A reviewer agent checks; falls back to self_check if none can be dispatched."],
            [<Code key="4">max_iterations</Code>, "3", "Check-then-rework rounds before the Assistant is woken."],
            [<Code key="5">max_questions</Code>, "6", "Past this a risk is raised and the Assistant reassesses; the run keeps going."],
          ]}
        />
        <Prose className="mt-4">
          Editing the policy never changes a run already in flight. A stored policy that fails validation
          disables runs rather than running with settings nobody chose.
        </Prose>
      </Section>
    </>
  );
}
