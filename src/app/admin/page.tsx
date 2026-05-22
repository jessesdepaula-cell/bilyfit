"use client";
import { PageHeader, StatCard } from "@/components/dashboard/DashShell";
import { AreaChartBrand, BarComparison, DonutChart } from "@/components/dashboard/Charts";
import { StatusBadge } from "@/components/dashboard/Common";
import { GYMS, REVENUE_TREND, INVOICES, TICKETS, STUDENT_DISTRIBUTION } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { Building2, DollarSign, Users, TrendingUp, ArrowUpRight, Activity, Headphones, Zap } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const totalMrr = GYMS.reduce((s, g) => s + g.mrr, 0);
  const totalStudents = GYMS.reduce((s, g) => s + g.students, 0);
  const activeGyms = GYMS.filter((g) => g.status === "active").length;
  const openTickets = TICKETS.filter((t) => t.status !== "closed").length;
  const recentInvoices = INVOICES.slice(0, 6);
  const topGyms = [...GYMS].sort((a, b) => b.mrr - a.mrr).slice(0, 5);

  return (
    <>
      <PageHeader
        title="Dashboard BilyFit"
        subtitle="Visão geral consolidada da plataforma"
        action={<button className="btn-primary text-sm py-2.5"><Zap size={14}/> Análise rápida</button>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <StatCard label="MRR consolidado" value={formatCurrency(totalMrr)} trend="+18.4%" icon={DollarSign} />
        <StatCard label="Academias ativas" value={String(activeGyms)} trend="+2" icon={Building2} color="text-info" />
        <StatCard label="Alunos na plataforma" value={totalStudents.toLocaleString("pt-BR")} trend="+12.1%" icon={Users} color="text-success" />
        <StatCard label="Crescimento MoM" value="11.2%" trend="+1.4%" icon={TrendingUp} color="text-warning" />
      </div>

      <div className="grid xl:grid-cols-3 gap-5 mb-8">
        <div className="xl:col-span-2 card-3d p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display text-lg font-semibold">Evolução do MRR</h3>
              <p className="text-xs text-dim">Últimos 7 meses</p>
            </div>
            <div className="flex gap-2 text-xs">
              <button className="chip"><span className="w-1.5 h-1.5 rounded-full bg-brand" /> MRR</button>
            </div>
          </div>
          <AreaChartBrand data={REVENUE_TREND} dataKey="mrr" />
        </div>

        <div className="card-3d p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Distribuição de alunos</h3>
          <DonutChart data={STUDENT_DISTRIBUTION} height={220} />
          <div className="mt-4 space-y-2">
            {STUDENT_DISTRIBUTION.slice(0, 4).map((s) => (
              <div key={s.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                  <span className="text-subtle">{s.name}</span>
                </div>
                <span className="font-medium">{s.value.toLocaleString("pt-BR")}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 card-3d p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold">Top academias por MRR</h3>
            <Link href="/admin/gyms" className="text-xs text-brand hover:underline flex items-center gap-1">Ver todas <ArrowUpRight size={12} /></Link>
          </div>
          <div className="space-y-3">
            {topGyms.map((g, i) => (
              <div key={g.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-elevated/50 transition">
                <span className="w-8 h-8 rounded-lg bg-elevated flex items-center justify-center text-xs font-bold text-brand">#{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{g.name}</div>
                  <div className="text-xs text-dim">{g.city}/{g.state} • {g.students} alunos</div>
                </div>
                <div className="text-right">
                  <div className="font-display font-bold">{formatCurrency(g.mrr)}</div>
                  <StatusBadge status={g.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-3d p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold">Atividade recente</h3>
            <Activity size={16} className="text-dim" />
          </div>
          <div className="space-y-3">
            {recentInvoices.map((inv) => (
              <div key={inv.id} className="flex items-start gap-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-brand/15 text-brand flex items-center justify-center"><DollarSign size={14} /></div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{inv.gymName}</div>
                  <div className="text-xs text-dim">Fatura {inv.number} • {formatCurrency(inv.amount)}</div>
                </div>
                <StatusBadge status={inv.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
