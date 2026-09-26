import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { platformTabs } from "@/config/home-content";
import { REDUCED_MOTION_QUERY } from "@/lib/motion-preferences";
import { IntersectionObserverMock, installMatchMediaMock } from "@/test-utils/browser-mocks";
import { PlatformTourTabs } from "../platform-tour-tabs";

const tourOf = (container: HTMLElement) => {
  const tour = container.querySelector<HTMLElement>("[data-platform-tour]");
  if (!tour) throw new Error("tour missing");
  return tour;
};

const setOnScreen = (container: HTMLElement, isOnScreen: boolean) =>
  act(() => IntersectionObserverMock.trigger(tourOf(container), isOnScreen));

const progress = (container: HTMLElement) => container.querySelector<HTMLElement>("[data-tab-progress]");

const finishProgress = (container: HTMLElement) => {
  const bar = progress(container);
  if (!bar) throw new Error("progress missing");
  fireEvent.animationEnd(bar);
};

const selectedTab = () => screen.getAllByRole("tab").find((tab) => tab.getAttribute("aria-selected") === "true")?.textContent;

const clickWithMouse = (tab: HTMLElement) => {
  fireEvent.pointerDown(tab);
  fireEvent.mouseDown(tab);
  act(() => tab.focus());
  fireEvent.click(tab);
};

const setVisibility = (state: DocumentVisibilityState) => {
  Object.defineProperty(document, "visibilityState", { configurable: true, value: state });
  document.dispatchEvent(new Event("visibilitychange"));
};

afterEach(() => {
  vi.useRealTimers();
});

