import type { MarketNumber } from "@/types";

export const marketNumbersTitle = "O governo é o maior comprador do país. A sua empresa está vendo as oportunidades a tempo?";

export const marketNumbers: readonly MarketNumber[] = [
  {
    value: "7.650",
    label: "pregões eletrônicos publicados em São Paulo em 30 dias",
    source: "PNCP — API de consulta",
    date: "26/08 a 25/09/2026",
  },
  {
    value: "R$ 33 bi",
    label: "em compras do Governo do Estado de São Paulo por ano",
    source: "Portal de Compras do Governo de SP",
    date: "consulta em 26/09/2026",
  },
  {
    value: "R$ 42,4 bi",
    label: "vendidos por pequenos negócios ao governo em 2022",
    source: "Agência Sebrae de Notícias",
    date: "2023",
  },
  {
    value: "12% do PIB",
    label: "é o tamanho das compras públicas no Brasil",
    source: "IPEA",
    date: "2019",
  },
];
