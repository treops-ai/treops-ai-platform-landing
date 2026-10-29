"use client";

/**
 * Live examples for the Stories concept page.
 *
 * These import the SAME components and config the product uses, so the docs
 * cannot drift from the app: change a status colour or label in
 * `@treops/core/stories/config` and these examples change with it.
 */

import {
  StatusIcon,
  PriorityIcon,
  StoryTypeIcon,
  ProgressRing,
} from "@treops/views/stories/components";
import { ActorAvatar } from "@treops/ui/components/common/actor-avatar";
import {
  STATUS_CONFIG,
  BOARD_STATUSES,
  PRIORITY_CONFIG,
  PRIORITY_ORDER,
  STORY_TYPE_CONFIG,
  STORY_TYPES,
  resolveTypeConfig,
} from "@treops/core/stories/config";
import type { StoryStatus, StoryPriority, StoryType } from "@treops/core/types";
import { cn } from "@treops/ui/lib/utils";

interface DemoStory {
  id: string;
  identifier: string;
  title: string;
  type: StoryType;
  status: StoryStatus;
  priority: StoryPriority;
  assignee: { name: string; initials: string; isAgent?: boolean };
  done?: number;
  total?: number;
}

const STORIES: DemoStory[] = [
  {
    id: "1",
    identifier: "LAUNCH-14",
    title: "Draft the launch announcement",
    type: "feature",
    status: "in_review",
    priority: "high",
    assignee: { name: "Writer Agent", initials: "WA", isAgent: true },
    done: 3,
    total: 4,
  },
  {
    id: "2",
    identifier: "LAUNCH-15",
    title: "Pricing page copy is out of date",
    type: "bug",
    status: "in_progress",
    priority: "urgent",
    assignee: { name: "Dev Agent", initials: "DA", isAgent: true },
    done: 1,
    total: 3,
  },
  {
    id: "3",
    identifier: "LAUNCH-16",
    title: "Collect testimonials from beta users",
    type: "general",
    status: "blocked",
    priority: "medium",
    assignee: { name: "Sam Okafor", initials: "SO" },
  },
  {
    id: "4",
    identifier: "LAUNCH-17",
    title: "Archive the old campaign assets",
    type: "chore",
    status: "backlog",
    priority: "low",
    assignee: { name: "Ops Agent", initials: "OA", isAgent: true },
  },
];

/** One row of the stories list, as it appears in the app. */
export function StoryListDemo() {
  return (
    <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
      {STORIES.map((s) => (
        <div key={s.id} className="flex items-center gap-3 px-3 py-2.5 text-sm">
          <StoryTypeIcon type={s.type} />
          <span className="font-mono text-[11px] text-muted-foreground">{s.identifier}</span>
          <span className="min-w-0 flex-1 truncate text-foreground">{s.title}</span>
          {s.total ? (
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <ProgressRing done={s.done ?? 0} total={s.total} />
              {s.done}/{s.total}
            </span>
          ) : null}
          <PriorityIcon priority={s.priority} />
          <StatusIcon status={s.status} />
          <ActorAvatar
            name={s.assignee.name}
            initials={s.assignee.initials}
            isAgent={s.assignee.isAgent}
            seed={s.id}
            size={20}
          />
        </div>
      ))}
    </div>
  );
}

/** The board view — same statuses, arranged in columns. */
export function StoryBoardDemo() {
  return (
    <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
      {BOARD_STATUSES.slice(0, 3).map((status: StoryStatus) => {
        const cfg = STATUS_CONFIG[status];
        const cards = STORIES.filter((s) => s.status === status);
        return (
          <div key={status} className={cn("rounded-xl border border-border p-2", cfg.columnBg)}>
            <div className="mb-2 flex items-center gap-1.5 px-1">
              <StatusIcon status={status} className="h-3.5 w-3.5" />
              <span className="text-xs font-semibold text-foreground">{cfg.label}</span>
              <span className="ml-auto text-[11px] text-muted-foreground">{cards.length}</span>
            </div>
            <div className="grid gap-1.5">
              {cards.map((s) => (
                <div key={s.id} className="rounded-lg border border-border bg-card p-2">
                  <div className="flex items-center gap-1.5">
                    <StoryTypeIcon type={s.type} />
                    <span className="font-mono text-[10px] text-muted-foreground">{s.identifier}</span>
                    <PriorityIcon priority={s.priority} className="ml-auto" />
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs text-foreground">{s.title}</p>
                </div>
              ))}
              {cards.length === 0 ? (
                <p className="px-1 py-3 text-[11px] text-muted-foreground">Nothing here</p>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Every status, with the icon and label the app uses. */
export function StatusLegend() {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {BOARD_STATUSES.map((status: StoryStatus) => (
        <div key={status} className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
          <StatusIcon status={status} />
          <span className="text-sm text-foreground">{STATUS_CONFIG[status].label}</span>
        </div>
      ))}
    </div>
  );
}

export function PriorityLegend() {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {PRIORITY_ORDER.map((p: StoryPriority) => (
        <div key={p} className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
          <PriorityIcon priority={p} />
          <span className="text-sm text-foreground">{PRIORITY_CONFIG[p].label}</span>
        </div>
      ))}
    </div>
  );
}

export function TypeLegend() {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
      {STORY_TYPES.map((t: StoryType) => (
        <div key={t} className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
          <StoryTypeIcon type={t} />
          <span className="text-sm text-foreground">{resolveTypeConfig(STORY_TYPE_CONFIG, t).label}</span>
        </div>
      ))}
    </div>
  );
}

/** Acceptance criteria, the way they appear on a story. */
export function CriteriaDemo() {
  const items = [
    { text: "Under two pages", state: "met" as const },
    { text: "Covers revenue, hiring, and the migration", state: "met" as const },
    { text: "Every figure traces back to the finance sheet", state: "not_met" as const },
    { text: "Reviewed by someone outside the team", state: "pending" as const },
  ];
  const done = items.filter((i) => i.state === "met").length;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        <span className="text-xs font-semibold text-foreground">Acceptance criteria</span>
        <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <ProgressRing done={done} total={items.length} />
          {done} of {items.length} passing
        </span>
      </div>
      <ul className="divide-y divide-border">
        {items.map((i) => (
          <li key={i.text} className="flex items-center gap-2.5 px-3 py-2 text-sm">
            <span
              aria-hidden="true"
              className={cn(
                "grid size-4 flex-none place-items-center rounded-full text-[10px]",
                i.state === "met" && "bg-success/15 text-success",
                i.state === "not_met" && "bg-destructive/15 text-destructive",
                i.state === "pending" && "border border-border text-muted-foreground",
              )}
            >
              {i.state === "met" ? "✓" : i.state === "not_met" ? "✕" : ""}
            </span>
            <span className={cn("flex-1", i.state === "pending" ? "text-muted-foreground" : "text-foreground")}>
              {i.text}
            </span>
            <span className="text-[11px] text-muted-foreground">
              {i.state === "met" ? "passed" : i.state === "not_met" ? "failed" : "not checked yet"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
