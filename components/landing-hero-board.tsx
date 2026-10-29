"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@treops/ui/lib/utils";
import { ActorAvatar } from "@treops/ui/components/common/actor-avatar";
import { StoryTypeIcon } from "@treops/views/stories/components";
import { PriorityIcon } from "@treops/views/stories/components";
import { PRIORITY_CONFIG } from "@treops/core/stories/config";
import type { StoryType, StoryPriority } from "@treops/core/types";
import {
  Clock,
  CircleDot,
  CircleCheck,
  CircleEllipsis,
  Bot,
  ListTodo,
  FolderKanban,
  Settings,
  Zap,
  Sparkles,
} from "lucide-react";

interface MockCard {
  id: string;
  identifier: string;
  title: string;
  type: StoryType;
  priority: StoryPriority;
  assignee: { initials: string; isAgent: boolean; name: string };
  done?: boolean;
  progress?: number; // 0–100, static progress bar
}

/* ── card data ── */

const BACKLOG_CARDS: MockCard[] = [
  { id: "ws-130", identifier: "WS-130", title: "Add audit log viewer", type: "feature", priority: "low", assignee: { initials: "SK", isAgent: false, name: "Sarah K." } },
  { id: "ws-131", identifier: "WS-131", title: "Email verification flow", type: "feature", priority: "medium", assignee: { initials: "OA", isAgent: true, name: "Ops Agent" } },
];

const READY_CARDS: MockCard[] = [
  { id: "ws-118", identifier: "WS-118", title: "Rate-limit login attempts", type: "feature", priority: "medium", assignee: { initials: "SK", isAgent: false, name: "Sarah K." } },
  { id: "ws-121", identifier: "WS-121", title: "OAuth provider config", type: "general", priority: "low", assignee: { initials: "OA", isAgent: true, name: "Ops Agent" } },
  { id: "ws-126", identifier: "WS-126", title: "Password reset flow", type: "bug", priority: "high", assignee: { initials: "MJ", isAgent: false, name: "Marco J." } },
];

const LIVE_CARD: MockCard = {
  id: "ws-123", identifier: "WS-123", title: "Implement JWT authentication", type: "feature", priority: "high", assignee: { initials: "OA", isAgent: true, name: "Ops Agent" },
};

const IN_PROGRESS_CARDS: MockCard[] = [
  { id: "ws-125", identifier: "WS-125", title: "Session management UI", type: "feature", priority: "medium", assignee: { initials: "MJ", isAgent: false, name: "Marco J." } },
  { id: "ws-127", identifier: "WS-127", title: "RBAC permission middleware", type: "chore", priority: "high", assignee: { initials: "OA", isAgent: true, name: "Ops Agent" } },
];

const DONE_CARDS: MockCard[] = [
  { id: "ws-110", identifier: "WS-110", title: "Password hashing (bcrypt)", type: "chore", priority: "trivial", assignee: { initials: "OA", isAgent: true, name: "Ops Agent" }, done: true },
  { id: "ws-104", identifier: "WS-104", title: "User schema & migrations", type: "general", priority: "low", assignee: { initials: "SK", isAgent: false, name: "Sarah K." }, done: true },
  { id: "ws-101", identifier: "WS-101", title: "Project scaffolding & CI setup", type: "chore", priority: "trivial", assignee: { initials: "MJ", isAgent: false, name: "Marco J." }, done: true },
  { id: "ws-099", identifier: "WS-099", title: "Database schema design", type: "general", priority: "medium", assignee: { initials: "SK", isAgent: false, name: "Sarah K." }, done: true },
];

const TYPE_BORDER: Record<StoryType, string> = {
  general: "border-l-amber-500",
  feature: "border-l-blue-500",
  bug: "border-l-red-500",
  chore: "border-l-muted-foreground/30",
};

/* ── agent typing indicator ── */
type AgentLine = { id: number; text: string };

const AGENT_LINES = [
  "Writing token validation logic...",
  "Adding refresh rotation handler...",
  "Running unit tests...",
  "Tests passed. Committing changes...",
  "Updating acceptance criteria...",
];

