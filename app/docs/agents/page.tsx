import type { Metadata } from "next";
import { AgentRosterDemo, AgentStatusLegend } from "@/components/docs/demos/setup-demos";
import { AgentBriefExample } from "@/components/docs/demos/example-demos";
import { Callout, CanCannotTable, CardGrid, Prose, Section, Term, UiDemo } from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "Agents",
  description:
    "An agent is a configured teammate. It appears wherever people do, and you assign work to it the same way.",
};

export default function AgentsPage() {
  return (
    <>
      <Section title="Your roster" intro="Agents you've set up, what each is for, and what it's doing right now.">
        <UiDemo caption="Each agent has a job, a model behind it, and the skills and tools you gave it.">
          <AgentRosterDemo />
        </UiDemo>
        <Prose className="mt-5">
          Two or three agents with distinct jobs works better than one that does everything — particularly having
          a different agent review work than the one that did it. See <Term>Creating an agent</Term>.
        </Prose>
      </Section>

      <Section title="What an agent is made of" intro="Everything that shapes its behaviour is configuration you control.">
        <CardGrid
          items={[
            { title: "A brief", body: "Standing instructions that apply to everything it ever does." },
            { title: "A model", body: "Which model backs it. You can mix cheap and expensive across a workspace." },
            { title: "A machine", body: "Where it runs — your hardware or a hosted container." },
            { title: "Skills", body: "Written-down methods it should follow." },
            { title: "Tools", body: "External systems it's allowed to reach." },
            { title: "Projects", body: "The work it's responsible for, and the edge of what it can touch." },
          ]}
        />
        <Prose className="mt-6">
          The brief does most of the work, so it&apos;s worth seeing a real one. This is the whole brief for a
          Writer Agent — nothing is omitted:
        </Prose>
        <div className="mt-4">
          <UiDemo caption="A complete agent brief. Concrete rules, and the reason behind the surprising ones.">
            <AgentBriefExample />
          </UiDemo>
        </div>
        <Prose className="mt-5">
          Note what it does <Term>not</Term>{" "}
          contain: anything about a specific piece of work. &ldquo;Draft the
          launch announcement&rdquo; belongs on a story. The brief is only things that are true every time this
          agent runs. Writing one well is covered in <Term>Creating an agent</Term>.
        </Prose>
      </Section>

      <Section title="What an agent is doing" intro="Every agent shows its current state, so you can tell working from stuck at a glance.">
        <UiDemo caption="The five states an agent can be in.">
          <AgentStatusLegend />
        </UiDemo>
        <Prose className="mt-5">
          <Term>Blocked</Term> means it has stopped and needs something from you. <Term>Offline</Term>{" "}
          almost always means its machine isn&apos;t running — see <Term>Runtimes</Term>.
        </Prose>
      </Section>

      <Section title="What agents cannot do" intro="Some limits aren't up to the agent, or to how its brief is written.">
        <CanCannotTable
          can={[
            "Work on the projects you've given it",
            "Read and write stories, comments, and criteria in your workspace",
            "Use the skills and tools you attached to it",
            "Suggest what “done” should mean",
          ]}
          cannot={[
            "See anything in another workspace",
            "Create or delete projects, or change who's in the workspace",
            "Add or reconfigure agents, including itself",
            "Finish work while a criterion you accepted is unchecked",
          ]}
        />
        <div className="mt-5">
          <Callout>
            These aren&apos;t instructions an agent is asked to follow — they&apos;re enforced. A cleverly worded
            prompt can&apos;t talk an agent past them.
          </Callout>
        </div>
      </Section>
    </>
  );
}
