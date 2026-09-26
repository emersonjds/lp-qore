import { describe, expect, it } from "vitest";
import { buildStructuredData, serializeJsonLd } from "../structured-data";

const input = {
  siteName: "Qore",
  siteUrl: "https://preview.qore.com.br",
  description: "Descrição",
  faqItems: [{ question: "Quanto custa?", answer: "Ainda não publicamos preço." }],
};

describe("buildStructuredData", () => {
  it("describes the organization, the website and the FAQ", () => {
    const data = buildStructuredData(input);
    expect(data["@graph"].map((node) => node["@type"])).toEqual(["Organization", "WebSite", "FAQPage"]);
  });

  it("derives every URL from the site origin", () => {
    const [organization, website] = buildStructuredData(input)["@graph"];
    expect(organization).toMatchObject({
      url: "https://preview.qore.com.br/",
      logo: "https://preview.qore.com.br/apple-icon.png",
    });
    expect(website).toMatchObject({ url: "https://preview.qore.com.br/", inLanguage: "pt-BR" });
  });

  it("never publishes an offer, a price or invented organization fields", () => {
    const json = JSON.stringify(buildStructuredData(input));
    expect(json).not.toMatch(/Offer|price|SoftwareApplication|sameAs|address|founder|taxID/);
  });

  it("maps FAQ items to questions and answers", () => {
    const faqPage = buildStructuredData(input)["@graph"][2];
    expect(faqPage).toEqual({
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Quanto custa?",
          acceptedAnswer: { "@type": "Answer", text: "Ainda não publicamos preço." },
        },
      ],
    });
  });
});

describe("serializeJsonLd", () => {
  it("escapes angle brackets so the script tag cannot be closed early", () => {
    expect(serializeJsonLd({ text: "</script>" })).toBe('{"text":"\\u003c/script>"}');
  });
});
