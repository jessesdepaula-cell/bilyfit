"use client";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useGymData } from "@/lib/store";
import { MODALITIES, type Student } from "@/lib/mock-data";
import { StatusBadge } from "@/components/dashboard/Common";
import { cn, initials } from "@/lib/utils";
import { Search, UserCheck, AlertTriangle, ShieldOff, CheckCircle2 } from "lucide-react";

export function CheckinPanel() {
  const { students, addCheckin } = useGymData();
  const [q, setQ] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [method, setMethod] = useState<"qr" | "manual" | "biometric">("manual");
  const [modality, setModality] = useState<string>(MODALITIES[0]?.name ?? "");
  const [allowOverdue, setAllowOverdue] = useState(false);

  const suggestions = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [] as Student[];
    return students
      .filter(
        (s) =>
          s.name.toLowerCase().includes(term) ||
          s.cpf.includes(term) ||
          s.email.toLowerCase().includes(term) ||
          s.phone.includes(term)
      )
      .slice(0, 6);
  }, [students, q]);

  const selected = selectedId ? students.find((s) => s.id === selectedId) ?? null : null;

  function pick(s: Student) {
    setSelectedId(s.id);
    setQ(s.name);
  }

  function reset() {
    setSelectedId(null);
    setQ("");
    setAllowOverdue(false);
  }

  function handleRegister() {
    if (!selected) {
      toast.error("Selecione um aluno");
      return;
    }
    if (selected.status === "inactive") {
      toast.error("Aluno inativo — reative a matrícula antes do check-in");
      return;
    }
    if (selected.status === "frozen") {
      toast.error("Matrícula trancada — descongele antes de liberar a entrada");
      return;
    }
    const blocked = selected.status === "overdue" && !allowOverdue;
    const created = addCheckin({
      studentId: selected.id,
      method,
      status: blocked ? "blocked" : "ok",
      reason: blocked ? "Mensalidade em atraso" : undefined,
      modality,
      gymId: selected.gymId,
    });
    if (!created) {
      toast.error("Não foi possível registrar o check-in");
      return;
    }
    if (blocked) {
      toast.error(`Acesso bloqueado — ${selected.name} está inadimplente`);
    } else {
      toast.success(`Bem-vindo(a), ${selected.name.split(" ")[0]}! ✓`);
    }
    reset();
  }

  return (
    <div className="card-3d p-6">
      <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
        <UserCheck size={18} className="text-brand" />
        Registrar check-in
      </h3>

      {/* Search / autocomplete */}
      <div className="relative mb-3">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dim" />
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setSelectedId(null);
          }}
          placeholder="Buscar por nome, CPF, e-mail ou telefone..."
          className="input pl-10 py-2.5"
        />
        {!selected && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1.5 glass-strong border border-border rounded-xl p-1.5 z-20 shadow-3d max-h-72 overflow-y-auto">
            {suggestions.map((s) => (
              <button
                key={s.id}
                onClick={() => pick(s)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-elevated transition text-left"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-brand text-black flex items-center justify-center font-bold text-[10px] shrink-0">
                  {initials(s.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{s.name}</div>
                  <div className="text-xs text-dim truncate">{s.plan} · {s.cpf}</div>
                </div>
                <StatusBadge status={s.status} />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected student preview */}
      {selected && (
        <div
          className={cn(
            "p-4 rounded-xl border mb-4 transition",
            selected.status === "overdue"
              ? "border-danger/40 bg-danger/5"
              : selected.status === "active"
              ? "border-success/30 bg-success/5"
              : "border-border bg-elevated/40"
          )}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-brand text-black flex items-center justify-center font-bold text-xs">
              {initials(selected.name)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold truncate">{selected.name}</div>
              <div className="text-xs text-dim truncate">{selected.plan} · {selected.trainer}</div>
            </div>
            <StatusBadge status={selected.status} />
          </div>
          {selected.status === "overdue" && (
            <div className="mt-2 flex items-start gap-2 text-xs text-danger bg-danger/10 px-3 py-2 rounded-lg">
              <AlertTriangle size={14} className="shrink-0 mt-0.5" />
              <div className="flex-1">
                <strong>Mensalidade em atraso.</strong> O acesso será bloqueado por padrão.
              </div>
              <label className="inline-flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowOverdue}
                  onChange={(e) => setAllowOverdue(e.target.checked)}
                  className="accent-brand"
                />
                <span>Liberar</span>
              </label>
            </div>
          )}
          {selected.medicalNotes && (
            <div className="mt-2 text-xs text-warning bg-warning/10 px-3 py-2 rounded-lg flex items-start gap-2">
              <AlertTriangle size={14} className="shrink-0 mt-0.5" />
              <span><strong>Obs. médica:</strong> {selected.medicalNotes}</span>
            </div>
          )}
        </div>
      )}

      {/* Method + modality */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <span className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-dim">Método</span>
          <div className="flex gap-1">
            {(["manual", "qr", "biometric"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMethod(m)}
                className={cn(
                  "flex-1 px-2 py-2 rounded-lg border text-xs font-semibold uppercase transition",
                  method === m ? "border-brand bg-brand/10 text-brand" : "border-border text-subtle hover:bg-elevated"
                )}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
        <div>
          <span className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-dim">Modalidade</span>
          <select value={modality} onChange={(e) => setModality(e.target.value)} className="input py-2">
            {MODALITIES.map((m) => <option key={m.id} value={m.name}>{m.name}</option>)}
          </select>
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={reset} className="btn-secondary text-sm py-2.5">Limpar</button>
        <button onClick={handleRegister} className="btn-primary flex-1 text-sm py-2.5" disabled={!selected}>
          {selected && selected.status === "overdue" && !allowOverdue ? (
            <><ShieldOff size={14} /> Bloquear & registrar</>
          ) : (
            <><CheckCircle2 size={14} /> Liberar entrada</>
          )}
        </button>
      </div>
    </div>
  );
}
