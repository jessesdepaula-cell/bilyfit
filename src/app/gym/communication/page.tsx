"use client";
import { useState } from "react";
import { PageHeader, StatCard } from "@/components/dashboard/DashShell";
import { DataTable, StatusBadge, TableToolbar } from "@/components/dashboard/Common";
import { MESSAGES } from "@/lib/mock-data";
import { formatDate, cn } from "@/lib/utils";
import { Send, MessageSquare, Mail, Bell } from "lucide-react";
import { toast } from "sonner";

const CHANNEL_ICON: Record<string, any> = { whatsapp: MessageSquare, email: Mail, push: Bell };

export default function CommunicationPage() {
  const [q, setQ] = useState("");
  const [message, setMessage] = useState("");
  const filtered = MESSAGES.filter((m) => m.subject.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <PageHeader title="Comunicação" subtitle="Mensagens, campanhas e réguas automáticas" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <StatCard label="Enviadas" value="2.4k" icon={Send} />
        <StatCard label="Taxa de abertura" value="68%" icon={Mail} color="text-success" />
        <StatCard label="Conversão" value="22%" icon={MessageSquare} color="text-info" />
        <StatCard label="Agendadas" value="3" icon={Bell} color="text-warning" />
      </div>

      <div className="card-3d p-6 mb-6">
        <h3 className="font-display text-lg font-semibold mb-4">Nova mensagem</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <select className="input">
            <option>Todos os alunos</option>
            <option>Apenas ativos</option>
            <option>Inadimplentes</option>
            <option>Aniversariantes</option>
          </select>
          <select className="input">
            <option>WhatsApp</option><option>E-mail</option><option>Push</option>
          </select>
          <input className="input" placeholder="Título da mensagem" />
        </div>
        <textarea
          className="input mt-4 min-h-32 resize-none"
          placeholder="Olá {nome}, queremos te lembrar que..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex justify-end gap-2 mt-4">
          <button className="btn-secondary">Salvar rascunho</button>
          <button onClick={() => { toast.success("Mensagem enviada para 842 destinatários"); setMessage(""); }} className="btn-primary">
            <Send size={14}/> Enviar agora
          </button>
        </div>
      </div>

      <TableToolbar value={q} onChange={setQ} searchPlaceholder="Buscar mensagem..." />

      <DataTable
        rowKey={(m) => m.id}
        data={filtered}
        columns={[
          { key: "subject", label: "Mensagem", render: (m) => (
            <div>
              <div className="font-medium">{m.subject}</div>
              <div className="text-xs text-dim">Para: {m.to}</div>
            </div>
          )},
          { key: "channel", label: "Canal", render: (m) => {
            const Icon = CHANNEL_ICON[m.channel];
            return <span className="chip"><Icon size={12} /> {m.channel}</span>;
          }},
          { key: "opens", label: "Aberturas", render: (m) => <span>{m.opens}</span> },
          { key: "clicks", label: "Cliques", render: (m) => <span className="text-brand font-semibold">{m.clicks}</span> },
          { key: "sentAt", label: "Data", render: (m) => <span className="text-subtle">{formatDate(m.sentAt)}</span> },
          { key: "status", label: "Status", render: (m) => <StatusBadge status={m.status} /> },
        ]}
      />
    </>
  );
}
