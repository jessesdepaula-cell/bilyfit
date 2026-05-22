"use client";
import { PageHeader, StatCard } from "@/components/dashboard/DashShell";
import { DataTable, StatusBadge } from "@/components/dashboard/Common";
import { PAYMENTS } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { CreditCard, CheckCircle2, Calendar } from "lucide-react";

export default function PortalPaymentsPage() {
  const myPayments = PAYMENTS.slice(0, 8);
  return (
    <>
      <PageHeader title="Pagamentos" subtitle="Histórico de mensalidades e próximas cobranças" />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
        <StatCard label="Mensalidade" value={formatCurrency(129)} icon={CreditCard} />
        <StatCard label="Pagas em dia" value="11/12" icon={CheckCircle2} color="text-success" />
        <StatCard label="Próximo vencimento" value="05/06" icon={Calendar} color="text-info" />
      </div>

      <div className="card-3d p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-dim">Próxima fatura</div>
            <div className="font-display text-3xl font-bold mt-1">{formatCurrency(129)}</div>
            <div className="text-sm text-subtle">Mensal • Vencimento em 05/06/2026</div>
          </div>
          <button className="btn-primary">Pagar agora</button>
        </div>
      </div>

      <DataTable
        rowKey={(p) => p.id}
        data={myPayments}
        columns={[
          { key: "description", label: "Descrição", render: (p) => <span className="font-medium">{p.description}</span> },
          { key: "amount", label: "Valor", render: (p) => <span className="font-display font-semibold">{formatCurrency(p.amount)}</span> },
          { key: "method", label: "Método", render: (p) => <span className="chip uppercase text-[10px]">{p.method}</span> },
          { key: "dueDate", label: "Vencimento", render: (p) => <span className="text-subtle">{formatDate(p.dueDate)}</span> },
          { key: "status", label: "Status", render: (p) => <StatusBadge status={p.status} /> },
        ]}
      />
    </>
  );
}
