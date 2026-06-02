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
  const [tab, setTab] = useState<"dados" | Stage>(lead.stage);
  const [aiLoading, setAiLoading] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  const runEnrich = useServerFn(enrichDiagnostico);
  const runAnalise = useServerFn(generateAnalise);
  const runPlano = useServerFn(generatePlano);
  const runMetricas = useServerFn(suggestMetricas);

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
        diagnostico_ai: draft.diagnostico_ai,
        analise_ai: draft.analise_ai,
        oportunidades: draft.oportunidades,
        plano_acoes: draft.plano_acoes,
        execucao_notas: draft.execucao_notas,
        resultados_metricas: draft.resultados_metricas,
        resultados_notas: draft.resultados_notas,
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

  async function runAI(key: string, fn: () => Promise<any>, apply: (r: any) => void) {
    setAiLoading(key); setAiError(null);
    try { apply(await fn()); }
    catch (e: any) { setAiError(e?.message ?? "Erro ao consultar a IA"); }
    finally { setAiLoading(null); }
  }

  function exportPDF() {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const W = doc.internal.pageSize.getWidth();
    const M = 48;
    let y = M;
    const line = (txt: string, size = 11, bold = false, color: [number, number, number] = [30, 30, 30]) => {
      doc.setFont("helvetica", bold ? "bold" : "normal");
      doc.setFontSize(size);
      doc.setTextColor(color[0], color[1], color[2]);
      const lines = doc.splitTextToSize(txt, W - M * 2);
      lines.forEach((ln: string) => {
        if (y > 780) { doc.addPage(); y = M; }
        doc.text(ln, M, y);
        y += size + 4;
      });
    };
    const hr = () => { y += 6; doc.setDrawColor(200); doc.line(M, y, W - M, y); y += 12; };
    const h1 = (t: string) => { y += 10; line(t, 18, true, [20, 90, 50]); };
    const h2 = (t: string) => { y += 4; line(t, 13, true, [30, 60, 40]); };
    line("OrientoHub", 22, true, [20, 90, 50]);
    line("Plano de Orientação Estratégica", 11, false, [120, 120, 120]);
    hr();
    h2("Cliente");
    line(draft.nome, 12, true);
    line(`WhatsApp: ${draft.whatsapp}`);
    if (draft.tipo_negocio) line(`Negócio: ${draft.tipo_negocio}`);
    if (draft.cnpj) line(`CNPJ: ${draft.cnpj}`);
    if (draft.diagnostico_ai) { h1("1. Diagnóstico"); line(draft.diagnostico_ai); }
    if (draft.analise_ai) { h1("2. Análise"); line(draft.analise_ai); }
    const opSel = (draft.oportunidades ?? []).filter((o) => o.selecionada);
    if (opSel.length) {
      h1("3. Oportunidades priorizadas");
      opSel.forEach((o, i) => { h2(`${i + 1}. ${o.titulo} · impacto ${o.impacto}`); line(o.descricao); });
    }
    if ((draft.plano_acoes ?? []).length) {
      h1("4. Plano de Ação");
      draft.plano_acoes.forEach((a, i) => {
        h2(`${i + 1}. ${a.titulo}`);
        line(`Prazo: ${a.prazo}  ·  Responsável: ${a.responsavel}  ·  Prioridade: ${a.prioridade}`, 10, false, [110, 110, 110]);
        line(a.descricao);
      });
    }
    if ((draft.resultados_metricas ?? []).length) {
      h1("5. Métricas de acompanhamento");
      draft.resultados_metricas.forEach((m) => line(`• ${m.nome} (${m.unidade}) — meta ${m.meta} · ${m.frequencia}`));
    }
    doc.save(`orientohub-${draft.nome.replace(/\s+/g, "-").toLowerCase()}.pdf`);
  }

  const waLink = `https://wa.me/${draft.whatsapp.replace(/\D/g, "")}`;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
      <aside onClick={(e) => e.stopPropagation()} className="relative w-full max-w-2xl bg-card border-l border-border h-full overflow-y-auto">
        <div className="p-6 pb-0">
        <div className="flex items-start justify-between gap-3">
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
          <div className="flex items-center gap-2">
            <button onClick={exportPDF} title="Exportar PDF" className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold hover:border-primary hover:text-primary">
              <FileDown className="h-4 w-4" /> PDF
            </button>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-secondary"><X className="h-5 w-5" /></button>
          </div>
        </div>
        <div className="mt-6 flex gap-1 border-b border-border overflow-x-auto">
          <TabBtn active={tab === "dados"} onClick={() => setTab("dados")} label="Dados" />
          {STAGES.map((s) => (
            <TabBtn key={s.value} active={tab === s.value} onClick={() => setTab(s.value)} label={s.label} icon={<s.icon className="h-3.5 w-3.5" />} />
          ))}
        </div>
        </div>

        <div className="p-6 space-y-5">
          {aiError && <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">{aiError}</div>}

          {tab === "dados" && (
            <>
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
            </>
          )}

          {tab === "diagnostico" && (
            <>
              <Field label="Anotações do consultor (insumo da IA)">
                <Textarea value={draft.anotacoes ?? ""} onChange={(v) => setDraft({ ...draft, anotacoes: v })} />
              </Field>
              <AIButton loading={aiLoading === "diag"}
                onClick={() => runAI("diag", () => runEnrich({ data: { leadId: lead.id } }), (r) => setDraft({ ...draft, diagnostico_ai: r.diagnostico_ai }))}
                label={draft.diagnostico_ai ? "Reprocessar diagnóstico com IA" : "Enriquecer diagnóstico com IA"}
                hint="Combina os dados do formulário + suas anotações" />
              <Field label="Diagnóstico enriquecido">
                <Textarea rows={12} value={draft.diagnostico_ai ?? ""} onChange={(v) => setDraft({ ...draft, diagnostico_ai: v })} />
              </Field>
            </>
          )}

          {tab === "analise" && (
            <>
              <AIButton loading={aiLoading === "ana"} disabled={!draft.diagnostico_ai}
                onClick={() => runAI("ana", () => runAnalise({ data: { leadId: lead.id } }), (r) => setDraft({ ...draft, analise_ai: r.analise_ai, oportunidades: r.oportunidades }))}
                label={draft.analise_ai ? "Reprocessar análise" : "Gerar análise + oportunidades"}
                hint={draft.diagnostico_ai ? "Transborda o diagnóstico em análise detalhada" : "Gere o diagnóstico antes"} />
              <Field label="Análise detalhada">
                <Textarea rows={10} value={draft.analise_ai ?? ""} onChange={(v) => setDraft({ ...draft, analise_ai: v })} />
              </Field>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2"><Target className="h-3.5 w-3.5" /> Oportunidades encontradas</label>
                <div className="mt-2 space-y-2">
                  {(draft.oportunidades ?? []).length === 0 && <p className="text-xs text-muted-foreground">Nenhuma oportunidade ainda. Gere a análise.</p>}
                  {(draft.oportunidades ?? []).map((o, i) => (
                    <label key={i} className={`flex gap-3 rounded-lg border p-3 cursor-pointer transition ${o.selecionada ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}>
                      <input type="checkbox" checked={!!o.selecionada} onChange={(e) => {
                        const next = [...draft.oportunidades]; next[i] = { ...o, selecionada: e.target.checked };
                        setDraft({ ...draft, oportunidades: next });
                      }} className="mt-1 accent-primary" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <div className="font-semibold text-sm">{o.titulo}</div>
                          <span className={`text-[0.6rem] uppercase font-bold px-1.5 py-0.5 rounded ${o.impacto === "alto" ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"}`}>{o.impacto}</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">{o.descricao}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          {tab === "estrategia" && (
            <>
              <AIButton loading={aiLoading === "plano"}
                disabled={(draft.oportunidades ?? []).filter((o) => o.selecionada).length === 0}
                onClick={() => runAI("plano", () => runPlano({ data: { leadId: lead.id } }), (r) => setDraft({ ...draft, plano_acoes: r.plano_acoes }))}
                label={draft.plano_acoes?.length ? "Reprocessar plano" : "Gerar plano de ação personalizado"}
                hint="Com base nas oportunidades selecionadas" />
              <div className="space-y-2">
                {(draft.plano_acoes ?? []).length === 0 && <p className="text-xs text-muted-foreground">Nenhuma ação ainda.</p>}
                {(draft.plano_acoes ?? []).map((a, i) => (
                  <div key={i} className="rounded-lg border border-border p-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-semibold text-sm"><span className="text-primary">{i + 1}.</span> {a.titulo}</div>
                      <span className={`text-[0.6rem] uppercase font-bold px-1.5 py-0.5 rounded ${a.prioridade === "alta" ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"}`}>{a.prioridade}</span>
                    </div>
                    <div className="text-[0.65rem] uppercase tracking-wider text-muted-foreground mt-1">Prazo: {a.prazo} · Responsável: {a.responsavel}</div>
                    <div className="text-xs text-muted-foreground mt-2 whitespace-pre-wrap">{a.descricao}</div>
                  </div>
                ))}
              </div>
              {draft.plano_acoes?.length > 0 && (
                <button onClick={exportPDF} className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground font-bold px-4 py-3 hover:opacity-90">
                  <FileDown className="h-4 w-4" /> Gerar PDF para o empreendedor
                </button>
              )}
            </>
          )}

          {tab === "execucao" && (
            <>
              <div className="rounded-lg border border-border p-3 text-xs text-muted-foreground">
                <p className="font-semibold text-foreground mb-1 flex items-center gap-1.5"><Rocket className="h-3.5 w-3.5 text-primary" /> Acompanhamento da execução</p>
                Marque as ações concluídas e registre observações de campo.
              </div>
              <div className="space-y-2">
                {(draft.plano_acoes ?? []).map((a, i) => (
                  <label key={i} className={`flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition ${a.concluida ? "border-primary bg-primary/5" : "border-border"}`}>
                    <input type="checkbox" checked={!!a.concluida} onChange={(e) => {
                      const next = [...draft.plano_acoes]; next[i] = { ...a, concluida: e.target.checked };
                      setDraft({ ...draft, plano_acoes: next });
                    }} className="mt-1 accent-primary" />
                    <div className="flex-1">
                      <div className={`font-semibold text-sm ${a.concluida ? "line-through text-muted-foreground" : ""}`}>{a.titulo}</div>
                      <div className="text-[0.65rem] uppercase tracking-wider text-muted-foreground mt-0.5">{a.prazo} · {a.responsavel}</div>
                    </div>
                    {a.concluida && <Check className="h-4 w-4 text-primary" />}
                  </label>
                ))}
              </div>
              <Field label="Notas de execução">
                <Textarea rows={6} value={draft.execucao_notas ?? ""} onChange={(v) => setDraft({ ...draft, execucao_notas: v })} />
              </Field>
            </>
          )}

          {tab === "resultados" && (
            <>
              <AIButton loading={aiLoading === "metricas"} disabled={(draft.plano_acoes ?? []).length === 0}
                onClick={() => runAI("metricas", () => runMetricas({ data: { leadId: lead.id } }), (r) => setDraft({ ...draft, resultados_metricas: r.resultados_metricas }))}
                label={draft.resultados_metricas?.length ? "Atualizar métricas sugeridas" : "Sugerir métricas com IA"}
                hint="Métricas-chave para mensurar e ajustar" />
              <div className="space-y-2">
                {(draft.resultados_metricas ?? []).map((m, i) => (
                  <div key={i} className="rounded-lg border border-border p-3 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-semibold text-sm flex items-center gap-1.5"><TrendingUp className="h-3.5 w-3.5 text-primary" /> {m.nome}</div>
                      <span className="text-[0.6rem] uppercase tracking-wider text-muted-foreground">{m.frequencia}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <div className="text-[0.6rem] uppercase text-muted-foreground">Meta</div>
                        <div className="font-semibold">{m.meta} <span className="text-muted-foreground font-normal">{m.unidade}</span></div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-[0.6rem] uppercase text-muted-foreground">Valor atual</div>
                        <input value={m.valor_atual} onChange={(e) => {
                          const next = [...draft.resultados_metricas]; next[i] = { ...m, valor_atual: e.target.value };
                          setDraft({ ...draft, resultados_metricas: next });
                        }} className="w-full rounded bg-input border border-border px-2 py-1 text-xs focus:border-primary focus:outline-none" />
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={() => setDraft({ ...draft, resultados_metricas: [...(draft.resultados_metricas ?? []), { nome: "", unidade: "", frequencia: "Semanal", meta: "", valor_atual: "" }] })} className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-border py-2 text-xs text-muted-foreground hover:border-primary hover:text-primary">
                  <Plus className="h-3.5 w-3.5" /> Adicionar métrica manual
                </button>
              </div>
              <Field label="Observações de acompanhamento e ajustes">
                <Textarea rows={5} value={draft.resultados_notas ?? ""} onChange={(v) => setDraft({ ...draft, resultados_notas: v })} />
              </Field>
            </>
          )}

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

function TabBtn({ active, onClick, label, icon }: { active: boolean; onClick: () => void; label: string; icon?: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-wider whitespace-nowrap border-b-2 transition ${active ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
      {icon} {label}
    </button>
  );
}

function AIButton({ loading, disabled, onClick, label, hint }: { loading: boolean; disabled?: boolean; onClick: () => void; label: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-primary/30 bg-primary/5 p-3">
      <button onClick={onClick} disabled={loading || disabled} className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground font-bold px-4 py-2.5 hover:opacity-90 transition disabled:opacity-50">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
        {loading ? "Processando com IA..." : label}
      </button>
      {hint && <p className="mt-2 text-[0.7rem] text-center text-muted-foreground">{hint}</p>}
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