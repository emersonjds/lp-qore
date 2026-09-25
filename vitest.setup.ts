import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";
import { installIntersectionObserverMock, installMatchMediaMock } from "@/test-utils/browser-mocks";

beforeEach(() => {
  installIntersectionObserverMock();
  installMatchMediaMock([]);
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
