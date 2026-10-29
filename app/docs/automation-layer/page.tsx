import type { Metadata } from "next";
import { AutomationDiagram } from "@/components/docs/diagrams/tech-layers";
import { Code, Figure, Prose, RefTable, Section } from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "Automation layer",
  description: "Flows, schedules and channels, plus the event-driven starts and watchdogs that keep work moving without clicks.",
};

export default function AutomationLayerPage() {
  return (
    <>
      <Section
        title="Flows"
        intro="A flow is a procedure with fixed steps. Where a story run is governed and open-ended, a flow is repeatable and bounded."
      >
        <Figure caption="Two lanes: flows that run on a trigger, and work that starts when its blockers finish.">
          <AutomationDiagram />
        </Figure>
        <div className="mt-5">
          <RefTable
            headers={["Part", "Detail"]}
            rows={[
              ["Triggers", "Manual, or a schedule: hourly, daily, weekdays or weekly at a wall-clock time in the author’s timezone, stored in UTC so daylight saving does not shift it."],
              ["Steps", <span key="steps">Typed steps: <Code>input.text</Code>, <Code>input.file</Code>, <Code>ai.general_knowledge</Code> (optionally run as a named agent), <Code>ai.web_search</Code>, <Code>ai.research</Code>, <Code>ai.ui_agent</Code>, <Code>data.workspace</Code>, <Code>action.mcp</Code>, <Code>logic.reasoning_group</Code> and <Code>logic.approval</Code>, which pauses the run as awaiting_approval until its author approves or rejects.</span>],
              ["Model per step", "A tier (fast, balanced, smart) or “same as the agent”, resolved by the daemon at dispatch."],
              ["Routing", "Each step’s task gets its runtime through resolve_task_runtime. Scheduled runs are unattended, so they use the workspace runtime."],
              ["Delivery", "A finished run is delivered once to a story, a Slack incoming webhook (stored encrypted), or members’ email. Never to typed addresses."],
            ]}
          />
        </div>
      </Section>

      <Section title="Event-driven work" intro="The other half of automation needs no author at all.">
        <Prose>
          When a blocking story finishes, the dependency scanner finds every unblocked story that is waiting to
          run and calls <Code>StoryService.start_work</Code>. It never writes <Code>status</Code> itself, because
          start_work is the only way work starts. Under project autonomy <Code>act_and_tell</Code>, a story with
          no assignee or reviewer gets one picked deterministically and the reason is recorded.
        </Prose>
      </Section>

      <Section title="Watchdogs" intro="Things a dead daemon cannot report, so something else has to notice.">
        <RefTable
          headers={["Stall", "What the watchdog does"]}
          rows={[
            ["Parked run: expects an agent, but its task is missing or finished", "Records a system risk, waits on the Assistant, and wakes it."],
            ["Hung task: pending, dispatched or running far too long", "Fails it through TaskService.fail_task, so the normal failure hook (retry, runtime wait, recovery) fires."],
            ["Unanswered Assistant past the timeout", "Forwards the run to a person."],
            ["Run waiting on a runtime that is healthy again", "Retries it; a heartbeat transition would never fire for a runtime that never went offline."],
            ["Flow waiting on an offline runtime too long", "Marks the run interrupted."],
          ]}
        />
        <Prose className="mt-4">
          Runs waiting on a person are never touched. Runs waiting on a runtime that is still offline are left to
          the heartbeat that brings it back.
        </Prose>
      </Section>

      <Section title="Why it is safe to run twice">
        <Prose>
          The automation loop claims due schedules and pending deliveries with row-level locking that skips rows
          another process holds. Several backend processes can run it and no run starts, and no message is sent,
          twice. A schedule’s next time moves forward <em>before</em> the run starts, so a flow that cannot start
          never retries in a tight loop; the reason is stored for the editor to show.
        </Prose>
      </Section>
    </>
  );
}
