import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Plus,
  Save,
  Trash2,
  Loader2,
  Power,
  Package,
  DollarSign,
  Clock,
  ListChecks,
  CreditCard,
  ChevronDown,
  ChevronUp,
  Search,
} from "lucide-react";
import { CrmShell } from "@/components/crm/CrmShell";
import {
  formatBRL,
  parseEntregaveis,
  PAYMENT_LABELS,
  type PaymentMethod,
  type ServiceCatalog,
} from "@/components/crm/types";

export const Route = createFileRoute("/crm/servicos")({
  head: () => ({ meta: [{ title: "Catálogo de Serviços — Orientamais" }] }),
  component: ServicosPage,
});

function ServicosPage() {
  const navigate = useNavigate();
  const [authReady, setAuthReady] = useState(false);
  const [list, setList] = useState<ServiceCatalog[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [showInactive, setShowInactive] = useState(false);

  const reload = useCallback(async () => {
    setLoading(true);
    setErr(null);
    const { data, error } = await supabase.from("services_catalog").select("*").order("nome");
    if (error) setErr(error.message);
    const rows = (data ?? []) as Array<
      Omit<ServiceCatalog, "entregaveis"> & { entregaveis: unknown }
    >;
    setList(rows.map((c) => ({ ...c, entregaveis: parseEntregaveis(c.entregaveis) })));
    setLoading(false);
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate({ to: "/login" });
        return;
      }
      setAuthReady(true);
      await reload();
    })();
  }, [navigate, reload]);

  const filtered = useMemo(() => {
    return list.filter((s) => {
      if (!showInactive && !s.ativo) return false;
      if (query) {
        const q = query.toLowerCase();
        return s.nome.toLowerCase().includes(q) || (s.descricao ?? "").toLowerCase().includes(q);
      }
      return true;
    });
  }, [list, query, showInactive]);

  const stats = useMemo(() => {
    const ativos = list.filter((s) => s.ativo);
    const ticketMedio = ativos.length
      ? ativos.reduce((acc, s) => acc + Number(s.valor_padrao ?? 0), 0) / ativos.length
      : 0;
    return { total: list.length, ativos: ativos.length, ticketMedio };
  }, [list]);

  async function createNew() {
    const { error } = await supabase.from("services_catalog").insert({
      nome: "Novo serviço",
      valor_padrao: 0,
      prazo_dias: 30,
      entregaveis: [],
      forma_pagamento_padrao: "a_vista",
      parcelas_padrao: 1,
    });
    if (error) {
      setErr(error.message);
      return;
    }
    reload();
  }

  if (!authReady) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Carregando...
      </div>
    );
  }

  const actions = (
    <button
      onClick={createNew}
      className="inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-3 py-1.5 text-xs font-bold hover:opacity-90"
    >
      <Plus className="h-3.5 w-3.5" /> Novo serviço
    </button>
  );

  return (
    <CrmShell
      title="Catálogo de serviços"
      subtitle="Modelos reutilizáveis para montar propostas dos clientes"
      actions={actions}
    >
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <StatCard
            icon={<Package className="h-4 w-4" />}
            label="Serviços cadastrados"
            value={String(stats.total)}
          />
          <StatCard
            icon={<Power className="h-4 w-4" />}
            label="Ativos"
            value={String(stats.ativos)}
            accent="emerald"
          />
          <StatCard
            icon={<DollarSign className="h-4 w-4" />}
            label="Ticket médio"
            value={formatBRL(stats.ticketMedio)}
            accent="primary"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[220px] flex items-center gap-2 rounded-lg border border-border bg-background/60 backdrop-blur px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar serviço..."
              className="flex-1 bg-transparent text-sm focus:outline-none"
            />
          </div>
          <label className="inline-flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={showInactive}
              onChange={(e) => setShowInactive(e.target.checked)}
              className="accent-primary"
            />
            Mostrar inativos
          </label>
        </div>
        {err && (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
            {err}
          </div>
        )}
        {loading ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Carregando...
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-secondary/30 p-12 text-center">
            <Package className="h-10 w-10 mx-auto text-muted-foreground/60" />
            <p className="mt-3 text-sm text-muted-foreground">
              {list.length === 0
                ? "Nenhum serviço cadastrado ainda."
                : "Nenhum serviço encontrado."}
            </p>
            {list.length === 0 && (
              <button
                onClick={createNew}
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-bold hover:opacity-90"
              >
                <Plus className="h-4 w-4" /> Criar primeiro serviço
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((svc) => (
              <ServiceCard key={svc.id} svc={svc} onChange={reload} />
            ))}
          </div>
        )}
      </div>
    </CrmShell>
  );
}

function StatCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: "primary" | "emerald";
}) {
  const accentCls =
    accent === "primary"
      ? "text-primary"
      : accent === "emerald"
        ? "text-emerald-600 dark:text-emerald-400"
        : "text-foreground";
  return (
    <div
      className="rounded-2xl border border-border bg-card/60 backdrop-blur px-4 py-3"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground">
        {icon} {label}
      </div>
      <div className={`mt-1 text-xl font-bold ${accentCls}`}>{value}</div>
    </div>
  );
}

