import { resolveSiteUrl } from "@/lib/site-url";
import type { LegalIdentity } from "@/types";

interface SiteConfig {
  name: string;
  slogan: string;
  description: string;
  url: string;
  legal: LegalIdentity;
}

export const siteConfig: SiteConfig = {
  name: "Qore",
  slogan: "A IA lê o edital. Você decide.",
  description:
    "Encontre licitações de São Paulo pelo seu CNPJ, entenda o edital com um resumo de IA que cita a página de origem e monte sua proposta com segurança.",
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
