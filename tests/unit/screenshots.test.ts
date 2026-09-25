// @vitest-environment node
import { join } from "node:path";
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import { platformTabs } from "@/config/home-content";
import { MOBILE_SCREENSHOTS } from "@/config/screenshots";

const FORMATS = [
  ["avif", "heif"],
  ["webp", "webp"],
] as const;

const desktopCases = platformTabs.flatMap((tab) =>
  [640, 1280].flatMap((width) =>
    FORMATS.map(([extension, format]) => ({
      file: `${tab.image}-${width}.${extension}`,
      width,
      height: (width * 10) / 16,
      format,
    })),
  ),
);

const mobileCases = MOBILE_SCREENSHOTS.flatMap((name) =>
  [390, 780].flatMap((width) =>
    FORMATS.map(([extension, format]) => ({
      file: `${name}-mobile-${width}.${extension}`,
      width,
      height: (width * 844) / 390,
      format,
    })),
  ),
);

const readMetadata = async (file: string) => {
  const metadata = await sharp(join(process.cwd(), "public", "screenshots", file)).metadata();
  return [metadata.width, metadata.height, metadata.format];
};

describe("platform screenshots", () => {
  it.each(desktopCases)("$file is a $width px wide 16:10 image", async ({ file, width, height, format }) => {
    expect(await readMetadata(file)).toEqual([width, height, format]);
  });

  it.each(mobileCases)("$file is a $width px wide phone-sized image", async ({ file, width, height, format }) => {
    expect(await readMetadata(file)).toEqual([width, height, format]);
  });
});
