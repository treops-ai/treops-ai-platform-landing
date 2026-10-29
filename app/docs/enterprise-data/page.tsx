import type { Metadata } from "next";
import { EnterpriseDataDiagram } from "@/components/docs/diagrams/tech-infra";
import { Callout, Code, Figure, Prose, RefTable, Section, Term } from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "Enterprise data integration",
  description: "The recommended approach for data scattered across ERP, Jira, CRM and documents, and what TreOps does and does not do today.",
};

export default function EnterpriseDataPage() {
  return (
    <>
      <Callout>
        This page is a recommended architecture. Parts of it exist in TreOps and parts do not; the last two
        sections say exactly which.
      </Callout>

      <Section
        title="The principle"
        intro="Leave the data where it lives, reach it live, and copy only a small curated part."
      >
        <Figure caption="Two access modes feed one entity map; permissions and writes are gated at the edge.">
          <EnterpriseDataDiagram />
        </Figure>
        <Prose className="mt-5">
          Centralizing everything first is the usual failure: copies go stale, they carry the wrong permissions,
          and the project ends before an agent answers anything. Put a thin layer above the systems that answers
          “what is this thing, and where does it live?”, and let the systems of record stay the truth.
        </Prose>
      </Section>

      <Section
        title="Choose an access mode per source"
        intro="Volatility and sensitivity decide it, not convenience."
      >
        <RefTable
          headers={["Kind of data", "Handling", "Why"]}
          rows={[
            ["Changes constantly and is transactional: ERP orders, stock, tickets", <Term key="1">Query live through a connector. Never index.</Term>, "A copy is wrong the moment it is written."],
            ["Slow and text-heavy: specs, policies, wikis, decision records", <Term key="2">Chunk and embed, re-sync periodically.</Term>, "Similarity search beats exact queries for prose."],
            ["Relationships: owner, depends on, part of", <Term key="3">Extract into the graph with provenance to the source record.</Term>, "Answers questions no single record contains."],
            ["Regulated or sensitive", <Term key="4">Query live only, under the user’s own rights.</Term>, "The index must not become a way around access control."],
          ]}
        />
      </Section>

      <Section
        title="A small business ontology"
        intro="Pick about ten entity types that cross systems, and give each a stable id."
      >
        <RefTable
          headers={["Entity", "Appears as", "Example ids"]}
          rows={[
            ["Customer", "CRM account, ERP customer, Jira reporter", <Code key="1">CRM-4410 = ERP-C-77</Code>],
            ["Order", "ERP sales order, Jira epic, email thread", <Code key="2">SO-998 = ABC-12</Code>],
            ["Project", "Jira project, wiki space", "—"],
            ["Owner", "A person in each system", "—"],
          ]}
        />
        <Prose className="mt-4">
          The cross-system id map is the hardest thing to change later, so design it first. Each mapping keeps
          provenance: which system, which record, when it was confirmed. An agent that finds a Jira ticket can
          then ask the ERP about the same order without guessing.
        </Prose>
      </Section>

      <Section
        title="Permissions"
        intro="Enforce them when the question is asked, in the source system, not by copying access lists."
      >
        <RefTable
          headers={["Rule", "Detail"]}
          rows={[
            ["Live reads run as the caller", "The connector uses the asking person’s rights, so the source decides what is visible."],
            ["Index only what everyone in scope may see", "Anything narrower stays behind a live connector."],
            ["Never merge access lists into the index", "They drift, and the first drift is a data leak."],
            ["Agents get the narrowest connector set", "Attach each connector only to agents that need it; credentials are per agent."],
          ]}
        />
      </Section>

      <Section
        title="Writes and conflicts"
        intro="Read broadly. Write rarely, and only through tools that can be reasoned about."
      >
        <RefTable
          headers={["Concern", "Approach"]}
          rows={[
            ["Writes", "A specific tool per action, such as create ticket or update order status, never a general-purpose write."],
            ["Approval", "Gate by risk. Above the workspace’s escalate_at, a person signs off before it ships."],
            ["Evidence", "Every claim cites its source records, and an acceptance criterion can require it."],
            ["Disagreement", "When two systems conflict, report both and say which is the system of record; never average."],
          ]}
        />
      </Section>

      <Section title="What TreOps does today">
        <RefTable
          headers={["Capability", "Status", "Note"]}
          rows={[
            ["Connect any MCP server and attach it per agent", "Built", "Credentials encrypted; a catalog supports one-click connect. Unlisted products are reported as not found."],
            ["Search an indexed document set", "Built, gated", "Vector search plus an entity graph, workspace-scoped, read-only for agents."],
            ["Risk-gated human sign-off and evidence on criteria", "Built", "The governance for writes already exists."],
            ["Memory of what agents learned", "Built", "Separate from enterprise records by design."],
          ]}
        />
      </Section>

      <Section title="Gaps and build order">
        <RefTable
          headers={["Gap", "Consequence"]}
          rows={[
            [<Term key="1">No connector-driven ingestion or re-sync</Term>, "Indexing starts from uploaded documents. Pulling from Jira or a wiki on a schedule is yours to write."],
            [<Term key="2">Fixed knowledge ontology</Term>, "Entity types are a closed set (person, team, system, …). Customer and order would be a code change."],
            [<Term key="3">No cross-system id map</Term>, "Entity identity is a name within a workspace, so the same order in two systems is two nodes."],
            [<Term key="4">No per-user permission filtering</Term>, "Retrieval runs as the platform. Treat the index as visible to everyone in the workspace."],
          ]}
        />
        <Prose className="mt-4">
          Build in this order: live connectors for the two or three systems that matter most; then the entity id
          map and a small business ontology for them; then indexing for document-like sources only; and
          per-user permission filtering <em>before</em> any sensitive source goes near the index.
        </Prose>
      </Section>
    </>
  );
}
