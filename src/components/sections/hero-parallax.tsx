"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { hasFinePointer, isDesktopViewport, prefersReducedMotion } from "@/lib/motion-preferences";

const MAXIMUM_TILT_DEGREES = 5;
const MAXIMUM_SHIFT_PIXELS = 10;

interface HeroParallaxProps {
  children: ReactNode;
}

export const HeroParallax = ({ children }: HeroParallaxProps) => {
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const section = frame?.closest("section");
    if (!frame || !section || prefersReducedMotion() || !isDesktopViewport() || !hasFinePointer()) return;

    let requestId = 0;
    const handlePointerMove = (event: PointerEvent) => {
      cancelAnimationFrame(requestId);
      requestId = requestAnimationFrame(() => {
        const horizontal = event.clientX / window.innerWidth - 0.5;
        const vertical = event.clientY / window.innerHeight - 0.5;
        frame.style.transform = `perspective(1200px) rotateY(${horizontal * MAXIMUM_TILT_DEGREES}deg) rotateX(${
          -vertical * MAXIMUM_TILT_DEGREES
        }deg) translate3d(${horizontal * MAXIMUM_SHIFT_PIXELS}px, ${vertical * MAXIMUM_SHIFT_PIXELS}px, 0)`;
      });
    };
    const handlePointerLeave = () => {
      cancelAnimationFrame(requestId);
      frame.style.transform = "";
    };

    section.addEventListener("pointermove", handlePointerMove);
    section.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      cancelAnimationFrame(requestId);
      section.removeEventListener("pointermove", handlePointerMove);
      section.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div ref={frameRef} className="transition-transform duration-300 ease-out will-change-transform">
      {children}
    </div>
  );
};
