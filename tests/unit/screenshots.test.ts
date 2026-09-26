// @vitest-environment node
import { join } from "node:path";
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import { mobileScreenshots } from "@/config/screenshots";

const FORMATS = [
  ["avif", "heif"],
  ["webp", "webp"],
] as const;

const desktopCases = ["manager-dashboard", "radar", "search", "pricing", "calendar"].flatMap((image) =>
  [640, 1280].flatMap((width) =>
    FORMATS.map(([extension, format]) => ({
      file: `${image}-${width}.${extension}`,
      width,
      height: (width * 10) / 16,
      format,
    })),
  ),
);

const mobileCases = Object.values(mobileScreenshots).flatMap(({ image }) =>
  [390, 780].flatMap((width) =>
    FORMATS.map(([extension, format]) => ({
      file: `${image}-mobile-${width}.${extension}`,
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
