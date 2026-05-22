"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { q: "Preciso instalar algum software?", a: "Não. BilyFit é 100% na nuvem. Funciona em qualquer navegador, no celular, tablet ou computador da recepção. Atualizações automáticas, sem dor de cabeça." },
  { q: "Tem fidelidade ou multa?", a: "Zero fidelidade. Você paga mês a mês e pode cancelar quando quiser. Acreditamos que vamos te conquistar pelo resultado." },
  { q: "Como funciona o teste grátis?", a: "Você tem 14 dias completos com todos os recursos do plano Pro, sem precisar inserir cartão de crédito. Se gostar, escolhe o plano. Se não, encerra sem custos." },
  { q: "Consigo migrar dados de outro sistema?", a: "Sim. Importamos seus alunos, planos e histórico financeiro de planilhas Excel/Google ou de outros sistemas. Nosso time faz isso por você no onboarding." },
  { q: "BilyFit funciona pra academias de qual tamanho?", a: "De studios com 50 alunos a redes com 10.000+. Temos planos para todos os tamanhos e a arquitetura é construída para escalar com você." },
  { q: "O check-in suporta catracas e biometria?", a: "Sim. Temos integração nativa com as principais catracas e leitores biométricos do mercado. Também oferecemos check-in por QR Code, totalmente gratuito." },
  { q: "Os dados ficam seguros?", a: "Servidores em datacenters ISO 27001, criptografia ponta a ponta, backup diário automático e LGPD-compliant. Seus dados são intocáveis." },
  { q: "Existe app para o aluno?", a: "Sim — disponível para iOS e Android. Os alunos fazem check-in, veem treinos, pagam mensalidades e se comunicam com os professores pelo app." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-28">
      <div className="container max-w-3xl">
        <div className="text-center">
          <span className="chip mb-4">FAQ</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">Perguntas frequentes</h2>
          <p className="mt-4 text-lg text-subtle">Tudo o que você precisa saber antes de começar.</p>
        </div>
        <div className="mt-12 space-y-3">
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className={cn("card-3d overflow-hidden transition-all", isOpen && "ring-brand-soft")}>
                <button onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-center justify-between gap-4 p-5 text-left">
                  <span className="font-semibold">{item.q}</span>
                  <span className={cn("w-8 h-8 rounded-lg flex items-center justify-center transition-colors", isOpen ? "bg-brand text-black" : "bg-elevated text-brand")}>
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>
                {isOpen && <div className="px-5 pb-5 text-subtle leading-relaxed">{item.a}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
