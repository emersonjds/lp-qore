import { act, render, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { REDUCED_MOTION_QUERY } from "@/lib/motion-preferences";
import { IntersectionObserverMock, installAnimateMock, installMatchMediaMock } from "@/test-utils/browser-mocks";
import { HowItWorks } from "../how-it-works";

const enterSection = (container: HTMLElement) => {
  const marker = container.querySelector("[data-line-marker]");
  if (!marker) throw new Error("marker missing");
  act(() => IntersectionObserverMock.trigger(marker, true));
};

const activeBadges = (container: HTMLElement) =>
  [...container.querySelectorAll("[data-step-badge]")].map((badge) => badge.getAttribute("data-active"));

describe("HowItWorks step animation", () => {
  it("fills the progress line with a native transform animation and lights each badge in turn", async () => {
    const { animate } = installAnimateMock({ finishes: true });
    const { container } = render(<HowItWorks />);
    expect(activeBadges(container)).toEqual(["true", "false", "false"]);

    enterSection(container);

    await waitFor(() => expect(activeBadges(container)).toEqual(["true", "true", "true"]));
    expect(animate).toHaveBeenCalledTimes(2);
    const keyframeProperties = animate.mock.calls.flatMap(([keyframes]) => keyframes.flatMap((frame) => Object.keys(frame)));
    expect(new Set(keyframeProperties)).toEqual(new Set(["transform"]));
  });

  it("does nothing when the user prefers reduced motion", async () => {
    const { animate } = installAnimateMock({ finishes: true });
    installMatchMediaMock([REDUCED_MOTION_QUERY]);
    const { container } = render(<HowItWorks />);
    enterSection(container);
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(animate).not.toHaveBeenCalled();
    expect(activeBadges(container)).toEqual(["true", "false", "false"]);
  });
});
