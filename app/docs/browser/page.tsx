import type { Metadata } from "next";
import { BrowserDiagram } from "@/components/docs/diagrams/tech-infra";
import { Code, Figure, Prose, RefTable, Section } from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "Assistant browser",
  description: "A real Chromium the Assistant drives and a person can watch and steer, per assistant thread.",
};

export default function BrowserPage() {
  return (
    <>
      <Section
        title="Shape"
        intro="The assistant drives a real headless Chromium through the Playwright MCP server. The person watches the same browser live and can click, type and navigate in it."
      >
        <Figure caption="Nothing runs in the person’s own browser except a canvas showing frames.">
          <BrowserDiagram />
        </Figure>
        <div className="mt-5">
          <RefTable
            headers={["Property", "Value"]}
            rows={[
              ["Where", "Inside the platform hosted runtime, because the Assistant runs only there."],
              ["Scope", "One browser per assistant thread, launched lazily on the first MCP connection or first viewer."],
              ["Viewport", "Fixed 1280×800 CSS px at device pixel ratio 1; the pane letterboxes and maps pointer coordinates back."],
              ["Capacity", "At most 2 browsers per daemon in the hosted image; a third evicts the least recently used idle one."],
              ["Idle", "Closed after 900 seconds with no viewer and no running turn, and its profile directory is wiped."],
              ["Authority", "The viewer must own the thread: close codes 4001 unauthenticated, 4003 not a member, 4004 not your thread."],
            ]}
          />
        </div>
      </Section>

      <Section
        title="Two ways in"
        intro="The same Chromium serves the agent and the person, over different channels."
      >
        <RefTable
          headers={["Path", "Channel", "Used for"]}
          rows={[
            ["Agent", "Claude CLI → Playwright MCP → a CDP broker on loopback → Chromium", "Navigation, clicking, reading pages."],
            ["Daemon", "CDP: screencast, input, cookies", "Streaming frames and applying the person’s input."],
            ["Person", "Browser pane ← hub ← runtime socket ← daemon", "Watching, and taking control."],
            ["Cheap browse", "The browse MCP: read, and a pilot loop", "Fetching text or running steps on the platform’s own model key, without a full browser turn."],
          ]}
        />
        <Prose className="mt-4">
          Frames are base64 JPEGs on the existing runtime socket. They never ride the event bus and are never
          stored. When the platform runtime is offline the viewer keeps its socket and gets an{" "}
          <Code>offline</Code> state, then a fresh one on reconnect.
        </Prose>
      </Section>

      <Section
        title="Control protocol"
        intro="A small set of actions, validated by the daemon. Everything else is refused."
      >
        <RefTable
          headers={["Action", "Notes"]}
          rows={[
            [<Code key="1">navigate</Code>, "http(s) only, plus back, forward, reload, stop."],
            [<Code key="2">new_tab, select_tab, close_tab</Code>, "The view follows a tab the agent opens; the person can pick another."],
            [<Code key="3">mouse</Code>, "Move, down, up, wheel, in viewport coordinates, with a CDP modifier mask."],
            [<Code key="4">key, text</Code>, "Key events, and paste or IME commit as inserted text."],
          ]}
        />
        <Prose className="mt-4">
          State frames report status (<Code>starting</Code>, <Code>ready</Code>, <Code>closed</Code>,{" "}
          <Code>unavailable</Code>, <Code>error</Code>), the open tabs, navigation flags, and whether an
          assistant turn is currently driving it.
        </Prose>
      </Section>

      <Section
        title="Staying signed in"
        intro="The profile directory dies with the browser; what survives is the member’s cookies, kept by the backend. The Secrets page covers the encryption."
      >
        <Prose>
          On launch the daemon asks the backend for the member’s jar and applies it; while running it pushes
          changes every 30 seconds and once more on close. If the backend does not answer within five seconds
          the browser simply starts signed out and saves nothing. The assistant is told to ask the person to
          sign in rather than handle credentials itself.
        </Prose>
      </Section>
    </>
  );
}
