"use client";

import { motion } from "motion/react";
import { AnimatedSection } from "@/components/layout/animated-section";

const companies = [
  "Acme Corp",
  "Globex",
  "Initech",
  "Umbrella",
  "Stark Industries",
  "Wayne Enterprises",
  "Cyberdyne",
  "Oscorp",
];

function LogoPlaceholder({ name }: { name: string }) {
  return (
    <div className="flex h-8 items-center gap-2 px-6 opacity-40 grayscale">
      <div className="h-6 w-6 rounded bg-muted-foreground/20" />
      <span className="whitespace-nowrap text-sm font-semibold text-muted-foreground">
        {name}
      </span>
    </div>
  );
}

export function SocialProof() {
  const doubled = [...companies, ...companies];

  return (
    <section className="border-y bg-muted/30 py-12">
      <AnimatedSection>
        <p className="mb-8 text-center text-sm font-medium tracking-wider text-muted-foreground uppercase">
          Trusted by innovative teams worldwide
        </p>
      </AnimatedSection>
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        <motion.div
          className="flex w-max gap-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {doubled.map((name, i) => (
            <LogoPlaceholder key={`${name}-${i}`} name={name} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
