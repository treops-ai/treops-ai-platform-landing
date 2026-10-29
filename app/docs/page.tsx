import type { Metadata } from "next";
import { WorkFlowDiagram } from "@/components/docs/diagrams/work-flow";
import {
  Callout,
  CardGrid,
  CheckList,
  Figure,
  Prose,
  Section,
  Term,
} from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "What is TreOps",
  description:
    "TreOps is a place to hand work to AI agents and keep track of it — they plan, you approve, they do the work, and it gets checked before anything is called done.",
};

export default function OverviewPage() {
  return (
    <>
      <Callout>
        A chatbot answers questions and forgets them. TreOps <Term>runs the work</Term> — you write down what you
        want, an agent takes it on, and you stay in control of the moments that matter.
      </Callout>

      <Section
        title="The idea"
        intro="Most AI tools give you an answer and leave the doing to you. This one is built the other way round."
      >
        <Prose>
          You describe something you want done. An agent picks it up, works out how it will approach it, and
          checks that with you before starting. It does the work, and the result gets checked against what you
          said &ldquo;done&rdquo; would look like — not against its own opinion.
        </Prose>
        <Prose>
          You are not watching a black box, and you are not babysitting it either. You set where it needs your
          say-so, and it comes to you at exactly those points.
        </Prose>
      </Section>

      <Section
        title="How work moves"
        intro="Every piece of work follows the same rhythm, so you always know where something is."
      >
        <Figure caption="Work waits for you at the points you chose, and comes back round if it isn't right yet.">
          <WorkFlowDiagram />
        </Figure>
      </Section>

      <Section
        title="What you can hand over"
        intro="Anything you'd otherwise keep in a list and feel guilty about."
      >
        <CardGrid
          items={[
            { title: "Research and drafts", body: "Look into something, write it up, and cite where it came from." },
            { title: "Planning", body: "Turn a vague goal into a set of concrete steps with deadlines." },
            { title: "Routine admin", body: "The recurring work you keep putting off because it's fiddly." },
            { title: "Code", body: "Point an agent at a repository and give it a change to make." },
            { title: "Reviewing", body: "Have one agent check another's work before it reaches you." },
            { title: "Watching a project", body: "Let an agent keep an eye on things and flag what's drifting." },
          ]}
        />
      </Section>

      <Section title="What stays yours" intro="The things TreOps deliberately doesn't take away from you.">
        <CheckList
          items={[
            "Deciding what “finished” means — an agent can suggest, but only you can accept.",
            "The approval points. You choose how much rope each project gets.",
            "Your data. TreOps runs on your own machines and your own database.",
            "Your model choice. Bring your own keys, and pick a different model per agent.",
          ]}
        />
        <div className="mt-5">
          <Callout>
            New here? <Term>Your first piece of work</Term> walks through one task end to end — about ten minutes.
          </Callout>
        </div>
      </Section>
    </>
  );
}
