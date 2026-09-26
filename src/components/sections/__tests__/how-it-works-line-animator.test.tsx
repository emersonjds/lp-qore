import { act, render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { REDUCED_MOTION_QUERY } from "@/lib/motion-preferences";
import { IntersectionObserverMock, installMatchMediaMock } from "@/test-utils/browser-mocks";
import { HowItWorks } from "../how-it-works";

const fakeGsap = vi.hoisted(() => {
  const steps: Array<() => void> = [];
  const timeline = {
    to: vi.fn(() => timeline),
    call: vi.fn((callback: () => void) => {
      steps.push(callback);
      return timeline;
    }),
  };
  return {
    steps,
    timeline,
    set: vi.fn(),
    timelineFactory: vi.fn(() => timeline),
    context: vi.fn((build: () => void) => {
      build();
      return { revert: vi.fn() };
    }),
  };
});

vi.mock("@/lib/load-scroll-trigger", () => ({
  loadScrollTrigger: vi.fn(async () => ({
    gsap: { context: fakeGsap.context, set: fakeGsap.set, timeline: fakeGsap.timelineFactory },
    ScrollTrigger: {},
  })),
}));

const approachSection = (container: HTMLElement) => {
  const marker = container.querySelector("[data-line-marker]");
  if (!marker) throw new Error("marker missing");
  act(() => IntersectionObserverMock.trigger(marker, true));
};

const activeBadges = (container: HTMLElement) =>
  [...container.querySelectorAll("[data-step-badge]")].map((badge) => badge.getAttribute("data-active"));

describe("HowItWorks step animation", () => {
  it("fills the progress line and lights each step badge in turn once the section is in view", async () => {
    fakeGsap.steps.length = 0;
    fakeGsap.timelineFactory.mockClear();
    const { container } = render(<HowItWorks />);
    approachSection(container);

    await waitFor(() => expect(fakeGsap.timelineFactory).toHaveBeenCalledTimes(1));
    expect(fakeGsap.timelineFactory.mock.calls[0]).toEqual([
      expect.objectContaining({ scrollTrigger: expect.objectContaining({ once: true }) }),
    ]);
    expect(fakeGsap.set).toHaveBeenCalledWith(container.querySelector("[data-step-progress]"), { scaleX: 0 });
    expect(activeBadges(container)).toEqual(["true", "false", "false"]);

    act(() => fakeGsap.steps.forEach((step) => step()));
    expect(activeBadges(container)).toEqual(["true", "true", "true"]);
  });

  it("does nothing when the user prefers reduced motion", async () => {
    fakeGsap.timelineFactory.mockClear();
    installMatchMediaMock([REDUCED_MOTION_QUERY]);
    const { container } = render(<HowItWorks />);
    approachSection(container);
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(fakeGsap.timelineFactory).not.toHaveBeenCalled();
  });
});
