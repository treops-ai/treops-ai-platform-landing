import type { Metadata } from "next";
import { DecisionStepDiagram, DualProcessDiagram, PilotOutcomesDiagram } from "@/components/docs/diagrams/tech-pilot";
import { Callout, Code, Figure, Prose, RefTable, Section, Term } from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "System 1 and System 2",
  description: "A slow reasoning model owns the goal; a fast decision model takes one constrained step at a time.",
};

export default function SystemOnePage() {
  return (
    <>
      <Callout>
        “System 1” and “System 2” are a framing, borrowed from dual-process theory. The code calls the fast side
        the <Term>browser pilot</Term>. Today it drives the Assistant’s browser only; the pattern is general, and
        the last section says where it is not applied.
      </Callout>

      <Section
        title="Two systems, one browser"
        intro="Reasoning is expensive and slow. Clicking through a page is neither, so each system gets the job it is good at."
      >
        <Figure caption="System 2 states the goal. System 1 spends one cheap decision per step. Results flow back up.">
          <DualProcessDiagram />
        </Figure>
        <div className="mt-5">
          <RefTable
            headers={["", "System 2 · deliberate", "System 1 · fast"]}
            rows={[
              ["Who", "The Assistant, running Claude on the platform runtime", "The pilot loop in the daemon, with a decision model in the backend"],
              ["Job", "Understand the request, choose tools, handle surprises, answer the person", "Carry out one plain-language goal on the page in front of it"],
              ["Unit of work", "A whole turn", "One step: pick an operation, pick a control"],
              ["Output", "Free-form reasoning and text", "A choice from a closed list, with a confidence"],
              ["Cost", "A full model turn, plus page snapshots", "One short request per step"],
              ["Entry point", <Code key="1">browse.run(goal)</Code>, "The pilot loop"],
            ]}
          />
        </div>
      </Section>

      <Section
        title="One step, in detail"
        intro="Every step is the same six moves. The model never sees the browser, only a description of what is on screen."
      >
        <Figure caption="The decision model chooses among things it was shown; it cannot invent a target.">
          <DecisionStepDiagram />
        </Figure>
        <Prose className="mt-5">
          The daemon observes the page and numbers every usable control. The backend turns that into a short set
          of multiple-choice questions: which operation next (only those the page allows), and which control id
          that operation should use. One call to OpenAI’s <Code>/v1/decisions</Code> answers all of them. The
          backend then drops anything that was not on offer before the daemon acts.
        </Prose>
        <div className="mt-4">
          <RefTable
            headers={["Operation", "Acts on", "Offered when"]}
            rows={[
              [<Code key="1">CLICK</Code>, "A clickable control", "The page has one"],
              [<Code key="2">TYPE_TEXT</Code>, "An editable field", "The page has one; the text is a separate request"],
              [<Code key="3">SELECT</Code>, "A choice inside a menu", "A menu has options"],
              [<Code key="4">PRESS_ENTER</Code>, "The field just typed into", "Right after typing"],
              [<Code key="5">SCROLL_DOWN, SCROLL_UP</Code>, "The page", "There is more in that direction"],
              [<Code key="6">GO_BACK, WAIT</Code>, "The tab", "History exists; or always"],
              [<Code key="7">DONE, BLOCKED</Code>, "The run", "Always"],
            ]}
          />
        </div>
      </Section>

      <Section
        title="Why a Decisions API"
        intro="A closed choice is cheaper, faster and safer than a free-form answer parsed back into an action."
      >
        <RefTable
          headers={["Property", "Effect"]}
          rows={[
            ["Multiple choice, not generation", "The answer is one of the offered values, so there is no selector, coordinate or URL to get wrong or to be talked into."],
            ["Control ids come from the observation", "A page cannot instruct the model to “visit this address”: navigation is not an operation, only clicking a control that exists."],
            ["Speculative targets", "One request asks for the operation and, in the same call, the target each operation would use. Only the chosen operation’s target is kept."],
            ["Confidence and refusal", "The model may decline or hedge. A refusal ends the run as blocked, which hands control back instead of guessing."],
            ["One cheap request per step", "The model sees a compact list of controls and a short text excerpt, not a full accessibility snapshot, so a 20-step goal stays inexpensive."],
          ]}
        />
        <Prose className="mt-4">
          The backend calls OpenAI over plain HTTP rather than through LangChain, because LangChain has no
          Decisions API and the decision call and the field-text call then share one client, one key and one set
          of usage accounting. Field text uses the Responses API with reasoning turned off, since copying a value
          out of the goal needs none.
        </Prose>
        <div className="mt-4">
          <Callout>
            This reduces prompt-injection risk; it does not remove it. A malicious page can still offer a harmful
            control. The egress guard, the step limit, the stall guard and the policy that blocks local schemes
            and downloads are what contain the damage.
          </Callout>
        </div>
      </Section>

      <Section
        title="Boundaries and budgets"
        intro="System 1 is cheap, so it is the one most likely to be left running. The limits are enforced in the backend."
      >
        <RefTable
          headers={["Control", "Rule"]}
          rows={[
            ["Who may call it", "Only the workspace Assistant’s own live chat turn, identified by the task id. Story agents, planning and flows are refused."],
            ["Where the key lives", "In the backend. The daemon never holds the OpenAI key."],
            ["Budget", "A monthly token cap per workspace (browser_pilot_monthly_tokens); over it, the call returns 429 and the run stops."],
            ["Billing", "Every call is recorded as task usage with provider and model, so cost appears beside the task’s other tokens."],
            ["Credentials", "Password fields are never a target. The pilot does not handle credentials; it stops and asks the person."],
            ["Model", "Set by browser_pilot_model; changing it is a configuration change, not a code change."],
            ["Failures", "A failed call is reported as an error to the Assistant. An unusable answer ends the run as blocked. Neither is ever turned into a guessed action."],
          ]}
        />
      </Section>

      <Section
        title="How a run ends"
        intro="Every run ends in one of three states, and System 2 decides what that means."
      >
        <Figure caption="DONE is a claim: the caller gets the final page text to check it.">
          <PilotOutcomesDiagram />
        </Figure>
      </Section>

      <Section title="Built, and not built">
        <RefTable
          headers={["Capability", "Status", "Note"]}
          rows={[
            ["Fast decision loop for the Assistant’s browser", "Built", "Needs the platform OpenAI key; without it the pilot is not offered."],
            ["Slow model delegating a goal and checking the result", "Built", "Through the browse MCP."],
            ["Per-workspace budget and per-call billing", "Built", "Monthly token cap."],
            ["A fast tier for story agents (triage, routing, simple edits)", "Not built", "Agents run one configured model; see the Reasoning layer."],
            ["Escalating from System 1 to System 2 automatically on low confidence", "Partly", "A refusal or a stall hands back; confidence is recorded but not used as a threshold."],
            ["Other providers behind the decision call", "Not built", "The service targets OpenAI’s Decisions API."],
          ]}
        />
      </Section>
    </>
  );
}
