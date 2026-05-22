"use client";
import { useState } from "react";
import { PageHeader } from "@/components/dashboard/DashShell";
import { DataTable, TableToolbar } from "@/components/dashboard/Common";
import { WORKOUTS } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { Dumbbell } from "lucide-react";

export default function WorkoutsPage() {
  const [q, setQ] = useState("");
  const filtered = WORKOUTS.filter((w) => w.studentName.toLowerCase().includes(q.toLowerCase()) || w.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <PageHeader title="Treinos" subtitle="Fichas e periodização de treinos" />
      <TableToolbar value={q} onChange={setQ} searchPlaceholder="Buscar ficha..." onNew={() => {}} newLabel="Nova ficha" />
      <DataTable
        rowKey={(w) => w.id}
        data={filtered}
        columns={[
          { key: "name", label: "Ficha", render: (w) => (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-brand/15 text-brand flex items-center justify-center"><Dumbbell size={16}/></div>
              <span className="font-medium">{w.name}</span>
            </div>
          )},
          { key: "studentName", label: "Aluno", render: (w) => <span className="text-subtle">{w.studentName}</span> },
          { key: "trainer", label: "Professor", render: (w) => <span className="text-subtle">{w.trainer}</span> },
          { key: "goal", label: "Objetivo", render: (w) => <span className="chip text-[10px]">{w.goal}</span> },
          { key: "weeks", label: "Duração", render: (w) => <span>{w.weeks} semanas</span> },
          { key: "exercises", label: "Exercícios", render: (w) => <span>{w.exercises}</span> },
          { key: "createdAt", label: "Criada em", render: (w) => <span className="text-subtle">{formatDate(w.createdAt)}</span> },
        ]}
      />
    </>
  );
}
