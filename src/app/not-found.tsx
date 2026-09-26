import Link from "next/link";
import { Button } from "@/components/ui/button";

const NotFound = () => (
  <main id="conteudo" tabIndex={-1} className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
    <h1 className="text-headline-xl-mobile md:text-headline-xl">404</h1>
    <p className="mt-2 text-body-lg text-muted-foreground">Página não encontrada</p>
    <Button asChild className="mt-6">
      <Link href="/">Voltar ao início</Link>
    </Button>
  </main>
);

export default NotFound;
