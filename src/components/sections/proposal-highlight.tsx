import { SectionWrapper } from "@/components/layout/section-wrapper";
import { CountUp } from "@/components/motion/count-up";
import { proposalContent } from "@/config/features";
import { platformTabs } from "@/config/home-content";
import { PanelScreenshot } from "./panel-screenshot";

const pricingTab = platformTabs.find((tab) => tab.image === "pricing");

export const ProposalHighlight = () => (
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
      {pricingTab && (
        <div className="relative pt-4 pb-10">
          <PanelScreenshot
            title={pricingTab.label}
            image={pricingTab.image}
            alt={pricingTab.alt}
            sizes="(min-width: 1024px) 34rem, 100vw"
          />
          <div
            data-reveal
            data-proposal-progress
            className="absolute bottom-0 left-3 w-60 rounded-lg bg-card p-4 shadow-lg ring-1 ring-primary-tint-strong sm:left-6"
          >
            <p className="text-label-md font-semibold text-foreground">
              Proposta <CountUp value="80%" className="text-primary" /> pronta
            </p>
            <div aria-hidden="true" className="mt-2 h-2 overflow-hidden rounded-full bg-primary-tint">
              <div data-progress-fill className="h-full w-4/5 origin-left rounded-full bg-primary" />
            </div>
          </div>
          <p
            data-missing-chip
            className="absolute top-0 right-3 rounded-full bg-warning-tint px-3 py-1.5 text-label-md font-semibold text-warning-text shadow-md ring-1 ring-warning/30 sm:right-6"
          >
            Falta só o preço
          </p>
        </div>
      )}
    </div>
  </SectionWrapper>
);
