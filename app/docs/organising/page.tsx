import type { Metadata } from "next";
import { Callout, CardGrid, Prose, RefTable, Section, Term } from "@/components/docs/docs-primitives";

export const metadata: Metadata = {
  title: "Capturing & organising work",
  description:
    "How to write things down so they're actually actionable, and how to keep a growing workspace navigable.",
};

export default function OrganisingPage() {
  return (
    <>
      <Callout>
        This page assumes you know what stories and projects are. If not, start with <Term>Stories</Term>.
      </Callout>

      <Section
        title="Write the outcome, not the activity"
        intro="The single biggest difference between work an agent does well and work it does badly."
      >
        <RefTable
          headers={["Instead of", "Write"]}
          rows={[
            ["“Q3 stuff”", "“Draft the Q3 update for the board”"],
            ["“Look at the pricing page”", "“Fix the out-of-date figures on the pricing page”"],
            ["“Research competitors”", "“Summarise how our three main competitors price, with sources”"],
          ]}
        />
        <Prose className="mt-5">
          Then in the description, say what an agent couldn&apos;t guess: who it&apos;s for, how long it should
          be, what to avoid, where to look. Brief it the way you&apos;d brief a capable new colleague who has
          never met your team — which is almost exactly the situation.
        </Prose>
        <div className="mt-5">
          <Callout>
            Don&apos;t agonise over where something goes. Capturing it badly beats not capturing it — you can
            move, rename, and reorganise later, and stories are cheap.
          </Callout>
        </div>
      </Section>

      <Section title="When to split work up" intro="Four tools, and a rule of thumb for choosing between them.">
        <RefTable
          headers={["Use", "When"]}
          rows={[
            ["Sub-stories", "The work splits into pieces that could each be done separately, maybe by different agents."],
            ["A checklist", "The steps only make sense together and nobody else needs to pick one up."],
            ["Links between stories", "Two pieces of work depend on each other, or one is blocking the other."],
            ["Links out", "The real artifact lives elsewhere — a document, a pull request, a ticket."],
          ]}
        />
        <Prose className="mt-5">
          The rule of thumb: if you can imagine assigning it to someone on its own, it wants to be its own story.
          If not, a checklist item is enough.
        </Prose>
      </Section>

      <Section title="Milestones and deadlines" intro="Use them when a date actually matters, not by default.">
        <Prose>
          Group the stories that have to finish for the milestone to count as reached. Progress then moves when
          work genuinely finishes — which is more useful, and occasionally more uncomfortable, than a number
          someone maintains by hand.
        </Prose>
      </Section>

      <Section title="Finding things again" intro="A few habits that keep a busy workspace usable.">
        <CardGrid
          columns={2}
          items={[
            { title: "Pin what you're holding", body: "Keep the handful of live things in the sidebar, in your own order. Unpin ruthlessly." },
            { title: "Search rather than browse", body: "⌘K searches stories, projects, and indexed documents together." },
            { title: "Use tags sparingly", body: "Three or four meaningful tags beat twenty that nobody applies consistently." },
            { title: "Read the timeline", body: "When you're confused about how something got here, the project timeline usually explains it." },
          ]}
        />
      </Section>
    </>
  );
}
