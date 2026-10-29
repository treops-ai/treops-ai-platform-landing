import type { Metadata } from "next";
import { Callout, CardGrid, Prose, RefTable, Section, Term } from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "Files & knowledge",
  description:
    "Choosing what to index, asking questions about your documents, and letting agents draw on them while they work.",
};

export default function KnowledgePage() {
  return (
    <>
      <Callout>
        For what the vault is and how storing differs from indexing, see <Term>Vault</Term>. This page is about
        using it well.
      </Callout>

      <Section
        title="Choosing what to index"
        intro="Indexing everything makes answers worse, not better. Be deliberate."
      >
        <RefTable
          headers={["Worth indexing", "Usually not"]}
          rows={[
            ["Decisions and the reasoning behind them", "Meeting notes nobody reads"],
            ["How your product or process actually works", "Anything superseded but not deleted"],
            ["Reference material agents will need repeatedly", "Drafts and working files"],
            ["Policies, standards, and constraints", "Large exports you'd query directly anyway"],
          ]}
        />
        <Prose className="mt-5">
          The test: would you hand this to a new colleague and expect it to help? If it would confuse them, it
          will confuse an agent too — and an agent won&apos;t tell you it&apos;s confused.
        </Prose>
        <div className="mt-5">
          <Callout>
            Superseded documents are the most common cause of bad answers. If something is out of date, remove it
            from the index rather than leaving it to compete with the current version.
          </Callout>
        </div>
      </Section>

      <Section title="Asking questions about your documents" intro="Ask in plain language and check the sources you get back.">
        <Prose>
          Answers come with the documents they were drawn from. Do click through, especially early on — it&apos;s
          how you learn whether your indexed set is good, and it usually explains a surprising answer straight
          away.
        </Prose>
        <Prose>
          Your agents draw on the same material while they work, which is the real payoff. An agent writing a
          summary can pull the background itself instead of asking you for it.
        </Prose>
      </Section>

      <Section title="Seeing how things connect" intro="TreOps also notices what your documents are about.">
        <Prose>
          As documents are indexed, the people, systems, decisions, and concepts they mention get picked out along
          with how they relate. You can explore that as a map — pick anything and see what it connects to and
          which documents mention it.
        </Prose>
        <div className="mt-5">
          <CardGrid
            columns={2}
            items={[
              {
                title: "Good for",
                body: "“What depends on this system?” — questions whose answer is spread across several documents.",
              },
              {
                title: "Less good for",
                body: "Exact lookups. If you already know which document you want, just open it.",
              },
            ]}
          />
        </div>
      </Section>
    </>
  );
}
