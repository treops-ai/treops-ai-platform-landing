import type { Metadata } from "next";
import { IsolationDiagram } from "@/components/docs/diagrams/tech-infra";
import { Callout, Code, Figure, Prose, RefTable, Section } from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "Agent isolation",
  description: "The nested boundaries around an agent process, and where they end.",
};

export default function IsolationPage() {
  return (
    <>
      <Section
        title="Boundaries, outside in"
        intro="No single wall is trusted. Each ring assumes the one inside it failed."
      >
        <Figure caption="Four rings around the agent process, plus the browser, credentials and an honest limit.">
          <IsolationDiagram />
        </Figure>
        <div className="mt-5">
          <RefTable
            headers={["Ring", "Mechanism", "What it stops"]}
            rows={[
              ["Workspace", "workspace_id on every row; daemon tokens scoped to one workspace; queries filtered by it", "One tenant reading or acting on another"],
              ["Runtime / container", "Non-root user, memory, CPU and PID caps, no Docker socket, outbound-only", "A runaway or hostile task harming the host or its neighbours"],
              ["Task directory", "A per-task working directory and a git worktree for repositories", "One task trampling another’s files"],
              ["CLI sandbox", "The provider CLI’s bubblewrap sandbox, with a network allowlist of the API host and the object store", "Arbitrary shell commands reaching arbitrary hosts"],
            ]}
          />
        </div>
      </Section>

      <Section title="What each agent can reach" intro="Identity, not network position, decides what an agent may touch.">
        <RefTable
          headers={["Resource", "Rule"]}
          rows={[
            ["Projects", "Writes are pinned to the project of the task in X-Task-ID. Only the Assistant reads or manages beyond it."],
            ["MCP credentials", "Per agent. A claim returns an agent’s decrypted credentials only to a runtime holding a live task of that agent."],
            ["Other agents’ tasks", "A runtime reports only on tasks routed to it."],
            ["Admin operations", "Blocked for the daemon role."],
            ["Files", "Presigned URLs only; no bucket credentials reach the sandbox."],
            ["The network", "Sandbox allowlist for the CLI; an egress guard for the browser."],
          ]}
        />
      </Section>

      <Section
        title="Browser isolation"
        intro="The browser is the riskiest tool because it reaches arbitrary pages and a member can take control of it."
      >
        <RefTable
          headers={["Control", "Detail"]}
          rows={[
            ["Egress guard", "Chromium’s only route out is an in-daemon proxy. It resolves each host once, keeps only globally routable addresses, and connects to the vetted IP, so DNS cannot change between check and connect."],
            ["Blocks", "Loopback, private ranges, shared address space, link-local, and NAT64-embedded private addresses. The browser cannot reach the host network, the backend’s private services, or its own debugging port."],
            ["Local schemes", "file:, chrome:, devtools: and view-source: are blocked by policy, and the daemon refuses non-http(s) navigation."],
            ["Downloads and pickers", "Disabled, so a member in control cannot exfiltrate the container’s files."],
            ["Password manager and autofill", "Disabled, along with sync and extensions."],
            ["Lifetime", "One browser per assistant thread; idle ones close and their profile directory is wiped."],
          ]}
        />
        <div className="mt-5">
          <Callout>
            <Code>DeveloperToolsAvailability</Code> is deliberately not set in the Chromium policy. It also
            refuses CDP attach, which is how the daemon and the Playwright MCP server drive the browser.
          </Callout>
        </div>
      </Section>

      <Section title="Where isolation ends" intro="Stated plainly, because a boundary you misjudge is worse than none.">
        <RefTable
          headers={["Limit", "Consequence"]}
          rows={[
            ["Containers share the host kernel", "This is container isolation, not VM isolation. A kernel escape defeats it."],
            ["Tasks in one container share a user", "They are separated by directories and the CLI sandbox, not by operating-system users."],
            ["Chromium runs without its own sandbox in the hosted image", "The container is the boundary, which is why the egress guard and policy matter."],
            ["The CLI sandbox needs user namespaces", "Whether it engages depends on the host. Verify after deploying; the CLI says so on every task when it does not."],
            ["Bring-your-own runtimes", "Isolation is whatever your machine provides. TreOps authorizes at the API, not on your disk."],
            ["Task credentials are plaintext in the task directory", "They are written to .mcp.json for the CLI to read. The directory is per task and pruned, but readable by anything running as that user."],
          ]}
        />
        <Prose className="mt-4">
          One platform runtime serves one workspace, so the Assistant’s container is never shared across
          tenants. Within that workspace its members share the container, which is why each member’s browser
          cookies are kept in the backend per member and not on the container’s disk.
        </Prose>
      </Section>
    </>
  );
}
