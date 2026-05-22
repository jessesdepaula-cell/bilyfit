import { CheckCircle2, Cpu, Workflow } from "lucide-react";

export function Solution() {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-brand/10 blur-[140px] pointer-events-none" />
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="chip mb-4"><Workflow size={14} className="text-brand" /> A solução</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
              Uma plataforma. <span className="text-brand">Toda a sua operação.</span>
            </h2>
            <p className="mt-5 text-lg text-subtle">
              BilyFit é o sistema operacional da sua academia. Tudo o que você precisa para captar, gerir,
              fidelizar e escalar — no mesmo lugar, com inteligência de verdade.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "Cadastro inteligente de alunos com onboarding automático",
                "Cobrança recorrente integrada ao Pix, cartão e boleto",
                "Check-in por QR Code, biometria ou catraca",
                "Bloqueio automático para inadimplentes",
                "Comunicação massiva via WhatsApp e e-mail",
                "Relatórios e BI em tempo real",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-brand mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="card-3d p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center">
                  <Cpu size={20} className="text-black" />
                </div>
                <div>
                  <div className="font-display font-semibold">BilyFit OS</div>
                  <div className="text-xs text-dim">v4.7 • Atualização contínua</div>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Cadastros sincronizados", value: 100 },
                  { label: "Cobranças automatizadas", value: 96 },
                  { label: "Alunos engajados", value: 88 },
                  { label: "Inadimplência reduzida", value: 74 },
                ].map((m) => (
                  <div key={m.label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-subtle">{m.label}</span>
                      <span className="text-brand font-semibold">{m.value}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-elevated overflow-hidden">
                      <div className="h-full bg-gradient-brand rounded-full" style={{ width: `${m.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-8 -right-4 card-3d p-4 w-56 animate-float">
              <div className="text-xs text-dim">Aumento médio de receita</div>
              <div className="mt-1 font-display text-3xl font-bold text-brand">+47%</div>
              <div className="text-xs text-dim">em 6 meses</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
