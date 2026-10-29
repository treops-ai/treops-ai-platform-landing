import type { Metadata } from "next";
import {
  Callout,
  CardGrid,
  Prose,
  Section,
  Term,
} from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "Teaching skills",
  description:
    "The fix for explaining the same thing over and over — and how to write a skill an agent will actually apply correctly.",
};

export default function SkillsPage() {
  return (
    <>
      <Section title="When to write one" intro="The fix for explaining the same thing over and over.">
        <Prose>
          If you find yourself telling an agent the same background, the same format, or the same set of steps on
          every piece of work — write it down once as a skill and attach it. From then on it just knows.
        </Prose>
        <div className="mt-5">
          <CardGrid
            items={[
              { title: "A house style", body: "How your team writes: tone, structure, what to never say." },
              { title: "A procedure", body: "The five steps of your release process, in order, with the gotchas." },
              { title: "Context", body: "How your product is put together, so an agent doesn't have to work it out." },
              { title: "A template", body: "The shape a weekly report takes, with the sections filled in the same order." },
            ]}
          />
        </div>
      </Section>

      <Section title="Writing your first skill" intro="A title, when to use it, and how to do it.">
        <Prose>
          Say plainly when the skill applies — this is what an agent uses to decide whether to reach for it — and
          then how to carry it out. You can attach supporting files: templates, examples, reference material.
        </Prose>
        <Prose>
          Write it for someone competent who&apos;s new. Skip the obvious, include the things people get wrong.
          If a step exists because of something that went badly once, say so — the reason helps more than the rule.
        </Prose>
        <div className="mt-5">
          <Callout>
            Start by writing down the correction you most often have to give an agent. That&apos;s almost always
            your most valuable first skill.
          </Callout>
        </div>
      </Section>

      <Section title="Attaching skills to agents" intro="Skills belong to your workspace; you choose which agents get which.">
        <Prose>
          Attach the same skill to as many agents as you like. Editing it updates everywhere — the next piece of
          work each agent picks up will use the new version. Work already in flight carries on with what it
          started with.
        </Prose>
        <Prose>
          Give each agent the skills for its job rather than all of them. An agent with fifteen skills is worse at
          picking the right one than an agent with four.
        </Prose>
      </Section>

      <Section title="Borrowing skills from others" intro="You don't have to write everything yourself.">
        <Prose>
          You can bring in skills that other people have published, or pull them from a code repository. They
          arrive as drafts in your workspace, so read one before you attach it — a skill is instructions your
          agents will follow, and it deserves the same look you&apos;d give a dependency. See <Term>Connecting tools</Term>{" "}
          for the related question of what your agents can reach.
        </Prose>
      </Section>
    </>
  );
}
