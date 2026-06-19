export type PaymentMethod =
  | "a_vista"
  | "parcelado"
  | "recorrente_mensal"
  | "recorrente_anual"
  | "permuta"
  | "outro";

export type ProposalStatus = "rascunho" | "enviada" | "aceita" | "recusada";

export type ProposalItemStatus = "proposto" | "aprovado" | "em_execucao" | "entregue" | "cancelado";

export type WhatsAppScript = {
  id: string;
  titulo: string;
  categoria: string;
  mensagem: string;
  observacao?: string | null;
};

export type ServiceCatalog = {
  id: string;
  nome: string;
  descricao: string | null;
  valor_padrao: number | null;
  prazo_dias: number | null;
  entregaveis: string[];
  scripts_whatsapp: WhatsAppScript[];
  forma_pagamento_padrao: PaymentMethod | null;
  parcelas_padrao: number | null;
  ativo: boolean;
  created_at: string;
  updated_at: string;
};

type ServiceScriptSource = Pick<
  ServiceCatalog,
  "nome" | "descricao" | "entregaveis" | "valor_padrao" | "prazo_dias"
>;

export type LeadProposal = {
  id: string;
  lead_id: string;
  titulo: string;
  status: ProposalStatus;
  valor_total: number;
  observacoes: string | null;
  sent_at: string | null;
  decided_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ProposalItem = {
  id: string;
  proposal_id: string;
  service_catalog_id: string | null;
  nome: string;
  descricao: string | null;
  entregaveis: string[];
  valor: number;
  prazo_dias: number | null;
  forma_pagamento: PaymentMethod | null;
  parcelas: number | null;
  status: ProposalItemStatus;
  data_inicio: string | null;
  data_entrega_prevista: string | null;
  data_entrega_real: string | null;
  ordem: number;
  created_at: string;
  updated_at: string;
};

export const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  a_vista: "À vista",
  parcelado: "Parcelado",
  recorrente_mensal: "Recorrente mensal",
  recorrente_anual: "Recorrente anual",
  permuta: "Permuta",
  outro: "Outro",
};

export const PROPOSAL_STATUS_LABELS: Record<ProposalStatus, string> = {
  rascunho: "Rascunho",
  enviada: "Enviada",
  aceita: "Aceita",
  recusada: "Recusada",
};

export const ITEM_STATUS_LABELS: Record<ProposalItemStatus, string> = {
  proposto: "Proposto",
  aprovado: "Aprovado",
  em_execucao: "Em execução",
  entregue: "Entregue",
  cancelado: "Cancelado",
};

export const PROPOSAL_STATUS_STYLES: Record<ProposalStatus, string> = {
  rascunho: "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/30",
  enviada: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/30",
  aceita: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
  recusada: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30",
};

export const ITEM_STATUS_STYLES: Record<ProposalItemStatus, string> = {
  proposto: "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/30",
  aprovado: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/30",
  em_execucao: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30",
  entregue: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
  cancelado: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30",
};

export const GENERAL_WHATSAPP_TEMPLATES: Array<Omit<WhatsAppScript, "id">> = [
  {
    titulo: "Abertura leve",
    categoria: "abordagem",
    mensagem:
      "Olá, [nome]! Tudo bem?\n\nEstou entrando em contato porque vi que o seu negócio pode se beneficiar de uma abordagem mais estruturada para gerar oportunidades. Posso te mostrar, em poucas mensagens, como isso funciona na prática?",
  },
  {
    titulo: "Conexão com dor",
    categoria: "abordagem",
    mensagem:
      "Olá, [nome]! Passei por aqui porque identifiquei um cenário comum em empresas do seu segmento: muito esforço comercial, mas pouca previsibilidade.\n\nEstamos mapeando alguns cenários para entender se faz sentido te ajudar nisso. Posso te explicar em 2 minutos?",
  },
  {
    titulo: "Follow-up de valor",
    categoria: "follow-up",
    mensagem:
      "Oi, [nome]! Passando para reforçar o ponto que te mandei.\n\nO foco aqui não é vender qualquer coisa, e sim enxergar o melhor caminho para o seu negócio. Se quiser, eu te envio uma visão resumida do que faria sentido para você.",
  },
  {
    titulo: "Fechamento do próximo passo",
    categoria: "fechamento",
    mensagem:
      "Se fizer sentido para você, podemos marcar uma conversa rápida para eu te mostrar os próximos passos e te passar uma ideia objetiva de como começar.\n\nPrefere que eu te mande duas opções de horário?",
  },
];

