import {
  ArrowRight,
  BarChart3,
  CalendarCheck,
  CheckCircle2,
  CircleDot,
  Handshake,
  Lightbulb,
  MessageCircle,
  Send,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

const GOALS = [
  { label: "Ativações", value: "200", icon: Users, tone: "text-sky-600 bg-sky-500/10" },
  { label: "Conversas", value: "70", icon: MessageCircle, tone: "text-violet-600 bg-violet-500/10" },
  { label: "Orienta+", value: "20", icon: CalendarCheck, tone: "text-amber-600 bg-amber-500/10" },
  { label: "Propostas", value: "8", icon: Send, tone: "text-rose-600 bg-rose-500/10" },
  { label: "Fechamentos", value: "2–3", icon: TrendingUp, tone: "text-emerald-600 bg-emerald-500/10" },
];

const MODULES = [
  { code: "S1", title: "Gerar", text: "Criar oportunidades de conversa.", icon: Users },
  { code: "S2", title: "Conectar", text: "Transformar atenção em relacionamento.", icon: MessageCircle },
  { code: "S3", title: "Descobrir", text: "Identificar contexto, dor e intenção.", icon: CircleDot },
  { code: "S4", title: "Diagnosticar", text: "Usar o Orienta+ para aprofundar.", icon: Lightbulb },
  { code: "S5", title: "Direcionar", text: "Mapear oportunidade e prioridade.", icon: Target },
  { code: "S6", title: "Converter", text: "Oferta, proposta e fechamento.", icon: Handshake },
  { code: "S7", title: "Aprender", text: "Transformar dados em inteligência.", icon: BarChart3 },
];

const PIPELINE = [
  ["Novo contato", "Origem e segmento registrados"],
  ["Ativado", "Primeira abordagem enviada"],
  ["Respondeu", "Conversa iniciada"],
  ["Qualificação", "C1 a C5 registrados"],
  ["Qualificado", "Q2 ou Q3"],
  ["Orienta+ agendado", "Data e decisor confirmados"],
  ["Orienta+ realizado", "Diagnóstico salvo"],
  ["Oportunidade", "Impacto, urgência e solução"],
  ["Proposta", "Escopo e investimento enviados"],
  ["Negociação", "Objeção e decisor registrados"],
  ["Fechado", "Onboarding para entrega"],
] as const;

const DAYS = [
  ["01", "Preparar", "CRM, listas, ICP e primeiras ativações"],
  ["02", "Conectar", "Social selling e conversas"],
  ["03", "Qualificar", "Problemas, necessidade e intenção"],
  ["04", "Diagnosticar", "Aumentar a agenda do Orienta+"],
  ["05", "Ofertar", "Propostas e revisão intermediária"],
  ["06", "Otimizar", "Dobrar o que funciona"],
  ["07", "Indicar", "Parceiros, clientes e rede"],
  ["08", "Converter", "Propostas, objeções e negociação"],
  ["09", "Recuperar", "Retomadas e novas conversas"],
  ["10", "Aprender", "Fechamento e inteligência"],
] as const;

export function SprintComercial() {
  return (
    <div className="space-y-8 px-5 py-6 md:px-8 md:py-8">
      <section className="overflow-hidden rounded-3xl border border-primary/20 bg-primary/10 p-6 md:p-8">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">10 dias úteis</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">Sprint Comercial Orientohub</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground md:text-base">
            Uma máquina de geração, diagnóstico e conversão de oportunidades. O Orienta+ é a ponte entre a dor percebida e a solução certa do OrientoHub.
          </p>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {GOALS.map(({ label, value, icon: Icon, tone }) => (
            <div key={label} className="rounded-2xl border border-border/60 bg-background/70 p-3 backdrop-blur">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${tone}`}><Icon className="h-4 w-4" /></div>
              <div className="mt-3 text-xl font-bold">{value}</div>
              <div className="text-xs text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-primary">Arquitetura operacional</p>
            <h3 className="mt-1 text-lg font-bold">Do primeiro sinal à inteligência comercial</h3>
          </div>
          <span className="hidden text-xs text-muted-foreground md:block">Cada módulo deixa um dado para a próxima decisão.</span>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-7">
          {MODULES.map(({ code, title, text, icon: Icon }, index) => (
            <div key={code} className="relative rounded-2xl border border-border/70 bg-card/70 p-4">
              <div className="flex items-center justify-between"><span className="text-xs font-bold text-primary">{code}</span><Icon className="h-4 w-4 text-muted-foreground" /></div>
              <h4 className="mt-5 font-bold">{title}</h4>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">{text}</p>
              {index < MODULES.length - 1 && <ArrowRight className="absolute -right-4 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 rounded-full bg-background p-1 text-primary xl:block" />}
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-3xl border border-border bg-card/70 p-5 md:p-6">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-primary/10 p-2 text-primary"><Lightbulb className="h-5 w-5" /></div>
            <div><p className="text-xs font-bold uppercase tracking-wider text-primary">A ponte</p><h3 className="mt-1 text-lg font-bold">Como o Orienta+ abre caminho para o OrientoHub</h3></div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-4">
            {[
              ["1", "Dor", "O empreendedor relata o que está travando."],
              ["2", "Diagnóstico", "O Orienta+ esclarece cenário e gargalos."],
              ["3", "Prioridade", "Mapeia o problema que vale resolver agora."],
              ["4", "Solução", "O OrientoHub propõe um próximo passo focal."],
            ].map(([number, title, text], index) => (
              <div key={number} className="relative rounded-xl bg-secondary/45 p-3">
                <span className="text-xs font-bold text-primary">0{number}</span>
                <h4 className="mt-3 text-sm font-bold">{title}</h4>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{text}</p>
                {index < 3 && <ArrowRight className="absolute -right-4 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 rounded-full bg-card p-1 text-primary sm:block" />}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-amber-500/25 bg-amber-500/5 p-5 md:p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-700">Regra central</p>
          <h3 className="mt-2 text-xl font-bold">Nenhum lead sem próxima ação.</h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Em cada etapa, registre o status atual, a data e a ação que fará a oportunidade avançar.</p>
          <div className="mt-5 rounded-xl border border-amber-500/20 bg-background/60 p-3 text-xs"><strong>Status:</strong> proposta enviada<br /><strong>Próxima ação:</strong> follow-up em 24 horas</div>
        </div>
      </section>

      <section className="rounded-3xl border border-border bg-card/70 p-5 md:p-6">
        <div><p className="text-xs font-bold uppercase tracking-wider text-primary">Pipeline no CRM</p><h3 className="mt-1 text-lg font-bold">O que precisa acontecer para avançar</h3></div>
        <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {PIPELINE.map(([stage, condition], index) => (
            <div key={stage} className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/55 p-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{index + 1}</span>
              <div><h4 className="text-sm font-bold">{stage}</h4><p className="mt-1 text-xs leading-5 text-muted-foreground">{condition}</p></div>
            </div>
          ))}
          <div className="flex items-start gap-3 rounded-xl border border-dashed border-muted-foreground/40 bg-muted/30 p-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" /><div><h4 className="text-sm font-bold">Nutrição ou perdido</h4><p className="mt-1 text-xs leading-5 text-muted-foreground">Motivo e data de retomada registrados.</p></div></div>
        </div>
      </section>

      <section>
        <p className="text-xs font-bold uppercase tracking-wider text-primary">Ritmo da Sprint</p>
        <h3 className="mt-1 text-lg font-bold">Plano de 10 dias úteis</h3>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
          {DAYS.map(([day, title, text]) => (
            <div key={day} className="rounded-2xl border border-border/70 bg-card/70 p-4"><span className="text-xl font-bold text-primary">{day}</span><h4 className="mt-4 font-bold">{title}</h4><p className="mt-1 text-xs leading-5 text-muted-foreground">{text}</p></div>
          ))}
        </div>
      </section>
    </div>
  );
}
