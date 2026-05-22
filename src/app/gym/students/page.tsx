"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { PageHeader, StatCard } from "@/components/dashboard/DashShell";
import { DataTable, StatusBadge, TableToolbar } from "@/components/dashboard/Common";
import { StudentForm } from "@/components/gym/StudentForm";
import { useGymData } from "@/lib/store";
import type { Student } from "@/lib/mock-data";
import { formatCurrency, formatDate, initials } from "@/lib/utils";
import { Users, UserCheck, UserX, Snowflake, Pencil } from "lucide-react";

type Filter = "all" | "active" | "overdue" | "frozen" | "inactive";

export default function StudentsPage() {
  const { students } = useGymData();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Student | null>(null);

  const filtered = useMemo(() => {
    const term = q.toLowerCase();
    return students.filter((s) => {
      if (filter !== "all" && s.status !== filter) return false;
      if (!term) return true;
      return (
        s.name.toLowerCase().includes(term) ||
        s.email.toLowerCase().includes(term) ||
        s.cpf.includes(term) ||
        s.phone.includes(term)
      );
    });
  }, [students, q, filter]);

  const stats = {
    total: students.length,
    active: students.filter((s) => s.status === "active").length,
    overdue: students.filter((s) => s.status === "overdue").length,
    frozen: students.filter((s) => s.status === "frozen").length,
  };

  function openNew() {
    setEditing(null);
    setFormOpen(true);
  }
  function openEdit(s: Student) {
    setEditing(s);
    setFormOpen(true);
  }

  const filterBtns: { id: Filter; label: string }[] = [
    { id: "all", label: "Todos" },
    { id: "active", label: "Ativos" },
    { id: "overdue", label: "Inadimplentes" },
    { id: "frozen", label: "Trancados" },
    { id: "inactive", label: "Inativos" },
  ];

  return (
    <>
      <PageHeader title="Alunos" subtitle="Gestão completa de alunos da academia" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <StatCard label="Total" value={String(stats.total)} icon={Users} />
        <StatCard label="Ativos" value={String(stats.active)} icon={UserCheck} color="text-success" />
        <StatCard label="Inadimplentes" value={String(stats.overdue)} icon={UserX} color="text-danger" />
        <StatCard label="Trancados" value={String(stats.frozen)} icon={Snowflake} color="text-info" />
      </div>

      <TableToolbar
        value={q}
        onChange={setQ}
        searchPlaceholder="Buscar por nome, e-mail, CPF ou telefone..."
        onNew={openNew}
        newLabel="Novo aluno"
        filters={
          <div className="flex flex-wrap gap-1.5">
            {filterBtns.map((b) => (
              <button
                key={b.id}
                onClick={() => setFilter(b.id)}
                className={
                  "px-3 py-2 rounded-lg text-xs font-semibold border transition " +
                  (filter === b.id
                    ? "border-brand bg-brand/10 text-brand"
                    : "border-border text-subtle hover:text-foreground hover:bg-elevated")
                }
              >
                {b.label}
              </button>
            ))}
          </div>
        }
      />

      <DataTable
        rowKey={(s) => s.id}
        data={filtered}
        columns={[
          {
            key: "name",
            label: "Aluno",
            render: (s) => (
              <Link href={`/gym/students/${s.id}`} className="flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-full bg-gradient-brand text-black flex items-center justify-center font-bold text-xs">
                  {initials(s.name)}
                </div>
                <div>
                  <div className="font-medium group-hover:text-brand transition">{s.name}</div>
                  <div className="text-xs text-dim">{s.email}</div>
                </div>
              </Link>
            ),
          },
          { key: "plan", label: "Plano", render: (s) => <span className="chip uppercase text-[10px]">{s.plan}</span> },
          { key: "monthlyFee", label: "Mensalidade", render: (s) => <span className="font-semibold">{formatCurrency(s.monthlyFee)}</span> },
          { key: "trainer", label: "Professor", render: (s) => <span className="text-subtle">{s.trainer}</span> },
          { key: "lastCheckin", label: "Último check-in", render: (s) => <span className="text-subtle">{s.lastCheckin ? formatDate(s.lastCheckin) : "—"}</span> },
          { key: "paymentStatus", label: "Pagamento", render: (s) => <StatusBadge status={s.paymentStatus} /> },
          { key: "status", label: "Status", render: (s) => <StatusBadge status={s.status} /> },
          {
            key: "actions",
            label: "",
            render: (s) => (
              <button
                onClick={() => openEdit(s)}
                className="p-2 rounded-lg text-dim hover:text-brand hover:bg-elevated transition"
                aria-label="Editar"
              >
                <Pencil size={14} />
              </button>
            ),
          },
        ]}
      />

      <StudentForm open={formOpen} onClose={() => setFormOpen(false)} editing={editing} />
    </>
  );
}
