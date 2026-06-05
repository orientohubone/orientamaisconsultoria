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
import { generateOrientamaisPlanoPdf } from "@/lib/pdf/orientamais-plano-pdf";
import logoUrl from "@/assets/orientamaislogo.png";
import reportLogoUrl from "@/assets/logo orientamais.png";

export const Route = createFileRoute("/crm")({
  head: () => ({ meta: [{ title: "CRM — Orientamais" }] }),
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

type Impacto = "alto" | "medio" | "baixo" | string;
type Prioridade = "alta" | "media" | "baixa" | string;

const IMPACTO_STYLES: Record<string, { badge: string; label: string }> = {
  alto: {
    badge: "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300",
    label: "alto",
  },
  medio: {
    badge: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
    label: "médio",
  },
  baixo: {
    badge: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    label: "baixo",
  },
  default: {
    badge: "border-slate-500/30 bg-slate-500/10 text-slate-700 dark:text-slate-300",
    label: "não classificado",
  },
};

function normalizeImpacto(impacto: Impacto) {
  return String(impacto ?? "").trim().toLowerCase().replace(/[^\w-]/g, "");
}

function getImpactoStyles(impacto: Impacto) {
  return IMPACTO_STYLES[normalizeImpacto(impacto)] ?? IMPACTO_STYLES.default;
}

const PRIORIDADE_STYLES: Record<string, { badge: string; label: string }> = {
  alta: {
    badge: "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300",
    label: "alta",
  },
  media: {
    badge: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
    label: "média",
  },
  baixa: {
    badge: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    label: "baixa",
  },
  default: {
    badge: "border-slate-500/30 bg-slate-500/10 text-slate-700 dark:text-slate-300",
    label: "não classificada",
  },
};

function normalizePrioridade(prioridade: Prioridade) {
  return String(prioridade ?? "").trim().toLowerCase().replace(/[^\w-]/g, "");
}

function getPrioridadeStyles(prioridade: Prioridade) {
  return PRIORIDADE_STYLES[normalizePrioridade(prioridade)] ?? PRIORIDADE_STYLES.default;
}

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
          <Link to="/" className="flex items-center gap-3">
            <img src={logoUrl} alt="Orientamais" className="h-9 w-auto" />
            <span className="text-[0.55rem] tracking-[0.3em] text-muted-foreground">CRM · GESTÃO DE CLIENTES</span>
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
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
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
    await generateOrientamaisPlanoPdf({ draft, logoUrl: reportLogoUrl });
    return;
    const { default: jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const W = doc.internal.pageSize.getWidth();
    const H = doc.internal.pageSize.getHeight();
    const M = 48;
    const CONTENT_W = W - M * 2;

    const C = {
      primary: [24, 47, 41] as [number, number, number],
      primaryDark: [12, 28, 25] as [number, number, number],
      ink: [34, 42, 40] as [number, number, number],
      sub: [108, 115, 113] as [number, number, number],
      soft: [246, 244, 239] as [number, number, number],
      paper: [255, 255, 253] as [number, number, number],
      border: [226, 229, 223] as [number, number, number],
      accent: [190, 151, 64] as [number, number, number],
      red: [188, 74, 64] as [number, number, number],
      amber: [204, 146, 64] as [number, number, number],
      green: [89, 122, 95] as [number, number, number],
      slate: [107, 114, 128] as [number, number, number],
    };

    const fill = (rgb: [number, number, number]) => doc.setFillColor(rgb[0], rgb[1], rgb[2]);
    const stroke = (rgb: [number, number, number]) => doc.setDrawColor(rgb[0], rgb[1], rgb[2]);
    const ink = (rgb: [number, number, number]) => doc.setTextColor(rgb[0], rgb[1], rgb[2]);
    const setFont = (size: number, bold = false) => {
      doc.setFont("helvetica", bold ? "bold" : "normal");
      doc.setFontSize(size);
    };

    const safeText = (value: string | null | undefined, fallback = "—") =>
      (value && value.trim() ? value.trim() : fallback);

    const stripMd = (s: string) =>
      s.replace(/\*\*(.+?)\*\*/g, "$1").replace(/`([^`]+)`/g, "$1").replace(/^#+\s*/gm, "");

    const normalizeText = (s: string) => stripMd(s).replace(/\r\n/g, "\n").trim();

    const normalizeImpact = (value: string) => String(value ?? "").trim().toLowerCase().replace(/[^\w-]/g, "");
    const normalizePriority = (value: string) => String(value ?? "").trim().toLowerCase().replace(/[^\w-]/g, "");

    const impactBadge = (impacto: string) => {
      const i = normalizeImpact(impacto);
      if (i === "alto") return { fill: [253, 230, 230] as [number, number, number], text: C.red, label: "Alto" };
      if (i === "medio") return { fill: [255, 243, 219] as [number, number, number], text: C.amber, label: "Médio" };
      if (i === "baixo") return { fill: [232, 246, 237] as [number, number, number], text: C.green, label: "Baixo" };
      return { fill: [241, 245, 249] as [number, number, number], text: C.slate, label: "Impacto" };
    };

    const priorityBadge = (prioridade: string) => {
      const p = normalizePriority(prioridade);
      if (p === "alta") return { fill: [253, 230, 230] as [number, number, number], text: C.red, label: "Alta" };
      if (p === "media") return { fill: [255, 243, 219] as [number, number, number], text: C.amber, label: "Média" };
      if (p === "baixa") return { fill: [232, 246, 237] as [number, number, number], text: C.green, label: "Baixa" };
      return { fill: [241, 245, 249] as [number, number, number], text: C.slate, label: "Prioridade" };
    };

    const textWidth = (txt: string, size: number, bold = false) => {
      setFont(size, bold);
      return doc.getTextWidth(txt);
    };

    const drawBadge = (
      text: string,
      x: number,
      yPos: number,
      colors: { fill: [number, number, number]; text: [number, number, number] },
    ) => {
      setFont(8.5, true);
      const padX = 10;
      const width = doc.getTextWidth(text) + padX * 2;
      fill(colors.fill);
      doc.roundedRect(x, yPos - 9, width, 18, 9, 9, "F");
      ink(colors.text);
      doc.text(text.toUpperCase(), x + padX, yPos + 3);
      return width;
    };

    const drawPill = (
      text: string,
      x: number,
      yPos: number,
      colors: { fill: [number, number, number]; text: [number, number, number] },
    ) => drawBadge(text, x, yPos, colors);

    const footer = (page: number) => {
      stroke(C.border);
      doc.setLineWidth(0.75);
      doc.line(M, H - 36, W - M, H - 36);
      ink(C.sub);
      setFont(8.5, false);
      doc.text("orientohub · consultoria estratégica para empreendedores", M, H - 22);
      doc.text(`Página ${page}`, W - M, H - 22, { align: "right" });
    };

    const header = (title: string, page: number, subtitle = "Plano de Orientação Estratégica") => {
      fill(C.primary);
      doc.rect(0, 0, W, 58, "F");
      fill(C.accent);
      doc.rect(0, 58, W, 4, "F");
      ink([255, 255, 255]);
      setFont(13, true);
      doc.text("orientohub", M, 34);
      setFont(8.8, false);
      ink([224, 242, 233]);
      doc.text(subtitle, M, 47);
      setFont(8.8, false);
      doc.text(title, W - M, 34, { align: "right" });
      doc.text(new Date().toLocaleDateString("pt-BR"), W - M, 47, { align: "right" });
      footer(page);
    };

    const addCoverBackground = () => {
      fill([250, 249, 245]);
      doc.rect(0, 0, W, H, "F");
      fill([236, 233, 224]);
      doc.circle(W - 78, 76, 48, "F");
      fill([242, 236, 218]);
      doc.circle(62, H - 70, 54, "F");
      fill(C.primary);
      doc.rect(0, 0, W, 10, "F");
      fill(C.accent);
      doc.rect(0, H - 10, W, 10, "F");
    };

    const drawLogoContain = (dataUrl: string, x: number, yPos: number, maxW: number, maxH: number) => {
      const props = doc.getImageProperties(dataUrl);
      const ratio = props.width / props.height;
      let w = maxW;
      let h = w / ratio;
      if (h > maxH) {
        h = maxH;
        w = h * ratio;
      }
      const dx = x + (maxW - w) / 2;
      const dy = yPos + (maxH - h) / 2;
      doc.addImage(dataUrl, "PNG", dx, dy, w, h);
    };

    const addContentPage = (contentPage: number) => {
      doc.addPage();
      header("PLANO PERSONALIZADO", contentPage);
      y = 82;
    };

    let page = 0;
    let y = 82;
    const maxY = () => H - 64;
    const ensure = (need: number) => {
      if (y + need > maxY()) {
        page += 1;
        addContentPage(page);
        y = 82;
      }
    };

    const paragraph = (txt: string, opts: { size?: number; bold?: boolean; color?: [number, number, number]; indent?: number; lineGap?: number } = {}) => {
      const size = opts.size ?? 10.2;
      const lineGap = opts.lineGap ?? 4;
      const indent = opts.indent ?? 0;
      setFont(size, opts.bold);
      ink(opts.color ?? C.ink);
      const lines = doc.splitTextToSize(normalizeText(txt), CONTENT_W - indent);
      lines.forEach((line: string) => {
        ensure(size + lineGap + 1);
        doc.text(line, M + indent, y);
        y += size + lineGap;
      });
      y += 2;
    };

    const measureLines = (txt: string, width: number, size = 10.2, bold = false) => {
      setFont(size, bold);
      return doc.splitTextToSize(normalizeText(txt), width) as string[];
    };

    const drawWrappedLines = (
      lines: string[],
      x: number,
      startY: number,
      opts: { size?: number; color?: [number, number, number]; lineHeight?: number; bold?: boolean } = {},
    ) => {
      const size = opts.size ?? 10.2;
      const lineHeight = opts.lineHeight ?? size + 4;
      setFont(size, opts.bold);
      ink(opts.color ?? C.ink);
      lines.forEach((line, idx) => {
        doc.text(line, x, startY + idx * lineHeight);
      });
      return startY + lines.length * lineHeight;
    };

    const renderFlowText = (
      title: string,
      text: string,
      opts: { bodySize?: number; lineGap?: number; tone?: [number, number, number] } = {},
    ) => {
      const bodySize = opts.bodySize ?? 10.15;
      const lineGap = opts.lineGap ?? 4.6;
      const tone = opts.tone ?? C.primary;
      const paragraphs = normalizeText(text)
        .split(/\n+/)
        .map((part) => part.trim())
        .filter(Boolean);

      const ensureLineSpace = (need: number) => {
        if (y + need > maxY()) {
          page += 1;
          addContentPage(page);
        }
      };

      ensureLineSpace(42);
      ink(C.sub);
      setFont(9.5, true);
      doc.text(title, M + 18, y + 4);
      stroke(C.border);
      doc.setLineWidth(0.8);
      doc.line(M + 18, y + 12, W - M - 18, y + 12);
      y += 22;

      paragraphs.forEach((paragraph, idx) => {
        const lines = measureLines(paragraph, CONTENT_W - 36, bodySize);
        lines.forEach((line) => {
          ensureLineSpace(bodySize + lineGap + 2);
          ink(C.ink);
          setFont(bodySize, false);
          doc.text(line, M + 18, y);
          y += bodySize + lineGap;
        });
        y += idx < paragraphs.length - 1 ? 8 : 4;
      });

      fill(tone);
      doc.rect(M + 18, y - 2, 34, 2.5, "F");
      y += 4;
    };

    const sectionTitle = (num: number, title: string, tone: [number, number, number] = C.primary) => {
      ensure(58);
      y += 8;
      fill(tone);
      doc.roundedRect(M, y - 16, 28, 28, 7, 7, "F");
      ink([255, 255, 255]);
      setFont(12, true);
      doc.text(String(num), M + 14, y + 3, { align: "center" });
      ink(C.primaryDark);
      setFont(15, true);
      doc.text(title, M + 40, y + 3);
      stroke(C.border);
      doc.setLineWidth(0.8);
      doc.line(M, y + 16, W - M, y + 16);
      y += 28;
    };

    const card = (x: number, yPos: number, w: number, h: number, fillColor: [number, number, number] = C.paper) => {
      fill(fillColor);
      stroke(C.border);
      doc.roundedRect(x, yPos, w, h, 12, 12, "FD");
    };

    const logoDataUrl = await (async () => {
      try {
        const response = await fetch(logoUrl);
        const blob = await response.blob();
        return await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result));
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      } catch {
        return null;
      }
    })();

    const tocItems = [
      { n: "01", title: "Diagnóstico", on: !!draft.diagnostico_ai },
      { n: "02", title: "Análise", on: !!draft.analise_ai },
      { n: "03", title: "Oportunidades", on: (draft.oportunidades ?? []).some((o) => o.selecionada) },
      { n: "04", title: "Plano de ação", on: (draft.plano_acoes ?? []).length > 0 },
      { n: "05", title: "Métricas", on: (draft.resultados_metricas ?? []).length > 0 },
    ];

    const renderOpportunity = (o: Oportunidade, index: number) => {
      const badge = impactBadge(o.impacto);
      const titleLines = measureLines(o.titulo, CONTENT_W - 86, 12.2, true);
      const descLines = measureLines(o.descricao, CONTENT_W - 118, 10.1, false);
      const titleBlockH = titleLines.length * 15;
      const descBlockH = descLines.length * 13;
      const height = 34 + titleBlockH + descBlockH + 26;
      ensure(height + 16);
      card(M, y, CONTENT_W, height);
      fill(C.soft);
      doc.roundedRect(M + 14, y + 14, 26, 26, 8, 8, "F");
      ink(C.primaryDark);
      setFont(11, true);
      doc.text(String(index + 1).padStart(2, "0"), M + 27, y + 31, { align: "center" });
      drawWrappedLines(titleLines, M + 52, y + 28, { size: 12.2, color: C.ink, lineHeight: 15, bold: true });
      drawBadge(badge.label, W - M - 88, y + 28, { fill: badge.fill, text: badge.text });
      const descY = y + 28 + titleBlockH + 10;
      drawWrappedLines(descLines, M + 52, descY, { size: 10.1, color: C.sub, lineHeight: 13 });
      y += height;
      fill(C.border);
      doc.rect(M + 52, y - 10, CONTENT_W - 104, 1, "F");
      y += 6;
    };

    const renderAction = (a: Acao, index: number) => {
      const badge = priorityBadge(a.prioridade);
      const titleLines = measureLines(a.titulo, CONTENT_W - 124, 12.4, true);
      const descLines = measureLines(a.descricao, CONTENT_W - 112, 10.1, false);
      const metaLine = `Prazo: ${safeText(a.prazo)}   ·   Responsável: ${safeText(a.responsavel)}`;
      const metaLines = measureLines(metaLine, CONTENT_W - 36, 9.2, false);
      const height = 34 + titleLines.length * 15 + metaLines.length * 12 + descLines.length * 13 + 24;
      ensure(height + 12);
      card(M, y, CONTENT_W, height);
      fill(C.primary);
      doc.rect(M, y, 4, height, "F");
      ink(C.primaryDark);
      setFont(9, true);
      doc.text(`AÇÃO ${String(index + 1).padStart(2, "0")}`, M + 18, y + 18);
      drawBadge(badge.label, W - M - 94, y + 18, { fill: badge.fill, text: badge.text });
      drawWrappedLines(titleLines, M + 18, y + 39, { size: 12.4, color: C.ink, lineHeight: 15, bold: true });
      drawWrappedLines(metaLines, M + 18, y + 39 + titleLines.length * 15 + 8, { size: 9.2, color: C.sub, lineHeight: 12 });
      drawWrappedLines(descLines, M + 18, y + 39 + titleLines.length * 15 + 8 + metaLines.length * 12 + 8, {
        size: 10.1,
        color: C.ink,
        lineHeight: 13,
      });
      y += height;
    };

    const renderMetric = (m: Metrica, index: number) => {
      const width = CONTENT_W;
      const nameLines = measureLines(safeText(m.nome), 205, 11.4, true);
      const height = 74 + (nameLines.length - 1) * 12;
      ensure(height + 10);
      card(M, y, width, height);
      fill(C.soft);
      doc.roundedRect(M + 12, y + 14, 24, 24, 8, 8, "F");
      ink(C.primaryDark);
      setFont(10, true);
      doc.text(String(index + 1), M + 24, y + 29, { align: "center" });
      drawWrappedLines(nameLines, M + 48, y + 26, { size: 11.4, color: C.ink, lineHeight: 12, bold: true });
      ink(C.sub);
      setFont(8.8, true);
      doc.text(safeText(m.frequencia), W - M - 124, y + 20, { align: "right" });
      doc.text("META", W - M - 18, y + 20, { align: "right" });
      ink(C.primaryDark);
      setFont(10.2, true);
      doc.text(safeText(m.meta), W - M - 18, y + 39, { align: "right" });
      ink(C.sub);
      setFont(8.8, false);
      doc.text(`${safeText(m.unidade)} · Atual: ${safeText(m.valor_atual)}`, M + 48, y + height - 14);
      y += height + 12;
    };

    // COVER
    addCoverBackground();
    page = 0;
    y = 68;
    if (logoDataUrl) {
      try {
        fill(C.primary);
        doc.roundedRect(M, y, 140, 82, 18, 18, "F");
        stroke(C.primaryDark);
        doc.setLineWidth(0.9);
        doc.roundedRect(M, y, 140, 82, 18, 18, "S");
        drawLogoContain(logoDataUrl, M + 12, y + 12, 116, 58);
      } catch {
        // ignore logo render issues, keep layout intact
      }
    }
    fill(C.primary);
    doc.roundedRect(W - M - 162, y + 8, 162, 28, 14, 14, "F");
    ink([255, 255, 255]);
    setFont(9.2, true);
    doc.text("RELATÓRIO EXECUTIVO", W - M - 81, y + 26, { align: "center" });
    ink(C.sub);
    setFont(9.5, true);
    doc.text("PLANO PERSONALIZADO PARA", M + 160, y + 24);
    ink(C.primaryDark);
    setFont(22, true);
    const titleLines = doc.splitTextToSize(draft.nome, CONTENT_W - 200);
    drawWrappedLines(titleLines, M + 160, y + 56, { size: 22, color: C.primaryDark, lineHeight: 26, bold: true });
    if (draft.tipo_negocio) {
      ink(C.sub);
      setFont(11, false);
      doc.text(safeText(draft.tipo_negocio), M + 160, y + 88);
    }
    ink(C.ink);
    setFont(11, false);
    const coverIntro = doc.splitTextToSize(
      "Um documento executivo para apresentar diagnóstico, direcionar decisões e transformar oportunidade em execução.",
      CONTENT_W - 184,
    );
    drawWrappedLines(coverIntro, M + 160, y + 114, { size: 11, color: C.ink, lineHeight: 14 });
    fill(C.soft);
    doc.roundedRect(M, y + 118, CONTENT_W, 112, 18, 18, "F");
    ink(C.sub);
    setFont(9.2, true);
    doc.text("CONTATO", M + 20, y + 138);
    ink(C.ink);
    setFont(12, true);
    doc.text(safeText(draft.whatsapp), M + 20, y + 158);
    if (draft.cnpj) {
      ink(C.sub);
      setFont(9.2, true);
      doc.text("CNPJ", M + 224, y + 138);
      ink(C.ink);
      setFont(12, true);
      doc.text(safeText(draft.cnpj), M + 224, y + 158);
    }
    fill(C.primary);
    doc.roundedRect(W - M - 178, y + 176, 178, 30, 15, 15, "F");
    ink([255, 255, 255]);
    setFont(9.2, true);
    doc.text("CONSULTORIA ESTRATÉGICA", W - M - 89, y + 195, { align: "center" });
    y += 248;

    const resumeLines = doc.splitTextToSize(
      "Este documento organiza o diagnóstico, a análise, as oportunidades priorizadas, o plano de ação e as métricas-chave do cliente. Use como base para conduzir a consultoria com clareza, ritmo e critério de execução.",
      CONTENT_W - 36,
    ) as string[];
    const resumeHeight = 34 + resumeLines.length * 13 + 18;
    card(M, y, CONTENT_W, resumeHeight, C.paper);
    ink(C.primaryDark);
    setFont(11.5, true);
    doc.text("Resumo executivo", M + 18, y + 22);
    drawWrappedLines(resumeLines, M + 18, y + 42, { size: 9.5, color: C.sub, lineHeight: 13 });
    fill(C.border);
    doc.rect(M + 18, y + resumeHeight - 20, CONTENT_W - 36, 1, "F");
    y += resumeHeight + 12;

    card(M, y, CONTENT_W, 126, C.soft);
    ink(C.primaryDark);
    setFont(10, true);
    doc.text("VISÃO GERAL", M + 18, y + 20);
    const summaryX = [M + 18, M + 196, M + 374];
    tocItems.forEach((item, i) => {
      const row = i < 3 ? 0 : 1;
      const col = i < 3 ? i : i - 3;
      const x = summaryX[col];
      const yy = y + 42 + row * 32;
      drawPill(item.on ? "Incluso" : "Pendente", x, yy, item.on
        ? { fill: [232, 246, 237], text: C.green }
        : { fill: [241, 245, 249], text: C.slate });
      ink(C.sub);
      setFont(8.4, true);
      doc.text(item.n, x, yy + 21);
      ink(C.ink);
      setFont(9.3, true);
      doc.text(item.title, x + 28, yy + 21);
    });
    y += 152;

    // PAGE 2+
    if (draft.desafios_reais || draft.objetivos_organizacionais) {
      sectionTitle(1, "Contexto informado");
      if (draft.desafios_reais) {
        renderFlowText("Desafios reais", draft.desafios_reais, { bodySize: 10.15, lineGap: 4.6, tone: C.accent });
      }
      if (draft.objetivos_organizacionais) {
        renderFlowText("Objetivos organizacionais", draft.objetivos_organizacionais, { bodySize: 10.15, lineGap: 4.6, tone: C.primary });
      }
    }

    if (draft.diagnostico_ai) {
      sectionTitle(2, "Diagnóstico estratégico", C.primary);
      renderFlowText("Leitura estratégica", draft.diagnostico_ai, { bodySize: 10.15, lineGap: 4.6, tone: C.primary });
    }

    if (draft.analise_ai) {
      sectionTitle(3, "Análise detalhada", C.primaryDark);
      renderFlowText("Síntese analítica", draft.analise_ai, { bodySize: 10.15, lineGap: 4.6, tone: C.accent });
    }

    const opSel = (draft.oportunidades ?? []).filter((o) => o.selecionada);
    if (opSel.length) {
      sectionTitle(4, "Oportunidades priorizadas", C.accent);
      opSel.forEach((o, i) => {
        renderOpportunity(o, i);
        if (i < opSel.length - 1) y += 4;
      });
    }

    if ((draft.plano_acoes ?? []).length) {
      sectionTitle(5, "Plano de ação", C.primary);
      draft.plano_acoes.forEach((a, i) => {
        renderAction(a, i);
        if (i < draft.plano_acoes.length - 1) y += 4;
      });
    }

    if ((draft.resultados_metricas ?? []).length) {
      sectionTitle(6, "Métricas de acompanhamento", C.primaryDark);
      draft.resultados_metricas.forEach((m, i) => {
        renderMetric(m, i);
        if (i < draft.resultados_metricas.length - 1) y += 4;
      });
    }

    ensure(110);
    const nextLines = doc.splitTextToSize(
      "Execute o plano priorizando as ações de maior impacto, acompanhe as métricas com regularidade e revise a estratégia conforme os resultados do cliente.",
      CONTENT_W - 36,
    ) as string[];
    const nextHeight = 38 + nextLines.length * 13 + 18;
    card(M, y, CONTENT_W, nextHeight, C.soft);
    ink(C.primaryDark);
    setFont(13.5, true);
    doc.text("Próximos passos", M + 18, y + 24);
    drawWrappedLines(nextLines, M + 18, y + 44, { size: 10.2, color: C.ink, lineHeight: 13 });

    doc.save(`orientohub-plano-${draft.nome.replace(/\s+/g, "-").toLowerCase()}.pdf`);
  }

  const waLink = `https://wa.me/${draft.whatsapp.replace(/\D/g, "")}`;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
      <aside onClick={(e) => e.stopPropagation()} className="relative w-full max-w-2xl bg-card border-l border-border h-full flex flex-col">
        <div className="p-6 pb-0 shrink-0 border-b border-border bg-card">
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
        <div className="mt-6 -mb-px flex gap-1 overflow-x-auto">
          <TabBtn active={tab === "dados"} onClick={() => setTab("dados")} label="Dados" />
          {STAGES.map((s) => (
            <TabBtn key={s.value} active={tab === s.value} onClick={() => setTab(s.value)} label={s.label} icon={<s.icon className="h-3.5 w-3.5" />} />
          ))}
        </div>
        </div>

        <div className="p-6 space-y-5 flex-1 overflow-y-auto">
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
                onClick={() => runAI("diag", () => runEnrich({ data: { leadId: lead.id } }), (r) => setDraft({ ...draft, diagnostico_ai: r.diagnostico_ai, stage: "diagnostico" }))}
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
                onClick={() => runAI("ana", () => runAnalise({ data: { leadId: lead.id } }), (r) => setDraft({ ...draft, analise_ai: r.analise_ai, oportunidades: r.oportunidades, stage: "analise" }))}
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
                          <span className={`inline-flex items-center rounded-full border px-1.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider ${getImpactoStyles(o.impacto).badge}`}>
                            {getImpactoStyles(o.impacto).label}
                          </span>
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
                onClick={() => runAI("plano", () => runPlano({ data: { leadId: lead.id } }), (r) => setDraft({ ...draft, plano_acoes: r.plano_acoes, stage: "estrategia" }))}
                label={draft.plano_acoes?.length ? "Reprocessar plano" : "Gerar plano de ação personalizado"}
                hint="Com base nas oportunidades selecionadas" />
              <div className="space-y-2">
                {(draft.plano_acoes ?? []).length === 0 && <p className="text-xs text-muted-foreground">Nenhuma ação ainda.</p>}
                {(draft.plano_acoes ?? []).map((a, i) => (
                  <div key={i} className="rounded-lg border border-border p-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-semibold text-sm"><span className="text-primary">{i + 1}.</span> {a.titulo}</div>
                      <span className={`inline-flex items-center rounded-full border px-1.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider ${getPrioridadeStyles(a.prioridade).badge}`}>
                        {getPrioridadeStyles(a.prioridade).label}
                      </span>
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
                onClick={() => runAI("metricas", () => runMetricas({ data: { leadId: lead.id } }), (r) => setDraft({ ...draft, resultados_metricas: r.resultados_metricas, stage: "resultados" }))}
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
                        <input
                          value={m.valor_atual}
                          onChange={(e) => {
                          const next = [...draft.resultados_metricas]; next[i] = { ...m, valor_atual: e.target.value };
                          setDraft({ ...draft, resultados_metricas: next });
                        }}
                          spellCheck={false}
                          autoCapitalize="off"
                          autoCorrect="off"
                          className="w-full rounded bg-input border border-border px-2 py-1 text-xs focus:border-primary focus:outline-none" />
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
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      spellCheck={false}
      autoCapitalize="off"
      autoCorrect="off"
      className="w-full rounded-lg bg-input border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none" />
  );
}

function Textarea({ value, onChange, rows = 3 }: { value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      spellCheck={false}
      autoCapitalize="off"
      autoCorrect="off"
      className="w-full rounded-lg bg-input border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none resize-none" />
  );
}
