"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/layout/container";
import { DashboardMockup } from "@/components/sections/dashboard-mockup";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-0 md:pt-36">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-150 w-225 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
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
              <Search className="size-3.5" />
              Plataforma em beta aberto
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Licitações públicas,{" "}
            <span className="text-primary">sem complicação</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
          >
            O Qore centraliza a busca, análise e gestão de licitações públicas
            em todo o Brasil — com alertas inteligentes, análise de editais e
            controle de propostas em uma única plataforma.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button size="lg" className="gap-2" asChild>
              <Link href="/login">
                Começar Agora
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#how-it-works">Como Funciona</a>
            </Button>
          </motion.div>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mt-4 text-sm text-muted-foreground"
          >
            Grátis para começar. Sem necessidade de cartão de crédito.
          </motion.p>
        </motion.div>

        {/* Product screenshot with perspective */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative mx-auto mt-16 max-w-5xl"
          style={{ perspective: "2000px" }}
        >
          <div
            className="transition-transform duration-700"
            style={{
              transform: "rotateX(4deg)",
              transformOrigin: "center bottom",
            }}
          >
            <DashboardMockup />
          </div>

          {/* Bottom fade to blend into next section */}
          <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-32 bg-linear-to-t from-background to-transparent" />
        </motion.div>
      </Container>
    </section>
  );
}
