// @vitest-environment node
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const stylesheet = readFileSync(join(process.cwd(), "src", "app", "globals.css"), "utf8");

const blockAfter = (source: string, start: number): string => {
  const open = source.indexOf("{", start);
  let depth = 0;
  for (let index = open; index < source.length; index += 1) {
    if (source[index] === "{") depth += 1;
    if (source[index] === "}") depth -= 1;
    if (depth === 0) return source.slice(open + 1, index);
  }
  return source.slice(open + 1);
};

const blocksOf = (header: RegExp): string[] =>
  [...stylesheet.matchAll(header)].map((match) => blockAfter(stylesheet, match.index));

const motionAllowedBlocks = blocksOf(/@media[^{]*prefers-reduced-motion: no-preference[^{]*/g).join("\n");

describe("motion styles", () => {
  it("animates keyframes only with opacity and transform", () => {
    const properties = blocksOf(/@keyframes [\w-]+\s*/g).flatMap((block) =>
      [...block.matchAll(/([\w-]+)\s*:/g)].map((match) => match[1]),
    );
    expect(properties.length).toBeGreaterThan(0);
    expect(properties.filter((property) => property !== "opacity" && property !== "transform")).toEqual([]);
  });

  it.each(["[data-proposal-progress][data-revealed]", "[data-certificates][data-revealed]", "[data-before-after][data-revealed] [data-after]::before", "[data-coverage-map][data-revealed]", "[data-hero-glow]", '[data-slot="button"][data-variant="default"]:hover::after', "[data-mobile-cta]", "[data-motion-label]", '[data-cta="hero-primary"]', "[data-screen-active] [data-bar]", "[data-screen-active] [data-day-lit]"])(
    "runs the %s entrance only for users who accept motion",
    (selector) => {
      expect(motionAllowedBlocks).toContain(selector);
    },
  );
});
