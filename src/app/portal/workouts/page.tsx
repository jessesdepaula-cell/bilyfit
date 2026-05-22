"use client";
import { PageHeader } from "@/components/dashboard/DashShell";
import { Dumbbell, Play } from "lucide-react";

const FICHAS = [
  { name: "Ficha A — Peito/Tríceps", exercises: 8, day: "Segunda", duration: "60min", progress: 87 },
  { name: "Ficha B — Costas/Bíceps", exercises: 7, day: "Quarta", duration: "55min", progress: 64 },
  { name: "Ficha C — Pernas/Glúteos", exercises: 9, day: "Sexta", duration: "70min", progress: 92 },
  { name: "Cardio HIIT", exercises: 5, day: "Terça/Quinta", duration: "30min", progress: 45 },
];

export default function PortalWorkouts() {
  return (
    <>
      <PageHeader title="Meus treinos" subtitle="Suas fichas e evolução semanal" />
      <div className="grid md:grid-cols-2 gap-5">
        {FICHAS.map((f) => (
          <div key={f.name} className="card-3d p-6">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-brand/15 text-brand flex items-center justify-center"><Dumbbell size={22}/></div>
              <button className="btn-primary text-xs py-2 px-3"><Play size={12}/> Iniciar</button>
            </div>
            <h3 className="mt-4 font-display text-lg font-bold">{f.name}</h3>
            <div className="mt-2 flex items-center gap-3 text-xs text-subtle">
              <span>{f.exercises} exercícios</span>
              <span>•</span>
              <span>{f.day}</span>
              <span>•</span>
              <span>{f.duration}</span>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-subtle">Progresso semanal</span>
                <span className="text-brand font-semibold">{f.progress}%</span>
              </div>
              <div className="h-2 rounded-full bg-elevated overflow-hidden">
                <div className="h-full bg-gradient-brand rounded-full" style={{ width: `${f.progress}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
