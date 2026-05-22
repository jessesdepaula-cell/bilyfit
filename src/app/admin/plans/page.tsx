"use client";
import { PageHeader } from "@/components/dashboard/DashShell";
import { PLATFORM_PLANS, GYMS } from "@/lib/mock-data";
import { formatCurrency, cn } from "@/lib/utils";
import { Check, Edit, Plus, Sparkles } from "lucide-react";

export default function PlatformPlansPage() {
  const counts = PLATFORM_PLANS.reduce<Record<string, number>>((acc, p) => {
    acc[p.id] = GYMS.filter((g) => g.plan === p.id).length;
    return acc;
  }, {});

  return (
    <>
      <PageHeader
        title="Planos comerciais"
        subtitle="Gerencie os planos oferecidos pela BilyFit"
        action={<button className="btn-primary text-sm py-2.5"><Plus size={14}/> Novo plano</button>}
      />

      <div className="grid md:grid-cols-3 gap-6">
        {PLATFORM_PLANS.map((p) => (
          <div key={p.id} className={cn("card-3d p-8 relative", p.highlighted && "ring-brand-soft")}>
            {p.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 chip bg-gradient-brand text-black border-0 px-3 py-1">
                <Sparkles size={12} /> Mais vendido
              </div>
            )}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-2xl font-bold">{p.name}</h3>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="font-display text-4xl font-bold">{formatCurrency(p.price)}</span>
                  <span className="text-subtle text-sm">/mês</span>
                </div>
              </div>
              <button className="p-2 rounded-lg glass hover:border-brand/40"><Edit size={14} className="text-subtle" /></button>
            </div>

            <div className="mt-6 p-4 glass rounded-xl">
              <div className="text-xs text-dim">Academias usando</div>
              <div className="mt-1 font-display text-2xl font-bold text-brand">{counts[p.id] || 0}</div>
            </div>

            <ul className="mt-6 space-y-2.5">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  <Check size={16} className="text-brand mt-0.5 flex-shrink-0" />
                  <span className="text-subtle">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
