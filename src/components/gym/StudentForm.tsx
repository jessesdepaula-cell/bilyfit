"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Modal } from "@/components/dashboard/Modal";
import { useGymData } from "@/lib/store";
import type { Student } from "@/lib/mock-data";
import { MODALITIES, TEACHERS } from "@/lib/mock-data";
import { User, CreditCard, Dumbbell } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "personal" | "plan" | "training";

const PLANS = ["Mensal", "Trimestral", "Semestral", "Anual", "Black"];
const GOALS = ["Hipertrofia", "Emagrecimento", "Condicionamento", "Saúde", "Performance"];

interface FormState {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  rg: string;
  birthDate: string;
  gender: "M" | "F" | "Outro" | "";
  address: string;
  city: string;
  state: string;
  zip: string;
  plan: string;
  monthlyFee: string;
  dueDay: string;
  paymentMethod: "pix" | "card" | "boleto" | "cash";
  status: Student["status"];
  goal: string;
  trainer: string;
  mainModality: string;
  medicalNotes: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
}

const EMPTY: FormState = {
  name: "", email: "", phone: "", cpf: "", rg: "", birthDate: "", gender: "",
  address: "", city: "", state: "", zip: "",
  plan: "Mensal", monthlyFee: "129", dueDay: "10", paymentMethod: "pix", status: "active",
  goal: "Hipertrofia", trainer: TEACHERS[0]?.name ?? "", mainModality: MODALITIES[0]?.name ?? "",
  medicalNotes: "", emergencyContactName: "", emergencyContactPhone: "",
};

function fromStudent(s: Student): FormState {
  return {
    name: s.name, email: s.email, phone: s.phone, cpf: s.cpf, rg: s.rg ?? "",
    birthDate: s.birthDate, gender: s.gender ?? "",
    address: s.address ?? "", city: s.city ?? "", state: s.state ?? "", zip: s.zip ?? "",
    plan: s.plan, monthlyFee: String(s.monthlyFee), dueDay: String(s.dueDay ?? 10),
    paymentMethod: s.paymentMethod ?? "pix", status: s.status,
    goal: s.goal, trainer: s.trainer, mainModality: s.mainModality ?? MODALITIES[0]?.name ?? "",
    medicalNotes: s.medicalNotes ?? "",
    emergencyContactName: s.emergencyContactName ?? "",
    emergencyContactPhone: s.emergencyContactPhone ?? "",
  };
}

function maskCPF(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  return d.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}
function maskPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 10) return d.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").trim();
  return d.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").trim();
}

