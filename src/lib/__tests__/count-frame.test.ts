import { describe, expect, it } from "vitest";
import { formatCountFrame } from "../count-frame";

describe("formatCountFrame", () => {
  it("counts the number inside the text and keeps prefix and suffix", () => {
    expect(formatCountFrame("~174 mil", 0)).toBe("~0 mil");
    expect(formatCountFrame("~174 mil", 0.5)).toBe("~87 mil");
    expect(formatCountFrame("~174 mil", 1)).toBe("~174 mil");
  });

  it("keeps the Brazilian thousands separator", () => {
    expect(formatCountFrame("3.817", 0.5)).toBe("1.909");
    expect(formatCountFrame("3.817", 1)).toBe("3.817");
  });

  it("counts percentages", () => {
    expect(formatCountFrame("87%", 0)).toBe("0%");
  });

  it("leaves text without a number untouched", () => {
    expect(formatCountFrame("Válida", 0.3)).toBe("Válida");
  });
});
