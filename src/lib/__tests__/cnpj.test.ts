import { describe, expect, it } from "vitest";
import { formatCnpj, isValidCnpj } from "../cnpj";

describe("formatCnpj", () => {
  it("masks digits progressively and drops anything past 14 digits", () => {
    expect(formatCnpj("")).toBe("");
    expect(formatCnpj("12")).toBe("12");
    expect(formatCnpj("12345")).toBe("12.345");
    expect(formatCnpj("12345678")).toBe("12.345.678");
    expect(formatCnpj("123456780001")).toBe("12.345.678/0001");
    expect(formatCnpj("33000167000101999")).toBe("33.000.167/0001-01");
  });
});

describe("isValidCnpj", () => {
  it("accepts a real CNPJ with or without the mask", () => {
    expect(isValidCnpj("33.000.167/0001-01")).toBe(true);
    expect(isValidCnpj("33000167000101")).toBe(true);
  });

  it("rejects wrong check digits, wrong length and repeated digits", () => {
    expect(isValidCnpj("33.000.167/0001-02")).toBe(false);
    expect(isValidCnpj("3300016700010")).toBe(false);
    expect(isValidCnpj("11111111111111")).toBe(false);
  });
});
