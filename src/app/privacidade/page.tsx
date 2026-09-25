import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { ControllerIdentity } from "@/components/privacy/controller-identity";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como o Qore usa os dados enviados pelo formulário Fale Conosco.",
  alternates: { canonical: "/privacidade" },
};

const SECTION_TITLE_CLASS = "mt-10 text-headline-sm";

const PrivacyPage = () => (
  <main id="conteudo" tabIndex={-1} className="pt-28 pb-16">
    <Container className="max-w-3xl text-body-md text-foreground [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6">
      <h1 className="text-headline-xl-mobile md:text-headline-xl">Política de Privacidade</h1>
      <p className="text-muted-foreground">Última atualização: 25 de setembro de 2026.</p>

      <h2 className={SECTION_TITLE_CLASS}>Para que usamos seus dados</h2>
      <p>
        Usamos os dados do formulário Fale Conosco apenas para responder o seu contato e apresentar o Qore. Não vendemos seus dados nem os usamos para publicidade.
      </p>

      <h2 className={SECTION_TITLE_CLASS}>Quais dados coletamos</h2>
      <ul>
        <li>Nome</li>
        <li>E-mail</li>
        <li>Telefone ou WhatsApp</li>
        <li>Cargo</li>
        <li>Empresa ou CNPJ, se você informar</li>
        <li>Mensagem, se você escrever</li>
      </ul>
      <p>O envio é processado pelo Netlify, serviço que hospeda este site.</p>

      <h2 className={SECTION_TITLE_CLASS}>Base legal</h2>
      <p>
        Consentimento (art. 7º, I, da Lei 13.709/2018, LGPD), que você dá ao marcar a caixa de autorização no
        formulário. Você pode retirar o consentimento a qualquer momento.
      </p>

      <h2 className={SECTION_TITLE_CLASS}>Por quanto tempo guardamos</h2>
      <p>
        Guardamos os dados enquanto durar a conversa com você e por até 12 meses depois do último contato. Depois
        disso, apagamos.
      </p>

      <h2 className={SECTION_TITLE_CLASS}>Seus direitos</h2>
      <p>Pelo art. 18 da LGPD, você pode pedir:</p>
      <ul>
        <li>confirmação de que tratamos seus dados e acesso a eles;</li>
        <li>correção de dados incompletos ou desatualizados;</li>
        <li>anonimização, bloqueio ou eliminação de dados;</li>
        <li>portabilidade;</li>
        <li>informação sobre com quem compartilhamos seus dados;</li>
        <li>revogação do consentimento.</li>
      </ul>
      <p>Para exercer esses direitos, use o canal indicado na seção abaixo.</p>

      <h2 className={SECTION_TITLE_CLASS}>Quem é o controlador</h2>
      <ControllerIdentity legal={siteConfig.legal} />
    </Container>
  </main>
);

export default PrivacyPage;
