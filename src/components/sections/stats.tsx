"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { Container } from "@/components/layout/container";
import { AnimatedSection } from "@/components/layout/animated-section";

const stats = [
  {
    value: 12400,
    suffix: "+",
    label: "editais monitorados por dia",
  },
  {
    value: 5600,
    suffix: "+",
    label: "portais públicos integrados",
  },
  {
    value: 2.3,
    prefix: "R$",
    suffix: "bi",
    label: "em contratos disponíveis/mês",
    decimals: 1,
  },
  {
    value: 98,
    suffix: "%",
    label: "de cobertura nacional",
  },
];

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  inView,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  inView: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    const duration = 1800;
    const start = performance.now();
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setDisplay(value * easeOutCubic(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduceMotion]);

  const formatted =
    decimals > 0
      ? display.toFixed(decimals).replace(".", ",")
      : Math.floor(display).toLocaleString("pt-BR");

  return (
    <span className="font-display inline-flex items-baseline gap-1 leading-none font-bold whitespace-nowrap">
      {prefix && (
        <span className="text-gradient-number text-[clamp(1.25rem,1.6vw,1.75rem)]">
          {prefix}
        </span>
      )}
      <span className="text-gradient-number text-[clamp(2.5rem,4.8vw,4.5rem)] tracking-[-0.04em]">
        {formatted}
      </span>
      {suffix && (
        <span className="text-gradient-number text-[clamp(1.25rem,1.6vw,1.75rem)]">
          {suffix}
        </span>
      )}
    </span>
  );
}

export function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-surface-deep py-20 md:py-28">
      <Container>
        <AnimatedSection className="mb-16 text-center">
          <h2 className="text-display-xl font-display font-bold text-white">
            Os números por trás de cada alerta
          </h2>
        </AnimatedSection>

        <motion.div
          className="grid grid-cols-2 divide-x divide-white/10 lg:grid-cols-4"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center px-6 py-8 text-center first:pl-0 last:pr-0"
            >
              <AnimatedNumber
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                decimals={stat.decimals}
                inView={inView}
              />
              <p className="mt-3 text-sm leading-snug text-white/50">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
