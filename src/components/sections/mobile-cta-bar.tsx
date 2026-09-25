"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CONTACT_HREF } from "@/config/navigation";
import { cn } from "@/lib/utils";

export const MobileCtaBar = () => {
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isContactReached, setIsContactReached] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    const contact = document.getElementById("contato");
    if (!hero || !contact) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === hero) setIsHeroVisible(entry.isIntersecting);
        if (entry.target === contact) setIsContactReached(entry.isIntersecting || entry.boundingClientRect.top < 0);
      });
    });
    observer.observe(hero);
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  const isVisible = !isHeroVisible && !isContactReached;

  return (
    <aside
      aria-label="Fale com a gente"
      data-visible={isVisible}
      inert={!isVisible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-lg backdrop-blur transition-transform duration-300 ease-out motion-reduce:transition-none md:hidden",
        isVisible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <Button asChild size="lg" className="w-full">
        <a href={CONTACT_HREF} data-cta="mobile-sticky">
          Fale com a gente
        </a>
      </Button>
    </aside>
  );
};
