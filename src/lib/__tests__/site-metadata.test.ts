import { describe, expect, it } from "vitest";
import { siteConfig } from "@/config/site";
import { buildRootMetadata } from "../site-metadata";

const metadata = buildRootMetadata({ ...siteConfig, siteName: siteConfig.name, siteUrl: "https://preview.qore.com.br" });

const OG_TITLE = "Qore: licitações de SP, do radar à proposta pronta";
const OG_DESCRIPTION =
  "Radar pelo CNPJ, resumo do edital com IA, proposta ~80% pronta, certidões e prazos. Os 645 municípios de SP.";

describe("buildRootMetadata", () => {
  it("sets the canonical base from the site URL", () => {
    expect(metadata.metadataBase?.toString()).toBe("https://preview.qore.com.br/");
    expect(metadata.alternates?.canonical).toBe("/");
  });

  it("titles pages with the positioning title, not the slogan, and a template", () => {
    expect(metadata.title).toEqual({
      default: "Qore | Licitações de São Paulo, do radar à proposta",
      template: "%s | Qore",
    });
  });

  it("describes the platform for search results", () => {
    expect(metadata.description).toBe(
      "Plataforma de licitações para quem vende ao governo em SP: radar pelo CNPJ, resumo do edital com IA, proposta ~80% pronta, certidões e prazos da equipe.",
    );
  });

  it("shares its own title and description on Open Graph and Twitter", () => {
    expect(metadata.openGraph).toMatchObject({ title: OG_TITLE, description: OG_DESCRIPTION });
    expect(metadata.twitter).toMatchObject({ title: OG_TITLE, description: OG_DESCRIPTION });
  });

  it("shares a cache-busted 1200×630 Open Graph image and a large Twitter card", () => {
    expect(metadata.openGraph).toMatchObject({
      locale: "pt_BR",
      type: "website",
      images: [{ url: "/og.png?v=2", width: 1200, height: 630, alt: OG_TITLE }],
    });
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image", images: ["/og.png?v=2"] });
  });
});

describe("siteConfig", () => {
  it("carries the positioning slogan", () => {
    expect(siteConfig.slogan).toBe("Sua operação de licitação em um lugar.");
  });
});
