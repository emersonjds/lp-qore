"use client";

import Image from "next/image";
import { motion } from "motion/react";

const badges = [
  {
    label: "Recomendado por",
    src: "/images/badges/portal-transparencia.png",
    alt: "Portal da Transparência",
    width: 130,
    height: 40,
  },
];

export function TrustBadges() {
  return (
    <div className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 xl:flex">
      {badges.map((badge, i) => (
        <motion.div
          key={badge.alt}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5 + i * 0.2, duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center gap-1.5 rounded-lg border border-border/60 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-sm transition-all hover:shadow-xl hover:border-primary/30"
        >
          <p className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">
            Recomendado por
          </p>
          <Image
            src={badge.src}
            alt={badge.alt}
            width={badge.width}
            height={badge.height}
            className="object-contain"
          />
        </motion.div>
      ))}
    </div>
  );
}
