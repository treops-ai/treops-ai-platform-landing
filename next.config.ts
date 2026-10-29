import type { NextConfig } from "next";
import { resolve } from "path";

// Standalone output for the production Docker image. In a pnpm monorepo, Next must
// trace files from the repo root, so pin outputFileTracingRoot.
const nextConfig: NextConfig = {
  ...(process.env.STANDALONE === "true"
    ? {
        output: "standalone" as const,
        outputFileTracingRoot: resolve(__dirname, "../../../"),
      }
    : {}),
  transpilePackages: ["@treops/core", "@treops/ui", "@treops/views"],
  // Match the web app: RocksDB dev cache grows unbounded, in-memory is enough here.
  experimental: {
    turbopackFileSystemCacheForDev: false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 80, 85],
  },
  // Landing is a pure marketing site — it makes NO API calls, so no rewrites().
};

export default nextConfig;
