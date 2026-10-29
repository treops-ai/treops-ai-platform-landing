import type { Metadata } from "next";
import { VaultDiagram } from "@/components/docs/diagrams/tech-infra";
import { Callout, Code, Figure, Prose, RefTable, Section } from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "Vault & object storage",
  description: "Files and the object store behind them.",
};

export default function VaultStoragePage() {
  return (
    <>
      <Section
        title="Presigned flow"
        intro="Files live in an S3-compatible object store. Clients and agents never hold bucket credentials, only short-lived signed URLs."
      >
        <Figure caption="Reserve, upload straight to storage, finalize, link, download.">
          <VaultDiagram />
        </Figure>
        <Prose className="mt-5">
          Reserving creates the vault row and returns a presigned PUT. After the upload the client calls finalize,
          and the backend confirms the object exists and records its size. Downloads use a fresh presigned GET of
          about sixty seconds with <Code>Content-Disposition: attachment</Code>, because a download link cannot
          carry auth headers.
        </Prose>
      </Section>

      <Section title="What a file is linked to">
        <RefTable
          headers={["Link", "Purpose"]}
          rows={[
            [<Code key="1">workspace_id</Code>, "Always set. The tenancy boundary."],
            [<Code key="2">project_id, story_id</Code>, "Scopes the file; deleting either leaves the file with the link cleared."],
            [<Code key="3">comment_id, chat_message_id</Code>, "Attachments on a comment or a chat reply."],
            [<Code key="4">task_id</Code>, "The agent task that uploaded it, so a chat turn can claim what it produced onto its reply."],
            [<Code key="5">s3_key, size_bytes, content_type</Code>, "Where it is, how big, and what it is. Content type drives the category shown in the listing."],
          ]}
        />
        <Prose className="mt-4">
          A workspace has a quota of 5 GB. Agents hand a person a file with the same flow as story comments:{" "}
          <Code>attachment_create</Code>, then <Code>curl -T</Code> to the presigned URL, then{" "}
          <Code>attachment_finalize</Code>. There is no chat “post” tool: finalized files from a chat-linked live
          task attach to the reply when the turn completes.
        </Prose>
      </Section>

      <Section
        title="Vault and knowledge"
        intro="The vault stores bytes; the knowledge layer makes some of them searchable."
      >
        <RefTable
          headers={["", "Vault", "Knowledge"]}
          rows={[
            ["Holds", "The original file", "Chunks, embeddings, entities and edges derived from it"],
            ["Access", "Presigned URL", "knowledge_search over MCP, read-only for agents"],
            ["Scope", "Workspace, with optional project and story links", "Workspace documents plus the current task’s project"],
            ["Deletion", "Removes the object", "Re-index replaces facts; deleting chunks cascades away edges and mentions"],
          ]}
        />
        <div className="mt-5">
          <Callout>
            The agent sandbox’s network allowlist includes the object store’s host so the upload can run. If the
            store is local, loopback binding is allowed; nothing else is opened for the agent.
          </Callout>
        </div>
      </Section>
    </>
  );
}
