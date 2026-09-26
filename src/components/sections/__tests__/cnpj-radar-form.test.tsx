import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { RADAR_NOT_FOUND_ERROR } from "@/lib/cnpj-radar";
import { CnpjRadarForm } from "../cnpj-radar-form";

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

const company = {
  razao_social: "LIMPA TUDO SERVICOS LTDA",
  cnae_fiscal_descricao: "Limpeza em prédios e em domicílios",
  municipio: "CAMPINAS",
  uf: "SP",
};

const tender = (objetoCompra: string) => ({
  objetoCompra,
  orgaoEntidade: { razaoSocial: "MUNICIPIO DE LIMEIRA" },
  unidadeOrgao: { municipioNome: "Limeira" },
  dataEncerramentoProposta: "2026-10-20T09:30:00",
});

const stubRadarApis = (tenders: unknown[]) => {
  const fetcher = vi.fn<typeof fetch>(async (input) => {
    const url = String(input);
    if (url.startsWith("https://brasilapi.com.br")) return jsonResponse(company);
    if (url.includes("pncp.gov.br")) {
      return jsonResponse({ totalRegistros: 3866, data: url.includes("pagina=1&") ? tenders : [] });
    }
    return new Response(null, { status: 200 });
  });
  vi.stubGlobal("fetch", fetcher);
  return fetcher;
};

const searchCnpj = async (cnpj = "33000167000101") => {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText(/CNPJ da empresa/), cnpj);
  await user.click(screen.getByRole("button", { name: "Ver licitações abertas" }));
  return user;
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("CnpjRadarForm", () => {
  it("ships the radar lead form in static HTML for Netlify Forms", () => {
    const html = renderToString(<CnpjRadarForm />);
    expect(html).toContain('name="radar"');
    expect(html).toContain('data-netlify="true"');
    expect(html).not.toContain('name="companyName"');
    for (const field of ["name", "email", "cnpj", "activity", "matchCount", "consent"]) {
      expect(html).toContain(`name="${field}"`);
    }
  });

  it("masks the CNPJ and rejects an invalid one without calling any API", async () => {
    const fetcher = stubRadarApis([]);
    render(<CnpjRadarForm />);
    const user = userEvent.setup();
    const input = screen.getByLabelText(/CNPJ da empresa/);
    await user.type(input, "33000167000102");
    expect(input).toHaveValue("33.000.167/0001-02");
    await user.click(screen.getByRole("button", { name: "Ver licitações abertas" }));
    expect(screen.getByText("Informe um CNPJ válido, com 14 números.")).toBeInTheDocument();
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(fetcher).not.toHaveBeenCalled();
  });

  it("shows the company, the statewide total and a preview of matching tenders", async () => {
    stubRadarApis([tender("Serviços de limpeza predial"), tender("Sistema de combate a incêndio")]);
    render(<CnpjRadarForm />);
    await searchCnpj();

    const result = await screen.findByRole("region", { name: /LIMPA TUDO SERVICOS LTDA/ });
    expect(within(result).getByText("Limpeza em prédios e em domicílios")).toBeInTheDocument();
    expect(within(result).getByText(/3\.866 pregões eletrônicos com proposta aberta em SP/)).toBeInTheDocument();
    expect(within(result).getByText("1 pregão aberto combina com a sua atividade")).toBeInTheDocument();
    expect(within(result).getByText("Serviços de limpeza predial")).toBeInTheDocument();
    expect(within(result).queryByText("Sistema de combate a incêndio")).not.toBeInTheDocument();
    expect(within(result).getByText(/20\/10/)).toBeInTheDocument();
  });

  it("explains the correlated search when no tender matches the activity words", async () => {
    stubRadarApis([tender("Sistema de combate a incêndio")]);
    render(<CnpjRadarForm />);
    await searchCnpj();
    expect(await screen.findByText(/termos correlatos/)).toBeInTheDocument();
  });

  it("shows a fixed message when the CNPJ is not registered", async () => {
    vi.stubGlobal("fetch", vi.fn<typeof fetch>().mockResolvedValue(jsonResponse({}, 404)));
    render(<CnpjRadarForm />);
    await searchCnpj();
    expect(await screen.findByText(RADAR_NOT_FOUND_ERROR)).toBeInTheDocument();
  });

  it("captures the lead with the company context after the preview", async () => {
    const fetcher = stubRadarApis([tender("Serviços de limpeza predial")]);
    render(<CnpjRadarForm />);
    const user = await searchCnpj();
    await screen.findByRole("region", { name: /LIMPA TUDO/ });

    await user.click(screen.getByRole("button", { name: "Receber a lista completa" }));
    expect(screen.getByText("Informe seu nome.")).toBeInTheDocument();

    await user.type(screen.getByLabelText(/^Nome/), "Maria Souza");
    await user.type(screen.getByLabelText(/E-mail corporativo/), "maria@empresa.com.br");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "Receber a lista completa" }));

    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent(/Pronto, Maria Souza/));
    const leadCall = fetcher.mock.calls.find(([url]) => url === "/");
    const body = new URLSearchParams(String(leadCall?.[1]?.body));
    expect(body.has("companyName")).toBe(false);
    expect(Object.fromEntries(body)).toMatchObject({
      "form-name": "radar",
      name: "Maria Souza",
      email: "maria@empresa.com.br",
      cnpj: "33.000.167/0001-01",
      matchCount: "1",
    });
  });
});
