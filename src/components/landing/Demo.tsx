"use client";
import { useState } from "react";
import { Monitor, Tablet, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";


const SCREENS = [
  { id: "dashboard", label: "Dashboard", title: "Visão geral da operação", desc: "Todos os KPIs da sua academia em um painel poderoso e em tempo real." },
  { id: "students", label: "Alunos", title: "Gestão completa de alunos", desc: "Cadastro, histórico, planos, frequência e cobrança. Tudo unificado." },
  { id: "finance", label: "Financeiro", title: "Controle financeiro total", desc: "Fluxo de caixa, mensalidades, despesas e cobrança automatizada." },
  { id: "checkin", label: "Check-in", title: "Check-in inteligente", desc: "QR Code, biometria e bloqueio automático para inadimplentes." },
];

export function Demo() {
  const [active, setActive] = useState(SCREENS[0].id);
  const current = SCREENS.find((s) => s.id === active)!;

  return (
    <section id="demo" className="py-28 relative">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <span className="chip mb-4">Demonstração</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            Veja o BilyFit <span className="text-brand">em ação</span>
          </h2>
          <p className="mt-4 text-lg text-subtle">
            Telas reais do sistema. Sem mockup falso, sem ilustração genérica.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
          {SCREENS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-sm font-medium transition-all",
                active === s.id ? "bg-brand text-black shadow-glow" : "glass text-subtle hover:text-foreground"
              )}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="mt-10 relative max-w-6xl mx-auto">
          <div className="absolute -inset-x-20 -inset-y-10 bg-brand/15 blur-[120px] pointer-events-none" />
          <div className="relative">
            <div className="text-center mb-6">
              <h3 className="font-display text-2xl font-semibold">{current.title}</h3>
              <p className="text-subtle">{current.desc}</p>
            </div>

            <div className="card-3d p-3">
              <div className="rounded-xl overflow-hidden border border-border bg-background">
                <div className="flex items-center gap-2 px-4 py-3 bg-elevated border-b border-border">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/70"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/70"></span>
                  </div>
                  <div className="flex items-center gap-2 ml-auto text-dim">
                    <Smartphone size={14} />
                    <Tablet size={14} />
                    <Monitor size={14} className="text-brand" />
                  </div>
                </div>

                {active === "dashboard" && <DashScreen />}
                {active === "students" && <StudentsScreen />}
                {active === "finance" && <FinanceScreen />}
                {active === "checkin" && <CheckinScreen />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DashScreen() {
  return (
    <div className="p-6 grid grid-cols-4 gap-4 min-h-[440px]">
      {[
        { l: "Alunos ativos", v: "842", t: "+12%" },
        { l: "Receita do mês", v: "R$ 94.2k", t: "+8.4%" },
        { l: "Check-ins hoje", v: "318", t: "+22%" },
        { l: "Inadimplência", v: "3.1%", t: "-1.2%" },
      ].map((m) => (
        <div key={m.l} className="glass p-4 rounded-xl">
          <div className="text-xs text-dim">{m.l}</div>
          <div className="mt-1 font-display text-2xl font-bold">{m.v}</div>
          <div className="text-xs text-brand">{m.t}</div>
        </div>
      ))}
      <div className="col-span-2 glass rounded-xl p-4">
        <div className="text-xs text-dim mb-3">Evolução de receita</div>
        <svg viewBox="0 0 300 120" className="w-full h-40">
          <defs>
            <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F5D90A" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#F5D90A" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,90 L40,80 L80,70 L120,55 L160,60 L200,40 L240,30 L300,20 L300,120 L0,120 Z" fill="url(#lg)" />
          <path d="M0,90 L40,80 L80,70 L120,55 L160,60 L200,40 L240,30 L300,20" stroke="#F5D90A" strokeWidth="2.5" fill="none" />
        </svg>
      </div>
      <div className="col-span-2 glass rounded-xl p-4">
        <div className="text-xs text-dim mb-3">Distribuição por modalidade</div>
        <div className="space-y-2.5">
          {[
            { n: "Musculação", v: 540, p: 64, c: "#F5D90A" },
            { n: "Funcional", v: 220, p: 26, c: "#22C55E" },
            { n: "CrossTraining", v: 180, p: 21, c: "#F59E0B" },
            { n: "Pilates", v: 140, p: 16, c: "#EC4899" },
          ].map((m) => (
            <div key={m.n} className="flex items-center gap-3">
              <span className="text-xs text-subtle w-24">{m.n}</span>
              <div className="flex-1 h-2 bg-elevated rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${m.p}%`, background: m.c }} />
              </div>
              <span className="text-xs text-foreground w-10 text-right">{m.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function StudentsScreen() {
  return (
    <div className="p-6 min-h-[440px]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-display text-lg font-semibold">Alunos</h4>
          <div className="text-xs text-dim">842 ativos • 28 inadimplentes</div>
        </div>
        <button className="px-3 py-1.5 rounded-lg bg-brand text-black text-xs font-semibold">+ Novo aluno</button>
      </div>
      <div className="glass rounded-xl overflow-hidden">
        <div className="grid grid-cols-6 text-xs text-dim px-4 py-3 border-b border-border">
          <span className="col-span-2">Nome</span><span>Plano</span><span>Status</span><span>Último check-in</span><span>Mensalidade</span>
        </div>
        {[
          { n: "Lucas Pereira", p: "Mensal", s: "Ativo", lc: "Hoje 07:42", v: "R$ 129" },
          { n: "Mariana Costa", p: "Anual", s: "Ativo", lc: "Ontem", v: "R$ 199" },
          { n: "Felipe Souza", p: "Trimestral", s: "Inadimplente", lc: "3 dias", v: "R$ 159" },
          { n: "Camila Rocha", p: "Black", s: "Ativo", lc: "Hoje 19:15", v: "R$ 249" },
          { n: "Bruno Martins", p: "Mensal", s: "Trancado", lc: "—", v: "R$ 129" },
          { n: "Júlia Almeida", p: "Semestral", s: "Ativo", lc: "Hoje 08:10", v: "R$ 199" },
        ].map((r, i) => (
          <div key={i} className="grid grid-cols-6 text-xs px-4 py-3 border-b border-border/40 last:border-0 items-center">
            <span className="col-span-2 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-gradient-brand text-black flex items-center justify-center text-[10px] font-bold">{r.n.split(" ").map((p)=>p[0]).join("")}</span>
              <span>{r.n}</span>
            </span>
            <span className="text-subtle">{r.p}</span>
            <span><span className={cn("inline-block px-2 py-0.5 rounded-full text-[10px]", r.s === "Ativo" ? "bg-success/15 text-success" : r.s === "Inadimplente" ? "bg-danger/15 text-danger" : "bg-warning/15 text-warning")}>{r.s}</span></span>
            <span className="text-subtle">{r.lc}</span>
            <span className="text-foreground font-medium">{r.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
function FinanceScreen() {
  return (
    <div className="p-6 grid grid-cols-3 gap-4 min-h-[440px]">
      <div className="col-span-2 glass rounded-xl p-4">
        <div className="text-xs text-dim mb-3">Receita x Despesas</div>
        <div className="flex items-end gap-2 h-44">
          {[
            { r: 70, e: 45 }, { r: 80, e: 48 }, { r: 65, e: 42 }, { r: 75, e: 44 }, { r: 85, e: 50 }, { r: 92, e: 52 }, { r: 100, e: 55 },
          ].map((b, i) => (
            <div key={i} className="flex-1 flex gap-1 items-end">
              <div className="flex-1 rounded-t-md bg-gradient-to-t from-brand to-brand-300" style={{ height: `${b.r}%` }} />
              <div className="flex-1 rounded-t-md bg-muted" style={{ height: `${b.e}%` }} />
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <div className="glass rounded-xl p-4">
          <div className="text-xs text-dim">Saldo do mês</div>
          <div className="mt-1 font-display text-3xl font-bold text-success">R$ 44.7k</div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="text-xs text-dim">A receber</div>
          <div className="mt-1 font-display text-3xl font-bold text-brand">R$ 18.2k</div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="text-xs text-dim">Inadimplência</div>
          <div className="mt-1 font-display text-3xl font-bold text-danger">R$ 3.1k</div>
        </div>
      </div>
    </div>
  );
}
function CheckinScreen() {
  return (
    <div className="p-6 grid grid-cols-2 gap-4 min-h-[440px]">
      <div className="glass rounded-xl p-6 flex flex-col items-center justify-center">
        <div className="w-44 h-44 rounded-2xl bg-foreground p-3">
          <div className="w-full h-full grid grid-cols-8 gap-0.5">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className={(i * 7) % 3 === 0 ? "bg-background rounded-[2px]" : "bg-foreground rounded-[2px]"} />
            ))}
          </div>
        </div>
        <div className="mt-4 text-sm font-medium">Escaneie no totem</div>
        <div className="text-xs text-dim">Iron Pump Academy • SP</div>
      </div>
      <div className="glass rounded-xl p-4">
        <div className="text-xs text-dim mb-3">Últimos check-ins</div>
        <div className="space-y-2">
          {[
            { n: "Mariana Costa", t: "20:14", s: "ok" },
            { n: "Lucas Pereira", t: "20:11", s: "ok" },
            { n: "Felipe Souza", t: "20:09", s: "blocked" },
            { n: "Júlia Almeida", t: "20:02", s: "ok" },
            { n: "Bruno Martins", t: "19:58", s: "ok" },
            { n: "Pedro Santos", t: "19:55", s: "ok" },
          ].map((c, i) => (
            <div key={i} className="flex items-center justify-between text-xs glass rounded-lg px-3 py-2">
              <div className="flex items-center gap-2">
                <span className={cn("w-2 h-2 rounded-full", c.s === "ok" ? "bg-success" : "bg-danger")} />
                <span>{c.n}</span>
              </div>
              <span className="text-dim">{c.t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
