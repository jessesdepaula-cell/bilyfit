"use client";
import { PageHeader } from "@/components/dashboard/DashShell";
import { CHECKINS } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";
import { QrCode } from "lucide-react";

export default function PortalCheckinPage() {
  return (
    <>
      <PageHeader title="Meu check-in" subtitle="Escaneie no totem ou use o histórico abaixo" />
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="card-3d p-8 flex flex-col items-center">
          <div className="bg-foreground p-3 rounded-2xl w-64 h-64">
            <div className="grid grid-cols-12 gap-0.5 w-full h-full">
              {Array.from({ length: 144 }).map((_, i) => (
                <div key={i} className={(i * 17) % 5 < 2 ? "bg-background rounded-[2px]" : "bg-foreground rounded-[2px]"} />
              ))}
            </div>
          </div>
          <div className="mt-6 text-center">
            <div className="font-display font-bold text-lg">Lucas Pereira</div>
            <div className="text-sm text-dim">Iron Pump Academy</div>
            <div className="mt-3 chip"><span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" /> Acesso liberado</div>
          </div>
        </div>
        <div className="card-3d p-6">
          <h3 className="font-display text-lg font-semibold mb-4">Histórico de presença</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {CHECKINS.slice(0, 12).map((c) => (
              <div key={c.id} className="flex items-center justify-between p-3 glass rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-brand/15 text-brand flex items-center justify-center"><QrCode size={14}/></div>
                  <div>
                    <div className="text-sm font-medium">Check-in {c.method}</div>
                    <div className="text-xs text-dim">{formatDateTime(c.timestamp)}</div>
                  </div>
                </div>
                <span className={`w-2 h-2 rounded-full ${c.status === "ok" ? "bg-success" : "bg-danger"}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
