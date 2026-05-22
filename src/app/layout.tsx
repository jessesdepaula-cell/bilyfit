import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });

export const metadata: Metadata = {
  title: "BilyFit — Gestão de Academias",
  description: "Plataforma SaaS premium para gestão completa de academias. Alunos, financeiro, check-in, planos, treinos e muito mais.",
  metadataBase: new URL("https://bilyfit.app"),
  openGraph: { title: "BilyFit", description: "A plataforma definitiva para academias modernas." },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${space.variable} dark`} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
        <Toaster theme="dark" position="top-right" toastOptions={{ style: { background: "#161618", border: "1px solid #2A2A2E", color: "#F5F5F7" } }} />
      </body>
    </html>
  );
}
