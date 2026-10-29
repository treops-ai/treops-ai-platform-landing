import type { Metadata } from "next";
import {
  Callout,
  FigurePlaceholder,
  Prose,
  Section,
  StepCards,
  Term,
} from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "Your first piece of work",
  description:
    "Start to finish: write down something you want done, hand it to an agent, approve its plan, and sign off the result.",
};

export default function FirstTaskPage() {
  return (
    <>
      <Section title="Before you start" intro="Two things need to exist. If someone set TreOps up for you, they probably already do.">
        <Prose>
          You need a <Term>project</Term> to put the work in, and at least one <Term>agent</Term> to do it. If
          your workspace has neither, create a project first, then see <Term>Creating an agent</Term> — it takes
          a couple of minutes and you only do it once.
        </Prose>
        <div className="mt-4">
          <Callout>
            Pick something real but small for this first run. Something you&apos;d be pleased to have done, but
            not upset to redo.
          </Callout>
        </div>
      </Section>

      <Section title="1. Write down what you want" intro="Press C anywhere, or use the New button.">
        <Prose>
          Give it a title that says the outcome, not the activity — &ldquo;Draft the Q3 update for the board&rdquo;
          rather than &ldquo;Q3 stuff&rdquo;. In the description, say anything an agent couldn&apos;t guess: who
          it&apos;s for, how long it should be, what to avoid, where to look.
        </Prose>
        <Prose>
          Write it the way you&apos;d brief a capable new colleague who has never met your team. That is almost
          exactly the situation.
        </Prose>
      </Section>

      <Section title="2. Say what “done” looks like" intro="This is the step people skip, and the one that makes the difference.">
        <Prose>
          Add a few <Term>acceptance criteria</Term> — short, checkable statements. &ldquo;Under two pages.&rdquo;
          &ldquo;Covers revenue, hiring, and the platform migration.&rdquo; &ldquo;No numbers that aren&apos;t in
          the finance sheet.&rdquo;
        </Prose>
        <Prose>
          You can also let the agent suggest some and then accept the ones you agree with. Either way, the work
          cannot be marked finished while a criterion you accepted is still unchecked. That rule is what stops
          &ldquo;done&rdquo; from meaning &ldquo;the agent thinks it&apos;s done&rdquo;.
        </Prose>
      </Section>

      <Section title="3. Hand it to an agent" intro="Assign it, exactly like assigning to a person.">
        <Prose>
          Set the assignee to one of your agents. Within a few moments it will pick the work up — you&apos;ll see
          it change to in progress and start reporting what it&apos;s doing.
        </Prose>
        <div className="mt-5">
          <FigurePlaceholder label="Assigning a card to an agent" caption="Fig. 1 — Handing work over." />
        </div>
      </Section>

      <Section title="4. Approve the plan" intro="By default, the agent checks its approach with you before doing anything.">
        <Prose>
          You&apos;ll get a short write-up of how it intends to tackle the work. Read it. If it has misunderstood
          something, send it back with a note — that&apos;s much cheaper here than after the work is done.
        </Prose>
        <Prose>
          If it wasn&apos;t sure about something, it will ask you a question instead of guessing. Answer it and it
          carries on.
        </Prose>
      </Section>

      <Section title="5. Check the result" intro="When it's finished, it comes back to you with the work and the criteria.">
        <Prose>
          You&apos;ll see what it produced, and how each of your criteria fared. Anything that didn&apos;t hold up
          is flagged rather than hidden. Approve it and the work is done; send it back and it takes another pass
          with your notes.
        </Prose>
      </Section>

      <Section title="What to try next" intro="Once one piece of work has been through the loop.">
        <StepCards
          steps={[
            {
              title: "Loosen the checkpoints",
              body: "For low-stakes work, let agents start without waiting for you to approve the plan. See Checkpoints & approvals.",
            },
            {
              title: "Teach it something",
              body: "If you found yourself explaining the same thing twice, write it down once as a skill.",
            },
            {
              title: "Let an agent watch a project",
              body: "Give it goals and it will check in on its own and tell you what's drifting.",
            },
          ]}
        />
      </Section>
    </>
  );
}
