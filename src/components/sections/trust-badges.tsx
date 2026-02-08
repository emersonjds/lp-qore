"use client";

import { ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

const badges = [
  { label: "Recomendado por", org: "Portal da Transparência" },
  { label: "Recomendado por", org: "TCU" },
];

export function TrustBadges() {
  return (
    <div className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 xl:flex">
      {badges.map((badge, i) => (
        <motion.div
          key={badge.org}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5 + i * 0.2, duration: 0.5, ease: "easeOut" }}
          className="group flex items-center gap-2.5 rounded-lg border border-primary/20 bg-white/90 px-3 py-2.5 shadow-lg backdrop-blur-sm transition-all hover:shadow-xl hover:border-primary/40"
        >
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <ShieldCheck className="size-5 text-primary" />
          </div>
          <div className="leading-tight">
            <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
              {badge.label}
            </p>
            <p className="text-xs font-bold text-foreground">{badge.org}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
