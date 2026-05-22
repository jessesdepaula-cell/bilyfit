"use client";
import { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { PageHeader, StatCard } from "@/components/dashboard/DashShell";
import { StatusBadge } from "@/components/dashboard/Common";
import { useGymData } from "@/lib/store";
import { GYMS } from "@/lib/mock-data";
import { formatCurrency, formatDate, formatDateTime, initials } from "@/lib/utils";
import { ArrowLeft, Mail, Phone, QrCode, DollarSign, Heart, CreditCard, Building2, IdCard, MapPin } from "lucide-react";

export default function AdminStudentDetail() {
  const params = useParams<{ id: string }>();
  const { getStudent, checkins } = useGymData();
  const student = getStudent(params.id);

  const studentCheckins = useMemo(
    () => checkins.filter((c) => c.studentId === params.id).sort((a, b) => +new Date(b.timestamp) - +new Date(a.timestamp)).slice(0, 20),
    [checkins, params.id]
  );

  if (!student) {
    return (
      <div className="card-3d p-16 text-center">
        <h2 className="font-display text-2xl font-bold mb-2">Aluno não encontrado</h2>
        <Link href="/admin/students" className="btn-primary inline-flex mt-4">
          <ArrowLeft size={16} /> Voltar
        </Link>
      </div>
    );
  }

  const gym = GYMS.find((g) => g.id === student.gymId);
  const age = student.birthDate ? new Date().getFullYear() - new Date(student.birthDate).getFullYear() : null;

  return (
    <>
      <Link href="/admin/students" className="inline-flex items-center gap-2 text-sm text-subtle hover:text-brand transition mb-6">
        <ArrowLeft size={14} /> Voltar para lista
      </Link>

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
              {age && <span className="inline-flex items-center gap-1.5">{age} anos</span>}
              {gym && (
                <span className="inline-flex items-center gap-1.5 text-brand">
                  <Building2 size={13} /> {gym.name}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <StatCard label="Check-ins totais" value={String(student.totalCheckins)} icon={QrCode} color="text-info" />
        <StatCard label="Mensalidade" value={formatCurrency(student.monthlyFee)} icon={DollarSign} />
        <StatCard label="Plano" value={student.plan} icon={CreditCard} color="text-brand" />
        <StatCard label="Objetivo" value={student.goal} icon={Heart} color="text-success" />
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="card-3d p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Cadastro</h3>
          <dl className="space-y-3 text-sm">
            <Row k="Nome" v={student.name} />
            <Row k="CPF" v={student.cpf} />
            <Row k="Nascimento" v={formatDate(student.birthDate)} />
            <Row k="Telefone" v={student.phone} />
            <Row k="E-mail" v={student.email} />
            <Row k="Matrícula desde" v={formatDate(student.joinedAt)} />
            <Row k="Endereço" v={student.address ?? "—"} />
            <Row k="Cidade / UF" v={[student.city, student.state].filter(Boolean).join(" / ") || "—"} />
          </dl>
        </div>
        <div className="card-3d p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Últimos check-ins</h3>
          {studentCheckins.length === 0 ? (
            <p className="text-subtle text-sm py-4">Nenhum check-in registrado.</p>
          ) : (
            <ul className="divide-y divide-border max-h-[420px] overflow-y-auto">
              {studentCheckins.map((c) => (
                <li key={c.id} className="py-2.5 flex items-center gap-3 text-sm">
                  <span className={`w-2 h-2 rounded-full ${c.status === "ok" ? "bg-success" : "bg-danger"}`} />
                  <span className="flex-1">{formatDateTime(c.timestamp)}</span>
                  <span className="chip uppercase text-[10px]">{c.method}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <dt className="text-dim text-xs uppercase tracking-wider w-32 shrink-0 mt-0.5">{k}</dt>
      <dd className="flex-1">{v}</dd>
    </div>
  );
}
