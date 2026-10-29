import type { Metadata } from "next";
import { RagDiagram } from "@/components/docs/diagrams/tech-flow";
import { OntologyDiagram } from "@/components/docs/diagrams/tech-layers";
import { Callout, Code, Figure, Prose, RefTable, Section } from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "Knowledge & ontology layer",
  description: "Vector search plus an entity graph, and how it differs from memory.",
};

export default function RagPage() {
  return (
    <>
      <Section
        title="Ontologies"
        intro="An ontology is the fixed vocabulary of things and relations a system is allowed to talk about. TreOps keeps three, each closed so nothing can invent new types."
      >
        <Figure caption="Work, knowledge and risk each have their own closed vocabulary.">
          <OntologyDiagram />
        </Figure>
        <div className="mt-5">
          <RefTable
            headers={["Ontology", "Governs", "Why it is closed"]}
            rows={[
              ["Work", "Workspace, project, milestone, story, run, task, criteria, agent and team", "State machines and authorization are written against these types."],
              ["Knowledge", "9 entity types and 8 relation types extracted from documents", "Dedup depends on stable types; unknown values fall back to other and relates_to."],
              ["Risk", "8 categories and 3 severities (low, medium, high)", "Severity is ordered, and it drives escalation, plan checkpoints and sign-off."],
            ]}
          />
        </div>
        <Prose className="mt-4">
          The enum literals live once, in <Code>app/core/enums.py</Code>, and tool schemas import them.
          Extraction is constrained to the knowledge ontology and the model’s output is normalized against it,
          so a hallucinated type becomes <Code>other</Code> rather than a new node kind.
        </Prose>
      </Section>

      <Section
        title="Ingest"
        intro="Chunks are embedded for similarity. Entities and relations are extracted into a graph as a best-effort extra."
      >
        <Figure caption="The graph row is optional; a document is searchable as soon as its chunks are embedded.">
          <RagDiagram />
        </Figure>
        <div className="mt-5">
          <RefTable
            headers={["Table", "Is", "Key columns"]}
            rows={[
              [<Code key="1">knowledge_entity</Code>, "A node", "workspace_id, name, normalized_name, entity_type, embedding, mention_count"],
              [<Code key="2">knowledge_edge</Code>, "A typed relation", "source, relation, target, weight, provenance_chunk_id"],
              [<Code key="3">knowledge_mention</Code>, "Bridge chunk ↔ entity", "chunk_id, entity_id"],
            ]}
          />
        </div>
        <Prose className="mt-4">
          Entity identity is <Code>(workspace_id, entity_type, normalized_name)</Code>, so the same thing
          mentioned in two documents collapses to one node. Types come from a fixed ontology, with{" "}
          <Code>other</Code> and <Code>relates_to</Code> as fallbacks. Each chunk’s graph write runs in its own
          savepoint, so a graph error never rolls back stored chunks.
        </Prose>
        <div className="mt-4">
          <Callout>
            Embeddings always use OpenAI and need <Code>TREOPS_AI_OPENAI_API_KEY</Code>. If no LLM key is
            configured, graph extraction is skipped silently: the document still reaches ready, with no
            entities.
          </Callout>
        </div>
      </Section>

      <Section title="Search" intro="Agents call knowledge_search and knowledge_list over MCP. The base is read-only for them.">
        <Prose>
          Search finds seed chunks by vector similarity, follows mentions to their entities, and walks one or
          two hops over edges. The agent receives the chunks plus the connected entities and relations, so it
          can answer questions no single chunk contains. Scope is workspace-level documents plus the current
          task’s project; every table carries <Code>workspace_id</Code>.
        </Prose>
      </Section>

      <Section title="Memory or knowledge?">
        <RefTable
          headers={["", "Memory", "Knowledge"]}
          rows={[
            ["Source", "What the agents learned from doing the work", "Documents people curated"],
            ["Delivery", "Injected whole into every task", "Retrieved on demand by a tool call"],
            ["Writes", "Extractor, agents, members", "People upload; agents cannot write"],
            ["Grows into", "Standing rules, after approval", "A browsable entity graph"],
          ]}
        />
      </Section>
    </>
  );
}
