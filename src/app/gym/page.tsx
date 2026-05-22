"use client";
import { useMemo } from "react";
import Link from "next/link";
import { PageHeader, StatCard } from "@/components/dashboard/DashShell";
import { AreaChartBrand, BarComparison, DonutChart } from "@/components/dashboard/Charts";
import { useGymData } from "@/lib/store";
import { GYM_REVENUE, STUDENT_DISTRIBUTION, REVENUE_TREND } from "@/lib/mock-data";
import { Users, DollarSign, QrCode, AlertTriangle, Zap, ArrowUpRight, Cake, CalendarClock, Moon } from "lucide-react";
import { formatCurrency, formatDate, initials } from "@/lib/utils";

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function daysBetween(a: Date, b: Date) {
  return Math.floor((b.getTime() - a.getTime()) / (24 * 60 * 60 * 1000));
}

export default function GymDashboard() {
  const { students, checkins } = useGymData();

  const active = students.filter((s) => s.status === "active").length;
  const overdue = students.filter((s) => s.status === "overdue").length;

  const checkinsToday = useMemo(() => {
    const now = new Date();
    return checkins.filter((c) => isSameDay(new Date(c.timestamp), now));
  }, [checkins]);
  const recentCheckins = useMemo(
    () => [...checkins].sort((a, b) => +new Date(b.timestamp) - +new Date(a.timestamp)).slice(0, 8),
    [checkins]
  );

  // Birthdays this week (next 7 days)
  const birthdaysWeek = useMemo(() => {
    const now = new Date();
    const result: { id: string; name: string; date: Date; daysAhead: number; avatar?: string }[] = [];
    students.forEach((s) => {
      if (!s.birthDate) return;
      const b = new Date(s.birthDate);
      const next = new Date(now.getFullYear(), b.getMonth(), b.getDate());
      if (next < now) next.setFullYear(now.getFullYear() + 1);
      const diff = daysBetween(now, next);
      if (diff <= 7) result.push({ id: s.id, name: s.name, date: next, daysAhead: diff, avatar: s.avatar });
    });
    return result.sort((a, b) => a.daysAhead - b.daysAhead).slice(0, 6);
  }, [students]);

  // Upcoming dues (next 7 days based on dueDay)
  const upcomingDues = useMemo(() => {
    const now = new Date();
    const result: { id: string; name: string; date: Date; daysAhead: number; amount: number }[] = [];
    const currentDay = now.getDate();
    students.forEach((s) => {
      const due = s.dueDay ?? 10;
      let next = new Date(now.getFullYear(), now.getMonth(), due);
      if (due < currentDay) next = new Date(now.getFullYear(), now.getMonth() + 1, due);
      const diff = daysBetween(now, next);
      if (diff <= 7 && s.status !== "inactive") result.push({ id: s.id, name: s.name, date: next, daysAhead: diff, amount: s.monthlyFee });
    });
    return result.sort((a, b) => a.daysAhead - b.daysAhead).slice(0, 6);
  }, [students]);

  // Inactive students (no check-in for 14+ days)
  const inactive = useMemo(() => {
    const now = new Date();
    return students
      .filter((s) => s.status === "active" && s.lastCheckin)
      .map((s) => ({ student: s, days: daysBetween(new Date(s.lastCheckin as string), now) }))
      .filter((x) => x.days >= 14)
      .sort((a, b) => b.days - a.days)
      .slice(0, 6);
  }, [students]);

  return (
    <>
      <PageHeader
        title="Dashboard da Academia"
        subtitle="Iron Pump Academy — Visão geral em tempo real"
        action={<button className="btn-primary text-sm py-2.5"><Zap size={14}/> Insight IA</button>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <StatCard label="Alunos ativos" value={String(active)} trend="+12.1%" icon={Users} color="text-success" />
        <StatCard label="Receita do mês" value={formatCurrency(94200)} trend="+8.4%" icon={DollarSign} />
        <StatCard label="Check-ins hoje" value={String(checkinsToday.length)} trend="+22%" icon={QrCode} color="text-info" />
        <StatCard label="Inadimplentes" value={String(overdue)} trend="-1.2%" icon={AlertTriangle} color="text-danger" />
      </div>

      {/* NEW: Operational widgets (birthdays, dues, inactive) */}
      <div className="grid xl:grid-cols-3 gap-5 mb-8">
        <WidgetCard
          title="Aniversariantes da semana"
          icon={<Cake size={18} className="text-pink-400" />}
          empty="Ninguém faz aniversário nos próximos 7 dias"
          emptyWhen={birthdaysWeek.length === 0}
        >
          {birthdaysWeek.map((b) => (
            <Link
              key={b.id}
              href={`/gym/students/${b.id}`}
              className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-elevated/50 transition"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-brand text-black flex items-center justify-center font-bold text-xs shrink-0">
                {initials(b.name)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{b.name}</div>
                <div className="text-xs text-dim">{formatDate(b.date)}</div>
              </div>
              <span className="chip text-[10px]">
                {b.daysAhead === 0 ? "Hoje 🎂" : b.daysAhead === 1 ? "Amanhã" : `${b.daysAhead}d`}
              </span>
            </Link>
          ))}
        </WidgetCard>

        <WidgetCard
          title="Vencimentos próximos"
          icon={<CalendarClock size={18} className="text-warning" />}
          empty="Nenhuma mensalidade vence nos próximos 7 dias"
          emptyWhen={upcomingDues.length === 0}
        >
          {upcomingDues.map((d) => (
            <Link
              key={d.id}
              href={`/gym/students/${d.id}`}
              className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-elevated/50 transition"
            >
              <div className="w-9 h-9 rounded-lg bg-warning/15 text-warning flex items-center justify-center shrink-0">
                <CalendarClock size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{d.name}</div>
                <div className="text-xs text-dim">{formatDate(d.date)} · {formatCurrency(d.amount)}</div>
              </div>
              <span className="chip text-[10px]">
                {d.daysAhead === 0 ? "Hoje" : `${d.daysAhead}d`}
              </span>
            </Link>
          ))}
        </WidgetCard>

        <WidgetCard
          title="Inativos há +14 dias"
          icon={<Moon size={18} className="text-info" />}
          empty="Todos os alunos ativos estão frequentando"
          emptyWhen={inactive.length === 0}
        >
          {inactive.map(({ student: s, days }) => (
            <Link
              key={s.id}
              href={`/gym/students/${s.id}`}
              className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-elevated/50 transition"
            >
              <div className="w-9 h-9 rounded-full bg-elevated text-subtle flex items-center justify-center font-bold text-xs shrink-0">
                {initials(s.name)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{s.name}</div>
                <div className="text-xs text-dim">Último: {s.lastCheckin ? formatDate(s.lastCheckin) : "nunca"}</div>
              </div>
              <span className="chip text-[10px] bg-danger/10 text-danger border-danger/30">{days}d</span>
            </Link>
          ))}
        </WidgetCard>
      </div>

      <div className="grid xl:grid-cols-3 gap-5 mb-8">
        <div className="xl:col-span-2 card-3d p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display text-lg font-semibold">Receita vs Despesas</h3>
              <p className="text-xs text-dim">Últimos 7 meses</p>
            </div>
          </div>
          <BarComparison
            data={GYM_REVENUE}
            keys={[
              { key: "revenue", color: "#F5D90A", label: "Receita" },
              { key: "expenses", color: "#71717A", label: "Despesas" },
            ]}
          />
        </div>

        <div className="card-3d p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Modalidades</h3>
          <DonutChart data={STUDENT_DISTRIBUTION} height={220} />
        </div>
      </div>

      <div className="grid xl:grid-cols-3 gap-5">
        <div className="card-3d p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Crescimento de alunos</h3>
          <AreaChartBrand data={REVENUE_TREND} dataKey="students" height={220} />
        </div>
        <div className="xl:col-span-2 card-3d p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold">Últimos check-ins</h3>
            <Link href="/gym/checkin" className="text-xs text-brand hover:underline flex items-center gap-1">Ver tudo <ArrowUpRight size={12} /></Link>
          </div>
          <div className="space-y-2">
            {recentCheckins.map((c) => (
              <Link key={c.id} href={`/gym/students/${c.studentId}`} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-elevated/50 transition">
                <span className={`w-2 h-2 rounded-full ${c.status === "ok" ? "bg-success" : "bg-danger"}`} />
                <span className="flex-1 text-sm font-medium">{c.studentName}</span>
                <span className="text-xs text-dim">{c.method.toUpperCase()}</span>
                <span className="text-xs text-subtle">{new Date(c.timestamp).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function WidgetCard({
  title,
  icon,
  children,
  empty,
  emptyWhen,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  empty: string;
  emptyWhen: boolean;
}) {
  return (
    <div className="card-3d p-6">
      <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
        {icon}
        {title}
      </h3>
      {emptyWhen ? (
        <p className="text-sm text-subtle text-center py-6">{empty}</p>
      ) : (
        <div className="space-y-1">{children}</div>
      )}
    </div>
  );
}
