"use client";
import { useState } from "react";
import { PageHeader, StatCard } from "@/components/dashboard/DashShell";
import { DataTable, StatusBadge, TableToolbar } from "@/components/dashboard/Common";
import { GYMS } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { CreditCard, RefreshCw, XCircle, CheckCircle2 } from "lucide-react";

export default function SubscriptionsPage() {
  const [q, setQ] = useState("");
  const filtered = GYMS.filter((g) => g.name.toLowerCase().includes(q.toLowerCase()));
  const active = GYMS.filter((g) => g.status === "active").length;
  const churn = GYMS.filter((g) => g.status === "canceled").length;
  const renew = GYMS.filter((g) => g.status === "active").length;

  return (
    <>
      <PageHeader title="Assinaturas" subtitle="Gestão de assinaturas das academias clientes" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <StatCard label="Ativas" value={String(active)} icon={CheckCircle2} color="text-success" />
        <StatCard label="Renovações 30d" value={String(renew)} icon={RefreshCw} color="text-info" />
        <StatCard label="Churn 30d" value={String(churn)} icon={XCircle} color="text-danger" />
        <StatCard label="MRR" value={formatCurrency(GYMS.reduce((s, g) => s + g.mrr, 0))} icon={CreditCard} />
      </div>

      <TableToolbar value={q} onChange={setQ} searchPlaceholder="Buscar assinante..." />

      <DataTable
        rowKey={(g) => g.id}
        data={filtered}
        columns={[
          { key: "name", label: "Cliente", render: (g) => <div className="font-medium">{g.name}</div> },
          { key: "plan", label: "Plano", render: (g) => <span className="chip uppercase">{g.plan}</span> },
          { key: "mrr", label: "Valor mensal", render: (g) => <span className="font-display font-semibold">{formatCurrency(g.mrr)}</span> },
          { key: "joinedAt", label: "Início", render: (g) => <span className="text-subtle">{formatDate(g.joinedAt)}</span> },
          { key: "renewal", label: "Próx. renovação", render: () => <span className="text-subtle">05/06/2026</span> },
          { key: "method", label: "Forma de pagamento", render: () => <span className="text-subtle">Cartão •••• 4287</span> },
          { key: "status", label: "Status", render: (g) => <StatusBadge status={g.status} /> },
        ]}
      />
    </>
  );
}