export function HeroBoardMockup() {
  const reduced = useReducedMotion();

  /* live progress bar — JWT card */
  const [pct, setPct] = useState(62);
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setPct((v) => {
        const next = v + Math.random() * 3 + 0.5;
        return next >= 90 ? 62 : next;
      });
    }, 700);
    return () => clearInterval(id);
  }, [reduced]);

  /* live progress — Session management UI */
  const [pct2, setPct2] = useState(45);
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setPct2((v) => {
        const next = v + Math.random() * 2 + 0.4;
        return next >= 68 ? 35 : next;
      });
    }, 600);
    return () => clearInterval(id);
  }, [reduced]);

  /* live progress — RBAC middleware */
  const [pct3, setPct3] = useState(20);
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setPct3((v) => {
        const next = v + Math.random() * 1.8 + 0.3;
        return next >= 42 ? 12 : next;
      });
    }, 800);
    return () => clearInterval(id);
  }, [reduced]);

  /* agent typing stream */
  const [agentLines, setAgentLines] = useState<AgentLine[]>([]);
  const [lineIdx, setLineIdx] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setAgentLines((prev) => {
        const next = [...prev, { id: Date.now(), text: AGENT_LINES[lineIdx % AGENT_LINES.length] ?? "" }];
        return next.slice(-3); // keep last 3 lines
      });
      setLineIdx((i) => i + 1);
    }, 2800);
    return () => clearInterval(id);
  }, [reduced, lineIdx]);

  /* story count ticker */
  const total = BACKLOG_CARDS.length + READY_CARDS.length + IN_PROGRESS_CARDS.length + 1 + DONE_CARDS.length;
  const done = DONE_CARDS.length;

  const pctRounded = Math.round(pct);

  return (
    <div className="relative z-10">
      <div className="bg-background border border-border rounded-[22px] overflow-hidden flex flex-col shadow-[0_10px_30px_oklch(0.2_0.02_286/0.10),0_30px_70px_oklch(0.2_0.02_286/0.10)]" style={{ height: "clamp(650px, calc(100dvh - 380px), 820px)" }}>

        {/* window chrome */}
        <div className="flex items-center gap-2 px-4 py-[13px] border-b border-border bg-[oklch(0.99_0.002_286)]">
          <div className="flex gap-[7px]">
            <i className="block w-[11px] h-[11px] rounded-full bg-[#ff5f57]" />
            <i className="block w-[11px] h-[11px] rounded-full bg-[#febc2e]" />
            <i className="block w-[11px] h-[11px] rounded-full bg-[#28c840]" />
          </div>
          <span className="font-mono text-[12px] text-muted-foreground bg-background border border-border rounded-[8px] px-[14px] py-[5px] ml-1.5">
            app.treops.io / <b className="text-foreground/60 font-semibold">acme</b> / auth-system-v2
          </span>
          <span className="ml-auto inline-flex items-center gap-[7px] font-mono text-[11px] text-primary">
            <span className="w-2 h-2 rounded-full bg-primary animate-lp-pulse" />
            LIVE OPS
          </span>
        </div>

        {/* app layout */}
        <div className="grid flex-1 text-left max-[900px]:grid-cols-[1fr]" style={{ gridTemplateColumns: "220px 1fr" }}>

          {/* SIDEBAR */}
          <aside className="border-r border-border flex flex-col bg-sidebar max-[900px]:hidden">
            <div className="flex items-center gap-2.5 px-3 py-3 border-b border-sidebar-border">
              <div className="w-7 h-7 rounded-lg bg-primary grid place-items-center text-primary-foreground font-bold text-sm shrink-0">A</div>
              <div className="min-w-0">
                <div className="font-semibold text-[13px] tracking-tight truncate">Acme</div>
                <div className="text-[11px] text-muted-foreground truncate">acme.treops.io</div>
              </div>
            </div>

            <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-hidden">
              <NavItem icon={<Sparkles className="size-4" />} label="Assistant" />
              <NavItem icon={<ListTodo className="size-4" />} label="My Stories" badge="3" />
              <SectionLabel>Workspace</SectionLabel>
              <NavItem icon={<ListTodo className="size-4" />} label="Stories" />
              <NavItem icon={<FolderKanban className="size-4" />} label="Projects" active />
              <NavItem icon={<Zap className="size-4" />} label="Vault" />
              <SectionLabel>Configure</SectionLabel>
              <NavItem icon={<Bot className="size-4" />} label="Agents" badge="2" />
              <NavItem icon={<Zap className="size-4" />} label="Skills" badge="11" />
            </nav>

            {/* agent live feed */}
            <div className="mx-2 mb-2 rounded-lg border border-border bg-muted/40 p-2.5 overflow-hidden">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-lp-pulse" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-primary/70 font-semibold">Agent stream</span>
              </div>
              <div className="space-y-1 min-h-[48px]">
                {agentLines.map((line, i) => (
                  <p
                    key={line.id}
                    className={cn(
                      "text-[10px] leading-[1.5] font-mono truncate",
                      i === agentLines.length - 1
                        ? "text-foreground animate-in fade-in slide-in-from-bottom-1 duration-300"
                        : "text-muted-foreground/60"
                    )}
                  >
                    {i === agentLines.length - 1 && (
                      <span className="text-primary mr-1">›</span>
                    )}
                    {line.text}
                  </p>
                ))}
                {agentLines.length === 0 && (
                  <p className="text-[10px] font-mono text-muted-foreground/40">Waiting for agent...</p>
                )}
              </div>
            </div>

            <div className="px-2 py-2 border-t border-sidebar-border">
              <NavItem icon={<Settings className="size-4" />} label="Settings" />
            </div>
          </aside>

          {/* BOARD */}
          <div className="flex flex-col min-w-0 overflow-hidden">

            {/* board header */}
            <div className="flex items-center gap-3 px-5 py-3 border-b border-border shrink-0">
              <h4 className="font-semibold text-[15px] tracking-tight">Authentication System v2</h4>
              <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium bg-primary/10 text-primary border border-primary/20">
                <Clock className="size-3" /> In progress
              </span>
              {/* progress pill */}
              <div className="ml-auto flex items-center gap-2.5">
                <div className="hidden sm:flex items-center gap-1.5">
                  <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-success transition-all duration-700"
                      style={{ width: `${Math.round((done / total) * 100)}%` }}
                    />
                  </div>
                  <span className="font-mono text-[11px] text-muted-foreground">{done}/{total}</span>
                </div>
              </div>
            </div>

            {/* columns */}
            <div className="flex gap-3 p-4 overflow-x-auto flex-1">

              {/* Backlog */}
              <BoardColumn
                icon={<CircleEllipsis className="size-3.5 text-muted-foreground" />}
                label="Backlog"
                count={BACKLOG_CARDS.length}
                accent="bg-muted-foreground/30"
              >
                {BACKLOG_CARDS.map((c, i) => (
                  <StoryCard key={c.id} card={c} animDelay={i * 60} />
                ))}
              </BoardColumn>

              {/* Ready */}
              <BoardColumn
                icon={<CircleDot className="size-3.5 text-amber-500" />}
                label="Ready"
                count={READY_CARDS.length}
                accent="bg-amber-500"
              >
                {READY_CARDS.map((c, i) => (
                  <StoryCard key={c.id} card={c} animDelay={i * 60 + 80} />
                ))}
              </BoardColumn>

              {/* In progress */}
              <BoardColumn
                icon={<Clock className="size-3.5 text-primary" />}
                label="In progress"
                count={IN_PROGRESS_CARDS.length + 1}
                accent="bg-primary"
              >
                <StoryCard card={LIVE_CARD} livePercent={pctRounded} animDelay={0} />
                <StoryCard card={IN_PROGRESS_CARDS[0]!} livePercent={Math.round(pct2)} animDelay={60} />
                <StoryCard card={IN_PROGRESS_CARDS[1]!} livePercent={Math.round(pct3)} animDelay={120} />
              </BoardColumn>

              {/* Done */}
              <BoardColumn
                icon={<CircleCheck className="size-3.5 text-success" />}
                label="Done"
                count={DONE_CARDS.length}
                accent="bg-success"
              >
                {DONE_CARDS.map((c, i) => (
                  <StoryCard key={c.id} card={c} animDelay={i * 50 + 120} />
                ))}
              </BoardColumn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── sub-components ── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-2 pb-1 px-1">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">{children}</span>
    </div>
  );
}

