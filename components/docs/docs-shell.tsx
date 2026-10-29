"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { BambooMark } from "@treops/ui/components/treops";
import { cn } from "@treops/ui/lib/utils";
import { docsGroups, docsHref, resolvePage, siblings } from "./docs-nav";
import { slugify } from "./docs-primitives";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.treops.ai";
const GITHUB_URL = "https://github.com/treops-ai/treops-ai-platform";

/** "/docs" -> "", "/docs/loops" -> "loops" */
function slugFromPathname(pathname: string): string {
  return pathname.replace(/^\/docs\/?/, "").replace(/\/$/, "");
}

export function DocsShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const slug = slugFromPathname(pathname);
  const page = resolvePage(slug);
  const { prev, next } = siblings(page.slug);

  return (
    // The root layout puts `overflow-hidden` on <body> so the landing page can
    // own its own scroller. Docs re-establish a scrolling context here, and
    // keep the id LandingNavbar listens on so shared chrome still works.
    <div id="scroll-root" className="h-full overflow-y-auto">
      <DocsHeader />

      <div className="mx-auto grid max-w-[1440px] items-start lg:grid-cols-[250px_minmax(0,1fr)] xl:grid-cols-[250px_minmax(0,1fr)_208px]">
        <DocsSidebar activeSlug={page.slug} />

        <article className="min-w-0 px-6 py-9 md:px-10 lg:px-13">
          <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
            <span>{page.group}</span>
            <span className="opacity-40">/</span>
            <span className="text-foreground">{page.title}</span>
            <span className="ml-auto rounded-full border border-border px-2.5 py-0.5 font-mono text-[11px]">
              {page.meta}
            </span>
          </div>

          <div className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
            <span
              aria-hidden="true"
              className="grid size-5 place-items-center rounded-[5px] border"
              style={{
                borderColor: "color-mix(in oklch, var(--primary) 20%, transparent)",
                background: "color-mix(in oklch, var(--primary) 8%, transparent)",
              }}
            >
              ◈
            </span>
            {page.kicker}
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground">{page.title}</h1>
          <p className="mt-3.5 max-w-[64ch] text-lg leading-relaxed text-muted-foreground text-pretty">
            {page.lead}
          </p>

          <div className="mt-8">{children}</div>

          <nav className="mt-16 grid gap-3 sm:grid-cols-2">
            {prev ? (
              <Link
                href={docsHref(prev.slug)}
                className="rounded-xl border border-border px-4 py-3.5 transition-colors hover:bg-accent/50"
              >
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <ArrowLeft className="size-3" /> Previous
                </div>
                <div className="mt-0.5 text-sm font-semibold text-primary">{prev.title}</div>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={docsHref(next.slug)}
                className="rounded-xl border border-border px-4 py-3.5 text-right transition-colors hover:bg-accent/50 sm:col-start-2"
              >
                <div className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
                  Next <ArrowRight className="size-3" />
                </div>
                <div className="mt-0.5 text-sm font-semibold text-primary">{next.title}</div>
              </Link>
            ) : null}
          </nav>
        </article>

        <aside className="sticky top-14 hidden max-h-[calc(100vh-3.5rem)] overflow-y-auto py-9 pr-6 xl:block">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            On this page
          </div>
          <ul className="grid gap-2 border-l border-border">
            {page.toc.map((item) => (
              <li key={item}>
                <a
                  href={`#${slugify(item)}`}
                  className="-ml-px block border-l border-transparent pl-3 text-xs leading-snug text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={`${GITHUB_URL}/tree/main/frontend/apps/landing/app/docs`}
            target="_blank"
            rel="noreferrer"
            className="mt-6 block border-t border-border pt-4 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Edit this page
            <span className="mt-0.5 block text-[11px] opacity-70">Docs are open source — send a PR.</span>
          </a>
        </aside>
      </div>
    </div>
  );
}

function DocsHeader() {
  return (
    <header
      className="sticky top-0 z-20 flex h-14 items-center gap-3.5 border-b border-border px-5 backdrop-blur-md"
      style={{ background: "color-mix(in oklch, var(--background) 88%, transparent)" }}
    >
      <Link
        href="/"
        className="flex items-center gap-2.5 text-base font-bold tracking-tight text-foreground"
      >
        <BambooMark className="size-[22px] text-primary" />
        TreOps <span className="text-[13px] font-medium tracking-normal text-muted-foreground">Docs</span>
      </Link>

      {/* Presentational for now — there is no search index behind it yet. */}
      <div
        className="ml-4 hidden h-8 max-w-[340px] flex-1 items-center gap-2 rounded-lg border border-border px-2.5 md:flex"
        style={{ background: "color-mix(in oklch, var(--muted) 55%, transparent)" }}
      >
        <Search className="size-3.5 text-muted-foreground" />
        <span className="flex-1 text-[12.5px] text-muted-foreground">Search the docs…</span>
        <kbd className="rounded border border-border bg-background px-1.5 py-px font-mono text-[10px] text-muted-foreground">
          ⌘K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-3.5">
        <Link href="/" className="hidden text-[13px] font-medium text-muted-foreground hover:text-foreground sm:block">
          Platform
        </Link>
        <span className="hidden text-[13px] font-medium text-foreground sm:block">Docs</span>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="hidden text-[13px] font-medium text-muted-foreground hover:text-foreground sm:block"
        >
          GitHub
        </a>
        <a
          href={APP_URL}
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-[13px] font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Open app
        </a>
      </div>
    </header>
  );
}

function DocsSidebar({ activeSlug }: { activeSlug: string }) {
  return (
    <nav
      className="sticky top-14 hidden max-h-[calc(100vh-3.5rem)] flex-col gap-5 overflow-y-auto border-r border-border px-4 pb-16 pt-6 lg:flex"
      style={{ background: "color-mix(in oklch, var(--canvas) 40%, var(--background))" }}
    >
      {docsGroups().map(({ group, pages }) => (
        <div key={group} className="flex flex-col gap-0.5">
          <div className="px-2.5 pb-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            {group}
          </div>
          {pages.map((p) => {
            const isActive = p.slug === activeSlug;
            return (
              <Link
                key={p.slug}
                href={docsHref(p.slug)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "rounded-lg px-2.5 py-1.5 text-[13px] transition-colors",
                  isActive
                    ? "bg-primary/10 font-semibold text-primary"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                )}
              >
                {p.title}
              </Link>
            );
          })}
        </div>
      ))}
      <div className="border-t border-border px-2.5 pt-3 text-[11.5px] leading-relaxed text-muted-foreground">
        AGPL-3.0 · self-hostable
        <br />
        docs.treops.ai
      </div>
    </nav>
  );
}
