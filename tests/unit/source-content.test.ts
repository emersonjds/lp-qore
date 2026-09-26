// @vitest-environment node
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { FORBIDDEN_TERMS } from "../forbidden-terms";

const SOURCE_DIRECTORY = join(process.cwd(), "src");

const listSourceFiles = (): string[] =>
  readdirSync(SOURCE_DIRECTORY, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && /\.(ts|tsx|css)$/.test(entry.name))
    .map((entry) => join(entry.parentPath, entry.name));

describe("source content", () => {
  it.each(FORBIDDEN_TERMS)("never mentions %s", (term) => {
    const offenders = listSourceFiles().filter((file) =>
      readFileSync(file, "utf8").toLowerCase().includes(term.toLowerCase()),
    );
    expect(offenders).toEqual([]);
  });

  it("keeps no panel screenshots nor their capture script", () => {
    const root = process.cwd();
    expect(existsSync(join(root, "docs", "design", "screenshots"))).toBe(false);
    expect(existsSync(join(root, "scripts", "capture-screenshots.mjs"))).toBe(false);
    expect(readFileSync(join(root, "package.json"), "utf8")).not.toContain("screenshots:capture");
    expect(readFileSync(join(root, "netlify.toml"), "utf8")).not.toContain("/screenshots/");
    expect(readFileSync(join(root, "README.md"), "utf8")).not.toContain("screenshots");
  });

  it("has no /login route", () => {
    expect(existsSync(join(SOURCE_DIRECTORY, "app", "login"))).toBe(false);
  });

  it("publishes no software offer in structured data", () => {
    const structuredData = readFileSync(join(SOURCE_DIRECTORY, "lib", "structured-data.ts"), "utf8");
    expect(structuredData).not.toContain("SoftwareApplication");
    expect(structuredData).not.toContain("Offer");
  });
});
