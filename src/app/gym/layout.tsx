"use client";
import { DashShell, type NavGroup } from "@/components/dashboard/DashShell";
import {
  LayoutDashboard, Users, DollarSign, QrCode, Package, Activity,
  Calendar, GraduationCap, Dumbbell, ClipboardList, MessageSquare, BarChart3, Settings
} from "lucide-react";

const NAV: NavGroup[] = [
  { title: "Visão", items: [
    { href: "/gym", label: "Dashboard", icon: LayoutDashboard },
  ]},
  { title: "Alunos", items: [
    { href: "/gym/students", label: "Alunos", icon: Users, badge: 842 },
    { href: "/gym/checkin", label: "Check-in", icon: QrCode },
    { href: "/gym/workouts", label: "Treinos", icon: Dumbbell },
    { href: "/gym/assessments", label: "Avaliações", icon: ClipboardList },
  ]},
  { title: "Operação", items: [
    { href: "/gym/plans", label: "Planos", icon: Package },
    { href: "/gym/modalities", label: "Modalidades", icon: Activity },
    { href: "/gym/classes", label: "Turmas", icon: Calendar },
    { href: "/gym/teachers", label: "Professores", icon: GraduationCap },
  ]},
  { title: "Gestão", items: [
    { href: "/gym/financial", label: "Financeiro", icon: DollarSign },
    { href: "/gym/communication", label: "Comunicação", icon: MessageSquare },
    { href: "/gym/reports", label: "Relatórios", icon: BarChart3 },
    { href: "/gym/settings", label: "Configurações", icon: Settings },
  ]},
];

export default function GymLayout({ children }: { children: React.ReactNode }) {
  return <DashShell nav={NAV} brand="Academia" subBrand="Iron Pump Academy" requireRole="gym_admin">{children}</DashShell>;
}
