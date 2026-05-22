"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { login, dashboardPath } from "@/lib/auth";
import { ArrowRight, Eye, EyeOff, Mail, Lock, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("jessesdepaula@gmail.com");
  const [password, setPassword] = useState("je98871688");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const user = login(email, password);
      if (!user) {
        toast.error("E-mail ou senha incorretos");
        setLoading(false);
        return;
      }
      toast.success(`Bem-vindo de volta, ${user.name.split(" ")[0]}!`);
      router.push(dashboardPath(user));
    }, 500);
  }

  return (
    <div className="min-h-screen relative grid lg:grid-cols-2">
      {/* Left visual */}
      <div className="hidden lg:flex relative overflow-hidden bg-elevated/30">
        <div className="absolute inset-0 grid-bg mask-radial pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-brand/10 blur-[120px]" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link href="/"><Logo size={32} /></Link>
          <div className="space-y-8">
            <div className="chip"><Sparkles size={14} className="text-brand" /> O futuro da gestão fitness</div>
            <h1 className="font-display text-5xl font-bold tracking-tight leading-[1.1]">
              Mais que um sistema.<br />
              <span className="text-brand">O sócio digital</span><br />
              da sua academia.
            </h1>
            <div className="grid grid-cols-3 gap-4">
              {[{ v: "800+", l: "academias" }, { v: "+47%", l: "receita" }, { v: "4.9★", l: "avaliação" }].map((s) => (
                <div key={s.l} className="glass rounded-xl p-4">
                  <div className="font-display text-2xl font-bold text-brand">{s.v}</div>
                  <div className="text-xs text-dim mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm text-dim">© {new Date().getFullYear()} BilyFit Technologies</p>
        </div>
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8"><Logo size={32} /></div>
          <h2 className="font-display text-3xl font-bold">Bem-vindo de volta</h2>
          <p className="mt-2 text-subtle">Entre com sua conta para acessar a plataforma.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="label">E-mail</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dim" />
                <input type="email" className="input pl-10" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="label">Senha</label>
                <Link href="/forgot" className="text-xs text-brand hover:underline mb-1.5">Esqueceu?</Link>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dim" />
                <input type={show ? "text" : "password"} className="input pl-10 pr-10" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-dim hover:text-foreground" aria-label="Mostrar senha">
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full text-base py-3.5 mt-2 disabled:opacity-60">
              {loading ? "Entrando..." : "Entrar"} <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-6 p-4 glass rounded-xl">
            <p className="text-xs font-semibold text-brand mb-2">CREDENCIAIS DEMO</p>
            <div className="space-y-1.5 text-xs text-subtle">
              <div><span className="text-foreground font-medium">CEO BilyFit:</span> jessesdepaula@gmail.com / je98871688</div>
              <div><span className="text-foreground font-medium">Academia:</span> admin@academia.com / academia123</div>
              <div><span className="text-foreground font-medium">Aluno:</span> aluno@bilyfit.com / aluno123</div>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-subtle">
            Não tem conta? <Link href="/signup" className="text-brand font-semibold hover:underline">Criar conta grátis</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
