import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/config/site";

const footerLinks = {
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

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand + Newsletter */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-xl font-bold">
              {siteConfig.name}
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              A plataforma completa para encontrar, acompanhar e participar de
              licitações públicas em todo o Brasil.
            </p>
            <form
              className="mt-6 flex gap-2"
              action="#"
            >
              <Input
                type="email"
                placeholder="Seu melhor e-mail"
                className="max-w-60"
              />
              <Button type="submit" size="sm">
                Inscrever
              </Button>
            </form>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold">{category}</h3>
              <ul className="mt-4 space-y-3">
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
          <div className="flex gap-4">
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
