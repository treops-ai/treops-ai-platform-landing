"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@treops/ui/lib/utils";

/* ---------------------------------------------------------------- section */

/**
 * A titled block of an article. `title` must match the matching entry in the
 * page's `toc` in docs-nav.ts — the id is derived from it so "On this page"
 * links resolve.
 */
export function Section({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section id={slugify(title)} className="scroll-mt-20 mt-12 first:mt-0">
      <h2 className="text-xl font-bold tracking-tight text-foreground">{title}</h2>
      {intro ? <p className="mt-1.5 max-w-[64ch] text-sm leading-relaxed text-muted-foreground">{intro}</p> : null}
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Body copy inside a Section. Held to a comfortable measure. */
export function Prose({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("max-w-[64ch] text-sm leading-relaxed text-muted-foreground [&+&]:mt-3", className)}>
      {children}
    </p>
  );
}

/** Inline emphasis that lifts a term out of muted body copy. */
export function Term({ children }: { children: React.ReactNode }) {
  return <b className="font-semibold text-foreground">{children}</b>;
}

/** Inline code. */
export function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">{children}</code>
  );
}

/* ---------------------------------------------------------------- callout */

/** The bordered "✦" aside from the mockup. */
export function Callout({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn("flex gap-3 rounded-xl border p-4", className)}
      style={{
        borderColor: "color-mix(in oklch, var(--primary) 20%, transparent)",
        background: "color-mix(in oklch, var(--primary) 5%, transparent)",
      }}
    >
      <span
        aria-hidden="true"
        className="grid size-5 flex-none place-items-center rounded-[5px] border text-[11px] text-primary"
        style={{
          borderColor: "color-mix(in oklch, var(--primary) 20%, transparent)",
          background: "color-mix(in oklch, var(--primary) 10%, transparent)",
        }}
      >
        ✦
      </span>
      <p className="m-0 text-sm leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}

/* ------------------------------------------------------------- code block */

export function CodeBlock({ code, language = "bash" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable (insecure origin, denied permission) — leave the label alone */
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-3 py-1.5">
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{language}</span>
        <button
          type="button"
          onClick={copy}
          className="ml-auto inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
          {copied ? "copied" : "copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed text-foreground">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/* ----------------------------------------------------------------- tables */

/** Bordered reference table. Scrolls inside itself so the page never does. */
export function RefTable({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/40">
            {headers.map((h) => (
              <th
                key={h}
                className="whitespace-nowrap px-4 py-2.5 text-left font-mono text-[11px] uppercase tracking-wider font-medium text-muted-foreground"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border last:border-0">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={cn(
                    "px-4 py-3 align-top text-muted-foreground",
                    j === 0 && "font-medium text-foreground",
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** The two-column "Can / Cannot" grid. */
export function CanCannotTable({ can, cannot }: { can: string[]; cannot: string[] }) {
  const rows = Math.max(can.length, cannot.length);
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="grid grid-cols-2 border-b border-border bg-muted/40">
        <div className="border-r border-border px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider text-success">
          Can
        </div>
        <div className="px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider text-destructive">Cannot</div>
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="grid grid-cols-2 border-b border-border last:border-0">
          <div className="border-r border-border px-4 py-3 text-sm text-muted-foreground">{can[i] ?? ""}</div>
          <div className="px-4 py-3 text-sm text-muted-foreground">{cannot[i] ?? ""}</div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ cards */

/** The numbered 01 / 02 / 03 row. */
export function StepCards({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {steps.map((step, i) => (
        <div key={step.title} className="rounded-xl border border-border bg-card p-4">
          <div className="font-mono text-[11px] tracking-wider text-primary">
            {String(i + 1).padStart(2, "0")}
          </div>
          <div className="mt-2 text-sm font-semibold text-foreground">{step.title}</div>
          <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{step.body}</p>
        </div>
      ))}
    </div>
  );
}

/** Tile grid for capability / feature summaries. */
export function CardGrid({
  items,
  columns = 3,
}: {
  items: { title: string; body: string }[];
  columns?: 2 | 3;
}) {
  return (
    <div className={cn("grid gap-3", columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2")}>
      {items.map((item) => (
        <div key={item.title} className="rounded-xl border border-border bg-card p-4">
          <div className="text-sm font-semibold text-foreground">{item.title}</div>
          <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{item.body}</p>
        </div>
      ))}
    </div>
  );
}

/** Ticked list — the "right for you if" / "guarantees" pattern. */
export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            aria-hidden="true"
            className="mt-px grid size-[18px] flex-none place-items-center rounded-full text-[10px] text-primary"
            style={{ background: "color-mix(in oklch, var(--primary) 10%, transparent)" }}
          >
            ✓
          </span>
          <span className="text-sm leading-relaxed text-muted-foreground">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* --------------------------------------------------------------- figures */

/**
 * Stands in for a product capture we do not have yet. Deliberately looks
 * unfinished so it reads as a placeholder rather than a broken image.
 */
export function FigurePlaceholder({
  label,
  caption,
  dimensions = "2560×1440",
}: {
  label: string;
  caption: string;
  dimensions?: string;
}) {
  return (
    <figure className="m-0">
      <div
        className="grid place-items-center rounded-xl border border-dashed border-border px-6 py-14 text-center"
        style={{ background: "color-mix(in oklch, var(--canvas) 35%, var(--background))" }}
      >
        <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          Screenshot placeholder
        </div>
        <div className="mt-2 text-sm text-muted-foreground">{label}</div>
        <div className="mt-1 font-mono text-[11px] text-muted-foreground/70">{dimensions}</div>
      </div>
      <figcaption className="mt-2.5 text-xs text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}

/** Wraps a diagram with its caption, matching the figure treatment. */
export function Figure({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <figure className="m-0">
      <div
        className="overflow-x-auto rounded-xl border border-border p-5"
        style={{ background: "color-mix(in oklch, var(--canvas) 35%, var(--background))" }}
      >
        {children}
      </div>
      <figcaption className="mt-2.5 text-xs text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}

/* -------------------------------------------------------------- ui demos */

/**
 * Frames a live example built from the product's own components. Labelled so
 * a reader knows they're looking at the real interface, not an illustration.
 */
export function UiDemo({
  caption,
  children,
}: {
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="m-0">
      <div
        className="rounded-xl border border-border p-4"
        style={{ background: "color-mix(in oklch, var(--canvas) 35%, var(--background))" }}
      >
        <div className="mb-3 flex items-center gap-1.5">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            From the app
          </span>
        </div>
        <div className="overflow-x-auto">{children}</div>
      </div>
      <figcaption className="mt-2.5 text-xs text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}
