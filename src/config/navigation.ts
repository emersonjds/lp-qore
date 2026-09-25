import type { NavLink } from "@/types";

export const CONTACT_HREF = "/#contato";
export const HOW_IT_WORKS_HREF = "/#como-funciona";

export const primaryNavigation: readonly NavLink[] = [
  { label: "Como funciona", href: HOW_IT_WORKS_HREF },
  { label: "Plataforma", href: "/#plataforma" },
  { label: "IA responsável", href: "/#ia-responsavel" },
  { label: "FAQ", href: "/#faq" },
];

export const footerNavigation: readonly NavLink[] = [
  { label: "Como funciona", href: HOW_IT_WORKS_HREF },
  { label: "FAQ", href: "/#faq" },
  { label: "Contato", href: CONTACT_HREF },
  { label: "Privacidade", href: "/privacidade" },
];
