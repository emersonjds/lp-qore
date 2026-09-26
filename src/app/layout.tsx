import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Hanken_Grotesk, Inter } from "next/font/google";
import { RevealObserver } from "@/components/layout/reveal-observer";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { siteConfig } from "@/config/site";
import { buildRootMetadata } from "@/lib/site-metadata";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-inter",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-hanken-grotesk",
});

export const metadata: Metadata = buildRootMetadata({
  siteName: siteConfig.name,
  slogan: siteConfig.slogan,
  description: siteConfig.description,
  siteUrl: siteConfig.url,
});

export const viewport: Viewport = { themeColor: "#047857" };

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="pt-BR" className={`${inter.variable} ${hankenGrotesk.variable}`}>
    <body className="relative min-h-dvh bg-background font-sans text-foreground antialiased">
      <div id="top-sentinel" aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-6" />
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-card focus:px-4 focus:py-3 focus:shadow-lg"
      >
        Pular para o conteúdo
      </a>
      <Header />
      {children}
      <Footer />
      <RevealObserver />
    </body>
  </html>
);

export default RootLayout;
