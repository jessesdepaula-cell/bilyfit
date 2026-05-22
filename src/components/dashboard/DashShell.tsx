"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { GlobalSearch } from "@/components/dashboard/GlobalSearch";
import { getSession, logout } from "@/lib/auth";
import type { User } from "@/lib/mock-data";
import { Bell, Search, LogOut, ChevronDown, Menu, X, Settings, HelpCircle } from "lucide-react";
import { cn, initials } from "@/lib/utils";

export interface NavItem {
  href: string;
  label: string;
  icon: any;
  badge?: string | number;
}

export interface NavGroup { title: string; items: NavItem[]; }

export function DashShell({
  nav, brand = "BilyFit", subBrand,
  children, requireRole,
}: {
  nav: NavGroup[];
  brand?: string;
  subBrand?: string;
  children: React.ReactNode;
  requireRole?: "ceo" | "gym_admin" | "student" | "any";
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const s = getSession();
    if (!s) { router.push("/login"); return; }
    if (requireRole && requireRole !== "any" && s.role !== requireRole && s.role !== "ceo") {
      router.push("/login"); return;
    }
    setUser(s);
  }, [router, requireRole]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-subtle">Carregando...</div>
      </div>
    );
  }

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-72 border-r border-border bg-surface/80 backdrop-blur-xl transition-transform lg:translate-x-0",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between px-5 py-5 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <Logo size={28} />
          </Link>
          <button onClick={() => setMobileOpen(false)} className="lg:hidden p-1 text-subtle"><X size={20} /></button>
        </div>
        {subBrand && (
          <div className="px-5 py-3 border-b border-border">
            <div className="text-[10px] uppercase tracking-wider text-dim font-semibold">{brand}</div>
            <div className="text-sm font-medium text-foreground">{subBrand}</div>
          </div>
        )}
        <nav className="px-3 py-4 space-y-6 overflow-y-auto h-[calc(100vh-180px)]">
          {nav.map((group) => (
            <div key={group.title}>
              <div className="px-3 mb-2 text-[10px] uppercase tracking-wider text-dim font-semibold">{group.title}</div>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = pathname === item.href || (item.href !== "/admin" && item.href !== "/gym" && item.href !== "/portal" && pathname.startsWith(item.href));
                  return (
                    <Link key={item.href} href={item.href} className={cn("sidebar-item", isActive && "active")} onClick={() => setMobileOpen(false)}>
                      <item.icon size={18} />
                      <span className="flex-1">{item.label}</span>
                      {item.badge !== undefined && <span className="chip text-[10px] py-0.5 px-2">{item.badge}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-border">
          <div className="glass rounded-xl p-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-brand text-black flex items-center justify-center font-bold text-sm">{initials(user.name)}</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{user.name}</div>
              <div className="text-xs text-dim truncate">{user.email}</div>
            </div>
            <button onClick={handleLogout} className="p-2 rounded-lg text-dim hover:text-danger hover:bg-elevated transition" aria-label="Sair">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 lg:ml-72 flex flex-col">
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
          <div className="flex items-center justify-between gap-4 px-4 lg:px-8 py-4">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 text-foreground"><Menu size={20} /></button>
            <div className="flex-1 max-w-xl">
              <button
                onClick={() => setSearchOpen(true)}
                className="w-full relative flex items-center text-left input pl-10 py-2.5 text-dim hover:text-foreground transition cursor-text"
              >
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dim" />
                <span className="flex-1">Buscar em todo o sistema...</span>
                <kbd className="hidden md:block text-[10px] text-dim font-mono px-1.5 py-0.5 rounded border border-border">⌘K</kbd>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button className="relative p-2.5 rounded-xl glass hover:border-brand/40 transition" aria-label="Notificações">
                <Bell size={18} className="text-subtle" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand animate-pulse" />
              </button>
              <div className="relative">
                <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 p-1 pr-3 rounded-xl glass hover:border-brand/40 transition">
                  <div className="w-8 h-8 rounded-lg bg-gradient-brand text-black flex items-center justify-center font-bold text-xs">{initials(user.name)}</div>
                  <span className="hidden md:block text-sm font-medium">{user.name.split(" ")[0]}</span>
                  <ChevronDown size={14} className="text-dim" />
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 glass-strong rounded-xl border border-border p-2 shadow-3d">
                    <div className="px-3 py-2 border-b border-border mb-1">
                      <div className="text-sm font-medium">{user.name}</div>
                      <div className="text-xs text-dim">{user.email}</div>
                    </div>
                    <button className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-elevated flex items-center gap-2"><Settings size={14}/> Configurações</button>
                    <button className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-elevated flex items-center gap-2"><HelpCircle size={14}/> Suporte</button>
                    <button onClick={handleLogout} className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-danger/10 text-danger flex items-center gap-2"><LogOut size={14}/> Sair</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-1 text-subtle">{subtitle}</p>}
      </div>
      {action && <div className="flex items-center gap-2">{action}</div>}
    </div>
  );
}

export function StatCard({ label, value, trend, icon: Icon, color = "text-brand" }: {
  label: string; value: string; trend?: string; icon: any; color?: string;
}) {
  return (
    <div className="stat-card">
      <div className="flex items-start justify-between">
        <div className={cn("w-11 h-11 rounded-xl bg-elevated border border-border flex items-center justify-center", color)}>
          <Icon size={20} />
        </div>
        {trend && (
          <span className={cn("text-xs font-semibold px-2 py-1 rounded-full", trend.startsWith("-") && !trend.includes("inadimplência") ? "bg-danger/15 text-danger" : "bg-success/15 text-success")}>
            {trend}
          </span>
        )}
      </div>
      <div className="mt-4 font-display text-3xl font-bold tracking-tight">{value}</div>
      <div className="text-sm text-subtle">{label}</div>
    </div>
  );
}
