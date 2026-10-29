import type { Metadata } from "next";
import { TaskEnvironmentDiagram } from "@/components/docs/diagrams/task-environment";
import {
  MachineReachDemo,
  MachineStatesDemo,
  RuntimeListDemo,
} from "@/components/docs/demos/setup-demos";
import { RuntimeChoiceExample } from "@/components/docs/demos/example-demos";
import {
  Callout,
  Figure,
  Prose,
  RefTable,
  Section,
  Term,
  UiDemo,
} from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "Runtimes",
  description:
    "A runtime is the machine an agent works on. It decides what an agent can reach, and it is the answer to most “why didn't that work?” questions.",
};

export default function RuntimesPage() {
  return (
    <>
      <Section title="Your machines" intro="Every agent runs somewhere. An agent without a working machine does nothing at all.">
        <UiDemo caption="Machines registered to a workspace. One machine can run several agents.">
          <RuntimeListDemo />
        </UiDemo>
        <Prose className="mt-5">
          Agents are tied to a machine when you create them. It&apos;s the least glamorous concept in TreOps and
          the one that explains most of the surprises — an agent that never starts, or that can&apos;t find a
          file you&apos;re looking straight at, is nearly always a machine question.
        </Prose>
      </Section>

      <Section
        title="What happens when work lands on a machine"
        intro="Not much magic: the daemon builds a working directory, the agent works in it, and the results come back."
      >
        <Figure caption="Everything the agent needs is gathered at the moment work starts.">
          <TaskEnvironmentDiagram />
        </Figure>
        <Prose className="mt-5">
          This one picture explains three behaviours that otherwise look arbitrary:
        </Prose>
        <div className="mt-4">
          <RefTable
            headers={["You notice", "Because"]}
            rows={[
              [
                "Editing a skill doesn't change work already running",
                "The skills were copied in when that work started. The next piece of work gets the new version.",
              ],
              [
                "A hosted agent can't see a file on your laptop",
                "The working directory is built on its machine, not yours. It can only gather what that machine can reach.",
              ],
              [
                "One agent can use a connected tool and another can't",
                "Credentials are gathered per agent, from what you attached to that agent — not from the workspace at large.",
              ],
            ]}
          />
        </div>
      </Section>

      <Section title="Three ways to run an agent" intro="The choice is almost always decided by what the work needs to reach.">
        <RefTable
          headers={["Option", "What it is", "Choose it when"]}
          rows={[
            [
              "Your own machine",
              "A daemon process on hardware you control.",
              "Work needs your files, your checkouts, or something only reachable from your network.",
            ],
            [
              "Platform-hosted",
              "A container the platform starts and manages.",
              "You want agents that keep working when your laptop is shut.",
            ],
            [
              "Platform-hosted, built in",
              "A managed container running the built-in worker.",
              "You want managed execution without the full toolchain.",
            ],
          ]}
        />
        <Prose className="mt-6">
          Applied to three real pieces of work:
        </Prose>
        <div className="mt-4">
          <UiDemo caption="The question to ask is always: does this need something that only exists on my machine?">
            <RuntimeChoiceExample />
          </UiDemo>
        </div>
        <Prose className="mt-5">
          Nothing stops you having both. A common setup is one hosted machine for writing, planning and review,
          and your own laptop for anything that touches code.
        </Prose>
      </Section>

      <Section
        title="What a machine can reach"
        intro="The practical difference between running an agent on your hardware and on a hosted container."
      >
        <UiDemo caption="Everything in your workspace is reachable either way. Your local environment is not.">
          <MachineReachDemo />
        </UiDemo>
        <div className="mt-5">
          <Callout>
            A hosted agent is not a lesser agent — it has your workspace, your files, your knowledge, and your
            connected tools. It simply isn&apos;t sitting at your desk. The trade is availability against local
            reach.
          </Callout>
        </div>
      </Section>

      <Section title="When a machine goes offline" intro="Work waits. It doesn't fail, and it isn't lost.">
        <UiDemo caption="What each state means for work you've already assigned.">
          <MachineStatesDemo />
        </UiDemo>
        <Prose className="mt-5">
          If you assign work and nothing happens at all, check the machine first — an offline or never-started
          machine accounts for most of these. When it comes back, queued work starts on its own; you don&apos;t
          need to reassign, though you can move an agent to a different machine if you&apos;d rather not wait.
        </Prose>
        <Prose>
          Setting a machine up, claiming hosted compute, and watching cost are covered in{" "}
          <Term>Adding machines</Term>.
        </Prose>
      </Section>
    </>
  );
}
