"use client";
import { PageHeader, StatCard } from "@/components/dashboard/DashShell";
import { AreaChartBrand, BarComparison } from "@/components/dashboard/Charts";
import { REVENUE_TREND, GYMS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { DollarSign, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";

export default function AdminFinancialPage() {
  const mrr = GYMS.reduce((s, g) => s + g.mrr, 0);
  return (
    <>
      <PageHeader title="Financeiro BilyFit" subtitle="Visão financeira da plataforma" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard label="MRR" value={formatCurrency(mrr)} trend="+18.4%" icon={DollarSign} />
        <StatCard label="ARR projetado" value={formatCurrency(mrr * 12)} trend="+22.1%" icon={PiggyBank} color="text-success" />
        <StatCard label="Receita mês" value={formatCurrency(mrr + 4200)} trend="+9.2%" icon={TrendingUp} color="text-info" />
        <StatCard label="Custos mês" value={formatCurrency(18400)} trend="+3.1%" icon={TrendingDown} color="text-warning" />
      </div>

      <div className="grid xl:grid-cols-2 gap-5">
        <div className="card-3d p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Evolução da receita</h3>
          <AreaChartBrand data={REVENUE_TREND} dataKey="mrr" />
        </div>
        <div className="card-3d p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Receita por plano</h3>
          <BarComparison
            data={[
              { month: "Starter", receita: 2587 },
              { month: "Pro", receita: 8985 },
              { month: "Enterprise", receita: 1499 * 5 },
            ]}
            keys={[{ key: "receita", color: "#F5D90A", label: "Receita" }]}
          />
        </div>
      </div>
    </>
  );
}
