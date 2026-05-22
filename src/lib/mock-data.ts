// Mock data for BilyFit demo

export type Role = "ceo" | "gym_admin" | "gym_staff" | "teacher" | "student";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  gymId?: string;
  avatar?: string;
  phone?: string;
  createdAt: string;
}

export const USERS: User[] = [
  { id: "u-ceo-1", name: "Jesse de Paula", email: "jessesdepaula@gmail.com", password: "je98871688", role: "ceo", phone: "+55 11 99999-0001", createdAt: "2024-01-10" },
  { id: "u-ceo-2", name: "CEO Demo", email: "ceo@bilyfit.com", password: "bilyfit123", role: "ceo", phone: "+55 11 99999-0002", createdAt: "2024-01-15" },
  { id: "u-gym-1", name: "Ricardo Almeida", email: "admin@academia.com", password: "academia123", role: "gym_admin", gymId: "g-1", phone: "+55 11 98888-1111", createdAt: "2024-02-01" },
  { id: "u-gym-2", name: "Marina Souza", email: "marina@bodyup.com", password: "bodyup123", role: "gym_admin", gymId: "g-2", phone: "+55 11 98888-2222", createdAt: "2024-03-10" },
  { id: "u-stu-1", name: "Lucas Pereira", email: "aluno@bilyfit.com", password: "aluno123", role: "student", gymId: "g-1", phone: "+55 11 97777-1111", createdAt: "2024-05-12" },
];

export interface Gym {
  id: string;
  name: string;
  owner: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  students: number;
  units: number;
  plan: "starter" | "pro" | "enterprise";
  status: "active" | "trial" | "overdue" | "canceled";
  mrr: number;
  joinedAt: string;
  logo?: string;
}

export const GYMS: Gym[] = [
  { id: "g-1", name: "Iron Pump Academy", owner: "Ricardo Almeida", email: "admin@academia.com", phone: "+55 11 98888-1111", city: "São Paulo", state: "SP", students: 842, units: 2, plan: "pro", status: "active", mrr: 599, joinedAt: "2024-02-01" },
  { id: "g-2", name: "BodyUp Fitness", owner: "Marina Souza", email: "marina@bodyup.com", phone: "+55 11 98888-2222", city: "Campinas", state: "SP", students: 421, units: 1, plan: "starter", status: "active", mrr: 199, joinedAt: "2024-03-10" },
  { id: "g-3", name: "Power House Gym", owner: "Carlos Mendes", email: "carlos@powerhouse.com", phone: "+55 21 97777-3333", city: "Rio de Janeiro", state: "RJ", students: 1640, units: 4, plan: "enterprise", status: "active", mrr: 1499, joinedAt: "2023-11-22" },
  { id: "g-4", name: "Elite Performance", owner: "Ana Beatriz", email: "ana@elitep.com", phone: "+55 31 96666-4444", city: "Belo Horizonte", state: "MG", students: 312, units: 1, plan: "starter", status: "trial", mrr: 0, joinedAt: "2025-04-30" },
  { id: "g-5", name: "Cross Forge", owner: "Felipe Ramos", email: "felipe@crossforge.com", phone: "+55 41 95555-5555", city: "Curitiba", state: "PR", students: 562, units: 2, plan: "pro", status: "overdue", mrr: 599, joinedAt: "2024-06-18" },
  { id: "g-6", name: "Move Studio", owner: "Patricia Lima", email: "patricia@move.com", phone: "+55 11 94444-6666", city: "Santo André", state: "SP", students: 198, units: 1, plan: "starter", status: "active", mrr: 199, joinedAt: "2024-09-03" },
  { id: "g-7", name: "Atlas Strength Co.", owner: "Gabriel Costa", email: "gabriel@atlas.com", phone: "+55 51 93333-7777", city: "Porto Alegre", state: "RS", students: 905, units: 3, plan: "pro", status: "active", mrr: 599, joinedAt: "2024-01-15" },
  { id: "g-8", name: "Studio 360", owner: "Renata Oliveira", email: "renata@studio360.com", phone: "+55 61 92222-8888", city: "Brasília", state: "DF", students: 287, units: 1, plan: "starter", status: "canceled", mrr: 0, joinedAt: "2024-07-22" },
];

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  birthDate: string;
  plan: string;
  status: "active" | "overdue" | "inactive" | "frozen";
  joinedAt: string;
  lastCheckin: string | null;
  totalCheckins: number;
  monthlyFee: number;
  paymentStatus: "paid" | "pending" | "overdue";
  goal: string;
  trainer: string;
  gymId: string;
  avatar?: string;
}

