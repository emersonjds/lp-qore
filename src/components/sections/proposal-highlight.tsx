import { SectionWrapper } from "@/components/layout/section-wrapper";
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
        <PanelScreenshot
          title={pricingTab.label}
          image={pricingTab.image}
          alt={pricingTab.alt}
          sizes="(min-width: 1024px) 34rem, 100vw"
        />
      )}
    </div>
  </SectionWrapper>
);