describe("PlatformTourTabs auto-advance", () => {
  it("advances to the next screen each time the active tab progress fills, wrapping at the end", () => {
    setVisibility("visible");
    const { container } = render(<PlatformTourTabs tabs={platformTabs} />);
    expect(progress(container)).toBeNull();
    setOnScreen(container, true);
    expect(progress(container)?.closest("[role=tab]")).toHaveTextContent("Painel do gestor");
    finishProgress(container);
    expect(selectedTab()).toBe("Radar de oportunidades");
    ["Resumo do edital com IA", "Precificação inteligente", "Calendário de prazos", "Painel do gestor"].forEach((label) => {
      finishProgress(container);
      expect(selectedTab()).toBe(label);
    });
  });

  it("draws the countdown as a 3px primary bar under the active tab, filled by scaling on the x axis", () => {
    setVisibility("visible");
    const { container } = render(<PlatformTourTabs tabs={platformTabs} />);
    setOnScreen(container, true);
    const bar = progress(container);
    expect(bar).toHaveClass("animate-tab-progress", "h-[3px]", "bg-primary", "origin-left", "-bottom-2");
    expect(bar?.closest("[role=tab]")).not.toHaveClass("overflow-hidden");
  });

  it("crossfades the incoming screen with a slight rise and replays its count-ups and bars", () => {
    setVisibility("visible");
    const { container } = render(<PlatformTourTabs tabs={platformTabs} />);
    setOnScreen(container, true);
    const managerPanel = screen.getByRole("tabpanel", { name: "Painel do gestor" });
    const firstCounter = managerPanel.querySelector("[data-count-up]");
    finishProgress(container);
    expect(managerPanel).toHaveClass("opacity-0", "translate-y-3");
    expect(managerPanel.className).toMatch(/transition-\[opacity,translate,visibility\]/);
    expect(screen.getByRole("tabpanel", { name: "Radar de oportunidades" })).not.toHaveClass("opacity-0", "translate-y-3");
    platformTabs.slice(1).forEach(() => finishProgress(container));
    expect(managerPanel).toHaveAttribute("data-screen-active");
    const replayedCounter = managerPanel.querySelector("[data-count-up]");
    expect(replayedCounter).not.toBeNull();
    expect(replayedCounter).not.toBe(firstCounter);
    expect(managerPanel.querySelectorAll("[data-bar]")).toHaveLength(3);
  });

  it("pauses only while the pointer rests on the tab list, not on the screens", () => {
    setVisibility("visible");
    const { container } = render(<PlatformTourTabs tabs={platformTabs} />);
    setOnScreen(container, true);
    const panels = container.querySelector("[data-tour-panels]");
    if (!panels) throw new Error("panels missing");
    fireEvent.pointerEnter(panels);
    expect(progress(container)).toHaveStyle({ animationPlayState: "running" });
    fireEvent.pointerLeave(panels);
    fireEvent.pointerEnter(screen.getByRole("tablist"));
    expect(progress(container)).toHaveStyle({ animationPlayState: "paused" });
    fireEvent.pointerLeave(screen.getByRole("tablist"));
    expect(progress(container)).toHaveStyle({ animationPlayState: "running" });
  });

  it("pauses while a tab holds keyboard focus", async () => {
    setVisibility("visible");
    const user = userEvent.setup();
    const { container } = render(<PlatformTourTabs tabs={platformTabs} />);
    setOnScreen(container, true);
    await user.tab();
    expect(screen.getByRole("tab", { name: "Painel do gestor" })).toHaveFocus();
    expect(progress(container)).toHaveStyle({ animationPlayState: "paused" });
    act(() => screen.getByRole("tab", { name: "Painel do gestor" }).blur());
    expect(progress(container)).toHaveStyle({ animationPlayState: "running" });
  });

  it("pauses offscreen and while the browser tab is hidden", () => {
    setVisibility("visible");
    const { container } = render(<PlatformTourTabs tabs={platformTabs} />);
    setOnScreen(container, true);
    act(() => setVisibility("hidden"));
    expect(progress(container)).toHaveStyle({ animationPlayState: "paused" });
    act(() => setVisibility("visible"));
    expect(progress(container)).toHaveStyle({ animationPlayState: "running" });
    setOnScreen(container, false);
    expect(progress(container)).toHaveStyle({ animationPlayState: "paused" });
  });

  it("resumes auto-advance from the picked tab after 10 s without interaction", () => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
    setVisibility("visible");
    const { container } = render(<PlatformTourTabs tabs={platformTabs} />);
    setOnScreen(container, true);
    clickWithMouse(screen.getByRole("tab", { name: "Resumo do edital com IA" }));
    expect(progress(container)).toBeNull();
    act(() => vi.advanceTimersByTime(6000));
    clickWithMouse(screen.getByRole("tab", { name: "Calendário de prazos" }));
    act(() => vi.advanceTimersByTime(9999));
    expect(progress(container)).toBeNull();
    act(() => vi.advanceTimersByTime(1));
    expect(progress(container)?.closest("[role=tab]")).toHaveTextContent("Calendário de prazos");
    expect(progress(container)).toHaveStyle({ animationPlayState: "running" });
  });

  it("never auto-advances when the user prefers reduced motion", () => {
    setVisibility("visible");
    installMatchMediaMock([REDUCED_MOTION_QUERY]);
    const { container } = render(<PlatformTourTabs tabs={platformTabs} />);
    setOnScreen(container, true);
    expect(progress(container)).toBeNull();
    expect(selectedTab()).toBe("Painel do gestor");
  });

  it("swipes between screens on touch devices and holds auto-advance", () => {
    setVisibility("visible");
    const { container } = render(<PlatformTourTabs tabs={platformTabs} />);
    setOnScreen(container, true);
    const panels = container.querySelector("[data-tour-panels]");
    if (!panels) throw new Error("panels missing");
    fireEvent.touchStart(panels, { changedTouches: [{ clientX: 300, clientY: 100 }] });
    fireEvent.touchEnd(panels, { changedTouches: [{ clientX: 180, clientY: 110 }] });
    expect(selectedTab()).toBe("Radar de oportunidades");
    expect(progress(container)).toBeNull();
    fireEvent.touchStart(panels, { changedTouches: [{ clientX: 100, clientY: 100 }] });
    fireEvent.touchEnd(panels, { changedTouches: [{ clientX: 220, clientY: 100 }] });
    expect(selectedTab()).toBe("Painel do gestor");
  });
});
