import type { LegalIdentity } from "@/types";

export const isLegalIdentityComplete = (legal: LegalIdentity): boolean =>
  Object.values(legal).every((value) => value.trim() !== "");
