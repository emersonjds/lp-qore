import { describe, expect, it } from "vitest";
import { hasFooterLegalLine, isLegalIdentityComplete } from "../legal";

const complete = {
  companyName: "Qore Tecnologia Ltda.",
  taxId: "11.222.333/0001-81",
  city: "São Paulo",
  state: "SP",
  contactEmail: "privacidade@qore.com.br",
  dataProtectionOfficer: "Encarregado de dados",
};

describe("isLegalIdentityComplete", () => {
  it("is true when every field is filled", () => {
    expect(isLegalIdentityComplete(complete)).toBe(true);
  });

  it("is false while any field is blank", () => {
    expect(isLegalIdentityComplete({ ...complete, taxId: "  " })).toBe(false);
  });
});

describe("hasFooterLegalLine", () => {
  it("is true with company name, CNPJ, city and state even without contact or DPO", () => {
    expect(hasFooterLegalLine({ ...complete, contactEmail: "", dataProtectionOfficer: "" })).toBe(true);
  });

  it("is false while the company name, CNPJ, city or state is blank", () => {
    expect(hasFooterLegalLine({ ...complete, companyName: "" })).toBe(false);
    expect(hasFooterLegalLine({ ...complete, taxId: " " })).toBe(false);
    expect(hasFooterLegalLine({ ...complete, city: "" })).toBe(false);
    expect(hasFooterLegalLine({ ...complete, state: "" })).toBe(false);
  });
});
