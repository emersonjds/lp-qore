"use client";

import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { useRef } from "react";
import { ArrowRight, Sparkles, ChevronDown, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { DashboardMockup } from "@/components/sections/dashboard-mockup";
import { siteConfig } from "@/config/site";

const headlineWords = ["Encontre", "o", "próximo", "edital"];
const accentWord = "antes da concorrência";

export function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const mockupY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden pt-24 pb-16 md:pt-28 md:pb-20"
    >
      {/* Camada de fundo: gradient mesh com parallax sutil */}
      <motion.div
        aria-hidden
        style={reduceMotion ? undefined : { y: bgY }}
        className="bg-mesh-hero pointer-events-none absolute inset-0 -z-20"
      />
      {/* Grain texture (sem mix-blend-overlay — economiza repaint) */}
      <div
        aria-hidden
        className="bg-grain pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
      />

      {/* Blobs animados — só desktop, só 2 (Performance budget) */}
      {!reduceMotion && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -top-24 -left-24 -z-10 hidden size-md rounded-full bg-emerald-400/35 blur-[80px] md:block"
            animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute top-32 -right-24 -z-10 hidden size-80 rounded-full bg-emerald-300/30 blur-3xl md:block"
            animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      <Container>
        <motion.div
          style={reduceMotion ? undefined : { opacity: fadeOut }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Live badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-white/70 px-4 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur-md"
          >
            <span className="relative flex size-2">
              <span className="animate-pulse-soft absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <Sparkles className="size-3.5 text-emerald-600" />
            <span>Monitorando editais em tempo real</span>
          </motion.div>

          {/* Headline com reveal por palavras */}
          <h1
            id="hero-heading"
            aria-label="Encontre o próximo edital antes da concorrência"
            className="font-display text-foreground text-[clamp(2.5rem,5.5vw,5.25rem)] font-semibold tracking-[-0.04em] leading-[0.98]"
          >
            <span aria-hidden className="block">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  initial={{ opacity: 0, y: "55%" }}
                  animate={{ opacity: 1, y: "0%" }}
                  transition={{
                    duration: 0.7,
                    delay: 0.2 + i * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mr-[0.16em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <motion.span
              aria-hidden
              initial={{ opacity: 0, y: "55%" }}
              animate={{ opacity: 1, y: "0%" }}
              transition={{
                duration: 0.8,
                delay: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-gradient-brand mt-1 block"
            >
              {accentWord}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="text-muted-foreground mx-auto mt-5 max-w-xl text-base md:text-lg"
          >
            Pare de caçar editais em dezenas de portais. O Qore reúne todas as
            licitações do Brasil, alerta as oportunidades certas e organiza
            suas propostas — do edital ao contrato.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-8 flex flex-col items-center justify-center gap-2.5 sm:flex-row"
          >
            <Button
              size="lg"
              className="glow-primary group h-12 gap-2 rounded-full px-7 text-base"
              asChild
            >
              <Link href={`${siteConfig.appUrl}/signup`}>
                Começar grátis
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="text-foreground hover:bg-foreground/5 h-12 rounded-full px-6 text-base"
              asChild
            >
              <a href="#how-it-works">
                Ver como funciona
                <ChevronDown className="ml-1 size-4" />
              </a>
            </Button>
          </motion.div>

        </motion.div>

        {/* Mockup com perspectiva + cards flutuantes orbitando */}
        <motion.div
          style={reduceMotion ? undefined : { y: mockupY }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-12 max-w-6xl 2xl:max-w-7xl"
        >
          <div className="relative" style={{ perspective: "2400px" }}>
            <div
              style={{
                transform: "rotateX(6deg)",
                transformOrigin: "center bottom",
              }}
            >
              <DashboardMockup />
            </div>

            {/* Card flutuante: nova oportunidade */}
            <motion.div
              aria-hidden
              initial={{ opacity: 0, x: -24, y: 12 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, delay: 1.4 }}
              className="animate-float-y shadow-elevated absolute -left-4 top-24 hidden w-60 rounded-2xl border border-emerald-200/60 bg-white p-4 md:block"
            >
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-full bg-emerald-50">
                  <Sparkles className="size-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-foreground">
                    Nova oportunidade
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    há 2 minutos · via PNCP
                  </p>
                </div>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-foreground">
                Pregão Eletrônico · Serviços de TI
              </p>
              <div className="mt-2 flex items-center gap-1 text-[10px] text-muted-foreground">
                <Building2 className="size-3" />
                <span>UASG 925000 · Edital 045/2025</span>
              </div>
              <p className="mt-2 text-sm font-bold text-emerald-600">
                R$ 2.450.000
              </p>
            </motion.div>

            {/* Card flutuante: KPI taxa de sucesso (realista: 22%) */}
            <motion.div
              aria-hidden
              initial={{ opacity: 0, x: 24, y: 12 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, delay: 1.55 }}
              style={{
                animation: "float-y 6s ease-in-out 1.5s infinite",
              }}
              className="shadow-elevated absolute -right-2 top-44 hidden w-52 rounded-2xl border border-emerald-200/60 bg-white p-4 md:block"
            >
              <p className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                Taxa de êxito
              </p>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-2xl font-bold text-foreground">22%</span>
                <span className="text-xs font-medium text-emerald-600">
                  ↑ 8%
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full bg-linear-to-r from-emerald-500 to-emerald-700"
                  initial={{ width: 0 }}
                  animate={{ width: "22%" }}
                  transition={{ duration: 1.4, delay: 2 }}
                />
              </div>
              <p className="mt-2 text-[10px] text-muted-foreground">
                vs. média do segmento: 14%
              </p>
            </motion.div>
          </div>

          {/* Fade para a próxima seção */}
          <div className="from-background pointer-events-none absolute right-0 bottom-0 left-0 h-40 bg-linear-to-t to-transparent" />
        </motion.div>
      </Container>
    </section>
  );
}