type ScriptSeed = Omit<WhatsAppScript, "id">;

export function formatBRL(value: number | null | undefined): string {
  const n = Number(value ?? 0);
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function parseEntregaveis(input: unknown): string[] {
  if (Array.isArray(input)) return input.map((v) => String(v));
  if (typeof input === "string") {
    try {
      const parsed = JSON.parse(input);
      return Array.isArray(parsed) ? parsed.map((v) => String(v)) : [];
    } catch {
      return input
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
    }
  }
  return [];
}

export function parseWhatsAppScripts(input: unknown): WhatsAppScript[] {
  const normalize = (raw: unknown, index: number): WhatsAppScript | null => {
    if (!raw) return null;
    if (typeof raw === "string") {
      const mensagem = raw.trim();
      if (!mensagem) return null;
      return {
        id: `script-${index}`,
        titulo: `Script ${index + 1}`,
        categoria: "geral",
        mensagem,
      };
    }
    if (typeof raw !== "object") return null;
    const obj = raw as Partial<WhatsAppScript>;
    const mensagem = String(obj.mensagem ?? "").trim();
    if (!mensagem) return null;
    return {
      id: String(obj.id ?? `script-${index}`),
      titulo: String(obj.titulo ?? `Script ${index + 1}`),
      categoria: String(obj.categoria ?? "geral"),
      mensagem,
      observacao: obj.observacao ? String(obj.observacao) : null,
    };
  };

  if (Array.isArray(input)) {
    return input.map(normalize).filter((v): v is WhatsAppScript => Boolean(v));
  }
  if (typeof input === "string") {
    try {
      const parsed = JSON.parse(input);
      return Array.isArray(parsed)
        ? parsed.map(normalize).filter((v): v is WhatsAppScript => Boolean(v))
        : [];
    } catch {
      const parts = input
        .split(/\n{2,}/)
        .map((s) => s.trim())
        .filter(Boolean);
      return parts
        .map((part, index) => normalize(part, index))
        .filter((v): v is WhatsAppScript => Boolean(v));
    }
  }
  return [];
}

export function buildServiceWhatsAppScripts(service: ServiceScriptSource): WhatsAppScript[] {
  const serviceName = normalizeServiceName(service.nome);
  const serviceKey = normalizeServiceKey(service.nome);
  const description = cleanText(service.descricao);
  const deliverables = service.entregaveis.map((item) => cleanText(item)).filter(Boolean);
  const deliverablesText = joinPortuguese(deliverables);
  const price = service.valor_padrao ? formatBRL(service.valor_padrao) : null;
  const deadline = service.prazo_dias ? `${service.prazo_dias} dias` : null;

  const serviceIntro = [
    description ? `${description}` : null,
    deliverablesText ? `Entregáveis principais: ${deliverablesText}.` : null,
    price ? `Valor-base de referência: ${price}.` : null,
    deadline ? `Prazo estimado: ${deadline}.` : null,
  ]
    .filter(Boolean)
    .join(" ");

  const playbook = SERVICE_SPIN_PLAYBOOKS[serviceKey] ?? createGenericSpinPlaybook(serviceName);

  return playbook.map((step) =>
    createScript({
      titulo: step.titulo,
      categoria: step.categoria,
      mensagem: renderSpinTemplate(step.mensagem, {
        nome: "[nome]",
        servico: serviceName,
        descricao: description,
        entregaveis: deliverablesText,
        valor: price ?? "valor sob consulta",
        prazo: deadline ?? "prazo sob combinação",
      }),
      observacao: step.observacao ?? null,
    }),
  );
}

function normalizeServiceName(name: string) {
  const text = cleanText(name);
  return text || "o serviço";
}

function normalizeServiceKey(name: string) {
  return cleanText(name)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function cleanText(value: unknown) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

function joinPortuguese(items: string[]) {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} e ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} e ${items[items.length - 1]}`;
}

function createScript(script: Omit<WhatsAppScript, "id">): WhatsAppScript {
  return {
    id:
      globalThis.crypto?.randomUUID?.() ??
      `script-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    ...script,
  };
}