export function StudentForm({
  open,
  onClose,
  editing,
  gymId = "g-1",
  onSaved,
}: {
  open: boolean;
  onClose: () => void;
  editing?: Student | null;
  gymId?: string;
  onSaved?: (s: Student) => void;
}) {
  const { addStudent, updateStudent } = useGymData();
  const [tab, setTab] = useState<Tab>("personal");
  const [form, setForm] = useState<FormState>(editing ? fromStudent(editing) : EMPTY);

  // Reset on open
  function set<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function validate(): string | null {
    if (!form.name.trim()) return "Nome é obrigatório";
    if (!form.email.includes("@")) return "E-mail inválido";
    if (form.phone.replace(/\D/g, "").length < 10) return "Telefone incompleto";
    if (form.cpf.replace(/\D/g, "").length !== 11) return "CPF deve ter 11 dígitos";
    if (!form.birthDate) return "Data de nascimento é obrigatória";
    const fee = Number(form.monthlyFee);
    if (!Number.isFinite(fee) || fee <= 0) return "Mensalidade inválida";
    return null;
  }

  function handleSubmit() {
    const err = validate();
    if (err) {
      toast.error(err);
      return;
    }
    const payload = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone,
      cpf: form.cpf,
      rg: form.rg || undefined,
      birthDate: form.birthDate,
      gender: form.gender || undefined,
      address: form.address || undefined,
      city: form.city || undefined,
      state: form.state || undefined,
      zip: form.zip || undefined,
      plan: form.plan,
      monthlyFee: Number(form.monthlyFee),
      dueDay: Number(form.dueDay) || 10,
      paymentMethod: form.paymentMethod,
      paymentStatus: form.status === "overdue" ? ("overdue" as const) : ("paid" as const),
      status: form.status,
      goal: form.goal,
      trainer: form.trainer,
      mainModality: form.mainModality,
      medicalNotes: form.medicalNotes || undefined,
      emergencyContactName: form.emergencyContactName || undefined,
      emergencyContactPhone: form.emergencyContactPhone || undefined,
      gymId,
    };

    if (editing) {
      updateStudent(editing.id, payload);
      toast.success("Aluno atualizado");
      onSaved?.({ ...editing, ...payload } as Student);
    } else {
      const created = addStudent(payload as any);
      toast.success(`${created.name} cadastrado(a) com sucesso`);
      onSaved?.(created);
      setForm(EMPTY);
      setTab("personal");
    }
    onClose();
  }

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: "personal", label: "Pessoal", icon: User },
    { id: "plan", label: "Plano & pagamento", icon: CreditCard },
    { id: "training", label: "Treino", icon: Dumbbell },
  ];

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={editing ? "Editar aluno" : "Cadastrar novo aluno"}
      subtitle={editing ? editing.name : "Preencha os dados do novo aluno"}
      size="lg"
      footer={
        <>
          <button onClick={onClose} className="btn-secondary text-sm py-2.5">Cancelar</button>
          <button onClick={handleSubmit} className="btn-primary text-sm py-2.5">
            {editing ? "Salvar alterações" : "Cadastrar aluno"}
          </button>
        </>
      }
    >
      {/* Tabs */}
      <div className="flex gap-1 p-1 mb-6 glass rounded-xl">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition",
              tab === t.id ? "bg-brand text-black" : "text-subtle hover:text-foreground hover:bg-elevated"
            )}
          >
            <t.icon size={14} />
            {t.label}
          </button>
        ))}
      </div>

      {tab === "personal" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Nome completo *" className="md:col-span-2">
            <input className="input" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Ex: João da Silva" />
          </Field>
          <Field label="E-mail *">
            <input type="email" className="input" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="joao@email.com" />
          </Field>
          <Field label="Telefone *">
            <input className="input" value={form.phone} onChange={(e) => set("phone", maskPhone(e.target.value))} placeholder="(11) 99999-9999" />
          </Field>
          <Field label="CPF *">
            <input className="input" value={form.cpf} onChange={(e) => set("cpf", maskCPF(e.target.value))} placeholder="000.000.000-00" />
          </Field>
          <Field label="RG">
            <input className="input" value={form.rg} onChange={(e) => set("rg", e.target.value)} placeholder="00.000.000-0" />
          </Field>
          <Field label="Data de nascimento *">
            <input type="date" className="input" value={form.birthDate} onChange={(e) => set("birthDate", e.target.value)} />
          </Field>
          <Field label="Gênero">
            <select className="input" value={form.gender} onChange={(e) => set("gender", e.target.value as any)}>
              <option value="">Não informar</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
              <option value="Outro">Outro</option>
            </select>
          </Field>
          <Field label="Endereço" className="md:col-span-2">
            <input className="input" value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Rua, número, complemento" />
          </Field>
          <Field label="Cidade">
            <input className="input" value={form.city} onChange={(e) => set("city", e.target.value)} />
          </Field>
          <Field label="UF">
            <input className="input uppercase" maxLength={2} value={form.state} onChange={(e) => set("state", e.target.value.toUpperCase())} />
          </Field>
          <Field label="CEP" className="md:col-span-2">
            <input className="input" value={form.zip} onChange={(e) => set("zip", e.target.value)} placeholder="00000-000" />
          </Field>
        </div>
      )}

      {tab === "plan" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Plano *">
            <select className="input" value={form.plan} onChange={(e) => set("plan", e.target.value)}>
              {PLANS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </Field>
          <Field label="Mensalidade (R$) *">
            <input type="number" min={0} className="input" value={form.monthlyFee} onChange={(e) => set("monthlyFee", e.target.value)} />
          </Field>
          <Field label="Dia do vencimento">
            <input type="number" min={1} max={31} className="input" value={form.dueDay} onChange={(e) => set("dueDay", e.target.value)} />
          </Field>
          <Field label="Forma de pagamento">
            <select className="input" value={form.paymentMethod} onChange={(e) => set("paymentMethod", e.target.value as any)}>
              <option value="pix">PIX</option>
              <option value="card">Cartão</option>
              <option value="boleto">Boleto</option>
              <option value="cash">Dinheiro</option>
            </select>
          </Field>
          <Field label="Status da matrícula" className="md:col-span-2">
            <div className="flex flex-wrap gap-2">
              {(["active", "frozen", "overdue", "inactive"] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => set("status", st)}
                  className={cn(
                    "px-3 py-2 rounded-lg border text-sm font-medium transition",
                    form.status === st
                      ? "border-brand bg-brand/10 text-brand"
                      : "border-border text-subtle hover:text-foreground hover:bg-elevated"
                  )}
                >
                  {{ active: "Ativo", frozen: "Trancado", overdue: "Inadimplente", inactive: "Inativo" }[st]}
                </button>
              ))}
            </div>
          </Field>
        </div>
      )}

      {tab === "training" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Objetivo">
            <select className="input" value={form.goal} onChange={(e) => set("goal", e.target.value)}>
              {GOALS.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </Field>
          <Field label="Modalidade principal">
            <select className="input" value={form.mainModality} onChange={(e) => set("mainModality", e.target.value)}>
              {MODALITIES.map((m) => <option key={m.id} value={m.name}>{m.name}</option>)}
            </select>
          </Field>
          <Field label="Professor responsável" className="md:col-span-2">
            <select className="input" value={form.trainer} onChange={(e) => set("trainer", e.target.value)}>
              {TEACHERS.map((t) => <option key={t.id} value={t.name}>{t.name} — {t.specialty}</option>)}
            </select>
          </Field>
          <Field label="Observações médicas / restrições" className="md:col-span-2">
            <textarea
              className="input min-h-[100px]"
              value={form.medicalNotes}
              onChange={(e) => set("medicalNotes", e.target.value)}
              placeholder="Ex: hipertensão controlada, lesão no joelho direito..."
            />
          </Field>
          <Field label="Contato de emergência — nome">
            <input className="input" value={form.emergencyContactName} onChange={(e) => set("emergencyContactName", e.target.value)} />
          </Field>
          <Field label="Contato de emergência — telefone">
            <input className="input" value={form.emergencyContactPhone} onChange={(e) => set("emergencyContactPhone", maskPhone(e.target.value))} />
          </Field>
        </div>
      )}
    </Modal>
  );
}

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={cn("block", className)}>
      <span className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-dim">{label}</span>
      {children}
    </label>
  );
}
