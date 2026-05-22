"use client";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { PageHeader, StatCard } from "@/components/dashboard/DashShell";
import { StatusBadge } from "@/components/dashboard/Common";
import { useCurrentStudent, useGymData } from "@/lib/store";
import { GYMS, MODALITIES } from "@/lib/mock-data";
import { getSession } from "@/lib/auth";
import { formatDate, formatDateTime, initials } from "@/lib/utils";
import { QrCode, ScanLine, Flame, CalendarCheck, ScanFace, CheckCircle2 } from "lucide-react";

export default function PortalCheckinPage() {
  const [identity, setIdentity] = useState<string | undefined>();
  useEffect(() => {
    const s = getSession();
    setIdentity(s?.email);
  }, []);
  const me = useCurrentStudent(identity);
  const { checkins, addCheckin } = useGymData();
  const [modality, setModality] = useState<string>(MODALITIES[0]?.name ?? "");

  const myCheckins = useMemo(
    () => (me ? checkins.filter((c) => c.studentId === me.id).sort((a, b) => +new Date(b.timestamp) - +new Date(a.timestamp)) : []),
    [checkins, me]
  );

  function selfCheckin() {
    if (!me) return;
    if (me.status === "overdue") {
      toast.error("Acesso bloqueado — sua mensalidade está em atraso");
      return;
    }
    if (me.status === "frozen") {
      toast.error("Matrícula trancada — fale com a recepção");
      return;
    }
    const created = addCheckin({
      studentId: me.id,
      method: "qr",
      status: "ok",
      modality,
      gymId: me.gymId,
    });
    if (created) toast.success("Check-in realizado! Bom treino 💪");
  }

  if (!me) return <div className="card-3d p-12 text-center">Carregando...</div>;

  const gym = GYMS.find((g) => g.id === me.gymId);
  const totalThisMonth = myCheckins.filter((c) => {
    const d = new Date(c.timestamp);
    const now = new Date();
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  }).length;
  const lastCheckin = myCheckins[0];

  return (
    <>
      <PageHeader title="Meu check-in" subtitle={`${gym?.name ?? "Academia"} — escaneie no totem ou registre aqui`} />

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
        <StatCard label="Check-ins no mês" value={String(totalThisMonth)} icon={CalendarCheck} color="text-success" />
        <StatCard label="Total acumulado" value={String(me.totalCheckins)} icon={QrCode} color="text-info" />
        <StatCard
          label="Último check-in"
          value={lastCheckin ? formatDate(lastCheckin.timestamp) : "—"}
          icon={Flame}
          color="text-warning"
        />
      </div>

      {/* Facial enrollment badge */}
      <div className="card-3d p-4 mb-6 flex items-center gap-3 border-success/30 bg-success/5">
        <div className="w-11 h-11 rounded-xl bg-success/15 text-success flex items-center justify-center shrink-0">
          <ScanFace size={20} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Reconhecimento facial cadastrado</span>
            <CheckCircle2 size={14} className="text-success" />
          </div>
          <p className="text-xs text-subtle">Passe pela catraca e sua entrada é registrada automaticamente — sem cartão, sem QR.</p>
        </div>
        <button className="btn-secondary text-xs py-2">Atualizar foto</button>
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-6">
        {/* QR Code totem */}
        <div className="card-3d p-8 flex flex-col items-center">
          <div className="bg-foreground p-3 rounded-2xl w-64 h-64">
            <div className="grid grid-cols-12 gap-0.5 w-full h-full">
              {Array.from({ length: 144 }).map((_, i) => (
                <div key={i} className={(i * 17) % 5 < 2 ? "bg-background rounded-[2px]" : "bg-foreground rounded-[2px]"} />
              ))}
            </div>
          </div>
          <div className="mt-6 text-center">
            <div className="font-display font-bold text-lg">{me.name}</div>
            <div className="text-sm text-dim">{gym?.name}</div>
            <div className="mt-3">
              <StatusBadge status={me.status === "active" ? "ok" : me.status} />
            </div>
          </div>
        </div>

        {/* Self check-in */}
        <div className="card-3d p-6 flex flex-col">
          <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
            <ScanLine size={18} className="text-brand" />
            Check-in rápido
          </h3>
          <p className="text-sm text-subtle mb-4">
            Já está na academia? Selecione sua modalidade e confirme a entrada.
          </p>
          <div className="mb-4">
            <span className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-dim">Modalidade</span>
            <select className="input" value={modality} onChange={(e) => setModality(e.target.value)}>
              {MODALITIES.map((m) => <option key={m.id} value={m.name}>{m.name}</option>)}
            </select>
          </div>
          <div className="flex-1" />
          <button onClick={selfCheckin} className="btn-primary text-base py-3" disabled={me.status === "overdue" || me.status === "frozen"}>
            <QrCode size={16} /> Confirmar entrada
          </button>
          {me.status === "overdue" && (
            <p className="mt-3 text-xs text-danger text-center">Mensalidade em atraso — regularize antes do check-in</p>
          )}
        </div>
      </div>

      <div className="card-3d p-6">
        <h3 className="font-display text-lg font-semibold mb-4">Histórico de presença</h3>
        {myCheckins.length === 0 ? (
          <p className="text-center text-subtle py-12">Você ainda não tem check-ins registrados.</p>
        ) : (
          <div className="space-y-2 max-h-[480px] overflow-y-auto">
            {myCheckins.map((c) => (
              <div key={c.id} className="flex items-center justify-between p-3 glass rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-brand/15 text-brand flex items-center justify-center">
                    <QrCode size={14} />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Check-in {c.method.toUpperCase()}{c.modality ? ` · ${c.modality}` : ""}</div>
                    <div className="text-xs text-dim">{formatDateTime(c.timestamp)}</div>
                  </div>
                </div>
                <StatusBadge status={c.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
