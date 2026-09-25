import {
  Search,
  ChevronDown,
  LayoutDashboard,
  FileText,
  FolderOpen,
  Settings,
  Package,
  ArrowRight,
  CalendarDays,
} from "lucide-react";

const opportunities = [
  {
    status: "Aberta",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    edital: "045/2025",
    org: "Pref. Salvador",
    modalidade: "Pregão Eletrônico",
    value: "R$ 347.850",
    deadline: "29 nov 2025",
    match: "87%",
    matchColor: "bg-primary/10 text-primary",
  },
  {
    status: "Aberta",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    edital: "031/2025",
    org: "DEFAR Paraíba",
    modalidade: "Pregão Eletrônico",
    value: "R$ 128.000",
    deadline: "15 dez 2025",
    match: "72%",
    matchColor: "bg-primary/10 text-primary",
  },
  {
    status: "Aberta",
    statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    edital: "019/2025",
    org: "Assemb. Leg. BA",
    modalidade: "Concorrência",
    value: "R$ 93.500",
    deadline: "08 jan 2026",
    match: "65%",
    matchColor: "bg-amber-50 text-amber-700",
  },
];

function SelectMock({ label }: { label: string }) {
  return (
    <div className="flex min-w-0 flex-1 items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2">
      <span className="truncate text-xs text-gray-400">{label}</span>
      <ChevronDown className="ml-2 size-3 shrink-0 text-gray-400" />
    </div>
  );
}

const navItems = [
  { icon: LayoutDashboard, label: "Painel", active: true },
  { icon: Search, label: "Licitações", active: false },
  { icon: FileText, label: "Propostas", active: false },
  { icon: FolderOpen, label: "Documentos", active: false },
  { icon: Package, label: "Catálogo", active: false },
  { icon: Settings, label: "Config.", active: false },
];

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
            <span className="text-[10px] text-gray-400">app.qore.com.br/painel</span>
          </div>
        </div>

        {/* App shell: sidebar + content */}
        <div className="flex bg-gray-50/80">
          {/* Sidebar mini */}
          <aside className="flex w-12 flex-col items-center gap-1 border-r border-gray-200 bg-white py-3">
            {navItems.map((item) => (
              <div
                key={item.label}
                className={`flex size-8 items-center justify-center rounded-lg ${
                  item.active
                    ? "bg-primary text-white"
                    : "text-gray-400 hover:bg-gray-100"
                }`}
                title={item.label}
              >
                <item.icon className="size-4" />
              </div>
            ))}
          </aside>

          {/* Main content */}
          <div className="min-w-0 flex-1">
            {/* Header */}
            <div className="border-b border-gray-100 bg-white px-4 py-3">
              <h3 className="text-sm font-bold text-gray-900">Painel</h3>
              <p className="text-[10px] text-gray-400">
                Aqui estão as oportunidades mais relevantes para o seu perfil
              </p>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-3 divide-x border-b border-gray-100 bg-white">
              {[
                { label: "Em meu perfil", val: "12" },
                { label: "Compatibilidades", val: "36" },
                { label: "Categorias", val: "2" },
              ].map((kpi) => (
                <div key={kpi.label} className="px-3 py-2 text-center">
                  <p className="text-base font-black text-gray-900">{kpi.val}</p>
                  <p className="text-[9px] text-gray-400">{kpi.label}</p>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="m-3 rounded-xl border border-gray-200 bg-white p-2.5">
              <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
                <div className="col-span-2 flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 sm:col-span-1">
                  <Search className="size-3 shrink-0 text-gray-400" />
                  <span className="truncate text-xs text-gray-400">
                    Buscar por palavra-chave...
                  </span>
                </div>
                <SelectMock label="Categoria" />
                <SelectMock label="UF" />
                <SelectMock label="Status" />
              </div>
            </div>

            {/* Cards */}
            <div className="grid gap-2.5 px-3 pb-4 sm:grid-cols-3">
              {opportunities.map((opp) => (
                <div
                  key={opp.edital}
                  className="rounded-xl border border-gray-200 bg-white p-3"
                >
                  {/* Status + match */}
                  <div className="mb-2 flex items-center justify-between">
                    <span
                      className={`rounded-md border px-1.5 py-0.5 text-[9px] font-semibold ${opp.statusColor}`}
                    >
                      {opp.status}
                    </span>
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${opp.matchColor}`}
                    >
                      {opp.match} compat.
                    </span>
                  </div>

                  {/* Modalidade */}
                  <p className="mb-1 font-mono text-[9px] text-gray-400">
                    {opp.modalidade}
                  </p>

                  {/* Edital + Org */}
                  <p className="text-[10px] font-bold text-gray-900 leading-tight">
                    {opp.edital} · {opp.org}
                  </p>

                  {/* Value + deadline */}
                  <div className="mt-2 grid grid-cols-2 gap-1.5">
                    <div className="rounded-lg bg-gray-50 px-2 py-1.5">
                      <span className="text-[8px] font-semibold tracking-wider text-gray-400 uppercase">
                        Valor Est.
                      </span>
                      <p className="text-[9px] font-bold text-gray-900 mt-0.5">
                        {opp.value}
                      </p>
                    </div>
                    <div className="rounded-lg bg-gray-50 px-2 py-1.5">
                      <span className="text-[8px] font-semibold tracking-wider text-gray-400 uppercase flex items-center gap-0.5">
                        <CalendarDays className="size-2" />
                        Prazo
                      </span>
                      <p className="text-[9px] font-bold text-gray-900 mt-0.5">
                        {opp.deadline}
                      </p>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-2.5 flex items-center justify-center gap-1 rounded-lg bg-primary py-1.5">
                    <span className="text-[9px] font-semibold text-white">
                      Enviar Proposta
                    </span>
                    <ArrowRight className="size-2.5 text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
