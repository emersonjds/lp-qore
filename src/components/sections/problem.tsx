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
    <div className="mt-8 grid gap-4 sm:grid-cols-2">
      {marketNumbers.map((marketNumber) => (
        <div
          key={marketNumber.label}
          data-testid="market-number"
          className="rounded-lg border border-primary-tint-strong bg-card p-5"
        >
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
    <ul className="mt-6 grid gap-4 md:grid-cols-3">
      {problemContent.items.map(({ icon: Icon, title, description }) => (
        <li key={title} data-reveal className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <Icon aria-hidden="true" className="size-6 text-primary" />
          <h3 className="mt-4 text-headline-sm">{title}</h3>
          <p className="mt-2 text-body-md text-muted-foreground">{description}</p>
        </li>
      ))}
    </ul>
  </SectionWrapper>
);
