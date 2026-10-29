"use client";

/**
 * Worked examples for the Core concepts pages.
 *
 * These all use one running scenario — the "Product launch" project, its three
 * agents, and stories LAUNCH-14..17 — so a reader moving between pages keeps
 * building the same mental picture instead of meeting new fictions each time.
 *
 * Where an example shows something the user would *write* (a goal, an agent
 * brief, a skill file), it shows the real text rather than describing it.
 */

import {
  StatusIcon,
  PriorityIcon,
  StoryTypeIcon,
  ProgressRing,
} from "@treops/views/stories/components";
import { ActorAvatar } from "@treops/ui/components/common/actor-avatar";
import { Badge } from "@treops/ui/components/ui/badge";
import { Check, X } from "lucide-react";
import { cn } from "@treops/ui/lib/utils";

/* ------------------------------------------------------- shared scaffolding */

/** A surface for content the user would have typed. */
function Written({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-xl border border-border bg-card p-4", className)}>{children}</div>
  );
}

/** Side-by-side "write this, not that". */
export function GoodBad({
  good,
  bad,
  goodNote,
  badNote,
}: {
  good: string;
  bad: string;
  goodNote: string;
  badNote: string;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-xl border border-success/30 bg-success/5 p-3.5">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-success">
          <Check className="size-3.5" /> Works
        </div>
        <p className="mt-2 text-sm text-foreground">{good}</p>
        <p className="mt-1.5 text-[12px] text-muted-foreground">{goodNote}</p>
      </div>
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-3.5">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-destructive">
          <X className="size-3.5" /> Doesn&apos;t
        </div>
        <p className="mt-2 text-sm text-foreground">{bad}</p>
        <p className="mt-1.5 text-[12px] text-muted-foreground">{badNote}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------- goals */

export function GoalsExample() {
  const goals = [
    "Anyone on a legacy plan can move to v2 pricing without contacting support.",
    "The pricing page answers the five questions sales gets asked most.",
    "We can publish a price change without an engineer.",
  ];
  return (
    <Written>
      <div className="mb-3 flex items-center gap-2">
        <span className="text-sm font-semibold text-foreground">Product launch</span>
        <Badge variant="secondary" className="text-[10px]">3 goals</Badge>
      </div>
      <ul className="grid gap-2">
        {goals.map((g, i) => (
          <li key={g} className="flex gap-2.5 text-sm">
            <span className="mt-0.5 grid size-4 flex-none place-items-center rounded-full bg-primary/10 font-mono text-[10px] text-primary">
              {i + 1}
            </span>
            <span className="text-foreground">{g}</span>
          </li>
        ))}
      </ul>
    </Written>
  );
}

/* -------------------------------------------------------------- milestones */

export function MilestonesExample() {
  const milestones = [
    {
      name: "Beta feedback in",
      date: "14 March",
      done: 4,
      total: 4,
      stories: ["Collect testimonials from beta users", "Summarise beta survey responses"],
    },
    {
      name: "Launch page live",
      date: "28 March",
      done: 3,
      total: 6,
      stories: ["Pricing page copy is out of date", "Build the plan comparison table"],
    },
    {
      name: "Announcement out",
      date: "4 April",
      done: 0,
      total: 3,
      stories: ["Draft the launch announcement", "Schedule the customer email"],
    },
  ];
  return (
    <div className="grid gap-2">
      {milestones.map((m) => (
        <div key={m.name} className="rounded-xl border border-border bg-card p-3">
          <div className="flex items-center gap-2">
            <ProgressRing done={m.done} total={m.total} size={14} />
            <span className="text-sm font-semibold text-foreground">{m.name}</span>
            <span className="text-[11px] text-muted-foreground">{m.date}</span>
            <span className="ml-auto font-mono text-[11px] text-muted-foreground">
              {m.done}/{m.total}
            </span>
          </div>
          <ul className="mt-2 grid gap-1 border-t border-border pt-2">
            {m.stories.map((s) => (
              <li key={s} className="truncate text-[12px] text-muted-foreground">
                {s}
              </li>
            ))}
            {m.total > m.stories.length ? (
              <li className="text-[12px] text-muted-foreground/70">
                +{m.total - m.stories.length} more
              </li>
            ) : null}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------- agent brief */

export function AgentBriefExample() {
  return (
    <Written>
      <div className="mb-3 flex items-center gap-2.5 border-b border-border pb-3">
        <ActorAvatar name="Writer Agent" initials="WA" isAgent seed="writer" size={30} />
        <div>
          <div className="text-sm font-semibold text-foreground">Writer Agent</div>
          <div className="text-[11px] text-muted-foreground">Drafts customer-facing copy</div>
        </div>
      </div>
      <div className="space-y-2.5 text-[13px] leading-relaxed text-muted-foreground">
        <p>
          You write customer-facing copy for our product — announcements, pricing pages, release notes and
          in-app text.
        </p>
        <p className="text-foreground">Always:</p>
        <ul className="ml-4 list-disc space-y-1">
          <li>Write in second person, present tense. Short sentences.</li>
          <li>Cite the source for any number. If you can&apos;t find a source, leave a gap and say so.</li>
          <li>Follow the House writing style skill for tone and structure.</li>
        </ul>
        <p className="text-foreground">Never:</p>
        <ul className="ml-4 list-disc space-y-1">
          <li>Announce a date that isn&apos;t already on a milestone.</li>
          <li>Compare us to a named competitor.</li>
          <li>Use &ldquo;simply&rdquo;, &ldquo;just&rdquo;, or &ldquo;easy&rdquo; — they read as dismissive.</li>
        </ul>
        <p>
          If a brief is ambiguous about audience or length, ask before drafting rather than guessing.
        </p>
      </div>
    </Written>
  );
}

/* --------------------------------------------------------------- skill file */

export function SkillFileExample() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        <span className="font-mono text-[11px] text-muted-foreground">SKILL.md</span>
        <Badge variant="secondary" className="ml-auto text-[10px]">House writing style</Badge>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-relaxed text-foreground">
{`---
name: house-writing-style
description: How we write customer-facing copy. Use for any
  announcement, pricing page, release note or in-app text.
---

# House writing style

## When to use this

Any text a customer will read. Not for internal notes or
commit messages.

## Structure

1. Lead with what changed for the reader, not what we built.
2. One idea per paragraph. Three sentences maximum.
3. Put the caveat next to the claim, not in a footnote.

## Words we don't use

| Don't          | Use instead              |
|----------------|--------------------------|
| simply, just   | (delete it)              |
| leverage       | use                      |
| utilise        | use                      |
| best-in-class  | say the actual benefit   |

"Simply" is banned because it tells a reader who is stuck
that their problem is trivial.

## Before you hand it back

- Read it aloud. If you run out of breath, split the sentence.
- Every number has a source linked next to it.`}
      </pre>
    </div>
  );
}

/* ------------------------------------------------------------ story example */

export function StoryExample() {
  const criteria = [
    { text: "Under 300 words", state: "met" as const },
    { text: "Names the three plan tiers and their prices", state: "met" as const },
    { text: "Every price matches the pricing sheet", state: "not_met" as const },
    { text: "Approved by Sam before it goes out", state: "pending" as const },
  ];
  return (
    <Written>
      <div className="flex items-center gap-2">
        <StoryTypeIcon type="feature" />
        <span className="font-mono text-[11px] text-muted-foreground">LAUNCH-14</span>
        <span className="ml-auto flex items-center gap-2">
          <PriorityIcon priority="high" />
          <StatusIcon status="in_review" />
          <ActorAvatar name="Writer Agent" initials="WA" isAgent seed="writer" size={20} />
        </span>
      </div>
      <h4 className="mt-2 text-base font-semibold text-foreground">Draft the launch announcement</h4>
      <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
        For the blog and the customer email. Audience is existing customers on legacy plans — they need to know
        what changes for them and what they need to do. Prices are in the pricing sheet in the project files.
        Sam signs off before anything goes out.
      </p>
      <div className="mt-3.5 border-t border-border pt-3">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Acceptance criteria
          </span>
          <ProgressRing done={2} total={4} />
        </div>
        <ul className="grid gap-1.5">
          {criteria.map((c) => (
            <li key={c.text} className="flex items-center gap-2 text-[13px]">
              <span
                aria-hidden="true"
                className={cn(
                  "grid size-4 flex-none place-items-center rounded-full text-[10px]",
                  c.state === "met" && "bg-success/15 text-success",
                  c.state === "not_met" && "bg-destructive/15 text-destructive",
                  c.state === "pending" && "border border-border",
                )}
              >
                {c.state === "met" ? "✓" : c.state === "not_met" ? "✕" : ""}
              </span>
              <span className={c.state === "pending" ? "text-muted-foreground" : "text-foreground"}>
                {c.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-3 rounded-lg bg-muted/50 px-3 py-2 text-[12px] text-muted-foreground">
        This story is sitting in review because one criterion failed — two prices didn&apos;t match the sheet. It
        cannot be marked done until that is resolved.
      </p>
    </Written>
  );
}

/* ------------------------------------------------------- runtime scenarios */

export function RuntimeChoiceExample() {
  const rows = [
    {
      task: "“Fix the failing test in our API repo”",
      needs: "Your checkout, your test runner",
      answer: "Your own machine",
      why: "It has to read and run code that only exists on your disk.",
    },
    {
      task: "“Draft the launch announcement”",
      needs: "Project files and knowledge",
      answer: "Either",
      why: "Everything it needs is already in the workspace.",
    },
    {
      task: "“Check the project every morning at 7am”",
      needs: "To be running when you aren't",
      answer: "Platform-hosted",
      why: "Your laptop is shut at 7am.",
    },
  ];
  return (
    <div className="grid gap-2">
      {rows.map((r) => (
        <div key={r.task} className="rounded-xl border border-border bg-card p-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-foreground">{r.task}</span>
            <Badge variant="secondary" className="ml-auto text-[10px]">{r.answer}</Badge>
          </div>
          <div className="mt-1.5 text-[12px] text-muted-foreground">
            Needs: {r.needs} — {r.why}
          </div>
        </div>
      ))}
    </div>
  );
}
