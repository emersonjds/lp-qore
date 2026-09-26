import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { DESKTOP_MEDIA_QUERY, FINE_POINTER_QUERY, REDUCED_MOTION_QUERY } from "@/lib/motion-preferences";
import { installMatchMediaMock } from "@/test-utils/browser-mocks";
import { HeroParallax } from "../hero-parallax";

const renderFrame = () => {
  render(
    <section>
      <HeroParallax>
        <p>painel</p>
      </HeroParallax>
    </section>,
  );
  const frame = screen.getByText("painel").parentElement;
  if (!frame) throw new Error("frame missing");
  return frame;
};

const movePointer = () => {
  const section = document.querySelector("section");
  if (!section) throw new Error("section missing");
  fireEvent.pointerMove(section, { clientX: 1000, clientY: 100 });
  return section;
};

describe("HeroParallax", () => {
  beforeEach(() => {
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
      callback(0);
      return 1;
    });
  });

  it("tilts the frame with transforms as the pointer moves on desktop", () => {
    installMatchMediaMock([DESKTOP_MEDIA_QUERY, FINE_POINTER_QUERY]);
    const frame = renderFrame();
    const section = movePointer();
    expect(frame.style.transform).toMatch(/rotateY\(.+deg\).*translate3d/);
    fireEvent.pointerLeave(section);
    expect(frame.style.transform).toBe("");
  });

  it("stays still on touch screens", () => {
    installMatchMediaMock([DESKTOP_MEDIA_QUERY]);
    const frame = renderFrame();
    movePointer();
    expect(frame.style.transform).toBe("");
  });

  it("stays still when the user prefers reduced motion", () => {
    installMatchMediaMock([DESKTOP_MEDIA_QUERY, FINE_POINTER_QUERY, REDUCED_MOTION_QUERY]);
    const frame = renderFrame();
    movePointer();
    expect(frame.style.transform).toBe("");
  });
});
