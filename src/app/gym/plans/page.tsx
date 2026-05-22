"use client";
import { PageHeader } from "@/components/dashboard/DashShell";
import { formatCurrency } from "@/lib/utils";
import { Edit, Plus, Users, Check } from "lucide-react";

const GYM_PLANS = [
  { name: "Mensal", price: 89, duration: "1 mês", students: 184, color: "from-zinc-500 to-zinc-700", features: ["Acesso à musculação", "Aulas em grupo", "Avaliação física inicial"] },
  { name: "Trimestral", price: 129, duration: "3 meses", students: 142, color: "from-blue-500 to-cyan-600", features: ["Tudo do Mensal", "15% de desconto", "1 reavaliação inclusa"] },
  { name: "Semestral", price: 159, duration: "6 meses", students: 96, color: "from-emerald-500 to-teal-600", features: ["Tudo do Trimestral", "30% de desconto", "Personal 2x/mês"] },
  { name: "Anual", price: 199, duration: "12 meses", students: 218, color: "from-violet-500 to-purple-600", features: ["Tudo do Semestral", "45% de desconto", "Acompanhamento nutricional"] },
  { name: "Black", price: 249, duration: "12 meses", students: 64, color: "from-yellow-400 to-amber-600", features: ["Acesso 24h", "Acompanhamento VIP", "Sala black room exclusiva"] },
];

export default function PlansPage() {
  return (
    <>
      <PageHeader
        title="Planos"
        subtitle="Planos comerciais da academia"
        action={<button className="btn-primary text-sm py-2.5"><Plus size={14}/> Novo plano</button>}
      />
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {GYM_PLANS.map((p) => (
          <div key={p.name} className="card-3d p-6 relative overflow-hidden">
            <div className={`absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br ${p.color} opacity-20 blur-2xl`} />
            <div className="relative">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-xl font-bold">{p.name}</h3>
                  <div className="text-xs text-dim">{p.duration}</div>
                </div>
                <button className="p-2 rounded-lg glass hover:border-brand/40"><Edit size={14} className="text-subtle" /></button>
              </div>
              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="font-display text-4xl font-bold">{formatCurrency(p.price)}</span>
                <span className="text-subtle text-sm">/mês</span>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-subtle">
                <Users size={14} /> {p.students} alunos ativos
              </div>
              <ul className="mt-4 space-y-2">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check size={14} className="text-brand mt-0.5" /> <span className="text-subtle">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
