import type { ReactNode } from "react";
import { CircleCheck, Hourglass, ImagePlus } from "lucide-react";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { Badge } from "@/components/ui/badge";
import { proposalContent } from "@/config/features";

const ProposalDocumentIllustration = () => (
  <figure
    aria-label="Exemplo ilustrativo de proposta cerca de 80% pronta"
    className="relative rounded-lg border border-border bg-card p-6 shadow-lg md:p-8"
  >
    <div className="flex items-start justify-between gap-4">
      <div
        data-brand-slot
        className="flex h-14 w-28 shrink-0 flex-col items-center justify-center gap-1 rounded-md border border-dashed border-input text-muted-foreground"
      >
        <ImagePlus aria-hidden="true" className="size-4" />
        <span className="text-caption">Sua marca</span>
      </div>
      <Badge variant="outline">Exemplo ilustrativo</Badge>
    </div>
    <p className="mt-6 font-display text-title-md text-foreground">Proposta comercial</p>
    <div className="mt-4 flex items-center justify-between text-label-md">
      <span id="proposal-progress-label" className="text-muted-foreground">
        Proposta preenchida
      </span>
      <span className="font-display text-title-md text-primary tabular-nums">80%</span>
    </div>
    <div
      role="progressbar"
      aria-labelledby="proposal-progress-label"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={80}
      className="mt-2 h-2 overflow-hidden rounded-full bg-primary-tint-strong"
    >
      <div data-proposal-progress className="h-full w-full origin-left scale-x-[0.8] rounded-full bg-primary" />
    </div>
    <ul className="mt-6 flex flex-col gap-2">
      {proposalContent.completedSteps.map((step) => (
        <li key={step} className="flex items-center gap-3 rounded-md bg-surface-low px-4 py-3 text-body-md">
          <CircleCheck aria-hidden="true" className="size-5 shrink-0 text-primary" />
          <span className="flex-1">{step}</span>
          <span className="text-label-sm text-primary">Preenchido</span>
        </li>
      ))}
      <li
        data-pending-step
        className="flex items-center gap-3 rounded-md border border-warning bg-warning-tint px-4 py-3 text-body-md font-medium"
      >
        <Hourglass aria-hidden="true" className="size-5 shrink-0 text-warning-text" />
        <span className="flex-1">{proposalContent.pendingStep}</span>
        <span className="text-label-sm text-warning-text">Com você</span>
      </li>
    </ul>
  </figure>
);

interface ProposalHighlightProps {
  visual?: ReactNode;
}

export const ProposalHighlight = ({ visual = <ProposalDocumentIllustration /> }: ProposalHighlightProps) => (
  <SectionWrapper id="proposta" aria-labelledby="proposal-title" className="pt-0 md:pt-0 2xl:pt-0">
    <div className="grid items-center gap-10 overflow-hidden rounded-xl bg-primary-tint p-6 md:p-12 lg:grid-cols-2 lg:gap-16">
      <div>
        <p className="text-label-sm uppercase text-primary">{proposalContent.eyebrow}</p>
        <h2 id="proposal-title" className="mt-2 text-headline-lg-mobile md:text-headline-lg">
          {proposalContent.title}
        </h2>
        <p className="mt-3 text-body-lg text-muted-foreground">{proposalContent.description}</p>
        <p className="mt-4 text-body-md text-foreground">{proposalContent.brand}</p>
      </div>
      {visual}
    </div>
  </SectionWrapper>
);
