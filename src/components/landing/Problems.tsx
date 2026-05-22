import { AlertTriangle, Frown, Receipt, Users2, CalendarX, TrendingDown } from "lucide-react";

const PROBLEMS = [
  { icon: Receipt, title: "Inadimplência sem controle", desc: "Mensalidades em atraso passando despercebidas e drenando o caixa todo mês." },
  { icon: CalendarX, title: "Check-in manual e caótico", desc: "Recepção sobrecarregada, fila no balcão e zero controle de quem entrou." },
  { icon: Users2, title: "Cadastros espalhados", desc: "Planilhas, cadernos e sistemas que não conversam entre si." },
  { icon: TrendingDown, title: "Decisões no escuro", desc: "Sem relatórios em tempo real, você só descobre o problema no fim do mês." },
  { icon: Frown, title: "Alunos desengajados", desc: "Sem comunicação ativa, sua academia vira só mais um custo na agenda do aluno." },
  { icon: AlertTriangle, title: "Operação travada", desc: "Sistemas antigos, lentos e sem suporte deixam você refém da tecnologia." },
];

export function Problems() {
  return (
    <section className="py-28 relative">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <span className="chip mb-4"><AlertTriangle size={14} className="text-danger" /> O problema</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            Sua academia perde dinheiro <span className="text-danger">todo dia</span> sem você perceber
          </h2>
          <p className="mt-4 text-lg text-subtle">
            Gerir uma academia em 2026 com ferramentas dos anos 2000 é o atalho mais rápido para a falência.
            Veja o que está sangrando seu negócio.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROBLEMS.map((p, i) => (
            <div key={p.title} className="card-3d p-6 group" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-danger/10 border border-danger/20 text-danger">
                <p.icon size={22} />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-subtle">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
