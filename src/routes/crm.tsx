import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import {
  ClipboardCheck, Search, Lightbulb, Rocket, BarChart3, LogOut, X, Save,
  Trash2, Phone, Building2, Filter, Sparkles, FileDown, Loader2, Plus,
  Check, Target, TrendingUp,
} from "lucide-react";
import jsPDF from "jspdf";
import {
  enrichDiagnostico, generateAnalise, generatePlano, suggestMetricas,
} from "@/lib/ai-orientacao.functions";

export const Route = createFileRoute("/crm")({
  head: () => ({ meta: [{ title: "CRM — OrientoHub" }] }),
  component: CrmPage,
});

type Stage = "diagnostico" | "analise" | "estrategia" | "execucao" | "resultados";

type Lead = {
  id: string;
  nome: string;
  whatsapp: string;
  tipo_negocio: string | null;
  cnpj: string | null;
  desafios_reais: string | null;
  objetivos_organizacionais: string | null;
  anotacoes: string | null;
  stage: Stage;
  created_at: string;
  updated_at: string;
  diagnostico_ai: string | null;
  analise_ai: string | null;
  oportunidades: Oportunidade[];
  plano_acoes: Acao[];
  execucao_notas: string | null;
  resultados_metricas: Metrica[];
  resultados_notas: string | null;
};

type Oportunidade = { titulo: string; descricao: string; impacto: string; selecionada?: boolean };
type Acao = { titulo: string; descricao: string; prazo: string; responsavel: string; prioridade: string; concluida?: boolean };
type Metrica = { nome: string; unidade: string; frequencia: string; meta: string; valor_atual: string };

const STAGES: { value: Stage; label: string; icon: typeof ClipboardCheck }[] = [
  { value: "diagnostico", label: "Diagnóstico", icon: ClipboardCheck },
  { value: "analise", label: "Análise", icon: Search },
  { value: "estrategia", label: "Estratégia", icon: Lightbulb },
  { value: "execucao", label: "Execução", icon: Rocket },
  { value: "resultados", label: "Resultados", icon: BarChart3 },
];

