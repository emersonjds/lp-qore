import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
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

const setVisibility = (state: DocumentVisibilityState) => {
  Object.defineProperty(document, "visibilityState", { configurable: true, value: state });
  document.dispatchEvent(new Event("visibilitychange"));
};

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

  it("pauses while the pointer rests on the tour or focus is inside it", () => {
    setVisibility("visible");
    const { container } = render(<PlatformTourTabs tabs={platformTabs} />);
    setOnScreen(container, true);
    fireEvent.pointerEnter(tourOf(container));
    expect(progress(container)).toHaveStyle({ animationPlayState: "paused" });
    fireEvent.pointerLeave(tourOf(container));
    expect(progress(container)).toHaveStyle({ animationPlayState: "running" });
    act(() => screen.getByRole("tab", { name: "Painel do gestor" }).focus());
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

  it("stops for good once the visitor picks a tab", async () => {
    setVisibility("visible");
    const user = userEvent.setup();
    const { container } = render(<PlatformTourTabs tabs={platformTabs} />);
    setOnScreen(container, true);
    await user.click(screen.getByRole("tab", { name: "Calendário de prazos" }));
    expect(progress(container)).toBeNull();
  });

  it("never auto-advances when the user prefers reduced motion", () => {
    setVisibility("visible");
    installMatchMediaMock([REDUCED_MOTION_QUERY]);
    const { container } = render(<PlatformTourTabs tabs={platformTabs} />);
    setOnScreen(container, true);
    expect(progress(container)).toBeNull();
  });

  it("swipes between screens on touch devices and stops auto-advance", () => {
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
