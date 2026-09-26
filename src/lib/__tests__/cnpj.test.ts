import { describe, expect, it } from "vitest";
import { formatCnpj, isValidCnpj } from "../cnpj";

describe("formatCnpj", () => {
  it("masks digits progressively and drops anything past 14 digits", () => {
    expect(formatCnpj("")).toBe("");
    expect(formatCnpj("12")).toBe("12");
    expect(formatCnpj("12345")).toBe("12.345");
    expect(formatCnpj("12345678")).toBe("12.345.678");
    expect(formatCnpj("123456780001")).toBe("12.345.678/0001");
    expect(formatCnpj("00000000000191999")).toBe("00.000.000/0001-91");
  });
});

describe("isValidCnpj", () => {
  it("accepts a real CNPJ with or without the mask", () => {
    expect(isValidCnpj("00.000.000/0001-91")).toBe(true);
    expect(isValidCnpj("33000167000101")).toBe(true);
  });

  it("rejects wrong check digits, wrong length and repeated digits", () => {
    expect(isValidCnpj("00.000.000/0001-92")).toBe(false);
    expect(isValidCnpj("0000000000019")).toBe(false);
    expect(isValidCnpj("11111111111111")).toBe(false);
  });
});