function renderSpinTemplate(template: string, values: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? `{${key}}`);
}

function createGenericSpinPlaybook(serviceName: string): ScriptSeed[] {
  return [
    {
      titulo: `1. Abertura para ${serviceName}`,
      categoria: "abertura",
      mensagem:
        "Olá, [nome]! Tudo bem?\n\nQuero entender se faz sentido conversar sobre {servico} para o seu momento atual. Posso te fazer algumas perguntas rápidas?",
    },
    {
      titulo: "2. Situação atual",
      categoria: "situacao",
      mensagem:
        "Hoje, como vocês lidam com esse tema na prática?\n\nQuero entender o cenário atual para ver se {servico} realmente resolve algo relevante aí.",
    },
    {
      titulo: "3. Problema principal",
      categoria: "problema",
      mensagem:
        "O que mais trava hoje: tempo, organização, visibilidade, padronização ou geração de resultado?\n\nPergunto porque é daí que a solução precisa partir.",
    },
    {
      titulo: "4. Implicação",
      categoria: "implicacao",
      mensagem:
        "Se isso continuar do jeito que está, o impacto costuma aparecer em atraso, perda de oportunidade ou custo maior.\n\nÉ mais ou menos isso que está acontecendo aí também?",
    },
    {
      titulo: "5. Necessidade",
      categoria: "necessidade",
      mensagem:
        "Se {servico} resolvesse esse ponto com clareza e previsibilidade, o que mudaria mais para você nos próximos meses?",
    },
    {
      titulo: "6. Fechamento",
      categoria: "fechamento",
      mensagem:
        "Se fizer sentido, eu posso te mostrar como seria o caminho de implementação de {servico}, com escopo, prazo e investimento.\n\nPrefere que eu te envie uma proposta resumida ou marcamos uma conversa rápida?",
    },
  ];
}

