"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Container } from "@/components/layout/container";
import { navLinks } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { useScrollPosition } from "@/hooks/use-scroll-position";

export function Header() {
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 20;
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      className="fixed top-0 right-0 left-0 z-50 transition-colors duration-300"
      style={{
        backgroundColor: isScrolled
          ? "rgba(255, 255, 255, 0.85)"
          : "transparent",
        backdropFilter: isScrolled ? "blur(12px)" : "none",
        boxShadow: isScrolled
          ? "0 1px 3px 0 rgb(0 0 0 / 0.05)"
          : "none",
      }}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold text-foreground">
            {siteConfig.name}
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Button variant="ghost" size="sm" asChild>
              <Link href="#pricing">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="#pricing">Get Started</Link>
            </Button>
          </div>

          {/* Mobile nav */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="size-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="text-lg font-bold">
                {siteConfig.name}
              </SheetTitle>
              <div className="mt-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-4 flex flex-col gap-2">
                  <Button variant="outline" asChild>
                    <Link href="#pricing" onClick={() => setOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link href="#pricing" onClick={() => setOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </Container>
    </motion.header>
  );
}
