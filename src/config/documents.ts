export const documentsContent = {
  eyebrow: "Documentos e certidões",
  title: "Documentos e certidões em dia",
  description:
    "A Qore consulta as certidões nos órgãos emissores e avisa antes de vencer. A habilitação não cai por documento vencido.",
  certificateChecks: [
    { name: "CND Federal", status: "Válida", isExpiring: false },
    { name: "CRF do FGTS", status: "Válida", isExpiring: false },
    { name: "CNDT", status: "Vence em 12 dias", isExpiring: true },
  ],
} as const;

