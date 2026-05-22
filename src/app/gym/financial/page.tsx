"use client";
import { useState } from "react";
import { PageHeader, StatCard } from "@/components/dashboard/DashShell";
import { DataTable, StatusBadge, TableToolbar } from "@/components/dashboard/Common";
import { BarComparison } from "@/components/dashboard/Charts";
import { PAYMENTS, EXPENSES, GYM_REVENUE } from "@/lib/mock-data";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { DollarSign, TrendingUp, TrendingDown, Clock } from "lucide-react";

export default function GymFinancialPage() {
  const [tab, setTab] = useState<"receivable" | "expenses">("receivable");
  const [q, setQ] = useState("");

  const recv = PAYMENTS.reduce((s, p) => s + (p.status === "paid" ? p.amount : 0), 0);
  const pending = PAYMENTS.reduce((s, p) => s + (p.status === "pending" ? p.amount : 0), 0);
  const overdue = PAYMENTS.reduce((s, p) => s + (p.status === "overdue" ? p.amount : 0), 0);
  const exp = EXPENSES.reduce((s, e) => s + e.amount, 0);

  const filteredPay = PAYMENTS.filter((p) => p.studentName.toLowerCase().includes(q.toLowerCase()));
  const filteredExp = EXPENSES.filter((e) => e.description.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <PageHeader title="Financeiro" subtitle="Mensalidades, despesas e fluxo de caixa" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <StatCard label="Recebido" value={formatCurrency(recv)} icon={DollarSign} color="text-success" />
        <StatCard label="A receber" value={formatCurrency(pending)} icon={Clock} color="text-warning" />
        <StatCard label="Inadimplência" value={formatCurrency(overdue)} icon={TrendingDown} color="text-danger" />
        <StatCard label="Despesas mês" value={formatCurrency(exp)} icon={TrendingUp} color="text-info" />
      </div>

      <div className="card-3d p-6 mb-6">
        <h3 className="font-display text-lg font-semibold mb-4">Fluxo de caixa</h3>
        <BarComparison
          data={GYM_REVENUE}
          keys={[
            { key: "revenue", color: "#F5D90A", label: "Entradas" },
            { key: "expenses", color: "#EF4444", label: "Saídas" },
          ]}
        />
      </div>

      <div className="flex gap-2 mb-4">
        <button onClick={() => setTab("receivable")} className={cn("px-4 py-2 rounded-xl text-sm font-medium transition", tab === "receivable" ? "bg-brand text-black" : "glass text-subtle")}>Recebíveis</button>
        <button onClick={() => setTab("expenses")} className={cn("px-4 py-2 rounded-xl text-sm font-medium transition", tab === "expenses" ? "bg-brand text-black" : "glass text-subtle")}>Despesas</button>
      </div>

      <TableToolbar value={q} onChange={setQ} searchPlaceholder="Buscar..." onNew={() => {}} newLabel={tab === "receivable" ? "Nova cobrança" : "Nova despesa"} />

      {tab === "receivable" ? (
        <DataTable
          rowKey={(p) => p.id}
          data={filteredPay}
          columns={[
            { key: "studentName", label: "Aluno", render: (p) => <span className="font-medium">{p.studentName}</span> },
            { key: "description", label: "Descrição", render: (p) => <span className="text-subtle">{p.description}</span> },
            { key: "method", label: "Método", render: (p) => <span className="chip uppercase text-[10px]">{p.method}</span> },
            { key: "amount", label: "Valor", render: (p) => <span className="font-display font-semibold">{formatCurrency(p.amount)}</span> },
            { key: "dueDate", label: "Vencimento", render: (p) => <span className="text-subtle">{formatDate(p.dueDate)}</span> },
            { key: "status", label: "Status", render: (p) => <StatusBadge status={p.status} /> },
          ]}
        />
      ) : (
        <DataTable
          rowKey={(e) => e.id}
          data={filteredExp}
          columns={[
            { key: "description", label: "Despesa", render: (e) => (
              <div>
                <div className="font-medium">{e.description}</div>
                <div className="text-xs text-dim">{e.category}</div>
              </div>
            )},
            { key: "supplier", label: "Fornecedor", render: (e) => <span className="text-subtle">{e.supplier}</span> },
            { key: "amount", label: "Valor", render: (e) => <span className="font-display font-semibold">{formatCurrency(e.amount)}</span> },
            { key: "dueDate", label: "Vencimento", render: (e) => <span className="text-subtle">{formatDate(e.dueDate)}</span> },
            { key: "status", label: "Status", render: (e) => <StatusBadge status={e.status} /> },
          ]}
        />
      )}
    </>
  );
}
