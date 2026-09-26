const DEFAULT_SITE_URL = "https://qore.com.br";

const parseAbsoluteUrl = (value: string): URL => {
  try {
    return new URL(value);
  } catch {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an absolute URL");
  }
};

export const resolveSiteUrl = (value: string | undefined): string => {
  const candidate = value?.trim();
  if (!candidate) return DEFAULT_SITE_URL;

  const url = parseAbsoluteUrl(candidate);
  if (url.protocol !== "https:" && url.hostname !== "localhost") {
    throw new Error("NEXT_PUBLIC_SITE_URL must use https");
  }
  return url.origin;
};

export const absoluteUrl = (siteUrl: string, path: string): string =>
  new URL(path, siteUrl).toString();
