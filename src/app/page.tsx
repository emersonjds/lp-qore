import { About } from "@/components/sections/about";
import { Coverage } from "@/components/sections/coverage";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Personas } from "@/components/sections/personas";
import { PlatformTour } from "@/components/sections/platform-tour";
import { Problem } from "@/components/sections/problem";
import { ResponsibleAi } from "@/components/sections/responsible-ai";

const HomePage = () => (
  <main id="conteudo" tabIndex={-1}>
    <Hero />
    <Problem />
    <HowItWorks />
    <PlatformTour />
    <ResponsibleAi />
    <Personas />
    <Coverage />
    <About />
    <Faq />
  </main>
);

export default HomePage;
