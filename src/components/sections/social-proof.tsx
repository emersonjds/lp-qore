"use client";

import { motion } from "motion/react";
import { AnimatedSection } from "@/components/layout/animated-section";

type Entity = {
  name: string;
  short: string;
  type: "state" | "federal" | "portal";
  flag: FlagSpec;
};

type FlagSpec = {
  stripes: string[];
  /** opcional: pequeno glifo central (estrela, triângulo, círculo) */
  glyph?: { char: string; color: string };
  /** opcional: faixa diagonal (BA, MG-style) */
  diagonal?: string;
};

const entities: Entity[] = [
  {
    name: "Governo Federal",
    short: "Brasil",
    type: "federal",
    flag: {
      stripes: ["#10b981", "#facc15", "#1e3a8a"],
      glyph: { char: "★", color: "#fff" },
    },
  },
  {
    name: "Prefeitura de SP",
    short: "Pref. SP",
    type: "state",
    flag: { stripes: ["#000", "#fff", "#dc2626", "#fff", "#000"] },
  },
  {
    name: "Portal da Transparência",
    short: "Transparência",
    type: "portal",
    flag: { stripes: ["#1e40af", "#0ea5e9"], glyph: { char: "◎", color: "#fff" } },
  },
  {
    name: "Portal de Compras Públicas",
    short: "Compras Públicas",
    type: "portal",
    flag: { stripes: ["#0f172a", "#1e293b"], glyph: { char: "◧", color: "#10b981" } },
  },
  {
    name: "Gov. São Paulo",
    short: "SP",
    type: "state",
    flag: {
      stripes: ["#000", "#fff", "#000", "#fff", "#000"],
      glyph: { char: "★", color: "#dc2626" },
    },
  },
  {
    name: "Gov. Rio de Janeiro",
    short: "RJ",
    type: "state",
    flag: {
      stripes: ["#1e40af", "#fff", "#1e40af"],
      glyph: { char: "✦", color: "#facc15" },
    },
  },
  {
    name: "Gov. Minas Gerais",
    short: "MG",
    type: "state",
    flag: {
      stripes: ["#fff"],
      glyph: { char: "▲", color: "#dc2626" },
    },
  },
  {
    name: "Gov. Bahia",
    short: "BA",
    type: "state",
    flag: {
      stripes: ["#fff"],
      diagonal: "#1e40af",
      glyph: { char: "★", color: "#dc2626" },
    },
  },
  {
    name: "Gov. Paraná",
    short: "PR",
    type: "state",
    flag: {
      stripes: ["#10b981", "#fff", "#10b981"],
      glyph: { char: "◉", color: "#1e40af" },
    },
  },
  {
    name: "Gov. Rio Grande do Sul",
    short: "RS",
    type: "state",
    flag: { stripes: ["#10b981", "#dc2626", "#facc15"] },
  },
  {
    name: "Gov. Pernambuco",
    short: "PE",
    type: "state",
    flag: {
      stripes: ["#1e40af", "#fff"],
      glyph: { char: "✚", color: "#1e40af" },
    },
  },
  {
    name: "Gov. Ceará",
    short: "CE",
    type: "state",
    flag: {
      stripes: ["#10b981", "#fff", "#facc15"],
      glyph: { char: "◆", color: "#fff" },
    },
  },
  {
    name: "Gov. Goiás",
    short: "GO",
    type: "state",
    flag: { stripes: ["#10b981", "#facc15", "#10b981", "#facc15", "#10b981"] },
  },
  {
    name: "Gov. Pará",
    short: "PA",
    type: "state",
    flag: {
      stripes: ["#fff", "#dc2626", "#fff"],
      glyph: { char: "★", color: "#1e40af" },
    },
  },
  {
    name: "Gov. Santa Catarina",
    short: "SC",
    type: "state",
    flag: { stripes: ["#dc2626", "#fff", "#10b981"] },
  },
  {
    name: "Gov. Maranhão",
    short: "MA",
    type: "state",
    flag: {
      stripes: ["#000", "#facc15", "#000", "#facc15", "#000"],
      glyph: { char: "★", color: "#fff" },
    },
  },
  {
    name: "Gov. Amazonas",
    short: "AM",
    type: "state",
    flag: {
      stripes: ["#fff", "#1e40af", "#fff"],
      glyph: { char: "✦", color: "#fff" },
    },
  },
  {
    name: "Gov. Espírito Santo",
    short: "ES",
    type: "state",
    flag: { stripes: ["#1e40af", "#fff", "#ec4899"] },
  },
];

function FlagBadge({ flag, label }: { flag: FlagSpec; label: string }) {
  const stripeHeight = 100 / flag.stripes.length;
  return (
    <span
      className="border-foreground/15 inline-flex h-7 w-10 shrink-0 overflow-hidden rounded-[3px] border shadow-sm"
      aria-label={label}
      role="img"
    >
      <svg
        viewBox="0 0 40 28"
        className="h-full w-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {flag.stripes.map((color, i) => (
          <rect
            key={i}
            x="0"
            y={i * stripeHeight + "%"}
            width="40"
            height={stripeHeight + "%"}
            fill={color}
          />
        ))}
        {flag.diagonal && (
          <polygon points="0,0 40,28 40,0" fill={flag.diagonal} opacity="0.85" />
        )}
        {flag.glyph && (
          <text
            x="20"
            y="20"
            textAnchor="middle"
            fontSize="13"
            fontFamily="system-ui,sans-serif"
            fontWeight="700"
            fill={flag.glyph.color}
          >
            {flag.glyph.char}
          </text>
        )}
      </svg>
    </span>
  );
}

function EntityPill({ entity }: { entity: Entity }) {
  return (
    <div className="border-foreground/8 group flex shrink-0 items-center gap-2.5 rounded-full border bg-white/70 px-3.5 py-2 shadow-sm backdrop-blur-sm transition-all hover:bg-white">
      <FlagBadge flag={entity.flag} label={entity.name} />
      <span className="text-foreground/70 group-hover:text-foreground text-sm font-medium whitespace-nowrap transition-colors">
        {entity.name}
      </span>
    </div>
  );
}

export function SocialProof() {
  const doubled = [...entities, ...entities];

  return (
    <section className="bg-surface-tinted border-y py-14">
      <AnimatedSection>
        <p className="text-eyebrow text-primary mb-8 text-center">
          Conectado aos portais que o governo usa
        </p>
      </AnimatedSection>
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-linear-to-r from-[#F0FDF9] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-linear-to-l from-[#F0FDF9] to-transparent" />

        <motion.div
          className="flex w-max items-center gap-3"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 60,
              ease: "linear",
            },
          }}
        >
          {doubled.map((entity, i) => (
            <EntityPill key={`${entity.name}-${i}`} entity={entity} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
