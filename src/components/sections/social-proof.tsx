"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { AnimatedSection } from "@/components/layout/animated-section";

const entities = [
  { name: "Governo Federal", logo: "/logos/gov-federal.svg", width: 160 },
  { name: "Prefeitura de SP", logo: "/logos/prefeitura-sp.svg", width: 180 },
  { name: "Portal da Transparência", logo: "/logos/portal-transparencia.svg", width: 210 },
  { name: "Portal de Licitações BR", logo: "/logos/portal-licitacoes.svg", width: 210 },
  { name: "Gov. São Paulo", logo: "/logos/gov-sp.svg", width: 170 },
  { name: "Gov. Rio de Janeiro", logo: "/logos/gov-rj.svg", width: 190 },
  { name: "Gov. Minas Gerais", logo: "/logos/gov-mg.svg", width: 180 },
  { name: "Gov. Bahia", logo: "/logos/gov-ba.svg", width: 150 },
  { name: "Gov. Paraná", logo: "/logos/gov-pr.svg", width: 155 },
  { name: "Gov. Rio Grande do Sul", logo: "/logos/gov-rs.svg", width: 210 },
  { name: "Gov. Pernambuco", logo: "/logos/gov-pe.svg", width: 180 },
  { name: "Gov. Ceará", logo: "/logos/gov-ce.svg", width: 150 },
  { name: "Gov. Goiás", logo: "/logos/gov-go.svg", width: 150 },
  { name: "Gov. Pará", logo: "/logos/gov-pa.svg", width: 145 },
  { name: "Gov. Santa Catarina", logo: "/logos/gov-sc.svg", width: 195 },
  { name: "Gov. Maranhão", logo: "/logos/gov-ma.svg", width: 170 },
  { name: "Gov. Amazonas", logo: "/logos/gov-am.svg", width: 170 },
  { name: "Gov. Espírito Santo", logo: "/logos/gov-es.svg", width: 190 },
];

export function SocialProof() {
  const doubled = [...entities, ...entities];

  return (
    <section className="border-y bg-muted/30 py-12">
      <AnimatedSection>
        <p className="mb-8 text-center text-sm font-medium tracking-wider text-muted-foreground uppercase">
          Integrado com portais e órgãos de todo o Brasil
        </p>
      </AnimatedSection>
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-background to-transparent" />

        <motion.div
          className="flex w-max items-center gap-10"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 45,
              ease: "linear",
            },
          }}
        >
          {doubled.map((entity, i) => (
            <div key={`${entity.name}-${i}`} className="shrink-0 opacity-60 transition-opacity hover:opacity-100">
              <Image
                src={entity.logo}
                alt={entity.name}
                width={entity.width}
                height={40}
                className="h-8 w-auto"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
