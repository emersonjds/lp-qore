export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
export const DESKTOP_MEDIA_QUERY = "(min-width: 1024px)";

export const prefersReducedMotion = (): boolean => window.matchMedia(REDUCED_MOTION_QUERY).matches;

export const isDesktopViewport = (): boolean => window.matchMedia(DESKTOP_MEDIA_QUERY).matches;
