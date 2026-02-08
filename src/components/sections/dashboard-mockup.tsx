import {
  Search,
  ChevronDown,
  MapPin,
  Building2,
  DollarSign,
  CalendarDays,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

const opportunities = [
  {
    status: "Ativa",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    location: "Salvador, BA",
    title: "Aquisição de Medicamentos",
    org: "Prefeitura de Salvador",
    value: "R$ 300.000,00",
    deadline: "30/11/2025",
    description:
      "Compra de medicamentos para abastecimento da farmácia popular.",
  },
  {
    status: "Encerrada",
    statusColor: "bg-red-50 text-red-700 border-red-200",
    location: "Rio de Janeiro, RJ",
    title: "Contratação de Serviços de Limpeza",
    org: "Tribunal de Justiça do Rio de Janeiro",
    value: "R$ 80.000,00",
    deadline: "09/10/2024",
    description:
      "Prestação de serviços contínuos de limpeza, asseio e conservação predial.",
  },
  {
    status: "Em breve",
    statusColor: "bg-orange-50 text-orange-700 border-orange-200",
    location: "Belo Horizonte, MG",
    title: "Fornecimento de Merenda Escolar",
    org: "Governo do Estado de Minas Gerais",
    value: "R$ 2.000.000,00",
    deadline: "19/01/2026",
    description:
      "Registro de preços para aquisição de gêneros alimentícios para as escolas da rede municipal.",
  },
];

function SelectMock({ label }: { label: string }) {
  return (
    <div className="flex min-w-0 flex-1 items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2.5">
      <span className="truncate text-xs text-gray-400">{label}</span>
      <ChevronDown className="ml-2 size-3.5 shrink-0 text-gray-400" />
    </div>
  );
}

export function DashboardMockup() {
  return (
    <div className="pointer-events-none select-none" aria-hidden="true">
      {/* Browser chrome frame */}
      <div className="overflow-hidden rounded-xl border border-gray-200/80 bg-white shadow-2xl shadow-gray-900/10">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50 px-4 py-2.5">
          <div className="flex gap-1.5">
            <div className="size-2.5 rounded-full bg-red-400" />
            <div className="size-2.5 rounded-full bg-amber-400" />
            <div className="size-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="mx-auto flex h-6 w-64 items-center justify-center rounded-md bg-gray-100 sm:w-80">
            <span className="text-[10px] text-gray-400">app.qore.com.br/dashboard</span>
          </div>
        </div>

        {/* App content */}
        <div className="bg-gray-50/80">
          {/* Filters */}
          <div className="m-4 rounded-xl border border-gray-200 bg-white p-3 sm:m-5">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <div className="col-span-2 flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 sm:col-span-1">
                <Search className="size-3.5 shrink-0 text-gray-400" />
                <span className="truncate text-xs text-gray-400">
                  Buscar por palavra-chave...
                </span>
              </div>
              <SelectMock label="Categoria" />
              <SelectMock label="Região (Estado)" />
              <SelectMock label="Status" />
            </div>
          </div>

          {/* Results header */}
          <div className="flex items-center justify-between px-4 pb-3 sm:px-5">
            <h3 className="text-sm font-bold text-gray-900">
              Últimas Oportunidades
            </h3>
            <span className="text-[11px] text-gray-400">
              5 resultados encontrados
            </span>
          </div>

          {/* Cards */}
          <div className="grid gap-3 px-4 pb-5 sm:grid-cols-3 sm:px-5">
            {opportunities.map((opp) => (
              <div
                key={opp.title}
                className="rounded-xl border border-gray-200 bg-white p-4"
              >
                {/* Status + location */}
                <div className="mb-3 flex items-center justify-between">
                  <span
                    className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold ${opp.statusColor}`}
                  >
                    {opp.status}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-gray-400">
                    <MapPin className="size-2.5" />
                    {opp.location}
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-xs font-bold leading-snug text-gray-900">
                  {opp.title}
                </h4>

                {/* Org */}
                <div className="mt-2 flex items-center gap-1.5">
                  <Building2 className="size-3 shrink-0 text-gray-400" />
                  <span className="truncate text-[10px] text-gray-500">
                    {opp.org}
                  </span>
                </div>

                {/* Value + deadline */}
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-gray-50 px-2.5 py-2">
                    <span className="text-[9px] font-semibold tracking-wider text-gray-400 uppercase">
                      Valor
                    </span>
                    <div className="mt-0.5 flex items-center gap-1">
                      <DollarSign className="size-2.5 text-primary" />
                      <span className="text-[10px] font-bold text-gray-900">
                        {opp.value}
                      </span>
                    </div>
                  </div>
                  <div className="rounded-lg bg-gray-50 px-2.5 py-2">
                    <span className="text-[9px] font-semibold tracking-wider text-gray-400 uppercase">
                      Prazo
                    </span>
                    <div className="mt-0.5 flex items-center gap-1">
                      <CalendarDays className="size-2.5 text-primary" />
                      <span className="text-[10px] font-bold text-gray-900">
                        {opp.deadline}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-3 line-clamp-2 text-[10px] leading-relaxed text-gray-500">
                  {opp.description}
                </p>

                {/* Actions */}
                <div className="mt-3 flex gap-2">
                  <div className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary py-2">
                    <span className="text-[10px] font-medium text-white">
                      Ver Detalhes
                    </span>
                    <ArrowRight className="size-2.5 text-white" />
                  </div>
                  <div className="flex items-center justify-center rounded-lg border border-gray-200 px-2.5">
                    <ExternalLink className="size-3 text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
