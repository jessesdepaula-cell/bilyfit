import { Users, CreditCard, QrCode, Dumbbell, MessageSquare, BarChart3, Calendar, ShieldCheck, Smartphone, Layers, Building2, Bot } from "lucide-react";

const FEATURES = [
  { icon: Users, title: "Gestão de Alunos", desc: "Cadastro completo, status, plano, histórico financeiro e de frequência. Tudo em um clique." },
  { icon: CreditCard, title: "Financeiro Robusto", desc: "Mensalidades, despesas, fluxo de caixa, DRE e cobrança automatizada via Pix, cartão e boleto." },
  { icon: QrCode, title: "Check-in Inteligente", desc: "QR Code, biometria e catraca integrada. Bloqueio automático para inadimplentes." },
  { icon: Dumbbell, title: "Treinos & Fichas", desc: "Biblioteca de exercícios, fichas personalizadas, periodização e acompanhamento de evolução." },
  { icon: Calendar, title: "Turmas & Agenda", desc: "Modalidades, professores e horários. Reservas com 1 toque pelo app do aluno." },
  { icon: MessageSquare, title: "Comunicação 360º", desc: "WhatsApp oficial, e-mail e push. Réguas de cobrança e engajamento automáticas." },
  { icon: BarChart3, title: "BI em tempo real", desc: "Dashboards com KPIs de receita, retenção, lifetime value e churn previsivo." },
  { icon: ShieldCheck, title: "Permissões granulares", desc: "Defina exatamente o que cada perfil pode ver e fazer. Auditoria completa." },
  { icon: Smartphone, title: "App do Aluno", desc: "iOS e Android. Treinos, check-in, pagamento e comunidade no bolso do seu cliente." },
  { icon: Layers, title: "Multiunidade", desc: "Gestão centralizada de várias unidades com dados isolados e comparativo entre filiais." },
  { icon: Building2, title: "Multiempresa", desc: "Separação total entre academias, ideal para redes e franquias com governança." },
  { icon: Bot, title: "BilyAI", desc: "Assistente de inteligência artificial que sugere ações para reduzir churn e aumentar receita." },
];

export function Features() {
  return (
    <section id="features" className="py-28 relative">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <span className="chip mb-4">Recursos</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            Tudo que sua academia precisa.<br /><span className="text-brand">Nada do que ela não precisa.</span>
          </h2>
          <p className="mt-4 text-lg text-subtle">
            Pensado por gestores de academia e construído por engenheiros obcecados por performance.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <div key={f.title} className="card-3d p-6 group relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-brand/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-elevated border border-border flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-black transition-colors">
                  <f.icon size={22} />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">{f.title}</h3>
                <p className="mt-2 text-subtle text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
