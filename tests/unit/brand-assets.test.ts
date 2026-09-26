// @vitest-environment node
import { readFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { describe, expect, it } from "vitest";

describe("brand assets", () => {
  it("has a 1200×630 Open Graph image", async () => {
    const { width, height, format } = await sharp(join(process.cwd(), "public", "og.png")).metadata();
    expect([width, height, format]).toEqual([1200, 630, "png"]);
  });

  it("has a 180×180 apple icon", async () => {
    const { width, height } = await sharp(join(process.cwd(), "src", "app", "apple-icon.png")).metadata();
    expect([width, height]).toEqual([180, 180]);
  });

  it("draws the positioning headline on the Open Graph image", () => {
    const script = readFileSync(join(process.cwd(), "scripts", "generate-brand-assets.mjs"), "utf8");
    expect(script).toContain('fill="#0b1c30">Do radar à</text>');
    expect(script).toContain('fill="#047857">proposta pronta.</text>');
    expect(script).toContain(">Licitações dos 645 municípios de SP e do estado</text>");
    expect(script).not.toContain("Você decide");
  });
});
