import type { Metadata } from "next";
import { ModelDiagram } from "@/components/docs/diagrams/tech-flow";
import { ReasoningLoopDiagram } from "@/components/docs/diagrams/tech-layers";
import { Callout, Code, Figure, Prose, RefTable, Section, Term } from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "Reasoning layer",
  description: "How a model and a thinking level are picked for a task, and what is not automatic yet.",
};

export default function ModelSelectionPage() {
  return (
    <>
      <Section
        title="The reasoning loop"
        intro="Reasoning is not one long prompt. It is a loop with an independent check, so the agent that did the work is never the only one judging it."
      >
        <Figure caption="Each arrow is a tool call; the loop is bounded by max_iterations.">
          <ReasoningLoopDiagram />
        </Figure>
        <div className="mt-5">
          <RefTable
            headers={["Step", "Tool", "What the platform enforces"]}
            rows={[
              ["Plan", <Code key="1">run_post</Code>, "Plan comes first; a plan-only task can end here for a checkpoint."],
              ["Act", "any granted tool", "Tool visibility and backend authorization."],
              ["Verify", <Code key="2">ac_verify</Code>, "Evidence is required for both met and not_met; pending criteria block completion."],
              ["Review", <Code key="3">run_check_submit</Code>, "A different agent re-verifies every criterion (self-check only as a recorded fallback)."],
              ["Reflect", <span key="reflect">
                  <Code>run_ask</Code>, <Code>run_flag_risk</Code>
                </span>, "Questions route peer → Assistant → person; flagged risks recompute run risk."],
            ]}
          />
        </div>
      </Section>

      <Section
        title="How a model is chosen"
        intro="Model choice is declarative configuration, resolved when a task is dispatched."
      >
        <Figure caption="Two resolvers because there are two execution paths. Both read the same tier names.">
          <ModelDiagram />
        </Figure>
        <Prose className="mt-5">
          An agent carries <Code>intelligence</Code> (<Code>fast</Code>, <Code>balanced</Code>,{" "}
          <Code>smart</Code>) and <Code>thinking</Code> (<Code>low</Code>, <Code>medium</Code>,{" "}
          <Code>high</Code>). The daemon reads both once, in <Code>wake_service.py</Code>, and maps them onto
          the provider’s model names and effort setting.
        </Prose>
        <div className="mt-4">
          <RefTable
            headers={["Question", "Precedence"]}
            rows={[
              ["Which provider?", "agent override, then the runtime’s provider, then the system default"],
              ["Which model?", "agent’s explicit model, then provider × tier matrix, then the default"],
              ["How hard does it think?", "team thinking (for a team turn), else the agent’s own"],
              ["A flow step?", "the step’s tier, or “same as the agent” when unset"],
            ]}
          />
        </div>
      </Section>

      <Section title="Where tiers are used">
        <RefTable
          headers={["Where", "Tier", "Why"]}
          rows={[
            ["Agent work", "Per agent config", "The person chose the capability and cost."],
            ["Flow steps", "Per step", "Mix a cheap triage step with an expensive reasoning step."],
            ["Memory extraction and summary", "Fast or default", "Runs after every task; must be cheap."],
            ["Graph extraction", "Fast", "One call per chunk."],
            ["Criteria, titles, summaries", "Default", "Short structured outputs."],
          ]}
        />
        <Prose className="mt-4">
          Anthropic’s thinking maps to adaptive thinking plus an effort level. Sampling parameters are not sent
          to Claude 4.7 and 4.8, which reject them. Tokens are recorded per provider and model on every task, so
          cost is visible regardless of tier.
        </Prose>
      </Section>

      <Section title="What is not built">
        <Callout>
          There is <Term>no automatic model switching</Term> when a story gets harder. Risk, rework round and
          retries change who is asked and who signs off, not which model runs.
        </Callout>
        <Prose className="mt-4">
          The signals to build it already exist: run risk, iteration, retries, criteria count, questions used,
          and recorded cost. A policy would live in one place — <Code>LoopService._dispatch</Code>, writing an
          override into the task’s loop context — and be merged over the agent’s config where the daemon
          resolves the model. A sensible first policy: stay on the agent’s tier, raise one tier from the second
          rework round or when run risk reaches <Code>escalate_at</Code>, and cap by the workspace’s compute
          allowance.
        </Prose>
      </Section>
    </>
  );
}
