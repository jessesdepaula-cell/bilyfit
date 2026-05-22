"use client";
import { useState } from "react";
import { PageHeader, StatCard } from "@/components/dashboard/DashShell";
import { DataTable, StatusBadge, TableToolbar } from "@/components/dashboard/Common";
import { INVOICES } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { FileText, CheckCircle2, AlertCircle, DollarSign } from "lucide-react";

export default function InvoicesPage() {
  const [q, setQ] = useState("");
  const filtered = INVOICES.filter((i) => i.gymName.toLowerCase().includes(q.toLowerCase()) || i.number.includes(q));
  const total = INVOICES.reduce((s, i) => s + i.amount, 0);
  const paid = INVOICES.filter((i) => i.status === "paid").reduce((s, i) => s + i.amount, 0);
  const overdue = INVOICES.filter((i) => i.status === "overdue").length;

  return (
    <>
      <PageHeader title="Faturas" subtitle="Histórico de faturas emitidas para os clientes" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <StatCard label="Total emitido" value={formatCurrency(total)} icon={DollarSign} />
        <StatCard label="Recebido" value={formatCurrency(paid)} icon={CheckCircle2} color="text-success" />
        <StatCard label="Vencidas" value={String(overdue)} icon={AlertCircle} color="text-danger" />
        <StatCard label="Total emitidas" value={String(INVOICES.length)} icon={FileText} color="text-info" />
      </div>

      <TableToolbar value={q} onChange={setQ} searchPlaceholder="Buscar fatura ou cliente..." />

      <DataTable
        rowKey={(i) => i.id}
        data={filtered}
        columns={[
          { key: "number", label: "Número", render: (i) => <span className="font-mono text-xs">{i.number}</span> },
          { key: "gymName", label: "Cliente", render: (i) => <span className="font-medium">{i.gymName}</span> },
          { key: "amount", label: "Valor", render: (i) => <span className="font-display font-semibold">{formatCurrency(i.amount)}</span> },
          { key: "issuedAt", label: "Emitida em", render: (i) => <span className="text-subtle">{formatDate(i.issuedAt)}</span> },
          { key: "dueAt", label: "Vencimento", render: (i) => <span className="text-subtle">{formatDate(i.dueAt)}</span> },
          { key: "status", label: "Status", render: (i) => <StatusBadge status={i.status} /> },
        ]}
      />
    </>
  );
}
