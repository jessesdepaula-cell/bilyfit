import { cn } from "@/lib/utils";

export function Logo({ className, size = 28 }: { className?: string; size?: number }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <div className="absolute inset-0 rounded-xl bg-gradient-brand shadow-glow" />
        <div className="absolute inset-[3px] rounded-[9px] bg-background flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" className="w-3/4 h-3/4">
            <path d="M6 4h6.5a4 4 0 0 1 0 8H6V4Z" stroke="#F5D90A" strokeWidth="2.2" strokeLinejoin="round"/>
            <path d="M6 12h7.5a4 4 0 0 1 0 8H6v-8Z" stroke="#F5D90A" strokeWidth="2.2" strokeLinejoin="round"/>
            <circle cx="18" cy="6" r="1.5" fill="#F5D90A"/>
          </svg>
        </div>
      </div>
      <span className="font-display font-bold tracking-tight text-foreground" style={{ fontSize: size * 0.65 }}>
        Bily<span className="text-brand">Fit</span>
      </span>
    </div>
  );
}
