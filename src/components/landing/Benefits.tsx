import { TrendingUp, Clock, DollarSign, Users } from "lucide-react";

const STATS = [
  { icon: TrendingUp, value: "+47%", label: "aumento médio de receita", color: "text-success" },
  { icon: DollarSign, value: "-68%", label: "redução de inadimplência", color: "text-brand" },
  { icon: Clock, value: "12h", label: "economizadas por semana", color: "text-info" },
  { icon: Users, value: "+32%", label: "retenção de alunos", color: "text-warning" },
];

export function Benefits() {
  return (
    <section className="py-28 relative">
      <div className="container">
        <div className="card-3d p-10 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand/15 blur-[120px] pointer-events-none" />
          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="chip mb-4">Resultados reais</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
                Academias BilyFit faturam <span className="text-brand">mais</span> e trabalham <span className="text-brand">menos</span>.
              </h2>
              <p className="mt-5 text-lg text-subtle">
                Dados consolidados de mais de 800 academias parceiras nos últimos 12 meses.
                A diferença entre stagnar e crescer está no sistema que você usa.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {STATS.map((s) => (
                <div key={s.label} className="glass rounded-2xl p-6">
                  <div className={`w-10 h-10 rounded-lg bg-elevated flex items-center justify-center ${s.color}`}>
                    <s.icon size={20} />
                  </div>
                  <div className={`mt-4 font-display text-4xl font-bold ${s.color}`}>{s.value}</div>
                  <div className="mt-1 text-sm text-subtle">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
