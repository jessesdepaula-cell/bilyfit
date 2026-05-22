"use client";
import { PageHeader } from "@/components/dashboard/DashShell";
import { MODALITIES } from "@/lib/mock-data";
import * as Icons from "lucide-react";
import { Edit, Plus } from "lucide-react";

export default function ModalitiesPage() {
  return (
    <>
      <PageHeader
        title="Modalidades"
        subtitle="Modalidades oferecidas pela academia"
        action={<button className="btn-primary text-sm py-2.5"><Plus size={14}/> Nova modalidade</button>}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {MODALITIES.map((m) => {
          const Icon = (Icons as any)[m.icon] ?? Icons.Activity;
          return (
            <div key={m.id} className="card-3d p-6 group">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${m.color}25`, color: m.color }}>
                  <Icon size={22} />
                </div>
                <button className="p-2 rounded-lg glass opacity-0 group-hover:opacity-100 transition"><Edit size={14} className="text-subtle" /></button>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">{m.name}</h3>
              <p className="mt-1 text-sm text-subtle">{m.description}</p>
              <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-dim">Turmas</div>
                  <div className="font-display text-xl font-bold">{m.classesCount}</div>
                </div>
                <div>
                  <div className="text-xs text-dim">Alunos</div>
                  <div className="font-display text-xl font-bold text-brand">{m.studentsCount}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