const studentNames = [
  "Lucas Pereira", "Mariana Costa", "Felipe Souza", "Camila Rocha", "Bruno Martins",
  "Júlia Almeida", "Pedro Santos", "Beatriz Lima", "Rafael Oliveira", "Larissa Mendes",
  "Gabriel Ribeiro", "Carolina Fernandes", "Diego Carvalho", "Amanda Nascimento", "Thiago Gomes",
  "Isabela Araújo", "Vinicius Ferreira", "Letícia Cardoso", "Rodrigo Barbosa", "Natália Pinto",
  "Eduardo Ramos", "Fernanda Castro", "Marcelo Dias", "Patrícia Moreira", "André Lopes",
  "Renata Vieira", "Leandro Teixeira", "Bianca Correia", "Henrique Pinheiro", "Sabrina Rezende",
];

const plansList = ["Mensal", "Trimestral", "Semestral", "Anual", "Black"];
const goals = ["Hipertrofia", "Emagrecimento", "Condicionamento", "Saúde", "Performance"];
const trainers = ["Prof. Marcos", "Prof. Daniela", "Prof. Henrique", "Prof. Carla", "Prof. Bruno"];

export const STUDENTS: Student[] = studentNames.map((name, i) => {
  const status = i % 11 === 0 ? "frozen" : i % 7 === 0 ? "inactive" : i % 5 === 0 ? "overdue" : "active";
  const paymentStatus = status === "overdue" ? "overdue" : i % 8 === 0 ? "pending" : "paid";
  const fee = [89, 129, 159, 199, 249][i % 5];
  const lastCheckinDays = i % 13;
  const last = new Date();
  last.setDate(last.getDate() - lastCheckinDays);
  return {
    id: `s-${i + 1}`,
    name,
    email: name.toLowerCase().replace(/ /g, ".") + "@email.com",
    phone: `+55 11 9${String(10000000 + i * 137).padStart(8, "0")}`,
    cpf: `${String(100 + i)}.${String(200 + i)}.${String(300 + i)}-0${i % 10}`,
    birthDate: `19${85 + (i % 15)}-0${1 + (i % 9)}-${10 + (i % 18)}`,
    plan: plansList[i % plansList.length],
    status,
    joinedAt: `2024-0${1 + (i % 9)}-${10 + (i % 18)}`,
    lastCheckin: status === "inactive" ? null : last.toISOString(),
    totalCheckins: 50 + i * 17,
    monthlyFee: fee,
    paymentStatus,
    goal: goals[i % goals.length],
    trainer: trainers[i % trainers.length],
    gymId: "g-1",
  };
});

export interface Payment {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  method: "pix" | "card" | "boleto" | "cash";
  status: "paid" | "pending" | "overdue" | "refunded";
  dueDate: string;
  paidAt: string | null;
  description: string;
}

export const PAYMENTS: Payment[] = Array.from({ length: 40 }).map((_, i) => {
  const s = STUDENTS[i % STUDENTS.length];
  const status = (["paid", "paid", "paid", "pending", "overdue", "paid"] as const)[i % 6];
  const due = new Date();
  due.setDate(due.getDate() - i * 2);
  return {
    id: `p-${i + 1}`,
    studentId: s.id,
    studentName: s.name,
    amount: s.monthlyFee,
    method: (["pix", "card", "boleto", "cash"] as const)[i % 4],
    status,
    dueDate: due.toISOString(),
    paidAt: status === "paid" ? due.toISOString() : null,
    description: `Mensalidade ${s.plan} — ${s.name}`,
  };
});

