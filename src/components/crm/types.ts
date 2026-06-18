export type PaymentMethod =
  | "a_vista"
  | "parcelado"
  | "recorrente_mensal"
  | "recorrente_anual"
  | "permuta"
  | "outro";

export type ProposalStatus = "rascunho" | "enviada" | "aceita" | "recusada";

export type ProposalItemStatus =
  | "proposto"
  | "aprovado"
  | "em_execucao"
  | "entregue"
  | "cancelado";

export type ServiceCatalog = {
  id: string;
  nome: string;
  descricao: string | null;
  valor_padrao: number | null;
  prazo_dias: number | null;
  entregaveis: string[];
  forma_pagamento_padrao: PaymentMethod | null;
  parcelas_padrao: number | null;
  ativo: boolean;
  created_at: string;
  updated_at: string;
};

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
      return input.split("\n").map((s) => s.trim()).filter(Boolean);
    }
  }
  return [];
}
