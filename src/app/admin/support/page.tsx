"use client";
import { useState } from "react";
import { PageHeader, StatCard } from "@/components/dashboard/DashShell";
import { DataTable, StatusBadge, TableToolbar } from "@/components/dashboard/Common";
import { TICKETS } from "@/lib/mock-data";
import { formatDate, cn } from "@/lib/utils";
import { Headphones, Clock, CheckCircle2, AlertOctagon } from "lucide-react";

const priorityColor: Record<string, string> = {
  low: "bg-muted/40 text-subtle",
  medium: "bg-info/15 text-info",
  high: "bg-warning/15 text-warning",
  urgent: "bg-danger/15 text-danger",
};

export default function SupportPage() {
  const [q, setQ] = useState("");
  const filtered = TICKETS.filter((t) => t.subject.toLowerCase().includes(q.toLowerCase()) || t.gymName.toLowerCase().includes(q.toLowerCase()));
  const open = TICKETS.filter((t) => t.status === "open").length;
  const inProg = TICKETS.filter((t) => t.status === "in_progress").length;
  const urgent = TICKETS.filter((t) => t.priority === "urgent").length;
  const closed = TICKETS.filter((t) => t.status === "closed").length;

  return (
    <>
      <PageHeader title="Suporte" subtitle="Atendimento às academias clientes" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <StatCard label="Abertos" value={String(open)} icon={Headphones} color="text-info" />
        <StatCard label="Em andamento" value={String(inProg)} icon={Clock} />
        <StatCard label="Urgentes" value={String(urgent)} icon={AlertOctagon} color="text-danger" />
        <StatCard label="Resolvidos" value={String(closed)} icon={CheckCircle2} color="text-success" />
      </div>

      <TableToolbar value={q} onChange={setQ} searchPlaceholder="Buscar ticket..." onNew={() => {}} newLabel="Novo ticket" />

      <DataTable
        rowKey={(t) => t.id}
        data={filtered}
        columns={[
          { key: "id", label: "ID", render: (t) => <span className="font-mono text-xs text-dim">#{t.id}</span> },
          { key: "subject", label: "Assunto", render: (t) => (
            <div>
              <div className="font-medium">{t.subject}</div>
              <div className="text-xs text-dim">{t.gymName}</div>
            </div>
          )},
          { key: "category", label: "Categoria", render: (t) => <span className="chip text-[10px] uppercase">{t.category}</span> },
          { key: "priority", label: "Prioridade", render: (t) => <span className={cn("inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase", priorityColor[t.priority])}>{t.priority}</span> },
          { key: "assignee", label: "Responsável", render: (t) => <span className="text-subtle">{t.assignee}</span> },
          { key: "createdAt", label: "Criado", render: (t) => <span className="text-subtle">{formatDate(t.createdAt)}</span> },
          { key: "status", label: "Status", render: (t) => <StatusBadge status={t.status} /> },
        ]}
      />
    </>
  );
}
