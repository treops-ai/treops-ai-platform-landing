import type { Metadata } from "next";
import { ArchitectureDiagram } from "@/components/docs/diagrams/architecture";
import {
  Callout,
  CardGrid,
  Code,
  CodeBlock,
  Figure,
  Prose,
  Section,
} from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "Install & run",
  description:
    "TreOps runs on your own machines. This section is for whoever sets it up and keeps it running.",
};

export default function InstallPage() {
  return (
    <>
      <Callout>
        This section is for whoever operates TreOps. If you&apos;re here to use it, nothing in Self-hosting is
        required reading.
      </Callout>

      <Section title="What you need">
        <Prose>
          Python 3.12+ with <Code>uv</Code>, Node 20+ with <Code>pnpm</Code>, and Docker — used for PostgreSQL and
          object storage. Plus an API key for at least one model provider.
        </Prose>
      </Section>

      <Section title="Getting it running" intro="Two commands from a fresh clone.">
        <CodeBlock
          code={`git clone https://github.com/treops-ai/treops-ai-platform.git
cd treops-ai-platform

# install dependencies, create .env, start the database, run migrations
make setup

# start everything
make start`}
        />
        <Prose className="mt-4">
          Open <Code>http://localhost:3000</Code>. Add your model provider keys to <Code>.env</Code> and restart —
          see <Code>.env.example</Code>. <Code>make help</Code> lists every target, including starting each piece
          on its own.
        </Prose>
      </Section>

      <Section title="How the pieces fit" intro="Four processes, one database, and whatever machines your agents run on.">
        <Figure caption="Everything goes through the backend, which is where all permission checks happen.">
          <ArchitectureDiagram />
        </Figure>
        <Prose className="mt-5">
          The web app is what people use. The backend holds the data and enforces every rule. The MCP service
          gives agents their tools. The daemon runs on each agent machine, prepares each task&apos;s environment,
          and calls the model provider.
        </Prose>
      </Section>

      <Section title="Where your data lives" intro="On your infrastructure. Nothing leaves it except calls to your model provider.">
        <CardGrid
          columns={2}
          items={[
            {
              title: "PostgreSQL",
              body: "Projects, cards, criteria, history, and document indexes — in your own database.",
            },
            {
              title: "Object storage",
              body: "Uploaded files, attachments, and agent artifacts, in a MinIO or S3-compatible bucket you control.",
            },
          ]}
        />
      </Section>
    </>
  );
}
