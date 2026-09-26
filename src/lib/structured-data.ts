import { absoluteUrl } from "@/lib/site-url";
import type { FAQItem } from "@/types";

interface StructuredDataInput {
  siteName: string;
  siteUrl: string;
  description: string;
  faqItems: readonly FAQItem[];
}

export const buildStructuredData = ({ siteName, siteUrl, description, faqItems }: StructuredDataInput) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: siteName,
      url: absoluteUrl(siteUrl, "/"),
      logo: absoluteUrl(siteUrl, "/apple-icon.png"),
    },
    {
      "@type": "WebSite",
      name: siteName,
      url: absoluteUrl(siteUrl, "/"),
      inLanguage: "pt-BR",
      description,
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
});

export const serializeJsonLd = (data: unknown): string => JSON.stringify(data).replace(/</g, "\\u003c");
