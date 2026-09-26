import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { IntersectionObserverMock } from "@/test-utils/browser-mocks";
import { ScrollStateObserver } from "../scroll-state-observer";

const renderWithTargets = () =>
  render(
    <>
      <div id="top-sentinel" />
      <header id="site-header" />
      <ScrollStateObserver targetId="site-header" sentinelId="top-sentinel" />
    </>,
  );

describe("ScrollStateObserver", () => {
  it("marks the header as scrolled once the top sentinel leaves the viewport", () => {
    renderWithTargets();
    const sentinel = document.getElementById("top-sentinel");
    if (!sentinel) throw new Error("sentinel missing");
    IntersectionObserverMock.trigger(sentinel, false);
    expect(document.getElementById("site-header")).toHaveAttribute("data-scrolled");
  });

  it("clears the scrolled state back at the top", () => {
    renderWithTargets();
    const sentinel = document.getElementById("top-sentinel");
    if (!sentinel) throw new Error("sentinel missing");
    IntersectionObserverMock.trigger(sentinel, false);
    IntersectionObserverMock.trigger(sentinel, true);
    expect(document.getElementById("site-header")).not.toHaveAttribute("data-scrolled");
  });
});
