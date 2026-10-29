import type { Metadata } from "next";
import { GuardrailsDiagram } from "@/components/docs/diagrams/tech-layers";
import { Callout, Code, Figure, Prose, RefTable, Section } from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "Guardrails & tool safety",
  description: "Defence in depth around every tool call: what is prevented, what is detected, what is corrected, and what a person decides.",
};

export default function GuardrailsPage() {
  return (
    <>
      <Callout>
        Guardrails in TreOps live in the backend, not in prompts. A prompt can ask an agent to behave; only the
        backend can refuse a request.
      </Callout>

      <Section
        title="Preventive controls"
        intro="Five checks stand between an agent’s tool call and a change. The first is a convenience; the other four are the boundary."
      >
        <Figure caption="A call that fails a check is refused before anything changes.">
          <GuardrailsDiagram />
        </Figure>
        <div className="mt-5">
          <RefTable
            headers={["Check", "Mechanism", "Where"]}
            rows={[
              ["Tool visibility", "Intersection of mode, role and actor decides which tools are listed. UX only.", <Code key="1">mcp_service/modes.py</Code>],
              ["Identity", "X-Agent-ID is honoured only if the runtime holds a live task of that agent.", <Code key="2">runtime_may_act_as</Code>],
              ["Scope pinning", "A daemon write is held to the project of the task in X-Task-ID.", <Code key="3">check_daemon_task_project</Code>],
              ["Role fencing", "The daemon role fails every owner/admin check; managers-only endpoints need the Assistant.", <Code key="4">check_daemon_project_manager</Code>],
              ["Proposal only", "Planning agents cannot create stories or milestones; the backend returns 403.", <Code key="5">planning/guards.py</Code>],
              ["Completion gate", "A work task cannot complete while an accepted criterion is pending.", <Code key="6">pending_acceptance_criteria</Code>],
              ["Evidence rule", "Both met and not_met need non-empty evidence.", <Code key="7">AcceptanceCriteriaItem</Code>],
              ["Autonomy", "suggest proposes changes; act_and_tell acts and records. The Assistant cannot change it.", <Code key="8">project.autonomy</Code>],
              ["Budgets", "max_iterations, max_questions, and the Assistant’s monthly compute allowance.", <Code key="9">LoopPolicy · admit_assistant_turn</Code>],
              ["Network egress", "The Assistant’s browser reaches public addresses only.", <Code key="10">daemon/browser/egress.py</Code>],
              ["Secrets", "Webhook URLs and MCP credentials are stored encrypted; a claim returns them only to the right runtime.", <Code key="11">core/crypto.py</Code>],
            ]}
          />
        </div>
      </Section>

      <Section
        title="Detective and corrective controls"
        intro="Preventive checks cannot catch a daemon that died or an agent that went quiet."
      >
        <RefTable
          headers={["Control", "Kind", "Behaviour"]}
          rows={[
            ["Run watchdog", "Detective", "Finds parked runs, hung tasks, an unanswered Assistant, and healthy runtimes with waiting runs."],
            ["Append-only run thread", "Detective", "Every plan, question, risk, evidence and decision is an entry; the audit log and the agent’s context are the same data."],
            ["Task usage", "Detective", "Tokens per provider and model for every task, including cache reads and writes."],
            ["Recovery chain", "Corrective", "Stalls go to the Assistant first, then a person with a recommended answer. With no Assistant they go straight to a person."],
            ["Infrastructure wait", "Corrective", "Auth, quota and network failures wait on the runtime and spend no rework round."],
            ["Reopen window", "Corrective", "A run that finished without a person can be reopened for three days."],
          ]}
        />
      </Section>

      <Section title="Human checkpoints" intro="The levels at which a person is asked are policy, not code.">
        <RefTable
          headers={["escalate_at", "A person signs off", "Plan checkpoint (default)", "Notified immediately"]}
          rows={[
            [<Code key="1">low</Code>, "Every run", "Every run", "Every risk"],
            [<Code key="2">medium</Code>, "Medium and high risk", "Baseline medium or high", "Medium and high risks"],
            [<Code key="3">high</Code>, "High risk only", "Baseline high", "High risks"],
          ]}
        />
        <Prose className="mt-4">
          Anything below the level is handled by the Assistant and reported in the daily brief. A decision the
          Assistant cannot make reaches a person at any level, and always with a recommended answer.
        </Prose>
      </Section>

      <Section title="What a guardrail is not">
        <RefTable
          headers={["Often assumed", "Reality"]}
          rows={[
            ["Hiding a tool makes it safe", "Visibility is UX. Every call is re-authorized by the backend."],
            ["The system prompt enforces the rules", "Prompts shape behaviour; only backend checks refuse."],
            ["Policy edits apply to running work", "The policy is snapshotted when a run starts."],
            ["A broken policy falls back to defaults", "A stored policy that fails validation disables runs, so nothing runs on settings nobody chose."],
            ["The Assistant can approve anything", "It can never sign off at or above escalate_at, or change escalate_at or autonomy."],
          ]}
        />
      </Section>
    </>
  );
}
