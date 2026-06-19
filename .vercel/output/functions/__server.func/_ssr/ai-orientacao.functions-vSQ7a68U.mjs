import { T as TSS_SERVER_FUNCTION, a as createServerFn } from "./server-Nzz9Dmzd.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-dqX5K5_Z.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/@supabase/functions-js.mjs";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const GEMINI_GATEWAY = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";
const LOVABLE_GATEWAY = "https://ai.gateway.lovable.dev/v1/chat/completions";
const MODEL = "gemini-2.5-flash";
async function requestAI(url, key, providerName, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: MODEL,
      ...body
    })
  });
  if (res.status === 429) throw new Error(`Limite de uso da IA do ${providerName} atingido. Tente em instantes.`);
  if (res.status === 401 || res.status === 403) {
    throw new Error(`${providerName} rejeitou a chave de API.`);
  }
  if (!res.ok) throw new Error(`Erro da IA (${providerName}): ${res.status} ${await res.text()}`);
  return res.json();
}
async function callAI(body) {
  const providers = [{
    name: "Gemini",
    url: GEMINI_GATEWAY,
    key: process.env.GEMINI_API_KEY
  }, {
    name: "Lovable",
    url: LOVABLE_GATEWAY,
    key: process.env.LOVABLE_API_KEY
  }].filter((p) => !!p.key);
  if (providers.length === 0) {
    throw new Error("Configure GEMINI_API_KEY ou LOVABLE_API_KEY para usar a IA.");
  }
  let lastError;
  for (const provider of providers) {
    try {
      return await requestAI(provider.url, provider.key, provider.name, body);
    } catch (error) {
      lastError = error;
      console.warn(`[AI] ${provider.name} falhou`, error);
    }
  }
  const message = lastError instanceof Error ? lastError.message : "Não foi possível chamar a IA agora. Verifique sua conexão ou a chave configurada.";
  throw new Error(message);
}
function ctx(l) {
  return `Cliente: ${l.nome}
Tipo de negócio: ${l.tipo_negocio ?? "—"}
CNPJ: ${l.cnpj ?? "—"}
Soluções prestadas: ${l.solucoes_prestadas ?? "—"}
Desafios reais (informados): ${l.desafios_reais ?? "—"}
Objetivos organizacionais: ${l.objetivos_organizacionais ?? "—"}
Anotações internas do consultor: ${l.anotacoes ?? "—"}`;
}
async function loadLead(supabase, leadId) {
  const {
    data,
    error
  } = await supabase.from("leads").select("*").eq("id", leadId).single();
  if (error || !data) throw new Error("Cliente não encontrado");
  return data;
}
const enrichDiagnostico_createServerFn_handler = createServerRpc({
  id: "b13e953d6673a1474eb69bf0d379a5ee7b27d13df9aafc36548936d127621dd5",
  name: "enrichDiagnostico",
  filename: "src/lib/ai-orientacao.functions.ts"
}, (opts) => enrichDiagnostico.__executeServer(opts));
const enrichDiagnostico = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({
  leadId: stringType().uuid()
}).parse(i)).handler(enrichDiagnostico_createServerFn_handler, async ({
  data,
  context
}) => {
  const lead = await loadLead(context.supabase, data.leadId);
  const json = await callAI({
    messages: [{
      role: "system",
      content: "Você é um consultor sênior da OrientoHub. Sintetize um DIAGNÓSTICO claro, estruturado em tópicos (markdown), conectando os dados do formulário às anotações do consultor. Destaque: contexto do negócio, dores principais, causas-raiz prováveis, pontos fortes e riscos. Tom profissional, direto, em PT-BR."
    }, {
      role: "user",
      content: ctx(lead)
    }]
  });
  const content = json.choices?.[0]?.message?.content ?? "";
  const {
    error
  } = await context.supabase.from("leads").update({
    diagnostico_ai: content,
    stage: "diagnostico"
  }).eq("id", lead.id);
  if (error) throw new Error(error.message);
  return {
    diagnostico_ai: content
  };
});
const generateAnalise_createServerFn_handler = createServerRpc({
  id: "1f09c2d87a98e98865ed585a8969dfe4752ba9b63f5bed110bdbfbb1cd83388a",
  name: "generateAnalise",
  filename: "src/lib/ai-orientacao.functions.ts"
}, (opts) => generateAnalise.__executeServer(opts));
const generateAnalise = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({
  leadId: stringType().uuid()
}).parse(i)).handler(generateAnalise_createServerFn_handler, async ({
  data,
  context
}) => {
  const lead = await loadLead(context.supabase, data.leadId);
  if (!lead.diagnostico_ai) throw new Error("Gere o diagnóstico antes da análise.");
  const json = await callAI({
    messages: [{
      role: "system",
      content: "Você é estrategista da OrientoHub. Com base no diagnóstico, produza uma ANÁLISE detalhada (markdown) e identifique de 4 a 7 OPORTUNIDADES acionáveis (posicionamento, marketing, gestão, vendas, processos). Use a ferramenta entregar_analise."
    }, {
      role: "user",
      content: `${ctx(lead)}

DIAGNÓSTICO:
${lead.diagnostico_ai}`
    }],
    tools: [{
      type: "function",
      function: {
        name: "entregar_analise",
        description: "Entrega a análise e a lista de oportunidades.",
        parameters: {
          type: "object",
          properties: {
            analise: {
              type: "string",
              description: "Análise detalhada em markdown"
            },
            oportunidades: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  titulo: {
                    type: "string"
                  },
                  descricao: {
                    type: "string"
                  },
                  impacto: {
                    type: "string",
                    enum: ["alto", "medio", "baixo"]
                  }
                },
                required: ["titulo", "descricao", "impacto"],
                additionalProperties: false
              }
            }
          },
          required: ["analise", "oportunidades"],
          additionalProperties: false
        }
      }
    }],
    tool_choice: {
      type: "function",
      function: {
        name: "entregar_analise"
      }
    }
  });
  const call = json.choices?.[0]?.message?.tool_calls?.[0];
  if (!call) throw new Error("IA não retornou análise estruturada.");
  const parsed = JSON.parse(call.function.arguments);
  const oportunidades = parsed.oportunidades.map((o) => ({
    ...o,
    selecionada: true
  }));
  const {
    error
  } = await context.supabase.from("leads").update({
    analise_ai: parsed.analise,
    oportunidades,
    stage: "analise"
  }).eq("id", lead.id);
  if (error) throw new Error(error.message);
  return {
    analise_ai: parsed.analise,
    oportunidades
  };
});
const generatePlano_createServerFn_handler = createServerRpc({
  id: "4430b43f8e2654a04528d2e7ae51e57a695fdd138a67de0aebcd84960e57fde4",
  name: "generatePlano",
  filename: "src/lib/ai-orientacao.functions.ts"
}, (opts) => generatePlano.__executeServer(opts));
const generatePlano = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({
  leadId: stringType().uuid()
}).parse(i)).handler(generatePlano_createServerFn_handler, async ({
  data,
  context
}) => {
  const lead = await loadLead(context.supabase, data.leadId);
  const selecionadas = (lead.oportunidades ?? []).filter((o) => o.selecionada);
  if (selecionadas.length === 0) throw new Error("Selecione pelo menos uma oportunidade.");
  const json = await callAI({
    messages: [{
      role: "system",
      content: "Você é o head de execução da OrientoHub. A partir das oportunidades selecionadas, construa um PLANO DE AÇÃO personalizado, com ações claras, objetivas, sequenciais e mensuráveis. Use a ferramenta entregar_plano.\n\nSe ainda não houver um mapeamento claro de soluções prestadas, recursos ou oferta do cliente, comece o plano com uma frente de DISCOVERY para fechar essa lacuna antes de propor execução. Se o mapeamento já existir, siga direto para a priorização das ações."
    }, {
      role: "user",
      content: `${ctx(lead)}

DIAGNÓSTICO:
${lead.diagnostico_ai}

ANÁLISE:
${lead.analise_ai}

OPORTUNIDADES SELECIONADAS:
${selecionadas.map((o, i) => `${i + 1}. ${o.titulo} — ${o.descricao} (impacto ${o.impacto})`).join("\n")}`
    }],
    tools: [{
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
                  titulo: {
                    type: "string"
                  },
                  descricao: {
                    type: "string",
                    description: "O que fazer, como fazer, resultado esperado"
                  },
                  prazo: {
                    type: "string",
                    description: "Ex: 7 dias, 15 dias, 30 dias"
                  },
                  responsavel: {
                    type: "string",
                    description: "Ex: Empreendedor, Time de marketing"
                  },
                  prioridade: {
                    type: "string",
                    enum: ["alta", "media", "baixa"]
                  }
                },
                required: ["titulo", "descricao", "prazo", "responsavel", "prioridade"],
                additionalProperties: false
              }
            }
          },
          required: ["acoes"],
          additionalProperties: false
        }
      }
    }],
    tool_choice: {
      type: "function",
      function: {
        name: "entregar_plano"
      }
    }
  });
  const call = json.choices?.[0]?.message?.tool_calls?.[0];
  if (!call) throw new Error("IA não retornou plano estruturado.");
  const parsed = JSON.parse(call.function.arguments);
  const {
    error
  } = await context.supabase.from("leads").update({
    plano_acoes: parsed.acoes,
    stage: "estrategia"
  }).eq("id", lead.id);
  if (error) throw new Error(error.message);
  return {
    plano_acoes: parsed.acoes
  };
});
const suggestMetricas_createServerFn_handler = createServerRpc({
  id: "cc209f9a203d973b7de45214e5756daa2e64cc34121f1327d3e48e03cb1a2c03",
  name: "suggestMetricas",
  filename: "src/lib/ai-orientacao.functions.ts"
}, (opts) => suggestMetricas.__executeServer(opts));
const suggestMetricas = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({
  leadId: stringType().uuid()
}).parse(i)).handler(suggestMetricas_createServerFn_handler, async ({
  data,
  context
}) => {
  const lead = await loadLead(context.supabase, data.leadId);
  const json = await callAI({
    messages: [{
      role: "system",
      content: "Você é analista de performance da OrientoHub. Liste de 4 a 6 MÉTRICAS-CHAVE para acompanhar a execução do plano. Cada uma com nome, unidade, frequência de medição e meta sugerida. Use a ferramenta entregar_metricas."
    }, {
      role: "user",
      content: `${ctx(lead)}

PLANO:
${JSON.stringify(lead.plano_acoes, null, 2)}`
    }],
    tools: [{
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
                  nome: {
                    type: "string"
                  },
                  unidade: {
                    type: "string"
                  },
                  frequencia: {
                    type: "string"
                  },
                  meta: {
                    type: "string"
                  },
                  valor_atual: {
                    type: "string"
                  }
                },
                required: ["nome", "unidade", "frequencia", "meta", "valor_atual"],
                additionalProperties: false
              }
            }
          },
          required: ["metricas"],
          additionalProperties: false
        }
      }
    }],
    tool_choice: {
      type: "function",
      function: {
        name: "entregar_metricas"
      }
    }
  });
  const call = json.choices?.[0]?.message?.tool_calls?.[0];
  if (!call) throw new Error("IA não retornou métricas.");
  const parsed = JSON.parse(call.function.arguments);
  const {
    error
  } = await context.supabase.from("leads").update({
    resultados_metricas: parsed.metricas,
    stage: "resultados"
  }).eq("id", lead.id);
  if (error) throw new Error(error.message);
  return {
    resultados_metricas: parsed.metricas
  };
});
export {
  enrichDiagnostico_createServerFn_handler,
  generateAnalise_createServerFn_handler,
  generatePlano_createServerFn_handler,
  suggestMetricas_createServerFn_handler
};
