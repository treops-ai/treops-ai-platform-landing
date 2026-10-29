import { Arrow, Diagram, Group, Label, Line, Node, Step } from "./tech-svg";

/** System 2 plans and owns the goal; System 1 executes it one cheap decision at a time. */
export function DualProcessDiagram() {
  return (
    <Diagram width={960} height={372} minWidth={800} legend>
      <Group x={10} y={14} w={270} h={310} label="SYSTEM 2 · DELIBERATE" />
      <Node x={28} y={48} w={234} h={66} title="Assistant" sub={["Claude, on the platform runtime", "plans, reasons, owns the goal"]} tone="primary" />
      <Node x={28} y={138} w={234} h={56} title="browse MCP" sub="run(goal) · read()" />
      <Node x={28} y={226} w={234} h={64} title="Full page snapshot" sub={["expensive path: the model", "reads every element itself"]} dashed />
      <Line x1={145} y1={114} x2={145} y2={136} />
      <Line x1={145} y1={194} x2={145} y2={224} dashed />

      <Group x={330} y={14} w={330} h={310} label="SYSTEM 1 · FAST  (daemon)" />
      <Node x={348} y={48} w={294} h={66} title="Pilot loop" sub={["observe → decide → act", "≤ 20 steps · 150 s · stall guards"]} tone="primary" />
      <Node x={348} y={138} w={140} h={56} title="Observe" sub="controls with ids" />
      <Node x={502} y={138} w={140} h={56} title="Act" sub="trusted CDP input" />
      <Node x={348} y={226} w={294} h={64} title="Chromium tab" sub={["the same tab the person", "watches in the pane"]} />
      <Line x1={418} y1={114} x2={418} y2={136} both />
      <Line x1={572} y1={114} x2={572} y2={136} />
      <Line x1={418} y1={194} x2={418} y2={224} />
      <Line x1={572} y1={194} x2={572} y2={224} />

      <Group x={710} y={14} w={240} h={310} label="BACKEND" />
      <Node x={728} y={48} w={204} h={66} title="Admit" sub={["assistant turn only", "monthly token budget"]} />
      <Node x={728} y={138} w={204} h={72} title="Decisions call" sub={["OpenAI /v1/decisions", "one request per step"]} tone="primary" />
      <Node x={728} y={234} w={204} h={56} title="Bill the task" sub="TaskUsage per call" />
      <Line x1={830} y1={114} x2={830} y2={136} />
      <Line x1={830} y1={210} x2={830} y2={232} />

      <Arrow d="M 262 152 L 304 152 L 304 74 L 346 74" />
      <Label x={283} y={143} size={10.5}>goal</Label>
      <Arrow d="M 348 104 L 326 104 L 326 182 L 264 182" dashed />
      <Label x={295} y={199} size={10.5}>result</Label>
      <Arrow d="M 642 82 L 726 82" />
      <Label x={684} y={74} size={10.5}>page state</Label>
      <Arrow d="M 726 176 L 668 176 L 668 100 L 644 100" dashed />
      <Label x={697} y={168} size={10.5}>decision</Label>

      <Label x={10} y={350} anchor="start" size={11}>Hand-back to System 2 on: BLOCKED (sign-in, CAPTCHA, payment, upload, missing details), a stall, a step or time limit, or DONE, which is a claim to verify.</Label>
    </Diagram>
  );
}

/** One decision step, in order. */
export function DecisionStepDiagram() {
  const W = 290;
  const H = 118;
  return (
    <Diagram width={960} height={330} minWidth={800}>
      <Node x={10} y={20} w={W} h={H} title="Observe" sub={["daemon", "url · title · scroll position", "up to 150 controls, each with an id", "4 000 characters of visible text"]} />
      <Node x={335} y={20} w={W} h={H} title="Ask" sub={["backend", "Q1: which operation? Only the", "ones this page allows", "Q2: which control id?"]} />
      <Node x={660} y={20} w={W} h={H} title="Decide" sub={["OpenAI Decisions API", "one request, several questions", "answers carry a confidence", "a refusal is allowed"]} tone="primary" />
      <Node x={660} y={192} w={W} h={H} title="Validate" sub={["backend", "anything not offered is dropped", "a lone candidate is the answer", "no selectors, URLs or coordinates"]} tone="danger" />
      <Node x={335} y={192} w={W} h={H} title="Act" sub={["daemon", "real mouse and key events over CDP", "at the control's current position", "typed text is a separate request"]} />
      <Node x={10} y={192} w={W} h={H} title="Re-observe" sub={["daemon", "fingerprint before vs after", "3 unchanged steps stop the run", "history feeds the next step"]} />

      <Line x1={300} y1={79} x2={333} y2={79} />
      <Line x1={625} y1={79} x2={658} y2={79} />
      <Line x1={805} y1={138} x2={805} y2={190} />
      <Line x1={660} y1={251} x2={627} y2={251} />
      <Line x1={335} y1={251} x2={302} y2={251} />
      <Arrow d="M 155 192 L 155 165 L 155 140" dashed />
      <Label x={166} y={170} anchor="start" size={10.5}>next step</Label>

      <Step x={22} y={32} n={1} />
      <Step x={347} y={32} n={2} />
      <Step x={672} y={32} n={3} />
      <Step x={672} y={204} n={4} />
      <Step x={347} y={204} n={5} />
      <Step x={22} y={204} n={6} />
    </Diagram>
  );
}

/** How a pilot run ends, and who decides what happens next. */
export function PilotOutcomesDiagram() {
  return (
    <Diagram width={960} height={310} minWidth={800}>
      <Node x={10} y={96} w={190} h={96} title="Pilot loop" sub={["one decision", "per step"]} tone="primary" />

      <Node x={290} y={14} w={330} h={78} title="DONE" sub={["the page appears to satisfy the goal", "a claim, not proof: final text returned"]} tone="success" />
      <Node x={290} y={108} w={330} h={78} title="BLOCKED" sub={["needs the person: sign-in, CAPTCHA,", "payment, upload, or missing details"]} tone="danger" />
      <Node x={290} y={202} w={330} h={92} title="STOPPED" sub={["20 steps (40 at most) · 150 seconds", "3 unchanged actions in a row", "2 unusable decisions in a row"]} dashed />
      <Arrow d="M 200 130 L 245 130 L 245 53 L 288 53" />
      <Arrow d="M 200 147 L 288 147" />
      <Arrow d="M 200 158 L 245 158 L 245 248 L 288 248" />

      <Node x={720} y={80} w={230} h={130} title="System 2 decides" sub={["verify the page text", "retry with a clearer goal", "take over with full reasoning", "or ask the person"]} tone="primary" />
      <Line x1={620} y1={53} x2={718} y2={120} />
      <Line x1={620} y1={147} x2={718} y2={147} />
      <Line x1={620} y1={248} x2={718} y2={180} />
    </Diagram>
  );
}
