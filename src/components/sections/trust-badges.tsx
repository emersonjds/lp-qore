"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ShieldCheck } from "lucide-react";

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
    <>
      {/* Desktop — flutuante no canto direito */}
      <div className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 md:flex">
        {/* Badge principal */}
        {badges.map((badge, i) => (
          <motion.div
            key={badge.alt}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 + i * 0.2, duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center gap-2 rounded-xl border border-border/60 bg-white/92 px-4 py-3 shadow-card backdrop-blur-sm transition-all hover:shadow-card-hover hover:border-primary/30"
          >
            <p className="text-eyebrow text-muted-foreground">
              Recomendado por
            </p>
            <Image
              src={badge.src}
              alt={badge.alt}
              width={badge.width}
              height={badge.height}
              className="object-contain"
              aria-hidden="false"
            />
          </motion.div>
        ))}

        {/* Mini badge PNCP Oficial */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.8, duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-2 rounded-xl border border-primary/20 bg-accent px-3 py-2.5 shadow-card"
        >
          <ShieldCheck className="size-4 shrink-0 text-primary" aria-hidden="true" />
          <div>
            <p className="text-eyebrow text-primary">PNCP Oficial</p>
            <p className="mt-0.5 text-[10px] text-muted-foreground">integrado</p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
