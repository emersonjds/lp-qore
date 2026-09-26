import { About } from "@/components/sections/about";
import { Audience } from "@/components/sections/audience";
import { CnpjRadar } from "@/components/sections/cnpj-radar";
import { Contact } from "@/components/sections/contact";
import { Coverage } from "@/components/sections/coverage";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Documents } from "@/components/sections/documents";
import { Faq } from "@/components/sections/faq";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Integrations } from "@/components/sections/integrations";
import { MobileCtaBar } from "@/components/sections/mobile-cta-bar";
import { Personas } from "@/components/sections/personas";
import { PlatformTour } from "@/components/sections/platform-tour";
import { Problem } from "@/components/sections/problem";
import { ProposalHighlight } from "@/components/sections/proposal-highlight";
import { ResponsibleAi } from "@/components/sections/responsible-ai";
import { Testimonials } from "@/components/sections/testimonials";
import { TimeSaved } from "@/components/sections/time-saved";
import { faqItems } from "@/config/faq";
import { ctaBanners } from "@/config/home-content";
import { siteConfig } from "@/config/site";
import { buildStructuredData, serializeJsonLd } from "@/lib/structured-data";

const HomePage = () => (
  <main id="conteudo" tabIndex={-1}>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd(
          buildStructuredData({
            siteName: siteConfig.name,
            siteUrl: siteConfig.url,
            description: siteConfig.description,
            faqItems,
          }),
        ),
      }}
    />
    <Hero />
    <CnpjRadar />
    <Problem />
    <HowItWorks />
    <PlatformTour />
    <Features />
    <ProposalHighlight />
    <CtaBanner {...ctaBanners.afterFeatures} />
    <Documents />
    <Personas />
    <Audience />
    <TimeSaved />
    <Integrations />
    <CtaBanner {...ctaBanners.afterIntegrations} />
    <ResponsibleAi />
    <Coverage />
    <About />
    <Testimonials />
    <Faq />
    <Contact />
    <MobileCtaBar />
  </main>
);

export default HomePage;
