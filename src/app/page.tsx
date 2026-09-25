import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Coverage } from "@/components/sections/coverage";
import { Documents } from "@/components/sections/documents";
import { Faq } from "@/components/sections/faq";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { MobileCtaBar } from "@/components/sections/mobile-cta-bar";
import { Personas } from "@/components/sections/personas";
import { PlatformTour } from "@/components/sections/platform-tour";
import { ProposalHighlight } from "@/components/sections/proposal-highlight";
import { Problem } from "@/components/sections/problem";
import { ResponsibleAi } from "@/components/sections/responsible-ai";
import { ctaBanners } from "@/config/home-content";

const HomePage = () => (
  <main id="conteudo" tabIndex={-1}>
    <Hero />
    <Problem />
    <HowItWorks />
    <Features />
    <ProposalHighlight />
    <CtaBanner {...ctaBanners.afterFeatures} />
    <Documents />
    <PlatformTour />
    <ResponsibleAi />
    <Personas />
    <Coverage />
    <About />
    <Faq />
    <Contact />
    <MobileCtaBar />
  </main>
);

export default HomePage;
