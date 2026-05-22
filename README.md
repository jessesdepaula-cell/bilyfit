# BilyFit — SaaS de gestão para academias

Plataforma SaaS premium para academias modernas. Construída com Next.js 14, TypeScript, Tailwind CSS e Recharts.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + tailwindcss-animate
- Recharts (gráficos) + Lucide (ícones)
- Sonner (toasts)
- Mock data 100% client-side para demonstração

## Credenciais demo

| Perfil          | E-mail                       | Senha          | Acessa        |
| --------------- | ---------------------------- | -------------- | ------------- |
| CEO BilyFit     | jessesdepaula@gmail.com      | je98871688     | `/admin`      |
| CEO BilyFit     | ceo@bilyfit.com              | bilyfit123     | `/admin`      |
| Admin Academia  | admin@academia.com           | academia123    | `/gym`        |
| Aluno           | aluno@bilyfit.com            | aluno123       | `/portal`     |

## Desenvolvimento

```bash
npm install
npm run dev
```

Aplicação em http://localhost:3000

## Rotas principais

- `/` Landing page comercial
- `/login` `/signup` `/forgot` Autenticação
- `/admin/*` Painel CEO BilyFit (9 módulos)
- `/gym/*` Painel da Academia (13 módulos)
- `/portal/*` Portal do Aluno

## Estrutura

```
src/
├─ app/
│  ├─ page.tsx                 # Landing
│  ├─ login|signup|forgot/     # Auth
│  ├─ admin/                   # Painel CEO
│  ├─ gym/                     # Painel academia
│  └─ portal/                  # Portal aluno
├─ components/
│  ├─ landing/                 # Seções da home
│  └─ dashboard/               # Shell + tabela + gráficos
└─ lib/
   ├─ mock-data.ts             # Dados fictícios
   ├─ auth.ts                  # Sessão localStorage
   └─ utils.ts
```

## Deploy

Aplicação preparada para Vercel. Não há variáveis de ambiente obrigatórias.

```bash
vercel --prod
```
