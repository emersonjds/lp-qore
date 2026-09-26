interface MobileScreenshot {
  image: string;
  title: string;
  alt: string;
}

export const mobileScreenshots = {
  managerDashboard: {
    image: "manager-dashboard",
    title: "Painel do gestor",
    alt: "Painel do gestor no celular com valor ganho, licitações ganhas, taxa de vitória, valor em disputa e sessões do mês, com dados de demonstração",
  },
  radar: {
    image: "radar",
    title: "Radar",
    alt: "Radar de licitações no celular com cartões de oportunidades, valor estimado e prazo final, com dados de demonstração",
  },
  documents: {
    image: "documents",
    title: "Documentos",
    alt: "Tela de documentos no celular com contagem de certidões válidas, vencendo, vencidas e pendentes, com dados de demonstração",
  },
} as const satisfies Record<string, MobileScreenshot>;
