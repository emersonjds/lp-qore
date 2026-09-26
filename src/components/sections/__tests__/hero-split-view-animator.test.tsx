import { act, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { REDUCED_MOTION_QUERY } from "@/lib/motion-preferences";
import { IntersectionObserverMock, installAnimateMock, installMatchMediaMock } from "@/test-utils/browser-mocks";
import { Hero } from "../hero";

const markerOf = (container: HTMLElement) => {
  const marker = container.querySelector("[data-split-view] [data-animation-marker]");
  if (!marker) throw new Error("marker missing");
  return marker;
};

const setVisibility = (state: DocumentVisibilityState) => {
  Object.defineProperty(document, "visibilityState", { configurable: true, value: state });
  document.dispatchEvent(new Event("visibilitychange"));
};

describe("Hero split view animation", () => {
  it("animates the clause, the traveler, every page chip and the risk alert with transform and opacity only", () => {
    const { animate } = installAnimateMock({ finishes: false });
    const { container } = render(<Hero />);
    act(() => IntersectionObserverMock.trigger(markerOf(container), true));

    const targets = animate.mock.contexts;
    const clause = container.querySelector("[data-source-clause]");
    const chips = [...container.querySelectorAll("[data-page-chip]")];
    const alert = container.querySelector("[data-risk-alert]");
    [clause, alert, ...chips].forEach((element) => expect(targets).toContain(element));
    const properties = animate.mock.calls.flatMap(([keyframes]) => keyframes.flatMap((frame) => Object.keys(frame)));
    expect(new Set(properties.filter((property) => property !== "offset" && property !== "easing"))).toEqual(
      new Set(["transform", "opacity"]),
    );
  });

  it("runs one infinite loop per element with no delays, so the browser can composite every effect", () => {
    const { animate } = installAnimateMock({ finishes: false });
    const { container } = render(<Hero />);
    act(() => IntersectionObserverMock.trigger(markerOf(container), true));

    const targets = animate.mock.contexts;
    expect(new Set(targets).size).toBe(targets.length);
    const durations = new Set(animate.mock.calls.map(([, options]) => options?.duration));
    expect(durations.size).toBe(1);
    animate.mock.calls.forEach(([, options]) => {
      expect(options).toMatchObject({ iterations: Infinity });
      expect(options?.delay ?? 0).toBe(0);
      expect(options?.endDelay ?? 0).toBe(0);
    });
  });

  it("pauses off screen or in a hidden tab and resumes when both are back", () => {
    const { animations } = installAnimateMock({ finishes: false });
    setVisibility("visible");
    const { container, unmount } = render(<Hero />);
    const marker = markerOf(container);
    act(() => IntersectionObserverMock.trigger(marker, true));
    const first = animations[0];
    if (!first) throw new Error("no animation started");

    act(() => setVisibility("hidden"));
    expect(first.pause).toHaveBeenCalledTimes(1);
    act(() => setVisibility("visible"));
    expect(first.play).toHaveBeenCalledTimes(1);
    act(() => IntersectionObserverMock.trigger(marker, false));
    expect(first.pause).toHaveBeenCalledTimes(2);

    unmount();
    expect(first.cancel).toHaveBeenCalled();
  });

  it("leaves the final static state when the user prefers reduced motion", () => {
    const { animate } = installAnimateMock({ finishes: false });
    installMatchMediaMock([REDUCED_MOTION_QUERY]);
    const { container } = render(<Hero />);
    act(() => IntersectionObserverMock.trigger(markerOf(container), true));
    expect(animate).not.toHaveBeenCalled();
  });
});
