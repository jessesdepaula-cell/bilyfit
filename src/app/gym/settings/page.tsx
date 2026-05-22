"use client";
import { useState } from "react";
import { PageHeader } from "@/components/dashboard/DashShell";
import { cn } from "@/lib/utils";
import { Building2, Users, Shield, Key, Bell, MessageSquare, Webhook, Palette } from "lucide-react";

const TABS = [
  { id: "company", label: "Academia", icon: Building2 },
  { id: "team", label: "Equipe", icon: Users },
  { id: "permissions", label: "Permissões", icon: Shield },
  { id: "security", label: "Segurança", icon: Key },
  { id: "notifications", label: "Notificações", icon: Bell },
  { id: "whatsapp", label: "WhatsApp", icon: MessageSquare },
  { id: "integrations", label: "Integrações", icon: Webhook },
  { id: "branding", label: "Identidade", icon: Palette },
];

export default function GymSettingsPage() {
  const [tab, setTab] = useState("company");
  return (
    <>
      <PageHeader title="Configurações" subtitle="Configurações da sua academia" />
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
              <h3 className="font-display text-xl font-bold">Dados da academia</h3>
              <div><label className="label">Nome</label><input className="input" defaultValue="Iron Pump Academy" /></div>
              <div><label className="label">CNPJ</label><input className="input" defaultValue="12.345.678/0001-90" /></div>
              <div><label className="label">Telefone</label><input className="input" defaultValue="+55 11 98888-1111" /></div>
              <div><label className="label">Endereço</label><input className="input" defaultValue="Av. Paulista, 1500 - São Paulo/SP" /></div>
              <div><label className="label">Horário de funcionamento</label><input className="input" defaultValue="Seg-Sex 06:00-22:00 / Sáb 08:00-14:00" /></div>
              <button className="btn-primary">Salvar alterações</button>
            </div>
          )}
          {tab === "team" && <p className="text-subtle">Gestão de membros da equipe da academia.</p>}
          {tab === "permissions" && <p className="text-subtle">Defina o que cada perfil pode acessar.</p>}
          {tab === "security" && <p className="text-subtle">2FA, logs de auditoria, sessões.</p>}
          {tab === "notifications" && <p className="text-subtle">Configurações de notificação por canal.</p>}
          {tab === "whatsapp" && <p className="text-subtle">Integração com WhatsApp Business API.</p>}
          {tab === "integrations" && <p className="text-subtle">Catracas, leitores biométricos e gateways de pagamento.</p>}
          {tab === "branding" && <p className="text-subtle">Logo, cores e identidade visual para o app do aluno.</p>}
        </div>
      </div>
    </>
  );
}
