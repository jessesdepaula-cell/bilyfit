"use client";
import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { PageHeader, StatCard } from "@/components/dashboard/DashShell";
import { StatusBadge } from "@/components/dashboard/Common";
import { StudentForm } from "@/components/gym/StudentForm";
import { useGymData } from "@/lib/store";
import { ASSESSMENTS, PAYMENTS, WORKOUTS } from "@/lib/mock-data";
import { formatCurrency, formatDate, formatDateTime, initials, cn } from "@/lib/utils";
import {
  ArrowLeft, Pencil, Mail, Phone, CreditCard, Calendar, QrCode,
  Dumbbell, ClipboardList, DollarSign, AlertTriangle, IdCard, MapPin, Heart, ShieldAlert
} from "lucide-react";
import { toast } from "sonner";

type Tab = "overview" | "checkins" | "workouts" | "assessments" | "payments";

export default function StudentDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { getStudent, checkins, addCheckin, removeStudent } = useGymData();
  const student = getStudent(params.id);
  const [tab, setTab] = useState<Tab>("overview");
  const [editOpen, setEditOpen] = useState(false);

  const studentCheckins = useMemo(
    () => checkins.filter((c) => c.studentId === params.id).sort((a, b) => +new Date(b.timestamp) - +new Date(a.timestamp)),
    [checkins, params.id]
  );
  const studentWorkouts = useMemo(() => WORKOUTS.filter((w) => w.studentId === params.id), [params.id]);
  const studentAssessments = useMemo(() => ASSESSMENTS.filter((a) => a.studentId === params.id), [params.id]);
  const studentPayments = useMemo(() => PAYMENTS.filter((p) => p.studentId === params.id), [params.id]);

  if (!student) {
    return (
      <div className="card-3d p-16 text-center">
        <h2 className="font-display text-2xl font-bold mb-2">Aluno não encontrado</h2>
        <p className="text-subtle mb-6">O aluno solicitado não existe ou foi removido.</p>
        <Link href="/gym/students" className="btn-primary inline-flex">
          <ArrowLeft size={16} /> Voltar para alunos
        </Link>
      </div>
    );
  }

  function quickCheckin() {
    if (!student) return;
    if (student.status === "overdue") {
      if (!confirm(`${student.name} está inadimplente. Liberar mesmo assim?`)) return;
    }
    const created = addCheckin({ studentId: student.id, method: "manual", status: "ok", gymId: student.gymId });
    if (created) toast.success(`Check-in registrado para ${student.name}`);
  }

  function handleDelete() {
    if (!student) return;
    if (!confirm(`Remover ${student.name}? Esta ação não pode ser desfeita.`)) return;
    removeStudent(student.id);
    toast.success("Aluno removido");
    router.push("/gym/students");
  }

  const age = student.birthDate ? new Date().getFullYear() - new Date(student.birthDate).getFullYear() : null;
  const weeklyAvg = Math.round((studentCheckins.length / Math.max(1, weeksSince(student.joinedAt))) * 10) / 10;

  const tabs: { id: Tab; label: string; icon: any; count?: number }[] = [
    { id: "overview", label: "Visão geral", icon: IdCard },
    { id: "checkins", label: "Check-ins", icon: QrCode, count: studentCheckins.length },
    { id: "workouts", label: "Treinos", icon: Dumbbell, count: studentWorkouts.length },
    { id: "assessments", label: "Avaliações", icon: ClipboardList, count: studentAssessments.length },
    { id: "payments", label: "Pagamentos", icon: DollarSign, count: studentPayments.length },
  ];

  return (
    <>
      <Link href="/gym/students" className="inline-flex items-center gap-2 text-sm text-subtle hover:text-brand transition mb-6">
        <ArrowLeft size={14} /> Voltar para lista de alunos
      </Link>

      {/* Header card */}
      <div className="card-3d p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="w-20 h-20 rounded-2xl bg-gradient-brand text-black flex items-center justify-center font-display font-bold text-2xl shrink-0">
            {initials(student.name)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h1 className="font-display text-2xl lg:text-3xl font-bold tracking-tight">{student.name}</h1>
              <StatusBadge status={student.status} />
              <StatusBadge status={student.paymentStatus} />
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-subtle">
              <span className="inline-flex items-center gap-1.5"><Mail size={13} />{student.email}</span>
              <span className="inline-flex items-center gap-1.5"><Phone size={13} />{student.phone}</span>
              <span className="inline-flex items-center gap-1.5"><IdCard size={13} />{student.cpf}</span>
              {age && <span className="inline-flex items-center gap-1.5"><Calendar size={13} />{age} anos</span>}
              {(student.city || student.state) && (
                <span className="inline-flex items-center gap-1.5"><MapPin size={13} />{[student.city, student.state].filter(Boolean).join(" / ")}</span>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={quickCheckin} className="btn-primary text-sm py-2.5">
              <QrCode size={14} /> Check-in agora
            </button>
            <button onClick={() => setEditOpen(true)} className="btn-secondary text-sm py-2.5">
              <Pencil size={14} /> Editar
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <StatCard label="Check-ins totais" value={String(student.totalCheckins)} icon={QrCode} color="text-info" />
        <StatCard label="Média semanal" value={`${weeklyAvg || 0}x`} icon={Heart} color="text-success" />
        <StatCard label="Mensalidade" value={formatCurrency(student.monthlyFee)} icon={DollarSign} />
        <StatCard label="Plano" value={student.plan} icon={CreditCard} color="text-brand" />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 mb-6 glass rounded-xl overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition whitespace-nowrap",
              tab === t.id ? "bg-brand text-black" : "text-subtle hover:text-foreground hover:bg-elevated"
            )}
          >
            <t.icon size={14} />
            {t.label}
            {t.count !== undefined && (
              <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full", tab === t.id ? "bg-black/20" : "bg-elevated")}>{t.count}</span>
            )}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="card-3d p-6 lg:col-span-2 space-y-5">
            <h3 className="font-display text-lg font-semibold">Dados do aluno</h3>
            <DataGrid>
              <DataRow label="Nome" value={student.name} />
              <DataRow label="CPF" value={student.cpf} />
              <DataRow label="RG" value={student.rg ?? "—"} />
              <DataRow label="Nascimento" value={formatDate(student.birthDate)} />
              <DataRow label="Gênero" value={student.gender ?? "—"} />
              <DataRow label="E-mail" value={student.email} />
              <DataRow label="Telefone" value={student.phone} />
              <DataRow label="Matrícula desde" value={formatDate(student.joinedAt)} />
              <DataRow label="Endereço" value={student.address ?? "—"} full />
              <DataRow label="Cidade / UF" value={[student.city, student.state].filter(Boolean).join(" / ") || "—"} />
              <DataRow label="CEP" value={student.zip ?? "—"} />
            </DataGrid>
          </div>
          <div className="space-y-5">
            <div className="card-3d p-6">
              <h3 className="font-display text-lg font-semibold mb-4">Treino</h3>
              <DataGrid cols={1}>
                <DataRow label="Objetivo" value={student.goal} />
                <DataRow label="Modalidade" value={student.mainModality ?? "—"} />
                <DataRow label="Professor" value={student.trainer} />
              </DataGrid>
            </div>
            <div className="card-3d p-6">
              <h3 className="font-display text-lg font-semibold mb-4">Pagamento</h3>
              <DataGrid cols={1}>
                <DataRow label="Forma" value={student.paymentMethod?.toUpperCase() ?? "—"} />
                <DataRow label="Vencimento" value={student.dueDay ? `Dia ${student.dueDay}` : "—"} />
                <DataRow label="Status" value={<StatusBadge status={student.paymentStatus} />} />
              </DataGrid>
            </div>
            {(student.emergencyContactName || student.medicalNotes) && (
              <div className="card-3d p-6 border-warning/30">
                <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
                  <ShieldAlert size={16} className="text-warning" />
                  Emergência & Saúde
                </h3>
                {student.emergencyContactName && (
                  <div className="mb-3 text-sm">
                    <div className="text-dim text-xs uppercase tracking-wider mb-0.5">Contato</div>
                    <div className="font-medium">{student.emergencyContactName}</div>
                    {student.emergencyContactPhone && <div className="text-subtle">{student.emergencyContactPhone}</div>}
                  </div>
                )}
                {student.medicalNotes && (
                  <div className="text-sm">
                    <div className="text-dim text-xs uppercase tracking-wider mb-0.5">Observações médicas</div>
                    <div className="text-subtle whitespace-pre-wrap">{student.medicalNotes}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {tab === "checkins" && (
        <div className="card-3d p-6">
          {studentCheckins.length === 0 ? (
            <p className="text-center text-subtle py-12">Nenhum check-in registrado ainda.</p>
          ) : (
            <ul className="divide-y divide-border">
              {studentCheckins.map((c) => (
                <li key={c.id} className="flex items-center gap-4 py-3">
                  <span className={`w-2 h-2 rounded-full ${c.status === "ok" ? "bg-success" : "bg-danger"}`} />
                  <span className="flex-1 text-sm">{formatDateTime(c.timestamp)}</span>
                  <span className="chip uppercase text-[10px]">{c.method}</span>
                  {c.modality && <span className="text-xs text-subtle">{c.modality}</span>}
                  {c.exitAt && <span className="text-xs text-dim">→ saída {formatDateTime(c.exitAt)}</span>}
                  <StatusBadge status={c.status} />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {tab === "workouts" && (
        <div className="card-3d p-6">
          {studentWorkouts.length === 0 ? (
            <p className="text-center text-subtle py-12">Nenhuma ficha de treino cadastrada.</p>
          ) : (
            <ul className="space-y-3">
              {studentWorkouts.map((w) => (
                <li key={w.id} className="flex items-center justify-between p-4 glass rounded-xl">
                  <div>
                    <div className="font-semibold">{w.name}</div>
                    <div className="text-xs text-dim">{w.exercises} exercícios · {w.weeks} semanas · {w.trainer}</div>
                  </div>
                  <span className="chip">{w.goal}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {tab === "assessments" && (
        <div className="card-3d p-6">
          {studentAssessments.length === 0 ? (
            <p className="text-center text-subtle py-12">Nenhuma avaliação física registrada.</p>
          ) : (
            <ul className="space-y-3">
              {studentAssessments.map((a) => (
                <li key={a.id} className="p-4 glass rounded-xl grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
                  <Stat label="Data" value={formatDate(a.date)} />
                  <Stat label="Peso" value={`${a.weight.toFixed(1)} kg`} />
                  <Stat label="Altura" value={`${a.height.toFixed(2)} m`} />
                  <Stat label="% Gordura" value={`${a.bodyFat.toFixed(1)}%`} />
                  <Stat label="IMC" value={a.bmi.toFixed(1)} />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {tab === "payments" && (
        <div className="card-3d p-6">
          {studentPayments.length === 0 ? (
            <p className="text-center text-subtle py-12">Nenhum pagamento encontrado.</p>
          ) : (
            <ul className="divide-y divide-border">
              {studentPayments.map((p) => (
                <li key={p.id} className="flex items-center gap-4 py-3 text-sm">
                  <span className="flex-1">{p.description}</span>
                  <span className="font-semibold">{formatCurrency(p.amount)}</span>
                  <span className="chip uppercase text-[10px]">{p.method}</span>
                  <span className="text-subtle">{formatDate(p.dueDate)}</span>
                  <StatusBadge status={p.status} />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="mt-8 flex items-center justify-end">
        <button onClick={handleDelete} className="text-xs text-danger/80 hover:text-danger transition inline-flex items-center gap-2">
          <AlertTriangle size={12} /> Remover aluno
        </button>
      </div>

      <StudentForm open={editOpen} onClose={() => setEditOpen(false)} editing={student} />
    </>
  );
}

function weeksSince(dateStr: string) {
  const d = new Date(dateStr);
  const diff = Date.now() - d.getTime();
  return Math.max(1, diff / (7 * 24 * 60 * 60 * 1000));
}

function DataGrid({ children, cols = 2 }: { children: React.ReactNode; cols?: 1 | 2 }) {
  return (
    <div className={cn("grid gap-4", cols === 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2")}>
      {children}
    </div>
  );
}

function DataRow({ label, value, full }: { label: string; value: React.ReactNode; full?: boolean }) {
  return (
    <div className={cn(full && "sm:col-span-2")}>
      <div className="text-xs uppercase tracking-wider text-dim font-semibold mb-0.5">{label}</div>
      <div className="text-sm">{value}</div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-dim">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}
