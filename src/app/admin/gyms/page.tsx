"use client";
import { useState } from "react";
import { PageHeader, StatCard } from "@/components/dashboard/DashShell";
import { DataTable, StatusBadge, TableToolbar } from "@/components/dashboard/Common";
import { GYMS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { Building2, Users, MapPin, TrendingUp, MoreHorizontal } from "lucide-react";

export default function GymsPage() {
  const [q, setQ] = useState("");
  const filtered = GYMS.filter((g) => g.name.toLowerCase().includes(q.toLowerCase()) || g.city.toLowerCase().includes(q.toLowerCase()));
  const active = GYMS.filter((g) => g.status === "active").length;
  const trial = GYMS.filter((g) => g.status === "trial").length;
  const overdue = GYMS.filter((g) => g.status === "overdue").length;

  return (
    <>
      <PageHeader title="Academias clientes" subtitle="Todas as academias assinantes da plataforma" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <StatCard label="Total" value={String(GYMS.length)} icon={Building2} />
        <StatCard label="Ativas" value={String(active)} icon={Users} color="text-success" />
        <StatCard label="Em trial" value={String(trial)} icon={TrendingUp} color="text-info" />
        <StatCard label="Inadimplentes" value={String(overdue)} icon={MapPin} color="text-danger" />
      </div>

      <TableToolbar value={q} onChange={setQ} searchPlaceholder="Buscar academia por nome ou cidade..." onNew={() => alert("Modal de cadastro de academia")} newLabel="Nova academia" />

      <DataTable
        rowKey={(g) => g.id}
        data={filtered}
        columns={[
          { key: "name", label: "Academia", render: (g) => (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-brand text-black flex items-center justify-center font-bold text-xs">{g.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}</div>
              <div>
                <div className="font-medium">{g.name}</div>
                <div className="text-xs text-dim">{g.owner} • {g.email}</div>
              </div>
            </div>
          )},
          { key: "city", label: "Localização", render: (g) => <span className="text-subtle">{g.city}/{g.state}</span> },
          { key: "students", label: "Alunos", render: (g) => <span className="font-medium">{g.students.toLocaleString("pt-BR")}</span> },
          { key: "plan", label: "Plano", render: (g) => <span className="chip uppercase text-[10px]">{g.plan}</span> },
          { key: "mrr", label: "MRR", render: (g) => <span className="font-display font-semibold">{formatCurrency(g.mrr)}</span> },
          { key: "status", label: "Status", render: (g) => <StatusBadge status={g.status} /> },
          { key: "actions", label: "", render: () => <button className="p-1.5 rounded-lg hover:bg-elevated"><MoreHorizontal size={16} className="text-dim" /></button>, className: "w-8" },
        ]}
      />
    </>
  );
}
