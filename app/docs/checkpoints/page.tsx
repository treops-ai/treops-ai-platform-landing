import type { Metadata } from "next";
import { WorkFlowDiagram } from "@/components/docs/diagrams/work-flow";
import {
  Callout,
  CardGrid,
  Figure,
  Prose,
  RefTable,
  Section,
  Term,
} from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "Checkpoints & approvals",
  description:
    "You decide where an agent has to stop and check in with you. This is the part that keeps agents useful instead of alarming.",
};

export default function CheckpointsPage() {
  return (
    <>
      <Section
        title="The rhythm of a piece of work"
        intro="Work an agent takes on always follows the same shape. What changes is where it pauses for you."
      >
        <Figure caption="The two blue steps are where work waits for a person. You choose whether each one is there.">
          <WorkFlowDiagram />
        </Figure>
        <Prose className="mt-5">
          The agent works out its approach, does the work, and the result gets checked. Around that, you place as
          many or as few checkpoints as the work deserves.
        </Prose>
      </Section>

      <Section
        title="Choosing your checkpoints"
        intro="Set this per project, and override it on any single card that needs different treatment."
      >
        <Prose>
          <Term>Before it starts</Term> — you have three options:
        </Prose>
        <div className="mt-4">
          <RefTable
            headers={["Option", "What happens", "Good for"]}
            rows={[
              [
                "Review every plan",
                "The agent writes up its approach and waits for you.",
                "Anything you'd regret getting wrong. This is the default, and where to start.",
              ],
              [
                "Let it start on its own",
                "It still writes the plan — you can read it afterwards — but doesn't wait.",
                "Work you trust the agent with, where you'd rather keep things moving.",
              ],
              [
                "Skip planning",
                "It gets straight on with the work.",
                "Small, obvious tasks where a plan would be ceremony.",
              ],
            ]}
          />
        </div>
        <Prose className="mt-6">
          <Term>When it finishes</Term> — again, three:
        </Prose>
        <div className="mt-4">
          <RefTable
            headers={["Option", "What happens", "Good for"]}
            rows={[
              [
                "Another agent reviews it",
                "A second agent checks the work against your criteria before it reaches you.",
                "The default. Catches the obvious problems without using your time.",
              ],
              [
                "It checks its own work",
                "The agent verifies against your criteria itself.",
                "Lower-stakes work, or when you don't have a second agent set up.",
              ],
              [
                "You review it yourself",
                "It comes straight to you.",
                "Work where your judgement is the whole point.",
              ],
            ]}
          />
        </div>
        <div className="mt-5">
          <Callout>
            A sensible starting point: review plans on anything customer-facing or hard to undo, and let internal
            or exploratory work run without waiting. You can change it any time, and per card.
          </Callout>
        </div>
      </Section>

      <Section title="Approving or sending it back" intro="At a checkpoint you have two moves, and sending it back is not a failure.">
        <Prose>
          Approving lets the work carry on. Sending it back returns it with your note attached — the agent reads
          the note and takes another pass. Rejecting a plan is much cheaper than rejecting finished work, which is
          the main reason the plan checkpoint exists.
        </Prose>
        <Prose>
          Every one of these decisions is recorded against the card, with who made it and when. That history is
          what makes a project reviewable months later.
        </Prose>
      </Section>

      <Section
        title="Saying what “done” means"
        intro="Acceptance criteria are short, checkable statements about the finished work. They're the backbone of the whole thing."
      >
        <Prose>
          You write them, or the agent proposes them and you accept the ones you agree with. Only the ones you
          accepted count.
        </Prose>
        <div className="mt-5">
          <CardGrid
            columns={2}
            items={[
              {
                title: "A good criterion",
                body: "“Every figure traces back to the finance sheet.” Someone else could check it and get the same answer.",
              },
              {
                title: "A weak one",
                body: "“The report is good.” There's nothing here an agent — or you — can actually verify.",
              },
            ]}
          />
        </div>
        <div className="mt-5">
          <Callout>
            Work cannot be marked finished while a criterion you accepted is still unchecked. Not by an agent, not
            by convention — the system refuses it. This is the single most important thing to understand about how
            TreOps behaves.
          </Callout>
        </div>
        <Prose className="mt-4">
          If you rewrite the card substantially, your criteria may no longer match what you asked for. TreOps
          flags that, and you can refresh the suggestions — your existing accept and reject decisions are kept.
        </Prose>
      </Section>

      <Section title="When an agent gets stuck" intro="There's a limit on how many times work can go round.">
        <Prose>
          If the same piece of work keeps coming back — a plan rejected repeatedly, a check that won&apos;t pass —
          the agent stops rather than grinding. It flags the work for you with the reason, and everything it tried
          is there to read.
        </Prose>
        <Prose>
          You can set how many attempts it gets before that happens. The point is that nobody discovers a week
          later that an agent has been quietly looping.
        </Prose>
      </Section>
    </>
  );
}
