import type { Metadata } from "next";
import {
  FlowListDemo,
  FlowRunDemo,
  FlowStepsDemo,
  StepPaletteDemo,
} from "@/components/docs/demos/flow-demos";
import {
  Callout,
  Prose,
  RefTable,
  Section,
  Term,
  UiDemo,
} from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "Flows",
  description:
    "A flow is a procedure you write once and run whenever you need it — the same steps, in the same order, every time.",
};

export default function FlowsPage() {
  return (
    <>
      <Callout>
        Flows are a recurring-work surface, separate from stories. If the work is a one-off, assign a story
        instead — the last section on this page covers which to reach for.
      </Callout>

      <Section
        title="What a flow is"
        intro="A named, ordered list of steps you can run on demand. The work of thinking it through happens once."
      >
        <UiDemo caption="Flows in a workspace. Press Run and it collects whatever it needs, then works through the steps.">
          <FlowListDemo />
        </UiDemo>
        <Prose className="mt-5">
          The recurring chores are the ones worth turning into a flow — the weekly report, the feedback triage,
          the pre-release check. Anything you have explained to someone twice is a candidate.
        </Prose>
      </Section>

      <Section
        title="The steps you can use"
        intro="Ten kinds of step, grouped by what they ask of whom."
      >
        <UiDemo caption="The step palette: ask for text or a file, ask the AI, search the web, research, use a browser, read your workspace, act in a connected app, think it through as a group, or wait for your OK.">
          <StepPaletteDemo />
        </UiDemo>
        <Prose className="mt-5">
          Most steps are instructions plus a decision about what the AI is allowed to reach — its own knowledge, the
          web, your workspace, or an app you&apos;ve connected. <Term>Ask the AI</Term> can run as one of your
          agents, bringing its brief and skills with it. <Term>Wait for your OK</Term> pauses the run so you can
          check the work, then approve it to go on or reject it to stop the run.
        </Prose>
      </Section>

      <Section
        title="Passing work between steps"
        intro="A step refers to an earlier step by name, right inside its instructions."
      >
        <UiDemo caption="A flow that turns a support export into story drafts. Steps 3 to 5 name earlier steps to use their output, and step 4 waits for your OK.">
          <FlowStepsDemo />
        </UiDemo>
        <Prose className="mt-5">
          You don&apos;t wire boxes together — you mention the step you want inside the instructions, and its output is
          available there. A step can only refer backwards, which is what keeps a flow readable top to bottom.
        </Prose>
        <div className="mt-5">
          <Callout>
            Anything the flow needs from a person is collected up front, in one form, before the run starts —
            not asked halfway through. The only pause is a <Term>Wait for your OK</Term> step you added yourself.
          </Callout>
        </div>
      </Section>

      <Section
        title="Running one"
        intro="Fill in the form, watch the steps go, read the output."
      >
        <UiDemo caption="Each step reports as it goes. Output appears as it's produced rather than at the end.">
          <FlowRunDemo />
        </UiDemo>
        <Prose className="mt-5">
          The run shows the final result first — the output of the last step that did real work. Every run is
          kept, so you can go back through previous runs and see what each step produced. If a step fails, you
          fix whatever caused it and resume from that step — the work already done isn&apos;t repeated.
        </Prose>
        <Prose className="mt-4">
          A flow can run on a schedule — hourly, daily, on weekdays or weekly at a time in your timezone — and
          its result can go to Slack, to people by email, or into a story. Set both under{" "}
          <Term>Where the result goes</Term>, the last card of the flow.
        </Prose>
      </Section>

      <Section
        title="Flows or a story?"
        intro="They look similar from a distance and are for genuinely different things."
      >
        <RefTable
          headers={["", "A story", "A flow"]}
          rows={[
            ["Best for", "One specific piece of work.", "Work you do again and again the same way."],
            ["Who decides the steps", "The agent plans its own approach.", "You wrote the steps in advance."],
            ["Checkpoints", "You approve the plan and the result.", "Only where you add a Wait for your OK step."],
            ["Tracked as", "Work with a status, an owner, and criteria.", "A run you read the output of."],
            ["Started by", "Assigning it, or an agent picking it up.", "You pressing Run, or a schedule."],
          ]}
        />
        <Prose className="mt-5">
          The dividing line is whether you already know the steps. If you do, a flow does them identically every
          time. If you don&apos;t — and want an agent to work it out, and want a say before it commits — that is
          a story. See <Term>Checkpoints &amp; approvals</Term>.
        </Prose>
        <div className="mt-5">
          <Callout>
            One current limit worth knowing: a flow is private to whoever wrote it, and agents cannot trigger a
            flow themselves.
          </Callout>
        </div>
      </Section>
    </>
  );
}