const SERVICE_SPIN_PLAYBOOKS: Record<string, ScriptSeed[]> = {
  solucoes_empresariais: [
    {
      titulo: "1. Abertura - soluções empresariais",
      categoria: "abertura",
      mensagem:
        "Olá, [nome]! Tudo bem?\n\nEstou entrando em contato porque, em alguns negócios, não existe um único problema, mas vários pontos que se conectam: presença digital, marca, marketing, site, estrutura comercial e posicionamento.\n\nPosso te mostrar como isso funciona em uma conversa rápida?",
    },
    {
      titulo: "2. Situação atual - soluções empresariais",
      categoria: "situacao",
      mensagem:
        "Hoje, quais dessas frentes estão mais sensíveis para você: domínio e site, identidade visual, Google, marketing, consultoria estratégica ou proteção da marca?",
    },
    {
      titulo: "3. Problema - soluções empresariais",
      categoria: "problema",
      mensagem:
        "O que pesa mais hoje: a empresa está sem uma base digital consistente, sem clareza estratégica, sem previsibilidade comercial ou sem proteção e padronização da marca?",
    },
    {
      titulo: "4. Implicação - soluções empresariais",
      categoria: "implicacao",
      mensagem:
        "Quando essas frentes ficam desconectadas, o negócio perde autoridade, confiança e chance de venda. No fim, cada área puxa para um lado e o resultado fica mais lento.\n\nIsso tem acontecido por aí?",
    },
    {
      titulo: "5. Necessidade - soluções empresariais",
      categoria: "necessidade",
      mensagem:
        "Se você tivesse uma solução organizada, com prioridades claras e execução por etapas, isso ajudaria o negócio a ganhar mais consistência e resultado?",
    },
    {
      titulo: "6. Fechamento - soluções empresariais",
      categoria: "fechamento",
      mensagem:
        "Se fizer sentido, eu posso te apresentar uma proposta de soluções empresariais com diagnóstico inicial e os serviços que realmente fazem sentido para o seu caso.\n\nQuer que eu te envie uma visão resumida?",
    },
  ],
  configuracao_de_dominio: [
    {
      titulo: "1. Abertura - domínio",
      categoria: "abertura",
      mensagem:
        "Olá, [nome]! Tudo bem?\n\nVi que muitas empresas ainda têm dificuldade para organizar domínio, e-mail profissional e presença digital. Posso te mostrar como isso impacta a operação e a imagem da empresa?",
    },
    {
      titulo: "2. Situação atual - domínio",
      categoria: "situacao",
      mensagem:
        "Hoje vocês já têm domínio próprio, e-mails profissionais e apontamentos corretos no site e nos registros?\n\nQuero entender como está essa estrutura hoje.",
    },
    {
      titulo: "3. Problema - domínio",
      categoria: "problema",
      mensagem:
        "O que mais está gerando dor nesse ponto: e-mails que não funcionam, falta de padronização, dificuldade para configurar acesso ou insegurança técnica?",
    },
    {
      titulo: "4. Implicação - domínio",
      categoria: "implicacao",
      mensagem:
        "Quando domínio e e-mail não estão bem organizados, a empresa perde credibilidade e ainda corre risco de travar processos simples de contato e entrega.\n\nIsso tem acontecido por aí?",
    },
    {
      titulo: "5. Necessidade - domínio",
      categoria: "necessidade",
      mensagem:
        "Se essa estrutura ficasse pronta e estável, ajudaria vocês a ganhar mais profissionalismo e segurança no dia a dia?",
    },
    {
      titulo: "6. Fechamento - domínio",
      categoria: "fechamento",
      mensagem:
        "Se fizer sentido, eu posso te enviar um escopo de configuração de domínio com o que entra, prazo e investimento.\n\nQuer que eu te mande uma proposta objetiva?",
    },
  ],
  consultoria_empresarial: [
    {
      titulo: "1. Abertura - consultoria",
      categoria: "abertura",
      mensagem:
        "Olá, [nome]! Tudo bem?\n\nEstou entrando em contato porque a consultoria empresarial costuma fazer diferença quando o negócio já cresceu, mas ainda falta organização para escalar. Posso te mostrar como isso funciona?",
    },
    {
      titulo: "2. Situação atual - consultoria",
      categoria: "situacao",
      mensagem:
        "Hoje, quais áreas estão mais sensíveis aí dentro: comercial, financeiro, processos, gestão ou posicionamento?",
    },
    {
      titulo: "3. Problema - consultoria",
      categoria: "problema",
      mensagem:
        "O principal problema hoje é falta de clareza, decisão lenta, time desalinhado ou dificuldade para transformar esforço em resultado?",
    },
    {
      titulo: "4. Implicação - consultoria",
      categoria: "implicacao",
      mensagem:
        "Quando isso continua, normalmente a empresa cresce de forma desorganizada e o dono precisa apagar incêndio o tempo todo. Isso está acontecendo também?",
    },
    {
      titulo: "5. Necessidade - consultoria",
      categoria: "necessidade",
      mensagem:
        "Se a consultoria trouxesse direção, rotina e prioridade clara, isso ajudaria vocês a avançar com mais segurança?",
    },
    {
      titulo: "6. Fechamento - consultoria",
      categoria: "fechamento",
      mensagem:
        "Se você quiser, eu posso montar uma proposta de consultoria com diagnóstico, direcionamento e próximos passos.\n\nQuer que eu te apresente o formato ideal?",
    },
  ],
  criacao_loja_virtual: [
    {
      titulo: "1. Abertura - loja virtual",
      categoria: "abertura",
      mensagem:
        "Olá, [nome]! Tudo bem?\n\nEstou falando com você porque uma loja virtual bem estruturada pode abrir um novo canal de vendas para o seu negócio. Posso te mostrar o caminho de forma simples?",
    },
    {
      titulo: "2. Situação atual - loja virtual",
      categoria: "situacao",
      mensagem:
        "Hoje vocês vendem só pelo WhatsApp, redes sociais ou já têm uma loja com catálogo e checkout organizados?",
    },
    {
      titulo: "3. Problema - loja virtual",
      categoria: "problema",
      mensagem:
        "O que está travando mais: falta de canal, dificuldade para organizar produtos, baixa conversão ou atendimento manual demais?",
    },
    {
      titulo: "4. Implicação - loja virtual",
      categoria: "implicacao",
      mensagem:
        "Sem uma loja virtual, a empresa depende muito de atendimento humano e acaba perdendo vendas fora do horário comercial. Isso já pesa hoje?",
    },
    {
      titulo: "5. Necessidade - loja virtual",
      categoria: "necessidade",
      mensagem:
        "Se a loja virtual ajudasse a vender com mais previsibilidade e menos esforço operacional, isso faria diferença para você?",
    },
    {
      titulo: "6. Fechamento - loja virtual",
      categoria: "fechamento",
      mensagem:
        "Se fizer sentido, eu posso te enviar uma proposta com estrutura, prazo e etapas da loja virtual.\n\nQuer que eu organize isso para você?",
    },
  ],
  criacao_site: [
    {
      titulo: "1. Abertura - site",
      categoria: "abertura",
      mensagem:
        "Olá, [nome]! Tudo bem?\n\nVi que muitas empresas perdem oportunidade por não terem um site claro e profissional. Posso te mostrar como um site bem feito apoia vendas e credibilidade?",
    },
    {
      titulo: "2. Situação atual - site",
      categoria: "situacao",
      mensagem:
        "Hoje vocês já têm um site ativo? Se sim, ele está trazendo resultado ou funciona só como presença institucional?",
    },
    {
      titulo: "3. Problema - site",
      categoria: "problema",
      mensagem:
        "O que mais pega hoje: site desatualizado, dificuldade para transmitir valor, pouca conversão ou navegação ruim no celular?",
    },
    {
      titulo: "4. Implicação - site",
      categoria: "implicacao",
      mensagem:
        "Quando o site não comunica bem, a empresa perde autoridade e o cliente segue para o concorrente sem pedir informação. Isso acontece com frequência aí?",
    },
    {
      titulo: "5. Necessidade - site",
      categoria: "necessidade",
      mensagem:
        "Se o site ajudasse a gerar mais confiança e apoio comercial, isso mudaria a forma como vocês se apresentam ao mercado?",
    },
    {
      titulo: "6. Fechamento - site",
      categoria: "fechamento",
      mensagem:
        "Se quiser, eu posso te mandar uma proposta para criação de site com escopo, prazo e formato de entrega.\n\nPosso seguir por aqui?",
    },
  ],
  estrategias_de_negocio: [
    {
      titulo: "1. Abertura - estratégia",
      categoria: "abertura",
      mensagem:
        "Olá, [nome]! Tudo bem?\n\nEstou entrando em contato porque muita empresa precisa de direção estratégica antes de crescer mais. Posso te mostrar um diagnóstico inicial sobre isso?",
    },
    {
      titulo: "2. Situação atual - estratégia",
      categoria: "situacao",
      mensagem:
        "Hoje vocês têm metas claras, prioridade definida e rotina de acompanhamento, ou isso ainda fica mais no improviso?",
    },
    {
      titulo: "3. Problema - estratégia",
      categoria: "problema",
      mensagem:
        "O principal problema é falta de foco, dificuldade para priorizar, time desalinhado ou objetivos que não viram ação prática?",
    },
    {
      titulo: "4. Implicação - estratégia",
      categoria: "implicacao",
      mensagem:
        "Sem estratégia clara, o negócio cresce de forma reativa e o resultado fica instável. Isso tem gerado impacto aí também?",
    },
    {
      titulo: "5. Necessidade - estratégia",
      categoria: "necessidade",
      mensagem:
        "Se houvesse um plano simples com prioridades, indicadores e próximo passo definido, isso ajudaria vocês a andar com mais segurança?",
    },
    {
      titulo: "6. Fechamento - estratégia",
      categoria: "fechamento",
      mensagem:
        "Se fizer sentido, eu posso te enviar uma proposta de estratégia com diagnóstico, direcionamento e plano de ação.\n\nQuer que eu estruture isso para você?",
    },
  ],
  google_meu_negocio: [
    {
      titulo: "1. Abertura - Google Meu Negócio",
      categoria: "abertura",
      mensagem:
        "Olá, [nome]! Tudo bem?\n\nEstou entrando em contato porque o Google Meu Negócio pode ajudar muito empresas que querem ser encontradas com mais facilidade. Posso te mostrar o impacto disso?",
    },
    {
      titulo: "2. Situação atual - Google Meu Negócio",
      categoria: "situacao",
      mensagem:
        "Hoje o perfil da empresa no Google está atualizado, com fotos, horários, avaliações e link correto para contato?",
    },
    {
      titulo: "3. Problema - Google Meu Negócio",
      categoria: "problema",
      mensagem:
        "O que mais está pegando hoje: perfil desatualizado, poucas avaliações, baixa visibilidade local ou dificuldade para gerar contato?",
    },
    {
      titulo: "4. Implicação - Google Meu Negócio",
      categoria: "implicacao",
      mensagem:
        "Quando o perfil não está bem otimizado, a empresa perde buscas locais e deixa oportunidades na mão. Isso já acontece aí com frequência?",
    },
    {
      titulo: "5. Necessidade - Google Meu Negócio",
      categoria: "necessidade",
      mensagem:
        "Se o perfil passasse a trazer mais visibilidade, confiança e chamadas diretas, isso ajudaria nas vendas?",
    },
    {
      titulo: "6. Fechamento - Google Meu Negócio",
      categoria: "fechamento",
      mensagem:
        "Se quiser, eu posso te mandar uma proposta de otimização e gestão do perfil no Google.\n\nQuer seguir com isso?",
    },
  ],
  identidade_visual: [
    {
      titulo: "1. Abertura - identidade visual",
      categoria: "abertura",
      mensagem:
        "Olá, [nome]! Tudo bem?\n\nEstou entrando em contato porque a identidade visual certa ajuda a empresa a parecer mais forte e vender com mais confiança. Posso te mostrar por que isso pesa tanto?",
    },
    {
      titulo: "2. Situação atual - identidade visual",
      categoria: "situacao",
      mensagem:
        "Hoje a marca está consistente em todos os pontos de contato, ou cada material parece de um jeito diferente?",
    },
    {
      titulo: "3. Problema - identidade visual",
      categoria: "problema",
      mensagem:
        "O que mais incomoda hoje: falta de padronização, marca sem personalidade, baixa percepção de valor ou dificuldade para aplicar a identidade no dia a dia?",
    },
    {
      titulo: "4. Implicação - identidade visual",
      categoria: "implicacao",
      mensagem:
        "Quando a identidade visual é fraca ou inconsistente, o cliente percebe menos valor e confia menos na marca. Isso já acontece por aí?",
    },
    {
      titulo: "5. Necessidade - identidade visual",
      categoria: "necessidade",
      mensagem:
        "Se a marca ficasse mais profissional, coerente e fácil de aplicar, isso ajudaria na percepção do negócio?",
    },
    {
      titulo: "6. Fechamento - identidade visual",
      categoria: "fechamento",
      mensagem:
        "Se fizer sentido, eu posso te mandar uma proposta de identidade visual com escopo e entregáveis.\n\nQuer que eu organize isso?",
    },
  ],
  marketing: [
    {
      titulo: "1. Abertura - marketing",
      categoria: "abertura",
      mensagem:
        "Olá, [nome]! Tudo bem?\n\nQueria te mostrar como uma estrutura de marketing mais clara pode gerar demanda de forma mais previsível. Posso te fazer algumas perguntas rápidas?",
    },
    {
      titulo: "2. Situação atual - marketing",
      categoria: "situacao",
      mensagem:
        "Hoje vocês estão rodando marketing de forma contínua ou as ações ainda acontecem mais quando sobra tempo?",
    },
    {
      titulo: "3. Problema - marketing",
      categoria: "problema",
      mensagem:
        "O principal problema hoje é falta de constância, baixa geração de leads, dificuldade de medir resultado ou comunicação pouco clara?",
    },
    {
      titulo: "4. Implicação - marketing",
      categoria: "implicacao",
      mensagem:
        "Sem marketing estruturado, o negócio depende de indicação e do acaso. Isso limita o crescimento e a previsibilidade. Faz sentido para você?",
    },
    {
      titulo: "5. Necessidade - marketing",
      categoria: "necessidade",
      mensagem:
        "Se o marketing começasse a gerar mais oportunidade qualificada com rotina e método, isso ajudaria muito o negócio?",
    },
    {
      titulo: "6. Fechamento - marketing",
      categoria: "fechamento",
      mensagem:
        "Se quiser, eu posso te enviar uma proposta com estratégia, execução e acompanhamento de marketing.\n\nQuer que eu monte isso?",
    },
  ],
  registro_de_marca: [
    {
      titulo: "1. Abertura - registro de marca",
      categoria: "abertura",
      mensagem:
        "Olá, [nome]! Tudo bem?\n\nEstou entrando em contato porque o registro de marca é uma etapa importante para proteger o negócio. Posso te explicar rapidamente por que isso evita dor de cabeça?",
    },
    {
      titulo: "2. Situação atual - registro de marca",
      categoria: "situacao",
      mensagem:
        "Hoje a marca já está registrada ou vocês ainda estão em fase de uso sem essa proteção formal?",
    },
    {
      titulo: "3. Problema - registro de marca",
      categoria: "problema",
      mensagem:
        "O que mais preocupa hoje: risco jurídico, conflito com terceiros, dúvida sobre disponibilidade ou falta de orientação no processo?",
    },
    {
      titulo: "4. Implicação - registro de marca",
      categoria: "implicacao",
      mensagem:
        "Sem registro, a empresa pode investir em divulgação e depois ter problema para manter o nome ou o posicionamento. Isso já passou pela cabeça de vocês?",
    },
    {
      titulo: "5. Necessidade - registro de marca",
      categoria: "necessidade",
      mensagem:
        "Se a marca ficasse protegida e o processo conduzido com segurança, isso traria mais tranquilidade para seguir crescendo?",
    },
    {
      titulo: "6. Fechamento - registro de marca",
      categoria: "fechamento",
      mensagem:
        "Se fizer sentido, eu posso te enviar uma proposta para orientar o registro da marca com escopo e prazo.\n\nQuer que eu te passe os próximos passos?",
    },
  ],
};
