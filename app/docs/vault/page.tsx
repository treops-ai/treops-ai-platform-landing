import type { Metadata } from "next";
import { FileJourneyDiagram } from "@/components/docs/diagrams/file-journey";
import {
  RepositoryDemo,
  VaultDemo,
  VaultScopeDemo,
} from "@/components/docs/demos/setup-demos";
import { GoodBad } from "@/components/docs/demos/example-demos";
import {
  Callout,
  Figure,
  Prose,
  RefTable,
  Section,
  Term,
  UiDemo,
} from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "Vault",
  description:
    "Where your documents and code live, who can reach them, and how you make them searchable so agents can draw on them while they work.",
};

export default function VaultPage() {
  return (
    <>
      <Section title="What the vault looks like" intro="Files for your workspace, sorted by kind, with a quota you can see.">
        <UiDemo caption="Files marked “searchable” have been indexed — agents can draw on those without being handed them.">
          <VaultDemo />
        </UiDemo>
        <Prose className="mt-5">
          Each workspace gets 5 GB. Files are categorised by type automatically, and you can favourite the ones
          you keep coming back to.
        </Prose>
      </Section>

      <Section
        title="Three places a file can live"
        intro="Where you put a file decides which agents can reach it. This is the part worth getting right."
      >
        <UiDemo caption="Narrower is usually better — an agent given fewer, more relevant files does better work.">
          <VaultScopeDemo />
        </UiDemo>
        <Prose className="mt-5">
          The pricing sheet belongs at the workspace level because three different projects need it. The
          screenshot of a bug belongs on the story about that bug, and nowhere else. When in doubt, start
          narrow — moving a file up later is easy, and an agent wading through irrelevant documents is not.
        </Prose>
      </Section>

      <Section
        title="From file to answer"
        intro="Uploading a file gets you one set of things. Indexing it gets you another."
      >
        <Figure caption="Storing and indexing are separate steps, and only you decide the second one.">
          <FileJourneyDiagram />
        </Figure>
        <div className="mt-6">
          <RefTable
            headers={["", "Stored", "Indexed"]}
            rows={[
              ["Find it", "By name, in the vault.", "By meaning — “the doc about legacy pricing”."],
              ["Use it on a story", "Attach it, and the agent reads it.", "Same, plus the agent can find it itself."],
              ["Ask about it", "No.", "Yes, with the sources it drew on."],
              ["Agents draw on it", "Only if you attach it.", "Whenever it's relevant, unprompted."],
              ["Costs you", "Storage against your quota.", "Storage, plus the judgement of keeping it current."],
            ]}
          />
        </div>
        <Prose className="mt-6">
          That last row is the real trade-off. Indexing is not free in the way storing is:
        </Prose>
        <div className="mt-4">
          <GoodBad
            good="Index: “Why we moved off the legacy billing system” — a decision record."
            goodNote="Explains reasoning nobody will repeat. Agents will reach for it for years."
            bad="Index: last quarter's pricing sheet, superseded but not deleted."
            badNote="Now two documents disagree about price and nothing says which is current."
          />
        </div>
        <div className="mt-5">
          <Callout>
            Superseded documents are the single most common cause of confidently wrong answers. If something is
            out of date, take it out of the index — you can leave the file stored. More on choosing in{" "}
            <Term>Files &amp; knowledge</Term>.
          </Callout>
        </div>
      </Section>

      <Section
        title="Repositories"
        intro="Code is the other thing agents need to reach, and it works differently from files."
      >
        <UiDemo caption="Repositories registered on a workspace. The description tells an agent which one it wants.">
          <RepositoryDemo />
        </UiDemo>
        <Prose className="mt-5">
          You don&apos;t upload code — you register the repository, and when an agent picks up work that needs it,
          its machine checks the repository out fresh into that piece of work&apos;s working directory. So the
          agent always sees current code, not a copy you remembered to update.
        </Prose>
        <Prose>
          Give each repository a real description. It is how an agent decides which repository a story is about
          when your workspace has several.
        </Prose>
        <div className="mt-5">
          <Callout>
            The checkout happens on the agent&apos;s <Term>machine</Term>. Whether that machine can reach a
            private repository, your VPN, or your local database depends on where it runs — see{" "}
            <Term>Runtimes</Term>.
          </Callout>
        </div>
      </Section>

      <Section title="What the vault is not" intro="Worth saying plainly, because the name invites the wrong assumption.">
        <Callout>
          The vault is document storage, <Term>not</Term>{" "}
          a password manager. Don&apos;t put API keys or credentials in it.
        </Callout>
        <Prose className="mt-4">
          Secrets are handled separately and never appear here: credentials for connected tools are encrypted and
          released to an agent only as it starts work, and model provider keys live in the server&apos;s
          environment, outside the database entirely. See <Term>Access &amp; permissions</Term>.
        </Prose>
      </Section>
    </>
  );
}