export interface Expense {
  id: string;
  category: string;
  description: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
  supplier: string;
}

export const EXPENSES: Expense[] = [
  { id: "e-1", category: "Aluguel", description: "Aluguel sede", amount: 12000, dueDate: "2026-05-05", status: "paid", supplier: "Imobiliária Prime" },
  { id: "e-2", category: "Energia", description: "Conta de luz", amount: 3400, dueDate: "2026-05-12", status: "paid", supplier: "Enel" },
  { id: "e-3", category: "Salários", description: "Folha de pagamento", amount: 38500, dueDate: "2026-05-05", status: "paid", supplier: "Folha Interna" },
  { id: "e-4", category: "Marketing", description: "Anúncios Meta + Google", amount: 5200, dueDate: "2026-05-15", status: "paid", supplier: "Meta/Google" },
  { id: "e-5", category: "Equipamentos", description: "Manutenção esteiras", amount: 1800, dueDate: "2026-05-22", status: "pending", supplier: "TechFit" },
  { id: "e-6", category: "Limpeza", description: "Produtos de limpeza", amount: 760, dueDate: "2026-05-18", status: "paid", supplier: "CleanPro" },
  { id: "e-7", category: "Internet", description: "Fibra 1Gb", amount: 480, dueDate: "2026-05-10", status: "paid", supplier: "Vivo Empresarial" },
  { id: "e-8", category: "Software", description: "BilyFit Pro", amount: 599, dueDate: "2026-05-01", status: "paid", supplier: "BilyFit" },
];

export interface Checkin {
  id: string;
  studentId: string;
  studentName: string;
  timestamp: string;
  method: "qr" | "manual" | "biometric";
  status: "ok" | "blocked";
  reason?: string;
}

export const CHECKINS: Checkin[] = Array.from({ length: 30 }).map((_, i) => {
  const s = STUDENTS[i % STUDENTS.length];
  const ts = new Date();
  ts.setMinutes(ts.getMinutes() - i * 17);
  const blocked = s.status === "overdue" && i % 5 === 0;
  return {
    id: `c-${i + 1}`,
    studentId: s.id,
    studentName: s.name,
    timestamp: ts.toISOString(),
    method: (["qr", "manual", "biometric"] as const)[i % 3],
    status: blocked ? "blocked" : "ok",
    reason: blocked ? "Mensalidade em atraso" : undefined,
  };
});

export interface Teacher {
  id: string;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  studentsCount: number;
  rating: number;
  status: "active" | "vacation" | "inactive";
}

export const TEACHERS: Teacher[] = [
  { id: "t-1", name: "Marcos Vinícius", specialty: "Musculação / Hipertrofia", email: "marcos@academia.com", phone: "+55 11 97777-0001", studentsCount: 84, rating: 4.9, status: "active" },
  { id: "t-2", name: "Daniela Castro", specialty: "Pilates / Mobilidade", email: "daniela@academia.com", phone: "+55 11 97777-0002", studentsCount: 56, rating: 4.8, status: "active" },
  { id: "t-3", name: "Henrique Souza", specialty: "CrossTraining", email: "henrique@academia.com", phone: "+55 11 97777-0003", studentsCount: 72, rating: 4.7, status: "active" },
  { id: "t-4", name: "Carla Mendes", specialty: "Funcional / Emagrecimento", email: "carla@academia.com", phone: "+55 11 97777-0004", studentsCount: 63, rating: 4.9, status: "vacation" },
  { id: "t-5", name: "Bruno Tavares", specialty: "Boxe / Muay Thai", email: "bruno@academia.com", phone: "+55 11 97777-0005", studentsCount: 48, rating: 4.6, status: "active" },
  { id: "t-6", name: "Patrícia Lopes", specialty: "Yoga / Alongamento", email: "patricia@academia.com", phone: "+55 11 97777-0006", studentsCount: 39, rating: 4.8, status: "active" },
];

export interface Modality {
  id: string;
  name: string;
  description: string;
  icon: string;
  classesCount: number;
  studentsCount: number;
  color: string;
}

