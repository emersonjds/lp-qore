// @vitest-environment node
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const appDirectory = join(process.cwd(), "src", "app");

describe("app icon", () => {
  it("is the emerald rounded square with the light-green dot", () => {
    const icon = readFileSync(join(appDirectory, "icon.svg"), "utf8");
    expect(icon).toContain('fill="#047857"');
    expect(icon).toContain('fill="#34d399"');
    expect(icon).toMatch(/^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" viewBox="0 0 48 48">/);
  });

  it("replaces the old favicon", () => {
    expect(existsSync(join(appDirectory, "favicon.ico"))).toBe(false);
  });
});
