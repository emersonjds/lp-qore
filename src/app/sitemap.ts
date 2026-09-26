import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

const sitemap = (): MetadataRoute.Sitemap => [
  { url: absoluteUrl(siteConfig.url, "/"), changeFrequency: "monthly", priority: 1 },
  { url: absoluteUrl(siteConfig.url, "/privacidade"), changeFrequency: "yearly", priority: 0.3 },
];

export default sitemap;
