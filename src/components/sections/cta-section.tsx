"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { AnimatedSection } from "@/components/layout/animated-section";

export function CTASection() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <AnimatedSection>
          <div className="overflow-hidden rounded-2xl bg-primary px-6 py-16 text-center sm:px-16">
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              Ready to ship faster?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80">
              Join thousands of teams already using LPQore to plan, build, and
              deliver products with confidence.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2"
              >
                Start for Free
                <ArrowRight className="size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                Talk to Sales
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