export const MODALITIES: Modality[] = [
  { id: "m-1", name: "Musculação", description: "Treino com pesos para hipertrofia e força", icon: "Dumbbell", classesCount: 12, studentsCount: 540, color: "#F5D90A" },
  { id: "m-2", name: "Funcional", description: "Treino funcional de alta intensidade", icon: "Activity", classesCount: 18, studentsCount: 220, color: "#22C55E" },
  { id: "m-3", name: "Pilates", description: "Fortalecimento e mobilidade", icon: "Heart", classesCount: 14, studentsCount: 140, color: "#EC4899" },
  { id: "m-4", name: "CrossTraining", description: "WOD diário com programação variada", icon: "Zap", classesCount: 20, studentsCount: 180, color: "#F59E0B" },
  { id: "m-5", name: "Boxe", description: "Boxe e defesa pessoal", icon: "Swords", classesCount: 10, studentsCount: 95, color: "#EF4444" },
  { id: "m-6", name: "Yoga", description: "Equilíbrio mente e corpo", icon: "Flower2", classesCount: 8, studentsCount: 76, color: "#A855F7" },
  { id: "m-7", name: "Spinning", description: "Aulas de ciclismo indoor", icon: "Bike", classesCount: 12, studentsCount: 110, color: "#38BDF8" },
  { id: "m-8", name: "Natação", description: "Natação e hidroginástica", icon: "Waves", classesCount: 6, studentsCount: 64, color: "#06B6D4" },
];

export interface ClassRow {
  id: string;
  modality: string;
  teacher: string;
  day: string;
  time: string;
  capacity: number;
  enrolled: number;
  room: string;
}

export const CLASSES: ClassRow[] = [
  { id: "cl-1", modality: "Musculação", teacher: "Marcos Vinícius", day: "Seg-Sex", time: "06:00 - 22:00", capacity: 80, enrolled: 64, room: "Sala Principal" },
  { id: "cl-2", modality: "Funcional", teacher: "Carla Mendes", day: "Seg/Qua/Sex", time: "07:00", capacity: 20, enrolled: 18, room: "Box 1" },
  { id: "cl-3", modality: "Funcional", teacher: "Carla Mendes", day: "Seg/Qua/Sex", time: "19:00", capacity: 20, enrolled: 20, room: "Box 1" },
  { id: "cl-4", modality: "Pilates", teacher: "Daniela Castro", day: "Ter/Qui", time: "08:00", capacity: 12, enrolled: 10, room: "Studio Pilates" },
  { id: "cl-5", modality: "Pilates", teacher: "Daniela Castro", day: "Ter/Qui", time: "18:30", capacity: 12, enrolled: 12, room: "Studio Pilates" },
  { id: "cl-6", modality: "CrossTraining", teacher: "Henrique Souza", day: "Seg-Sáb", time: "06:30 / 19:30", capacity: 16, enrolled: 14, room: "Box CT" },
  { id: "cl-7", modality: "Boxe", teacher: "Bruno Tavares", day: "Seg/Qua/Sex", time: "20:00", capacity: 24, enrolled: 18, room: "Ring" },
  { id: "cl-8", modality: "Yoga", teacher: "Patrícia Lopes", day: "Ter/Qui/Sáb", time: "07:30", capacity: 16, enrolled: 12, room: "Sala Zen" },
  { id: "cl-9", modality: "Spinning", teacher: "Henrique Souza", day: "Seg-Sex", time: "06:00 / 19:00", capacity: 22, enrolled: 19, room: "Sala Bike" },
];

export interface Workout {
  id: string;
  name: string;
  studentId: string;
  studentName: string;
  trainer: string;
  goal: string;
  weeks: number;
  exercises: number;
  createdAt: string;
}

export const WORKOUTS: Workout[] = STUDENTS.slice(0, 12).map((s, i) => ({
  id: `w-${i + 1}`,
  name: ["Ficha A - Peito/Tríceps", "Ficha B - Costas/Bíceps", "Ficha C - Pernas/Glúteos", "Ficha Full Body", "ABC + Cardio"][i % 5],
  studentId: s.id,
  studentName: s.name,
  trainer: s.trainer,
  goal: s.goal,
  weeks: 4 + (i % 8),
  exercises: 8 + (i % 6),
  createdAt: s.joinedAt,
}));

