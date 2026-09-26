"use client";

import type { RefObject } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { CONTACT_SPECIALIST_LABEL } from "@/config/navigation";
import type { NavLink } from "@/types";

export interface HeaderMobileSheetProps {
  links: readonly NavLink[];
  contactHref: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}

export const HeaderMobileSheet = ({ links, contactHref, isOpen, onOpenChange, triggerRef }: HeaderMobileSheetProps) => {
  const close = () => onOpenChange(false);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[min(20rem,85vw)] p-6"
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          triggerRef.current?.focus();
        }}
      >
        <SheetTitle className="font-display text-title-md">Menu</SheetTitle>
        <SheetDescription className="sr-only">Navegação principal do site</SheetDescription>
        <nav aria-label="Principal no celular">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={close}
                  className="flex min-h-11 items-center rounded-md px-3 text-body-md text-foreground hover:bg-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <Button asChild size="lg" className="mt-auto w-full">
          <a href={contactHref} onClick={close} data-cta="mobile-menu">
            {CONTACT_SPECIALIST_LABEL}
          </a>
        </Button>
      </SheetContent>
    </Sheet>
  );
};
