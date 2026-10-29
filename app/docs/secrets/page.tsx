import type { Metadata } from "next";
import { CookieJarDiagram, LoginChainDiagram } from "@/components/docs/diagrams/tech-infra";
import { Callout, Code, Figure, Prose, RefTable, Section, Term } from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "Secrets & login chain",
  description: "Every credential in the system: how it is issued, stored, released to an agent, and what protects it.",
};

export default function SecretsPage() {
  return (
    <>
      <Section
        title="The credential chain"
        intro="From a person signing in to an agent making a tool call, each hop uses a narrower, shorter-lived credential than the last."
      >
        <Figure caption="Hashed credentials prove identity; encrypted ones are released to a runtime only when it holds a live task.">
          <LoginChainDiagram />
        </Figure>
        <Prose className="mt-5">
          Sign-in is an emailed one-time code, so there is no password to store. A user session is an HS256 JWT
          for 30 days that carries a token version; “sign out everywhere” bumps the version and every older token
          stops working. Machines never hold a user session: a registration token is exchanged once for a session
          token bound to one runtime.
        </Prose>
      </Section>

      <Section title="Credential inventory">
        <RefTable
          headers={["Credential", "Stored as", "Released to", "Lifetime"]}
          rows={[
            ["User JWT", "Not stored (signed)", "The signed-in browser", "30 days; revocable by version"],
            [<Code key="1">tre_</Code>, "SHA-256 hash", "The person who created it, once", "Until revoked"],
            [<Code key="2">tdt_</Code>, "SHA-256 hash", "The person who created it, once", "10 minutes, single use"],
            [<Code key="3">tds_</Code>, "SHA-256 hash", "The daemon it was minted for", "24 h hosted, 30 d otherwise"],
            ["MCP private headers", "Fernet ciphertext", "A runtime holding a live task of that agent", "Until changed"],
            ["MCP OAuth client secret and tokens", "Fernet ciphertext", "The backend only; never leave the API", "Until refreshed"],
            ["Slack webhook URL", "Fernet ciphertext; shown masked", "The backend’s delivery loop only", "Until changed"],
            ["Browser cookie jar", "Fernet ciphertext", "The platform runtime that asks, for that member’s thread", "Until the member signs out or opts out"],
            ["Model provider keys", "Server environment", "Never in the database", "Operator-managed"],
            ["Hosted runtime bootstrap", "Container environment", "The container, and only as env", "Container lifetime"],
          ]}
        />
      </Section>

      <Section
        title="Encryption at rest"
        intro="One mechanism protects everything the backend must be able to read back."
      >
        <RefTable
          headers={["Property", "Detail"]}
          rows={[
            ["Cipher", "Fernet: AES-128-CBC with an HMAC-SHA256 tag. A random IV makes every ciphertext unique."],
            ["Key derivation", "PBKDF2-HMAC-SHA256, 480 000 iterations, from the server’s signing secret."],
            ["What is encrypted", "MCP private headers, OAuth secrets, flow channel webhooks, browser cookie jars."],
            ["Startup guard", "In production the server refuses to start if the signing secret is the development default or shorter than 32 characters."],
            ["Wrong key", "Decryption fails closed: OAuth secrets read back as empty and a warning names a possible rotation."],
          ]}
        />
        <div className="mt-5">
          <Callout>
            <Term>Design limit.</Term> One root secret both signs JWTs and derives the encryption key, with a
            fixed salt and no envelope encryption or key versioning. Rotating it logs everyone out and makes every
            stored secret unreadable. A KMS or secret-manager integration is the natural next step; it is not
            built.
          </Callout>
        </div>
      </Section>

      <Section
        title="Releasing a secret to an agent"
        intro="The plaintext exists only at the end of the chain, for the shortest time that works."
      >
        <RefTable
          headers={["Hop", "Plaintext present?", "Control"]}
          rows={[
            ["Database", "No", "Fernet ciphertext."],
            ["Claim response", "Yes", "Returned only to a runtime holding a live task of that agent (runtime_may_act_as)."],
            ["Task directory", "Yes", "Written to .mcp.json for the CLI; per task, pruned after 30 days."],
            ["Agent process", "Yes", "The provider CLI reads it; the sandbox limits where it can send it."],
            ["Event bus and viewer sockets", "No", "Cookie jars travel only over the runtime’s own socket and are never logged."],
          ]}
        />
        <Prose className="mt-4">
          Because the credential is plaintext in the task directory, the isolation page’s limits apply: anything
          running as the same user on that runtime can read it. Prefer narrowly scoped credentials per agent, and
          attach each connector only to the agents that need it.
        </Prose>
      </Section>

      <Section
        title="Browser sign-ins"
        intro="A person signs in once inside the browser pane; the platform remembers the cookies, not the password."
      >
        <Figure caption="Cookies are merged and encrypted by the backend; the container’s disk never holds the jar.">
          <CookieJarDiagram />
        </Figure>
        <RefTable
          headers={["Rule", "Detail"]}
          rows={[
            ["Authority", "The backend answers and accepts profile messages only from the workspace’s platform runtime, about a thread of that workspace. Bring-your-own runtimes get “keep: false”."],
            ["Owner", "The thread’s creator. Their other threads share the jar; a colleague’s threads never see it."],
            ["Transport", "Only the runtime’s own socket. Cookies never ride the event bus or a viewer socket, and the REST API returns counts only."],
            ["Merge, not replace", "Two threads of one member run two browsers, so the backend drops the keys the browser removed (a logout) and keeps the rest."],
            ["Limits", "2 000 cookies and 1 MB per jar; expired cookies are dropped on every read and write; oversized jars are refused whole."],
            ["Opt-out", "Per member (keep_signed_in, default on)."],
          ]}
        />
        <Prose className="mt-4">
          The assistant never types credentials: it asks the person to sign in, and the browser’s password
          manager and autofill are disabled by policy.
        </Prose>
      </Section>

      <Section title="What the platform will not hold">
        <RefTable
          headers={["Not held", "Why"]}
          rows={[
            ["User passwords", "Sign-in is an emailed code."],
            ["Browser passwords", "Password manager disabled; only cookies are kept."],
            ["Model provider keys in the database", "They live in the server’s environment."],
            ["Secrets in the vault", "The vault is document storage; credentials for tools are stored encrypted elsewhere."],
          ]}
        />
      </Section>
    </>
  );
}
