import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { platformTabs } from "@/config/home-content";
import { DESKTOP_MEDIA_QUERY } from "@/lib/motion-preferences";
import { IntersectionObserverMock, installMatchMediaMock } from "@/test-utils/browser-mocks";
import { PlatformTourTabs } from "../platform-tour-tabs";

interface PinOptions {
  pin: boolean;
  onUpdate: (self: { progress: number }) => void;
}

const fakeScrollTrigger = vi.hoisted(() => ({
  create: vi.fn((options: PinOptions) => ({ options, kill: vi.fn() })),
}));

vi.mock("@/lib/load-scroll-trigger", () => ({
  loadScrollTrigger: vi.fn(async () => ({ gsap: {}, ScrollTrigger: fakeScrollTrigger })),
}));

const approachTour = (container: HTMLElement) => {
  const tour = container.querySelector("[data-platform-tour]");
  if (!tour) throw new Error("tour missing");
  act(() => IntersectionObserverMock.trigger(tour, true));
};

describe("PlatformTourTabs pin", () => {
  it("pins on desktop and crossfades screens with scroll progress", async () => {
    fakeScrollTrigger.create.mockClear();
    installMatchMediaMock([DESKTOP_MEDIA_QUERY]);
    const { container } = render(<PlatformTourTabs tabs={platformTabs} />);
    approachTour(container);
    await waitFor(() => expect(fakeScrollTrigger.create).toHaveBeenCalledTimes(1));
    const options = fakeScrollTrigger.create.mock.calls[0]?.[0];
    expect(options?.pin).toBe(true);
    act(() => options?.onUpdate({ progress: 0.5 }));
    expect(screen.getByRole("tab", { name: "Busca" })).toHaveAttribute("aria-selected", "true");
    act(() => options?.onUpdate({ progress: 1 }));
    expect(screen.getByRole("tab", { name: "Calendário" })).toHaveAttribute("aria-selected", "true");
  });

  it("keeps plain tabs on mobile", async () => {
    fakeScrollTrigger.create.mockClear();
    const { container } = render(<PlatformTourTabs tabs={platformTabs} />);
    approachTour(container);
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(fakeScrollTrigger.create).not.toHaveBeenCalled();
  });

  it("swipes between screens on touch devices", () => {
    const { container } = render(<PlatformTourTabs tabs={platformTabs} />);
    const panels = container.querySelector("[data-tour-panels]");
    if (!panels) throw new Error("panels missing");
    fireEvent.touchStart(panels, { changedTouches: [{ clientX: 300, clientY: 100 }] });
    fireEvent.touchEnd(panels, { changedTouches: [{ clientX: 180, clientY: 110 }] });
    expect(screen.getByRole("tab", { name: "Radar" })).toHaveAttribute("aria-selected", "true");
    fireEvent.touchStart(panels, { changedTouches: [{ clientX: 100, clientY: 100 }] });
    fireEvent.touchEnd(panels, { changedTouches: [{ clientX: 220, clientY: 100 }] });
    expect(screen.getByRole("tab", { name: "Painel do gestor" })).toHaveAttribute("aria-selected", "true");
  });
});
