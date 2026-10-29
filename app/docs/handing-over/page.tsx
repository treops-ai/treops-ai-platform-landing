import type { Metadata } from "next";
import {
  Callout,
  FigurePlaceholder,
  Prose,
  RefTable,
  Section,
  Term,
} from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "Handing work to an agent",
  description:
    "You assign work to an agent the same way you assign it to a person. Here is what happens after you do, and how to follow along.",
};

export default function HandingOverPage() {
  return (
    <>
      <Section title="Assigning the work" intro="Set the assignee. That's the whole action.">
        <Prose>
          Agents appear in the same assignee list as your teammates. Pick one, and it will take the work up
          shortly — you don&apos;t need to start anything or press go.
        </Prose>
        <Prose>
          If nothing happens, the usual reason is that the agent&apos;s machine isn&apos;t running. See{" "}
          <Term>Where agents run</Term>.
        </Prose>
      </Section>

      <Section title="Watching it happen" intro="You can follow along as closely or as loosely as you like.">
        <Prose>
          The card shows what the agent is doing right now, and updates as it goes. If you&apos;d rather not
          watch, don&apos;t — it will come to you when it needs you, and you&apos;ll get a notification.
        </Prose>
        <div className="mt-5">
          <FigurePlaceholder label="A card with an agent working on it" caption="Fig. 1 — Following along." />
        </div>
      </Section>

      <Section title="Reading what it did" intro="Every run is recorded, and you can read the whole thing.">
        <Prose>
          Open the transcript to see the agent&apos;s reasoning, the tools it used, and what came back. This is
          worth doing a few times early on — it&apos;s the fastest way to learn whether your brief was clear, and
          it usually explains a disappointing result immediately.
        </Prose>
        <Prose>
          Agents also comment on cards as they work, and can mention you. Those comments are the summary; the
          transcript is the detail.
        </Prose>
      </Section>

      <Section title="When something goes wrong" intro="Agents fail. The system is built to make that visible rather than quiet.">
        <RefTable
          headers={["What you see", "What it means", "What to do"]}
          rows={[
            [
              "It asks you a question",
              "It hit something ambiguous and chose not to guess.",
              "Answer it on the card. It picks straight back up.",
            ],
            [
              "The work comes back to you",
              "A check didn't pass, or the plan needed another go.",
              "Read the note explaining why, then send it back or take it over.",
            ],
            [
              "It stops and flags you",
              "It's been round several times without getting there, or it failed repeatedly.",
              "It won't keep burning attempts. Look at the history and decide how to unblock it.",
            ],
            [
              "Nothing happens at all",
              "Usually the agent's machine is offline.",
              "Check the agent's machine is running, then reassign.",
            ],
          ]}
        />
        <div className="mt-5">
          <Callout>
            An agent that gets stuck stops and tells you. It will not keep trying forever, and it will not quietly
            mark something done to get unstuck.
          </Callout>
        </div>
      </Section>

      <Section title="Stopping or redirecting it" intro="You can intervene at any point.">
        <Prose>
          Cancel a run if it&apos;s heading the wrong way — nothing is lost, and the transcript stays so you can
          see where it went off. Edit the card, add a comment with more detail, and hand it back. Or reassign it
          to a different agent, or to yourself.
        </Prose>
      </Section>
    </>
  );
}
