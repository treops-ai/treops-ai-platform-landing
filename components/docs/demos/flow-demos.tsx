"use client";

/**
 * Live examples for the Flows concept page.
 *
 * The wording and grouping mirror the product's
 * `modules/views/flows/lib/step-presentation.ts`, which owns the palette's
 * voice — keep them in step.
 */

import {
  Database,
  Globe,
  ListChecks,
  type LucideIcon,
  MousePointerClick,
  Paperclip,
  Play,
  ShieldCheck,
  Sparkles,
  Telescope,
  Type,
  Workflow,
  Zap,
} from "lucide-react";
import { Badge } from "@treops/ui/components/ui/badge";
import { cn } from "@treops/ui/lib/utils";

/* ------------------------------------------------------------- the palette */

type Tone = "neutral" | "primary" | "info" | "success" | "warning";

const TONE: Record<Tone, string> = {
  neutral: "bg-muted text-muted-foreground",
  primary: "bg-primary/10 text-primary",
  info: "bg-info/10 text-info",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
};

const PALETTE: { group: string; tone: Tone; items: { label: string; description: string; Icon: LucideIcon }[] }[] = [
  {
    group: "Ask the person running it",
    tone: "neutral",
    items: [
      { label: "Ask for some text", description: "A question they answer each run", Icon: Type },
      { label: "Ask for a file", description: "A spreadsheet, PDF or export to work from", Icon: Paperclip },
    ],
  },
  {
    group: "Ask the AI",
    tone: "primary",
    items: [
      { label: "Ask the AI", description: "Write, reason or summarise — run by whichever agent you pick", Icon: Sparkles },
      { label: "Search the web", description: "Look things up online and cite the sources", Icon: Globe },
      { label: "Do deeper research", description: "A longer, more thorough investigation", Icon: Telescope },
      { label: "Use a browser", description: "Drive a real web page to get something done", Icon: MousePointerClick },
    ],
  },
  {
    group: "Use your data",
    tone: "info",
    items: [
      { label: "Look up work in TreOps", description: "Find stories, sprints and who owns what", Icon: Database },
    ],
  },
  {
    group: "Do something elsewhere",
    tone: "success",
    items: [
      { label: "Act in a connected app", description: "Do something in an app your workspace is linked to", Icon: Zap },
    ],
  },
  {
    group: "Set the ground rules",
    tone: "warning",
    items: [
      { label: "Ground rules for several steps", description: "Shared instructions applied to the steps you pick", Icon: ListChecks },
    ],
  },
  {
    group: "Check before it goes on",
    tone: "warning",
    items: [
      { label: "Wait for your OK", description: "Pause so you can check the work before the flow goes on", Icon: ShieldCheck },
    ],
  },
];

