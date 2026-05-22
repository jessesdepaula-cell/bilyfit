"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { PageHeader, StatCard } from "@/components/dashboard/DashShell";
import { DataTable, StatusBadge, TableToolbar } from "@/components/dashboard/Common";
import { useGymData } from "@/lib/store";
import { GYMS } from "@/lib/mock-data";
import { formatCurrency, formatDate, initials, cn } from "@/lib/utils";
import { Users, UserCheck, UserX, DollarSign, Building2 } from "lucide-react";

type Filter = "all" | "active" | "overdue" | "frozen" | "inactive";

export default function AdminStudentsPage() {
  const { students } = useGymData();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [gymId, setGymId] = useState<string>("all");

  const filtered = useMemo(() => {
    const term = q.toLowerCase();
    return students.filter((s) => {
      if (gymId !== "all" && s.gymId !== gymId) return false;
      if (filter !== "all" && s.status !== filter) return false;
      if (!term) return true;
      return (
        s.name.toLowerCase().includes(term) ||
        s.email.toLowerCase().includes(term) ||
        s.cpf.includes(term) ||
        s.phone.includes(term)
      );
    });
  }, [students, q, filter, gymId]);

  const scope = gymId === "all" ? students : students.filter((s) => s.gymId === gymId);

  const stats = {
    total: scope.length,
    active: scope.filter((s) => s.status === "active").length,
    overdue: scope.filter((s) => s.status === "overdue").length,
    mrr: scope.filter((s) => s.status === "active").reduce((sum, s) => sum + s.monthlyFee, 0),
  };

  // Per-gym aggregation
  const byGym = useMemo(() => {
    const map: Record<string, number> = {};
    students.forEach((s) => {
      map[s.gymId] = (map[s.gymId] ?? 0) + 1;
    });
    return GYMS.map((g) => ({ gym: g, count: map[g.id] ?? 0 })).sort((a, b) => b.count - a.count);
  }, [students]);

  const gymName = (id: string) => GYMS.find((g) => g.id === id)?.name ?? id;

  const filterBtns: { id: Filter; label: string }[] = [
    { id: "all", label: "Todos" },
    { id: "active", label: "Ativos" },
    { id: "overdue", label: "Inadimplentes" },
    { id: "frozen", label: "Trancados" },
    { id: "inactive", label: "Inativos" },
  ];

  return (
    <>
      <PageHeader
        title="Alunos da plataforma"
        subtitle="Visão consolidada de todos os alunos das academias clientes"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <StatCard label="Total de alunos" value={String(stats.total)} icon={Users} />
        <StatCard label="Ativos" value={String(stats.active)} icon={UserCheck} color="text-success" />
        <StatCard label="Inadimplentes" value={String(stats.overdue)} icon={UserX} color="text-danger" />
        <StatCard label="MRR alunos ativos" value={formatCurrency(stats.mrr)} icon={DollarSign} />
      </div>

      {/* Per-gym roster aggregation */}
      <div className="card-3d p-6 mb-6">
        <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
          <Building2 size={18} className="text-brand" />
          Distribuição por academia
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {byGym.map(({ gym, count }) => (
            <button
              key={gym.id}
              onClick={() => setGymId(gymId === gym.id ? "all" : gym.id)}
              className={cn(
                "text-left p-3 rounded-xl border transition",
                gymId === gym.id
                  ? "border-brand bg-brand/10"
                  : "border-border hover:border-brand/40 hover:bg-elevated"
              )}
            >
              <div className="text-xs text-dim uppercase tracking-wider mb-1 truncate">{gym.city}/{gym.state}</div>
              <div className="font-semibold text-sm truncate">{gym.name}</div>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-2xl font-display font-bold">{count}</span>
                <span className="text-xs text-subtle">alunos</span>
              </div>
            </button>
          ))}
        </div>
        {gymId !== "all" && (
          <div className="mt-4 text-xs text-subtle flex items-center gap-2">
            Filtrando por <strong className="text-brand">{gymName(gymId)}</strong>
            <button onClick={() => setGymId("all")} className="text-dim hover:text-foreground underline">limpar</button>
          </div>
        )}
      </div>

      <TableToolbar
        value={q}
        onChange={setQ}
        searchPlaceholder="Buscar aluno em qualquer academia..."
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
              <Link href={`/admin/students/${s.id}`} className="flex items-center gap-3 group">
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
          { key: "gym", label: "Academia", render: (s) => <span className="chip text-[10px]">{gymName(s.gymId)}</span> },
          { key: "plan", label: "Plano", render: (s) => <span className="chip uppercase text-[10px]">{s.plan}</span> },
          { key: "monthlyFee", label: "Mensalidade", render: (s) => <span className="font-semibold">{formatCurrency(s.monthlyFee)}</span> },
          { key: "lastCheckin", label: "Último check-in", render: (s) => <span className="text-subtle">{s.lastCheckin ? formatDate(s.lastCheckin) : "—"}</span> },
          { key: "paymentStatus", label: "Pagamento", render: (s) => <StatusBadge status={s.paymentStatus} /> },
          { key: "status", label: "Status", render: (s) => <StatusBadge status={s.status} /> },
        ]}
      />
    </>
  );
}
