"use client";
import { PageHeader } from "@/components/dashboard/DashShell";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Building2, Users, Shield, Key, Bell, Webhook, FileText, Palette } from "lucide-react";

const TABS = [
  { id: "company", label: "Empresa", icon: Building2 },
  { id: "team", label: "Equipe", icon: Users },
  { id: "permissions", label: "Permissões", icon: Shield },
  { id: "security", label: "Segurança", icon: Key },
  { id: "notifications", label: "Notificações", icon: Bell },
  { id: "webhooks", label: "Webhooks & API", icon: Webhook },
  { id: "audit", label: "Auditoria", icon: FileText },
  { id: "branding", label: "Identidade", icon: Palette },
];

export default function SettingsPage() {
  const [tab, setTab] = useState("company");
  return (
    <>
      <PageHeader title="Configurações" subtitle="Configurações da plataforma BilyFit" />
      <div className="grid lg:grid-cols-[240px_1fr] gap-6">
        <aside className="card-3d p-3 h-fit">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={cn("w-full sidebar-item", tab === t.id && "active")}>
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </aside>
        <div className="card-3d p-8">
          {tab === "company" && (
            <div className="space-y-5 max-w-xl">
              <h3 className="font-display text-xl font-bold">Dados da empresa</h3>
              <div><label className="label">Razão social</label><input className="input" defaultValue="BilyFit Technologies LTDA" /></div>
              <div><label className="label">CNPJ</label><input className="input" defaultValue="00.000.000/0001-00" /></div>
              <div><label className="label">E-mail comercial</label><input className="input" defaultValue="contato@bilyfit.com" /></div>
              <div><label className="label">Telefone</label><input className="input" defaultValue="+55 11 3000-0000" /></div>
              <button className="btn-primary">Salvar alterações</button>
            </div>
          )}
          {tab === "team" && <p className="text-subtle">Gestão de membros internos da BilyFit.</p>}
          {tab === "permissions" && <p className="text-subtle">Definição de papéis e permissões granulares.</p>}
          {tab === "security" && <p className="text-subtle">2FA, sessões ativas, política de senhas.</p>}
          {tab === "notifications" && <p className="text-subtle">Configurações de notificações por canal.</p>}
          {tab === "webhooks" && <p className="text-subtle">Geração de chaves de API e webhooks.</p>}
          {tab === "audit" && <p className="text-subtle">Logs de auditoria de toda a plataforma.</p>}
          {tab === "branding" && <p className="text-subtle">Personalização visual e white-label.</p>}
        </div>
      </div>
    </>
  );
}
