import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Ricardo Almeida",
    role: "CEO • Iron Pump Academy",
    avatar: "RA",
    rating: 5,
    text: "Antes do BilyFit, eu fechava o mês no susto. Hoje sei exatamente quanto vou faturar antes da segunda-feira. Receita subiu 41% em 4 meses.",
  },
  {
    name: "Marina Souza",
    role: "Dona • BodyUp Fitness",
    avatar: "MS",
    rating: 5,
    text: "A integração com WhatsApp é mágica. Minha inadimplência caiu de 12% para 3% sem eu ter que ligar pra ninguém. Pago o sistema em 2 dias de mensalidade.",
  },
  {
    name: "Carlos Mendes",
    role: "Fundador • Power House Gym",
    avatar: "CM",
    rating: 5,
    text: "Gerenciamos 4 unidades em 2 estados pelo BilyFit. O multiempresa funciona de verdade — comparo unidades em segundos, decido em minutos.",
  },
  {
    name: "Felipe Ramos",
    role: "Sócio • Cross Forge",
    avatar: "FR",
    rating: 5,
    text: "O app do aluno engaja mais que minha campanha de Instagram. Treino + check-in + pagamento no mesmo lugar. Os clientes ficam por mais tempo.",
  },
  {
    name: "Patricia Lima",
    role: "Diretora • Move Studio",
    avatar: "PL",
    rating: 5,
    text: "Migrei de uma planilha gigante e nunca mais olhei pra trás. Onboarding em 1 tarde, suporte que responde em minutos. Recomendo de olhos fechados.",
  },
  {
    name: "Gabriel Costa",
    role: "CEO • Atlas Strength Co.",
    avatar: "GC",
    rating: 5,
    text: "Os relatórios do BilyFit me deram informação que eu não tinha em 12 anos de academia. Hoje tomo decisão por dado, não por achismo.",
  },
];

export function Testimonials() {
  return (
    <section className="py-28 relative">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <span className="chip mb-4">Depoimentos</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            Mais de <span className="text-brand">800 academias</span> já transformaram a operação
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2 text-subtle">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={18} className="fill-brand text-brand" />)}
            </div>
            <span>4.9/5 • 612 avaliações verificadas</span>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="card-3d p-6 relative">
              <Quote size={28} className="text-brand/20 absolute top-4 right-4" />
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-brand flex items-center justify-center font-bold text-black">{t.avatar}</div>
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-dim">{t.role}</div>
                </div>
              </div>
              <div className="mt-3 flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={14} className="fill-brand text-brand" />)}
              </div>
              <p className="mt-4 text-subtle leading-relaxed">"{t.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
