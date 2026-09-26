import { describe, expect, it } from "vitest";
import { staggerStyle } from "../stagger-style";

describe("staggerStyle", () => {
  it("exposes the position in the sequence as a CSS custom property", () => {
    expect(staggerStyle(2)).toEqual({ "--order": 2 });
  });
});
