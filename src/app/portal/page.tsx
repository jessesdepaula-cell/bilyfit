"use client";
import { useMemo } from "react";
import { PageHeader, StatCard } from "@/components/dashboard/DashShell";
import { AreaChartBrand } from "@/components/dashboard/Charts";
import { StatusBadge } from "@/components/dashboard/Common";
import { useCurrentStudent, useGymData } from "@/lib/store";
import { GYMS } from "@/lib/mock-data";
import { getSession } from "@/lib/auth";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Flame, Trophy, Calendar, Dumbbell, ArrowRight, Target, QrCode, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function daysUntil(target: Date) {
  const now = new Date();
  return Math.ceil((target.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));
}

export default function PortalHome() {
  const [identity, setIdentity] = useState<string | undefined>();
  useEffect(() => {
    const s = getSession();
    setIdentity(s?.email);
  }, []);
  const me = useCurrentStudent(identity);
  const { checkins } = useGymData();

  const myCheckins = useMemo(
    () => (me ? checkins.filter((c) => c.studentId === me.id).sort((a, b) => +new Date(b.timestamp) - +new Date(a.timestamp)) : []),
    [checkins, me]
  );

  const checkinsMonth = useMemo(() => {
    const now = new Date();
    return myCheckins.filter((c) => {
      const d = new Date(c.timestamp);
      return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
    }).length;
  }, [myCheckins]);

  // Streak: consecutive days going back from today/yesterday
  const streak = useMemo(() => {
    const days = new Set(myCheckins.map((c) => new Date(c.timestamp).toDateString()));
    let s = 0;
    let cursor = new Date();
    if (!days.has(cursor.toDateString())) {
      cursor.setDate(cursor.getDate() - 1);
    }
    while (days.has(cursor.toDateString())) {
      s++;
      cursor.setDate(cursor.getDate() - 1);
    }
    return s;
  }, [myCheckins]);

  // Weekly frequency over last 12 weeks
  const frequency = useMemo(() => {
    const now = new Date();
    const buckets: number[] = Array(12).fill(0);
    myCheckins.forEach((c) => {
      const diffDays = Math.floor((now.getTime() - new Date(c.timestamp).getTime()) / (24 * 60 * 60 * 1000));
      const week = Math.floor(diffDays / 7);
      if (week >= 0 && week < 12) buckets[11 - week]++;
    });
    return buckets.map((checkins, i) => ({ week: `S${i + 1}`, checkins }));
  }, [myCheckins]);

  if (!me) {
    return (
      <div className="card-3d p-12 text-center">
        <h2 className="font-display text-2xl font-bold">Carregando perfil...</h2>
      </div>
    );
  }

  const gym = GYMS.find((g) => g.id === me.gymId);

  // Next due date
  const nowDate = new Date();
  const dueDay = me.dueDay ?? 10;
  const currentDay = nowDate.getDate();
  let nextDue = new Date(nowDate.getFullYear(), nowDate.getMonth(), dueDay);
  if (dueDay < currentDay) nextDue = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, dueDay);
  const daysToDue = daysUntil(nextDue);

  const firstName = me.name.split(" ")[0];

  return (
    <>
      <PageHeader title={`Olá, ${firstName} 👋`} subtitle={`Bem-vindo(a) de volta ao ${gym?.name ?? "BilyFit"}`} />

      {me.status === "overdue" && (
        <div className="card-3d border-danger/40 bg-danger/5 p-4 mb-6 flex items-start gap-3">
          <AlertCircle size={20} className="text-danger shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-semibold text-danger">Mensalidade em atraso</div>
            <div className="text-sm text-subtle">Regularize seu pagamento para evitar bloqueio na catraca.</div>
          </div>
          <a href="/portal/payments" className="btn-primary text-sm py-2">Pagar agora</a>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard label="Sequência" value={`${streak} dia${streak !== 1 ? "s" : ""}`} trend="🔥" icon={Flame} color="text-warning" />
        <StatCard label="Check-ins no mês" value={String(checkinsMonth)} icon={Calendar} color="text-success" />
        <StatCard label="Total de visitas" value={String(me.totalCheckins)} icon={QrCode} color="text-info" />
        <StatCard label="Próximo vencimento" value={`${daysToDue}d`} trend={formatDate(nextDue)} icon={Target} color="text-brand" />
      </div>

      <div className="grid xl:grid-cols-3 gap-5 mb-8">
        <div className="xl:col-span-2 card-3d p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Sua frequência (últimas 12 semanas)</h3>
          <AreaChartBrand data={frequency} dataKey="checkins" xKey="week" />
        </div>
        <div className="card-3d p-6 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-brand/20 blur-2xl" />
          <div className="relative">
            <Trophy size={32} className="text-brand" />
            <h3 className="mt-4 font-display text-xl font-bold">Sua jornada</h3>
            <div className="mt-4 space-y-3">
              <Row k="Plano" v={<span className="chip text-[10px]">{me.plan}</span>} />
              <Row k="Objetivo" v={me.goal} />
              <Row k="Modalidade" v={me.mainModality ?? "—"} />
              <Row k="Professor" v={me.trainer} />
              <Row k="Mensalidade" v={formatCurrency(me.monthlyFee)} />
              <Row k="Status" v={<StatusBadge status={me.status} />} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="card-3d p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold">Últimos check-ins</h3>
            <a href="/portal/checkin" className="text-xs text-brand flex items-center gap-1 hover:underline">Ver todos <ArrowRight size={12} /></a>
          </div>
          {myCheckins.length === 0 ? (
            <p className="text-sm text-subtle py-6 text-center">Faça seu primeiro check-in pelo totem da academia.</p>
          ) : (
            <ul className="divide-y divide-border">
              {myCheckins.slice(0, 6).map((c) => (
                <li key={c.id} className="flex items-center gap-3 py-2.5 text-sm">
                  <span className={`w-2 h-2 rounded-full ${c.status === "ok" ? "bg-success" : "bg-danger"}`} />
                  <span className="flex-1">{formatDate(c.timestamp)} · {new Date(c.timestamp).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</span>
                  <span className="chip uppercase text-[10px]">{c.method}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card-3d p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Próximas aulas</h3>
          <div className="space-y-3">
            {[
              { d: "Hoje", t: "19:30", c: "CrossTraining", r: "Box CT" },
              { d: "Amanhã", t: "07:00", c: "Funcional", r: "Box 1" },
              { d: "Quarta", t: "18:30", c: "Boxe", r: "Ring" },
            ].map((a, i) => (
              <div key={i} className="flex items-center justify-between p-3 glass rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-brand text-black flex flex-col items-center justify-center">
                    <span className="text-[10px] font-semibold">{a.d.toUpperCase()}</span>
                    <span className="text-xs font-bold">{a.t}</span>
                  </div>
                  <div>
                    <div className="font-medium">{a.c}</div>
                    <div className="text-xs text-dim">{a.r}</div>
                  </div>
                </div>
                <button className="btn-secondary text-xs py-1.5 px-3">Confirmar</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-dim">{k}</span>
      <span className="font-medium">{v}</span>
    </div>
  );
}
