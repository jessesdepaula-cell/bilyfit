"use client";
import { useState } from "react";
import { PageHeader, StatCard } from "@/components/dashboard/DashShell";
import { DataTable, StatusBadge, TableToolbar } from "@/components/dashboard/Common";
import { CHECKINS, STUDENTS } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";
import { QrCode, ShieldOff, CheckCircle2, Activity } from "lucide-react";
import { toast } from "sonner";

export default function CheckinPage() {
  const [q, setQ] = useState("");
  const filtered = CHECKINS.filter((c) => c.studentName.toLowerCase().includes(q.toLowerCase()));
  const ok = CHECKINS.filter((c) => c.status === "ok").length;
  const blocked = CHECKINS.filter((c) => c.status === "blocked").length;

  return (
    <>
      <PageHeader title="Check-in" subtitle="Controle de presença em tempo real" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        <div className="card-3d p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold">Totem QR Code</h3>
            <span className="chip"><span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" /> Online</span>
          </div>
          <div className="bg-foreground p-3 rounded-2xl">
            <div className="grid grid-cols-12 gap-0.5">
              {Array.from({ length: 144 }).map((_, i) => (
                <div key={i} className={(i * 13) % 5 < 2 ? "aspect-square bg-background rounded-[2px]" : "aspect-square bg-foreground rounded-[2px]"} />
              ))}
            </div>
          </div>
          <p className="mt-3 text-xs text-center text-dim">Aponte a câmera do app BilyFit para fazer check-in</p>
        </div>

        <div className="card-3d p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Check-in manual</h3>
          <div className="space-y-3">
            <select className="input">
              <option>Selecione o aluno...</option>
              {STUDENTS.slice(0, 10).map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <select className="input">
              <option>Modalidade</option>
              <option>Musculação</option>
              <option>Funcional</option>
              <option>CrossTraining</option>
            </select>
            <button onClick={() => toast.success("Check-in manual registrado")} className="btn-primary w-full">Registrar entrada</button>
          </div>
        </div>

        <div className="space-y-5">
          <StatCard label="Check-ins hoje" value={String(ok * 11)} icon={CheckCircle2} color="text-success" />
          <StatCard label="Bloqueados" value={String(blocked * 3)} icon={ShieldOff} color="text-danger" />
          <StatCard label="Pico do dia" value="20:14" icon={Activity} />
        </div>
      </div>

      <TableToolbar value={q} onChange={setQ} searchPlaceholder="Buscar check-in..." />

      <DataTable
        rowKey={(c) => c.id}
        data={filtered}
        columns={[
          { key: "studentName", label: "Aluno", render: (c) => <span className="font-medium">{c.studentName}</span> },
          { key: "timestamp", label: "Data/Hora", render: (c) => <span className="text-subtle">{formatDateTime(c.timestamp)}</span> },
          { key: "method", label: "Método", render: (c) => <span className="chip uppercase text-[10px]"><QrCode size={10} />{c.method}</span> },
          { key: "status", label: "Status", render: (c) => <StatusBadge status={c.status} /> },
          { key: "reason", label: "Observação", render: (c) => <span className="text-subtle">{c.reason ?? "—"}</span> },
        ]}
      />
    </>
  );
}
