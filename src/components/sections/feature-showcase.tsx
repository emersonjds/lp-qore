"use client";

import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { AnimatedSection } from "@/components/layout/animated-section";
import { Badge } from "@/components/ui/badge";

const showcases = [
  {
    badge: "Collaboration",
    title: "Real-time collaboration that actually works",
    description:
      "Work together on projects without stepping on each other's toes. See changes instantly, leave contextual comments, and keep everyone aligned.",
    points: [
      "Live cursors and real-time editing",
      "Threaded comments on any element",
      "Smart notifications that reduce noise",
    ],
  },
  {
    badge: "Automation",
    title: "Automate the tedious parts of your workflow",
    description:
      "Build powerful workflows visually and let LPQore handle the repetitive tasks. Free your team to focus on what actually matters.",
    points: [
      "Visual no-code workflow builder",
      "200+ integrations out of the box",
      "Custom triggers and conditions",
    ],
  },
  {
    badge: "Analytics",
    title: "Insights that drive better decisions",
    description:
      "Understand your team's velocity, spot bottlenecks before they slow you down, and make data-driven decisions with confidence.",
    points: [
      "Customizable real-time dashboards",
      "Automated weekly & monthly reports",
      "Predictive analytics powered by AI",
    ],
  },
];

export function FeatureShowcase() {
  return (
    <SectionWrapper>
      <AnimatedSection className="mx-auto max-w-2xl text-center">
        <Badge variant="secondary" className="mb-4">Deep Dive</Badge>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Built for the way modern teams work
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Every feature is designed to remove friction and help your team do
          their best work.
        </p>
      </AnimatedSection>

      <div className="mt-20 space-y-24">
        {showcases.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col items-center gap-12 lg:flex-row ${
                !isEven ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image placeholder */}
              <div className="flex-1">
                <div className="aspect-[4/3] overflow-hidden rounded-xl border bg-gradient-to-br from-primary/5 via-muted to-primary/5">
                  <div className="flex h-full items-center justify-center">
                    <p className="text-sm text-muted-foreground">
                      {item.badge} Preview
                    </p>
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="flex-1">
                <Badge variant="secondary" className="mb-3">{item.badge}</Badge>
                <h3 className="text-2xl font-bold sm:text-3xl">{item.title}</h3>
                <p className="mt-4 text-muted-foreground">{item.description}</p>
                <ul className="mt-6 space-y-3">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-center gap-3">
                      <CheckCircle2 className="size-5 shrink-0 text-primary" />
                      <span className="text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
