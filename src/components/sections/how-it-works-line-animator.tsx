"use client";

import { useEffect, useRef } from "react";
import { useNearViewport } from "@/hooks/use-near-viewport";
import { loadScrollTrigger } from "@/lib/load-scroll-trigger";
import { prefersReducedMotion } from "@/lib/motion-preferences";

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
  const isNear = useNearViewport(markerRef);

  useEffect(() => {
    if (!isNear || prefersReducedMotion()) return;
    const section = document.getElementById(sectionId);
    if (!section) return;

    let isCancelled = false;
    let revert = () => {};

    void loadScrollTrigger().then(({ gsap }) => {
      if (isCancelled) return;
      const context = gsap.context(() => {
        const track = section.querySelector<HTMLElement>("[data-step-line]");
        const progress = section.querySelector<HTMLElement>("[data-step-progress]");
        const badges = [...section.querySelectorAll<HTMLElement>("[data-step-badge]")];
        if (!track || !progress || badges.length < 2) return;
        gsap.set(progress, { scaleX: 0 });
        const timeline = gsap.timeline({ scrollTrigger: { trigger: section, start: "top 60%", once: true } });
        badges.slice(1).forEach((badge, index) => {
          timeline
            .to(progress, { scaleX: progressStopAt(track, badge, index + 1, badges.length), duration: 0.8, ease: "power1.inOut" })
            .call(() => {
              badge.dataset.active = "true";
            });
        });
      }, section);
      revert = () => context.revert();
    });

    return () => {
      isCancelled = true;
      revert();
    };
  }, [isNear, sectionId]);

  return <span ref={markerRef} data-line-marker aria-hidden="true" className="pointer-events-none absolute inset-0" />;
};
