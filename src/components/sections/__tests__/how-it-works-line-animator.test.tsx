import { act, render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { REDUCED_MOTION_QUERY } from "@/lib/motion-preferences";
import { IntersectionObserverMock, installMatchMediaMock } from "@/test-utils/browser-mocks";
import { HowItWorks } from "../how-it-works";

const fakeGsap = vi.hoisted(() => ({
  fromTo: vi.fn(),
  context: vi.fn((build: () => void) => {
    build();
    return { revert: vi.fn() };
  }),
}));

vi.mock("@/lib/load-scroll-trigger", () => ({
  loadScrollTrigger: vi.fn(async () => ({ gsap: fakeGsap, ScrollTrigger: {} })),
}));

const approachSection = (container: HTMLElement) => {
  const marker = container.querySelector("[data-line-marker]");
  if (!marker) throw new Error("marker missing");
  act(() => IntersectionObserverMock.trigger(marker, true));
};

describe("HowItWorks line animation", () => {
  it("scrubs both lines with transforms once the section is near", async () => {
    fakeGsap.fromTo.mockClear();
    const { container } = render(<HowItWorks />);
    approachSection(container);
    await waitFor(() => expect(fakeGsap.fromTo).toHaveBeenCalledTimes(2));
    const fromStates = fakeGsap.fromTo.mock.calls.map((call) => call[1]);
    expect(fromStates).toEqual([{ scaleX: 0 }, { scaleY: 0 }]);
  });

  it("does nothing when the user prefers reduced motion", async () => {
    fakeGsap.fromTo.mockClear();
    installMatchMediaMock([REDUCED_MOTION_QUERY]);
    const { container } = render(<HowItWorks />);
    approachSection(container);
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(fakeGsap.fromTo).not.toHaveBeenCalled();
  });
});
