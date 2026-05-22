import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { PLATFORM_PLANS } from "@/lib/mock-data";
import { formatCurrency, cn } from "@/lib/utils";

export function Pricing() {
  return (
    <section id="pricing" className="py-28 relative">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <span className="chip mb-4">Planos</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            Um plano para cada <span className="text-brand">tamanho de academia</span>
          </h2>
          <p className="mt-4 text-lg text-subtle">
            Comece grátis por 14 dias. Sem fidelidade. Cancele quando quiser.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {PLATFORM_PLANS.map((p) => (
            <div key={p.id} className={cn(
              "card-3d p-8 relative",
              p.highlighted && "ring-brand-soft scale-[1.02]"
            )}>
              {p.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 chip bg-gradient-brand text-black border-0 px-3 py-1">
                  <Sparkles size={12} /> Mais escolhido
                </div>
              )}
              <h3 className="font-display text-2xl font-bold">{p.name}</h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-5xl font-bold">{formatCurrency(p.price)}</span>
                <span className="text-subtle">/mês</span>
              </div>
              <p className="mt-2 text-sm text-dim">
                Até {p.maxStudents.toLocaleString("pt-BR")} alunos • {p.maxUnits} unidade{p.maxUnits > 1 ? "s" : ""}
              </p>
              <Link href="/signup" className={cn("mt-6 w-full", p.highlighted ? "btn-primary" : "btn-secondary")}>
                Começar agora
              </Link>
              <ul className="mt-8 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check size={18} className="text-brand mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-dim">
          Precisa de mais? <Link href="/signup" className="text-brand hover:underline">Fale com nosso time enterprise</Link>
        </p>
      </div>
    </section>
  );
}