function NavItem({ icon, label, active, badge }: { icon: React.ReactNode; label: string; active?: boolean; badge?: string }) {
  return (
    <div className={cn(
      "relative flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[13px] font-medium select-none",
      active ? "bg-active-blue/10 text-active-blue font-semibold" : "text-muted-foreground",
    )}>
      {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-4 rounded-r-full bg-active-blue" />}
      {icon}
      <span className="flex-1">{label}</span>
      {badge && (
        <span className="text-[10px] font-mono font-semibold bg-muted text-muted-foreground rounded-full px-1.5 py-px">{badge}</span>
      )}
    </div>
  );
}

function BoardColumn({ icon, label, count, accent, children }: {
  icon: React.ReactNode; label: string; count: number; accent: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-[240px] shrink-0">
      <div className="flex items-center gap-2 mb-1 px-0.5">
        {icon}
        <span className="text-[12px] font-semibold">{label}</span>
        <span className="ml-1 inline-flex items-center justify-center rounded-full bg-muted text-muted-foreground text-[11px] font-medium min-w-[18px] h-[18px] px-1.5">{count}</span>
      </div>
      <div className={cn("h-0.5 rounded-full mb-2.5", accent)} />
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function StoryCard({ card, livePercent, animDelay = 0 }: { card: MockCard; livePercent?: number; animDelay?: number; }) {
  const priorityCfg = PRIORITY_CONFIG[card.priority] ?? PRIORITY_CONFIG.trivial;

  return (
    <div
      className={cn(
        "rounded-lg border bg-card shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow duration-200",
        "border-l-2 p-3",
        TYPE_BORDER[card.type],
        card.done && "opacity-60 grayscale-[0.4]",
        // Tailwind animate-in from tw-animate-css
        "animate-in fade-in slide-in-from-bottom-3 duration-500 [animation-fill-mode:both]",
      )}
      style={{ animationDelay: `${animDelay}ms` }}
    >
      {/* row 1 */}
      <div className="flex items-center justify-between gap-1.5 mb-1">
        <div className="flex items-center gap-1.5">
          <StoryTypeIcon type={card.type} className="size-3" />
          <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground/60">{card.identifier}</p>
        </div>
        {card.done && <CircleCheck className="size-3 text-success" />}
      </div>

      {/* row 2: title */}
      <p className="text-[13px] font-medium leading-snug line-clamp-2 mb-2.5">{card.title}</p>

      {/* live progress */}
      {livePercent !== undefined && (
        <div className="mb-2.5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-muted-foreground font-medium">Progress</span>
            <span className="text-[10px] font-mono text-primary tabular-nums">{livePercent}%</span>
          </div>
          <div className="h-1 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${livePercent}%`, transition: "width 0.55s cubic-bezier(.2,.7,.3,1)" }}
            />
          </div>
        </div>
      )}

      {/* static progress bar */}
      {card.progress !== undefined && (
        <div className="mb-2.5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-muted-foreground font-medium">Progress</span>
            <span className="text-[10px] font-mono text-muted-foreground tabular-nums">{card.progress}%</span>
          </div>
          <div className="h-1 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary/60 animate-in fade-in duration-700 [animation-fill-mode:both]"
              style={{ width: `${card.progress}%`, animationDelay: `${animDelay + 300}ms` }}
            />
          </div>
        </div>
      )}

      {/* row 3: priority + avatar */}
      <div className="flex items-center justify-between gap-2">
        <span className={cn("inline-flex items-center rounded px-1 py-0.5", priorityCfg.badgeBg, priorityCfg.badgeText)}>
          <PriorityIcon priority={card.priority} className="h-3 w-3" inheritColor />
        </span>
        <ActorAvatar
          name={card.assignee.name}
          initials={card.assignee.initials}
          isAgent={card.assignee.isAgent}
          seed={card.assignee.name}
          size={20}
        />
      </div>
    </div>
  );
}
