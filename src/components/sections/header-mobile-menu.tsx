"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { NavLink } from "@/types";
import { accessibleLabels } from "@/config/accessible-labels";

const HeaderMobileSheet = dynamic(() => import("./header-mobile-sheet").then((module) => module.HeaderMobileSheet), {
  ssr: false,
});

interface HeaderMobileMenuProps {
  links: readonly NavLink[];
  contactHref: string;
}

export const HeaderMobileMenu = ({ links, contactHref }: HeaderMobileMenuProps) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const open = () => {
    setHasOpened(true);
    setIsOpen(true);
  };

  return (
    <>
      <Button
        ref={triggerRef}
        variant="ghost"
        size="icon"
        className="lg:hidden"
        aria-label={accessibleLabels.openMenu}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={open}
      >
        <Menu aria-hidden="true" className="size-6" />
      </Button>
      {hasOpened && (
        <HeaderMobileSheet
          links={links}
          contactHref={contactHref}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          triggerRef={triggerRef}
        />
      )}
    </>
  );
};
