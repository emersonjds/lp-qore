import { resolveSiteUrl } from "@/lib/site-url";
import type { LegalIdentity } from "@/types";

interface SiteConfig {
  name: string;
  slogan: string;
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  url: string;
  legal: LegalIdentity;
}

export const siteConfig: SiteConfig = {
  name: "Qore",
  slogan: "Sua operação de licitação em um lugar.",
  title: "Qore | Licitações de São Paulo, do radar à proposta",
  description:
    "Plataforma de licitações para quem vende ao governo em SP: radar pelo CNPJ, resumo do edital com IA, proposta ~80% pronta, certidões e prazos da equipe.",
  ogTitle: "Qore: licitações de SP, do radar à proposta pronta",
  ogDescription:
    "Radar pelo CNPJ, resumo do edital com IA, proposta ~80% pronta, certidões e prazos. Os 645 municípios de SP.",
  url: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  legal: {
    companyName: "",
    taxId: "",
    city: "",
    state: "",
    contactEmail: "",
    dataProtectionOfficer: "",
  },
};
