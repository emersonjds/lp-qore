"use client";

import { useEffect, useRef } from "react";
import { useNearViewport } from "@/hooks/use-near-viewport";
import { loadScrollTrigger } from "@/lib/load-scroll-trigger";
import { prefersReducedMotion } from "@/lib/motion-preferences";

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
        const line = section.querySelector("[data-step-line]");
        if (!line) return;
        gsap.fromTo(
          line,
          { scaleX: 0 },
          { scaleX: 1, ease: "none", scrollTrigger: { trigger: section, start: "top 75%", end: "bottom 60%", scrub: true } },
        );
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
