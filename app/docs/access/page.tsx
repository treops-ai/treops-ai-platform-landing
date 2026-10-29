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
  title: "Access & permissions",
  description:
    "Who can see what, what an agent is allowed to touch, and why an agent can't quietly grant itself more room.",
};

export default function AccessPage() {
  return (
    <>
      <Callout>
        Every request is checked by the backend — from the web app, from the command line, and from an agent. No
        other part of the system is trusted to make that decision.
      </Callout>

      <Section title="People and roles" intro="A workspace is the outer boundary. Nothing crosses it.">
        <RefTable
          headers={["Role", "Can"]}
          rows={[
            ["Owner / admin", "Everything, including members, agents, machines, and workspace settings."],
            ["Member", "Work on projects and cards, run agents, approve work."],
            ["Agent", "A restricted role — see below. Never passes an admin check."],
          ]}
        />
        <Prose className="mt-5">
          People can belong to several workspaces and switch between them; data never moves between them.
        </Prose>
      </Section>

      <Section title="What an agent can reach" intro="Deliberately narrow, and enforced rather than requested.">
        <RefTable
          headers={["Area", "What an agent may do"]}
          rows={[
            ["Projects", "Work on projects it manages. It cannot create, delete, or archive one."],
            ["Cards & comments", "Normal read and write, within its own workspace."],
            ["Workspace settings", "Read only. No changes to settings, members, or billing."],
            ["Agents & machines", "Nothing. It cannot add, change, or reconfigure any agent, including itself."],
            ["Finishing work", "Cannot mark work done while a criterion you accepted is unchecked."],
          ]}
        />
        <Prose className="mt-5">
          Agents are shown a tool list tailored to the job in front of them. That&apos;s for usability — it is not
          the thing keeping them in bounds. A call to a tool an agent shouldn&apos;t use is refused by the backend
          regardless of whether the agent could see it.
        </Prose>
      </Section>

      <Section title="Credentials" intro="Three different kinds of secret, handled three different ways.">
        <RefTable
          headers={["Secret", "Where it lives"]}
          rows={[
            ["Model provider keys", "The backend's environment file. Never in the database, never in the app."],
            ["Connected tool access", "Encrypted in the database, handed to an agent only as it starts a piece of work."],
            ["Machine credentials", "Scoped to one workspace and one machine, and expire on a rolling window."],
          ]}
        />
        <Prose className="mt-5">
          A machine can only act as the agents that actually run on it. Without that rule, one machine could
          impersonate every agent in the workspace — and picking up work hands over that agent&apos;s tool
          access. See <Term>Where agents run</Term>.
        </Prose>
        <div className="mt-5">
          <Callout>
            Uploaded files are document storage, not a secrets store. Credentials don&apos;t belong there.
          </Callout>
        </div>
      </Section>

      <Section title="What we guarantee">
        <CheckList
          items={[
            "An agent is confined to one workspace and cannot see another.",
            "An agent only manages the projects it has been given.",
            "A machine can only act as the agents that run on it.",
            "Tool credentials are encrypted at rest and released only when work starts.",
            "Model keys never reach the database or the app.",
            "Every approval is recorded against a real person's account.",
            "Nothing is marked done while an accepted criterion is unchecked.",
          ]}
        />
      </Section>
    </>
  );
}
