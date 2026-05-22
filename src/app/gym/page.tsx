"use client";
import { PageHeader, StatCard } from "@/components/dashboard/DashShell";
import { AreaChartBrand, BarComparison, DonutChart } from "@/components/dashboard/Charts";
import { STUDENTS, GYM_REVENUE, CHECKINS, STUDENT_DISTRIBUTION, REVENUE_TREND } from "@/lib/mock-data";
import { Users, DollarSign, QrCode, AlertTriangle, Zap, ArrowUpRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

export default function GymDashboard() {
  const active = STUDENTS.filter((s) => s.status === "active").length;
  const overdue = STUDENTS.filter((s) => s.status === "overdue").length;
  const checkinsToday = CHECKINS.length;

  return (
    <>
      <PageHeader
        title="Dashboard da Academia"
        subtitle="Iron Pump Academy — Visão geral em tempo real"
        action={<button className="btn-primary text-sm py-2.5"><Zap size={14}/> Insight IA</button>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <StatCard label="Alunos ativos" value={String(active)} trend="+12.1%" icon={Users} color="text-success" />
        <StatCard label="Receita do mês" value={formatCurrency(94200)} trend="+8.4%" icon={DollarSign} />
        <StatCard label="Check-ins hoje" value={String(checkinsToday * 11)} trend="+22%" icon={QrCode} color="text-info" />
        <StatCard label="Inadimplentes" value={String(overdue)} trend="-1.2%" icon={AlertTriangle} color="text-danger" />
      </div>

      <div className="grid xl:grid-cols-3 gap-5 mb-8">
        <div className="xl:col-span-2 card-3d p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display text-lg font-semibold">Receita vs Despesas</h3>
              <p className="text-xs text-dim">Últimos 7 meses</p>
            </div>
          </div>
          <BarComparison
            data={GYM_REVENUE}
            keys={[
              { key: "revenue", color: "#F5D90A", label: "Receita" },
              { key: "expenses", color: "#71717A", label: "Despesas" },
            ]}
          />
        </div>

        <div className="card-3d p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Modalidades</h3>
          <DonutChart data={STUDENT_DISTRIBUTION} height={220} />
        </div>
      </div>

      <div className="grid xl:grid-cols-3 gap-5">
        <div className="card-3d p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Crescimento de alunos</h3>
          <AreaChartBrand data={REVENUE_TREND} dataKey="students" height={220} />
        </div>
        <div className="xl:col-span-2 card-3d p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold">Últimos check-ins</h3>
            <Link href="/gym/checkin" className="text-xs text-brand hover:underline flex items-center gap-1">Ver tudo <ArrowUpRight size={12} /></Link>
          </div>
          <div className="space-y-2">
            {CHECKINS.slice(0, 8).map((c) => (
              <div key={c.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-elevated/50 transition">
                <span className={`w-2 h-2 rounded-full ${c.status === "ok" ? "bg-success" : "bg-danger"}`} />
                <span className="flex-1 text-sm font-medium">{c.studentName}</span>
                <span className="text-xs text-dim">{c.method.toUpperCase()}</span>
                <span className="text-xs text-subtle">{new Date(c.timestamp).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
