import { CircleAlert } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { CountUp } from "@/components/motion/count-up";
import { problemContent } from "@/config/home-content";
import { marketNumbers } from "@/config/market-numbers";

export const Problem = () => (
  <SectionWrapper id="problema" aria-labelledby="problem-title" className="bg-surface-low">
    <p className="text-label-sm uppercase text-primary">{problemContent.eyebrow}</p>
    <h2 id="problem-title" className="mt-2 max-w-2xl text-headline-lg-mobile md:text-headline-lg">
      {problemContent.title}
    </h2>
    <ul className="mt-12 grid gap-6 md:grid-cols-3">
      {problemContent.items.map(({ icon: Icon, title, description, footnote }) => (
        <li key={title} data-reveal className="flex flex-col justify-between rounded-lg bg-card p-6 shadow-sm">
          <div>
            <span className="mb-5 flex size-12 items-center justify-center rounded-md bg-surface-container text-primary">
              <Icon aria-hidden="true" className="size-6" />
            </span>
            <h3 className="mb-3 text-title-md text-foreground">{title}</h3>
            <p className="text-body-md text-muted-foreground">{description}</p>
          </div>
          <p data-problem-footnote className="mt-6 flex items-center gap-2 pt-6 text-caption text-muted-foreground">
            <CircleAlert aria-hidden="true" className="size-4 shrink-0 text-destructive-text" />
            {footnote}
          </p>
        </li>
      ))}
    </ul>
    <div className="mt-6 grid gap-6 sm:grid-cols-2">
      {marketNumbers.map((marketNumber) => (
        <div key={marketNumber.label} data-testid="market-number" className="rounded-lg bg-card p-6 shadow-sm">
          <p className="font-display text-headline-lg-mobile text-foreground tabular-nums md:text-headline-lg">
            <CountUp value={marketNumber.value} />
          </p>
          <p className="mt-1 text-body-md text-foreground">{marketNumber.label}</p>
          <p className="mt-2 text-caption text-muted-foreground">
            Fonte: {marketNumber.source}, {marketNumber.date}
          </p>
        </div>
      ))}
    </div>
  </SectionWrapper>
);
