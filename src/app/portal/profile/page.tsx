"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/dashboard/DashShell";
import { StatusBadge } from "@/components/dashboard/Common";
import { useCurrentStudent, useGymData } from "@/lib/store";
import { ASSESSMENTS, GYMS } from "@/lib/mock-data";
import { getSession } from "@/lib/auth";
import { formatDate, initials } from "@/lib/utils";

export default function PortalProfilePage() {
  const [identity, setIdentity] = useState<string | undefined>();
  useEffect(() => {
    const s = getSession();
    setIdentity(s?.email);
  }, []);
  const me = useCurrentStudent(identity);
  const { updateStudent } = useGymData();

  // Local editable copy
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", emergencyContactName: "", emergencyContactPhone: "" });

  useEffect(() => {
    if (me) {
      setForm({
        name: me.name,
        email: me.email,
        phone: me.phone,
        address: me.address ?? "",
        emergencyContactName: me.emergencyContactName ?? "",
        emergencyContactPhone: me.emergencyContactPhone ?? "",
      });
    }
  }, [me?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!me) return <div className="card-3d p-12 text-center">Carregando...</div>;

  const gym = GYMS.find((g) => g.id === me.gymId);
  const assessment = ASSESSMENTS.find((a) => a.studentId === me.id) ?? ASSESSMENTS[0];

  function save() {
    if (!me) return;
    if (!form.name.trim() || !form.email.includes("@")) {
      toast.error("Nome e e-mail são obrigatórios");
      return;
    }
    updateStudent(me.id, {
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      emergencyContactName: form.emergencyContactName || undefined,
      emergencyContactPhone: form.emergencyContactPhone || undefined,
    });
    toast.success("Dados atualizados");
  }

  return (
    <>
      <PageHeader title="Meu perfil" subtitle="Seus dados e avaliação física" />

      <div className="grid lg:grid-cols-3 gap-5 mb-6">
        <div className="card-3d p-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-2xl bg-gradient-brand text-black flex items-center justify-center font-display text-3xl font-bold">
              {initials(me.name)}
            </div>
            <h3 className="mt-4 font-display text-xl font-bold">{me.name}</h3>
            <div className="text-sm text-subtle">Aluno desde {formatDate(me.joinedAt)}</div>
            <div className="mt-3 flex items-center gap-2">
              <span className="chip">{me.plan}</span>
              <StatusBadge status={me.status} />
            </div>
            {gym && <div className="mt-4 text-xs text-dim">{gym.name} · {gym.city}/{gym.state}</div>}
          </div>
        </div>

        <div className="lg:col-span-2 card-3d p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Última avaliação física</h3>
          {assessment ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { l: "Peso", v: `${assessment.weight.toFixed(1)} kg` },
                { l: "Altura", v: `${assessment.height.toFixed(2)} m` },
                { l: "IMC", v: assessment.bmi.toFixed(1) },
                { l: "% Gordura", v: `${assessment.bodyFat.toFixed(1)}%` },
                { l: "Massa muscular", v: `${assessment.muscleMass.toFixed(1)} kg` },
                { l: "Avaliador", v: assessment.evaluator },
              ].map((s) => (
                <div key={s.l} className="glass p-4 rounded-xl">
                  <div className="text-xs text-dim">{s.l}</div>
                  <div className="mt-1 font-display text-lg font-bold">{s.v}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-subtle text-sm">Você ainda não tem avaliação física registrada.</p>
          )}
        </div>
      </div>

      <div className="card-3d p-6 max-w-2xl">
        <h3 className="font-display text-lg font-semibold mb-4">Dados pessoais</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Nome">
            <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </Field>
          <Field label="E-mail">
            <input type="email" className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </Field>
          <Field label="Telefone">
            <input className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </Field>
          <Field label="Endereço">
            <input className="input" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </Field>
          <Field label="Contato de emergência — nome">
            <input className="input" value={form.emergencyContactName} onChange={(e) => setForm({ ...form, emergencyContactName: e.target.value })} />
          </Field>
          <Field label="Contato de emergência — telefone">
            <input className="input" value={form.emergencyContactPhone} onChange={(e) => setForm({ ...form, emergencyContactPhone: e.target.value })} />
          </Field>
        </div>
        <button onClick={save} className="btn-primary mt-5">Salvar alterações</button>
      </div>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-dim">{label}</span>
      {children}
    </label>
  );
}
