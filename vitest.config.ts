import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}", "tests/unit/**/*.test.ts"],
    coverage: {
      provider: "v8",
      include: ["src/lib/**", "src/components/**", "src/hooks/**"],
      exclude: ["src/components/ui/**", "**/*.test.{ts,tsx}", "src/**/__tests__/**"],
      thresholds: { statements: 91, branches: 91, functions: 91, lines: 91 },
    },
  },
});
