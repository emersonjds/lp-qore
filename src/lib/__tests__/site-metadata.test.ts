import { describe, expect, it } from "vitest";
import { buildRootMetadata } from "../site-metadata";

const metadata = buildRootMetadata({
  siteName: "Qore",
  slogan: "A IA lê o edital. Você decide.",
  description: "Descrição",
  siteUrl: "https://preview.qore.com.br",
});

describe("buildRootMetadata", () => {
  it("sets the canonical base from the site URL", () => {
    expect(metadata.metadataBase?.toString()).toBe("https://preview.qore.com.br/");
    expect(metadata.alternates?.canonical).toBe("/");
  });

  it("titles pages with the slogan and a template", () => {
    expect(metadata.title).toEqual({ default: "Qore | A IA lê o edital. Você decide.", template: "%s | Qore" });
  });

  it("shares a 1200×630 Open Graph image and a large Twitter card", () => {
    expect(metadata.openGraph).toMatchObject({
      locale: "pt_BR",
      type: "website",
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    });
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image", images: ["/og.png"] });
  });
});
