"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion-preferences";

const TRAVELER_RADIUS = 6;
const EASE_OUT = "cubic-bezier(0.215, 0.61, 0.355, 1)";
const EASE_IN_OUT = "cubic-bezier(0.455, 0.03, 0.515, 0.955)";
const EASE_BACK_OUT = "cubic-bezier(0.34, 1.56, 0.64, 1)";
const CLAUSE_PULSE_START = 400;
const CLAUSE_PULSE_MS = 350;
const CLAUSE_PULSES = 4;
const TRAVEL_MS = 900;
const TRAVELER_FADE_MS = 200;
const CHIP_MS = 400;
const CHIP_STAGGER_MS = 300;
const ALERT_DELAY_MS = 200;
const ALERT_MS = 600;
const HOLD_MS = 3500;
const FADE_OUT_MS = 500;
const CYCLE_GAP_MS = 1200;

const pointOf = (frame: HTMLElement, element: Element, side: "start" | "end") => {
  const frameBox = frame.getBoundingClientRect();
  const box = element.getBoundingClientRect();
  const x = side === "end" ? box.right - 24 : box.left;
  return { x: x - frameBox.left - TRAVELER_RADIUS, y: box.top + box.height / 2 - frameBox.top - TRAVELER_RADIUS };
};

const translate = ({ x, y }: { x: number; y: number }, scale: number) => `translate(${x}px, ${y}px) scale(${scale})`;

interface CycleParts {
  frame: HTMLElement;
  traveler: HTMLElement;
  clause: Element;
  firstCard: Element;
  chips: readonly Element[];
  alert: Element;
}

const startCycle = ({ frame, traveler, clause, firstCard, chips, alert }: CycleParts): Animation[] => {
  const travelStart = CLAUSE_PULSE_START + CLAUSE_PULSE_MS * CLAUSE_PULSES;
  const chipsStart = travelStart + TRAVEL_MS + TRAVELER_FADE_MS / 2;
  const alertStart = chipsStart + Math.max(chips.length - 1, 0) * CHIP_STAGGER_MS + CHIP_MS + ALERT_DELAY_MS;
  const fadeOutStart = alertStart + ALERT_MS + HOLD_MS;
  const from = pointOf(frame, clause, "end");
  const to = pointOf(frame, firstCard, "start");

  const hiddenChip = { opacity: 0, transform: "scale(0.4)" };
  const shownChip = { opacity: 1, transform: "scale(1)" };
  const hiddenAlert = { opacity: 0, transform: "translateX(24px)" };
  const shownAlert = { opacity: 1, transform: "none" };
  const cycleEnd = fadeOutStart + FADE_OUT_MS + CYCLE_GAP_MS;
  const timed = (delay: number, duration: number) => ({ delay, duration, endDelay: cycleEnd - delay - duration, fill: "both" as const });

  return [
    clause.animate([{ transform: "scale(1)" }, { transform: "scale(1.03)" }], {
      delay: CLAUSE_PULSE_START,
      duration: CLAUSE_PULSE_MS,
      iterations: CLAUSE_PULSES,
      direction: "alternate",
      easing: EASE_OUT,
    }),
    traveler.animate(
      [
        { opacity: 0, transform: translate(from, 1), offset: 0 },
        { opacity: 1, transform: translate(from, 1), offset: 0.01 },
        { opacity: 1, transform: translate(to, 1), offset: TRAVEL_MS / (TRAVEL_MS + TRAVELER_FADE_MS), easing: EASE_IN_OUT },
        { opacity: 0, transform: translate(to, 0.4), offset: 1 },
      ],
      timed(travelStart, TRAVEL_MS + TRAVELER_FADE_MS),
    ),
    ...chips.flatMap((chip, index) => [
      chip.animate([hiddenChip, shownChip], { ...timed(chipsStart + index * CHIP_STAGGER_MS, CHIP_MS), easing: EASE_BACK_OUT, endDelay: 0, fill: "backwards" }),
      chip.animate([shownChip, { opacity: 0, transform: "scale(1)" }], { ...timed(fadeOutStart, FADE_OUT_MS), fill: "forwards" }),
    ]),
    alert.animate([hiddenAlert, shownAlert], { ...timed(alertStart, ALERT_MS), easing: EASE_OUT, endDelay: 0, fill: "backwards" }),
    alert.animate([shownAlert, { opacity: 0, transform: "none" }], { ...timed(fadeOutStart, FADE_OUT_MS), fill: "forwards" }),
  ];
};

export const HeroSplitViewAnimator = () => {
  const markerRef = useRef<HTMLSpanElement>(null);
  const travelerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const marker = markerRef.current;
    const frame = marker?.closest<HTMLElement>("figure");
    const traveler = travelerRef.current;
    if (!marker || !frame || !traveler || prefersReducedMotion()) return;

    const clause = frame.querySelector("[data-source-clause]");
    const firstCard = frame.querySelector("[data-summary-card]");
    const alert = frame.querySelector("[data-risk-alert]");
    if (!clause || !firstCard || !alert) return;
    const parts: CycleParts = { frame, traveler, clause, firstCard, chips: [...frame.querySelectorAll("[data-page-chip]")], alert };

    let animations: Animation[] = [];
    let isOnScreen = false;
    let isDisposed = false;

    const run = () => {
      animations = startCycle(parts);
      const last = animations.at(-1);
      void last?.finished.then(() => {
        if (isDisposed || last !== animations.at(-1)) return;
        animations.forEach((animation) => animation.cancel());
        run();
      });
    };

    const sync = () => {
      const shouldPlay = isOnScreen && document.visibilityState === "visible";
      if (shouldPlay && animations.length === 0) run();
      else animations.forEach((animation) => (shouldPlay ? animation.play() : animation.pause()));
    };

    const observer = new IntersectionObserver(([entry]) => {
      isOnScreen = Boolean(entry?.isIntersecting);
      sync();
    });
    observer.observe(marker);
    document.addEventListener("visibilitychange", sync);

    return () => {
      isDisposed = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      animations.forEach((animation) => animation.cancel());
    };
  }, []);

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
