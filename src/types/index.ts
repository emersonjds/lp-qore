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

export interface MarketNumber {
  value: string;
  label: string;
  source: string;
  date: string;
}

export interface HowItWorksStep {
  number: string;
  title: string;
  description: string;
}

export interface PlatformTab {
  id: string;
  label: string;
  caption: string;
  image: string;
  alt: string;
}

export interface PersonaMetric {
  label: string;
  value: string;
  detail: string;
}

export interface Persona {
  id: "manager" | "analyst";
  toggleLabel: string;
  title: string;
  description: string;
  metrics: readonly PersonaMetric[];
}

export interface CoverageRegion {
  name: string;
  cities: string;
}

export interface MapHub {
  name: string;
  centerX: number;
  centerY: number;
  radius: number;
  labelX: number;
  labelY: number;
  labelAnchor: "start" | "end";
}

export type CertificateStatus = "valid" | "expiring" | "expired";

export interface Certificate {
  name: string;
  issuer: string;
  status: CertificateStatus;
  statusLabel: string;
}
