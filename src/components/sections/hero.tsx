"use client";

import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/layout/container";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <Container>
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial="initial"
          animate="animate"
          transition={{ staggerChildren: 0.12 }}
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
            <Badge variant="secondary" className="mb-6 gap-1.5 px-3 py-1.5 text-sm">
              <Sparkles className="size-3.5" />
              Now in public beta
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Ship products faster{" "}
            <span className="text-primary">with your team</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
          >
            LPQore is the all-in-one platform for teams to plan, build, and
            deliver products — with workflow automation, real-time analytics, and
            seamless collaboration built in.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button size="lg" className="gap-2" asChild>
              <a href="#pricing">
                Start for Free
                <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#how-it-works">See How It Works</a>
            </Button>
          </motion.div>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mt-4 text-sm text-muted-foreground"
          >
            No credit card required. Free forever for small teams.
          </motion.p>
        </motion.div>

        {/* Hero image placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mx-auto mt-16 max-w-5xl"
        >
          <div className="aspect-video overflow-hidden rounded-xl border bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 shadow-2xl">
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <Sparkles className="size-8 text-primary" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  Product Dashboard Preview
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