function ServiceCard({ svc, onChange }: { svc: ServiceCatalog; onChange: () => void }) {
  const [draft, setDraft] = useState<ServiceCatalog>(svc);
  const [saving, setSaving] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [entregavelInput, setEntregavelInput] = useState("");

  useEffect(() => {
    setDraft(svc);
  }, [svc]);

  async function save() {
    setSaving(true);
    const { error } = await supabase
      .from("services_catalog")
      .update({
        nome: draft.nome,
        descricao: draft.descricao,
        valor_padrao: Number(draft.valor_padrao ?? 0),
        prazo_dias: draft.prazo_dias,
        entregaveis: draft.entregaveis,
        forma_pagamento_padrao: draft.forma_pagamento_padrao,
        parcelas_padrao: draft.parcelas_padrao,
        ativo: draft.ativo,
      })
      .eq("id", svc.id);
    setSaving(false);
    if (!error) onChange();
  }

  async function remove() {
    if (!confirm(`Excluir "${svc.nome}"?`)) return;
    await supabase.from("services_catalog").delete().eq("id", svc.id);
    onChange();
  }

  async function toggleAtivo() {
    const next = !draft.ativo;
    setDraft({ ...draft, ativo: next });
    await supabase.from("services_catalog").update({ ativo: next }).eq("id", svc.id);
    onChange();
  }

  function addEntregavel() {
    const v = entregavelInput.trim();
    if (!v) return;
    setDraft({ ...draft, entregaveis: [...draft.entregaveis, v] });
    setEntregavelInput("");
  }

  return (
    <div
      className={`group rounded-2xl border bg-card/70 backdrop-blur overflow-hidden transition ${draft.ativo ? "border-border hover:border-primary/40" : "border-border/50 opacity-70"}`}
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="p-4 border-b border-border/50">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <input
              value={draft.nome}
              onChange={(e) => setDraft({ ...draft, nome: e.target.value })}
              className="w-full bg-transparent text-base font-bold focus:outline-none border-b border-transparent focus:border-primary"
            />
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <Chip icon={<DollarSign className="h-3 w-3" />}>{formatBRL(draft.valor_padrao)}</Chip>
              <Chip icon={<Clock className="h-3 w-3" />}>{draft.prazo_dias ?? 0} dias</Chip>
              <Chip icon={<CreditCard className="h-3 w-3" />}>
                {PAYMENT_LABELS[draft.forma_pagamento_padrao ?? "a_vista"]}
              </Chip>
              <Chip icon={<ListChecks className="h-3 w-3" />}>
                {draft.entregaveis.length} entregáveis
              </Chip>
            </div>
          </div>
          <button
            onClick={toggleAtivo}
            className={`shrink-0 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[0.65rem] font-bold ${draft.ativo ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "border-border bg-secondary text-muted-foreground"}`}
          >
            <Power className="h-3 w-3" /> {draft.ativo ? "Ativo" : "Inativo"}
          </button>
        </div>
      </div>
      <button
        onClick={() => setExpanded((e) => !e)}
        className="w-full px-4 py-2 text-left text-xs font-semibold text-muted-foreground hover:bg-secondary/40 flex items-center justify-between"
      >
        <span>{expanded ? "Recolher detalhes" : "Editar detalhes"}</span>
        {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
      </button>
      {expanded && (
        <div className="p-4 space-y-3 border-t border-border/50">
          <FieldMini label="Descrição">
            <textarea
              value={draft.descricao ?? ""}
              onChange={(e) => setDraft({ ...draft, descricao: e.target.value })}
              rows={2}
              placeholder="Para que serve este serviço?"
              className="w-full rounded-lg bg-input border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none resize-none"
            />
          </FieldMini>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <FieldMini label="Valor (R$)">
              <input
                type="number"
                step="0.01"
                min="0"
                value={draft.valor_padrao ?? 0}
                onChange={(e) => setDraft({ ...draft, valor_padrao: Number(e.target.value) })}
                className="w-full rounded-lg bg-input border border-border px-2.5 py-2 text-sm focus:border-primary focus:outline-none"
              />
            </FieldMini>
            <FieldMini label="Prazo (dias)">
              <input
                type="number"
                min="0"
                value={draft.prazo_dias ?? 0}
                onChange={(e) => setDraft({ ...draft, prazo_dias: Number(e.target.value) })}
                className="w-full rounded-lg bg-input border border-border px-2.5 py-2 text-sm focus:border-primary focus:outline-none"
              />
            </FieldMini>
            <FieldMini label="Pagamento">
              <select
                value={draft.forma_pagamento_padrao ?? "a_vista"}
                onChange={(e) =>
                  setDraft({ ...draft, forma_pagamento_padrao: e.target.value as PaymentMethod })
                }
                className="w-full rounded-lg bg-input border border-border px-2 py-2 text-sm focus:border-primary focus:outline-none"
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
                value={draft.parcelas_padrao ?? 1}
                onChange={(e) => setDraft({ ...draft, parcelas_padrao: Number(e.target.value) })}
                className="w-full rounded-lg bg-input border border-border px-2.5 py-2 text-sm focus:border-primary focus:outline-none"
              />
            </FieldMini>
          </div>
          <FieldMini label="Entregáveis">
            <div className="space-y-2">
              {draft.entregaveis.map((e, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-[0.65rem] text-muted-foreground w-5">{i + 1}.</span>
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
          <div className="flex justify-between items-center pt-2 border-t border-border/50">
            <button
              onClick={remove}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-3.5 w-3.5" /> Excluir
            </button>
            <button
              onClick={save}
              disabled={saving}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-3 py-2 text-xs font-bold hover:opacity-90 disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Save className="h-3.5 w-3.5" />
              )}{" "}
              Salvar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Chip({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-border bg-secondary/60 px-1.5 py-0.5 text-[0.65rem] font-semibold text-muted-foreground">
      {icon} {children}
    </span>
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
