import {
  Building2,
  CalendarClock,
  ChartColumn,
  FileCheck2,
  Package,
  Radar,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Stamp,
  TriangleAlert,
  UsersRound,
} from "lucide-react";
import type { IconCard } from "@/types";

export const featuresContent = {
  eyebrow: "Funcionalidades",
  title: "Doze ferramentas, uma operação de licitação",
  description: "Do cadastro pelo CNPJ à proposta com a sua marca, cada etapa da licitação em uma plataforma só.",
} as const;

export const features: readonly IconCard[] = [
  {
    icon: Building2,
    title: "Cadastro pelo CNPJ",
    description:
      "Informe o CNPJ e os dados da Receita, o CNAE e o porte da empresa são preenchidos automaticamente.",
  },
  {
    icon: Radar,
    title: "Radar de oportunidades",
    description: "Licitações compatíveis com o perfil da empresa, ordenadas por aderência.",
  },
  {
    icon: SearchCheck,
    title: "Busca por termos correlatos",
    description:
      "Procure “computador” e encontre também “notebook”, “desktop” e “estação de trabalho”: a busca entende sinônimos e termos do mesmo segmento.",
  },
  {
    icon: Sparkles,
    title: "Resumo do edital com IA",
    description: "O essencial do edital em minutos, com a página de origem de cada ponto.",
  },
  {
    icon: FileCheck2,
    title: "Proposta cerca de 80% pronta",
    description:
      "A plataforma cruza os dados da empresa, do edital e os documentos de habilitação, e você só completa os preços.",
  },
  {
    icon: Stamp,
    title: "Sua marca na proposta",
    description:
      "Suba o logo e o documento final sai com a identidade da empresa. Sem marca, sai com um modelo padrão profissional.",
  },
  {
    icon: TriangleAlert,
    title: "Alerta de preço inexequível",
    description: "Sinaliza quando o preço fica muito abaixo da referência do edital.",
  },
  {
    icon: ShieldCheck,
    title: "Certidões sob controle",
    description: "Validade das certidões monitorada, com aviso antes de vencer.",
  },
  {
    icon: CalendarClock,
    title: "Calendário de prazos",
    description: "Impugnação, esclarecimento, abertura e sessão em um só lugar.",
  },
  {
    icon: Package,
    title: "Catálogo de produtos",
    description: "Seu catálogo cruzado com os itens de cada edital.",
  },
  {
    icon: ChartColumn,
    title: "Análise de concorrentes",
    description: "Quem disputa no seu segmento e em que faixa de preço.",
  },
  {
    icon: UsersRound,
    title: "Equipe e painel do gestor",
    description:
      "Papéis de Administrador, Gestor e Analista, e um painel com valor ganho, taxa de vitória e prazos da equipe.",
  },
];

export const proposalContent = {
  eyebrow: "Proposta",
  title: "Sua proposta chega cerca de 80% pronta",
  description:
    "A plataforma cruza os dados da empresa, do edital e os documentos de habilitação, e você só completa os preços e revisa.",
  brand:
    "Suba o logo e o documento final sai com a identidade da empresa. Sem marca, sai com um modelo padrão profissional.",
} as const;
