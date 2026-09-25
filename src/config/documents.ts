import type { Certificate } from "@/types";

export const documentsContent = {
  eyebrow: "Documentos e certidões",
  title: "Documentos e certidões em dia",
  description:
    "A Qore consulta as certidões nos órgãos emissores e avisa antes de vencer. A habilitação não cai por documento vencido.",
  listTitle: "Certidões",
  listLabel: "Certidões da empresa",
} as const;

export const certificates: readonly Certificate[] = [
  { name: "CND Federal", issuer: "RFB/PGFN", status: "valid", statusLabel: "Válida" },
  { name: "CRF/FGTS", issuer: "Caixa", status: "valid", statusLabel: "Válida" },
  { name: "CNDT", issuer: "TST", status: "expiring", statusLabel: "Vence em 12 dias" },
  { name: "CEIS/CNEP", issuer: "CGU", status: "valid", statusLabel: "Válida" },
  { name: "Certidão estadual", issuer: "SEFAZ-SP", status: "expired", statusLabel: "Vencida" },
  { name: "SICAF", issuer: "Governo federal", status: "valid", statusLabel: "Válida" },
];
