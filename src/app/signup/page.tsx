"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ArrowRight, Building2, Mail, Lock, User } from "lucide-react";
import { toast } from "sonner";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Conta criada! Bem-vindo ao BilyFit.");
      router.push("/gym");
    }, 700);
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 overflow-hidden">
      <div className="absolute inset-0 grid-bg mask-radial pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full bg-brand/10 blur-[140px]" />

      <div className="relative w-full max-w-md">
        <Link href="/" className="flex justify-center mb-8"><Logo size={32} /></Link>
        <div className="card-3d p-8">
          <h2 className="font-display text-3xl font-bold">Comece grátis</h2>
          <p className="mt-2 text-subtle">14 dias com tudo liberado. Sem cartão.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="label">Nome completo</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dim" />
                <input type="text" className="input pl-10" placeholder="Seu nome" required />
              </div>
            </div>
            <div>
              <label className="label">Academia</label>
              <div className="relative">
                <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dim" />
                <input type="text" className="input pl-10" placeholder="Nome da sua academia" required />
              </div>
            </div>
            <div>
              <label className="label">E-mail corporativo</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dim" />
                <input type="email" className="input pl-10" placeholder="voce@academia.com" required />
              </div>
            </div>
            <div>
              <label className="label">Senha</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dim" />
                <input type="password" className="input pl-10" placeholder="Mínimo 8 caracteres" required />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full text-base py-3.5 mt-2">
              {loading ? "Criando..." : "Criar minha conta"} <ArrowRight size={16} />
            </button>
          </form>
          <p className="mt-6 text-xs text-center text-dim">
            Ao continuar você aceita os <Link href="#" className="text-brand">Termos</Link> e a <Link href="#" className="text-brand">Política de Privacidade</Link>.
          </p>
        </div>
        <p className="mt-6 text-center text-sm text-subtle">
          Já tem conta? <Link href="/login" className="text-brand font-semibold hover:underline">Entrar</Link>
        </p>
      </div>
    </div>
  );
}
