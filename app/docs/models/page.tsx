import type { Metadata } from "next";
import {
  Callout,
  Code,
  CodeBlock,
  Prose,
  RefTable,
  Section,
} from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "Models & keys",
  description:
    "TreOps doesn't sell you model usage — you bring your own keys, and you choose which model backs each agent.",
};

export default function ModelsPage() {
  return (
    <>
      <Section title="Bring your own keys" intro="TreOps is not a model provider and never proxies your calls through anyone else.">
        <RefTable
          headers={["Provider", "Set on an agent as"]}
          rows={[
            ["Anthropic Claude", <Code key="k1">claude</Code>],
            ["Google Gemini", <Code key="k2">gemini</Code>],
          ]}
        />
        <Prose className="mt-5">
          The daemon on each agent machine calls the provider directly. Model usage is billed to you by the
          provider, on your own account.
        </Prose>
      </Section>

      <Section title="Choosing a model per agent" intro="The model is a property of the agent, not of the workspace.">
        <Prose>
          One workspace can mix freely: a fast, cheap model for triage and summarising, a stronger one for work
          that needs care. Changing an agent&apos;s model takes effect on its next piece of work.
        </Prose>
        <div className="mt-4">
          <CodeBlock code={`treops agent update <agent-id> --provider gemini`} />
        </div>
      </Section>

      <Section title="Keeping keys safe" intro="Keys live in the backend environment and nowhere else.">
        <Prose>
          Put them in <Code>.env</Code> and restart the backend. They are never written to the database, never
          stored as workspace data, never exposed through the API, and never visible in the app.
        </Prose>
        <div className="mt-5">
          <Callout>
            For agents on your own hardware, the provider&apos;s own CLI on that machine also needs to be signed
            in — the daemon runs it as a subprocess.
          </Callout>
        </div>
      </Section>
    </>
  );
}
