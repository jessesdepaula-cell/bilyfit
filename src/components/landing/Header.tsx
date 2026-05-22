"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "#features", label: "Recursos" },
  { href: "#demo", label: "Demonstração" },
  { href: "#pricing", label: "Planos" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-4 left-4 right-4 z-50 mx-auto max-w-6xl rounded-2xl transition-all duration-300",
      scrolled ? "glass-strong shadow-3d" : "glass"
    )}>
      <div className="flex items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center"><Logo /></Link>
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="px-4 py-2 text-sm text-subtle hover:text-foreground transition-colors rounded-lg">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <Link href="/login" className="btn-ghost text-sm">Entrar</Link>
          <Link href="/signup" className="btn-primary text-sm py-2.5">Começar grátis</Link>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-foreground" aria-label="Menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border px-5 py-4 flex flex-col gap-2">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-2 text-subtle hover:text-foreground">
              {n.label}
            </a>
          ))}
          <Link href="/login" className="btn-secondary mt-2">Entrar</Link>
          <Link href="/signup" className="btn-primary">Começar grátis</Link>
        </div>
      )}
    </header>
  );
}
