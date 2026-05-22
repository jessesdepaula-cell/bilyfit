"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHeader, StatCard } from "@/components/dashboard/DashShell";
import { StatusBadge } from "@/components/dashboard/Common";
import { useGymData } from "@/lib/store";
import type { Student } from "@/lib/mock-data";
import { formatDateTime, initials, cn } from "@/lib/utils";
import {
  ScanFace, Play, Pause, Maximize2, Minimize2, CheckCircle2, ShieldOff,
  Camera, Activity, Users, AlertTriangle, Zap, Volume2, VolumeX, Settings
} from "lucide-react";
import { toast } from "sonner";

const CURRENT_GYM_ID = "g-1";

type RecognitionEvent = {
  id: string;
  student: Student;
  status: "ok" | "blocked";
  reason?: string;
  at: string;
  confidence: number;
};

export default function TurnstilePage() {
  const { students, addCheckin, checkins } = useGymData();
  const [running, setRunning] = useState(true);
  const [muted, setMuted] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [intervalSec, setIntervalSec] = useState(7);
  const [allowOverdue, setAllowOverdue] = useState(false);
  const [welcome, setWelcome] = useState<RecognitionEvent | null>(null);
  const [recent, setRecent] = useState<RecognitionEvent[]>([]);
  const [scanProgress, setScanProgress] = useState(0);

  const gymStudents = useMemo(
    () => students.filter((s) => s.gymId === CURRENT_GYM_ID && s.status !== "inactive"),
    [students]
  );

  const checkinsTodayCount = useMemo(() => {
    const now = new Date();
    return checkins.filter((c) => {
      const d = new Date(c.timestamp);
      return c.method === "biometric" && d.toDateString() === now.toDateString();
    }).length;
  }, [checkins]);

  const successRate = useMemo(() => {
    const todayBiometric = checkins.filter((c) => {
      const d = new Date(c.timestamp);
      return c.method === "biometric" && d.toDateString() === new Date().toDateString();
    });
    if (todayBiometric.length === 0) return 100;
    const ok = todayBiometric.filter((c) => c.status === "ok").length;
    return Math.round((ok / todayBiometric.length) * 100);
  }, [checkins]);

  const detect = useCallback(() => {
    if (gymStudents.length === 0) return;
    const student = gymStudents[Math.floor(Math.random() * gymStudents.length)];
    const blocked = student.status === "overdue" && !allowOverdue;
    const confidence = 92 + Math.random() * 7;
    const created = addCheckin({
      studentId: student.id,
      method: "biometric",
      status: blocked ? "blocked" : "ok",
      reason: blocked ? "Mensalidade em atraso" : undefined,
      gymId: student.gymId,
    });
    if (!created) return;
    const event: RecognitionEvent = {
      id: created.id,
      student,
      status: blocked ? "blocked" : "ok",
      reason: blocked ? "Mensalidade em atraso" : undefined,
      at: created.timestamp,
      confidence,
    };
    setWelcome(event);
    setRecent((prev) => [event, ...prev].slice(0, 12));
    // Beep
    if (!muted) {
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = blocked ? 220 : 880;
        osc.type = "sine";
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
        osc.connect(gain).connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } catch {}
    }
    // Auto-dismiss
    setTimeout(() => setWelcome((current) => (current?.id === event.id ? null : current)), 4000);
  }, [gymStudents, addCheckin, allowOverdue, muted]);

  // Scanner loop
  useEffect(() => {
    if (!running) return;
    setScanProgress(0);
    const tick = 80;
    const totalTicks = (intervalSec * 1000) / tick;
    let count = 0;
    const id = setInterval(() => {
      count++;
      setScanProgress((count / totalTicks) * 100);
      if (count >= totalTicks) {
        detect();
        count = 0;
        setScanProgress(0);
      }
    }, tick);
    return () => clearInterval(id);
  }, [running, intervalSec, detect]);

  function toggleFullscreen() {
    setFullscreen((f) => !f);
  }

  function manualScan() {
    detect();
    setScanProgress(0);
    toast.success("Varredura manual disparada");
  }

  return (
    <>
      {!fullscreen && (
        <PageHeader
          title="Catraca — Reconhecimento facial"
          subtitle="Check-in automático por biometria facial"
          action={
            <button onClick={toggleFullscreen} className="btn-secondary text-sm py-2.5">
              <Maximize2 size={14} /> Tela cheia
            </button>
          }
        />
      )}

      {!fullscreen && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          <StatCard label="Acessos via catraca (hoje)" value={String(checkinsTodayCount)} icon={ScanFace} color="text-info" />
          <StatCard label="Taxa de sucesso" value={`${successRate}%`} icon={CheckCircle2} color="text-success" />
          <StatCard label="Alunos cadastrados" value={String(gymStudents.length)} icon={Users} />
          <StatCard label="Tempo médio de leitura" value="1.2s" icon={Activity} color="text-brand" />
        </div>
      )}

      <div className={cn(
        "grid gap-5",
        fullscreen ? "fixed inset-0 z-40 bg-background p-4 lg:p-6 grid-cols-1 lg:grid-cols-3 overflow-auto" : "lg:grid-cols-3"
      )}>
        {/* Camera feed */}
        <div className={cn("card-3d overflow-hidden relative", fullscreen ? "lg:col-span-2" : "lg:col-span-2")}>
          <CameraFeed running={running} scanProgress={scanProgress} />

          {/* Controls bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center gap-2 bg-gradient-to-t from-black/80 to-transparent">
            <button
              onClick={() => setRunning((r) => !r)}
              className={cn(
                "px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition",
                running ? "bg-brand text-black hover:brightness-110" : "bg-elevated text-foreground hover:bg-elevated/80"
              )}
            >
              {running ? <><Pause size={14} /> Pausar catraca</> : <><Play size={14} /> Ativar catraca</>}
            </button>
            <button onClick={manualScan} className="px-3 py-2.5 rounded-xl text-sm font-medium bg-elevated/80 hover:bg-elevated text-foreground transition flex items-center gap-2">
              <Zap size={14} /> Varredura manual
            </button>
            <div className="flex-1" />
            <button
              onClick={() => setMuted((m) => !m)}
              className="p-2.5 rounded-xl text-foreground bg-elevated/80 hover:bg-elevated transition"
              aria-label={muted ? "Ativar som" : "Silenciar"}
              title={muted ? "Som desligado" : "Som ligado"}
            >
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2.5 rounded-xl text-foreground bg-elevated/80 hover:bg-elevated transition"
              aria-label="Tela cheia"
            >
              {fullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          </div>

          {/* Welcome overlay */}
          <AnimatePresence>
            {welcome && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", damping: 22, stiffness: 240 }}
                className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none"
              >
                <WelcomeCard event={welcome} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Side panel: settings + log */}
        <div className="space-y-5">
          <div className="card-3d p-5">
            <h3 className="font-display text-base font-semibold mb-4 flex items-center gap-2">
              <Settings size={16} className="text-brand" /> Configuração
            </h3>
            <div className="space-y-4 text-sm">
              <label className="block">
                <span className="block mb-1.5 text-xs uppercase tracking-wider text-dim font-semibold">
                  Intervalo entre leituras
                </span>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={3}
                    max={20}
                    value={intervalSec}
                    onChange={(e) => setIntervalSec(Number(e.target.value))}
                    className="flex-1 accent-brand"
                  />
                  <span className="text-sm font-mono w-10 text-right">{intervalSec}s</span>
                </div>
              </label>
              <label className="flex items-center justify-between gap-3 cursor-pointer">
                <span className="text-xs">
                  Liberar inadimplentes
                  <div className="text-dim text-[10px] mt-0.5">Permite passagem mesmo com mensalidade em atraso</div>
                </span>
                <input
                  type="checkbox"
                  checked={allowOverdue}
                  onChange={(e) => setAllowOverdue(e.target.checked)}
                  className="accent-brand w-4 h-4"
                />
              </label>
            </div>
          </div>

          <div className="card-3d p-5 flex-1">
            <h3 className="font-display text-base font-semibold mb-3 flex items-center gap-2">
              <Activity size={16} className="text-success" /> Acessos detectados
            </h3>
            {recent.length === 0 ? (
              <p className="text-xs text-subtle text-center py-8">Aguardando primeira leitura...</p>
            ) : (
              <ul className="space-y-2 max-h-[480px] overflow-y-auto">
                {recent.map((r) => (
                  <li
                    key={r.id}
                    className={cn(
                      "p-3 rounded-xl border text-sm",
                      r.status === "ok" ? "border-success/30 bg-success/5" : "border-danger/30 bg-danger/5"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-gradient-brand text-black flex items-center justify-center font-bold text-[10px] shrink-0">
                        {initials(r.student.name)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{r.student.name}</div>
                        <div className="text-[10px] text-dim flex items-center gap-1.5">
                          {formatDateTime(r.at)} · {r.confidence.toFixed(1)}%
                        </div>
                      </div>
                      {r.status === "ok" ? (
                        <CheckCircle2 size={16} className="text-success shrink-0" />
                      ) : (
                        <ShieldOff size={16} className="text-danger shrink-0" />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {!fullscreen && (
        <div className="mt-6 card-3d p-5 flex items-start gap-3 border-info/30 bg-info/5">
          <Camera size={18} className="text-info shrink-0 mt-0.5" />
          <div className="text-sm">
            <div className="font-semibold mb-1">Modo demonstração</div>
            <p className="text-subtle text-xs">
              Esta tela simula a integração com catraca biométrica. Em produção, o módulo conecta com hardware compatível
              (Henry, ControlID, Topdata, Hikvision) via SDK/Webhook. Os check-ins gerados aqui ficam persistidos
              em <strong>/gym/checkin</strong> com método &ldquo;biometric&rdquo;.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

function CameraFeed({ running, scanProgress }: { running: boolean; scanProgress: number }) {
  return (
    <div className="relative aspect-[16/10] bg-black overflow-hidden">
      {/* Fake camera background — animated gradient + particles */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 40%, rgba(245,217,10,0.18), transparent 60%), radial-gradient(circle at 70% 70%, rgba(34,197,94,0.12), transparent 55%), linear-gradient(135deg, #0a0a0a, #18181b, #0a0a0a)",
          }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Detection box */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-64 h-72">
          {/* Corners */}
          <CornerBracket pos="tl" running={running} />
          <CornerBracket pos="tr" running={running} />
          <CornerBracket pos="bl" running={running} />
          <CornerBracket pos="br" running={running} />

          {/* Scanning line */}
          {running && (
            <motion.div
              className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand to-transparent shadow-[0_0_12px_var(--brand,#F5D90A)]"
              animate={{ top: ["8%", "92%", "8%"] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          )}

          {/* Face silhouette */}
          <svg viewBox="0 0 100 110" className="absolute inset-0 w-full h-full text-brand/30">
            <path
              d="M50 12 C30 12 22 30 22 50 C22 68 32 86 50 92 C68 86 78 68 78 50 C78 30 70 12 50 12 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.4"
              strokeDasharray="2 3"
            />
            <circle cx="38" cy="48" r="1.5" fill="currentColor" />
            <circle cx="62" cy="48" r="1.5" fill="currentColor" />
            <path d="M44 68 Q50 72 56 68" stroke="currentColor" strokeWidth="0.6" fill="none" />
          </svg>
        </div>
      </div>

      {/* Status bar top */}
      <div className="absolute top-0 left-0 right-0 p-4 flex items-center gap-3 text-xs">
        <span className={cn(
          "chip text-[10px] backdrop-blur",
          running ? "bg-success/20 text-success border-success/40" : "bg-warning/20 text-warning border-warning/40"
        )}>
          <span className={cn("w-1.5 h-1.5 rounded-full", running ? "bg-success animate-pulse" : "bg-warning")} />
          {running ? "Catraca ativa" : "Pausada"}
        </span>
        <span className="chip text-[10px] backdrop-blur bg-black/40 text-foreground border-white/10">
          <Camera size={10} /> CAM-01 · Entrada principal
        </span>
        <div className="flex-1" />
        <span className="text-[10px] text-dim font-mono tabular-nums">
          {new Date().toLocaleTimeString("pt-BR")}
        </span>
      </div>

      {/* Scan progress */}
      {running && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="text-[10px] uppercase tracking-wider text-brand font-semibold">Escaneando rosto...</div>
          <div className="w-48 h-1 rounded-full bg-foreground/30 overflow-hidden">
            <div
              className="h-full bg-gradient-brand transition-all"
              style={{ width: `${scanProgress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function CornerBracket({ pos, running }: { pos: "tl" | "tr" | "bl" | "br"; running: boolean }) {
  const positions: Record<typeof pos, string> = {
    tl: "top-0 left-0 border-t-2 border-l-2 rounded-tl-lg",
    tr: "top-0 right-0 border-t-2 border-r-2 rounded-tr-lg",
    bl: "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-lg",
    br: "bottom-0 right-0 border-b-2 border-r-2 rounded-br-lg",
  };
  return (
    <div
      className={cn(
        "absolute w-10 h-10 transition-colors",
        positions[pos],
        running ? "border-brand" : "border-dim"
      )}
    />
  );
}

function WelcomeCard({ event }: { event: RecognitionEvent }) {
  const ok = event.status === "ok";
  return (
    <div
      className={cn(
        "pointer-events-auto glass-strong border rounded-3xl p-6 max-w-md w-full text-center shadow-3d backdrop-blur-xl",
        ok ? "border-success/50" : "border-danger/50"
      )}
      style={{
        boxShadow: ok ? "0 0 60px rgba(34,197,94,.4)" : "0 0 60px rgba(239,68,68,.4)",
      }}
    >
      <div className="flex justify-center mb-3">
        {ok ? (
          <div className="w-16 h-16 rounded-full bg-success/15 flex items-center justify-center">
            <CheckCircle2 size={32} className="text-success" />
          </div>
        ) : (
          <div className="w-16 h-16 rounded-full bg-danger/15 flex items-center justify-center">
            <AlertTriangle size={32} className="text-danger" />
          </div>
        )}
      </div>
      <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-brand text-black flex items-center justify-center font-display font-bold text-2xl mb-3">
        {initials(event.student.name)}
      </div>
      <div className="font-display text-2xl font-bold tracking-tight">
        {ok ? `Bem-vindo(a), ${event.student.name.split(" ")[0]}!` : "Acesso bloqueado"}
      </div>
      <div className="text-sm text-subtle mt-1">{event.student.name}</div>
      <div className="mt-4 flex items-center justify-center gap-2">
        <span className="chip text-[10px]">{event.student.plan}</span>
        <StatusBadge status={event.student.status} />
        <span className="chip text-[10px]">{event.confidence.toFixed(1)}% match</span>
      </div>
      {!ok && event.reason && (
        <div className="mt-3 text-xs text-danger bg-danger/10 rounded-lg px-3 py-2">
          {event.reason}
        </div>
      )}
    </div>
  );
}
