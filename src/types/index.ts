import type { LucideIcon } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface LegalIdentity {
  companyName: string;
  taxId: string;
  city: string;
  state: string;
  contactEmail: string;
  dataProtectionOfficer: string;
}

export interface IconCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface HowItWorksStep {
  number: string;
  title: string;
  description: string;
}

export type PlatformScreenId = "painel" | "radar" | "resumo" | "precificacao" | "calendario";

export interface PlatformTab {
  id: PlatformScreenId;
  label: string;
}
