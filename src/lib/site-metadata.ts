import type { Metadata } from "next";

interface RootMetadataInput {
  siteName: string;
  slogan: string;
  description: string;
  siteUrl: string;
}

export const buildRootMetadata = ({ siteName, slogan, description, siteUrl }: RootMetadataInput): Metadata => {
  const title = `${siteName} | ${slogan}`;
  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: `%s | ${siteName}` },
    description,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: "/",
      siteName,
      title,
      description,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: `${siteName}: ${slogan}` }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
    robots: { index: true, follow: true },
  };
};
