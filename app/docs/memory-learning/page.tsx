import type { Metadata } from "next";
import { MemoryDiagram } from "@/components/docs/diagrams/tech-flow";
import { MemoryTaxonomyDiagram } from "@/components/docs/diagrams/tech-layers";
import { Callout, Code, Figure, Prose, RefTable, Section, Term } from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "Memory layer",
  description: "Short-term and long-term memory, the episodic, semantic and procedural stores, and how knowledge moves between them.",
};

export default function MemoryLayerPage() {
  return (
    <>
      <Section
        title="Short-term and long-term"
        intro="Short-term memory is what the model holds right now. Long-term memory is everything that survives the task."
      >
        <Figure caption="Long-term memory is consolidated outward and injected back into short-term memory at the start of each task.">
          <MemoryTaxonomyDiagram />
        </Figure>
        <div className="mt-5">
          <RefTable
            headers={["", "Short-term (working)", "Long-term"]}
            rows={[
              ["Lifetime", "One provider session, or one task", "Until archived"],
              ["Holds", "Context window, resumed history, the run brief, a handoff summary", "Episodes, facts, rules"],
              ["Capacity limit", "The model’s context window", "Bounded by what is injected: the summary page is kept small"],
              ["Written by", "The harness, automatically", "Harness, extractor, agents, people"],
              ["Read by", "The model, directly", "Injected into short-term at task start"],
            ]}
          />
        </div>
        <Prose className="mt-4">
          Short-term continuity has three tiers, cheapest first: <Term>resume</Term> the provider session,
          else a <Term>handoff summary</Term> for a fresh session, and for story runs the{" "}
          <Term>run brief</Term> that re-renders the whole thread for every task, including the reviewer.
        </Prose>
      </Section>

      <Section
        title="Long-term stores"
        intro="The classic split by kind of knowledge, each with a different writer and a different trust level."
      >
        <RefTable
          headers={["Store", "What it holds", "Backed by", "Written by"]}
          rows={[
            [<Term key="1">Episodic</Term>, "What happened, in order: plans, questions, evidence, verdicts, messages, comments", <Code key="a">story_loop_event</Code>, "The harness and run engine, automatically"],
            [<Term key="2">Semantic</Term>, "What is true about this project: lessons, preferences, decisions, facts", <Code key="b">MemoryFact</Code>, "The extractor, agents via memory_add, members"],
            [<Term key="3">Procedural (soft)</Term>, "The derived “what we’ve learned” page", <Code key="c">summary_md</Code>, "A regeneration job; never edited by hand"],
            [
              <Term key="4">Procedural (hard)</Term>,
              "Rules and methods that are enforced, not just remembered",
              <span key="d">
                <Code>instructions_md</Code> and Skills
              </span>,
              "A person approving a promotion",
            ],
          ]}
        />
        <Prose className="mt-4">
          Structured organizational knowledge — documents and the entities in them — is a separate{" "}
          <Term>knowledge layer</Term> with its own page. Memory is what the agents learned by doing; knowledge
          is what people curated.
        </Prose>
      </Section>

      <Section
        title="The consolidation loop"
        intro="Episodic → semantic → procedural. Gated on an LLM provider key; the last step is gated on a person."
      >
        <Figure caption="Extraction never blocks or fails the task it learns from.">
          <MemoryDiagram />
        </Figure>
        <div className="mt-5">
          <RefTable
            headers={["Step", "Detail"]}
            rows={[
              ["Consolidate", "After a task completes or a run closes, one LLM call sees the story, run summary, up to 20 comments and every active fact."],
              ["Dedup by judgement", "A candidate adds a fact, supersedes old ones (archived), or reinforces an existing one (counter plus one). Ids the model invents are dropped."],
              ["Regenerate", "The summary page is rebuilt from active facts, coalesced per project by a dirty flag and a lock. A failure is logged and not retried; the next change retriggers it."],
              ["Promote", "A fact reinforced to PROMOTION_REINFORCEMENT_THRESHOLD (3), with no earlier promotion, is classified as an instruction or a skill and drafted."],
              ["Approve", "A person approves or rejects. Approving archives the contributing facts so the rule is not rendered twice; rejecting keeps them but they never promote again."],
            ]}
          />
        </div>
      </Section>

      <Section title="Why a person approves">
        <Callout>
          Nothing changes an agent’s standing instructions or skills silently. Recurrence only <Term>proposes</Term>{" "}
          a promotion. Merging into <Code>instructions_md</Code> returns a conflict if it would pass the size cap, so
          nothing is truncated behind your back. Creating a skill needs an owner or admin.
        </Callout>
        <Prose className="mt-4">
          This is the design’s answer to “self-improving agents”: the system learns continuously in the
          semantic store, but behaviour that is <em>enforced</em> only changes through the procedural store, and
          that has a human gate.
        </Prose>
      </Section>

      <Section title="Other feedback loops">
        <RefTable
          headers={["Loop", "Mechanism"]}
          rows={[
            ["Suggestion outcomes", "What a person did with past PM review cards (applied, accepted, snoozed, dismissed) is fed back so the PM stops repeating dismissed ideas."],
            ["Auto-pick", "Unassigned stories get an assignee by skill match, then lower workload, then experience with the story type. The reason is stored on the story."],
            ["Run evidence", "Closed runs feed the extractor, so verified outcomes become facts."],
            ["Instruction improvement", "A service rewrites agent or skill instructions on request."],
          ]}
        />
      </Section>
    </>
  );
}