export interface Assessment {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  weight: number;
  height: number;
  bodyFat: number;
  muscleMass: number;
  bmi: number;
  evaluator: string;
}

export const ASSESSMENTS: Assessment[] = STUDENTS.slice(0, 10).map((s, i) => ({
  id: `a-${i + 1}`,
  studentId: s.id,
  studentName: s.name,
  date: s.joinedAt,
  weight: 65 + (i * 1.4),
  height: 1.65 + (i % 5) * 0.04,
  bodyFat: 18 + (i % 7) * 0.8,
  muscleMass: 32 + (i % 6) * 1.2,
  bmi: 22 + (i % 5) * 0.6,
  evaluator: TEACHERS[i % TEACHERS.length].name,
}));

export interface Message {
  id: string;
  to: string | "all";
  subject: string;
  channel: "email" | "whatsapp" | "push";
  status: "sent" | "scheduled" | "draft";
  sentAt: string;
  opens: number;
  clicks: number;
}

export const MESSAGES: Message[] = [
  { id: "msg-1", to: "all", subject: "🔥 Black Week BilyFit — 30% OFF nas anuidades", channel: "whatsapp", status: "sent", sentAt: "2026-05-15", opens: 842, clicks: 312 },
  { id: "msg-2", to: "Inadimplentes (42)", subject: "Sua matrícula está em risco de bloqueio", channel: "email", status: "sent", sentAt: "2026-05-14", opens: 38, clicks: 18 },
  { id: "msg-3", to: "Alunos ativos", subject: "Nova aula de Funcional na grade!", channel: "push", status: "sent", sentAt: "2026-05-12", opens: 612, clicks: 188 },
  { id: "msg-4", to: "Aniversariantes do mês", subject: "🎂 Feliz aniversário, parceiro!", channel: "whatsapp", status: "scheduled", sentAt: "2026-05-22", opens: 0, clicks: 0 },
];

export interface SupportTicket {
  id: string;
  gymName: string;
  subject: string;
  category: "bug" | "feature" | "billing" | "question";
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "in_progress" | "waiting" | "closed";
  createdAt: string;
  assignee: string;
}

export const TICKETS: SupportTicket[] = [
  { id: "tk-1", gymName: "Iron Pump Academy", subject: "Erro ao gerar boleto em lote", category: "bug", priority: "high", status: "in_progress", createdAt: "2026-05-19", assignee: "Equipe Tech" },
  { id: "tk-2", gymName: "Power House Gym", subject: "Integração com catraca XYZ", category: "feature", priority: "medium", status: "open", createdAt: "2026-05-18", assignee: "Produto" },
  { id: "tk-3", gymName: "BodyUp Fitness", subject: "Dúvida sobre upgrade de plano", category: "billing", priority: "low", status: "closed", createdAt: "2026-05-17", assignee: "Comercial" },
  { id: "tk-4", gymName: "Cross Forge", subject: "Não recebi a fatura de maio", category: "billing", priority: "urgent", status: "waiting", createdAt: "2026-05-16", assignee: "Financeiro" },
  { id: "tk-5", gymName: "Atlas Strength Co.", subject: "Como cadastrar professor convidado?", category: "question", priority: "low", status: "closed", createdAt: "2026-05-15", assignee: "Sucesso" },
];

export interface PlatformPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  maxStudents: number;
  maxUnits: number;
  highlighted?: boolean;
}

export const PLATFORM_PLANS: PlatformPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 199,
    maxStudents: 300,
    maxUnits: 1,
    features: [
      "Até 300 alunos ativos",
      "1 unidade",
      "Check-in QR Code",
      "Controle financeiro básico",
      "Suporte por e-mail",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 599,
    maxStudents: 1500,
    maxUnits: 3,
    highlighted: true,
    features: [
      "Até 1.500 alunos ativos",
      "Até 3 unidades",
      "Check-in QR + Catraca + Biometria",
      "Financeiro completo + Fluxo de caixa",
      "Avaliações físicas ilimitadas",
      "Integração WhatsApp",
      "Relatórios avançados",
      "Suporte prioritário",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 1499,
    maxStudents: 99999,
    maxUnits: 99,
    features: [
      "Alunos ilimitados",
      "Unidades ilimitadas",
      "API + Webhooks + SSO",
      "BI dedicado + Dashboards customizados",
      "Gerente de conta dedicado",
      "SLA 99.9% + Onboarding white-glove",
      "Multiempresa avançado",
    ],
  },
];

