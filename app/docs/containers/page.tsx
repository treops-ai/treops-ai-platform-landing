import type { Metadata } from "next";
import { ContainerTopologyDiagram } from "@/components/docs/diagrams/tech-infra";
import { Callout, Code, CodeBlock, Figure, Prose, RefTable, Section } from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "Containers & orchestration",
  description: "How runtimes are started as Docker containers today, what the supervisor seam looks like, and what Kubernetes would change.",
};

export default function ContainersPage() {
  return (
    <>
      <Callout>
        Today TreOps orchestrates with <strong>Docker on one host</strong>. There is no Kubernetes code in the
        repository. This page describes what exists, then maps it onto Kubernetes as a design intent, not a
        feature.
      </Callout>

      <Section
        title="Docker today"
        intro="Two kinds of container are started by the backend. A third kind of runtime, your own machine, is not started by TreOps at all."
      >
        <Figure caption="The supervisor classes are the only code that talks to Docker.">
          <ContainerTopologyDiagram />
        </Figure>
        <div className="mt-5">
          <RefTable
            headers={["Kind", "Image", "What runs", "Started by"]}
            rows={[
              ["Hosted runtime", <Code key="1">treops-hosted-runtime</Code>, "The ordinary daemon driving the Claude CLI over the public API with a session token.", <Code key="a">HostedContainerSupervisor</Code>],
              ["Native worker", "native worker image", "A LangChain engine process that talks to the database directly.", <Code key="b">NativeContainerSupervisor</Code>],
              ["Bring-your-own", "none", "Your daemon on your machine, registered with a one-time token.", "You"],
            ]}
          />
        </div>
      </Section>

      <Section title="Lifecycle" intro="Everything is derived from the runtime id, so teardown never depends on state a daemon can overwrite.">
        <RefTable
          headers={["Step", "Behaviour"]}
          rows={[
            ["Claim", "A claimant gets a hosted runtime row and a session token minted for it."],
            ["Start", "Remove any container already holding the stable name, then run the image detached. Idempotent, so re-claiming after a crash is safe."],
            ["Bootstrap", "Everything arrives as environment: server URL, MCP URL, workspace id, runtime id, session token, and the platform’s Claude credential."],
            ["Register", "The daemon registers and heartbeats like any other machine; no human identity is in the loop."],
            ["Run", "It claims tasks routed to that runtime and executes them."],
            ["Stop", "On grant exhaustion or release, force-remove by name. Best effort and never raises, because failing here would block the bookkeeping that stops further charging."],
          ]}
        />
        <Prose className="mt-4">
          The container name is <Code>treops-hosted-&lt;runtime id&gt;</Code>. It is deliberately not stored,
          because the daemon overwrites device info when it registers.
        </Prose>
      </Section>

      <Section title="Resource and safety limits" intro="The container runs a coding agent on a credential the user does not own, so the limits are not optional.">
        <RefTable
          headers={["Control", "Value", "Why"]}
          rows={[
            ["Memory", "2 GB (setting)", "Fits up to three CLIs and two browsers."],
            ["CPU", "1.0 (setting)", "A share, so free compute cannot starve the host."],
            ["Process cap", "512", "Contains fork bombs."],
            ["Docker socket", "Never mounted in a workload", "A workload must not control the engine that runs it. The backend holds it; see below."],
            ["Restart policy", "On failure, at most 3", "An unbounded loop on free compute is a cost leak."],
            ["User", "Non-root", "Root inside buys nothing and costs a lot if the CLI sandbox is escaped."],
            ["Ports", "None opened", "The worker only dials out."],
          ]}
        />
      </Section>

      <Section title="Who holds the Docker socket" intro="The workloads never do. The backend does, and that is the largest trust assumption in this design.">
        <Prose>
          The backend mounts <Code>/var/run/docker.sock</Code> so the hosted supervisor can start sibling
          containers. That is root-equivalent access to the host: a remote-code-execution bug in the API would be
          a host compromise. It is mounted on the backend alone, not on the shared service definition, and never
          on a runtime. A socket proxy that allows only create, inspect and remove would narrow it, and is the
          first hardening step before running this for untrusted tenants.
        </Prose>
      </Section>

      <Section
        title="The single-host stack"
        intro="Production today is one box: docker compose for the services, optionally provisioned by CloudFormation."
      >
        <CodeBlock
          language="text"
          code={`db        pgvector/pgvector (Postgres 17)
minio     S3-compatible object storage
backend   FastAPI :8080
mcp       MCP service :8300
web       Next.js app
landing   this site
caddy     TLS and routing
daemon    started last, after a PAT and a registration token exist`}
        />
        <Prose className="mt-4">
          The daemon is started in a second stage because it needs credentials that can only be created through
          the UI, which needs the backend already running. The registration token is single use and lasts ten
          minutes, so a restarted daemon container needs a fresh one.
        </Prose>
      </Section>

      <Section
        title="Toward Kubernetes"
        intro="Not built. The supervisor interface is the seam: a second implementation would replace Docker calls with the Kubernetes API."
      >
        <RefTable
          headers={["Docker today", "Kubernetes equivalent", "Open question"]}
          rows={[
            ["Container per runtime, stable name", "A Pod or Job per runtime, labelled by runtime id", "Pod versus Job: a long-lived worker fits a Deployment of one"],
            ["mem_limit, nano_cpus", "Resource requests and limits", "Requests also drive scheduling, so pick them deliberately"],
            ["pids_limit", "Pod PID limit (kubelet setting)", "Cluster-level, not per Pod"],
            ["No Docker socket", "No hostPath, no privileged, no service-account token", "Disable token automount"],
            ["Restart on failure, max 3", "restartPolicy and backoffLimit", "Same intent"],
            ["Env carries the session token", "A Secret mounted as env", "Rotate on restart, since tokens expire"],
            ["Egress guard in the daemon", "NetworkPolicy plus the in-process guard", "NetworkPolicy alone cannot vet a resolved address"],
            ["Per-task directory in the container", "emptyDir or an ephemeral volume", "Persistence for resume across Pod restarts"],
            ["Chromium without its own sandbox", "Same, or seccomp profile", "User namespaces may be unavailable"],
          ]}
        />
        <Prose className="mt-4">
          The invariants do not change: workloads dial out, the backend authorizes every call, a runtime holds
          only the tasks routed to it, and a session token is minted per runtime.
        </Prose>
      </Section>
    </>
  );
}
