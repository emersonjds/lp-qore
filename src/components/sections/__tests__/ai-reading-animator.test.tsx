import { act, render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { REDUCED_MOTION_QUERY } from "@/lib/motion-preferences";
import { IntersectionObserverMock, installMatchMediaMock } from "@/test-utils/browser-mocks";
import { ResponsibleAi } from "../responsible-ai";

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
    invalidate: vi.fn(),
  };
  const revert = vi.fn();
  const gsap = {
    timeline: vi.fn(() => timeline),
    context: vi.fn((build: () => void) => {
      build();
      return { revert };
    }),
  };
  const scrollTrigger = { create: vi.fn((options: ToggleOptions) => ({ options })) };
  return { timeline, gsap, scrollTrigger, revert };
});

vi.mock("@/lib/load-scroll-trigger", () => ({
  loadScrollTrigger: vi.fn(async () => ({ gsap: fake.gsap, ScrollTrigger: fake.scrollTrigger })),
}));

const approach = (container: HTMLElement) => {
  const marker = container.querySelector("[data-ai-reading] [data-animation-marker]");
  if (!marker) throw new Error("marker missing");
  act(() => IntersectionObserverMock.trigger(marker, true));
};

describe("AI reading animation", () => {
  it("loops highlight, travel and page chip for every excerpt, paused while offscreen", async () => {
    vi.clearAllMocks();
    const { container, unmount } = render(<ResponsibleAi />);
    approach(container);
    await waitFor(() => expect(fake.scrollTrigger.create).toHaveBeenCalledTimes(1));
    expect(fake.gsap.timeline).toHaveBeenCalledWith(expect.objectContaining({ repeat: -1, paused: true }));
    const animatedTargets = fake.timeline.to.mock.calls.map((call: unknown[]) => call[0]);
    const excerpts = container.querySelectorAll("[data-excerpt-highlight]");
    const chips = container.querySelectorAll("[data-summary-chip]");
    expect(excerpts).toHaveLength(3);
    [...excerpts, ...chips].forEach((element) => expect(animatedTargets).toContain(element));
    const options = fake.scrollTrigger.create.mock.calls[0]?.[0];
    options?.onToggle({ isActive: true });
    expect(fake.timeline.play).toHaveBeenCalled();
    options?.onToggle({ isActive: false });
    expect(fake.timeline.pause).toHaveBeenCalled();
    unmount();
    expect(fake.revert).toHaveBeenCalled();
  });

  it("animates only transform and opacity", async () => {
    vi.clearAllMocks();
    const { container } = render(<ResponsibleAi />);
    approach(container);
    await waitFor(() => expect(fake.scrollTrigger.create).toHaveBeenCalledTimes(1));
    const allowed = new Set(["x", "y", "scale", "scaleX", "opacity", "duration", "ease", "delay", "transformOrigin"]);
    const tweens = [...fake.timeline.to.mock.calls, ...fake.timeline.set.mock.calls, ...fake.timeline.fromTo.mock.calls];
    const properties = tweens.flatMap((call: unknown[]) =>
      call.slice(1).flatMap((vars) => (typeof vars === "object" && vars !== null ? Object.keys(vars) : [])),
    );
    expect(properties.filter((property) => !allowed.has(property))).toEqual([]);
  });

  it("leaves the final static state when the user prefers reduced motion", async () => {
    vi.clearAllMocks();
    installMatchMediaMock([REDUCED_MOTION_QUERY]);
    const { container } = render(<ResponsibleAi />);
    approach(container);
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(fake.gsap.timeline).not.toHaveBeenCalled();
  });
});
