import { describe, expect, it } from "vitest";
import { formatBrazilianPhone, isValidBrazilianPhone } from "../phone";

describe("formatBrazilianPhone", () => {
  it.each([
    ["", ""],
    ["1", "(1"],
    ["11", "(11"],
    ["1198", "(11) 98"],
    ["119876", "(11) 9876"],
    ["1198765", "(11) 9876-5"],
    ["1134567890", "(11) 3456-7890"],
    ["11987654321", "(11) 98765-4321"],
    ["(11) 98765-4321 ramal 2", "(11) 98765-4321"],
  ])("formats %j as %j", (input, expected) => {
    expect(formatBrazilianPhone(input)).toBe(expected);
  });
});

describe("isValidBrazilianPhone", () => {
  it.each([
    ["(11) 98765-4321", true],
    ["(11) 3456-7890", true],
    ["(11) 88765-4321", false],
    ["(01) 98765-4321", false],
    ["(10) 98765-4321", false],
    ["(11) 9876-543", false],
  ])("judges %j as %s", (input, expected) => {
    expect(isValidBrazilianPhone(input)).toBe(expected);
  });
});
