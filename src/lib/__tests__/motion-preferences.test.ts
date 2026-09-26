import { describe, expect, it } from "vitest";
import { installMatchMediaMock } from "@/test-utils/browser-mocks";
import { DESKTOP_MEDIA_QUERY, REDUCED_MOTION_QUERY, isDesktopViewport, prefersReducedMotion } from "../motion-preferences";

describe("motion preferences", () => {
  it("reports reduced motion when the user asks for it", () => {
    installMatchMediaMock([REDUCED_MOTION_QUERY]);
    expect(prefersReducedMotion()).toBe(true);
  });

  it("reports full motion by default", () => {
    expect(prefersReducedMotion()).toBe(false);
  });

  it("detects a desktop viewport", () => {
    installMatchMediaMock([DESKTOP_MEDIA_QUERY]);
    expect(isDesktopViewport()).toBe(true);
  });
});
