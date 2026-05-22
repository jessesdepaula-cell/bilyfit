"use client";
import { Search, Filter, Download, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    active: "bg-success/15 text-success border-success/30",
    paid: "bg-success/15 text-success border-success/30",
    ok: "bg-success/15 text-success border-success/30",
    sent: "bg-success/15 text-success border-success/30",
    closed: "bg-success/15 text-success border-success/30",
    pending: "bg-warning/15 text-warning border-warning/30",
    trial: "bg-info/15 text-info border-info/30",
    open: "bg-info/15 text-info border-info/30",
    scheduled: "bg-info/15 text-info border-info/30",
    waiting: "bg-warning/15 text-warning border-warning/30",
    in_progress: "bg-brand/15 text-brand border-brand/30",
    overdue: "bg-danger/15 text-danger border-danger/30",
    blocked: "bg-danger/15 text-danger border-danger/30",
    inactive: "bg-muted/40 text-subtle border-border",
    canceled: "bg-muted/40 text-subtle border-border",
    void: "bg-muted/40 text-subtle border-border",
    draft: "bg-muted/40 text-subtle border-border",
    frozen: "bg-info/15 text-info border-info/30",
    vacation: "bg-info/15 text-info border-info/30",
    refunded: "bg-muted/40 text-subtle border-border",
  };
  const labels: Record<string, string> = {
    active: "Ativo", paid: "Pago", ok: "OK", sent: "Enviado", closed: "Fechado",
    pending: "Pendente", trial: "Trial", open: "Aberto", scheduled: "Agendado",
    waiting: "Aguardando", in_progress: "Em andamento", overdue: "Inadimplente",
    blocked: "Bloqueado", inactive: "Inativo", canceled: "Cancelado", void: "Anulada",
    draft: "Rascunho", frozen: "Trancado", vacation: "Férias", refunded: "Reembolsado",
  };
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium", map[status] ?? "bg-muted/40 text-subtle border-border")}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {labels[status] ?? status}
    </span>
  );
}

export function TableToolbar({
  searchPlaceholder = "Buscar...", value, onChange, onNew, newLabel, filters,
}: {
  searchPlaceholder?: string; value: string; onChange: (v: string) => void;
  onNew?: () => void; newLabel?: string; filters?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
      <div className="relative flex-1 max-w-md">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dim" />
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={searchPlaceholder} className="input pl-10 py-2.5" />
      </div>
      <div className="flex items-center gap-2">
        {filters}
        <button className="btn-secondary text-sm py-2.5"><Filter size={14} /> Filtros</button>
        <button className="btn-secondary text-sm py-2.5"><Download size={14} /> Exportar</button>
        {onNew && <button onClick={onNew} className="btn-primary text-sm py-2.5"><Plus size={14} /> {newLabel ?? "Novo"}</button>}
      </div>
    </div>
  );
}

export function DataTable<T>({ columns, data, rowKey }: {
  columns: { key: string; label: string; render?: (row: T) => React.ReactNode; className?: string }[];
  data: T[];
  rowKey: (row: T) => string;
}) {
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-elevated/40">
              {columns.map((c) => (
                <th key={c.key} className={cn("text-left text-xs font-semibold uppercase tracking-wider text-dim px-5 py-3.5", c.className)}>{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr><td colSpan={columns.length} className="text-center text-subtle py-16">Nenhum registro encontrado</td></tr>
            ) : data.map((row) => (
              <tr key={rowKey(row)} className="border-b border-border/40 last:border-0 table-row-hover">
                {columns.map((c) => (
                  <td key={c.key} className={cn("px-5 py-4 text-sm", c.className)}>
                    {c.render ? c.render(row) : (row as any)[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function EmptyState({ title, desc }: { title: string; desc?: string }) {
  return (
    <div className="card-3d p-16 text-center">
      <h3 className="font-display text-xl font-bold">{title}</h3>
      {desc && <p className="mt-2 text-subtle">{desc}</p>}
    </div>
  );
}
