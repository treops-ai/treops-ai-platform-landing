import type { Metadata } from "next";
import { ProjectListDemo } from "@/components/docs/demos/setup-demos";
import { GoalsExample, GoodBad, MilestonesExample } from "@/components/docs/demos/example-demos";
import { SecondBrainDiagram } from "@/components/docs/diagrams/second-brain";
import { Callout, CardGrid, Figure, Prose, Section, Term, UiDemo } from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A project groups stories toward a purpose. It is also the boundary of what an agent is allowed to touch.",
};

export default function ProjectsPage() {
  return (
    <>
      <Section title="What a project looks like" intro="A name, where it's up to, who's managing it, and how the work is tracking.">
        <UiDemo caption="Projects in a workspace. Progress moves when stories finish — not when someone updates a number.">
          <ProjectListDemo />
        </UiDemo>
        <Prose className="mt-5">
          The manager can be you or an agent. When it&apos;s an agent, it watches the project and tells you what
          needs attention — see <Term>Letting an agent manage it</Term>.
        </Prose>
      </Section>

      <Section title="What a project holds" intro="More than a list of stories.">
        <CardGrid
          items={[
            { title: "Stories", body: "The work itself, in a list or on a board." },
            { title: "Goals", body: "What the project is for. An agent measures drift against these." },
            { title: "Milestones", body: "Groups of stories with a date attached." },
            { title: "Files", body: "Documents this project's work depends on." },
            { title: "Memory", body: "Things agents learned and recorded while working here." },
            { title: "History", body: "Every approval, rejection, and result, in order." },
          ]}
        />
        <div className="mt-6">
          <Figure caption="This is why an agent picking up work on a months-old project isn't starting cold.">
            <SecondBrainDiagram />
          </Figure>
        </div>
      </Section>

      <Section title="Goals and milestones" intro="Goals say what you're trying to achieve; milestones say by when.">
        <Prose>
          Here are the real goals on the Product launch project above. Notice they describe a state of the world,
          not a piece of work — you could read each one and answer &ldquo;yes&rdquo; or &ldquo;not yet&rdquo;.
        </Prose>
        <div className="mt-4">
          <UiDemo caption="Three goals on one project. Two or three is the right number; ten means none of them matter.">
            <GoalsExample />
          </UiDemo>
        </div>
        <Prose className="mt-6">
          The difference between a goal that works and one that doesn&apos;t:
        </Prose>
        <div className="mt-4">
          <GoodBad
            good="Anyone on a legacy plan can move to v2 pricing without contacting support."
            goodNote="You can check this. Either they can, or they can't."
            bad="Improve the upgrade experience."
            badNote="Nothing here tells you when you're finished, or lets an agent notice you're drifting."
          />
        </div>
        <Prose className="mt-6">
          Milestones then group the stories that have to finish. Progress moves as work completes — nobody
          maintains a percentage by hand.
        </Prose>
        <div className="mt-4">
          <UiDemo caption="The same project's milestones. “Beta feedback in” is done; the announcement hasn't started.">
            <MilestonesExample />
          </UiDemo>
        </div>
        <div className="mt-5">
          <Callout>
            A project with no goals works perfectly well for people. But an agent can&apos;t usefully manage it,
            because it has nothing to judge against.
          </Callout>
        </div>
      </Section>

      <Section title="Why the boundary matters" intro="A project isn't just organisation — it's the edge of an agent's reach.">
        <Prose>
          An agent can only act on the projects it manages. It cannot wander into another project in your
          workspace, and it can never see another workspace at all. So how you divide work into projects is also
          how you decide what each agent can touch. See <Term>Access &amp; permissions</Term>.
        </Prose>
      </Section>
    </>
  );
}
