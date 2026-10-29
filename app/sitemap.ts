import type { MetadataRoute } from "next";
import { DOCS_PAGES, docsHref } from "@/components/docs/docs-nav";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://treops.ai";

  return [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...DOCS_PAGES.map((page) => ({
      url: `${baseUrl}${docsHref(page.slug)}`,
      changeFrequency: "weekly" as const,
      // The docs entry point outranks the individual pages.
      priority: page.slug === "" ? 0.8 : 0.6,
    })),
  ];
}
