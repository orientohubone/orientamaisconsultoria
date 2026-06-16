import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const GEMINI_GATEWAY = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";
const LOVABLE_GATEWAY = "https://ai.gateway.lovable.dev/v1/chat/completions";
const MODEL = "gemini-2.5-flash";

type Lead = {
  id: string;
  nome: string;
  whatsapp: string;
  tipo_negocio: string | null;
  cnpj: string | null;
  solucoes_prestadas: string | null;
  desafios_reais: string | null;
  objetivos_organizacionais: string | null;
  anotacoes: string | null;
  diagnostico_ai: string | null;
  analise_ai: string | null;
  oportunidades: Array<{ titulo: string; descricao: string; impacto: string; selecionada?: boolean }>;
  plano_acoes: Array<{ titulo: string; descricao: string; prazo: string; responsavel: string; prioridade: string }>;
};

async function requestAI(url: string, key: string, providerName: string, body: Record<string, unknown>) {
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: MODEL, ...body }),
  });
  if (res.status === 429) throw new Error(`Limite de uso da IA do ${providerName} atingido. Tente em instantes.`);
  if (res.status === 401 || res.status === 403) {
    throw new Error(`${providerName} rejeitou a chave de API.`);
  }
  if (!res.ok) throw new Error(`Erro da IA (${providerName}): ${res.status} ${await res.text()}`);
  return res.json();
}

async function callAI(body: Record<string, unknown>) {
  const providers = [
    {
      name: "Gemini",
      url: GEMINI_GATEWAY,
      key: process.env.GEMINI_API_KEY,
    },
    {
      name: "Lovable",
      url: LOVABLE_GATEWAY,
      key: process.env.LOVABLE_API_KEY,
    },
  ].filter((p) => !!p.key) as Array<{ name: string; url: string; key: string }>;

  if (providers.length === 0) {
    throw new Error("Configure GEMINI_API_KEY ou LOVABLE_API_KEY para usar a IA.");
  }

  let lastError: unknown;

  for (const provider of providers) {
    try {
      return await requestAI(provider.url, provider.key, provider.name, body);
    } catch (error) {
      lastError = error;
      console.warn(`[AI] ${provider.name} falhou`, error);
    }
  }

  const message =
    lastError instanceof Error
      ? lastError.message
      : "Não foi possível chamar a IA agora. Verifique sua conexão ou a chave configurada.";
  throw new Error(message);
}

function ctx(l: Lead) {
  return `Cliente: ${l.nome}
Tipo de negócio: ${l.tipo_negocio ?? "—"}
CNPJ: ${l.cnpj ?? "—"}
Soluções prestadas: ${l.solucoes_prestadas ?? "—"}
Desafios reais (informados): ${l.desafios_reais ?? "—"}
Objetivos organizacionais: ${l.objetivos_organizacionais ?? "—"}
Anotações internas do consultor: ${l.anotacoes ?? "—"}`;
}

async function loadLead(supabase: any, leadId: string): Promise<Lead> {
  const { data, error } = await supabase.from("leads").select("*").eq("id", leadId).single();
  if (error || !data) throw new Error("Cliente não encontrado");
  return data as Lead;
}

// 1. Enriquecer diagnóstico
export const enrichDiagnostico = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { leadId: string }) => z.object({ leadId: z.string().uuid() }).parse(i))
  .handler(async ({ data, context }) => {
    const lead = await loadLead(context.supabase, data.leadId);
    const json = await callAI({
      messages: [
        {
          role: "system",
          content:
            "Você é um consultor sênior da OrientoHub. Sintetize um DIAGNÓSTICO claro, estruturado em tópicos (markdown), conectando os dados do formulário às anotações do consultor. Destaque: contexto do negócio, dores principais, causas-raiz prováveis, pontos fortes e riscos. Tom profissional, direto, em PT-BR.",
        },
        { role: "user", content: ctx(lead) },
      ],
    });
    const content: string = json.choices?.[0]?.message?.content ?? "";
    const { error } = await context.supabase
      .from("leads")
      .update({ diagnostico_ai: content, stage: "diagnostico" })
      .eq("id", lead.id);
    if (error) throw new Error(error.message);
    return { diagnostico_ai: content };
  });

// 2. Gerar análise + oportunidades
export const generateAnalise = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { leadId: string }) => z.object({ leadId: z.string().uuid() }).parse(i))
  .handler(async ({ data, context }) => {
    const lead = await loadLead(context.supabase, data.leadId);
    if (!lead.diagnostico_ai) throw new Error("Gere o diagnóstico antes da análise.");
    const json = await callAI({
      messages: [
        {
          role: "system",
          content:
            "Você é estrategista da OrientoHub. Com base no diagnóstico, produza uma ANÁLISE detalhada (markdown) e identifique de 4 a 7 OPORTUNIDADES acionáveis (posicionamento, marketing, gestão, vendas, processos). Use a ferramenta entregar_analise.",
        },
        {
          role: "user",
          content: `${ctx(lead)}\n\nDIAGNÓSTICO:\n${lead.diagnostico_ai}`,
        },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "entregar_analise",
            description: "Entrega a análise e a lista de oportunidades.",
            parameters: {
              type: "object",
              properties: {
                analise: { type: "string", description: "Análise detalhada em markdown" },
                oportunidades: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      titulo: { type: "string" },
                      descricao: { type: "string" },
                      impacto: { type: "string", enum: ["alto", "medio", "baixo"] },
                    },
                    required: ["titulo", "descricao", "impacto"],
                    additionalProperties: false,
                  },
                },
              },
              required: ["analise", "oportunidades"],
              additionalProperties: false,
            },
          },
        },
      ],
      tool_choice: { type: "function", function: { name: "entregar_analise" } },
    });
    const call = json.choices?.[0]?.message?.tool_calls?.[0];
    if (!call) throw new Error("IA não retornou análise estruturada.");
    const parsed = JSON.parse(call.function.arguments);
    const oportunidades = parsed.oportunidades.map((o: any) => ({ ...o, selecionada: true }));
    const { error } = await context.supabase
      .from("leads")
      .update({ analise_ai: parsed.analise, oportunidades, stage: "analise" })
      .eq("id", lead.id);
    if (error) throw new Error(error.message);
    return { analise_ai: parsed.analise, oportunidades };
  });

