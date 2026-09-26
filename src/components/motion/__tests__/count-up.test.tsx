import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { REDUCED_MOTION_QUERY } from "@/lib/motion-preferences";
import { IntersectionObserverMock, installMatchMediaMock } from "@/test-utils/browser-mocks";
import { CountUp } from "../count-up";

const enterView = (container: HTMLElement) => {
  const counter = container.querySelector("[data-count-up]");
  if (!counter) throw new Error("counter missing");
  act(() => IntersectionObserverMock.trigger(counter, true));
};

describe("CountUp", () => {
  afterEach(() => vi.useRealTimers());

  it("renders the final value for server HTML and assistive technology", () => {
    const { container } = render(<CountUp value="3.817" />);
    expect(container.textContent).toBe("3.817");
  });

  it("counts from zero to the final value once in view, then settles on the plain value", () => {
    vi.useFakeTimers({ toFake: ["requestAnimationFrame", "cancelAnimationFrame", "performance"] });
    const { container } = render(<CountUp value="~174 mil" />);
    enterView(container);
    expect(screen.getByText("~0 mil")).toHaveAttribute("aria-hidden", "true");
    act(() => vi.advanceTimersByTime(600));
    const midway = container.querySelector("[aria-hidden]")?.textContent ?? "";
    expect(midway).toMatch(/^~\d+ mil$/);
    expect(midway).not.toBe("~0 mil");
    act(() => vi.advanceTimersByTime(2000));
    expect(container.textContent).toBe("~174 mil");
  });

  it("shows the final value at once when the user prefers reduced motion", () => {
    installMatchMediaMock([REDUCED_MOTION_QUERY]);
    const { container } = render(<CountUp value="87%" />);
    enterView(container);
    expect(container.textContent).toBe("87%");
  });
});
