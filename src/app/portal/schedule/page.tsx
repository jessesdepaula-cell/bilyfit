"use client";
import { PageHeader } from "@/components/dashboard/DashShell";
import { CLASSES } from "@/lib/mock-data";
import { Calendar } from "lucide-react";

export default function PortalSchedule() {
  return (
    <>
      <PageHeader title="Aulas & horários" subtitle="Reserve sua vaga em segundos" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {CLASSES.map((c) => (
          <div key={c.id} className="card-3d p-5">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-brand/15 text-brand flex items-center justify-center"><Calendar size={16}/></div>
              <span className="chip text-[10px]">{c.day}</span>
            </div>
            <h4 className="mt-3 font-display font-bold">{c.modality}</h4>
            <div className="text-xs text-subtle">{c.teacher}</div>
            <div className="mt-3 flex items-center justify-between">
              <span className="font-mono text-sm">{c.time}</span>
              <span className="text-xs text-dim">{c.enrolled}/{c.capacity}</span>
            </div>
            <button className="btn-primary w-full mt-4 text-xs py-2" disabled={c.enrolled >= c.capacity}>
              {c.enrolled >= c.capacity ? "Sala lotada" : "Reservar vaga"}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
