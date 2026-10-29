import type { Metadata } from "next";
import {
  Callout,
  CheckList,
  Prose,
  RefTable,
  Section,
  Term,
} from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "Letting an agent manage it",
  description:
    "Put an agent in charge of watching a project. It checks in on its own schedule and tells you when something needs your attention.",
};

export default function AutopilotPage() {
  return (
    <>
      <Section title="What a manager agent does" intro="Not doing the work — watching whether the work is going anywhere.">
        <Prose>
          A manager agent looks at the project against its goals and milestones and asks the questions you&apos;d
          ask if you had time: what&apos;s been sitting still, what&apos;s missing, what&apos;s about to slip,
          what nobody has picked up.
        </Prose>
        <Prose>
          It brings you a short list of things it thinks are worth your attention. It doesn&apos;t change
          anything on its own.
        </Prose>
      </Section>

      <Section title="Turning it on" intro="Three things need to be in place.">
        <CheckList
          items={[
            "The project has an agent set as its manager.",
            "That agent's machine is running.",
            "The project has at least one goal — otherwise there's nothing to measure against.",
          ]}
        />
        <Prose className="mt-5">
          After that it checks in periodically on its own. You don&apos;t schedule it, and you don&apos;t need to
          prompt it.
        </Prose>
      </Section>

      <Section title="Reading its suggestions" intro="Each one comes with a sense of how much it matters, and something you can do about it.">
        <RefTable
          headers={["Marked", "Means"]}
          rows={[
            ["For information", "Worth knowing. Nothing needed from you."],
            ["Worth a look", "Something's drifting — work stalled, a milestone slipping."],
            ["Needs a decision", "It's blocked on you."],
          ]}
        />
        <Prose className="mt-5">
          Most suggestions come with an action you can take in one click — create the work it thinks is missing,
          adjust a card, and so on. Taking the action does it; ignoring it leaves everything alone.
        </Prose>
        <div className="mt-5">
          <Callout>
            Nothing a manager agent suggests happens by itself. It proposes; you decide. If you disagree, dismiss
            it — that&apos;s a normal outcome, not a failure.
          </Callout>
        </div>
      </Section>

      <Section title="Keeping it quiet" intro="A manager that nags gets ignored, which defeats the point.">
        <Prose>
          It won&apos;t pile up unread suggestions — if you haven&apos;t looked at the last set, it waits. It also
          won&apos;t check in again immediately just because time has passed. In practice you get a considered
          list occasionally rather than a stream.
        </Prose>
        <Prose>
          If it&apos;s still too much, turn it off for that project. You keep the goals and milestones; you just
          stop the check-ins. And use the <Term>Assistant</Term> if one place that lists what needs you suits you
          better than per-project watching.
        </Prose>
      </Section>
    </>
  );
}
