"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { AnimatedSection } from "@/components/layout/animated-section";

const steps = [
  {
    number: "1",
    title: "Connect Your Tools",
    description:
      "Integrate your existing stack in minutes. LPQore connects with 200+ tools including GitHub, Slack, Figma, and more.",
  },
  {
    number: "2",
    title: "Automate Workflows",
    description:
      "Set up powerful automations with our visual workflow builder. No code required — just drag, drop, and deploy.",
  },
  {
    number: "3",
    title: "Ship with Confidence",
    description:
      "Track progress in real time with dashboards and analytics. Ship faster knowing your team is always aligned.",
  },
];

export function HowItWorks() {
  return (
    <SectionWrapper
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="bg-muted/30"
    >
      <AnimatedSection className="mx-auto max-w-2xl text-center">
        <Badge variant="secondary" className="mb-4">How It Works</Badge>
        <h2 id="how-it-works-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
          Get started in three simple steps
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Go from zero to shipping in minutes, not weeks.
        </p>
      </AnimatedSection>

      <div className="relative mt-16">
        {/* Connecting line */}
        <div className="absolute top-12 right-0 left-0 hidden h-0.5 bg-border lg:block" />

        <motion.div
          className="grid gap-12 lg:grid-cols-3 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
              className="relative text-center"
            >
              <div className="relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                {step.number}
              </div>
              <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
