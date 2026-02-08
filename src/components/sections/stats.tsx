"use client";

import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { TrendingUp, Building2, Globe, FileSearch } from "lucide-react";
import { Container } from "@/components/layout/container";

const stats = [
  {
    icon: FileSearch,
    value: 12400,
    suffix: "+",
    label: "Licitações monitoradas por dia",
  },
  {
    icon: Globe,
    value: 5600,
    suffix: "+",
    label: "Portais integrados",
  },
  {
    icon: TrendingUp,
    value: 2.3,
    prefix: "R$",
    suffix: " bi",
    label: "Em oportunidades por mês",
    decimals: 1,
  },
  {
    icon: Building2,
    value: 98,
    suffix: "%",
    label: "De cobertura nacional",
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
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
      {prefix}
      {decimals > 0 ? display.toFixed(decimals) : Math.floor(display).toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
}

export function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="border-b py-16 md:py-20">
      <Container>
        <motion.div
          className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl bg-primary/10">
                <stat.icon className="size-6 text-primary" />
              </div>
              <AnimatedNumber
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                decimals={stat.decimals}
                inView={inView}
              />
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
