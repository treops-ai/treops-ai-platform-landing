import type { Metadata } from "next";
import {
  StoryListDemo,
  StoryBoardDemo,
  StatusLegend,
  PriorityLegend,
  TypeLegend,
  CriteriaDemo,
} from "@/components/docs/demos/story-demos";
import { StoryExample, GoodBad } from "@/components/docs/demos/example-demos";
import { Callout, Prose, Section, Term, UiDemo } from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "Stories",
  description: "A story is one thing you want done. Everything else in TreOps exists to move stories forward.",
};

export default function StoriesPage() {
  return (
    <>
      <Section
        title="What a story looks like"
        intro="One row, one thing you want done. This is the stories list as it appears in the app."
      >
        <UiDemo caption="Each row: what kind of work it is, its reference, the title, how its criteria are doing, how urgent it is, where it's up to, and who has it.">
          <StoryListDemo />
        </UiDemo>
        <Prose className="mt-5">
          Notice the last column — some of these are assigned to agents and some to people. It&apos;s the same
          field either way, which is the whole idea. You don&apos;t keep a separate system for &ldquo;work the
          robots are doing&rdquo;.
        </Prose>
      </Section>

      <Section title="Type" intro="What kind of work this is. It only affects how things are grouped and filtered.">
        <UiDemo caption="The four story types.">
          <TypeLegend />
        </UiDemo>
      </Section>

      <Section title="Priority" intro="How much it matters. Sorting and the agent's sense of urgency both use it.">
        <UiDemo caption="Five levels, highest first.">
          <PriorityLegend />
        </UiDemo>
      </Section>

      <Section title="Status" intro="Where the work has got to. This moves on its own as an agent works.">
        <UiDemo caption="The six states a story moves through.">
          <StatusLegend />
        </UiDemo>
        <Prose className="mt-5">
          <Term>Blocked</Term> is the one you set deliberately — it means something outside the work is in the
          way. The rest generally look after themselves once an agent picks the story up.
        </Prose>
      </Section>

      <Section title="Seeing them as a board" intro="Same stories, arranged by status. Drag a card to change where it is.">
        <UiDemo caption="The board view, showing three of the six columns.">
          <StoryBoardDemo />
        </UiDemo>
      </Section>

      <Section
        title="Acceptance criteria"
        intro="Short, checkable statements about the finished work. This is the part that makes “done” mean something."
      >
        <UiDemo caption="Criteria on a story, with the results of the last check.">
          <CriteriaDemo />
        </UiDemo>
        <Prose className="mt-5">
          A criterion earns its place if someone other than the author could check it and reach the same answer:
        </Prose>
        <div className="mt-4">
          <GoodBad
            good="Every price matches the pricing sheet."
            goodNote="Two people checking this agree. So can an agent."
            bad="The announcement is well written."
            badNote="Nothing here can be verified, so it can't gate anything."
          />
        </div>
        <div className="mt-5">
          <Callout>
            A story cannot be marked finished while a criterion you accepted is still unchecked. Not by an agent,
            not by convention — the system refuses it. See <Term>Checkpoints &amp; approvals</Term>.
          </Callout>
        </div>
      </Section>

      <Section
        title="A complete story"
        intro="Everything above, on one real story from the Product launch project."
      >
        <UiDemo caption="LAUNCH-14, sitting in review because one criterion failed.">
          <StoryExample />
        </UiDemo>
        <Prose className="mt-5">
          The description does the work here. It names the audience, says where the source of truth lives, and
          names who signs off — three things an agent could not have guessed and would otherwise have invented.
        </Prose>
      </Section>
    </>
  );
}
