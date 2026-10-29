"use client";

/** Live examples for the Agents, Skills, Vault, Runtimes and Projects pages. */

import { ActorAvatar } from "@treops/ui/components/common/actor-avatar";
import { agentStatusConfig } from "@treops/views/agents";
import { PROJECT_STATUS_CONFIG } from "@treops/core/projects/config";
import type { ProjectStatus } from "@treops/core/types";
import { Badge } from "@treops/ui/components/ui/badge";
import { Bot, Check, FileText, FolderGit2, HardDrive, Image as ImageIcon, Server, X, Zap } from "lucide-react";
import { cn } from "@treops/ui/lib/utils";

/* ------------------------------------------------------------------ agents */

const AGENTS = [
  { id: "a1", name: "Dev Agent", initials: "DA", role: "Does the work", status: "working" as const, model: "claude", skills: 4, tools: 2 },
  { id: "a2", name: "QA Agent", initials: "QA", role: "Reviews the work", status: "idle" as const, model: "gemini", skills: 2, tools: 1 },
  { id: "a3", name: "Ops Agent", initials: "OA", role: "Runs the project", status: "blocked" as const, model: "claude", skills: 6, tools: 3 },
];

export function AgentRosterDemo() {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {AGENTS.map((a) => {
        const cfg = agentStatusConfig[a.status];
        return (
          <div key={a.id} className="rounded-xl border border-border bg-card p-3">
            <div className="flex items-center gap-2.5">
              <ActorAvatar name={a.name} initials={a.initials} isAgent seed={a.id} size={30} />
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-foreground">{a.name}</div>
                <div className="truncate text-[11px] text-muted-foreground">{a.role}</div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5">
              <span aria-hidden="true" className={cn("size-1.5 rounded-full", cfg.dot)} />
              <span className={cn("text-[11px] font-medium", cfg.color)}>{cfg.label}</span>
              <span className="ml-auto font-mono text-[10px] text-muted-foreground">{a.model}</span>
            </div>
            <div className="mt-2.5 flex gap-1.5 border-t border-border pt-2.5 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1"><Zap className="size-3" />{a.skills} skills</span>
              <span className="flex items-center gap-1"><Server className="size-3" />{a.tools} tools</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Every state an agent can be in, straight from the app's own config. */
const AGENT_STATES = ["working", "idle", "blocked", "error", "offline"] as const;

export function AgentStatusLegend() {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {AGENT_STATES.map((k) => {
        const cfg = agentStatusConfig[k];
        return (
          <div key={k} className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
            <span aria-hidden="true" className={cn("size-2 rounded-full", cfg.dot)} />
            <span className={cn("text-sm", cfg.color)}>{cfg.label}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------------- projects */

const PROJECTS: { name: string; status: ProjectStatus; done: number; total: number; pm: string }[] = [
  { name: "Product launch", status: "in_progress", done: 12, total: 20, pm: "Ops Agent" },
  { name: "Q3 reporting", status: "planned", done: 0, total: 8, pm: "You" },
  { name: "Website refresh", status: "paused", done: 5, total: 14, pm: "Ops Agent" },
];

export function ProjectListDemo() {
  return (
    <div className="grid gap-2">
      {PROJECTS.map((p) => {
        const cfg = PROJECT_STATUS_CONFIG[p.status];
        const pct = Math.round((p.done / p.total) * 100);
        return (
          <div key={p.name} className="rounded-xl border border-border bg-card p-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">{p.name}</span>
              <Badge variant="secondary" className="text-[10px]">{cfg?.label ?? p.status}</Badge>
              <span className="ml-auto text-[11px] text-muted-foreground">Managed by {p.pm}</span>
            </div>
            <div className="mt-2.5 flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
              </div>
              <span className="font-mono text-[11px] text-muted-foreground">{p.done}/{p.total}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ skills */

export function SkillListDemo() {
  const skills = [
    { name: "House writing style", desc: "Tone, structure, and the words we never use", files: 2, agents: 3 },
    { name: "Release checklist", desc: "The seven steps of shipping, in order", files: 1, agents: 1 },
    { name: "How our billing works", desc: "Background an agent shouldn't have to infer", files: 4, agents: 2 },
  ];
  return (
    <div className="grid gap-2">
      {skills.map((s) => (
        <div key={s.name} className="flex items-start gap-3 rounded-xl border border-border bg-card p-3">
          <span className="grid size-8 flex-none place-items-center rounded-lg bg-primary/10 text-primary">
            <Zap className="size-4" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold text-foreground">{s.name}</div>
            <div className="truncate text-[12px] text-muted-foreground">{s.desc}</div>
          </div>
          <div className="flex flex-none gap-2 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1"><FileText className="size-3" />{s.files}</span>
            <span className="flex items-center gap-1"><Bot className="size-3" />{s.agents}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------- vault */

export function VaultDemo() {
  const files = [
    { name: "brand-guidelines.pdf", cat: "Documents", size: "2.4 MB", icon: FileText, indexed: true },
    { name: "q3-finance.csv", cat: "Documents", size: "88 KB", icon: FileText, indexed: true },
    { name: "launch-hero.png", cat: "Images", size: "1.1 MB", icon: ImageIcon, indexed: false },
  ];
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        <HardDrive className="size-3.5 text-muted-foreground" />
        <span className="text-xs font-semibold text-foreground">Workspace files</span>
        <span className="ml-auto text-[11px] text-muted-foreground">3.6 MB of 5 GB used</span>
      </div>
      <ul className="divide-y divide-border">
        {files.map((f) => (
          <li key={f.name} className="flex items-center gap-2.5 px-3 py-2 text-sm">
            <f.icon className="size-4 text-muted-foreground" />
            <span className="flex-1 truncate text-foreground">{f.name}</span>
            {f.indexed ? (
              <Badge variant="secondary" className="text-[10px]">searchable</Badge>
            ) : null}
            <span className="font-mono text-[11px] text-muted-foreground">{f.size}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------------------------------------------------------- runtimes */

export function RuntimeListDemo() {
  const runtimes = [
    { name: "Liam's MacBook", kind: "Your own machine", state: "online" as const, agents: 2 },
    { name: "hosted-01", kind: "Platform-hosted", state: "online" as const, agents: 1 },
    { name: "build-box", kind: "Your own machine", state: "offline" as const, agents: 1 },
  ];
  const dot = { online: "bg-success", offline: "bg-muted-foreground/40" };
  const label = { online: "text-success", offline: "text-muted-foreground" };
  return (
    <div className="grid gap-2">
      {runtimes.map((r) => (
        <div key={r.name} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
          <span className="grid size-8 flex-none place-items-center rounded-lg bg-muted text-muted-foreground">
            {r.kind === "Platform-hosted" ? <Server className="size-4" /> : <FolderGit2 className="size-4" />}
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold text-foreground">{r.name}</div>
            <div className="text-[11px] text-muted-foreground">{r.kind}</div>
          </div>
          <span className="text-[11px] text-muted-foreground">{r.agents} agent{r.agents === 1 ? "" : "s"}</span>
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true" className={cn("size-1.5 rounded-full", dot[r.state])} />
            <span className={cn("text-[11px] font-medium", label[r.state])}>{r.state}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------- vault: scope & repos */

/** The three places a file can live, and who can reach it. */
export function VaultScopeDemo() {
  const scopes = [
    {
      label: "Workspace",
      note: "Everyone, and every agent",
      example: "Brand guidelines, the pricing sheet",
      icon: HardDrive,
    },
    {
      label: "Project",
      note: "Agents working on that project",
      example: "The launch plan, competitor research",
      icon: FolderGit2,
    },
    {
      label: "Attached to a story",
      note: "Whoever picks that story up",
      example: "The screenshot showing the bug",
      icon: FileText,
    },
  ];
  return (
    <div className="grid gap-2 sm:grid-cols-3">
      {scopes.map((s) => (
        <div key={s.label} className="rounded-xl border border-border bg-card p-3">
          <span className="grid size-7 place-items-center rounded-lg bg-primary/10 text-primary">
            <s.icon className="size-3.5" />
          </span>
          <div className="mt-2 text-sm font-semibold text-foreground">{s.label}</div>
          <div className="mt-0.5 text-[11px] text-muted-foreground">{s.note}</div>
          <div className="mt-2 border-t border-border pt-2 text-[12px] text-muted-foreground">{s.example}</div>
        </div>
      ))}
    </div>
  );
}

/** Repositories registered on a workspace. */
export function RepositoryDemo() {
  const repos = [
    { url: "github.com/acme/web", desc: "The marketing site and pricing page" },
    { url: "github.com/acme/api", desc: "Billing and plan management" },
  ];
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        <FolderGit2 className="size-3.5 text-muted-foreground" />
        <span className="text-xs font-semibold text-foreground">Repositories</span>
      </div>
      <ul className="divide-y divide-border">
        {repos.map((r) => (
          <li key={r.url} className="px-3 py-2.5">
            <div className="font-mono text-[12px] text-foreground">{r.url}</div>
            <div className="mt-0.5 text-[12px] text-muted-foreground">{r.desc}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------- runtimes: reach and states */

/** What an agent can touch, depending on where it runs. */
export function MachineReachDemo() {
  const rows = [
    { thing: "Stories, projects, comments", local: true, hosted: true },
    { thing: "Workspace files and knowledge", local: true, hosted: true },
    { thing: "Connected tools you attached", local: true, hosted: true },
    { thing: "Repositories registered on the workspace", local: true, hosted: true },
    { thing: "Files on your own disk", local: true, hosted: false },
    { thing: "Your local dev server, database, or VPN", local: true, hosted: false },
    { thing: "Keeps working when your laptop is shut", local: false, hosted: true },
  ];
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b border-border bg-muted/40 px-3 py-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Can reach</span>
        <span className="w-24 text-center font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          Your machine
        </span>
        <span className="w-20 text-center font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          Hosted
        </span>
      </div>
      {rows.map((r) => (
        <div key={r.thing} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b border-border px-3 py-2 last:border-0">
          <span className="text-[13px] text-muted-foreground">{r.thing}</span>
          <span className="w-24 text-center">{r.local ? <Check className="mx-auto size-4 text-success" /> : <X className="mx-auto size-4 text-muted-foreground/40" />}</span>
          <span className="w-20 text-center">{r.hosted ? <Check className="mx-auto size-4 text-success" /> : <X className="mx-auto size-4 text-muted-foreground/40" />}</span>
        </div>
      ))}
    </div>
  );
}

/** Machine states, and what each one means for work you've assigned. */
export function MachineStatesDemo() {
  const states = [
    { name: "Online", dot: "bg-success", text: "text-success", means: "Picking up work normally." },
    { name: "Starting", dot: "bg-info", text: "text-info", means: "Coming up. Work queued behind it will start shortly." },
    { name: "Pending", dot: "bg-warning", text: "text-warning", means: "Registered but has never checked in. Usually the daemon was never started." },
    { name: "Offline", dot: "bg-muted-foreground/40", text: "text-muted-foreground", means: "Stopped checking in. Its agents' work waits — nothing is lost or failed." },
    { name: "Error", dot: "bg-destructive", text: "text-destructive", means: "Failed to start or crashed. Check its activity log." },
  ];
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      {states.map((s) => (
        <div key={s.name} className="flex items-start gap-3 border-b border-border px-3 py-2.5 last:border-0">
          <span className="mt-1.5 flex w-20 flex-none items-center gap-1.5">
            <span aria-hidden="true" className={cn("size-1.5 rounded-full", s.dot)} />
            <span className={cn("text-[12px] font-medium", s.text)}>{s.name}</span>
          </span>
          <span className="text-[13px] text-muted-foreground">{s.means}</span>
        </div>
      ))}
    </div>
  );
}
