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

  it("counts decimal values with the Brazilian comma and keeps the decimal places", () => {
    expect(formatCountFrame("R$ 4,2M", 0)).toBe("R$ 0,0M");
    expect(formatCountFrame("R$ 4,2M", 0.5)).toBe("R$ 2,1M");
    expect(formatCountFrame("R$ 4,2M", 1)).toBe("R$ 4,2M");
    expect(formatCountFrame("34,8%", 0)).toBe("0,0%");
    expect(formatCountFrame("34,8%", 0.5)).toBe("17,4%");
    expect(formatCountFrame("34,8%", 1)).toBe("34,8%");
  });

  it("leaves text without a number untouched", () => {
    expect(formatCountFrame("Válida", 0.3)).toBe("Válida");
  });
});
