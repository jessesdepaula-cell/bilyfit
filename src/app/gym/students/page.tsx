"use client";
import { useState } from "react";
import { PageHeader, StatCard } from "@/components/dashboard/DashShell";
import { DataTable, StatusBadge, TableToolbar } from "@/components/dashboard/Common";
import { STUDENTS } from "@/lib/mock-data";
import { formatCurrency, formatDate, initials } from "@/lib/utils";
import { Users, UserCheck, UserX, Snowflake } from "lucide-react";

export default function StudentsPage() {
  const [q, setQ] = useState("");
  const filtered = STUDENTS.filter((s) => s.name.toLowerCase().includes(q.toLowerCase()) || s.email.toLowerCase().includes(q.toLowerCase()));
  const stats = {
    total: STUDENTS.length,
    active: STUDENTS.filter((s) => s.status === "active").length,
    overdue: STUDENTS.filter((s) => s.status === "overdue").length,
    frozen: STUDENTS.filter((s) => s.status === "frozen").length,
  };

  return (
    <>
      <PageHeader title="Alunos" subtitle="Gestão completa de alunos da academia" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <StatCard label="Total" value={String(stats.total)} icon={Users} />
        <StatCard label="Ativos" value={String(stats.active)} icon={UserCheck} color="text-success" />
        <StatCard label="Inadimplentes" value={String(stats.overdue)} icon={UserX} color="text-danger" />
        <StatCard label="Trancados" value={String(stats.frozen)} icon={Snowflake} color="text-info" />
      </div>

      <TableToolbar value={q} onChange={setQ} searchPlaceholder="Buscar aluno por nome ou e-mail..." onNew={() => {}} newLabel="Novo aluno" />

      <DataTable
        rowKey={(s) => s.id}
        data={filtered}
        columns={[
          { key: "name", label: "Aluno", render: (s) => (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-brand text-black flex items-center justify-center font-bold text-xs">{initials(s.name)}</div>
              <div>
                <div className="font-medium">{s.name}</div>
                <div className="text-xs text-dim">{s.email}</div>
              </div>
            </div>
          )},
          { key: "plan", label: "Plano", render: (s) => <span className="chip uppercase text-[10px]">{s.plan}</span> },
          { key: "monthlyFee", label: "Mensalidade", render: (s) => <span className="font-semibold">{formatCurrency(s.monthlyFee)}</span> },
          { key: "trainer", label: "Professor", render: (s) => <span className="text-subtle">{s.trainer}</span> },
          { key: "lastCheckin", label: "Último check-in", render: (s) => <span className="text-subtle">{s.lastCheckin ? formatDate(s.lastCheckin) : "—"}</span> },
          { key: "paymentStatus", label: "Pagamento", render: (s) => <StatusBadge status={s.paymentStatus} /> },
          { key: "status", label: "Status", render: (s) => <StatusBadge status={s.status} /> },
        ]}
      />
    </>
  );
}
