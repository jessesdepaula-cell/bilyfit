"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { PageHeader, StatCard } from "@/components/dashboard/DashShell";
import { DataTable, StatusBadge, TableToolbar } from "@/components/dashboard/Common";
import { CheckinPanel } from "@/components/gym/CheckinPanel";
import { useGymData } from "@/lib/store";
import { formatDateTime, cn } from "@/lib/utils";
import { QrCode, ShieldOff, CheckCircle2, Activity, LogOut, Users, Clock, ScanFace, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export default function CheckinPage() {
  const { checkins, registerExit } = useGymData();
  const [q, setQ] = useState("");

  const todays = useMemo(() => {
    const now = new Date();
    return checkins
      .filter((c) => isSameDay(new Date(c.timestamp), now))
      .sort((a, b) => +new Date(b.timestamp) - +new Date(a.timestamp));
  }, [checkins]);
  const inside = todays.filter((c) => c.status === "ok" && !c.exitAt);
  const blockedToday = todays.filter((c) => c.status === "blocked").length;

  const peakHour = useMemo(() => {
    if (todays.length === 0) return "—";
    const buckets: Record<string, number> = {};
    todays.forEach((c) => {
      const h = new Date(c.timestamp).getHours();
      buckets[h] = (buckets[h] ?? 0) + 1;
    });
    const top = Object.entries(buckets).sort((a, b) => b[1] - a[1])[0];
    return top ? `${top[0].padStart(2, "0")}:00` : "—";
  }, [todays]);

  const filtered = useMemo(() => {
    const term = q.toLowerCase();
    return checkins
      .filter((c) => c.studentName.toLowerCase().includes(term))
      .sort((a, b) => +new Date(b.timestamp) - +new Date(a.timestamp));
  }, [checkins, q]);

  function handleExit(id: string, name: string) {
    registerExit(id);
    toast.success(`Saída registrada: ${name}`);
  }

  return (
    <>
      <PageHeader title="Check-in" subtitle="Controle de presença em tempo real" />

      {/* Turnstile banner */}
      <Link
        href="/gym/turnstile"
        className="card-3d p-5 mb-6 flex items-center gap-4 hover:border-brand/40 transition group relative overflow-hidden"
      >
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-brand/10 blur-3xl group-hover:bg-brand/20 transition" />
        <div className="w-14 h-14 rounded-2xl bg-gradient-brand text-black flex items-center justify-center shrink-0 relative">
          <ScanFace size={26} />
        </div>
        <div className="flex-1 relative">
          <div className="flex items-center gap-2">
            <h3 className="font-display text-lg font-bold">Catraca por reconhecimento facial</h3>
            <span className="chip text-[10px] bg-brand/15 text-brand border-brand/30">AI · NOVO</span>
          </div>
          <p className="text-sm text-subtle mt-0.5">
            Check-in automático: o aluno passa pela catraca e o sistema libera a entrada por biometria facial em segundos.
          </p>
        </div>
        <div className="text-sm text-brand font-semibold flex items-center gap-1.5 shrink-0 relative">
          Abrir catraca <ArrowUpRight size={14} />
        </div>
      </Link>

      {/* Top row: panel + totem + stats */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-6">
        <div className="xl:col-span-1">
          <CheckinPanel />
        </div>

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

        <div className="space-y-5">
          <StatCard label="Entradas hoje" value={String(todays.filter((c) => c.status === "ok").length)} icon={CheckCircle2} color="text-success" />
          <StatCard label="Bloqueados hoje" value={String(blockedToday)} icon={ShieldOff} color="text-danger" />
          <StatCard label="Pico do dia" value={peakHour} icon={Activity} />
        </div>
      </div>

      {/* Inside now */}
      <div className="card-3d p-6 mb-6">
        <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
          <div>
            <h3 className="font-display text-lg font-semibold flex items-center gap-2">
              <Users size={18} className="text-success" />
              Alunos na academia agora
            </h3>
            <p className="text-xs text-dim mt-0.5">{inside.length} pessoa(s) com check-in ativo sem saída registrada</p>
          </div>
        </div>
        {inside.length === 0 ? (
          <p className="text-center text-subtle py-8">Nenhum aluno ativo na academia neste momento.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {inside.map((c) => (
              <li key={c.id} className="glass rounded-xl p-3 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <div className="flex-1 min-w-0">
                  <Link href={`/gym/students/${c.studentId}`} className="font-medium text-sm hover:text-brand transition truncate block">
                    {c.studentName}
                  </Link>
                  <div className="text-xs text-dim flex items-center gap-1.5">
                    <Clock size={11} />
                    {new Date(c.timestamp).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                    {c.modality && <> · {c.modality}</>}
                  </div>
                </div>
                <button
                  onClick={() => handleExit(c.id, c.studentName)}
                  className="text-xs px-2.5 py-1.5 rounded-lg border border-border text-subtle hover:text-brand hover:border-brand/40 transition inline-flex items-center gap-1.5"
                >
                  <LogOut size={12} /> Saída
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <PageHeader title="Histórico de check-ins" subtitle="Todos os registros (mais recentes primeiro)" />

      <TableToolbar value={q} onChange={setQ} searchPlaceholder="Buscar por aluno..." />

      <DataTable
        rowKey={(c) => c.id}
        data={filtered}
        columns={[
          {
            key: "studentName",
            label: "Aluno",
            render: (c) => (
              <Link href={`/gym/students/${c.studentId}`} className="font-medium hover:text-brand transition">
                {c.studentName}
              </Link>
            ),
          },
          { key: "timestamp", label: "Entrada", render: (c) => <span className="text-subtle">{formatDateTime(c.timestamp)}</span> },
          {
            key: "exitAt",
            label: "Saída",
            render: (c) => <span className={cn("text-subtle", !c.exitAt && "text-dim italic")}>{c.exitAt ? formatDateTime(c.exitAt) : "—"}</span>,
          },
          { key: "method", label: "Método", render: (c) => <span className="chip uppercase text-[10px]"><QrCode size={10} />{c.method}</span> },
          { key: "modality", label: "Modalidade", render: (c) => <span className="text-subtle">{c.modality ?? "—"}</span> },
          { key: "status", label: "Status", render: (c) => <StatusBadge status={c.status} /> },
          { key: "reason", label: "Observação", render: (c) => <span className="text-subtle">{c.reason ?? "—"}</span> },
        ]}
      />
    </>
  );
}
