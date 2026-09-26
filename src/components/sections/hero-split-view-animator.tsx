"use client";

import { useEffect, useRef } from "react";
import { useNearViewport } from "@/hooks/use-near-viewport";
import { loadScrollTrigger } from "@/lib/load-scroll-trigger";
import { prefersReducedMotion } from "@/lib/motion-preferences";

const TRAVELER_RADIUS = 6;

const pointOf = (frame: HTMLElement, element: Element, side: "start" | "end") => {
  const frameBox = frame.getBoundingClientRect();
  const box = element.getBoundingClientRect();
  const x = side === "end" ? box.right - 24 : box.left;
  return { x: x - frameBox.left - TRAVELER_RADIUS, y: box.top + box.height / 2 - frameBox.top - TRAVELER_RADIUS };
};

export const HeroSplitViewAnimator = () => {
  const markerRef = useRef<HTMLSpanElement>(null);
  const travelerRef = useRef<HTMLSpanElement>(null);
  const isNear = useNearViewport(markerRef, "200px 0px");

  useEffect(() => {
    const frame = markerRef.current?.closest<HTMLElement>("figure");
    const traveler = travelerRef.current;
    if (!isNear || !frame || !traveler || prefersReducedMotion()) return;

    let isCancelled = false;
    let revert = () => {};

    void loadScrollTrigger().then(({ gsap, ScrollTrigger }) => {
      if (isCancelled) return;
      const clause = frame.querySelector("[data-source-clause]");
      const firstCard = frame.querySelector("[data-summary-card]");
      const chips = [...frame.querySelectorAll("[data-page-chip]")];
      const alert = frame.querySelector("[data-risk-alert]");
      if (!clause || !firstCard || !alert) return;

      const context = gsap.context(() => {
        const timeline = gsap.timeline({ repeat: -1, repeatDelay: 1.2, paused: true, defaults: { ease: "power2.out" } });
        timeline
          .set(chips, { opacity: 0, scale: 0.4 })
          .set(alert, { opacity: 0, x: 24 })
          .set(traveler, { opacity: 0 })
          .to(clause, { scale: 1.03, duration: 0.35, yoyo: true, repeat: 3, delay: 0.4 })
          .set(traveler, {
            x: () => pointOf(frame, clause, "end").x,
            y: () => pointOf(frame, clause, "end").y,
            opacity: 1,
            scale: 1,
          })
          .to(traveler, {
            x: () => pointOf(frame, firstCard, "start").x,
            y: () => pointOf(frame, firstCard, "start").y,
            duration: 0.9,
            ease: "power2.inOut",
          })
          .to(traveler, { opacity: 0, scale: 0.4, duration: 0.2 });

        chips.forEach((chip) => {
          timeline.to(chip, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2.5)" }, "-=0.1");
        });

        timeline
          .to(alert, { opacity: 1, x: 0, duration: 0.6, delay: 0.2 })
          .to([...chips, alert], { opacity: 0, duration: 0.5, delay: 3.5 });

        let isOnScreen = false;
        const sync = () => (isOnScreen && document.visibilityState === "visible" ? timeline.play() : timeline.pause());

        ScrollTrigger.create({
          trigger: frame,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self: { isActive: boolean }) => {
            isOnScreen = self.isActive;
            sync();
          },
        });

        document.addEventListener("visibilitychange", sync);
        return () => document.removeEventListener("visibilitychange", sync);
      }, frame);
      revert = () => context.revert();
    });

    return () => {
      isCancelled = true;
      revert();
    };
  }, [isNear]);

  return (
    <>
      <span ref={markerRef} data-animation-marker aria-hidden="true" className="pointer-events-none absolute inset-0" />
      <span
        ref={travelerRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 z-10 size-3 rounded-full bg-primary opacity-0 shadow-[0_0_0_6px_rgb(4_120_87/0.18)]"
      />
    </>
  );
};
