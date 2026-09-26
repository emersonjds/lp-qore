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

export interface Persona {
  id: "analyst" | "manager";
  toggleLabel: string;
  title: string;
  features: readonly IconCard[];
}

export interface CoverageRegion {
  name: string;
  cities?: string;
}

export interface CoverageCluster {
  name: string;
  regions: readonly CoverageRegion[];
}

export interface MapHub {
  name: string;
  longitude: number;
  latitude: number;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  logoSrc?: string;
  authorizedAt: string;
}

