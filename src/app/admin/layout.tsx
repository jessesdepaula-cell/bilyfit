"use client";
import { DashShell, type NavGroup } from "@/components/dashboard/DashShell";
import { GymDataProvider } from "@/lib/store";
import {
  LayoutDashboard, Building2, CreditCard, Package, DollarSign, FileText, Headphones, BarChart3, Settings, Users
} from "lucide-react";

const NAV: NavGroup[] = [
  {
    title: "Visão",
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
      { href: "/admin/gyms", label: "Academias", icon: Building2, badge: 8 },
      { href: "/admin/students", label: "Alunos", icon: Users },
      { href: "/admin/subscriptions", label: "Assinaturas", icon: CreditCard },
      { href: "/admin/plans", label: "Planos comerciais", icon: Package },
    ],
  },
  {
    title: "Financeiro",
    items: [
      { href: "/admin/financial", label: "Financeiro", icon: DollarSign },
      { href: "/admin/invoices", label: "Faturas", icon: FileText },
    ],
  },
  {
    title: "Operação",
    items: [
      { href: "/admin/support", label: "Suporte", icon: Headphones, badge: 4 },
      { href: "/admin/reports", label: "Relatórios", icon: BarChart3 },
      { href: "/admin/settings", label: "Configurações", icon: Settings },
    ],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <GymDataProvider>
      <DashShell nav={NAV} brand="Painel CEO" subBrand="BilyFit HQ" requireRole="ceo">{children}</DashShell>
    </GymDataProvider>
  );
}
