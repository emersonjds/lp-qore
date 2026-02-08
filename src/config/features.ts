import {
  Search,
  Shield,
  BarChart3,
  Bell,
  FileText,
  Globe,
} from "lucide-react";
import type { Feature } from "@/types";

export const features: Feature[] = [
  {
    icon: Search,
    title: "Busca Inteligente de Editais",
    description:
      "Encontre licitações relevantes para o seu negócio com filtros avançados por órgão, modalidade, segmento e valor estimado.",
  },
  {
    icon: Bell,
    title: "Alertas Personalizados",
    description:
      "Receba notificações automáticas quando novas licitações do seu interesse forem publicadas. Nunca mais perca uma oportunidade.",
  },
  {
    icon: FileText,
    title: "Análise de Editais",
    description:
      "Visualize editais de forma organizada com destaque para prazos, requisitos de habilitação, critérios de julgamento e documentos exigidos.",
  },
  {
    icon: Shield,
    title: "Gestão de Propostas",
    description:
      "Crie, organize e envie suas propostas com checklist de documentos, controle de prazos e histórico completo de participações.",
  },
  {
    icon: BarChart3,
    title: "Painel Analítico",
    description:
      "Dashboards com métricas de desempenho: taxa de aprovação, valor total disputado, concorrentes frequentes e tendências de mercado.",
  },
  {
    icon: Globe,
    title: "Cobertura Nacional",
    description:
      "Licitações de todos os estados, municípios e órgãos federais do Brasil. Pregões, concorrências, tomadas de preço e mais — tudo centralizado.",
  },
];
