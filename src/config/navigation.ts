import type { NavLink } from "@/types";

export const CONTACT_HREF = "/#contato";
export const HOW_IT_WORKS_HREF = "/#como-funciona";

export const primaryNavigation: readonly NavLink[] = [
  { label: "Como funciona", href: HOW_IT_WORKS_HREF },
  { label: "Funcionalidades", href: "/#funcionalidades" },
  { label: "Integrações", href: "/#integracoes" },
  { label: "IA responsável", href: "/#ia-responsavel" },
  { label: "FAQ", href: "/#faq" },
];

export const footerNavigation: readonly NavLink[] = [
  ...primaryNavigation,
  { label: "Contato", href: CONTACT_HREF },
  { label: "Privacidade", href: "/privacidade" },
];
