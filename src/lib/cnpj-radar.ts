import { extractCnpjDigits } from "./cnpj";

export interface RadarCompany {
  name: string;
  activity: string;
  city: string;
  state: string;
}

export interface OpenTender {
  object: string;
  agency: string;
  city: string;
  closesAt: string;
}

export type RadarResult =
  | { status: "found"; company: RadarCompany; openInState: number | null; matches: OpenTender[] }
  | { status: "error"; message: string };

type CompanyLookup = { status: "found"; company: RadarCompany } | { status: "error"; message: string };

export interface RadarLead {
  name: string;
  email: string;
  cnpj: string;
  companyName: string;
  activity: string;
  matchCount: number;
}

export const RADAR_FORM_NAME = "radar";
export const RADAR_NOT_FOUND_ERROR = "Não encontramos esse CNPJ na Receita Federal. Confira os números e tente de novo.";
export const RADAR_LOOKUP_ERROR = "Não conseguimos consultar agora. Tente de novo em alguns minutos.";

const COMPANY_ENDPOINT = "https://brasilapi.com.br/api/cnpj/v1/";
const OPEN_TENDERS_ENDPOINT = "https://pncp.gov.br/api/consulta/v1/contratacoes/proposta";
const ELECTRONIC_AUCTION_MODALITY = "6";
const PAGES_TO_SCAN = 3;
const PAGE_SIZE = 50;
const LOOKAHEAD_DAYS = 30;
const SAO_PAULO_OFFSET_MS = -3 * 60 * 60 * 1000;
const MIN_KEYWORD_LENGTH = 5;
const STEM_LENGTH = 5;
const GENERIC_ACTIVITY_WORDS = new Set([
  "comercio",
  "varejista",
  "atacadista",
  "outros",
  "outras",
  "produtos",
  "servicos",
  "atividades",
  "fabricacao",
  "exceto",
  "especificados",
  "especificadas",
  "anteriormente",
  "artigos",
  "geral",
  "industria",
  "predominancia",
]);

type Fetcher = (url: string) => Promise<Response>;

const normalizeText = (value: string): string =>
  value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null;

const readString = (record: Record<string, unknown>, key: string): string => {
  const value = record[key];
  return typeof value === "string" ? value.trim() : "";
};

export const extractActivityKeywords = (activity: string): string[] =>
  normalizeText(activity)
    .split(/[^a-z]+/)
    .filter((word) => word.length >= MIN_KEYWORD_LENGTH && !GENERIC_ACTIVITY_WORDS.has(word));

export const matchOpenTenders = (tenders: readonly OpenTender[], keywords: readonly string[]): OpenTender[] => {
  const stems = keywords.map((keyword) => keyword.slice(0, STEM_LENGTH));
  if (stems.length === 0) return [];
  return tenders.filter((tender) => {
    const object = normalizeText(tender.object);
    return stems.some((stem) => object.includes(stem));
  });
};

export const lookupCompany = async (cnpj: string, fetcher: Fetcher = fetch): Promise<CompanyLookup> => {
  try {
    const response = await fetcher(`${COMPANY_ENDPOINT}${extractCnpjDigits(cnpj)}`);
    if (response.status === 404) return { status: "error", message: RADAR_NOT_FOUND_ERROR };
    if (!response.ok) return { status: "error", message: RADAR_LOOKUP_ERROR };
    const body: unknown = await response.json();
    if (!isRecord(body)) return { status: "error", message: RADAR_LOOKUP_ERROR };
    const name = readString(body, "razao_social");
    const activity = readString(body, "cnae_fiscal_descricao");
    if (!name || !activity) return { status: "error", message: RADAR_LOOKUP_ERROR };
    return {
      status: "found",
      company: { name, activity, city: readString(body, "municipio"), state: readString(body, "uf") },
    };
  } catch {
    return { status: "error", message: RADAR_LOOKUP_ERROR };
  }
};

const formatPncpDate = (date: Date): string => {
  const local = new Date(date.getTime() + SAO_PAULO_OFFSET_MS);
  const month = String(local.getUTCMonth() + 1).padStart(2, "0");
  const day = String(local.getUTCDate()).padStart(2, "0");
  return `${local.getUTCFullYear()}${month}${day}`;
};

const buildOpenTendersUrl = (page: number, now: Date): string => {
  const closingLimit = new Date(now.getTime() + LOOKAHEAD_DAYS * 24 * 60 * 60 * 1000);
  const params = new URLSearchParams({
    dataFinal: formatPncpDate(closingLimit),
    uf: "SP",
    codigoModalidadeContratacao: ELECTRONIC_AUCTION_MODALITY,
    pagina: String(page),
    tamanhoPagina: String(PAGE_SIZE),
  });
  return `${OPEN_TENDERS_ENDPOINT}?${params.toString()}`;
};

const toOpenTender = (item: unknown): OpenTender | null => {
  if (!isRecord(item)) return null;
  const object = readString(item, "objetoCompra");
  if (!object) return null;
  const agency = isRecord(item.orgaoEntidade) ? readString(item.orgaoEntidade, "razaoSocial") : "";
  const city = isRecord(item.unidadeOrgao) ? readString(item.unidadeOrgao, "municipioNome") : "";
  return { object, agency, city, closesAt: readString(item, "dataEncerramentoProposta") };
};

interface TenderPage {
  total: number | null;
  tenders: OpenTender[];
}

const fetchTenderPage = async (page: number, now: Date, fetcher: Fetcher): Promise<TenderPage | null> => {
  try {
    const response = await fetcher(buildOpenTendersUrl(page, now));
    if (!response.ok) return null;
    const body: unknown = await response.json();
    if (!isRecord(body) || !Array.isArray(body.data)) return null;
    const tenders = body.data.map(toOpenTender).filter((tender): tender is OpenTender => tender !== null);
    return { total: typeof body.totalRegistros === "number" ? body.totalRegistros : null, tenders };
  } catch {
    return null;
  }
};

export const runRadar = async (cnpj: string, fetcher: Fetcher = fetch, now: Date = new Date()): Promise<RadarResult> => {
  const pageNumbers = Array.from({ length: PAGES_TO_SCAN }, (_, index) => index + 1);
  const [lookup, ...pages] = await Promise.all([
    lookupCompany(cnpj, fetcher),
    ...pageNumbers.map((page) => fetchTenderPage(page, now, fetcher)),
  ]);
  if (lookup.status === "error") return lookup;

  const tenders = pages.flatMap((page) => page?.tenders ?? []);
  return {
    status: "found",
    company: lookup.company,
    openInState: pages[0]?.total ?? null,
    matches: matchOpenTenders(tenders, extractActivityKeywords(lookup.company.activity)),
  };
};

export const encodeRadarLead = (lead: RadarLead): string =>
  new URLSearchParams({
    "form-name": RADAR_FORM_NAME,
    name: lead.name.trim(),
    email: lead.email.trim(),
    cnpj: lead.cnpj,
    companyName: lead.companyName,
    activity: lead.activity,
    matchCount: String(lead.matchCount),
    consent: "sim",
    "bot-field": "",
  }).toString();
