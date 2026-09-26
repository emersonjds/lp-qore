import { act, render, screen } from "@testing-library/react";
import { useRef } from "react";
import { describe, expect, it } from "vitest";
import { IntersectionObserverMock } from "@/test-utils/browser-mocks";
import { useNearViewport } from "../use-near-viewport";

const Probe = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isNear = useNearViewport(ref);
  return <div ref={ref}>{isNear ? "perto" : "longe"}</div>;
};

describe("useNearViewport", () => {
  it("stays false until the element approaches", () => {
    render(<Probe />);
    expect(screen.getByText("longe")).toBeInTheDocument();
  });

  it("turns true once and stops observing", () => {
    render(<Probe />);
    const element = screen.getByText("longe");
    act(() => IntersectionObserverMock.trigger(element, true));
    expect(screen.getByText("perto")).toBeInTheDocument();
    expect(IntersectionObserverMock.instances.size).toBe(0);
  });

  it("uses a generous root margin so loading starts early", () => {
    render(<Probe />);
    expect([...IntersectionObserverMock.instances][0]?.rootMargin).toBe("400px 0px");
  });
});
