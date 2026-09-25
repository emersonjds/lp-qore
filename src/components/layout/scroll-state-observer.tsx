"use client";

import { useEffect } from "react";

interface ScrollStateObserverProps {
  targetId: string;
  sentinelId: string;
}

export const ScrollStateObserver = ({ targetId, sentinelId }: ScrollStateObserverProps) => {
  useEffect(() => {
    const target = document.getElementById(targetId);
    const sentinel = document.getElementById(sentinelId);
    if (!target || !sentinel) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      target.toggleAttribute("data-scrolled", !entry.isIntersecting);
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [targetId, sentinelId]);

  return null;
};