export interface Invoice {
  id: string;
  gymName: string;
  gymId: string;
  amount: number;
  status: "paid" | "open" | "overdue" | "void";
  issuedAt: string;
  dueAt: string;
  paidAt: string | null;
  number: string;
}

export const INVOICES: Invoice[] = GYMS.flatMap((g, gi) =>
  Array.from({ length: 4 }).map((_, i) => {
    const issued = new Date();
    issued.setMonth(issued.getMonth() - i);
    const status = (["paid", "paid", "paid", i === 0 && g.status === "overdue" ? "overdue" : "paid"] as const)[i];
    return {
      id: `inv-${g.id}-${i}`,
      gymName: g.name,
      gymId: g.id,
      amount: g.mrr || 199,
      status,
      number: `BF-${String(2026 - (i > 0 ? 0 : 0)).padStart(4, "0")}-${String(gi * 4 + i + 1).padStart(5, "0")}`,
      issuedAt: issued.toISOString(),
      dueAt: issued.toISOString(),
      paidAt: status === "paid" ? issued.toISOString() : null,
    };
  })
);

// Chart data
export const REVENUE_TREND = [
  { month: "Nov", mrr: 18400, students: 4120 },
  { month: "Dez", mrr: 21200, students: 4680 },
  { month: "Jan", mrr: 24300, students: 5210 },
  { month: "Fev", mrr: 27100, students: 5640 },
  { month: "Mar", mrr: 30500, students: 6120 },
  { month: "Abr", mrr: 32800, students: 6580 },
  { month: "Mai", mrr: 36420, students: 7180 },
];

export const GYM_REVENUE = [
  { month: "Nov", revenue: 62000, expenses: 41000 },
  { month: "Dez", revenue: 78000, expenses: 44000 },
  { month: "Jan", revenue: 71000, expenses: 43000 },
  { month: "Fev", revenue: 74500, expenses: 42500 },
  { month: "Mar", revenue: 82000, expenses: 46000 },
  { month: "Abr", revenue: 88500, expenses: 47000 },
  { month: "Mai", revenue: 94200, expenses: 49500 },
];

export const CHECKIN_HEATMAP = [
  { day: "Seg", h6: 38, h10: 22, h12: 18, h16: 28, h18: 64, h20: 72, h22: 24 },
  { day: "Ter", h6: 42, h10: 24, h12: 16, h16: 26, h18: 68, h20: 74, h22: 22 },
  { day: "Qua", h6: 40, h10: 26, h12: 20, h16: 30, h18: 70, h20: 78, h22: 26 },
  { day: "Qui", h6: 44, h10: 22, h12: 18, h16: 32, h18: 66, h20: 70, h22: 20 },
  { day: "Sex", h6: 36, h10: 20, h12: 14, h16: 24, h18: 60, h20: 62, h22: 18 },
  { day: "Sáb", h6: 28, h10: 48, h12: 32, h16: 20, h18: 18, h20: 14, h22: 8 },
  { day: "Dom", h6: 12, h10: 18, h12: 10, h16: 8, h18: 6, h20: 4, h22: 2 },
];

export const STUDENT_DISTRIBUTION = [
  { name: "Musculação", value: 540, color: "#F5D90A" },
  { name: "Funcional", value: 220, color: "#22C55E" },
  { name: "CrossTraining", value: 180, color: "#F59E0B" },
  { name: "Pilates", value: 140, color: "#EC4899" },
  { name: "Spinning", value: 110, color: "#38BDF8" },
  { name: "Outros", value: 235, color: "#A855F7" },
];
