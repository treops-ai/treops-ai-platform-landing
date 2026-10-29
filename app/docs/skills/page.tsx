import type { Metadata } from "next";
import { SkillListDemo } from "@/components/docs/demos/setup-demos";
import { SkillFileExample } from "@/components/docs/demos/example-demos";
import { Callout, CardGrid, Prose, Section, Term, UiDemo } from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "A skill is a written-down way of doing something. Attach it to an agent and it follows that method every time.",
};

export default function SkillsPage() {
  return (
    <>
      <Section title="What a skill looks like" intro="A name, what it's for, its files, and the agents currently using it.">
        <UiDemo caption="Skills belong to the workspace. You choose which agents get which.">
          <SkillListDemo />
        </UiDemo>
        <Prose className="mt-5">
          The counts on the right are the files the skill carries and how many agents have it attached. Editing a
          skill updates it for every agent that uses it.
        </Prose>
      </Section>

      <Section title="What goes in one" intro="Two things: when to use it, and how to do it. Here is a complete one.">
        <UiDemo caption="The House writing style skill in full. This is the file an agent reads.">
          <SkillFileExample />
        </UiDemo>
        <Prose className="mt-5">
          Three things to notice. The <Term>description</Term>{" "}
          at the top is how an agent decides whether this
          skill applies at all — vague descriptions are the main reason a skill gets ignored. The rules are
          specific enough to check. And the one surprising rule carries its reason: &ldquo;Simply is banned
          because it tells a reader who is stuck that their problem is trivial.&rdquo; An agent that knows why
          will generalise correctly; one that only knows the rule won&apos;t.
        </Prose>
        <div className="mt-5">
          <CardGrid
            columns={2}
            items={[
              {
                title: "When it applies",
                body: "How an agent decides whether to reach for this skill. Be specific — this is what stops it being used at the wrong moment.",
              },
              {
                title: "How to do it",
                body: "The actual method. Steps, rules, things people get wrong, and why any surprising rule exists.",
              },
            ]}
          />
        </div>
        <Prose className="mt-5">
          Skills can carry files too — templates, examples, reference material an agent should work from rather
          than invent.
        </Prose>
        <div className="mt-5">
          <Callout>
            The fastest way to find your first skill: write down the correction you most often have to give an
            agent. See <Term>Teaching skills</Term>.
          </Callout>
        </div>
      </Section>

      <Section title="How a skill reaches an agent" intro="It's placed in the agent's working environment before it starts.">
        <Prose>
          When an agent picks up a piece of work, its attached skills are written into the environment it works
          in. It discovers them there, the way it would any local reference.
        </Prose>
        <Prose>
          This is why editing a skill takes effect on the <Term>next</Term> piece of work rather than immediately.
          Work already underway carries on with what it started with.
        </Prose>
      </Section>
    </>
  );
}
