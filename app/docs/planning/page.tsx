import type { Metadata } from "next";
import {
  Callout,
  Prose,
  RefTable,
  Section,
  Term,
} from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "Planning a project",
  description:
    "Set out what a project is for, break it into milestones, and think it through with an agent before anyone starts building.",
};

export default function PlanningPage() {
  return (
    <>
      <Section title="Saying what the project is for" intro="Goals are short statements of what you're trying to achieve.">
        <Prose>
          Write two or three. They&apos;re not decoration — they&apos;re what an agent measures the project
          against when it&apos;s deciding whether things are drifting, and what a plan gets checked against.
        </Prose>
        <Prose>
          Aim for outcomes rather than activities. &ldquo;Customers can self-serve a refund&rdquo; tells you
          whether you got there; &ldquo;improve the refund flow&rdquo; doesn&apos;t.
        </Prose>
        <div className="mt-5">
          <Callout>
            A project with no goals can be worked on perfectly well — but an agent can&apos;t usefully manage it,
            because it has nothing to judge against.
          </Callout>
        </div>
      </Section>

      <Section title="Planning it out together" intro="A working conversation with an agent, kept on the project.">
        <Prose>
          Talk through what you&apos;re trying to do and let the agent push back, break things down, and draft
          options. It has the project&apos;s history and files to hand, so it isn&apos;t guessing at context.
        </Prose>
        <Prose>
          Anything useful that comes out — a breakdown, a draft, a list of candidate work — is kept with the
          conversation. You can close it out with a summary of what you decided, which is what you&apos;ll
          actually reread in a month.
        </Prose>
      </Section>

      <Section title="Turning a plan into work" intro="A plan that stays a conversation doesn't help anyone.">
        <Prose>
          Create the cards from what you agreed, and group them under milestones with dates. The project view then
          shows real progress — driven by work finishing, not by anyone updating a number.
        </Prose>
        <div className="mt-5">
          <RefTable
            headers={["If you have", "Do this"]}
            rows={[
              ["A vague goal", "Start a planning conversation before creating any cards."],
              ["A clear list of work", "Create the cards, then group them into milestones."],
              ["A deadline and unclear scope", "Set the milestone first, then plan backwards into it."],
            ]}
          />
        </div>
      </Section>

      <Section title="Keeping the plan honest" intro="Plans go stale. The useful question is how fast you find out.">
        <Prose>
          Revisit goals when things change — a goal nobody believes any more is worse than no goal, because
          it&apos;s still being measured against. If you&apos;d rather not keep checking manually, hand the
          watching to an agent: see <Term>Letting an agent manage it</Term>.
        </Prose>
      </Section>
    </>
  );
}
