// @vitest-environment node
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const stylesheet = readFileSync(join(process.cwd(), "src", "app", "globals.css"), "utf8");

describe("globals.css", () => {
  it("uses the Institutional Clarity emerald as primary", () => {
    expect(stylesheet).toContain("--color-primary: #047857;");
    expect(stylesheet).toContain("--color-primary-hover: #065f46;");
  });

  it("declares the Stitch surface ladder used for section alternation and simulated screens", () => {
    expect(stylesheet).toContain("--color-foreground: #0b1c30;");
    expect(stylesheet).toContain("--color-surface-low: #eff4ff;");
    expect(stylesheet).toContain("--color-surface-container: #e5eeff;");
    expect(stylesheet).toContain("--color-surface-container-high: #dce9ff;");
    expect(stylesheet).toContain("--color-primary-fixed: #97f5cc;");
    expect(stylesheet).toContain("--color-primary-deep: #005d42;");
  });

  it("declares the display font token", () => {
    expect(stylesheet).toContain("--font-display: var(--font-hanken-grotesk)");
  });

  it("declares the headline scale", () => {
    expect(stylesheet).toContain("--text-headline-xl: 2.5rem;");
    expect(stylesheet).toContain("--text-headline-xl-mobile: 1.875rem;");
  });

  it("imports no external stylesheet", () => {
    expect(stylesheet).not.toMatch(/@import\s+url\(/);
    expect(stylesheet).not.toContain("http");
  });

  it("draws the dual focus ring outside any cascade layer", () => {
    expect(stylesheet).toContain(
      ":focus-visible {\n  outline: 2px solid transparent;\n  box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px var(--color-ring);\n}",
    );
  });
});