export function StepPaletteDemo() {
  return (
    <div className="grid gap-4">
      {PALETTE.map((g) => (
        <div key={g.group}>
          <div className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {g.group}
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {g.items.map((i) => (
              <div key={i.label} className="flex items-start gap-2.5 rounded-xl border border-border bg-card p-2.5">
                <span className={cn("grid size-7 flex-none place-items-center rounded-lg", TONE[g.tone])}>
                  <i.Icon className="size-3.5" />
                </span>
                <div className="min-w-0">
                  <div className="text-[13px] font-semibold text-foreground">{i.label}</div>
                  <div className="text-[11.5px] text-muted-foreground">{i.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------- a flow's steps */

export function FlowStepsDemo() {
  const steps = [
    { n: 1, label: "Ask for a file", detail: "“Drop in this week's support export”", Icon: Paperclip, tone: "neutral" as Tone },
    { n: 2, label: "Look up work in TreOps", detail: "Open stories in the Support project", Icon: Database, tone: "info" as Tone },
    { n: 3, label: "Group into themes", detail: "Ask the AI: group the export into themes. Ignore anything already covered by @Look up work in TreOps.", Icon: Sparkles, tone: "primary" as Tone },
    { n: 4, label: "Wait for your OK", detail: "Check @Group into themes before any story drafts are written.", Icon: ShieldCheck, tone: "warning" as Tone },
    { n: 5, label: "Write story drafts", detail: "Ask the AI · runs as Ops Agent: write each theme from @Group into themes up as a story draft", Icon: Sparkles, tone: "primary" as Tone },
  ];
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        <Workflow className="size-3.5 text-muted-foreground" />
        <span className="text-xs font-semibold text-foreground">Triage weekly support feedback</span>
        <Badge variant="secondary" className="ml-auto text-[10px]">5 steps</Badge>
      </div>
      <ul className="divide-y divide-border">
        {steps.map((s) => (
          <li key={s.n} className="flex items-start gap-3 px-3 py-2.5">
            <span className="mt-0.5 font-mono text-[11px] text-muted-foreground">{s.n}</span>
            <span className={cn("grid size-7 flex-none place-items-center rounded-lg", TONE[s.tone])}>
              <s.Icon className="size-3.5" />
            </span>
            <div className="min-w-0">
              <div className="text-[13px] font-semibold text-foreground">{s.label}</div>
              <div className="text-[12px] text-muted-foreground">{s.detail}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ a run */

export function FlowRunDemo() {
  const steps = [
    { label: "Ask for a file", state: "succeeded" as const, note: "support-export-w12.csv" },
    { label: "Look up work in TreOps", state: "succeeded" as const, note: "18 open stories found" },
    { label: "Group into themes", state: "running" as const, note: "grouping 214 comments…" },
    { label: "Wait for your OK", state: "pending" as const, note: "" },
    { label: "Write story drafts · runs as Ops Agent", state: "pending" as const, note: "" },
  ];
  const mark = {
    succeeded: { cls: "bg-success/15 text-success", glyph: "✓" },
    running: { cls: "bg-primary/15 text-primary", glyph: "•" },
    pending: { cls: "border border-border text-muted-foreground", glyph: "" },
    failed: { cls: "bg-destructive/15 text-destructive", glyph: "✕" },
  };
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        <Play className="size-3.5 text-primary" />
        <span className="text-xs font-semibold text-foreground">Run in progress</span>
        <span className="ml-auto font-mono text-[11px] text-muted-foreground">step 3 of 5</span>
      </div>
      <ul className="divide-y divide-border">
        {steps.map((s) => (
          <li key={s.label} className="flex items-center gap-2.5 px-3 py-2.5">
            <span
              aria-hidden="true"
              className={cn("grid size-4 flex-none place-items-center rounded-full text-[10px]", mark[s.state].cls)}
            >
              {mark[s.state].glyph}
            </span>
            <span className={cn("flex-1 text-[13px]", s.state === "pending" ? "text-muted-foreground" : "text-foreground")}>
              {s.label}
            </span>
            <span className="font-mono text-[11px] text-muted-foreground">{s.note}</span>
          </li>
        ))}
      </ul>
      <div className="border-t border-border px-3 py-2 text-[11.5px] text-muted-foreground">
        You can cancel a run at any point. If a step fails, you fix the cause and resume from that step —
        the finished steps aren&apos;t redone.
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- flows list */

export function FlowListDemo() {
  const flows = [
    { name: "Triage weekly support feedback", steps: 5, lastRun: "ran 2 days ago" },
    { name: "Draft the Monday standup", steps: 3, lastRun: "ran yesterday" },
    { name: "Competitor pricing check", steps: 5, lastRun: "never run" },
  ];
  return (
    <div className="grid gap-2">
      {flows.map((f) => (
        <div key={f.name} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
          <span className="grid size-8 flex-none place-items-center rounded-lg bg-primary/10 text-primary">
            <Workflow className="size-4" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold text-foreground">{f.name}</div>
            <div className="text-[11px] text-muted-foreground">
              {f.steps} steps · {f.lastRun}
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1 text-[12px] text-muted-foreground">
            <Play className="size-3" /> Run
          </span>
        </div>
      ))}
    </div>
  );
}
