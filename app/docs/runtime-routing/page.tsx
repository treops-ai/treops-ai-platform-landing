import type { Metadata } from "next";
import { RuntimeRoutingDiagram } from "@/components/docs/diagrams/tech-system";
import { Callout, Code, Figure, Prose, RefTable, Section } from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "Runtime routing",
  description: "Where a task runs, the kinds of runtime, and what happens when one is offline.",
};

export default function RuntimeRoutingPage() {
  return (
    <>
      <Section
        title="Choosing a runtime"
        intro="Runtimes belong to tasks, not agents. Every path that creates a task sets task.runtime_id first."
      >
        <Figure caption="resolve_task_runtime and route_session in runtimes/routing.py.">
          <RuntimeRoutingDiagram />
        </Figure>
        <Prose className="mt-5">
          Pass <Code>requester_id</Code> only for person-started work: agent chat, planning, team preview and
          manual flow runs. Unattended work (a scheduled flow, a dependency that cleared) uses the workspace
          runtime. Claims, pushes, billing and daemon authorization all read <Code>task.runtime_id</Code>.
        </Prose>
      </Section>

      <Section title="Kinds of runtime">
        <RefTable
          headers={["Kind", "Where", "Notes"]}
          rows={[
            ["User machine", "A daemon you run", "Session token lasts 30 days. Can point agents at a reachable MCP URL with mcp_url or TREOPS_DAEMON_MCP_URL."],
            ["Hosted", "A container managed by the supervisor", "Token lasts 24 hours. The image bakes in cli/ and shared/."],
            ["Platform", "One hosted runtime per workspace, created lazily", "Runs the Assistant only. Metered by a monthly allowance; when spent, the turn is refused with 409."],
          ]}
        />
        <Prose className="mt-4">
          The Assistant also gets a browser: one Chromium per assistant thread, behind an egress guard that
          allows public addresses only. Frames stream to the web pane over a WebSocket and never touch the event
          bus.
        </Prose>
      </Section>

      <Section title="Failures and waiting">
        <RefTable
          headers={["Situation", "What happens"]}
          rows={[
            ["Runtime offline when a flow step is due", "The run waits and continues when the runtime connects; it becomes interrupted after a timeout."],
            ["Infrastructure error in a story run", "is_infra_error classifies OAuth revoked, quota and network errors. The run waits on the runtime and resumes when healthy; no rework round is spent."],
            ["Assistant allowance spent", "admit_assistant_turn notifies owners and refuses the turn."],
            ["Stale hosted image", "Agents keep running the old daemon until the image is rebuilt and the runtime restarted."],
          ]}
        />
        <div className="mt-5">
          <Callout>
            The Assistant is never moved to a user’s machine. Without a platform Claude seat there is no
            assistant; no other agent stands in.
          </Callout>
        </div>
      </Section>
    </>
  );
}
