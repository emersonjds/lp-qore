import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TimeSaved } from "../time-saved";

const ROWS = [
  ["Encontrar editais", "Oito portais abertos todo dia", "Um radar filtrado pelo seu CNPJ"],
  ["Ler o edital", "Horas no PDF, na véspera do prazo", "Resumo em minutos, com a página citada"],
  ["Montar a proposta", "Planilha e documento do zero", "Proposta cerca de 80% pronta, com a sua marca"],
  ["Certidões", "Conferência manual e susto na habilitação", "Aviso antes de cada certidão vencer"],
  ["Prazos", "Datas espalhadas em e-mails e agendas", "Um calendário para a equipe inteira"],
  ["Gestão", "Resultado só no fim do mês", "Valor ganho e taxa de vitória sempre no painel"],
];

describe("TimeSaved", () => {
  it("anchors at #resultados with the before-and-after heading and lead", () => {
    const { container } = render(<TimeSaved />);
    expect(container.querySelector("section#resultados")).not.toBeNull();
    expect(screen.getByText("Antes e depois")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Menos tempo caçando edital, mais tempo ganhando licitação",
    );
    expect(
      screen.getByText(
        "A Qore assume o trabalho braçal da licitação. Sua equipe fica com o que decide contrato: estratégia, preço e relacionamento com o órgão.",
      ),
    ).toBeInTheDocument();
  });

  it("compares six steps without and with the Qore, row by row", () => {
    const { container } = render(<TimeSaved />);
    const rows = [...container.querySelectorAll("[data-before-after]")];
    expect(
      rows.map((row) => [
        row.querySelector("h3")?.textContent,
        row.querySelector("[data-before]")?.textContent,
        row.querySelector("[data-after]")?.textContent,
      ]),
    ).toEqual(ROWS);
  });

  it("labels each side of every row and heads the columns on desktop", () => {
    const { container } = render(<TimeSaved />);
    const labels = [...container.querySelectorAll("[data-before-after] [data-column-label]")].map(
      (label) => label.textContent,
    );
    expect(labels).toEqual(Array.from({ length: 6 }, () => ["Sem a Qore", "Com a Qore"]).flat());
    const header = container.querySelector("[data-column-header]");
    expect(header).toHaveClass("hidden", "md:grid");
    expect(header).toHaveTextContent("Sem a QoreCom a Qore");
  });

  it("invents no number other than the approved 80%", () => {
    const { container } = render(<TimeSaved />);
    const numbers = container.textContent?.match(/\d+/g) ?? [];
    expect(numbers).toEqual(["80"]);
  });

  it("slides each row in turn and highlights the Qore side", () => {
    const { container } = render(<TimeSaved />);
    const rows = [...container.querySelectorAll<HTMLElement>("[data-before-after]")];
    rows.forEach((row) => expect(row).toHaveAttribute("data-reveal"));
    expect(rows.map((row) => row.style.getPropertyValue("--order"))).toEqual(["0", "1", "2", "3", "4", "5"]);
  });
});
