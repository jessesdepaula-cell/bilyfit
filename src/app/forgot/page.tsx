"use client";
import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Mail, ArrowLeft, Check } from "lucide-react";

export default function ForgotPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 overflow-hidden">
      <div className="absolute inset-0 grid-bg mask-radial pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-brand/10 blur-[140px]" />
      <div className="relative w-full max-w-md">
        <Link href="/" className="flex justify-center mb-8"><Logo size={32} /></Link>
        <div className="card-3d p-8">
          {!sent ? (
            <>
              <h2 className="font-display text-3xl font-bold">Recuperar senha</h2>
              <p className="mt-2 text-subtle">Informe seu e-mail e enviaremos um link para redefinir sua senha.</p>
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-8 space-y-4">
                <div>
                  <label className="label">E-mail</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dim" />
                    <input type="email" className="input pl-10" placeholder="voce@email.com" required />
                  </div>
                </div>
                <button className="btn-primary w-full text-base py-3.5">Enviar link de recuperação</button>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-14 h-14 mx-auto rounded-full bg-success/15 text-success flex items-center justify-center mb-4">
                <Check size={28} />
              </div>
              <h2 className="font-display text-2xl font-bold">E-mail enviado!</h2>
              <p className="mt-2 text-subtle">Verifique sua caixa de entrada. O link expira em 1 hora.</p>
            </div>
          )}
        </div>
        <Link href="/login" className="mt-6 flex items-center justify-center gap-2 text-sm text-subtle hover:text-foreground">
          <ArrowLeft size={14} /> Voltar para o login
        </Link>
      </div>
    </div>
  );
}
