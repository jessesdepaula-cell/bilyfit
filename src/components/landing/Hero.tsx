"use client";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-40 pb-24 overflow-hidden">
      <div className="absolute inset-0 grid-bg mask-radial pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-[800px] bg-radial-brand pointer-events-none" />
      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] rounded-full bg-brand/10 blur-[120px] pointer-events-none" />

      <div className="container relative">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="chip mb-6 animate-fade-in-up">
            <Sparkles size={14} className="text-brand" />
            <span>Nova era da gestão de academias chegou</span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] animate-fade-in-up">
            A plataforma que <span className="text-brand neon-text">transforma</span><br />
            sua academia em um<br />
            <span className="bg-gradient-brand bg-clip-text text-transparent">negócio escalável</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-subtle max-w-2xl animate-fade-in-up [animation-delay:120ms]">
            Gestão completa de alunos, financeiro, check-in, treinos e comunicação em uma única plataforma.
            Tecnologia de ponta para academias modernas.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 animate-fade-in-up [animation-delay:240ms]">
            <Link href="/signup" className="btn-primary text-base px-7 py-4">
              Começar grátis por 14 dias
              <ArrowRight size={18} />
            </Link>
            <a href="#demo" className="btn-secondary text-base px-7 py-4">
              Ver demonstração
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-dim animate-fade-in-up [animation-delay:360ms]">
            <div className="flex items-center gap-2"><ShieldCheck size={16} className="text-brand" /> Sem cartão de crédito</div>
            <div className="flex items-center gap-2"><Zap size={16} className="text-brand" /> Configuração em 5 minutos</div>
            <div className="flex items-center gap-2"><Sparkles size={16} className="text-brand" /> Suporte humano</div>
          </div>
        </div>

        {/* Floating dashboard preview */}
        <div className="relative mt-20 max-w-6xl mx-auto animate-fade-in-up [animation-delay:480ms]">
          <div className="absolute -inset-x-20 -inset-y-10 bg-brand/20 blur-[100px] pointer-events-none" />
          <div className="relative card-3d p-2 md:p-3 rotate-x-2">
            <div className="rounded-xl overflow-hidden border border-border">
              <div className="flex items-center gap-2 px-4 py-3 bg-elevated border-b border-border">
                <span className="w-3 h-3 rounded-full bg-red-500/70"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500/70"></span>
                <span className="w-3 h-3 rounded-full bg-green-500/70"></span>
                <span className="ml-3 text-xs text-dim">app.bilyfit.com/gym/dashboard</span>
              </div>
              <div className="bg-background p-6 grid grid-cols-4 gap-4 min-h-[420px]">
                {[
                  { label: "Alunos ativos", v: "842", trend: "+12%" },
                  { label: "Receita mensal", v: "R$ 94.2k", trend: "+8.4%" },
                  { label: "Check-ins hoje", v: "318", trend: "+22%" },
                  { label: "Inadimplência", v: "3.1%", trend: "-1.2%" },
                ].map((m) => (
                  <div key={m.label} className="glass p-4 rounded-xl">
                    <div className="text-xs text-dim">{m.label}</div>
                    <div className="mt-1 font-display text-2xl font-bold">{m.v}</div>
                    <div className="mt-1 text-xs text-brand">{m.trend}</div>
                  </div>
                ))}
                <div className="col-span-3 glass rounded-xl p-4">
                  <div className="text-xs text-dim mb-3">Receita vs Despesas</div>
                  <div className="flex items-end gap-2 h-40">
                    {[40, 65, 50, 70, 85, 78, 95].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col gap-1">
                        <div className="flex-1 flex items-end">
                          <div className="w-full rounded-t-md bg-gradient-to-t from-brand to-brand-300" style={{ height: `${h}%` }} />
                        </div>
                        <div className="w-full rounded-t-md bg-muted/60" style={{ height: `${h * 0.55}%` }} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="glass rounded-xl p-4">
                  <div className="text-xs text-dim mb-3">Plano premium</div>
                  <div className="font-display text-3xl font-bold text-brand">R$ 599</div>
                  <div className="text-xs text-dim">/mês</div>
                  <div className="mt-3 h-2 rounded-full bg-elevated overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-brand" />
                  </div>
                  <div className="mt-2 text-[10px] text-dim">75% capacidade</div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-10 -left-10 hidden md:block w-44 card-3d p-4 animate-float">
            <div className="text-xs text-dim">Check-in QR</div>
            <div className="mt-2 grid grid-cols-5 gap-0.5">
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className={i % 3 === 0 ? "w-3 h-3 bg-brand rounded-sm" : "w-3 h-3 bg-foreground rounded-sm"} />
              ))}
            </div>
          </div>
          <div className="absolute -top-6 -right-6 hidden md:block w-56 card-3d p-4 animate-float [animation-delay:1.5s]">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-8 h-8 rounded-full bg-gradient-brand flex items-center justify-center text-black font-bold">+</div>
              <div>
                <div className="font-medium">12 novos alunos</div>
                <div className="text-dim">esta semana</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
