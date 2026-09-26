import type { NavLink } from "@/types";

export const CONTACT_HREF = "/#contato";
export const HOW_IT_WORKS_HREF = "/#como-funciona";
export const PLATFORM_HREF = "/#plataforma";
export const CONTACT_SPECIALIST_LABEL = "Fale com um especialista";

export const primaryNavigation: readonly NavLink[] = [
  { label: "Radar grátis", href: "/#radar" },
  { label: "Como funciona", href: HOW_IT_WORKS_HREF },
  { label: "Plataforma", href: PLATFORM_HREF },
  { label: "Para quem é", href: "/#para-quem-e" },
  { label: "FAQ", href: "/#faq" },
];

export const footerNavigation: readonly NavLink[] = [
  ...primaryNavigation,
  { label: "Contato", href: CONTACT_HREF },
  { label: "Privacidade", href: "/privacidade" },
];
