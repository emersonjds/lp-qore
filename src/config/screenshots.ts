export const MOBILE_SCREENSHOTS = ["manager-dashboard", "radar", "documents"] as const;

export type MobileScreenshot = (typeof MOBILE_SCREENSHOTS)[number];
