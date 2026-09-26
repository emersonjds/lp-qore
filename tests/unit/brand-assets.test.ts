// @vitest-environment node
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
});
