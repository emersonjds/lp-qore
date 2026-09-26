import { describe, expect, it, vi } from "vitest";
import {
  RADAR_FORM_NAME,
  RADAR_LOOKUP_ERROR,
  RADAR_NOT_FOUND_ERROR,
  encodeRadarLead,
  extractActivityKeywords,
  lookupCompany,
  matchOpenTenders,
  runRadar,
  type OpenTender,
} from "../cnpj-radar";

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

const companyBody = {
  razao_social: "LIMPA TUDO SERVICOS LTDA",
  nome_fantasia: "LIMPA TUDO",
  cnae_fiscal_descricao: "Limpeza em prédios e em domicílios",
  municipio: "CAMPINAS",
  uf: "SP",
};

const pncpItem = (objetoCompra: string, razaoSocial = "MUNICIPIO DE LIMEIRA") => ({
  objetoCompra,
  orgaoEntidade: { razaoSocial },
  unidadeOrgao: { municipioNome: "Limeira" },
  dataEncerramentoProposta: "2026-10-20T09:30:00",
});

describe("extractActivityKeywords", () => {
  it("keeps the distinctive words of the activity without accents or generic terms", () => {
    expect(extractActivityKeywords("Limpeza em prédios e em domicílios")).toEqual(["limpeza", "predios", "domicilios"]);
    expect(extractActivityKeywords("Comércio varejista de outros produtos alimentícios")).toEqual(["alimenticios"]);
  });
});

describe("matchOpenTenders", () => {
  const tenders: OpenTender[] = [
    { object: "Contratação de serviços de LIMPEZA predial", agency: "Prefeitura A", city: "Limeira", closesAt: "2026-10-20T09:30:00" },
    { object: "Sistema de combate a incêndio", agency: "Prefeitura B", city: "Sorocaba", closesAt: "2026-10-21T09:30:00" },
    { object: "Material de limpeza e higiene", agency: "Prefeitura C", city: "Santos", closesAt: "2026-10-22T09:30:00" },
  ];

  it("returns tenders whose object shares a keyword stem, ignoring case and accents", () => {
    expect(matchOpenTenders(tenders, ["limpeza", "predios"]).map((tender) => tender.agency)).toEqual([
      "Prefeitura A",
      "Prefeitura C",
    ]);
  });

  it("returns nothing when there are no keywords", () => {
    expect(matchOpenTenders(tenders, [])).toEqual([]);
  });
});

describe("lookupCompany", () => {
  it("reads the company from the public CNPJ registry", async () => {
    const fetcher = vi.fn().mockResolvedValue(jsonResponse(companyBody));
    await expect(lookupCompany("12.345.678/0001-95", fetcher)).resolves.toEqual({
      status: "found",
      company: { name: "LIMPA TUDO SERVICOS LTDA", activity: "Limpeza em prédios e em domicílios", city: "CAMPINAS", state: "SP" },
    });
    expect(fetcher).toHaveBeenCalledWith("https://brasilapi.com.br/api/cnpj/v1/12345678000195");
  });

  it("reports an unknown CNPJ separately from a failed lookup", async () => {
    await expect(lookupCompany("12345678000195", vi.fn().mockResolvedValue(jsonResponse({}, 404)))).resolves.toEqual({
      status: "error",
      message: RADAR_NOT_FOUND_ERROR,
    });
    await expect(lookupCompany("12345678000195", vi.fn().mockRejectedValue(new Error("offline")))).resolves.toEqual({
      status: "error",
      message: RADAR_LOOKUP_ERROR,
    });
    await expect(lookupCompany("12345678000195", vi.fn().mockResolvedValue(jsonResponse({ uf: "SP" })))).resolves.toEqual({
      status: "error",
      message: RADAR_LOOKUP_ERROR,
    });
  });
});

describe("runRadar", () => {
  const now = new Date("2026-09-26T12:00:00-03:00");

  it("combines the company with matching open SP tenders and the statewide total", async () => {
    const fetcher = vi.fn(async (url: string) => {
      if (url.startsWith("https://brasilapi.com.br")) return jsonResponse(companyBody);
      if (!url.includes("pagina=1&")) return jsonResponse({ totalRegistros: 3866, data: [] });
      return jsonResponse({
        totalRegistros: 3866,
        data: [pncpItem("Serviços de limpeza predial"), pncpItem("Sistema de combate a incêndio")],
      });
    });

    const result = await runRadar("12345678000195", fetcher, now);

    expect(result).toEqual({
      status: "found",
      company: { name: "LIMPA TUDO SERVICOS LTDA", activity: "Limpeza em prédios e em domicílios", city: "CAMPINAS", state: "SP" },
      openInState: 3866,
      matches: [{ object: "Serviços de limpeza predial", agency: "MUNICIPIO DE LIMEIRA", city: "Limeira", closesAt: "2026-10-20T09:30:00" }],
    });
    const pncpUrls = fetcher.mock.calls.map(([url]) => url).filter((url) => url.includes("pncp.gov.br"));
    expect(pncpUrls).toHaveLength(3);
    expect(pncpUrls[0]).toBe(
      "https://pncp.gov.br/api/consulta/v1/contratacoes/proposta?dataFinal=20261026&uf=SP&codigoModalidadeContratacao=6&pagina=1&tamanhoPagina=50",
    );
  });

  it("still returns the company when the tender feed fails", async () => {
    const fetcher = vi.fn(async (url: string) =>
      url.startsWith("https://brasilapi.com.br") ? jsonResponse(companyBody) : jsonResponse({}, 503),
    );
    const result = await runRadar("12345678000195", fetcher, now);
    expect(result).toMatchObject({ status: "found", openInState: null, matches: [] });
  });

  it("passes the lookup error through", async () => {
    const fetcher = vi.fn().mockResolvedValue(jsonResponse({}, 404));
    await expect(runRadar("12345678000195", fetcher, now)).resolves.toEqual({ status: "error", message: RADAR_NOT_FOUND_ERROR });
  });
});

describe("encodeRadarLead", () => {
  it("sends the lead with the CNPJ and activity but never the registered company name", () => {
    const body = new URLSearchParams(
      encodeRadarLead({
        name: " Maria ",
        email: " maria@empresa.com.br ",
        cnpj: "12.345.678/0001-95",
        activity: "Limpeza em prédios e em domicílios",
        matchCount: 4,
      }),
    );
    expect(Object.fromEntries(body)).toEqual({
      "form-name": RADAR_FORM_NAME,
      name: "Maria",
      email: "maria@empresa.com.br",
      cnpj: "12.345.678/0001-95",
      activity: "Limpeza em prédios e em domicílios",
      matchCount: "4",
      consent: "sim",
      "bot-field": "",
    });
  });
});

describe("encodeRadarLead spreadsheet safety", () => {
  it("neutralizes formula-like names before they reach the Netlify CSV export", () => {
    const body = new URLSearchParams(
      encodeRadarLead({ name: "=cmd", email: "a@b.co", cnpj: "33.000.167/0001-01", activity: "-x", matchCount: 0 }),
    );
    expect(body.get("name")).toBe("'=cmd");
    expect(body.get("activity")).toBe("'-x");
  });
});
