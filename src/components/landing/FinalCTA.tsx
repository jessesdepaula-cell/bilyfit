import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-28">
      <div className="container">
        <div className="card-3d relative overflow-hidden p-12 md:p-20 text-center">
          <div className="absolute inset-0 bg-radial-brand opacity-80 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-brand/10 blur-[140px] pointer-events-none" />
          <div className="relative max-w-3xl mx-auto">
            <Sparkles size={36} className="text-brand mx-auto mb-6 animate-pulse" />
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
              Pronto para virar a chave da sua academia?
            </h2>
            <p className="mt-6 text-lg md:text-xl text-subtle">
              Mais de 800 academias já transformaram a operação. Você é o próximo.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/signup" className="btn-primary text-base px-8 py-4">
                Começar grátis agora <ArrowRight size={18} />
              </Link>
              <Link href="/login" className="btn-secondary text-base px-8 py-4">
                Já tenho conta — Entrar
              </Link>
            </div>
            <p className="mt-6 text-sm text-dim">14 dias grátis • Sem cartão de crédito • Cancele quando quiser</p>
          </div>
        </div>
      </div>
    </section>
  );
}
