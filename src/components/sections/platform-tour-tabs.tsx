"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import { platformScreens } from "@/components/simulated-screens/platform-screens";
import { prefersReducedMotion } from "@/lib/motion-preferences";
import { cn } from "@/lib/utils";
import type { PlatformTab } from "@/types";
import { accessibleLabels } from "@/config/accessible-labels";

const SWIPE_DISTANCE = 48;
const RESUME_AFTER_MILLISECONDS = 10_000;

interface PlatformTourTabsProps {
  tabs: readonly PlatformTab[];
}

export const PlatformTourTabs = ({ tabs }: PlatformTourTabsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isEnhanced, setIsEnhanced] = useState(false);
  const [isAutoplayAllowed, setIsAutoplayAllowed] = useState(false);
  const [isOnScreen, setIsOnScreen] = useState<boolean | null>(null);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isHeldByVisitor, setIsHeldByVisitor] = useState(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const baseId = useId();
  const tourRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    setIsEnhanced(true);
    setIsAutoplayAllowed(!prefersReducedMotion());
  }, []);

  useEffect(() => {
    const tour = tourRef.current;
    if (!tour || !isAutoplayAllowed) return;

    const observer = new IntersectionObserver(([entry]) => setIsOnScreen(entry?.isIntersecting ?? false));
    observer.observe(tour);
    const handleVisibilityChange = () => setIsPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isAutoplayAllowed]);

  useEffect(() => () => clearTimeout(resumeTimeoutRef.current), []);

  const selectByVisitor = (index: number) => {
    setIsHeldByVisitor(true);
    clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => setIsHeldByVisitor(false), RESUME_AFTER_MILLISECONDS);
    setActiveIndex((index + tabs.length) % tabs.length);
  };

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
    selectByVisitor(Math.min(tabs.length - 1, Math.max(0, activeIndex + (distanceX < 0 ? 1 : -1))));
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
    const nextIndex = (targetIndex + tabs.length) % tabs.length;
    selectByVisitor(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  const showsProgress = isEnhanced && isAutoplayAllowed && !isHeldByVisitor && isOnScreen !== null;
  const isProgressRunning = Boolean(isOnScreen) && isPageVisible && !isHovered && !isFocused;

  return (
    <div
      ref={tourRef}
      data-platform-tour
    >
      <div
        role="tablist"
        aria-label={accessibleLabels.platformScreens}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        onFocus={(event) => setIsFocused(event.target.matches(":focus-visible"))}
        onBlur={() => setIsFocused(false)}
        className={cn("-mx-4 flex gap-2 overflow-x-auto px-4 pb-4 md:mx-0 md:px-0", !isEnhanced && "hidden")}
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
            onClick={() => selectByVisitor(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={cn(
              "relative min-h-11 shrink-0 rounded-md px-4 py-2 text-label-md shadow-sm",
              index === activeIndex ? "bg-primary text-primary-foreground" : "bg-card text-foreground hover:bg-surface-container",
            )}
          >
            {tab.label}
            {showsProgress && index === activeIndex && (
              <span
                key={activeIndex}
                aria-hidden="true"
                data-tab-progress
                onAnimationEnd={() => setActiveIndex((current) => (current + 1) % tabs.length)}
                style={{ animationPlayState: isProgressRunning ? "running" : "paused" }}
                className="animate-tab-progress absolute inset-x-1 -bottom-2 h-[3px] origin-left rounded-full bg-primary"
              />
            )}
          </button>
        ))}
      </div>
      <div
        data-tour-panels
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={cn("mt-4", isEnhanced ? "grid" : "flex flex-col gap-10")}
      >
        {tabs.map((tab, index) => {
          const Screen = platformScreens[tab.id];
          const isActive = isEnhanced && index === activeIndex;
          return (
            <div
              key={tab.id}
              id={`${baseId}-panel-${tab.id}`}
              role={isEnhanced ? "tabpanel" : undefined}
              aria-labelledby={isEnhanced ? `${baseId}-tab-${tab.id}` : undefined}
              data-screen-active={isActive ? "" : undefined}
              inert={isEnhanced && !isActive}
              className={cn(
                "min-w-0 transition-[translate] duration-500 ease-out motion-reduce:transition-none",
                isEnhanced && "col-start-1 row-start-1",
                isEnhanced && !isActive && "pointer-events-none translate-y-3 opacity-0",
              )}
            >
              {!isEnhanced && <p className="mb-3 font-display text-title-md text-foreground">{tab.label}</p>}
              <Screen key={isActive ? "active" : "idle"} label={tab.label} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
