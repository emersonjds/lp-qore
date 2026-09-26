"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion-preferences";

const STEP_DURATION_MS = 800;
const SECTION_VISIBLE_MARGIN = "0px 0px -40% 0px";

const progressStopAt = (track: HTMLElement, badge: HTMLElement, step: number, stepCount: number): number => {
  const line = track.getBoundingClientRect();
  const target = badge.getBoundingClientRect();
  if (line.width === 0) return step / (stepCount - 1);
  const badgeCenter = target.left + target.width / 2 - line.left;
  return Math.min(1, Math.max(0, badgeCenter / line.width));
};

interface HowItWorksLineAnimatorProps {
  sectionId: string;
}

export const HowItWorksLineAnimator = ({ sectionId }: HowItWorksLineAnimatorProps) => {
  const markerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const marker = markerRef.current;
    const section = document.getElementById(sectionId);
    if (!marker || !section || prefersReducedMotion()) return;

    const track = section.querySelector<HTMLElement>("[data-step-line]");
    const progress = section.querySelector<HTMLElement>("[data-step-progress]");
    const badges = [...section.querySelectorAll<HTMLElement>("[data-step-badge]")];
    if (!track || !progress || badges.length < 2) return;

    let isCancelled = false;
    const animations: Animation[] = [];

    const play = async () => {
      let currentStop = 0;
      for (const [index, badge] of badges.slice(1).entries()) {
        const nextStop = progressStopAt(track, badge, index + 1, badges.length);
        const animation = progress.animate(
          [{ transform: `scaleX(${currentStop})` }, { transform: `scaleX(${nextStop})` }],
          { duration: STEP_DURATION_MS, easing: "ease-in-out", fill: "forwards" },
        );
        animations.push(animation);
        await animation.finished;
        if (isCancelled) return;
        badge.dataset.active = "true";
        currentStop = nextStop;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        void play();
      },
      { rootMargin: SECTION_VISIBLE_MARGIN },
    );
    observer.observe(marker);

    return () => {
      isCancelled = true;
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
    };
  }, [sectionId]);

  return <span ref={markerRef} data-line-marker aria-hidden="true" className="pointer-events-none absolute inset-0" />;
};
