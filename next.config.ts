import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  experimental: {
    inlineCss: true,
  },
  turbopack: {
    resolveAlias: {
      "../build/polyfills/polyfill-module": "./src/lib/shims/empty-module.ts",
      "next/dist/build/polyfills/polyfill-module": "./src/lib/shims/empty-module.ts",
    },
  },
};

export default nextConfig;
