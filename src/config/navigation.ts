import type { NavLink } from "@/types";

export const CONTACT_HREF = "/#contato";

export const primaryNavigation: readonly NavLink[] = [
  { label: "Como funciona", href: "/#como-funciona" },
  { label: "Plataforma", href: "/#plataforma" },
  { label: "IA responsável", href: "/#ia-responsavel" },
  { label: "FAQ", href: "/#faq" },
];

export const footerNavigation: readonly NavLink[] = [
  { label: "Como funciona", href: "/#como-funciona" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contato", href: CONTACT_HREF },
  { label: "Privacidade", href: "/privacidade" },
];
