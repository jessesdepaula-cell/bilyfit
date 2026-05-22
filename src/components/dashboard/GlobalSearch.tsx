"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Users, Building2, GraduationCap, ArrowRight } from "lucide-react";
import { useGymData } from "@/lib/store";
import { GYMS, TEACHERS } from "@/lib/mock-data";
import { initials, cn } from "@/lib/utils";

type ResultKind = "student" | "gym" | "teacher";

interface Result {
  kind: ResultKind;
  id: string;
  title: string;
  subtitle: string;
  href: string;
}

export function GlobalSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const { students } = useGymData();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const scope: "admin" | "gym" | "portal" = pathname.startsWith("/admin")
    ? "admin"
    : pathname.startsWith("/portal")
    ? "portal"
    : "gym";

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const results = useMemo<Result[]>(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];

    const studentResults: Result[] = students
      .filter(
        (s) =>
          s.name.toLowerCase().includes(term) ||
          s.email.toLowerCase().includes(term) ||
          s.cpf.includes(term) ||
          s.phone.includes(term)
      )
      .slice(0, 6)
      .map((s) => {
        const gym = GYMS.find((g) => g.id === s.gymId);
        return {
          kind: "student" as const,
          id: s.id,
          title: s.name,
          subtitle: `${s.plan} · ${gym?.name ?? "Academia"} · ${s.email}`,
          href: scope === "admin" ? `/admin/students/${s.id}` : `/gym/students/${s.id}`,
        };
      });

    const gymResults: Result[] =
      scope === "admin"
        ? GYMS.filter(
            (g) =>
              g.name.toLowerCase().includes(term) ||
              g.owner.toLowerCase().includes(term) ||
              g.city.toLowerCase().includes(term)
          )
            .slice(0, 4)
            .map((g) => ({
              kind: "gym" as const,
              id: g.id,
              title: g.name,
              subtitle: `${g.owner} · ${g.city}/${g.state} · ${g.students} alunos`,
              href: `/admin/gyms`,
            }))
        : [];

    const teacherResults: Result[] = TEACHERS.filter(
      (t) => t.name.toLowerCase().includes(term) || t.specialty.toLowerCase().includes(term)
    )
      .slice(0, 3)
      .map((t) => ({
        kind: "teacher" as const,
        id: t.id,
        title: t.name,
        subtitle: t.specialty,
        href: scope === "admin" ? `/admin` : "/gym/teachers",
      }));

    return [...studentResults, ...gymResults, ...teacherResults];
  }, [q, students, scope]);

  useEffect(() => {
    setActive(0);
  }, [q]);

  const go = useCallback(
    (r: Result) => {
      router.push(r.href);
      onClose();
    },
    [router, onClose]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => Math.min(results.length - 1, a + 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(0, a - 1));
      }
      if (e.key === "Enter" && results[active]) {
        e.preventDefault();
        go(results[active]);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, results, active, onClose, go]);

  const iconFor = (k: ResultKind) =>
    k === "student" ? <Users size={14} /> : k === "gym" ? <Building2 size={14} /> : <GraduationCap size={14} />;

  const groupLabel = (k: ResultKind) =>
    k === "student" ? "Alunos" : k === "gym" ? "Academias" : "Professores";

  // Group results by kind preserving order
  const groups = useMemo(() => {
    const g: { kind: ResultKind; items: Result[] }[] = [];
    results.forEach((r) => {
      const last = g[g.length - 1];
      if (last && last.kind === r.kind) last.items.push(r);
      else g.push({ kind: r.kind, items: [r] });
    });
    return g;
  }, [results]);

  let cursor = 0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 backdrop-blur-sm p-4 pt-[10vh]"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", damping: 26, stiffness: 280 }}
            className="w-full max-w-2xl glass-strong border border-border rounded-2xl shadow-3d overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
              <Search size={18} className="text-dim shrink-0" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar aluno, academia, professor..."
                className="flex-1 bg-transparent outline-none text-base placeholder:text-dim"
              />
              <button
                onClick={onClose}
                className="text-dim hover:text-foreground p-1 rounded-lg hover:bg-elevated transition"
                aria-label="Fechar"
              >
                <X size={16} />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {!q && (
                <div className="px-4 py-12 text-center text-sm text-subtle">
                  Comece a digitar para buscar em alunos
                  {scope === "admin" && ", academias"}, professores...
                  <div className="mt-3 text-xs text-dim">Use ↑ ↓ para navegar · ↵ para abrir · ESC para fechar</div>
                </div>
              )}

              {q && results.length === 0 && (
                <div className="px-4 py-12 text-center text-sm text-subtle">
                  Nenhum resultado para <strong>&ldquo;{q}&rdquo;</strong>
                </div>
              )}

              {groups.map((group) => (
                <div key={group.kind} className="mb-2 last:mb-0">
                  <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-dim font-semibold flex items-center gap-1.5">
                    {iconFor(group.kind)}
                    {groupLabel(group.kind)}
                  </div>
                  {group.items.map((r) => {
                    const i = cursor++;
                    const isActive = i === active;
                    return (
                      <button
                        key={r.kind + r.id}
                        onMouseEnter={() => setActive(i)}
                        onClick={() => go(r)}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition",
                          isActive ? "bg-brand/10 border border-brand/30" : "border border-transparent hover:bg-elevated"
                        )}
                      >
                        <div className={cn(
                          "w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0",
                          r.kind === "student" ? "bg-gradient-brand text-black" : "bg-elevated text-subtle"
                        )}>
                          {r.kind === "student" ? initials(r.title) : iconFor(r.kind)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{r.title}</div>
                          <div className="text-xs text-dim truncate">{r.subtitle}</div>
                        </div>
                        {isActive && <ArrowRight size={14} className="text-brand shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
