import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Hanken_Grotesk, Inter } from "next/font/google";
import { siteConfig } from "@/config/site";
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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `${siteConfig.name} | ${siteConfig.slogan}`,
  description: siteConfig.description,
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="pt-BR" className={`${inter.variable} ${hankenGrotesk.variable}`}>
    <body className="min-h-dvh bg-background font-sans text-foreground antialiased">{children}</body>
  </html>
);

export default RootLayout;
