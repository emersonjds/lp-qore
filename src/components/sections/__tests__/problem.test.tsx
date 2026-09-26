import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Problem } from "../problem";

describe("Problem", () => {
  it("positions the section with the approved heading and lead", () => {
    render(<Problem />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Onde a licitação se perde: portal, edital e prazo");
    expect(
      screen.getByText("Edital em portal que ninguém abriu, 80 páginas lidas na véspera, proposta desclassificada por preço ou certidão vencida."),
    ).toBeInTheDocument();
  });

  it("lists three pains, each revealed on scroll", () => {
    render(<Problem />);
    const items = within(screen.getByRole("list")).getAllByRole("listitem");
    expect(items).toHaveLength(3);
    items.forEach((item) => expect(item).toHaveAttribute("data-reveal"));
  });

  it("names each pain as a level-three heading", () => {
    render(<Problem />);
    expect(within(screen.getByRole("list")).getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent)).toEqual([
      "Editais espalhados em vários portais",
      "80 páginas lidas na véspera do prazo",
      "Proposta desclassificada por preço ou documento faltando",
    ]);
  });

  it("closes each pain with its consequence as a red footnote", () => {
    render(<Problem />);
    const footnotes = [...document.querySelectorAll("[data-problem-footnote]")];
    expect(footnotes.map((footnote) => footnote.textContent)).toEqual([
      "Perda recorrente de janelas de impugnação",
      "Fadiga decisória e omissões técnicas críticas",
      "Desperdício de tempo investido pela equipe",
    ]);
    footnotes.forEach((footnote) => expect(footnote.querySelector("svg")).toHaveClass("text-destructive-text"));
  });

  it("heads the market strip with the government as the largest buyer", () => {
    render(<Problem />);
    expect(screen.getByRole("heading", { level: 3, name: "O governo é o maior comprador do país. A sua empresa está vendo as oportunidades a tempo?" })).toBeInTheDocument();
  });

  it("shows each market number with its source and date", () => {
    render(<Problem />);
    const numbers = screen.getAllByTestId("market-number");
    expect(numbers.map((number) => number.textContent)).toEqual([
      "7.650pregões eletrônicos publicados em São Paulo em 30 diasFonte: PNCP — API de consulta, 26/08 a 25/09/2026",
      "R$ 33 biem compras do Governo do Estado de São Paulo por anoFonte: Portal de Compras do Governo de SP, consulta em 26/09/2026",
      "R$ 42,4 bivendidos por pequenos negócios ao governo em 2022Fonte: Agência Sebrae de Notícias, 2023",
      "12% do PIBé o tamanho das compras públicas no BrasilFonte: IPEA, 2019",
    ]);
  });

  it("lays the four market numbers two by two on mobile and in one row from lg", () => {
    render(<Problem />);
    const grid = screen.getAllByTestId("market-number")[0]?.parentElement;
    expect(grid).toHaveClass("grid-cols-2", "lg:grid-cols-4");
  });

  it("counts each market number up when it comes into view", () => {
    render(<Problem />);
    screen.getAllByTestId("market-number").forEach((number) => {
      expect(number.querySelector("[data-count-up]")).not.toBeNull();
    });
  });
});
