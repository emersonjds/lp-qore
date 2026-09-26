import { CircleAlert } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { CountUp } from "@/components/motion/count-up";
import { problemContent } from "@/config/home-content";
import { marketNumbers, marketNumbersTitle } from "@/config/market-numbers";

export const Problem = () => (
  <SectionWrapper id="problema" aria-labelledby="problem-title" className="bg-surface-low">
    <p className="text-label-sm uppercase tracking-wider text-primary">{problemContent.eyebrow}</p>
    <h2 id="problem-title" className="mt-2 max-w-2xl text-headline-lg-mobile md:text-headline-lg">
      {problemContent.title}
    </h2>
    <p className="mt-3 max-w-2xl text-body-lg text-muted-foreground">{problemContent.description}</p>
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
    <h3 className="mt-12 max-w-3xl text-headline-sm text-foreground">{marketNumbersTitle}</h3>
    <div className="mt-6 grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-4">
      {marketNumbers.map((marketNumber) => (
        <div key={marketNumber.label} data-testid="market-number" className="min-w-0 rounded-lg bg-card p-4 shadow-sm md:p-6">
          <p className="font-display text-headline-sm text-foreground tabular-nums md:text-headline-md">
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
