"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import { useNearViewport } from "@/hooks/use-near-viewport";
import { loadScrollTrigger } from "@/lib/load-scroll-trigger";
import { isDesktopViewport, prefersReducedMotion } from "@/lib/motion-preferences";
import { cn } from "@/lib/utils";
import type { PlatformTab } from "@/types";
import { ScreenshotPicture } from "./panel-screenshot";

const IMAGE_SIZES = "(min-width: 1024px) 56rem, 100vw";
const SWIPE_DISTANCE = 48;

interface PlatformTourTabsProps {
  tabs: readonly PlatformTab[];
}

export const PlatformTourTabs = ({ tabs }: PlatformTourTabsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isEnhanced, setIsEnhanced] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const baseId = useId();
  const tourRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const isNear = useNearViewport(tourRef);

  useEffect(() => setIsEnhanced(true), []);

  useEffect(() => {
    const tour = tourRef.current;
    if (!isNear || !tour || prefersReducedMotion() || !isDesktopViewport()) return;

    let isCancelled = false;
    let kill = () => {};

    void loadScrollTrigger().then(({ ScrollTrigger }) => {
      if (isCancelled) return;
      let scrolledIndex = 0;
      const trigger = ScrollTrigger.create({
        trigger: tour,
        pin: true,
        start: "top 88px",
        end: `+=${tabs.length * 60}%`,
        onUpdate: (self: { progress: number }) => {
          const nextIndex = Math.min(tabs.length - 1, Math.floor(self.progress * tabs.length));
          if (nextIndex === scrolledIndex) return;
          scrolledIndex = nextIndex;
          setActiveIndex(nextIndex);
        },
      });
      kill = () => trigger.kill();
    });

    return () => {
      isCancelled = true;
      kill();
    };
  }, [isNear, tabs.length]);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0];
    touchStartRef.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    const touch = event.changedTouches[0];
    if (!start || !touch) return;
    const distanceX = touch.clientX - start.x;
    if (Math.abs(distanceX) < SWIPE_DISTANCE || Math.abs(distanceX) < Math.abs(touch.clientY - start.y)) return;
    setActiveIndex((index) => Math.min(tabs.length - 1, Math.max(0, index + (distanceX < 0 ? 1 : -1))));
  };

  const focusTab = (index: number) => {
    const nextIndex = (index + tabs.length) % tabs.length;
    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const targetIndex = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: tabs.length - 1,
    }[event.key];
    if (targetIndex === undefined) return;
    event.preventDefault();
    focusTab(targetIndex);
  };

  return (
    <div ref={tourRef} data-platform-tour className="mt-10 lg:mx-auto lg:max-w-4xl">
      <div
        role="tablist"
        aria-label="Telas da plataforma"
        className={cn("flex flex-wrap gap-2", !isEnhanced && "hidden")}
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            id={`${baseId}-tab-${tab.id}`}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-controls={`${baseId}-panel-${tab.id}`}
            tabIndex={index === activeIndex ? 0 : -1}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={cn(
              "min-h-11 rounded-md border px-4 text-label-md",
              index === activeIndex
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground hover:bg-accent",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        data-tour-panels
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={cn("mt-6", isEnhanced ? "grid" : "flex flex-col gap-10")}
      >
        {tabs.map((tab, index) => (
          <figure
            key={tab.id}
            id={`${baseId}-panel-${tab.id}`}
            role={isEnhanced ? "tabpanel" : undefined}
            aria-labelledby={isEnhanced ? `${baseId}-tab-${tab.id}` : undefined}
            className={cn(
              "transition-[opacity,transform,visibility] duration-500 ease-out motion-reduce:transition-none",
              isEnhanced && "col-start-1 row-start-1",
              isEnhanced && index !== activeIndex && "invisible scale-[0.98] opacity-0",
            )}
          >
            <figcaption className="text-body-md text-muted-foreground">
              {!isEnhanced && <strong className="font-display text-title-md text-foreground">{tab.label}: </strong>}
              {tab.caption}
            </figcaption>
            <ScreenshotPicture
              image={tab.image}
              alt={tab.alt}
              sizes={IMAGE_SIZES}
              className="mt-4 rounded-lg border border-border shadow-md"
            />
          </figure>
        ))}
      </div>
    </div>
  );
};
