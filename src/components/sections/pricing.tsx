"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { AnimatedSection } from "@/components/layout/animated-section";
import { pricingTiers } from "@/config/pricing";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <SectionWrapper id="pricing" aria-labelledby="pricing-heading">
      <AnimatedSection className="mx-auto max-w-2xl text-center">
        <p className="text-eyebrow mb-3 text-primary">Planos</p>
        <h2
          id="pricing-heading"
          className="text-display-xl font-display font-bold"
        >
          Comece grátis. Escale quando ganhar.
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Sem taxa de adesão. Sem fidelidade. Cancele quando quiser.
        </p>
      </AnimatedSection>

      <motion.div
        className="mt-16 grid items-center gap-6 md:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {pricingTiers.map((tier) => (
          <motion.div
            key={tier.name}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={cn(tier.highlighted && "scale-[1.02]")}
          >
            <Card
              className={cn(
                "relative flex h-full flex-col",
                tier.highlighted
                  ? "border-primary/40 shadow-card-hover glow-primary"
                  : "shadow-card"
              )}
            >
              {/* Badge de destaque */}
              {tier.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-primary px-4 py-1 text-xs font-semibold text-white shadow-sm">
                    Mais escolhido
                  </span>
                </div>
              )}

              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold">{tier.name}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {tier.description}
                </CardDescription>

                <div className="mt-5">
                  <div className="flex items-end gap-1">
                    <span className="text-display-l font-display font-bold text-foreground">
                      {tier.price}
                    </span>
                    {tier.price !== "Sob consulta" && (
                      <span className="mb-1.5 text-sm text-muted-foreground">
                        /{tier.period}
                      </span>
                    )}
                  </div>
                  {tier.price === "Sob consulta" && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {tier.period}
                    </p>
                  )}
                </div>

                {/* Badge "14 dias grátis" apenas no plano destacado */}
                {tier.highlighted && (
                  <div className="mt-2 inline-flex w-fit rounded-full border border-primary/25 bg-accent px-3 py-1">
                    <span className="text-xs font-semibold text-primary">
                      14 dias grátis
                    </span>
                  </div>
                )}
              </CardHeader>

              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span className="text-sm leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="flex flex-col gap-2 pt-6">
                <Button
                  className="w-full"
                  variant={tier.highlighted ? "default" : "outline"}
                  size="lg"
                  asChild
                >
                  <a
                    href={
                      tier.name === "Enterprise"
                        ? "#contact"
                        : `${siteConfig.appUrl}/signup`
                    }
                  >
                    {tier.cta}
                  </a>
                </Button>
                {tier.ctaMicro && (
                  <p className="text-center text-xs text-muted-foreground">
                    {tier.ctaMicro}
                  </p>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
