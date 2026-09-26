import type { Metadata } from "next";

interface RootMetadataInput {
  siteName: string;
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  siteUrl: string;
}

const OG_IMAGE_URL = "/og.png?v=2";

export const buildRootMetadata = ({
  siteName,
  title,
  description,
  ogTitle,
  ogDescription,
  siteUrl,
}: RootMetadataInput): Metadata => ({
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s | ${siteName}` },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName,
    title: ogTitle,
    description: ogDescription,
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: ogTitle }],
  },
  twitter: { card: "summary_large_image", title: ogTitle, description: ogDescription, images: [OG_IMAGE_URL] },
  robots: { index: true, follow: true },
});
