import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Coverage } from "@/components/sections/coverage";
import { Faq } from "@/components/sections/faq";
import { Features } from "@/components/sections/features";
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
    <Features />
    <PlatformTour />
    <ResponsibleAi />
    <Personas />
    <Coverage />
    <About />
    <Faq />
    <Contact />
  </main>
);

export default HomePage;
