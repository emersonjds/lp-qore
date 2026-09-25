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
  contactEmail: string;
  dataProtectionOfficer: string;
}

export interface IconCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface SummaryItem {
  title: string;
  citation: string;
  summary: string;
  isRisk: boolean;
}
