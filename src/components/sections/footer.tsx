import Link from "next/link";
import { ShieldCheck, Globe, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/ui/logo";
import { siteConfig } from "@/config/site";

const footerLinks: Record<string, { label: string; href: string }[]> = {
  Plataforma: [
    { label: "Funcionalidades", href: "#features" },
    { label: "Planos", href: "#pricing" },
    { label: "Integrações", href: "#" },
    { label: "Atualizações", href: "#" },
  ],
  Empresa: [
    { label: "Sobre nós", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Carreiras", href: "#" },
    { label: "Contato", href: "#" },
  ],
  Recursos: [
    { label: "Documentação", href: "#" },
    { label: "Central de Ajuda", href: "#" },
    { label: "Comunidade", href: "#" },
    { label: "Status", href: "#" },
  ],
  Legal: [
    { label: "Privacidade", href: "#" },
    { label: "Termos de Uso", href: "#" },
    { label: "Segurança", href: "#" },
    { label: "LGPD", href: "#" },
  ],
};

const trustSeals = [
  {
    icon: ShieldCheck,
    label: "LGPD Compliance",
  },
  {
    icon: Lock,
    label: "SOC 2 Type II",
  },
  {
    icon: Globe,
    label: "Dados no Brasil",
  },
];

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand + Newsletter */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xl font-bold text-foreground"
            >
              <Logo className="size-6" aria-hidden="true" />
              {siteConfig.name}
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Encontre, analise e vença licitações públicas em todo o Brasil.
            </p>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-eyebrow mb-2 text-muted-foreground">
                Newsletter
              </p>
              <p className="mb-3 text-xs text-muted-foreground">
                Notícias de licitações e atualizações do produto. Sem spam.
              </p>
              <form className="flex gap-2" action="#">
                <Input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  className="max-w-52"
                  aria-label="E-mail para newsletter"
                />
                <Button type="submit" size="sm">
                  Inscrever
                </Button>
              </form>
            </div>

            {/* Trust seals */}
            <div className="mt-6 flex flex-wrap gap-3">
              {trustSeals.map((seal) => (
                <div
                  key={seal.label}
                  className="flex items-center gap-1.5 rounded-lg border border-border/70 bg-muted/40 px-2.5 py-1.5"
                >
                  <seal.icon
                    className="size-3.5 text-primary"
                    aria-hidden="true"
                  />
                  <span className="text-[10px] font-semibold text-muted-foreground">
                    {seal.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="text-eyebrow mb-4 text-muted-foreground">
                {category}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator />

        <div className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {siteConfig.name}. Todos os
            direitos reservados.
          </p>
          <div className="flex gap-5">
            <Link
              href={siteConfig.links.twitter}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </Link>
            <Link
              href={siteConfig.links.github}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
            <Link
              href={siteConfig.links.linkedin}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
