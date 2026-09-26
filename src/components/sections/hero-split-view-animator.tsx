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

const startLoop = ({ frame, traveler, clause, firstCard, chips, alert }: CycleParts): Animation[] => {
  const travelStart = CLAUSE_PULSE_START + CLAUSE_PULSE_MS * CLAUSE_PULSES;
  const travelEnd = travelStart + TRAVEL_MS;
  const chipsStart = travelEnd + TRAVELER_FADE_MS / 2;
  const alertStart = chipsStart + Math.max(chips.length - 1, 0) * CHIP_STAGGER_MS + CHIP_MS + ALERT_DELAY_MS;
  const fadeOutStart = alertStart + ALERT_MS + HOLD_MS;
  const loopMs = fadeOutStart + FADE_OUT_MS + CYCLE_GAP_MS;
  const at = (ms: number) => ms / loopMs;
  const loop: KeyframeAnimationOptions = { duration: loopMs, iterations: Infinity };
  const from = pointOf(frame, clause, "end");
  const to = pointOf(frame, firstCard, "start");

  const pulses = Array.from({ length: CLAUSE_PULSES + 1 }, (_, index) => ({
    transform: index % 2 === 0 ? "scale(1)" : "scale(1.03)",
    offset: at(CLAUSE_PULSE_START + index * CLAUSE_PULSE_MS),
    easing: EASE_OUT,
  }));

  const revealLoop = (start: number, duration: number, hidden: Keyframe, shown: Keyframe, easing: string): Keyframe[] => [
    { ...hidden, offset: 0 },
    { ...hidden, offset: at(start), easing },
    { ...shown, offset: at(start + duration) },
    { ...shown, offset: at(fadeOutStart), easing: EASE_OUT },
    { ...shown, opacity: 0, offset: at(fadeOutStart + FADE_OUT_MS) },
    { ...shown, opacity: 0, offset: 1 },
  ];

  return [
    clause.animate([{ transform: "scale(1)", offset: 0 }, ...pulses, { transform: "scale(1)", offset: 1 }], loop),
    traveler.animate(
      [
        { opacity: 0, transform: translate(from, 1), offset: 0 },
        { opacity: 0, transform: translate(from, 1), offset: at(travelStart) },
        { opacity: 1, transform: translate(from, 1), offset: at(travelStart + 10), easing: EASE_IN_OUT },
        { opacity: 1, transform: translate(to, 1), offset: at(travelEnd) },
        { opacity: 0, transform: translate(to, 0.4), offset: at(travelEnd + TRAVELER_FADE_MS) },
        { opacity: 0, transform: translate(to, 0.4), offset: 1 },
      ],
      loop,
    ),
    ...chips.map((chip, index) =>
      chip.animate(
        revealLoop(
          chipsStart + index * CHIP_STAGGER_MS,
          CHIP_MS,
          { opacity: 0, transform: "scale(0.4)" },
          { opacity: 1, transform: "scale(1)" },
          EASE_BACK_OUT,
        ),
        loop,
      ),
    ),
    alert.animate(
      revealLoop(alertStart, ALERT_MS, { opacity: 0, transform: "translateX(24px)" }, { opacity: 1, transform: "none" }, EASE_OUT),
      loop,
    ),
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

    const sync = () => {
      const shouldPlay = isOnScreen && document.visibilityState === "visible";
      if (shouldPlay && animations.length === 0) animations = startLoop(parts);
      else animations.forEach((animation) => (shouldPlay ? animation.play() : animation.pause()));
    };

    const observer = new IntersectionObserver(([entry]) => {
      isOnScreen = Boolean(entry?.isIntersecting);
      sync();
    });
    observer.observe(marker);
    document.addEventListener("visibilitychange", sync);

    return () => {
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
