"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { AnimatedSection } from "@/components/layout/animated-section";
import { testimonials } from "@/config/testimonials";

export function Testimonials() {
  return (
    <SectionWrapper
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="bg-muted/30"
    >
      <AnimatedSection className="mx-auto max-w-2xl text-center">
        <Badge variant="secondary" className="mb-4">Testimonials</Badge>
        <h2 id="testimonials-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
          Loved by teams everywhere
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Don&apos;t just take our word for it — hear from the teams that use LPQore
          every day.
        </p>
      </AnimatedSection>

      <motion.div
        className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial.author}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full">
              <CardContent className="pt-6">
                {/* Stars */}
                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <blockquote className="text-sm leading-relaxed text-foreground">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <div className="mt-6 flex items-center gap-3">
                  {/* Avatar placeholder */}
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {testimonial.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
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
