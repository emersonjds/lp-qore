export const documentsContent = {
  eyebrow: "Documentos e certidões",
  title: "Certidões monitoradas, habilitação sem surpresa",
  description: "A Qore consulta RFB/PGFN, Caixa, TST, CGU e SICAF e avisa antes de cada certidão vencer.",
  certificateChecks: [
    { name: "CND Federal", status: "Válida", isExpiring: false },
    { name: "CRF do FGTS", status: "Válida", isExpiring: false },
    { name: "CNDT", status: "Vence em 12 dias", isExpiring: true },
  ],
} as const;

