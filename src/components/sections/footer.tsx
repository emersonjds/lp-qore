import { Container } from "@/components/layout/container";
import { Logo } from "@/components/ui/logo";
import { footerNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { hasFooterLegalLine } from "@/lib/legal";
import type { LegalIdentity } from "@/types";
import { accessibleLabels } from "@/config/accessible-labels";

interface FooterProps {
  year?: number;
  legal?: LegalIdentity;
}

export const Footer = ({ year = new Date().getFullYear(), legal = siteConfig.legal }: FooterProps) => (
  <footer className="bg-surface-low">
    <Container className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-2">
        <Logo />
        <p className="text-caption text-muted-foreground">
          © {year} {siteConfig.name}. Todos os direitos reservados.
        </p>
        {hasFooterLegalLine(legal) ? (
          <p className="text-caption text-muted-foreground">
            {legal.companyName} · CNPJ {legal.taxId} · {legal.city}/{legal.state}
          </p>
        ) : null}
      </div>
      <nav aria-label={accessibleLabels.footerNavigation}>
        <ul className="flex flex-wrap gap-x-2 gap-y-1">
          {footerNavigation.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="inline-flex min-h-11 items-center rounded-md px-2 text-label-md text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </Container>
  </footer>
);
