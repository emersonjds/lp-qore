import type { PricingTier } from "@/types";

export const pricingTiers: PricingTier[] = [
  {
    name: "Free",
    description: "Perfect for individuals and small projects.",
    price: "$0",
    period: "forever",
    features: [
      "Up to 3 projects",
      "5 team members",
      "Basic analytics",
      "Community support",
      "1 GB storage",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    description: "For growing teams that need more power.",
    price: "$29",
    period: "per user / month",
    features: [
      "Unlimited projects",
      "Unlimited team members",
      "Advanced analytics & reports",
      "Priority support",
      "100 GB storage",
      "Custom workflows",
      "SSO & SAML",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "For organizations with advanced needs.",
    price: "Custom",
    period: "tailored to your team",
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "Custom integrations",
      "SLA & uptime guarantee",
      "Unlimited storage",
      "On-premise deployment",
      "Advanced security & compliance",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];
