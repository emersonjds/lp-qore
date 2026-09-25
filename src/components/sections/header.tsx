import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ScrollStateObserver } from "@/components/layout/scroll-state-observer";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { CONTACT_HREF, primaryNavigation } from "@/config/navigation";
import { HeaderMobileMenu } from "./header-mobile-menu";

export const Header = () => (
  <header id="site-header" className="site-header fixed inset-x-0 top-0 z-50 isolate">
    <ScrollStateObserver targetId="site-header" sentinelId="top-sentinel" />
    <Container>
      <div className="flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="Qore, página inicial" className="inline-flex min-h-11 items-center rounded-md">
          <Logo />
        </Link>
        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {primaryNavigation.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-11 items-center rounded-md px-3 text-label-md text-muted-foreground hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild className="hidden md:inline-flex">
            <a href={CONTACT_HREF} data-cta="header">
              Fale com a gente
            </a>
          </Button>
          <HeaderMobileMenu links={primaryNavigation} contactHref={CONTACT_HREF} />
        </div>
      </div>
    </Container>
  </header>
);
