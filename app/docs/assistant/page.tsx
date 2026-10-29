import type { Metadata } from "next";
import {
  CardGrid,
  FigurePlaceholder,
  Prose,
  Section,
  Term,
} from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "Your daily assistant",
  description:
    "A chat that already knows your projects — for asking what happened, what is stuck, and what you should look at first.",
};

export default function AssistantPage() {
  return (
    <>
      <Section title="What it's for" intro="The difference from a general chatbot is that it can see your work.">
        <Prose>
          Ask it what happened yesterday, what&apos;s stuck, which project is in the worst shape, or what you
          should deal with first. It answers from your actual projects rather than from what you paste in.
        </Prose>
        <Prose>
          Conversations are kept, so a thread of thinking about a project is still there next week.
        </Prose>
      </Section>

      <Section title="What it opens on" intro="It starts on what needs you, rather than on an empty box.">
        <CardGrid
          columns={2}
          items={[
            { title: "What changed", body: "A short read on what's moved since you last looked." },
            { title: "What's waiting on you", body: "Approvals, questions from agents, and blocked work." },
            { title: "What's coming", body: "Deadlines and milestones, as a calendar or a list." },
            { title: "How projects are doing", body: "A view across everything, rather than one project at a time." },
          ]}
        />
      </Section>

      <Section title="Acting without leaving the chat" intro="Answers you can do something about.">
        <Prose>
          When it refers to a piece of work you can open it right there, read it, and act — approve it, comment,
          reassign — without losing the conversation. For clearing a backlog of decisions in one sitting,
          the <Term>Needs you</Term> list on the Assistant&apos;s home is the more structured way to do it.
        </Prose>
        <div className="mt-5">
          <FigurePlaceholder label="The assistant, with a card opened alongside the conversation" caption="Fig. 1 — Acting from the chat." />
        </div>
      </Section>
    </>
  );
}