function CrmPage() {
  const navigate = useNavigate();
  const [authReady, setAuthReady] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Stage | "all">("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Lead | null>(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setLeads(data as Lead[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate({ to: "/login" });
        return;
      }
      setAuthReady(true);
      await fetchLeads();
    };
    init();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate({ to: "/login" });
    });
    return () => subscription.unsubscribe();
  }, [navigate, fetchLeads]);

  // Realtime
  useEffect(() => {
    if (!authReady) return;
    const channel = supabase
      .channel("leads-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "leads" }, () => {
        fetchLeads();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [authReady, fetchLeads]);

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (filter !== "all" && l.stage !== filter) return false;
      if (query) {
        const q = query.toLowerCase();
        return [l.nome, l.whatsapp, l.tipo_negocio, l.cnpj]
          .some((v) => v?.toLowerCase().includes(q));
      }
      return true;
    });
  }, [leads, filter, query]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: leads.length };
    STAGES.forEach((s) => { c[s.value] = leads.filter((l) => l.stage === s.value).length; });
    return c;
  }, [leads]);

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  }

  if (!authReady) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Carregando...</div>;
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--gradient-hero)" }}>
      <header className="border-b border-border/40 bg-background/40 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex flex-col leading-none">
            <div className="text-xl font-bold tracking-tight">oriento<span className="text-primary">hub</span></div>
            <div className="text-[0.55rem] tracking-[0.3em] text-muted-foreground mt-0.5">CRM · GESTÃO DE CLIENTES</div>
          </Link>
          <button onClick={handleLogout} className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-primary">
            <LogOut className="h-4 w-4" /> Sair
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl md:text-4xl font-bold">Funil de clientes</h1>
        <p className="mt-1 text-sm text-muted-foreground">Trabalhe cada cliente nas 5 etapas — do Diagnóstico aos Resultados.</p>

        {/* Stage chips */}
        <div className="mt-6 flex flex-wrap gap-2">
          <StageChip active={filter === "all"} onClick={() => setFilter("all")} label="Todos" count={counts.all} />
          {STAGES.map((s) => (
            <StageChip
              key={s.value}
              active={filter === s.value}
              onClick={() => setFilter(s.value)}
              label={s.label}
              count={counts[s.value] ?? 0}
              icon={<s.icon className="h-3.5 w-3.5" />}
            />
          ))}
        </div>

        {/* Search */}
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-border bg-background/60 backdrop-blur px-3 py-2 max-w-md">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nome, WhatsApp, CNPJ..."
            className="flex-1 bg-transparent text-sm focus:outline-none"
          />
        </div>

        {/* Table */}
        <div className="mt-6 rounded-2xl border border-border bg-card/60 backdrop-blur overflow-hidden" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/40">
                <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-3">Cliente</th>
                  <th className="px-4 py-3">Negócio</th>
                  <th className="px-4 py-3">WhatsApp</th>
                  <th className="px-4 py-3">Etapa</th>
                  <th className="px-4 py-3">Recebido em</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">Carregando...</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">Nenhum cliente nesta etapa ainda.</td></tr>
                ) : filtered.map((l) => (
                  <tr key={l.id} onClick={() => setSelected(l)} className="border-t border-border/40 cursor-pointer hover:bg-secondary/30 transition">
                    <td className="px-4 py-3">
                      <div className="font-semibold">{l.nome}</div>
                      {l.cnpj && <div className="text-xs text-muted-foreground mt-0.5">CNPJ: {l.cnpj}</div>}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{l.tipo_negocio || "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{l.whatsapp}</td>
                    <td className="px-4 py-3">
                      <StageBadge stage={l.stage} />
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {new Date(l.created_at).toLocaleDateString("pt-BR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {selected && (
        <LeadDrawer
          lead={selected}
          onClose={() => setSelected(null)}
          onSaved={() => { setSelected(null); fetchLeads(); }}
          onDeleted={() => { setSelected(null); fetchLeads(); }}
        />
      )}
    </div>
  );
}

function StageChip({ active, onClick, label, count, icon }: { active: boolean; onClick: () => void; label: string; count: number; icon?: React.ReactNode; }) {
  return (
    <button onClick={onClick} className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition border ${active ? "bg-primary text-primary-foreground border-primary" : "bg-background/40 text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"}`}>
      {icon}
      {label}
      <span className={`rounded-full px-2 py-0.5 text-[0.65rem] ${active ? "bg-primary-foreground/20" : "bg-secondary"}`}>{count}</span>
    </button>
  );
}

function StageBadge({ stage }: { stage: Stage }) {
  const s = STAGES.find((x) => x.value === stage)!;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 border border-primary/30 px-2.5 py-1 text-xs font-semibold text-primary">
      <s.icon className="h-3 w-3" /> {s.label}
    </span>
  );
}

function LeadDrawer({ lead, onClose, onSaved, onDeleted }: { lead: Lead; onClose: () => void; onSaved: () => void; onDeleted: () => void; }) {
  const [draft, setDraft] = useState<Lead>(lead);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function save() {
    setSaving(true); setErr(null);
    const { error } = await supabase
      .from("leads")
      .update({
        nome: draft.nome,
        whatsapp: draft.whatsapp,
        tipo_negocio: draft.tipo_negocio,
        cnpj: draft.cnpj,
        desafios_reais: draft.desafios_reais,
        objetivos_organizacionais: draft.objetivos_organizacionais,
        anotacoes: draft.anotacoes,
        stage: draft.stage,
      })
      .eq("id", lead.id);
    setSaving(false);
    if (error) { setErr(error.message); return; }
    onSaved();
  }

  async function remove() {
    if (!confirm("Excluir este cliente do funil?")) return;
    const { error } = await supabase.from("leads").delete().eq("id", lead.id);
    if (!error) onDeleted();
  }

  const waLink = `https://wa.me/${draft.whatsapp.replace(/\D/g, "")}`;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
      <aside onClick={(e) => e.stopPropagation()} className="relative w-full max-w-xl bg-card border-l border-border h-full overflow-y-auto p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Cliente</div>
            <h2 className="text-2xl font-bold mt-1">{lead.nome}</h2>
            <div className="mt-2 flex items-center gap-3">
              <a href={waLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
                <Phone className="h-3 w-3" /> Abrir WhatsApp
              </a>
              {draft.cnpj && (
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Building2 className="h-3 w-3" /> {draft.cnpj}
                </span>
              )}
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-secondary"><X className="h-5 w-5" /></button>
        </div>

        <div className="mt-6 space-y-5">
          <Field label="Etapa do funil">
            <div className="grid grid-cols-5 gap-1.5">
              {STAGES.map((s) => (
                <button key={s.value} onClick={() => setDraft({ ...draft, stage: s.value })}
                  className={`flex flex-col items-center gap-1 rounded-lg border px-2 py-2 text-[0.65rem] uppercase tracking-wider font-semibold transition ${draft.stage === s.value ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}>
                  <s.icon className="h-4 w-4" /> {s.label}
                </button>
              ))}
            </div>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Nome"><Input value={draft.nome} onChange={(v) => setDraft({ ...draft, nome: v })} /></Field>
            <Field label="WhatsApp"><Input value={draft.whatsapp} onChange={(v) => setDraft({ ...draft, whatsapp: v })} /></Field>
            <Field label="Tipo de negócio"><Input value={draft.tipo_negocio ?? ""} onChange={(v) => setDraft({ ...draft, tipo_negocio: v })} /></Field>
            <Field label="CNPJ"><Input value={draft.cnpj ?? ""} onChange={(v) => setDraft({ ...draft, cnpj: v })} /></Field>
          </div>

          <Field label="Desafios reais"><Textarea value={draft.desafios_reais ?? ""} onChange={(v) => setDraft({ ...draft, desafios_reais: v })} /></Field>
          <Field label="Objetivos organizacionais"><Textarea value={draft.objetivos_organizacionais ?? ""} onChange={(v) => setDraft({ ...draft, objetivos_organizacionais: v })} /></Field>
          <Field label="Anotações internas"><Textarea value={draft.anotacoes ?? ""} onChange={(v) => setDraft({ ...draft, anotacoes: v })} /></Field>

          {err && <p className="text-xs text-destructive">{err}</p>}

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <button onClick={remove} className="inline-flex items-center gap-2 text-xs text-destructive hover:underline">
              <Trash2 className="h-4 w-4" /> Excluir
            </button>
            <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground font-bold px-5 py-2.5 hover:opacity-90 transition disabled:opacity-60">
              <Save className="h-4 w-4" /> {saving ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function Input({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input value={value} onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg bg-input border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none" />
  );
}

function Textarea({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3}
      className="w-full rounded-lg bg-input border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none resize-none" />
  );
}