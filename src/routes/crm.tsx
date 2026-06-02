import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import {
  ClipboardCheck, Search, Lightbulb, Rocket, BarChart3, LogOut, X, Save,
  Trash2, Phone, Building2, Filter, Sparkles, FileDown, Loader2, Plus,
  Check, Target, TrendingUp,
} from "lucide-react";
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

  async function exportPDF() {
    const { default: jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const W = doc.internal.pageSize.getWidth();
    const H = doc.internal.pageSize.getHeight();
    const M = 48;
    const CONTENT_W = W - M * 2;

    // Brand palette
    const C = {
      primary: [16, 120, 80] as [number, number, number],
      primaryDark: [10, 70, 50] as [number, number, number],
      ink: [25, 35, 30] as [number, number, number],
      sub: [110, 115, 112] as [number, number, number],
      soft: [240, 246, 242] as [number, number, number],
      border: [220, 225, 222] as [number, number, number],
      accent: [200, 160, 60] as [number, number, number],
    };
    const impactColor = (i: string): [number, number, number] =>
      i === "alto" ? [190, 60, 60] : i === "medio" ? [200, 140, 50] : [70, 130, 90];
    const prioColor = (p: string): [number, number, number] =>
      p === "alta" ? [190, 60, 60] : p === "media" ? [200, 140, 50] : [70, 130, 90];

    let y = M;
    let pageNum = 0;
    const TOP = 90;
    const BOTTOM = H - 60;

    const fill = (rgb: [number, number, number]) => doc.setFillColor(rgb[0], rgb[1], rgb[2]);
    const stroke = (rgb: [number, number, number]) => doc.setDrawColor(rgb[0], rgb[1], rgb[2]);
    const ink = (rgb: [number, number, number]) => doc.setTextColor(rgb[0], rgb[1], rgb[2]);
    const setFont = (size: number, bold = false) => {
      doc.setFont("helvetica", bold ? "bold" : "normal");
      doc.setFontSize(size);
    };

    const drawHeader = () => {
      fill(C.primary);
      doc.rect(0, 0, W, 56, "F");
      fill(C.accent);
      doc.rect(0, 56, W, 3, "F");
      ink([255, 255, 255]);
      setFont(13, true);
      doc.text("orientohub", M, 34);
      setFont(9, false);
      ink([220, 240, 230]);
      doc.text("Plano de Orientação Estratégica", M, 47);
      setFont(9, false);
      ink([220, 240, 230]);
      doc.text(
        new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" }),
        W - M,
        40,
        { align: "right" },
      );
    };
    const drawFooter = () => {
      stroke(C.border);
      doc.line(M, H - 40, W - M, H - 40);
      setFont(8, false);
      ink(C.sub);
      doc.text("orientohub · consultoria estratégica para empreendedores", M, H - 26);
      doc.text(`${pageNum}`, W - M, H - 26, { align: "right" });
    };
    const newPage = (firstPage = false) => {
      if (!firstPage) doc.addPage();
      pageNum++;
      drawHeader();
      drawFooter();
      y = TOP;
    };
    const ensure = (need: number) => {
      if (y + need > BOTTOM) newPage();
    };

    // Markdown-aware paragraph renderer
    const stripMd = (s: string) =>
      s.replace(/\*\*(.+?)\*\*/g, "$1").replace(/`([^`]+)`/g, "$1").replace(/^#+\s*/gm, "");
    const paragraph = (txt: string, opts: { size?: number; bold?: boolean; color?: [number, number, number]; lh?: number; indent?: number } = {}) => {
      const size = opts.size ?? 10.5;
      const lh = opts.lh ?? size + 4;
      const indent = opts.indent ?? 0;
      setFont(size, opts.bold);
      ink(opts.color ?? C.ink);
      const lines = doc.splitTextToSize(stripMd(txt), CONTENT_W - indent);
      lines.forEach((ln: string) => {
        ensure(lh);
        doc.text(ln, M + indent, y);
        y += lh;
      });
    };
    const renderMarkdown = (md: string) => {
      const blocks = md.split(/\n\s*\n/);
      blocks.forEach((block) => {
        const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
        lines.forEach((ln) => {
          if (/^#{1,2}\s/.test(ln)) {
            y += 4;
            paragraph(ln.replace(/^#+\s*/, ""), { size: 12, bold: true, color: C.primaryDark });
          } else if (/^#{3,}\s/.test(ln)) {
            paragraph(ln.replace(/^#+\s*/, ""), { size: 11, bold: true, color: C.ink });
          } else if (/^[-*•]\s/.test(ln)) {
            const txt = ln.replace(/^[-*•]\s/, "");
            ensure(14);
            fill(C.primary);
            doc.circle(M + 3, y - 3, 1.6, "F");
            paragraph(txt, { indent: 14 });
          } else if (/^\d+\.\s/.test(ln)) {
            paragraph(ln, { indent: 6 });
          } else {
            paragraph(ln);
          }
        });
        y += 4;
      });
    };

    const sectionTitle = (num: number, title: string) => {
      ensure(60);
      y += 10;
      fill(C.primary);
      doc.roundedRect(M, y - 14, 26, 26, 4, 4, "F");
      ink([255, 255, 255]);
      setFont(13, true);
      doc.text(String(num), M + 13, y + 4, { align: "center" });
      ink(C.primaryDark);
      setFont(15, true);
      doc.text(title, M + 38, y + 4);
      stroke(C.border);
      doc.line(M, y + 18, W - M, y + 18);
      y += 34;
    };

    const badge = (text: string, x: number, yy: number, color: [number, number, number]) => {
      setFont(8, true);
      const tw = doc.getTextWidth(text) + 14;
      fill([color[0], color[1], color[2]]);
      doc.setGState(new (doc as any).GState({ opacity: 0.15 }));
      doc.roundedRect(x, yy - 9, tw, 14, 7, 7, "F");
      doc.setGState(new (doc as any).GState({ opacity: 1 }));
      ink(color);
      doc.text(text.toUpperCase(), x + 7, yy + 1);
      return tw;
    };

    // ===== COVER =====
    newPage(true);
    // Big hero block
    fill(C.soft);
    doc.roundedRect(M, y, CONTENT_W, 220, 10, 10, "F");
    ink(C.sub);
    setFont(9, true);
    doc.text("PLANO PERSONALIZADO PARA", M + 24, y + 32);
    ink(C.primaryDark);
    setFont(26, true);
    const nameLines = doc.splitTextToSize(draft.nome, CONTENT_W - 48);
    let ny = y + 64;
    nameLines.slice(0, 2).forEach((ln: string) => { doc.text(ln, M + 24, ny); ny += 30; });
    if (draft.tipo_negocio) {
      ink(C.sub);
      setFont(11, false);
      doc.text(draft.tipo_negocio, M + 24, ny + 6);
    }
    // chips row
    let cy = y + 170;
    ink(C.sub);
    setFont(9, true);
    doc.text("CONTATO", M + 24, cy);
    ink(C.ink);
    setFont(11, true);
    doc.text(draft.whatsapp, M + 24, cy + 16);
    if (draft.cnpj) {
      ink(C.sub); setFont(9, true);
      doc.text("CNPJ", M + 220, cy);
      ink(C.ink); setFont(11, true);
      doc.text(draft.cnpj, M + 220, cy + 16);
    }
    y += 240;

    // Sumário
    ensure(180);
    ink(C.primaryDark);
    setFont(11, true);
    doc.text("SUMÁRIO", M, y);
    stroke(C.primary);
    doc.setLineWidth(1.2);
    doc.line(M, y + 6, M + 60, y + 6);
    doc.setLineWidth(0.5);
    y += 22;
    const toc: Array<{ n: number; t: string; on: boolean }> = [
      { n: 1, t: "Diagnóstico estratégico", on: !!draft.diagnostico_ai },
      { n: 2, t: "Análise detalhada", on: !!draft.analise_ai },
      { n: 3, t: "Oportunidades priorizadas", on: (draft.oportunidades ?? []).some((o) => o.selecionada) },
      { n: 4, t: "Plano de ação", on: (draft.plano_acoes ?? []).length > 0 },
      { n: 5, t: "Métricas de acompanhamento", on: (draft.resultados_metricas ?? []).length > 0 },
    ];
    toc.forEach((it) => {
      ink(it.on ? C.ink : [180, 185, 182]);
      setFont(10.5, false);
      doc.text(`${String(it.n).padStart(2, "0")}   ${it.t}`, M, y);
      setFont(8, true);
      ink(it.on ? C.primary : [200, 205, 202]);
      doc.text(it.on ? "INCLUSO" : "—", W - M, y, { align: "right" });
      y += 18;
    });

    // Contexto inicial (form data)
    if (draft.desafios_reais || draft.objetivos_organizacionais) {
      ensure(120);
      y += 18;
      ink(C.primaryDark);
      setFont(11, true);
      doc.text("CONTEXTO INFORMADO", M, y);
      stroke(C.primary);
      doc.setLineWidth(1.2);
      doc.line(M, y + 6, M + 110, y + 6);
      doc.setLineWidth(0.5);
      y += 18;
      if (draft.desafios_reais) {
        paragraph("Desafios reais", { size: 9.5, bold: true, color: C.sub });
        paragraph(draft.desafios_reais);
        y += 4;
      }
      if (draft.objetivos_organizacionais) {
        paragraph("Objetivos organizacionais", { size: 9.5, bold: true, color: C.sub });
        paragraph(draft.objetivos_organizacionais);
      }
    }

    // ===== 1. DIAGNÓSTICO =====
    if (draft.diagnostico_ai) {
      sectionTitle(1, "Diagnóstico estratégico");
      renderMarkdown(draft.diagnostico_ai);
    }
    // ===== 2. ANÁLISE =====
    if (draft.analise_ai) {
      sectionTitle(2, "Análise detalhada");
      renderMarkdown(draft.analise_ai);
    }
    // ===== 3. OPORTUNIDADES =====
    const opSel = (draft.oportunidades ?? []).filter((o) => o.selecionada);
    if (opSel.length) {
      sectionTitle(3, "Oportunidades priorizadas");
      opSel.forEach((o, i) => {
        ensure(70);
        const startY = y;
        // Card
        fill([255, 255, 255]);
        stroke(C.border);
        doc.roundedRect(M, startY - 4, CONTENT_W, 0, 6, 6, "S"); // placeholder
        // Number bubble
        fill(C.soft);
        doc.roundedRect(M + 8, startY + 2, 22, 22, 4, 4, "F");
        ink(C.primaryDark);
        setFont(11, true);
        doc.text(String(i + 1).padStart(2, "0"), M + 19, startY + 17, { align: "center" });
        // Title
        ink(C.ink);
        setFont(12, true);
        const tLines = doc.splitTextToSize(o.titulo, CONTENT_W - 60 - 70);
        doc.text(tLines, M + 38, startY + 12);
        // Impact badge
        badge(`impacto ${o.impacto}`, W - M - 90, startY + 12, impactColor(o.impacto));
        y = startY + 12 + tLines.length * 14 + 6;
        // Description
        paragraph(o.descricao, { indent: 38, size: 10, color: C.ink });
        const endY = y + 6;
        // Draw card border around
        stroke(C.border);
        doc.roundedRect(M, startY - 4, CONTENT_W, endY - startY + 4, 6, 6, "S");
        y = endY + 10;
      });
    }
    // ===== 4. PLANO DE AÇÃO =====
    if ((draft.plano_acoes ?? []).length) {
      sectionTitle(4, "Plano de ação");
      draft.plano_acoes.forEach((a, i) => {
        ensure(90);
        const startY = y;
        // Left accent bar
        fill(C.primary);
        doc.rect(M, startY, 3, 60, "F");
        // Header line
        ink(C.primaryDark);
        setFont(9, true);
        doc.text(`AÇÃO ${String(i + 1).padStart(2, "0")}`, M + 14, startY + 10);
        // Priority badge top-right
        badge(`prioridade ${a.prioridade}`, W - M - 100, startY + 10, prioColor(a.prioridade));
        // Title
        ink(C.ink);
        setFont(12, true);
        const tLines = doc.splitTextToSize(a.titulo, CONTENT_W - 28);
        let ty = startY + 26;
        tLines.forEach((ln: string) => { doc.text(ln, M + 14, ty); ty += 15; });
        y = ty + 4;
        // Meta row
        ink(C.sub);
        setFont(9, false);
        doc.text(`Prazo: ${a.prazo}   ·   Responsável: ${a.responsavel}`, M + 14, y);
        y += 14;
        // Description
        paragraph(a.descricao, { indent: 14, size: 10 });
        y += 10;
      });
    }
    // ===== 5. MÉTRICAS =====
    if ((draft.resultados_metricas ?? []).length) {
      sectionTitle(5, "Métricas de acompanhamento");
      // Table header
      ensure(40);
      fill(C.primary);
      doc.rect(M, y - 12, CONTENT_W, 22, "F");
      ink([255, 255, 255]);
      setFont(9, true);
      doc.text("MÉTRICA", M + 10, y + 2);
      doc.text("UNIDADE", M + 220, y + 2);
      doc.text("FREQUÊNCIA", M + 310, y + 2);
      doc.text("META", W - M - 10, y + 2, { align: "right" });
      y += 18;
      draft.resultados_metricas.forEach((m, i) => {
        ensure(24);
        if (i % 2 === 0) {
          fill(C.soft);
          doc.rect(M, y - 12, CONTENT_W, 22, "F");
        }
        ink(C.ink);
        setFont(10, true);
        const nm = doc.splitTextToSize(m.nome, 200);
        doc.text(nm[0] ?? m.nome, M + 10, y + 2);
        setFont(9.5, false);
        ink(C.sub);
        doc.text(m.unidade ?? "—", M + 220, y + 2);
        doc.text(m.frequencia ?? "—", M + 310, y + 2);
        ink(C.primaryDark);
        setFont(10, true);
        doc.text(m.meta ?? "—", W - M - 10, y + 2, { align: "right" });
        y += 22;
      });
    }

    // Closing page
    ensure(120);
    y += 30;
    fill(C.soft);
    doc.roundedRect(M, y, CONTENT_W, 110, 10, 10, "F");
    ink(C.primaryDark);
    setFont(14, true);
    doc.text("Próximo passo", M + 24, y + 32);
    ink(C.ink);
    setFont(10.5, false);
    const closing = doc.splitTextToSize(
      "Este plano é o seu guia. Execute as ações priorizadas, acompanhe as métricas e ajuste com base nos resultados. A orientohub está com você em cada etapa.",
      CONTENT_W - 48,
    );
    let yy = y + 54;
    closing.forEach((ln: string) => { doc.text(ln, M + 24, yy); yy += 14; });

    doc.save(`orientohub-plano-${draft.nome.replace(/\s+/g, "-").toLowerCase()}.pdf`);
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

function Textarea({ value, onChange, rows = 3 }: { value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows}
      className="w-full rounded-lg bg-input border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none resize-none" />
  );
}