import { Landmark, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface IntegrationGroup {
  icon: LucideIcon;
  title: string;
  names: readonly string[];
}

export const integrationsContent = {
  eyebrow: "Integrações",
  title: "Os maiores portais de compras públicas em um só lugar",
  description: "Licitações de órgãos estaduais e municipais de São Paulo, dos principais portais, em um só lugar.",
} as const;

export const integrationGroups: readonly IntegrationGroup[] = [
  {
    icon: Landmark,
    title: "Portais de licitação",
    names: [
      "PNCP",
      "Compras.gov.br (ComprasNet)",
      "BEC/SP",
      "BLL Compras",
      "Bolsa Nacional de Compras (BNC)",
      "Licitações-e (Banco do Brasil)",
      "Portal de Compras Públicas",
      "Licitar Digital",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Certidões e cadastros consultados",
    names: ["CND Federal (RFB/PGFN)", "CRF/FGTS (Caixa)", "CNDT (TST)", "CEIS/CNEP (CGU)", "SICAF"],
  },
];
