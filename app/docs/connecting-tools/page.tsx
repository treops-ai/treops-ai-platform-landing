import type { Metadata } from "next";
import {
  Callout,
  CardGrid,
  Prose,
  Section,
  Term,
} from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "Connecting tools",
  description:
    "Give your agents access to the systems you already use, so they can read and act there instead of handing you a to-do list.",
};

export default function ConnectorsPage() {
  return (
    <>
      <Section title="Why connect a tool" intro="An agent that can only read your cards can only tell you things. One with access can do things.">
        <Prose>
          Connect the systems where your work actually lives and an agent can look something up, file something,
          or make a change — instead of producing a list of steps for you to carry out.
        </Prose>
        <div className="mt-5">
          <CardGrid
            columns={2}
            items={[
              { title: "Look things up", body: "Pull the real numbers rather than asking you for them." },
              { title: "Act on your behalf", body: "File the ticket, update the record, post the summary." },
            ]}
          />
        </div>
      </Section>

      <Section title="Connecting something" intro="You'll be taken to the tool's own sign-in page to approve access.">
        <Prose>
          Add the tool, and TreOps works out how to authenticate with it. For most tools you approve access on
          their side, the way you would for any app — TreOps never asks you to paste a password.
        </Prose>
        <Prose>
          Once connected, TreOps asks the tool what it can do and remembers the answer. If the tool gains new
          abilities later, refresh it and they show up.
        </Prose>
      </Section>

      <Section title="Deciding who gets access" intro="Connecting a tool doesn't hand it to every agent.">
        <Prose>
          Access is per agent. You attach a connected tool to the specific agents that need it, which means a
          research agent can read your documents without also being able to post in your team chat.
        </Prose>
        <div className="mt-5">
          <Callout>
            Give each agent the narrowest access that lets it do its job. It&apos;s the same instinct you&apos;d
            apply to a new hire&apos;s permissions, and for the same reasons.
          </Callout>
        </div>
      </Section>

      <Section title="Turning access off" intro="Two ways, depending on how permanent you want it.">
        <Prose>
          Switch a tool off to take it away from every agent at once while keeping the setup — useful if
          something looks wrong and you want to stop it now and think later. Or disconnect it properly, which
          revokes the access TreOps was granted.
        </Prose>
        <Prose>
          Detaching a tool from one agent leaves it available to the others. See <Term>Access & permissions</Term>{" "}
          for how credentials are stored.
        </Prose>
      </Section>
    </>
  );
}
