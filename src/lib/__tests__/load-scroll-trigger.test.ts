import { describe, expect, it } from "vitest";
import { loadScrollTrigger } from "../load-scroll-trigger";

describe("loadScrollTrigger", () => {
  it("returns GSAP with ScrollTrigger registered", async () => {
    const { gsap, ScrollTrigger } = await loadScrollTrigger();
    expect(typeof ScrollTrigger.create).toBe("function");
    expect(ScrollTrigger.getAll()).toEqual([]);
    expect(typeof gsap.to).toBe("function");
  });
});