// 3. Gerar plano de ações a partir das oportunidades selecionadas
export const generatePlano = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { leadId: string }) => z.object({ leadId: z.string().uuid() }).parse(i))
  .handler(async ({ data, context }) => {
    const lead = await loadLead(context.supabase, data.leadId);
    const selecionadas = (lead.oportunidades ?? []).filter((o) => o.selecionada);
    if (selecionadas.length === 0) throw new Error("Selecione pelo menos uma oportunidade.");
    const json = await callAI({
      messages: [
        {
          role: "system",
          content:
            "Você é o head de execução da OrientoHub. A partir das oportunidades selecionadas, construa um PLANO DE AÇÃO personalizado, com ações claras, objetivas, sequenciais e mensuráveis. Use a ferramenta entregar_plano.\n\nSe ainda não houver um mapeamento claro de soluções prestadas, recursos ou oferta do cliente, comece o plano com uma frente de DISCOVERY para fechar essa lacuna antes de propor execução. Se o mapeamento já existir, siga direto para a priorização das ações.",
        },
        {
          role: "user",
          content: `${ctx(lead)}\n\nDIAGNÓSTICO:\n${lead.diagnostico_ai}\n\nANÁLISE:\n${lead.analise_ai}\n\nOPORTUNIDADES SELECIONADAS:\n${selecionadas
            .map((o, i) => `${i + 1}. ${o.titulo} — ${o.descricao} (impacto ${o.impacto})`)
            .join("\n")}`,
        },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "entregar_plano",
            description: "Entrega o plano de ações personalizado.",
            parameters: {
              type: "object",
              properties: {
                acoes: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      titulo: { type: "string" },
                      descricao: { type: "string", description: "O que fazer, como fazer, resultado esperado" },
                      prazo: { type: "string", description: "Ex: 7 dias, 15 dias, 30 dias" },
                      responsavel: { type: "string", description: "Ex: Empreendedor, Time de marketing" },
                      prioridade: { type: "string", enum: ["alta", "media", "baixa"] },
                    },
                    required: ["titulo", "descricao", "prazo", "responsavel", "prioridade"],
                    additionalProperties: false,
                  },
                },
              },
              required: ["acoes"],
              additionalProperties: false,
            },
          },
        },
      ],
      tool_choice: { type: "function", function: { name: "entregar_plano" } },
    });
    const call = json.choices?.[0]?.message?.tool_calls?.[0];
    if (!call) throw new Error("IA não retornou plano estruturado.");
    const parsed = JSON.parse(call.function.arguments);
    const { error } = await context.supabase
      .from("leads")
      .update({ plano_acoes: parsed.acoes, stage: "estrategia" })
      .eq("id", lead.id);
    if (error) throw new Error(error.message);
    return { plano_acoes: parsed.acoes };
  });

// 4. Sugerir métricas para acompanhamento
export const suggestMetricas = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { leadId: string }) => z.object({ leadId: z.string().uuid() }).parse(i))
  .handler(async ({ data, context }) => {
    const lead = await loadLead(context.supabase, data.leadId);
    const json = await callAI({
      messages: [
        {
          role: "system",
          content:
            "Você é analista de performance da OrientoHub. Liste de 4 a 6 MÉTRICAS-CHAVE para acompanhar a execução do plano. Cada uma com nome, unidade, frequência de medição e meta sugerida. Use a ferramenta entregar_metricas.",
        },
        {
          role: "user",
          content: `${ctx(lead)}\n\nPLANO:\n${JSON.stringify(lead.plano_acoes, null, 2)}`,
        },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "entregar_metricas",
            parameters: {
              type: "object",
              properties: {
                metricas: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      nome: { type: "string" },
                      unidade: { type: "string" },
                      frequencia: { type: "string" },
                      meta: { type: "string" },
                      valor_atual: { type: "string" },
                    },
                    required: ["nome", "unidade", "frequencia", "meta", "valor_atual"],
                    additionalProperties: false,
                  },
                },
              },
              required: ["metricas"],
              additionalProperties: false,
            },
          },
        },
      ],
      tool_choice: { type: "function", function: { name: "entregar_metricas" } },
    });
    const call = json.choices?.[0]?.message?.tool_calls?.[0];
    if (!call) throw new Error("IA não retornou métricas.");
    const parsed = JSON.parse(call.function.arguments);
    const { error } = await context.supabase
      .from("leads")
      .update({ resultados_metricas: parsed.metricas, stage: "resultados" })
      .eq("id", lead.id);
    if (error) throw new Error(error.message);
    return { resultados_metricas: parsed.metricas };
  });
