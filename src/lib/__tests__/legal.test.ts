import { describe, expect, it } from "vitest";
import { isLegalIdentityComplete } from "../legal";

const complete = {
  companyName: "Qore Tecnologia Ltda.",
  taxId: "11.222.333/0001-81",
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
