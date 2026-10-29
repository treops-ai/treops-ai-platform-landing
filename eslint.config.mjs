import nextConfig from "@treops/eslint-config/next";

export default [
  ...nextConfig,
  { ignores: [".next/"] },
];
