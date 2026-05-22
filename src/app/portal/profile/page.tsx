"use client";
import { PageHeader } from "@/components/dashboard/DashShell";
import { ASSESSMENTS } from "@/lib/mock-data";

const me = ASSESSMENTS[0];

export default function PortalProfilePage() {
  return (
    <>
      <PageHeader title="Meu perfil" subtitle="Seus dados e avaliação física" />

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="card-3d p-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-2xl bg-gradient-brand text-black flex items-center justify-center font-display text-3xl font-bold">LP</div>
            <h3 className="mt-4 font-display text-xl font-bold">Lucas Pereira</h3>
            <div className="text-sm text-subtle">Aluno desde Mai/2024</div>
            <span className="chip mt-3"><span className="w-1.5 h-1.5 rounded-full bg-success" /> Plano Mensal</span>
          </div>
        </div>

        <div className="lg:col-span-2 card-3d p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Última avaliação física</h3>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { l: "Peso", v: `${me.weight.toFixed(1)} kg` },
              { l: "Altura", v: `${me.height.toFixed(2)} m` },
              { l: "IMC", v: me.bmi.toFixed(1) },
              { l: "% Gordura", v: `${me.bodyFat.toFixed(1)}%` },
              { l: "Massa muscular", v: `${me.muscleMass.toFixed(1)} kg` },
              { l: "Avaliador", v: me.evaluator },
            ].map((s) => (
              <div key={s.l} className="glass p-4 rounded-xl">
                <div className="text-xs text-dim">{s.l}</div>
                <div className="mt-1 font-display text-lg font-bold">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card-3d p-6 mt-5 max-w-xl">
        <h3 className="font-display text-lg font-semibold mb-4">Dados pessoais</h3>
        <div className="space-y-4">
          <div><label className="label">Nome</label><input className="input" defaultValue="Lucas Pereira" /></div>
          <div><label className="label">E-mail</label><input className="input" defaultValue="aluno@bilyfit.com" /></div>
          <div><label className="label">Telefone</label><input className="input" defaultValue="+55 11 97777-1111" /></div>
          <button className="btn-primary">Salvar</button>
        </div>
      </div>
    </>
  );
}
