import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Plus,
  Trash2,
  Save,
  Loader2,
  Send,
  CheckCircle2,
  XCircle,
  Package,
  ChevronDown,
  ChevronUp,
  Clock,
  CreditCard,
  ListChecks,
  CalendarDays,
  DollarSign,
} from "lucide-react";
import {
  formatBRL,
  parseEntregaveis,
  ITEM_STATUS_LABELS,
  ITEM_STATUS_STYLES,
  PAYMENT_LABELS,
  PROPOSAL_STATUS_LABELS,
  PROPOSAL_STATUS_STYLES,
  type LeadProposal,
  type PaymentMethod,
  type ProposalItem,
  type ProposalItemStatus,
  type ProposalStatus,
  type ServiceCatalog,
} from "./types";

type Props = { leadId: string };

export function SolucoesTab({ leadId }: Props) {
  const [catalog, setCatalog] = useState<ServiceCatalog[]>([]);
  const [proposals, setProposals] = useState<LeadProposal[]>([]);
  const [itemsByProposal, setItemsByProposal] = useState<Record<string, ProposalItem[]>>({});
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [focusProposalId, setFocusProposalId] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setErr(null);
    const [cat, props] = await Promise.all([
      supabase.from("services_catalog").select("*").eq("ativo", true).order("nome"),
      supabase
        .from("lead_proposals")
        .select("*")
        .eq("lead_id", leadId)
        .order("created_at", { ascending: false }),
    ]);
    if (cat.error) setErr(cat.error.message);
    if (props.error) setErr(props.error.message);
    const catalogRows = (cat.data ?? []) as Array<
      Omit<ServiceCatalog, "entregaveis"> & { entregaveis: unknown }
    >;
    const catalogList = catalogRows.map((c) => ({
      ...c,
      entregaveis: parseEntregaveis(c.entregaveis),
    }));
    const propList = (props.data ?? []) as LeadProposal[];
    setCatalog(catalogList);
    setProposals(propList);

    if (propList.length > 0) {
      const ids = propList.map((p) => p.id);
      const items = await supabase
        .from("proposal_items")
        .select("*")
        .in("proposal_id", ids)
        .order("ordem");
      const grouped: Record<string, ProposalItem[]> = {};
      const itemRows = (items.data ?? []) as Array<
        ProposalItem & { entregaveis: unknown; valor: number | string | null }
      >;
      itemRows.forEach((raw) => {
        const it: ProposalItem = {
          ...raw,
          entregaveis: parseEntregaveis(raw.entregaveis),
          valor: Number(raw.valor ?? 0),
        };
        (grouped[it.proposal_id] ||= []).push(it);
      });
      setItemsByProposal(grouped);
    } else {
      setItemsByProposal({});
    }
    setLoading(false);
  }, [leadId]);

  useEffect(() => {
    reload();
  }, [reload]);

  async function createProposal() {
    const { data, error } = await supabase
      .from("lead_proposals")
      .insert({
        lead_id: leadId,
        titulo: `Proposta de ${new Date().toLocaleDateString("pt-BR")}`,
      })
      .select("*")
      .single();
    if (error) {
      setErr(error.message);
      return;
    }
    setFocusProposalId(data?.id ?? null);
    reload();
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Carregando soluções...
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {err && (
        <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
          {err}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold">Soluções pós-consultoria</h3>
          <p className="text-xs text-muted-foreground">
            Crie propostas com os serviços contratados, valores, prazos e status de execução.
          </p>
        </div>
        <button
          onClick={createProposal}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-3 py-2 text-xs font-bold hover:opacity-90"
        >
          <Plus className="h-3.5 w-3.5" /> Nova proposta
        </button>
      </div>

      {proposals.length === 0 && (
        <div className="rounded-xl border border-dashed border-border bg-secondary/30 p-6 text-center text-sm text-muted-foreground">
          Nenhuma proposta criada ainda. Clique em <strong>Nova proposta</strong> para começar.
        </div>
      )}

      {proposals.map((p) => (
        <ProposalCard
          key={p.id}
          proposal={p}
          items={itemsByProposal[p.id] ?? []}
          catalog={catalog}
          onChange={reload}
          defaultOpen={focusProposalId === p.id}
          defaultShowCatalog={focusProposalId === p.id}
        />
      ))}
    </div>
  );
}

function ProposalCard({
  proposal,
  items,
  catalog,
  onChange,
  defaultOpen = true,
  defaultShowCatalog = false,
}: {
  proposal: LeadProposal;
  items: ProposalItem[];
  catalog: ServiceCatalog[];
  onChange: () => void;
  defaultOpen?: boolean;
  defaultShowCatalog?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [draft, setDraft] = useState<LeadProposal>(proposal);
  const [saving, setSaving] = useState(false);
  const [showCatalog, setShowCatalog] = useState(defaultShowCatalog);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setDraft(proposal);
  }, [proposal]);

  useEffect(() => {
    if (defaultOpen) setOpen(true);
  }, [defaultOpen]);

  useEffect(() => {
    if (defaultShowCatalog) setShowCatalog(true);
  }, [defaultShowCatalog]);

  const total = useMemo(() => items.reduce((acc, i) => acc + Number(i.valor || 0), 0), [items]);

  async function saveHeader() {
    setSaving(true);
    const patch: Partial<LeadProposal> = {
      titulo: draft.titulo,
      status: draft.status,
      observacoes: draft.observacoes,
      valor_total: total,
    };
    if (draft.status === "enviada" && !proposal.sent_at) patch.sent_at = new Date().toISOString();
    if ((draft.status === "aceita" || draft.status === "recusada") && !proposal.decided_at) {
      patch.decided_at = new Date().toISOString();
    }
    const { error } = await supabase.from("lead_proposals").update(patch).eq("id", proposal.id);
    setSaving(false);
    if (!error) onChange();
  }

  async function confirmRemoveProposal() {
    setDeleting(true);
    const { error } = await supabase.from("lead_proposals").delete().eq("id", proposal.id);
    setDeleting(false);
    if (error) return;
    setDeleteDialogOpen(false);
    onChange();
  }

  async function addFromCatalog(svc: ServiceCatalog) {
    setShowCatalog(false);
    await supabase.from("proposal_items").insert({
      proposal_id: proposal.id,
      service_catalog_id: svc.id,
      nome: svc.nome,
      descricao: svc.descricao,
      entregaveis: svc.entregaveis,
      valor: svc.valor_padrao ?? 0,
      prazo_dias: svc.prazo_dias,
      forma_pagamento: svc.forma_pagamento_padrao,
      parcelas: svc.parcelas_padrao,
      ordem: items.length,
    });
    onChange();
  }

  async function addCustomItem() {
    setShowCatalog(false);
    await supabase.from("proposal_items").insert({
      proposal_id: proposal.id,
      nome: "Novo serviço",
      entregaveis: [],
      valor: 0,
      prazo_dias: 30,
      ordem: items.length,
    });
    onChange();
  }

  return (
    <div className="rounded-2xl border border-border bg-card/60 backdrop-blur overflow-visible">
      <div className="flex items-start justify-between gap-3 p-4 border-b border-border/60">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <button
            onClick={() => setOpen((o) => !o)}
            className="mt-1 text-muted-foreground hover:text-foreground"
          >
            {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          <div className="flex-1 min-w-0">
            <input
              value={draft.titulo}
              onChange={(e) => setDraft({ ...draft, titulo: e.target.value })}
              className="w-full bg-transparent text-base font-bold focus:outline-none border-b border-transparent focus:border-primary"
            />
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
              <StatusBadge status={draft.status} />
              <span className="text-muted-foreground">
                {items.length} {items.length === 1 ? "serviço" : "serviços"}
              </span>
              <span className="text-muted-foreground">·</span>
              <span className="font-semibold text-foreground">Total: {formatBRL(total)}</span>
              {proposal.sent_at && (
                <span className="text-muted-foreground">
                  · Enviada em {new Date(proposal.sent_at).toLocaleDateString("pt-BR")}
                </span>
              )}
              {proposal.decided_at && (
                <span className="text-muted-foreground">
                  · Decisão em {new Date(proposal.decided_at).toLocaleDateString("pt-BR")}
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setDeleteDialogOpen(true)}
          className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          title="Excluir proposta"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {open && (
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <FieldMini label="Status">
              <select
                value={draft.status}
                onChange={(e) => setDraft({ ...draft, status: e.target.value as ProposalStatus })}
                className="w-full rounded-lg bg-input border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none"
              >
                {(Object.keys(PROPOSAL_STATUS_LABELS) as ProposalStatus[]).map((s) => (
                  <option key={s} value={s}>
                    {PROPOSAL_STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
            </FieldMini>
            <FieldMini label="Valor total (auto)">
              <div className="rounded-lg bg-secondary/50 border border-border px-3 py-2 text-sm font-bold">
                {formatBRL(total)}
              </div>
            </FieldMini>
          </div>
          <FieldMini label="Observações da proposta">
            <textarea
              value={draft.observacoes ?? ""}
              onChange={(e) => setDraft({ ...draft, observacoes: e.target.value })}
              rows={2}
              className="w-full rounded-lg bg-input border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none resize-none"
            />
          </FieldMini>

          <div className="space-y-3">
            {items.map((it) => (
              <ItemRow key={it.id} item={it} onChange={onChange} />
            ))}
          </div>

          <Popover open={showCatalog} onOpenChange={setShowCatalog}>
            <PopoverTrigger asChild>
              <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/60 px-3 py-2 text-xs font-bold hover:border-primary">
                <Plus className="h-3.5 w-3.5" /> Adicionar serviço
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              side="bottom"
              sideOffset={10}
              avoidCollisions={false}
              className="z-[60] w-[min(92vw,24rem)] max-h-[28rem] overflow-y-auto rounded-xl border border-border bg-popover p-2 shadow-2xl"
            >
              <button
                onClick={addCustomItem}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-secondary"
              >
                <Plus className="h-4 w-4 text-primary" /> Serviço personalizado
              </button>
              <div className="my-1 border-t border-border/60" />
              <div className="px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground">
                Do catálogo
              </div>
              {catalog.length === 0 && (
                <div className="px-3 py-4 text-xs text-muted-foreground">
                  Catálogo vazio. Cadastre serviços em /crm/servicos.
                </div>
              )}
              {catalog.map((svc) => (
                <button
                  key={svc.id}
                  onClick={() => addFromCatalog(svc)}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-secondary"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold">{svc.nome}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatBRL(svc.valor_padrao)}
                    </span>
                  </div>
                  {svc.descricao && (
                    <div className="text-xs text-muted-foreground line-clamp-1">
                      {svc.descricao}
                    </div>
                  )}
                </button>
              ))}
            </PopoverContent>
          </Popover>

          <div className="flex justify-end gap-2 pt-2 border-t border-border/60">
            <button
              onClick={saveHeader}
              disabled={saving}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-3 py-2 text-xs font-bold hover:opacity-90 disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Save className="h-3.5 w-3.5" />
              )}
              Salvar proposta
            </button>
          </div>
        </div>
      )}

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Excluir proposta?</DialogTitle>
            <DialogDescription>
              Essa ação remove a proposta e todos os serviços vinculados. Não é possível desfazer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <button
              onClick={() => setDeleteDialogOpen(false)}
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-3 py-2 text-xs font-bold hover:border-primary"
              disabled={deleting}
            >
              Cancelar
            </button>
            <button
              onClick={confirmRemoveProposal}
              disabled={deleting}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-destructive px-3 py-2 text-xs font-bold text-destructive-foreground hover:opacity-90 disabled:opacity-50"
            >
              {deleting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Trash2 className="h-3.5 w-3.5" />
              )}
              Excluir proposta
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StatusBadge({ status }: { status: ProposalStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider ${PROPOSAL_STATUS_STYLES[status]}`}
    >
      {PROPOSAL_STATUS_LABELS[status]}
    </span>
  );
}

function ItemRow({ item, onChange }: { item: ProposalItem; onChange: () => void }) {
  const [draft, setDraft] = useState<ProposalItem>(item);
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);
  const [entregavelInput, setEntregavelInput] = useState("");

  useEffect(() => {
    setDraft(item);
  }, [item]);

  async function save() {
    setSaving(true);
    const { error } = await supabase
      .from("proposal_items")
      .update({
        nome: draft.nome,
        descricao: draft.descricao,
        entregaveis: draft.entregaveis,
        valor: Number(draft.valor || 0),
        prazo_dias: draft.prazo_dias,
        forma_pagamento: draft.forma_pagamento,
        parcelas: draft.parcelas,
        status: draft.status,
        data_inicio: draft.data_inicio,
        data_entrega_prevista: draft.data_entrega_prevista,
        data_entrega_real: draft.data_entrega_real,
      })
      .eq("id", item.id);
    setSaving(false);
    if (!error) onChange();
  }

  async function remove() {
    if (!confirm(`Remover "${item.nome}"?`)) return;
    await supabase.from("proposal_items").delete().eq("id", item.id);
    onChange();
  }

  function addEntregavel() {
    const v = entregavelInput.trim();
    if (!v) return;
    setDraft({ ...draft, entregaveis: [...draft.entregaveis, v] });
    setEntregavelInput("");
  }

  return (
    <div className="rounded-xl border border-border bg-background/70 overflow-hidden hover:border-primary/40 transition">
      <div className="flex items-start gap-2 p-3">
        <button
          onClick={() => setOpen((o) => !o)}
          className="mt-0.5 text-muted-foreground hover:text-foreground shrink-0"
        >
          {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <input
              value={draft.nome}
              onChange={(e) => setDraft({ ...draft, nome: e.target.value })}
              className="flex-1 min-w-0 bg-transparent text-sm font-bold focus:outline-none border-b border-transparent focus:border-primary"
            />
            <span className="text-base font-bold text-foreground whitespace-nowrap">
              {formatBRL(draft.valor)}
            </span>
          </div>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <span
              className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[0.65rem] font-semibold ${ITEM_STATUS_STYLES[draft.status]}`}
            >
              {ITEM_STATUS_LABELS[draft.status]}
            </span>
            <ItemChip icon={<Clock className="h-3 w-3" />}>{draft.prazo_dias ?? 0} dias</ItemChip>
            <ItemChip icon={<CreditCard className="h-3 w-3" />}>
              {PAYMENT_LABELS[draft.forma_pagamento ?? "a_vista"]}
              {(draft.parcelas ?? 1) > 1 ? ` · ${draft.parcelas}x` : ""}
            </ItemChip>
            {draft.entregaveis.length > 0 && (
              <ItemChip icon={<ListChecks className="h-3 w-3" />}>
                {draft.entregaveis.length} entregáveis
              </ItemChip>
            )}
            {draft.data_entrega_prevista && (
              <ItemChip icon={<CalendarDays className="h-3 w-3" />}>
                Prev. {new Date(draft.data_entrega_prevista).toLocaleDateString("pt-BR")}
              </ItemChip>
            )}
          </div>
        </div>
        <button
          onClick={remove}
          className="shrink-0 p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          title="Remover"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      <StatusTimeline status={draft.status} />

      {open && (
        <div className="p-3 space-y-3 border-t border-border/40">
          <FieldMini label="Descrição">
            <textarea
              value={draft.descricao ?? ""}
              onChange={(e) => setDraft({ ...draft, descricao: e.target.value })}
              rows={2}
              className="w-full rounded-lg bg-input border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none resize-none"
            />
          </FieldMini>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <FieldMini label="Valor (R$)">
              <input
                type="number"
                step="0.01"
                min="0"
                value={draft.valor}
                onChange={(e) => setDraft({ ...draft, valor: Number(e.target.value) })}
                className="w-full rounded-lg bg-input border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none"
              />
            </FieldMini>
            <FieldMini label="Prazo (dias)">
              <input
                type="number"
                min="0"
                value={draft.prazo_dias ?? 0}
                onChange={(e) => setDraft({ ...draft, prazo_dias: Number(e.target.value) })}
                className="w-full rounded-lg bg-input border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none"
              />
            </FieldMini>
            <FieldMini label="Forma de pagamento">
              <select
                value={draft.forma_pagamento ?? "a_vista"}
                onChange={(e) =>
                  setDraft({ ...draft, forma_pagamento: e.target.value as PaymentMethod })
                }
                className="w-full rounded-lg bg-input border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none"
              >
                {(Object.keys(PAYMENT_LABELS) as PaymentMethod[]).map((p) => (
                  <option key={p} value={p}>
                    {PAYMENT_LABELS[p]}
                  </option>
                ))}
              </select>
            </FieldMini>
            <FieldMini label="Parcelas">
              <input
                type="number"
                min="1"
                value={draft.parcelas ?? 1}
                onChange={(e) => setDraft({ ...draft, parcelas: Number(e.target.value) })}
                className="w-full rounded-lg bg-input border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none"
              />
            </FieldMini>
          </div>

          <FieldMini label="Status do serviço">
            <select
              value={draft.status}
              onChange={(e) => setDraft({ ...draft, status: e.target.value as ProposalItemStatus })}
              className="w-full rounded-lg bg-input border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none"
            >
              {(Object.keys(ITEM_STATUS_LABELS) as ProposalItemStatus[]).map((s) => (
                <option key={s} value={s}>
                  {ITEM_STATUS_LABELS[s]}
                </option>
              ))}
            </select>
          </FieldMini>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <FieldMini label="Início">
              <input
                type="date"
                value={draft.data_inicio ?? ""}
                onChange={(e) => setDraft({ ...draft, data_inicio: e.target.value || null })}
                className="w-full rounded-lg bg-input border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none"
              />
            </FieldMini>
            <FieldMini label="Entrega prevista">
              <input
                type="date"
                value={draft.data_entrega_prevista ?? ""}
                onChange={(e) =>
                  setDraft({ ...draft, data_entrega_prevista: e.target.value || null })
                }
                className="w-full rounded-lg bg-input border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none"
              />
            </FieldMini>
            <FieldMini label="Entrega real">
              <input
                type="date"
                value={draft.data_entrega_real ?? ""}
                onChange={(e) => setDraft({ ...draft, data_entrega_real: e.target.value || null })}
                className="w-full rounded-lg bg-input border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none"
              />
            </FieldMini>
          </div>

          <FieldMini label="Entregáveis">
            <div className="space-y-2">
              {draft.entregaveis.map((e, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    value={e}
                    onChange={(ev) => {
                      const next = [...draft.entregaveis];
                      next[i] = ev.target.value;
                      setDraft({ ...draft, entregaveis: next });
                    }}
                    className="flex-1 rounded-lg bg-input border border-border px-3 py-1.5 text-sm focus:border-primary focus:outline-none"
                  />
                  <button
                    onClick={() =>
                      setDraft({
                        ...draft,
                        entregaveis: draft.entregaveis.filter((_, idx) => idx !== i),
                      })
                    }
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <input
                  value={entregavelInput}
                  onChange={(ev) => setEntregavelInput(ev.target.value)}
                  onKeyDown={(ev) => {
                    if (ev.key === "Enter") {
                      ev.preventDefault();
                      addEntregavel();
                    }
                  }}
                  placeholder="Adicionar entregável..."
                  className="flex-1 rounded-lg bg-input border border-border px-3 py-1.5 text-sm focus:border-primary focus:outline-none"
                />
                <button
                  onClick={addEntregavel}
                  className="inline-flex items-center gap-1 rounded-lg border border-border px-2 py-1.5 text-xs hover:border-primary"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </FieldMini>

          <div className="flex justify-end">
            <button
              onClick={save}
              disabled={saving}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-3 py-1.5 text-xs font-bold hover:opacity-90 disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Save className="h-3.5 w-3.5" />
              )}{" "}
              Salvar serviço
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FieldMini({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function ItemChip({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-border bg-secondary/60 px-1.5 py-0.5 text-[0.65rem] font-semibold text-muted-foreground">
      {icon} {children}
    </span>
  );
}

const STATUS_FLOW: ProposalItemStatus[] = ["proposto", "aprovado", "em_execucao", "entregue"];
function StatusTimeline({ status }: { status: ProposalItemStatus }) {
  if (status === "cancelado") {
    return <div className="h-1 bg-rose-500/30" />;
  }
  const idx = STATUS_FLOW.indexOf(status);
  return (
    <div className="flex h-1">
      {STATUS_FLOW.map((_, i) => (
        <div
          key={i}
          className={`flex-1 ${i <= idx ? "bg-primary" : "bg-secondary"} ${i > 0 ? "ml-0.5" : ""}`}
        />
      ))}
    </div>
  );
}
