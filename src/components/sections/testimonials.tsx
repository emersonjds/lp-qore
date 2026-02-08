"use client";

import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { AnimatedSection } from "@/components/layout/animated-section";
import { testimonials } from "@/config/testimonials";

const avatarColors = [
  "bg-primary/15 text-primary",
  "bg-foreground/10 text-foreground",
  "bg-warning/15 text-warning",
  "bg-primary/15 text-primary",
  "bg-foreground/10 text-foreground",
  "bg-warning/15 text-warning",
];

export function Testimonials() {
  return (
    <SectionWrapper
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="bg-muted/30"
    >
      <AnimatedSection className="mx-auto max-w-2xl text-center">
        <Badge variant="secondary" className="mb-4">Depoimentos</Badge>
        <h2 id="testimonials-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
          Quem usa, recomenda
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Veja como empresas de todo o Brasil estão vencendo mais licitações com o Qore.
        </p>
      </AnimatedSection>

      <motion.div
        className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
      >
        {testimonials.map((testimonial, i) => (
          <motion.div
            key={testimonial.author}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardContent className="pt-6">
                {/* Quote icon + Stars */}
                <div className="mb-4 flex items-center justify-between">
                  <Quote className="size-8 text-primary/20" />
                  <div className="flex gap-0.5">
                    {Array.from({ length: testimonial.rating }).map((_, j) => (
                      <Star
                        key={j}
                        className="size-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                </div>

                <blockquote className="text-sm leading-relaxed text-foreground">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <div className="mt-6 flex items-center gap-3 border-t pt-4">
                  {/* Avatar */}
                  <div className={`flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-bold ${avatarColors[i % avatarColors.length]}`}>
                    {testimonial.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                    <p className="text-xs font-medium text-primary">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
