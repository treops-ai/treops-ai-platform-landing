import type { Metadata } from "next";
import { Callout, Code, CodeBlock, Prose, Section, Term } from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "Adding machines",
  description:
    "Registering a machine so agents can run on it, claiming hosted compute, and keeping an eye on cost.",
};

export default function MachinesPage() {
  return (
    <>
      <Callout>
        For what a machine <Term>is</Term> and how to choose between the options, see <Term>Runtimes</Term>. This
        page is the operator&apos;s side.
      </Callout>

      <Section title="Adding a machine" intro="Register it against a workspace, then start the daemon on it.">
        <CodeBlock
          code={`cd cli && uv sync
uv run treops auth login

# let this machine run work for a workspace
uv run treops workspace watch <workspace-id>
uv run treops daemon start
uv run treops daemon status`}
        />
        <Prose className="mt-4">
          It shows as online once it checks in. If it stops, work assigned to its agents waits rather than
          failing. <Code>treops daemon logs</Code> is the first place to look.
        </Prose>
      </Section>

      <Section title="Free hosted compute" intro="A starter budget of platform-hosted runtime.">
        <Prose>
          Claim it once and hosted agents run against it. When it runs out you&apos;re notified, and hosted agents
          stop taking new work until you extend it or move them onto your own hardware.
        </Prose>
        <Prose>
          Agents on your own machines are unaffected — they use your hardware and your model keys, so none of this
          applies to them.
        </Prose>
      </Section>

      <Section title="Keeping an eye on cost" intro="Usage is tracked per machine and per piece of work.">
        <Prose>
          It rolls up to stories, projects, and agents, so you can answer both &ldquo;what is this machine costing
          me&rdquo; and &ldquo;what did that piece of work cost&rdquo;. Charts appear on the story and project
          pages.
        </Prose>
        <div className="mt-4">
          <CodeBlock code={`treops runtime list\ntreops runtime usage <runtime-id>\ntreops runtime activity <runtime-id>`} />
        </div>
        <div className="mt-5">
          <Callout>
            Hosted machines run a Docker image built from this repo. After changing anything under{" "}
            <Code>cli/</Code>, rebuild the image and restart the machine, or hosted agents keep running the old
            code. Production deploys rebuild automatically; local development does not.
          </Callout>
        </div>
      </Section>
    </>
  );
}
