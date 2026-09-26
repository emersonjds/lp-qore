import { act, render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { REDUCED_MOTION_QUERY } from "@/lib/motion-preferences";
import { IntersectionObserverMock, installMatchMediaMock } from "@/test-utils/browser-mocks";
import { Hero } from "../hero";

interface ToggleOptions {
  onToggle: (self: { isActive: boolean }) => void;
}

const fake = vi.hoisted(() => {
  const timeline = {
    set: vi.fn(() => timeline),
    to: vi.fn(() => timeline),
    fromTo: vi.fn(() => timeline),
    play: vi.fn(),
    pause: vi.fn(),
  };
  const revert = vi.fn();
  const gsap = {
    timeline: vi.fn(() => timeline),
    context: vi.fn((build: () => (() => void) | void) => {
      const cleanup = build();
      return {
        revert: () => {
          revert();
          cleanup?.();
        },
      };
    }),
  };
  const scrollTrigger = { create: vi.fn((options: ToggleOptions) => ({ options })) };
  return { timeline, gsap, scrollTrigger, revert };
});

vi.mock("@/lib/load-scroll-trigger", () => ({
  loadScrollTrigger: vi.fn(async () => ({ gsap: fake.gsap, ScrollTrigger: fake.scrollTrigger })),
}));

const approach = (container: HTMLElement) => {
  const marker = container.querySelector("[data-split-view] [data-animation-marker]");
  if (!marker) throw new Error("marker missing");
  act(() => IntersectionObserverMock.trigger(marker, true));
};

const setVisibility = (state: DocumentVisibilityState) => {
  Object.defineProperty(document, "visibilityState", { configurable: true, value: state });
  document.dispatchEvent(new Event("visibilitychange"));
};

describe("Hero split view animation", () => {
  it("loops the clause pulse, the travel to the summary, the page chips and the risk alert", async () => {
    vi.clearAllMocks();
    const { container, unmount } = render(<Hero />);
    approach(container);
    await waitFor(() => expect(fake.scrollTrigger.create).toHaveBeenCalledTimes(1));
    expect(fake.gsap.timeline).toHaveBeenCalledWith(expect.objectContaining({ repeat: -1, paused: true }));
    const animatedTargets = fake.timeline.to.mock.calls.map((call: unknown[]) => call[0]);
    const clause = container.querySelector("[data-source-clause]");
    const chips = [...container.querySelectorAll("[data-page-chip]")];
    const alert = container.querySelector("[data-risk-alert]");
    [clause, alert, ...chips].forEach((element) => expect(animatedTargets).toContainEqual(element));
    unmount();
    expect(fake.revert).toHaveBeenCalled();
  });

  it("plays only while on screen and while the tab is visible", async () => {
    vi.clearAllMocks();
    setVisibility("visible");
    const { container } = render(<Hero />);
    approach(container);
    await waitFor(() => expect(fake.scrollTrigger.create).toHaveBeenCalledTimes(1));
    const options = fake.scrollTrigger.create.mock.calls[0]?.[0];
    act(() => options?.onToggle({ isActive: true }));
    expect(fake.timeline.play).toHaveBeenCalledTimes(1);
    act(() => setVisibility("hidden"));
    expect(fake.timeline.pause).toHaveBeenCalledTimes(1);
    act(() => setVisibility("visible"));
    expect(fake.timeline.play).toHaveBeenCalledTimes(2);
    act(() => options?.onToggle({ isActive: false }));
    expect(fake.timeline.pause).toHaveBeenCalledTimes(2);
    act(() => setVisibility("visible"));
    expect(fake.timeline.play).toHaveBeenCalledTimes(2);
  });

  it("animates only transform and opacity", async () => {
    vi.clearAllMocks();
    const { container } = render(<Hero />);
    approach(container);
    await waitFor(() => expect(fake.scrollTrigger.create).toHaveBeenCalledTimes(1));
    const allowed = new Set(["x", "y", "scale", "scaleX", "opacity", "duration", "ease", "delay", "transformOrigin", "yoyo", "repeat"]);
    const tweens = [...fake.timeline.to.mock.calls, ...fake.timeline.set.mock.calls, ...fake.timeline.fromTo.mock.calls];
    const properties = tweens.flatMap((call: unknown[]) =>
      call.slice(1).flatMap((vars) => (typeof vars === "object" && vars !== null ? Object.keys(vars) : [])),
    );
    expect(properties.filter((property) => !allowed.has(property))).toEqual([]);
  });

  it("leaves the final static state when the user prefers reduced motion", async () => {
    vi.clearAllMocks();
    installMatchMediaMock([REDUCED_MOTION_QUERY]);
    const { container } = render(<Hero />);
    approach(container);
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(fake.gsap.timeline).not.toHaveBeenCalled();
  });
});
