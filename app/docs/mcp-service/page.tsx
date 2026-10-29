import type { Metadata } from "next";
import { McpDiagram } from "@/components/docs/diagrams/tech-system";
import { Callout, Code, Figure, Prose, RefTable, Section } from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "MCP service",
  description: "The thin proxy agents use for every action, and how it decides which tools they see.",
};

export default function McpServicePage() {
  return (
    <>
      <Section
        title="Visibility pipeline"
        intro="Agent-facing capabilities are MCP tools, never CLI commands. The service lists only the tools a call is allowed to see."
      >
        <Figure caption="Permission is the intersection of mode, role and actor, then capabilities map to tools.">
          <McpDiagram />
        </Figure>
        <div className="mt-5">
          <RefTable
            headers={["Header", "Says"]}
            rows={[
              [<Code key="1">X-Task-Mode</Code>, "The activity: chat, planning, story_assignment, flow, …"],
              [<Code key="2">X-Project-Role</Code>, "member or the project’s manager."],
              [<Code key="3">X-Actor-Kind</Code>, "agent, human or system."],
              [<Code key="4">X-Loop-Kind</Code>, "work, check, answer or coordinate, for story-run tasks."],
            ]}
          />
        </div>
        <Prose className="mt-4">
          Tool families live in <Code>backend/mcp_service/tools_*.py</Code>: stories, projects, milestones,
          comments, tags, workspace, coordination, run tools, run coordination (Assistant only), planning,
          board, PM, knowledge, memory and vault.
        </Prose>
      </Section>

      <Section title="Fail modes">
        <RefTable
          headers={["Situation", "Result", "Why"]}
          rows={[
            ["Missing mode header", "Every tool is listed", "Fails open so dev clients work."],
            ["Unknown mode", "No tools", "Fails closed."],
            ["Mode forbidden for the role or actor", "No tools", "Fails closed."],
            ["Planning mode", "Create tools replaced by planning_draft_set", "Agents propose; the user creates."],
          ]}
        />
        <div className="mt-5">
          <Callout>
            Visibility is UX, never a security boundary. The service forwards <Code>Authorization</Code> and{" "}
            <Code>X-Agent-ID</Code>, and the backend authorizes every call as if the tool list did not exist.
          </Callout>
        </div>
      </Section>

      <Section title="Adding a tool">
        <RefTable
          headers={["Step", "Where"]}
          rows={[
            ["1. Write the handler, mirroring tools_stories.py", <Code key="1">mcp_service/tools_*.py</Code>],
            ["2. Map a capability for it", <Code key="2">mcp_service/modes.py</Code>],
            ["3. Grant it to a mode policy, and to a role or actor ceiling if it is new authority", <Code key="3">modes.py</Code>],
            ["4. Import enums from app.core.enums; never duplicate literals", <Code key="4">app/core/enums.py</Code>],
            ["5. Add contract and proxy tests", <Code key="5">tests/test_mcp_service/</Code>],
          ]}
        />
        <Prose className="mt-4">
          <Code>test_modes.py</Code> fails if a registered tool has no capability, or a capability is not
          reachable from any mode.
        </Prose>
      </Section>
    </>
  );
}
