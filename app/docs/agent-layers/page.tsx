import type { Metadata } from "next";
import { LayersDiagram } from "@/components/docs/diagrams/tech-layers";
import { Callout, Figure, Prose, RefTable, Section } from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "Agent layers",
  description: "The standard layers of an agent platform, mapped onto what TreOps actually implements and what it does not.",
};

export default function AgentLayersPage() {
  return (
    <>
      <Callout>
        “Layer” names here are the common vocabulary for agent systems. TreOps does not have a package per
        layer; this page says where each one lives, so you can read the code with the same words.
      </Callout>

      <Section
        title="The layer stack"
        intro="Requests flow down the stack, results flow back up. Guardrails are not a layer: they sit across all of them."
      >
        <Figure caption="Ten layers plus a cross-cutting guardrail band. Each layer has its own page in this section.">
          <LayersDiagram />
        </Figure>
        <Prose className="mt-5">
          The ordering follows how a unit of work moves. A person (or a schedule) triggers it in the interface or
          automation layer; the orchestration layer turns it into a governed run; the planning and reasoning
          layers decide what to do and check it; memory and knowledge supply context; the tool layer is the only
          way to act; and the execution layer is where the model actually runs.
        </Prose>
      </Section>

      <Section title="Layer by layer">
        <RefTable
          headers={["Layer", "Question it answers", "TreOps implementation"]}
          rows={[
            ["Interface", "How do people steer and observe?", "Web and desktop apps, the Assistant chat, the daily brief, the inbox."],
            ["Orchestration", "Who does what, in what order, and when does a person decide?", "Story-run state machine, escalation chain, workspace run policy. Domain loops."],
            ["Planning", "What is the work, and is the approach sound before building?", "Planning sessions with a draft; per-story plan and plan checkpoint."],
            ["Reasoning", "How does the agent think, check itself and get checked?", "Model tier and thinking effort, ask / assume / flag risk, independent reviewer."],
            ["Memory", "What does it remember within a task and across tasks?", "Short-term: session, brief, handoff. Long-term: episodic, semantic, procedural."],
            ["Knowledge & ontology", "What does it know about the organization, in a structured way?", "Vector store plus entity graph, constrained by fixed ontologies."],
            ["Automation", "What happens without anyone clicking?", "Flows, schedules, channels, dependency auto-start, watchdogs."],
            ["Tool", "How does it act on the world?", "MCP tools filtered by mode × role × actor, forwarded by a thin proxy."],
            ["Execution", "Where does the model run, and with what around it?", "Daemon, agent harness, provider CLI, runtimes."],
            ["Identity", "Who is asking, and are they allowed?", "JWT, PAT, registration and session tokens; actor resolution."],
            ["Persistence & telemetry", "What is recorded?", "Postgres and pgvector, an event bus, the append-only run thread, per-model token usage."],
            ["Guardrails (cross-cutting)", "What stops, catches or escalates a bad action?", "See the Guardrails page."],
          ]}
        />
      </Section>

      <Section title="Built, partial, not built">
        <RefTable
          headers={["Capability", "Status", "Note"]}
          rows={[
            ["Governed run with evidence, independent review and bounded rework", "Built", "Orchestration and reasoning layers."],
            ["Two-level planning with a human approval", "Built", "Project draft, and per-story plan with an optional checkpoint."],
            ["Short-term and long-term memory with episodic / semantic / procedural stores", "Built", "Needs an LLM key for extraction. Procedural writes need a person."],
            ["Retrieval over memory facts", "Not built", "Memory is injected whole; only knowledge is retrieved."],
            ["Knowledge graph with a fixed ontology", "Built, gated", "Needs an embedding key; graph also needs an LLM key."],
            ["Schedules, channels and event-driven starts", "Built", "Automation layer."],
            ["Model chosen from task complexity", "Not built", "Tier and effort are static configuration; the signals to drive it exist."],
            ["Self-improvement without a person", "Not built, by design", "Promotion to standing rules always needs approval."],
          ]}
        />
      </Section>
    </>
  );
}
