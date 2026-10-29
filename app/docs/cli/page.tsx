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
  title: "Command line",
  description: "A terminal client for scripting and administration. Everything here can also be done in the app.",
};

export default function CliPage() {
  return (
    <>
      <Callout>
        You don&apos;t need the command line to use TreOps. It exists for scripting, bulk changes, and setting up
        the machines that agents run on.
      </Callout>

      <Section title="Install">
        <CodeBlock
          code={`cd cli && uv sync

uv run treops auth login
uv run treops auth status`}
        />
        <Prose className="mt-4">
          Examples below assume <Code>treops</Code> is on your path; from the repo, prefix with{" "}
          <Code>uv run</Code>.
        </Prose>
      </Section>

      <Section title="Command reference" intro="Run any group with no arguments to see its own help.">
        <RefTable
          headers={["Group", "Most used"]}
          rows={[
            ["treops auth", "login · status · logout"],
            ["treops workspace", "list · get · members · watch · unwatch"],
            ["treops story", "list · get · create · update · assign · status · runs · link · search"],
            ["treops story ac", "list · update-result · verify"],
            ["treops story comment", "list · add · delete"],
            ["treops story checklist", "list · add · update · check · uncheck · delete"],
            ["treops story sub-story", "list · create"],
            ["treops story external-link", "list · add · delete"],
            ["treops project", "list · get · create · update · delete · status · comment add"],
            ["treops milestone", "list · get · create · update · delete · story add · story remove"],
            ["treops agent", "list · get · create · update · tasks · skills set · archive · restore"],
            ["treops skill", "list · get · create · update · delete · import · files upsert"],
            ["treops knowledge", "search · list · upload"],
            ["treops runtime", "list · usage · activity · ping · update"],
            ["treops daemon", "start · stop · status · logs"],
            ["treops attachment", "download"],
            ["treops config", "show · set"],
          ]}
        />
        <Prose className="mt-5">
          <Code>treops repo checkout</Code> also exists, but it runs inside an agent&apos;s environment rather
          than from your shell.
        </Prose>
      </Section>

      <Section title="Common options" intro="Two options appear on nearly every command.">
        <RefTable
          headers={["Option", "What it does"]}
          rows={[
            [
              <Code key="k1">--profile</Code>,
              "Which stored login to use, so one machine can talk to several TreOps installations.",
            ],
            [
              <span key="k2">
                <Code>--output</Code> / <Code>-o</Code>
              </span>,
              <span key="k3">
                <Code>table</Code> to read, <Code>json</Code> to pipe. Listing commands default to table; commands
                that create something default to json.
              </span>,
            ],
          ]}
        />
        <div className="mt-5">
          <CodeBlock code={`treops story list -o json | jq '.[] | select(.status == "blocked")'`} />
        </div>
      </Section>
    </>
  );
}
