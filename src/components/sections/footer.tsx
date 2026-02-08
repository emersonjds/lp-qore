import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/config/site";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Integrations", href: "#" },
    { label: "Changelog", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "Help Center", href: "#" },
    { label: "Community", href: "#" },
    { label: "Status", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Security", href: "#" },
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
              The all-in-one platform for teams to plan, build, and ship
              products faster.
            </p>
            <form
              className="mt-6 flex gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="email"
                placeholder="Enter your email"
                className="max-w-[240px]"
              />
              <Button type="submit" size="sm">
                Subscribe
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
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
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
