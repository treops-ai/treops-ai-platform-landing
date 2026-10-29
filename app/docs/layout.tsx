import type { Metadata } from "next";
import { DocsShell } from "@/components/docs/docs-shell";

export const metadata: Metadata = {
  title: {
    default: "Documentation",
    template: "%s | TreOps Docs",
  },
  description:
    "Documentation for TreOps — the open-source AI operations platform where agents run work through a governed loop with human checkpoints.",
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <DocsShell>{children}</DocsShell>;
}
