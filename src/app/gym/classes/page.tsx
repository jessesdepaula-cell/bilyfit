"use client";
import { useState } from "react";
import { PageHeader } from "@/components/dashboard/DashShell";
import { DataTable, TableToolbar } from "@/components/dashboard/Common";
import { CLASSES } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function ClassesPage() {
  const [q, setQ] = useState("");
  const filtered = CLASSES.filter((c) => c.modality.toLowerCase().includes(q.toLowerCase()) || c.teacher.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <PageHeader title="Turmas" subtitle="Grade horária e ocupação por aula" />
      <TableToolbar value={q} onChange={setQ} searchPlaceholder="Buscar turma..." onNew={() => {}} newLabel="Nova turma" />
      <DataTable
        rowKey={(c) => c.id}
        data={filtered}
        columns={[
          { key: "modality", label: "Modalidade", render: (c) => <span className="font-medium">{c.modality}</span> },
          { key: "teacher", label: "Professor", render: (c) => <span className="text-subtle">{c.teacher}</span> },
          { key: "day", label: "Dia", render: (c) => <span className="chip text-[10px]">{c.day}</span> },
          { key: "time", label: "Horário", render: (c) => <span className="font-mono text-sm">{c.time}</span> },
          { key: "room", label: "Local", render: (c) => <span className="text-subtle">{c.room}</span> },
          { key: "capacity", label: "Ocupação", render: (c) => (
            <div className="flex items-center gap-3">
              <div className="flex-1 max-w-32 h-1.5 rounded-full bg-elevated overflow-hidden">
                <div className={cn("h-full rounded-full", c.enrolled / c.capacity >= 1 ? "bg-danger" : c.enrolled / c.capacity > 0.8 ? "bg-warning" : "bg-brand")} style={{ width: `${(c.enrolled / c.capacity) * 100}%` }} />
              </div>
              <span className="text-xs text-subtle font-mono">{c.enrolled}/{c.capacity}</span>
            </div>
          )},
        ]}
      />
    </>
  );
}
