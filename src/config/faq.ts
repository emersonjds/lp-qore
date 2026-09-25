import type { FAQItem } from "@/types";

export const faqItems: FAQItem[] = [
  {
    question: "Quanto tempo leva para começar?",
    answer:
      "Cerca de 5 minutos. Você informa o CNPJ, a plataforma busca os dados automaticamente na Receita Federal, você envia o certificado digital eCNPJ/eCPF e o sistema já configura os primeiros alertas de licitações compatíveis com o seu perfil — tudo no mesmo cadastro.",
  },
  {
    question: "Como funciona a Análise de Compatibilidade?",
    answer:
      "A IA cruza os itens do edital com o seu catálogo de produtos e serviços e gera um percentual de match (ex.: 87%). Você vê quais itens do edital estão no seu catálogo, as palavras-chave encontradas e um resumo de compatibilidade antes de decidir participar.",
  },
  {
    question: "Quais portais e validações estão integrados?",
    answer:
      "São 30+ integrações: portais PNCP, Compras.gov.br, BEC/SP, Licitações-e (BB), BLL Compras, BNCP, Licitar Digital e Portal de Compras Públicas. Validação documental automática via Receita Federal (CNPJ), PGFN, SERPRO, Cartórios Eletrônicos (SERTI), TCU e CNJ Federal.",
  },
  {
    question: "O Qore atende à Lei 14.133/2021?",
    answer:
      "Sim. A plataforma está alinhada com a nova Lei de Licitações. Os checklists de habilitação e os alertas de modalidade (pregão eletrônico, concorrência, diálogo competitivo) seguem as regras da 14.133 e da regulamentação federal vigente.",
  },
  {
    question: "O catálogo de produtos é obrigatório?",
    answer:
      "Não é obrigatório para usar a plataforma, mas sem catálogo a Análise de Compatibilidade não roda. Sem ele, você visualiza editais apenas por filtro (UF, modalidade, valor). Com o catálogo, cada licitação nova ganha um % de match automático e lista os itens onde você é elegível.",
  },
  {
    question: "O wizard de proposta gera PDF?",
    answer:
      "Sim. Na etapa 6 (Revisão) você pré-visualiza o PDF final da proposta antes do envio. Após a revisão, a plataforma encaminha o documento para o portal correto — PNCP, Compras.gov.br ou o portal estadual integrado.",
  },
];
