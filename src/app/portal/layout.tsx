"use client";
import { DashShell, type NavGroup } from "@/components/dashboard/DashShell";
import { GymDataProvider } from "@/lib/store";
import { LayoutDashboard, Dumbbell, Calendar, CreditCard, QrCode, User } from "lucide-react";

const NAV: NavGroup[] = [
  { title: "Menu", items: [
    { href: "/portal", label: "Início", icon: LayoutDashboard },
    { href: "/portal/workouts", label: "Meus treinos", icon: Dumbbell },
    { href: "/portal/schedule", label: "Aulas & horários", icon: Calendar },
    { href: "/portal/checkin", label: "Check-in", icon: QrCode },
    { href: "/portal/payments", label: "Pagamentos", icon: CreditCard },
    { href: "/portal/profile", label: "Meu perfil", icon: User },
  ]},
];

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <GymDataProvider>
      <DashShell nav={NAV} brand="Portal do Aluno" subBrand="Iron Pump Academy" requireRole="student">{children}</DashShell>
    </GymDataProvider>
  );
}
