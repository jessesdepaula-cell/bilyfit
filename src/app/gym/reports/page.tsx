"use client";
import { PageHeader } from "@/components/dashboard/DashShell";
import { AreaChartBrand, BarComparison, LineMulti, DonutChart } from "@/components/dashboard/Charts";
import { REVENUE_TREND, GYM_REVENUE, STUDENT_DISTRIBUTION } from "@/lib/mock-data";
import { Download, FileText } from "lucide-react";

const REPORTS = [
  { title: "Frequência mensal", desc: "Check-ins agregados por dia" },
  { title: "Receita por plano", desc: "Mensalidades por plano comercial" },
  { title: "Aulas mais procuradas", desc: "Ocupação por turma" },
  { title: "Avaliações físicas", desc: "Evolução média dos alunos" },
  { title: "Inadimplência", desc: "Detalhamento dos atrasos" },
  { title: "Retenção & Churn", desc: "Saída e renovação de alunos" },
];

export default function GymReportsPage() {
  return (
    <>
      <PageHeader title="Relatórios" subtitle="Análise profunda da sua operação" />

      <div className="grid xl:grid-cols-2 gap-5 mb-6">
        <div className="card-3d p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Receita vs Despesas</h3>
          <BarComparison data={GYM_REVENUE} keys={[
            { key: "revenue", color: "#F5D90A", label: "Receita" },
            { key: "expenses", color: "#71717A", label: "Despesas" },
          ]} />
        </div>
        <div className="card-3d p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Crescimento de alunos</h3>
          <AreaChartBrand data={REVENUE_TREND} dataKey="students" />
        </div>
        <div className="card-3d p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Distribuição por modalidade</h3>
          <DonutChart data={STUDENT_DISTRIBUTION} />
        </div>
        <div className="card-3d p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Faturamento mensal</h3>
          <LineMulti data={REVENUE_TREND} lines={[{ key: "mrr", color: "#F5D90A", label: "Receita" }]} />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {REPORTS.map((r) => (
          <div key={r.title} className="card-3d p-6 group cursor-pointer">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-brand/15 text-brand flex items-center justify-center"><FileText size={18}/></div>
              <button className="p-2 rounded-lg hover:bg-elevated"><Download size={14} className="text-dim group-hover:text-brand"/></button>
            </div>
            <h4 className="mt-4 font-display text-lg font-semibold">{r.title}</h4>
            <p className="mt-1 text-sm text-subtle">{r.desc}</p>
          </div>
        ))}
      </div>
    </>
  );
}
