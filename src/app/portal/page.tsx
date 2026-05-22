"use client";
import { PageHeader, StatCard } from "@/components/dashboard/DashShell";
import { AreaChartBrand } from "@/components/dashboard/Charts";
import { Flame, Trophy, Calendar, Dumbbell, ArrowRight, Target } from "lucide-react";

const FREQUENCY = Array.from({ length: 12 }).map((_, i) => ({
  week: `S${i + 1}`,
  checkins: 3 + Math.floor(Math.sin(i) * 1.5 + 2),
}));

export default function PortalHome() {
  return (
    <>
      <PageHeader title="Olá, Lucas 👋" subtitle="Aqui está o resumo da sua semana" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard label="Sequência" value="14 dias" trend="🔥" icon={Flame} color="text-warning" />
        <StatCard label="Check-ins do mês" value="22" trend="+4" icon={Calendar} color="text-success" />
        <StatCard label="Treinos completos" value="18" trend="+3" icon={Dumbbell} />
        <StatCard label="Meta semanal" value="5/6" trend="83%" icon={Target} color="text-info" />
      </div>

      <div className="grid xl:grid-cols-3 gap-5 mb-8">
        <div className="xl:col-span-2 card-3d p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Sua frequência</h3>
          <AreaChartBrand data={FREQUENCY} dataKey="checkins" xKey="week" />
        </div>
        <div className="card-3d p-6 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-brand/20 blur-2xl" />
          <div className="relative">
            <Trophy size={32} className="text-brand" />
            <h3 className="mt-4 font-display text-xl font-bold">Próxima conquista</h3>
            <p className="mt-2 text-subtle text-sm">15 dias seguidos! Faltam só <span className="text-brand font-bold">1 treino</span> para você desbloquear o badge "Disciplina de Aço".</p>
            <div className="mt-4 h-2 rounded-full bg-elevated overflow-hidden">
              <div className="h-full w-[93%] bg-gradient-brand rounded-full" />
            </div>
            <div className="mt-1 text-xs text-dim text-right">14/15</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="card-3d p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold">Treino de hoje</h3>
            <button className="text-xs text-brand flex items-center gap-1 hover:underline">Ver ficha completa <ArrowRight size={12} /></button>
          </div>
          <div className="space-y-2">
            {[
              { ex: "Supino reto barra", set: "4x10", w: "65kg" },
              { ex: "Crucifixo halter", set: "3x12", w: "16kg" },
              { ex: "Crossover", set: "3x15", w: "20kg" },
              { ex: "Tríceps polia", set: "4x12", w: "32kg" },
              { ex: "Tríceps testa", set: "3x10", w: "14kg" },
            ].map((e, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-elevated/50 transition">
                <span className="w-7 h-7 rounded-md bg-brand/15 text-brand flex items-center justify-center text-xs font-bold">{i + 1}</span>
                <span className="flex-1 text-sm font-medium">{e.ex}</span>
                <span className="text-xs text-subtle">{e.set}</span>
                <span className="text-xs font-mono text-brand">{e.w}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card-3d p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Próximas aulas</h3>
          <div className="space-y-3">
            {[
              { d: "Hoje", t: "19:30", c: "CrossTraining", r: "Box CT" },
              { d: "Amanhã", t: "07:00", c: "Funcional", r: "Box 1" },
              { d: "Quarta", t: "18:30", c: "Boxe", r: "Ring" },
            ].map((a, i) => (
              <div key={i} className="flex items-center justify-between p-3 glass rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-brand text-black flex flex-col items-center justify-center">
                    <span className="text-[10px] font-semibold">{a.d.toUpperCase()}</span>
                    <span className="text-xs font-bold">{a.t}</span>
                  </div>
                  <div>
                    <div className="font-medium">{a.c}</div>
                    <div className="text-xs text-dim">{a.r}</div>
                  </div>
                </div>
                <button className="btn-secondary text-xs py-1.5 px-3">Confirmar</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
