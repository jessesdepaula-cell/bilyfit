import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Instagram, Linkedin, Youtube, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border pt-16 pb-10">
      <div className="container">
        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Logo size={32} />
            <p className="mt-4 text-subtle max-w-sm">
              O sistema operacional das academias modernas. Gestão, finanças, check-in e comunidade em um único lugar.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[Instagram, Linkedin, Youtube, Twitter].map((I, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl glass flex items-center justify-center text-subtle hover:text-brand hover:border-brand/40 transition-colors">
                  <I size={16} />
                </a>
              ))}
            </div>
          </div>
          {[
            { title: "Produto", links: [["Recursos", "#features"], ["Demonstração", "#demo"], ["Planos", "#pricing"], ["App do aluno", "#"]] },
            { title: "Empresa", links: [["Sobre", "#"], ["Carreiras", "#"], ["Imprensa", "#"], ["Parceiros", "#"]] },
            { title: "Suporte", links: [["Central de ajuda", "#"], ["Status", "#"], ["Contato", "#"], ["API", "#"]] },
          ].map((col) => (
            <div key={col.title}>
              <div className="font-display font-semibold mb-4">{col.title}</div>
              <ul className="space-y-2.5 text-sm">
                {col.links.map(([label, href]) => (
                  <li key={label}><Link href={href} className="text-subtle hover:text-brand transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-dim">
          <p>© {new Date().getFullYear()} BilyFit. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">Privacidade</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Termos</Link>
            <Link href="#" className="hover:text-foreground transition-colors">LGPD</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
