"use client";
import { useState } from "react";
import { PageHeader } from "@/components/dashboard/DashShell";
import { DataTable, TableToolbar } from "@/components/dashboard/Common";
import { ASSESSMENTS } from "@/lib/mock-data";
import { formatDate, initials } from "@/lib/utils";

export default function AssessmentsPage() {
  const [q, setQ] = useState("");
  const filtered = ASSESSMENTS.filter((a) => a.studentName.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <PageHeader title="Avaliações físicas" subtitle="Avaliações dos alunos e evolução" />
      <TableToolbar value={q} onChange={setQ} searchPlaceholder="Buscar avaliação..." onNew={() => {}} newLabel="Nova avaliação" />
      <DataTable
        rowKey={(a) => a.id}
        data={filtered}
        columns={[
          { key: "studentName", label: "Aluno", render: (a) => (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-brand text-black flex items-center justify-center font-bold text-xs">{initials(a.studentName)}</div>
              <span className="font-medium">{a.studentName}</span>
            </div>
          )},
          { key: "date", label: "Data", render: (a) => <span className="text-subtle">{formatDate(a.date)}</span> },
          { key: "weight", label: "Peso", render: (a) => <span>{a.weight.toFixed(1)} kg</span> },
          { key: "height", label: "Altura", render: (a) => <span>{a.height.toFixed(2)} m</span> },
          { key: "bmi", label: "IMC", render: (a) => <span className="font-mono">{a.bmi.toFixed(1)}</span> },
          { key: "bodyFat", label: "% Gordura", render: (a) => <span className="text-warning">{a.bodyFat.toFixed(1)}%</span> },
          { key: "muscleMass", label: "Massa muscular", render: (a) => <span className="text-success">{a.muscleMass.toFixed(1)} kg</span> },
          { key: "evaluator", label: "Avaliador", render: (a) => <span className="text-subtle">{a.evaluator}</span> },
        ]}
      />
    </>
  );
}
