import { CircleCheck } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { CountUp } from "@/components/motion/count-up";
import {
  calendarScreen,
  documentsScreen,
  managerOverviewScreen,
  pricingScreen,
  radarScreen,
  summaryScreen,
} from "@/config/simulated-screens";
import { staggerStyle } from "@/lib/stagger-style";
import { cn } from "@/lib/utils";
import type { PlatformScreenId } from "@/types";
import { SimulatedWindow } from "./simulated-window";

interface ScreenProps {
  label: string;
}

const ScreenHeading = ({ title, description, aside }: { title: string; description?: string; aside?: ReactNode }) => (
  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
    <div>
      <h3 className="text-headline-sm text-foreground">{title}</h3>
      {description && <p className="text-caption text-muted-foreground">{description}</p>}
    </div>
    {aside}
  </div>
);

export const ManagerOverviewScreen = ({ label }: ScreenProps) => (
  <SimulatedWindow title={managerOverviewScreen.windowTitle} label={label}>
    <div className="flex flex-col gap-6 p-4 md:p-8">
      <ScreenHeading
        title={managerOverviewScreen.title}
        description={`${managerOverviewScreen.description} Período: ${managerOverviewScreen.period}.`}
        aside={
          <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full bg-primary-fixed/40 px-3 py-1 text-label-sm text-primary-deep">
            <span aria-hidden="true" className="size-2 rounded-full bg-primary" />
            {managerOverviewScreen.sourceBadge}
          </span>
        }
      />
      <ul className="grid gap-4 sm:grid-cols-3">
        {managerOverviewScreen.kpis.map((kpi) => (
          <li key={kpi.label} className="flex flex-col justify-between rounded-md bg-surface-low p-5">
            <span className="text-label-sm text-muted-foreground">{kpi.label}</span>
            <span className="mt-2 flex items-baseline gap-2">
              <CountUp
                value={kpi.value}
                className={cn("font-display text-headline-xl", kpi.isHighlighted ? "text-primary" : "text-foreground")}
              />
              <span className="text-caption text-muted-foreground">{kpi.note}</span>
            </span>
          </li>
        ))}
      </ul>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-md bg-surface-low/60 p-4">
          <p className="mb-3 font-display text-title-md text-foreground">{managerOverviewScreen.modalitiesTitle}</p>
          <ul className="flex flex-col gap-3">
            {managerOverviewScreen.modalities.map((modality, index) => (
              <li key={modality.name}>
                <span className="mb-1 flex justify-between text-caption text-foreground">
                  {modality.name}
                  <span className="font-bold">{modality.share}%</span>
                </span>
                <span aria-hidden="true" className="block h-2 overflow-hidden rounded-full bg-surface-container">
                  <span
                    data-bar
                    style={{ ...staggerStyle(index), width: `${modality.share}%` } satisfies CSSProperties}
                    className={cn("block h-full origin-left rounded-full", modality.tone)}
                  />
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-md bg-surface-low/60 p-4">
          <p className="mb-3 font-display text-title-md text-foreground">{managerOverviewScreen.sessionsTitle}</p>
          <div className="grid grid-cols-7 gap-1.5 text-center text-caption sm:gap-2">
            {managerOverviewScreen.weekDays.map((weekDay) => (
              <span key={weekDay} className="font-semibold text-muted-foreground">
                {weekDay}
              </span>
            ))}
            {managerOverviewScreen.days.map(({ day, sessions }, index) => (
              <span
                key={day}
                data-day-lit={sessions > 0 ? "" : undefined}
                style={staggerStyle(index)}
                className={cn(
                  "rounded-sm px-0.5 py-2",
                  sessions === 2 && "bg-primary font-bold text-primary-foreground",
                  sessions === 1 && "bg-primary-fixed/50 font-bold text-foreground",
                  sessions === 0 && "bg-card text-foreground",
                  sessions < 0 && "bg-surface-container/50 text-muted-foreground",
                )}
              >
                {day}
                {sessions === 1 && <span aria-hidden="true" className="mx-auto mt-0.5 block size-1.5 rounded-full bg-primary" />}
                {sessions === 2 && (
                  <>
                    <span aria-hidden="true" className="mx-auto mt-0.5 block size-1.5 rounded-full bg-primary-foreground sm:hidden" />
                    <span className="hidden text-[10px] leading-tight sm:block">2 sessões</span>
                  </>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </SimulatedWindow>
);

export const RadarScreen = ({ label }: ScreenProps) => (
  <SimulatedWindow title={radarScreen.windowTitle} label={label}>
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <ScreenHeading
        title={radarScreen.title}
        aside={<span className="shrink-0 text-caption text-muted-foreground">{radarScreen.updatedAt}</span>}
      />
      <ul className="flex flex-col gap-3 @3xl:hidden">
        {radarScreen.rows.map((row) => (
          <li key={row.agency} className="rounded-md bg-surface-low p-3">
            <p className="flex items-start justify-between gap-2 text-label-md font-semibold text-foreground">
              {row.agency}
              <span className="shrink-0 rounded-full bg-primary-fixed px-2.5 py-0.5 text-label-sm text-primary-deep">
                {row.match}
              </span>
            </p>
            <p className="mt-1 text-caption text-muted-foreground">{row.object}</p>
            <p className="mt-2 flex justify-between text-caption text-foreground">
              <span className="font-semibold">{row.value}</span>
              {row.session}
            </p>
          </li>
        ))}
      </ul>
      <table className="hidden w-full text-left text-body-md @3xl:table">
        <thead className="bg-surface-low text-label-sm uppercase text-muted-foreground">
          <tr>
            {radarScreen.columns.map((column, index) => (
              <th
                key={column}
                className={cn("p-3", index === 0 && "rounded-l-md", index === radarScreen.columns.length - 1 && "rounded-r-md text-right")}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-container">
          {radarScreen.rows.map((row) => (
            <tr key={row.agency}>
              <td className="p-3 font-medium text-foreground">{row.agency}</td>
              <td className="max-w-xs truncate p-3 text-caption text-muted-foreground">{row.object}</td>
              <td className="p-3 font-semibold whitespace-nowrap text-foreground">{row.value}</td>
              <td className="p-3 text-caption text-muted-foreground">{row.session}</td>
              <td className="p-3 text-right">
                <span className="inline-flex rounded-full bg-primary-fixed px-2.5 py-0.5 text-label-sm text-primary-deep">
                  {row.match}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </SimulatedWindow>
);

export const SummaryScreen = ({ label }: ScreenProps) => (
  <SimulatedWindow title={summaryScreen.windowTitle} label={label}>
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <ScreenHeading title={summaryScreen.title} description={summaryScreen.description} />
      <ul className="grid gap-4 md:grid-cols-3">
        {summaryScreen.clauses.map((clause, index) => (
          <li key={clause.label} data-day-lit style={staggerStyle(index)} className="rounded-md bg-surface-low p-4">
            <p className="mb-2 flex items-center justify-between gap-2">
              <span className="text-label-sm text-primary">{clause.label}</span>
              <span className="rounded-sm bg-card px-2 py-0.5 font-mono text-caption text-primary">{clause.page}</span>
            </p>
            <p className="text-caption leading-relaxed text-muted-foreground">{clause.text}</p>
          </li>
        ))}
      </ul>
    </div>
  </SimulatedWindow>
);

export const PricingScreen = ({ label }: ScreenProps) => (
  <SimulatedWindow title={pricingScreen.windowTitle} label={label}>
    <div className="flex flex-col gap-5 p-4 md:p-8">
      <ScreenHeading title={pricingScreen.title} description={pricingScreen.description} />
      <div className="grid items-center gap-6 md:grid-cols-2">
        <ul className="flex flex-col gap-3">
          {pricingScreen.lines.map((line) => (
            <li key={line.label} className="flex items-center justify-between gap-3 rounded-md bg-surface-low p-3">
              <span className="text-body-md text-muted-foreground">{line.label}</span>
              <span
                className={cn(
                  "shrink-0 font-display text-title-md",
                  line.isHighlighted ? "font-bold text-primary" : "text-foreground",
                )}
              >
                {line.value}
              </span>
            </li>
          ))}
        </ul>
        <div data-day-lit className="rounded-md bg-primary-tint p-5">
          <p className="mb-2 flex items-center gap-2 text-label-md text-primary">
            <CircleCheck aria-hidden="true" className="size-5" />
            {pricingScreen.verdictTitle}
          </p>
          <p className="text-caption leading-relaxed text-muted-foreground">{pricingScreen.verdict}</p>
        </div>
      </div>
    </div>
  </SimulatedWindow>
);

const milestoneTone = {
  alert: { card: "bg-surface-low", step: "text-destructive-text", date: "text-foreground" },
  neutral: { card: "bg-surface-low", step: "text-muted-foreground", date: "text-foreground" },
  primary: { card: "bg-surface-low", step: "text-primary", date: "text-foreground" },
  session: { card: "bg-primary-fixed/40", step: "text-primary-deep", date: "text-primary" },
} as const;

export const CalendarScreen = ({ label }: ScreenProps) => (
  <SimulatedWindow title={calendarScreen.windowTitle} label={label}>
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <ScreenHeading title={calendarScreen.title} description={calendarScreen.description} />
      <ol className="grid gap-4 md:grid-cols-4">
        {calendarScreen.milestones.map((milestone, index) => {
          const tone = milestoneTone[milestone.tone];
          return (
            <li
              key={milestone.step}
              data-day-lit
              style={staggerStyle(index)}
              className={cn("flex flex-col justify-between rounded-md p-4", tone.card)}
            >
              <span className={cn("text-label-sm", tone.step)}>{milestone.step}</span>
              <span className={cn("my-2 font-display text-headline-sm", tone.date)}>{milestone.date}</span>
              <span className="text-caption text-muted-foreground">{milestone.note}</span>
            </li>
          );
        })}
      </ol>
    </div>
  </SimulatedWindow>
);

export const DocumentsScreen = ({ label }: ScreenProps) => (
  <SimulatedWindow title={documentsScreen.windowTitle} label={label}>
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <p className="font-display text-title-md text-foreground">{documentsScreen.title}</p>
      <ul className="grid grid-cols-2 gap-3">
        {documentsScreen.counts.map((count) => (
          <li key={count.label} className={cn("rounded-md p-4", count.tone)}>
            <span className="block font-display text-headline-md">{count.value}</span>
            <span className="text-label-sm">{count.label}</span>
          </li>
        ))}
      </ul>
    </div>
  </SimulatedWindow>
);

export const platformScreens: Record<PlatformScreenId, (props: ScreenProps) => ReactNode> = {
  painel: ManagerOverviewScreen,
  radar: RadarScreen,
  resumo: SummaryScreen,
  precificacao: PricingScreen,
  calendario: CalendarScreen,
};
