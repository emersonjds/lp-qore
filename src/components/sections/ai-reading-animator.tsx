"use client";

import { useEffect, useRef } from "react";
import { useNearViewport } from "@/hooks/use-near-viewport";
import { loadScrollTrigger } from "@/lib/load-scroll-trigger";
import { prefersReducedMotion } from "@/lib/motion-preferences";

const TRAVELER_RADIUS = 6;

const pointOf = (figure: HTMLElement, element: Element, side: "start" | "end") => {
  const frame = figure.getBoundingClientRect();
  const rectangle = element.getBoundingClientRect();
  const x = side === "end" ? rectangle.right : rectangle.left;
  return { x: x - frame.left - TRAVELER_RADIUS, y: rectangle.top + rectangle.height / 2 - frame.top - TRAVELER_RADIUS };
};

export const AiReadingAnimator = () => {
  const markerRef = useRef<HTMLSpanElement>(null);
  const isNear = useNearViewport(markerRef, "200px 0px");

  useEffect(() => {
    const figure = markerRef.current?.closest<HTMLElement>("[data-ai-reading]");
    if (!isNear || !figure || prefersReducedMotion()) return;

    let isCancelled = false;
    let revert = () => {};

    void loadScrollTrigger().then(({ gsap, ScrollTrigger }) => {
      if (isCancelled) return;
      const highlights = [...figure.querySelectorAll("[data-excerpt-highlight]")];
      const items = [...figure.querySelectorAll("[data-summary-item]")];
      const chips = [...figure.querySelectorAll("[data-summary-chip]")];
      const traveler = figure.querySelector("[data-traveler]");

      const context = gsap.context(() => {
        const timeline = gsap.timeline({ repeat: -1, repeatDelay: 0.4, paused: true, defaults: { ease: "power2.out" } });
        timeline
          .set(highlights, { scaleX: 0, opacity: 1, transformOrigin: "left center" })
          .set(items, { opacity: 0, x: -12 })
          .set(chips, { opacity: 0, scale: 0.4 })
          .set(traveler, { opacity: 0 });

        highlights.forEach((highlight, index) => {
          const item = items[index];
          const chip = chips[index];
          if (!item || !chip) return;
          timeline
            .to(highlight, { scaleX: 1, duration: 0.7, delay: 0.3 })
            .set(traveler, {
              x: () => pointOf(figure, highlight, "end").x,
              y: () => pointOf(figure, highlight, "end").y,
              opacity: 1,
              scale: 1,
            })
            .to(traveler, {
              x: () => pointOf(figure, item, "start").x,
              y: () => pointOf(figure, item, "start").y,
              duration: 0.9,
              ease: "power2.inOut",
            })
            .to(traveler, { opacity: 0, scale: 0.4, duration: 0.2 })
            .to(item, { opacity: 1, x: 0, duration: 0.45 }, "<")
            .to(chip, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2.5)" }, "-=0.15");
        });

        timeline.to([...highlights, ...items, ...chips], { opacity: 0, duration: 0.5, delay: 2.4 });

        ScrollTrigger.create({
          trigger: figure,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self: { isActive: boolean }) => (self.isActive ? timeline.play() : timeline.pause()),
        });

        const handleResize = () => timeline.invalidate();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, figure);
      revert = () => context.revert();
    });

    return () => {
      isCancelled = true;
      revert();
    };
  }, [isNear]);

  return <span ref={markerRef} data-animation-marker aria-hidden="true" className="pointer-events-none absolute inset-0" />;
};
