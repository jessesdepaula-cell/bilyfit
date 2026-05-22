"use client";
import { useState } from "react";
import { PageHeader, StatCard } from "@/components/dashboard/DashShell";
import { TableToolbar, StatusBadge } from "@/components/dashboard/Common";
import { TEACHERS } from "@/lib/mock-data";
import { initials } from "@/lib/utils";
import { Star, Users, GraduationCap, Mail, Phone } from "lucide-react";

export default function TeachersPage() {
  const [q, setQ] = useState("");
  const filtered = TEACHERS.filter((t) => t.name.toLowerCase().includes(q.toLowerCase()));
  const totalStudents = TEACHERS.reduce((s, t) => s + t.studentsCount, 0);
  const avgRating = (TEACHERS.reduce((s, t) => s + t.rating, 0) / TEACHERS.length).toFixed(1);

  return (
    <>
      <PageHeader title="Professores" subtitle="Equipe técnica da academia" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
        <StatCard label="Professores" value={String(TEACHERS.length)} icon={GraduationCap} />
        <StatCard label="Alunos atendidos" value={String(totalStudents)} icon={Users} color="text-success" />
        <StatCard label="Avaliação média" value={`${avgRating}★`} icon={Star} color="text-warning" />
      </div>

      <TableToolbar value={q} onChange={setQ} searchPlaceholder="Buscar professor..." onNew={() => {}} newLabel="Novo professor" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((t) => (
          <div key={t.id} className="card-3d p-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-brand text-black flex items-center justify-center font-bold text-lg">{initials(t.name)}</div>
              <div className="flex-1 min-w-0">
                <div className="font-display font-bold">{t.name}</div>
                <div className="text-xs text-brand">{t.specialty}</div>
                <div className="mt-1"><StatusBadge status={t.status} /></div>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center gap-2 text-subtle"><Mail size={13} /> {t.email}</div>
              <div className="flex items-center gap-2 text-subtle"><Phone size={13} /> {t.phone}</div>
            </div>
            <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-3">
              <div><div className="text-xs text-dim">Alunos</div><div className="font-display font-bold">{t.studentsCount}</div></div>
              <div><div className="text-xs text-dim">Avaliação</div><div className="font-display font-bold text-brand">{t.rating}★</div></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
