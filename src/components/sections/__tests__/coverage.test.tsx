import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Coverage } from "../coverage";

describe("Coverage", () => {
  it("says coverage starts in São Paulo only", () => {
    render(<Coverage />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Começamos por São Paulo");
  });

  it("invites companies from other states to leave a contact", () => {
    render(<Coverage />);
    expect(screen.getByRole("link", { name: "Deixe seu contato" })).toHaveAttribute("href", "/#contato");
  });

  it("draws an accessible map of Brazil with São Paulo highlighted", () => {
    render(<Coverage />);
    expect(screen.getByRole("img", { name: /Mapa do Brasil com o estado de São Paulo em destaque/ })).toBeInTheDocument();
  });

  it("paints São Paulo emerald and the other 26 states light slate", () => {
    const { container } = render(<Coverage />);
    const states = [...container.querySelectorAll("path[data-uf]")];
    expect(states).toHaveLength(27);
    expect(container.querySelector('path[data-uf="35"]')).toHaveAttribute("fill", "#047857");
    const others = states.filter((state) => state.getAttribute("data-uf") !== "35");
    others.forEach((state) => expect(state).toHaveAttribute("fill", "#e2e8f0"));
  });

  it("places every hub inside the outline of São Paulo", () => {
    const { container } = render(<Coverage />);
    const outline = container.querySelector('path[data-uf="35"]')?.getAttribute("d") ?? "";
    const commands = outline.match(/[MlhZ][^MlhZ]*/g) ?? [];
    const points: Array<[number, number]> = [];
    let x = 0;
    let y = 0;
    commands.forEach((command) => {
      const values = command.slice(1).trim().split(/[\s,]+/).filter(Boolean).map(Number);
      if (command[0] === "M") [x, y] = values;
      if (command[0] === "h") x += values.reduce((sum, value) => sum + value, 0);
      if (command[0] === "l") {
        for (let index = 0; index < values.length; index += 2) {
          x += values[index];
          y += values[index + 1];
          points.push([x, y]);
        }
      }
      points.push([x, y]);
    });
    const isInside = (pointX: number, pointY: number) =>
      points.reduce((inside, [currentX, currentY], index) => {
        const [previousX, previousY] = points[(index + points.length - 1) % points.length];
        const crosses =
          currentY > pointY !== previousY > pointY &&
          pointX < ((previousX - currentX) * (pointY - currentY)) / (previousY - currentY) + currentX;
        return crosses ? !inside : inside;
      }, false);
    const hubs = [...container.querySelectorAll("circle.coverage-hub")];
    expect(hubs).toHaveLength(5);
    hubs.forEach((hub) =>
      expect(isInside(Number(hub.getAttribute("cx")), Number(hub.getAttribute("cy")))).toBe(true),
    );
  });

  it("keeps every state outline and its stroke inside the map frame", () => {
    const { container } = render(<Coverage />);
    const [minX, minY, width, height] = (container.querySelector("svg")?.getAttribute("viewBox") ?? "").split(" ").map(Number);
    const xs: number[] = [];
    const ys: number[] = [];
    container.querySelectorAll("path[data-uf]").forEach((state) => {
      let x = 0;
      let y = 0;
      (state.getAttribute("d")?.match(/[Ml][^MlZ]*/g) ?? []).forEach((command) => {
        const values = command.slice(1).trim().split(/[\s,]+/).filter(Boolean).map(Number);
        for (let index = 0; index < values.length; index += 2) {
          x = command[0] === "M" ? values[index] : x + values[index];
          y = command[0] === "M" ? values[index + 1] : y + values[index + 1];
          xs.push(x);
          ys.push(y);
        }
      });
    });
    const strokeMargin = 2;
    expect(Math.min(...xs)).toBeGreaterThanOrEqual(minX + strokeMargin);
    expect(Math.min(...ys)).toBeGreaterThanOrEqual(minY + strokeMargin);
    expect(Math.max(...xs)).toBeLessThanOrEqual(minX + width - strokeMargin);
    expect(Math.max(...ys)).toBeLessThanOrEqual(minY + height - strokeMargin);
  });

  it("explains the colours and credits the IBGE mesh", () => {
    render(<Coverage />);
    expect(screen.getByText("Disponível")).toBeInTheDocument();
    expect(screen.getByText("Em breve")).toBeInTheDocument();
    expect(screen.getByText("Fonte da malha: IBGE.")).toBeInTheDocument();
  });

  it("claims no monitoring numbers", () => {
    const { container } = render(<Coverage />);
    expect(container.textContent).not.toMatch(/municípios paulistas monitorados/);
  });
});
