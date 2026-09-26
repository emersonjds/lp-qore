"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { PlatformTab } from "@/types";
import { ScreenshotPicture } from "./panel-screenshot";

const IMAGE_SIZES = "(min-width: 1024px) 56rem, 100vw";

interface PlatformTourTabsProps {
  tabs: readonly PlatformTab[];
}

export const PlatformTourTabs = ({ tabs }: PlatformTourTabsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isEnhanced, setIsEnhanced] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const baseId = useId();

  useEffect(() => setIsEnhanced(true), []);

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
    <div className="mt-10 lg:mx-auto lg:max-w-4xl">
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
      <div className={cn("mt-6", isEnhanced ? "grid" : "flex flex-col gap-10")}>
        {tabs.map((tab, index) => (
          <figure
            key={tab.id}
            id={`${baseId}-panel-${tab.id}`}
            role={isEnhanced ? "tabpanel" : undefined}
            aria-labelledby={isEnhanced ? `${baseId}-tab-${tab.id}` : undefined}
            className={cn(
              "transition-opacity duration-300 motion-reduce:transition-none",
              isEnhanced && "col-start-1 row-start-1",
              isEnhanced && index !== activeIndex && "invisible opacity-0",
            )}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <figcaption className="text-body-md text-muted-foreground">
                {!isEnhanced && <strong className="font-display text-title-md text-foreground">{tab.label}: </strong>}
                {tab.caption}
              </figcaption>
              <Badge variant="outline">Tela ilustrativa</Badge>
            </div>
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
