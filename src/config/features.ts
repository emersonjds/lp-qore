import {
  BrainCircuit,
  Search,
  ListChecks,
  ShieldCheck,
  PackageSearch,
  Plug,
} from "lucide-react";
import type { Feature } from "@/types";

export const features: Feature[] = [
  {
    icon: BrainCircuit,
    title: "Análise de Compatibilidade com IA",
    description:
      "Cruzamos seu catálogo com cada edital e mostramos o % de match. Você só investe tempo em licitação que faz sentido para o seu negócio.",
  },
  {
    icon: Search,
    title: "Busca contextual com IA",
    description:
      "Digite o que vende e a IA expande o vocabulário do seu segmento. Encontre editais que keyword puro perderia.",
  },
  {
    icon: ListChecks,
    title: "Wizard de proposta em 6 etapas",
    description:
      "Identificação, Itens, Precificação, Condições, Documentos, Revisão. Cada etapa guiada, sem ficar perdido em planilha.",
  },
  {
    icon: ShieldCheck,
    title: "Validação automática de documentos",
    description:
      "Receita Federal, PGFN, SERPRO e Cartórios validam suas certidões em segundo plano. Status com data de vencimento de cada CND.",
  },
  {
    icon: PackageSearch,
    title: "Catálogo + matching automático",
    description:
      "Cadastre seus produtos uma vez. Sistema cruza com todo edital novo e aponta os itens onde você é elegível.",
  },
  {
    icon: Plug,
    title: "30+ integrações já conectadas",
    description:
      "PNCP, Compras.gov.br, BEC/SP, BLL, BNCP, Licitar Digital, TCU, CNJ. Plug-and-play, sem TI.",
  },
];
