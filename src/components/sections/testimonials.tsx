"use client";

import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
import { AnimatedSection } from "@/components/layout/animated-section";
import { testimonials } from "@/config/testimonials";

/* Gradients únicos por avatar — verde/azul da marca */
const avatarGradients = [
  "from-emerald-400 to-teal-600",
  "from-teal-500 to-blue-700",
  "from-green-400 to-emerald-700",
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="bg-foreground py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <p className="text-eyebrow mb-3 text-primary">Depoimentos</p>
          <h2
            id="testimonials-heading"
            className="text-display-xl font-display font-bold text-white"
          >
            Quem usa, vence mais
          </h2>
          <p className="mt-4 text-lg text-white/50">
            Resultados reais de quem parou de perder tempo e começou a ganhar contratos.
          </p>
        </AnimatedSection>

        <motion.div
          className="mt-16 grid gap-6 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.author}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/8"
            >
              {/* Topo: quote + estrelas */}
              <div className="mb-4 flex items-start justify-between">
                <Quote
                  className="size-7 text-primary/60"
                  aria-hidden="true"
                />
                <div className="flex gap-0.5" aria-label={`${testimonial.rating} estrelas`}>
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="size-3.5 fill-amber-400 text-amber-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>

              {/* Métrica em destaque */}
              {testimonial.metric && (
                <div className="mb-4 inline-flex w-fit rounded-full border border-primary/30 bg-primary/10 px-3 py-1">
                  <span className="text-xs font-semibold text-primary">
                    {testimonial.metric}
                  </span>
                </div>
              )}

              <blockquote className="flex-1 text-sm leading-relaxed text-white/75">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Autor */}
              <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
                {/* Avatar com gradient */}
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold text-white ${avatarGradients[i % avatarGradients.length]}`}
                  aria-hidden="true"
                >
                  {testimonial.author
                    .split(" ")
                    .slice(0, 2)
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {testimonial.author}
                  </p>
                  <p className="text-xs text-white/40">
                    {testimonial.role} · {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
