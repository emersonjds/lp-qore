import { describe, expect, it } from "vitest";
import { installMatchMediaMock } from "@/test-utils/browser-mocks";
import {
  DESKTOP_MEDIA_QUERY,
  FINE_POINTER_QUERY,
  REDUCED_MOTION_QUERY,
  hasFinePointer,
  isDesktopViewport,
  prefersReducedMotion,
} from "../motion-preferences";

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

  it("detects a mouse or trackpad", () => {
    expect(hasFinePointer()).toBe(false);
    installMatchMediaMock([FINE_POINTER_QUERY]);
    expect(hasFinePointer()).toBe(true);
  });
});
