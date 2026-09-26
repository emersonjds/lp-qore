"use client";

import { useEffect, useRef, useState } from "react";
import { useNearViewport } from "@/hooks/use-near-viewport";
import { formatCountFrame } from "@/lib/count-frame";
import { prefersReducedMotion } from "@/lib/motion-preferences";
import { cn } from "@/lib/utils";

const DURATION_MILLISECONDS = 1400;

const easeOutCubic = (progress: number) => 1 - (1 - progress) ** 3;

interface CountUpProps {
  value: string;
  className?: string;
}

export const CountUp = ({ value, className }: CountUpProps) => {
  const counterRef = useRef<HTMLSpanElement>(null);
  const [frame, setFrame] = useState<string | null>(null);
  const isNear = useNearViewport(counterRef);
  const isInView = useNearViewport(counterRef, "0px 0px -10% 0px");

  useEffect(() => {
    if (!isNear || prefersReducedMotion()) return;
    setFrame(formatCountFrame(value, 0));
  }, [isNear, value]);

  useEffect(() => {
    if (!isInView || prefersReducedMotion()) return;

    let startTime: number | null = null;
    let requestId = 0;
    const step = (time: number) => {
      startTime ??= time;
      const progress = Math.min(1, (time - startTime) / DURATION_MILLISECONDS);
      if (progress === 1) {
        setFrame(null);
        return;
      }
      setFrame(formatCountFrame(value, easeOutCubic(progress)));
      requestId = requestAnimationFrame(step);
    };
    requestId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(requestId);
  }, [isInView, value]);

  return (
    <span ref={counterRef} data-count-up className={cn("inline-grid tabular-nums", className)}>
      <span className={cn("col-start-1 row-start-1", frame !== null && "opacity-0")}>{value}</span>
      {frame !== null && (
        <span aria-hidden="true" className="col-start-1 row-start-1">
          {frame}
        </span>
      )}
    </span>
  );
};
