import type { Metadata } from "next";
import {
  Callout,
  CardGrid,
  FigurePlaceholder,
  Prose,
  Section,
  Term,
} from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "Creating an agent",
  description:
    "Writing a brief that actually shapes behaviour, and building a small team of agents rather than one that does everything.",
};

export default function AgentsPage() {
  return (
    <>

      <Section
        title="Writing a good brief"
        intro="The brief is the agent's standing instructions — it applies to everything the agent ever does, so it's worth some care."
      >
        <Prose>
          Say what it&apos;s for, how you want it to behave, and what to avoid. Concrete beats aspirational:
          &ldquo;always cite the source document for any figure&rdquo; is useful; &ldquo;be accurate&rdquo; is
          not.
        </Prose>
        <Prose>
          Keep it about <Term>how this agent works</Term>, not about a particular task — task detail belongs on
          the card. A good test: if it only applies to one piece of work, it doesn&apos;t belong in the brief.
        </Prose>
        <div className="mt-5">
          <Callout>
            Stuck on the first draft? Describe what you want in a sentence and have TreOps generate a brief, then
            edit it. It&apos;s easier to react to something than to start from an empty box.
          </Callout>
        </div>
      </Section>

      <Section title="Two jobs an agent can do" intro="The same agent can do either. What it's doing depends on the work it picks up.">
        <CardGrid
          columns={2}
          items={[
            {
              title: "Doing the work",
              body: "Picks up cards assigned to it, does them, and checks its output against your criteria before handing back.",
            },
            {
              title: "Running a project",
              body: "Watches a project against its goals, breaks work down, and tells you what needs attention. See Letting an agent manage it.",
            },
          ]}
        />
      </Section>

      <Section title="Building a small team" intro="Two or three agents with different jobs beats one that does everything.">
        <Prose>
          A common shape: one agent that does the work, one that reviews it, and one that keeps an eye on the
          project. The reviewer being a different agent with a different brief is what makes the review worth
          anything — an agent checking its own work is a weaker check, and you can see why.
        </Prose>
        <Prose>
          They can run on different models too. A fast, cheap model is fine for triage and summarising; save the
          expensive one for work that needs it.
        </Prose>
        <div className="mt-5">
          <FigurePlaceholder label="Agent setup — brief, skills, tools, machine, model" caption="Fig. 1 — Configuring an agent." />
        </div>
      </Section>

    </>
  );
}
