import type { LegalIdentity } from "@/types";

export const isLegalIdentityComplete = (legal: LegalIdentity): boolean =>
  Object.values(legal).every((value) => value.trim() !== "");

export const hasFooterLegalLine = ({ companyName, taxId, city, state }: LegalIdentity): boolean =>
  [companyName, taxId, city, state].every((value) => value.trim() !== "");
