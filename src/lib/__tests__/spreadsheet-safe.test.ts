import { describe, expect, it } from "vitest";
import { toSpreadsheetSafe } from "../spreadsheet-safe";

describe("toSpreadsheetSafe", () => {
  it("prefixes an apostrophe to values a spreadsheet would run as a formula", () => {
    expect(toSpreadsheetSafe("=HYPERLINK(\"x\")")).toBe("'=HYPERLINK(\"x\")");
    expect(toSpreadsheetSafe("+5511")).toBe("'+5511");
    expect(toSpreadsheetSafe("-1+1")).toBe("'-1+1");
    expect(toSpreadsheetSafe("@SUM(A1)")).toBe("'@SUM(A1)");
    expect(toSpreadsheetSafe("\t=1")).toBe("'\t=1");
    expect(toSpreadsheetSafe("\r=1")).toBe("'\r=1");
  });

  it("keeps ordinary values untouched", () => {
    expect(toSpreadsheetSafe("Maria Souza")).toBe("Maria Souza");
    expect(toSpreadsheetSafe("(11) 98765-4321")).toBe("(11) 98765-4321");
    expect(toSpreadsheetSafe("")).toBe("");
  });
});
