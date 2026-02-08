import {
  Zap,
  Shield,
  BarChart3,
  Users,
  Workflow,
  Globe,
} from "lucide-react";
import type { Feature } from "@/types";

export const features: Feature[] = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Built for speed from the ground up. Experience sub-second load times and instant interactions that keep your team in flow.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "SOC 2 compliant with end-to-end encryption, SSO, and granular role-based access controls to keep your data safe.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Get real-time insights with customizable dashboards, automated reports, and predictive analytics powered by AI.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Work together seamlessly with shared workspaces, real-time editing, comments, and @mentions that keep everyone aligned.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "Automate repetitive tasks with powerful no-code workflows. Connect to 200+ integrations and save hours every week.",
  },
  {
    icon: Globe,
    title: "Global Scale",
    description:
      "Deploy worldwide with edge infrastructure across 50+ regions. 99.99% uptime SLA with automatic failover built in.",
  },
];
