"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { NavLink } from "@/types";

interface HeaderMobileMenuProps {
  links: readonly NavLink[];
  contactHref: string;
}

export const HeaderMobileMenu = ({ links, contactHref }: HeaderMobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Abrir menu">
          <Menu aria-hidden="true" className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[min(20rem,85vw)] p-6">
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
            Fale com a gente
          </a>
        </Button>
      </SheetContent>
    </Sheet>
  );
};
