import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link, u as useRouter } from "../_libs/tanstack__react-router.mjs";
import { m as isRedirect } from "../_libs/tanstack__router-core.mjs";
import { s as supabase } from "./client-CQo1km_T.mjs";
import { a as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-CjwXMz1z.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CmwTCf3Z.mjs";
import { l as logoUrl$1 } from "./logo orientamais-BvCW8YDi.mjs";
import "../_libs/seroval.mjs";
import { C as ClipboardCheck, S as Search, L as Lightbulb, R as Rocket, a as ChartColumn, b as LogOut, F as Funnel, P as Phone, B as Building2, c as FileDown, X, T as Target, d as Check, e as TrendingUp, f as Plus, g as Trash2, h as Save, i as LoaderCircle, j as Sparkles } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/@supabase/functions-js.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
function useServerFn(serverFn) {
  const router = useRouter();
  return reactExports.useCallback(async (...args) => {
    try {
      const res = await serverFn(...args);
      if (isRedirect(res)) throw res;
      return res;
    } catch (err) {
      if (isRedirect(err)) {
        err.options._fromLocation = router.stores.location.get();
        return router.navigate(router.resolveRedirect(err).options);
      }
      throw err;
    }
  }, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const enrichDiagnostico = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({
  leadId: stringType().uuid()
}).parse(i)).handler(createSsrRpc("b13e953d6673a1474eb69bf0d379a5ee7b27d13df9aafc36548936d127621dd5"));
const generateAnalise = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({
  leadId: stringType().uuid()
}).parse(i)).handler(createSsrRpc("1f09c2d87a98e98865ed585a8969dfe4752ba9b63f5bed110bdbfbb1cd83388a"));
const generatePlano = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({
  leadId: stringType().uuid()
}).parse(i)).handler(createSsrRpc("4430b43f8e2654a04528d2e7ae51e57a695fdd138a67de0aebcd84960e57fde4"));
const suggestMetricas = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({
  leadId: stringType().uuid()
}).parse(i)).handler(createSsrRpc("cc209f9a203d973b7de45214e5756daa2e64cc34121f1327d3e48e03cb1a2c03"));
async function generateOrientamaisPlanoPdf({ draft, logoUrl: logoUrl2 }) {
  const { default: jsPDF } = await import("../_libs/jspdf.mjs").then(function(n) {
    return n.j;
  });
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const M = 48;
  const CONTENT_W = W - M * 2;
  const C = {
    primary: [24, 47, 41],
    primaryDark: [12, 28, 25],
    ink: [34, 42, 40],
    sub: [108, 115, 113],
    soft: [246, 244, 239],
    paper: [255, 255, 253],
    border: [226, 229, 223],
    accent: [179, 206, 53],
    red: [188, 74, 64],
    amber: [204, 146, 64],
    green: [89, 122, 95],
    slate: [107, 114, 128]
  };
  const fill = (rgb) => doc.setFillColor(rgb[0], rgb[1], rgb[2]);
  const stroke = (rgb) => doc.setDrawColor(rgb[0], rgb[1], rgb[2]);
  const ink = (rgb) => doc.setTextColor(rgb[0], rgb[1], rgb[2]);
  const setFont = (size, bold = false) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(size);
  };
  const safeText = (value, fallback = "—") => value && value.trim() ? value.trim() : fallback;
  const stripMd = (s) => s.replace(/\*\*(.+?)\*\*/g, "$1").replace(/`([^`]+)`/g, "$1").replace(/^#+\s*/gm, "");
  const normalizeText = (s) => stripMd(s).replace(/\r\n/g, "\n").trim();
  const normalizeImpact = (value) => String(value ?? "").trim().toLowerCase().replace(/[^\w-]/g, "");
  const normalizePriority = (value) => String(value ?? "").trim().toLowerCase().replace(/[^\w-]/g, "");
  const impactBadge = (impacto) => {
    const i = normalizeImpact(impacto);
    if (i === "alto") return { fill: [253, 230, 230], text: C.red, label: "Alto" };
    if (i === "medio") return { fill: [255, 243, 219], text: C.amber, label: "Médio" };
    if (i === "baixo") return { fill: [232, 246, 237], text: C.green, label: "Baixo" };
    return { fill: [241, 245, 249], text: C.slate, label: "Impacto" };
  };
  const priorityBadge = (prioridade) => {
    const p = normalizePriority(prioridade);
    if (p === "alta") return { fill: [253, 230, 230], text: C.red, label: "Alta" };
    if (p === "media") return { fill: [255, 243, 219], text: C.amber, label: "Média" };
    if (p === "baixa") return { fill: [232, 246, 237], text: C.green, label: "Baixa" };
    return { fill: [241, 245, 249], text: C.slate, label: "Prioridade" };
  };
  const drawBadge = (text, x, yPos, colors) => {
    setFont(8.2, true);
    const padX = 12;
    const height = 21;
    const width = doc.getTextWidth(text) + padX * 2 + 8;
    const yTop = yPos - 10;
    fill([255, 255, 255]);
    doc.roundedRect(x + 1, yTop + 1, width, height, 10, 10, "F");
    fill(colors.fill);
    stroke(colors.text);
    doc.setLineWidth(0.8);
    doc.roundedRect(x, yTop, width, height, 10, 10, "FD");
    fill(colors.text);
    doc.roundedRect(x, yTop, 4, height, 2, 2, "F");
    fill(colors.fill);
    ink(colors.text);
    doc.text(text.toUpperCase(), x + 12, yPos + 3);
    return width;
  };
  const drawPill = (text, x, yPos, colors) => drawBadge(text, x, yPos, colors);
  const footer = (page2) => {
    stroke(C.border);
    doc.setLineWidth(0.75);
    doc.line(M, H - 36, W - M, H - 36);
    ink(C.sub);
    setFont(8.5, false);
    doc.text("orientohub · consultoria estratégica para empreendedores", M, H - 22);
    doc.text(`Página ${page2}`, W - M, H - 22, { align: "right" });
  };
  const header = (title, page2, subtitle = "Plano de Orientação Estratégica") => {
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
    doc.text((/* @__PURE__ */ new Date()).toLocaleDateString("pt-BR"), W - M, 47, { align: "right" });
    footer(page2);
  };
  const addCoverBackground = () => {
    fill([250, 249, 245]);
    doc.rect(0, 0, W, H, "F");
    fill([229, 239, 222]);
    doc.circle(W - 78, 76, 48, "F");
    fill([238, 246, 226]);
    doc.circle(62, H - 70, 54, "F");
    fill(C.primary);
    doc.rect(0, 0, W, 10, "F");
    fill(C.accent);
    doc.rect(0, H - 10, W, 10, "F");
  };
  const drawLogoContain = (dataUrl, x, yPos, maxW, maxH) => {
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
  const addContentPage = (contentPage) => {
    doc.addPage();
    header("PLANO PERSONALIZADO", contentPage);
    y = 82;
  };
  let page = 0;
  let y = 82;
  const maxY = () => H - 64;
  const ensure = (need) => {
    if (y + need > maxY()) {
      page += 1;
      addContentPage(page);
      y = 82;
    }
  };
  const measureLines = (txt, width, size = 10.2, bold = false) => {
    setFont(size, bold);
    return doc.splitTextToSize(normalizeText(txt), width);
  };
  const drawWrappedLines = (lines, x, startY, opts = {}) => {
    const size = opts.size ?? 10.2;
    const lineHeight = opts.lineHeight ?? size + 4;
    setFont(size, opts.bold);
    ink(opts.color ?? C.ink);
    lines.forEach((line, idx) => {
      doc.text(line, x, startY + idx * lineHeight);
    });
    return startY + lines.length * lineHeight;
  };
  const renderFlowText = (title, text, opts = {}) => {
    const bodySize = opts.bodySize ?? 10.15;
    const lineGap = opts.lineGap ?? 4.6;
    const tone = opts.tone ?? C.primary;
    const paragraphs = normalizeText(text).split(/\n+/).map((part) => part.trim()).filter(Boolean);
    const ensureLineSpace = (need) => {
      if (y + need > maxY()) {
        page += 1;
        addContentPage(page);
      }
    };
    ensureLineSpace(42);
    ink(C.sub);
    setFont(9.5, true);
    doc.text(title, M + 18, y + 2);
    stroke(C.border);
    doc.setLineWidth(0.8);
    doc.line(M + 18, y + 20, W - M - 18, y + 20);
    y += 30;
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
    doc.roundedRect(M + 18, y + 2, 42, 4, 2, 2, "F");
    y += 12;
  };
  const sectionTitle = (num, title, tone = C.primary) => {
    ensure(58);
    y += 12;
    fill([237, 242, 235]);
    doc.rect(0, y - 10, 22, 26, "F");
    fill(tone);
    doc.roundedRect(0, y - 2, 64, 6, 3, 3, "F");
    doc.roundedRect(18, y - 8, 16, 18, 4, 4, "F");
    ink([255, 255, 255]);
    setFont(10, true);
    doc.text(String(num).padStart(2, "0"), 26, y + 4, { align: "center" });
    ink(C.primaryDark);
    setFont(18, true);
    doc.text(title, M + 18, y + 5);
    stroke(C.border);
    doc.setLineWidth(0.8);
    doc.line(M, y + 26, W - M, y + 26);
    y += 40;
  };
  const card = (x, yPos, w, h, fillColor = C.paper) => {
    fill(fillColor);
    stroke(C.border);
    doc.roundedRect(x, yPos, w, h, 12, 12, "FD");
  };
  const logoDataUrl = await (async () => {
    try {
      const response = await fetch(logoUrl2);
      const blob = await response.blob();
      return await new Promise((resolve, reject) => {
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
    { n: "05", title: "Métricas", on: (draft.resultados_metricas ?? []).length > 0 }
  ];
  const renderOpportunity = (o, index) => {
    const badge = impactBadge(o.impacto);
    const titleLines2 = measureLines(o.titulo, CONTENT_W - 156, 12.2, true);
    const descLines = measureLines(o.descricao, CONTENT_W - 118, 10.1, false);
    const titleBlockH = titleLines2.length * 15;
    const descBlockH = descLines.length * 13;
    const height = 34 + titleBlockH + descBlockH + 30;
    ensure(height + 16);
    card(M, y, CONTENT_W, height);
    fill(C.soft);
    doc.roundedRect(M + 14, y + 14, 26, 26, 8, 8, "F");
    ink(C.primaryDark);
    setFont(11, true);
    doc.text(String(index + 1).padStart(2, "0"), M + 27, y + 31, { align: "center" });
    drawWrappedLines(titleLines2, M + 52, y + 28, { size: 12.2, color: C.ink, lineHeight: 15, bold: true });
    const badgeY = y + 16;
    drawBadge(badge.label, W - M - 88, badgeY, { fill: badge.fill, text: badge.text });
    const descY = y + 28 + titleBlockH + 14;
    drawWrappedLines(descLines, M + 52, descY, { size: 10.1, color: C.sub, lineHeight: 13 });
    y += height;
    fill(C.border);
    doc.rect(M + 52, y - 10, CONTENT_W - 104, 1, "F");
    y += 6;
  };
  const renderAction = (a, index) => {
    const badge = priorityBadge(a.prioridade);
    const titleLines2 = measureLines(a.titulo, CONTENT_W - 124, 12.4, true);
    const descLines = measureLines(a.descricao, CONTENT_W - 112, 10.1, false);
    const metaLine = `Prazo: ${safeText(a.prazo)}   ·   Responsável: ${safeText(a.responsavel)}`;
    const metaLines = measureLines(metaLine, CONTENT_W - 36, 9.2, false);
    const height = 34 + titleLines2.length * 15 + metaLines.length * 12 + descLines.length * 13 + 24;
    ensure(height + 12);
    card(M, y, CONTENT_W, height);
    fill(C.primary);
    doc.rect(M, y, 4, height, "F");
    ink(C.primaryDark);
    setFont(9, true);
    doc.text(`AÇÃO ${String(index + 1).padStart(2, "0")}`, M + 18, y + 18);
    drawBadge(badge.label, W - M - 94, y + 18, { fill: badge.fill, text: badge.text });
    drawWrappedLines(titleLines2, M + 18, y + 39, { size: 12.4, color: C.ink, lineHeight: 15, bold: true });
    drawWrappedLines(metaLines, M + 18, y + 39 + titleLines2.length * 15 + 8, { size: 9.2, color: C.sub, lineHeight: 12 });
    drawWrappedLines(descLines, M + 18, y + 39 + titleLines2.length * 15 + 8 + metaLines.length * 12 + 8, {
      size: 10.1,
      color: C.ink,
      lineHeight: 13
    });
    y += height;
  };
  const estimateActionHeight = (a) => {
    const titleLines2 = measureLines(a.titulo, CONTENT_W - 124, 12.4, true);
    const descLines = measureLines(a.descricao, CONTENT_W - 112, 10.1, false);
    const metaLine = `Prazo: ${safeText(a.prazo)}   ·   Responsável: ${safeText(a.responsavel)}`;
    const metaLines = measureLines(metaLine, CONTENT_W - 36, 9.2, false);
    return 34 + titleLines2.length * 15 + metaLines.length * 12 + descLines.length * 13 + 24;
  };
  const renderMetric = (m, index) => {
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
    CONTENT_W - 184
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
    CONTENT_W - 36
  );
  const resumeHeight = 34 + resumeLines.length * 13 + 18;
  card(M, y, CONTENT_W, resumeHeight, C.paper);
  ink(C.primaryDark);
  setFont(11.5, true);
  doc.text("Resumo executivo", M + 18, y + 22);
  drawWrappedLines(resumeLines, M + 18, y + 42, { size: 9.5, color: C.sub, lineHeight: 13 });
  fill(C.border);
  doc.rect(M + 18, y + resumeHeight - 20, CONTENT_W - 36, 1, "F");
  y += resumeHeight + 12;
  card(M, y, CONTENT_W, 172, C.soft);
  ink(C.primaryDark);
  setFont(10, true);
  doc.text("VISÃO GERAL", M + 18, y + 20);
  const summaryRows = tocItems.map((item) => ({
    ...item,
    status: item.on ? "Incluso" : "Pendente",
    colors: item.on ? { fill: [232, 246, 237], text: C.green } : { fill: [241, 245, 249], text: C.slate }
  }));
  const rowStartY = y + 46;
  const rowGap = 24;
  tocItems.forEach((item, i) => {
    const rowY = rowStartY + i * rowGap;
    if (i > 0) {
      fill(C.border);
      doc.rect(M + 18, rowY - 11, CONTENT_W - 36, 1, "F");
    }
    fill(C.soft);
    doc.roundedRect(M + 18, rowY - 10, 26, 20, 8, 8, "F");
    ink(C.primaryDark);
    setFont(8.6, true);
    doc.text(item.n, M + 31, rowY + 3, { align: "center" });
    ink(C.ink);
    setFont(9.6, true);
    doc.text(item.title, M + 52, rowY + 3);
    drawPill(item.on ? "Incluso" : "Pendente", W - M - 98, rowY + 3, summaryRows[i].colors);
  });
  y += 198;
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
    const firstActionHeight = estimateActionHeight((draft.plano_acoes ?? [])[0]);
    if (y + 40 + firstActionHeight + 18 > maxY()) {
      page += 1;
      addContentPage(page);
    }
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
    CONTENT_W - 36
  );
  const nextHeight = 38 + nextLines.length * 13 + 18;
  card(M, y, CONTENT_W, nextHeight, C.soft);
  ink(C.primaryDark);
  setFont(13.5, true);
  doc.text("Próximos passos", M + 18, y + 24);
  drawWrappedLines(nextLines, M + 18, y + 44, { size: 10.2, color: C.ink, lineHeight: 13 });
  doc.save(`orientohub-plano-${draft.nome.replace(/\s+/g, "-").toLowerCase()}.pdf`);
}
const logoUrl = "/assets/orientamaislogo-B0yRCfpZ.png";
const STAGES = [{
  value: "diagnostico",
  label: "Diagnóstico",
  icon: ClipboardCheck
}, {
  value: "analise",
  label: "Análise",
  icon: Search
}, {
  value: "estrategia",
  label: "Estratégia",
  icon: Lightbulb
}, {
  value: "execucao",
  label: "Execução",
  icon: Rocket
}, {
  value: "resultados",
  label: "Resultados",
  icon: ChartColumn
}];
const IMPACTO_STYLES = {
  alto: {
    badge: "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300",
    label: "alto"
  },
  medio: {
    badge: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
    label: "médio"
  },
  baixo: {
    badge: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    label: "baixo"
  },
  default: {
    badge: "border-slate-500/30 bg-slate-500/10 text-slate-700 dark:text-slate-300",
    label: "não classificado"
  }
};
function normalizeImpacto(impacto) {
  return String(impacto ?? "").trim().toLowerCase().replace(/[^\w-]/g, "");
}
function getImpactoStyles(impacto) {
  return IMPACTO_STYLES[normalizeImpacto(impacto)] ?? IMPACTO_STYLES.default;
}
const PRIORIDADE_STYLES = {
  alta: {
    badge: "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300",
    label: "alta"
  },
  media: {
    badge: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
    label: "média"
  },
  baixa: {
    badge: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    label: "baixa"
  },
  default: {
    badge: "border-slate-500/30 bg-slate-500/10 text-slate-700 dark:text-slate-300",
    label: "não classificada"
  }
};
function normalizePrioridade(prioridade) {
  return String(prioridade ?? "").trim().toLowerCase().replace(/[^\w-]/g, "");
}
function getPrioridadeStyles(prioridade) {
  return PRIORIDADE_STYLES[normalizePrioridade(prioridade)] ?? PRIORIDADE_STYLES.default;
}
function CrmPage() {
  const navigate = useNavigate();
  const [authReady, setAuthReady] = reactExports.useState(false);
  const [leads, setLeads] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [filter, setFilter] = reactExports.useState("all");
  const [query, setQuery] = reactExports.useState("");
  const [selected, setSelected] = reactExports.useState(null);
  const fetchLeads = reactExports.useCallback(async () => {
    setLoading(true);
    const {
      data,
      error
    } = await supabase.from("leads").select("*").order("created_at", {
      ascending: false
    });
    if (!error && data) setLeads(data);
    setLoading(false);
  }, []);
  reactExports.useEffect(() => {
    const init = async () => {
      const {
        data
      } = await supabase.auth.getSession();
      if (!data.session) {
        navigate({
          to: "/login"
        });
        return;
      }
      setAuthReady(true);
      await fetchLeads();
    };
    init();
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate({
        to: "/login"
      });
    });
    return () => subscription.unsubscribe();
  }, [navigate, fetchLeads]);
  reactExports.useEffect(() => {
    if (!authReady) return;
    const channel = supabase.channel("leads-changes").on("postgres_changes", {
      event: "*",
      schema: "public",
      table: "leads"
    }, () => {
      fetchLeads();
    }).subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [authReady, fetchLeads]);
  const filtered = reactExports.useMemo(() => {
    return leads.filter((l) => {
      if (filter !== "all" && l.stage !== filter) return false;
      if (query) {
        const q = query.toLowerCase();
        return [l.nome, l.whatsapp, l.tipo_negocio, l.cnpj].some((v) => v?.toLowerCase().includes(q));
      }
      return true;
    });
  }, [leads, filter, query]);
  const counts = reactExports.useMemo(() => {
    const c = {
      all: leads.length
    };
    STAGES.forEach((s) => {
      c[s.value] = leads.filter((l) => l.stage === s.value).length;
    });
    return c;
  }, [leads]);
  async function handleLogout() {
    await supabase.auth.signOut();
    navigate({
      to: "/login"
    });
  }
  if (!authReady) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center text-muted-foreground", children: "Carregando..." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", style: {
    background: "var(--gradient-hero)"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b border-border/40 bg-background/40 backdrop-blur sticky top-0 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 py-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logoUrl, alt: "Orientamais", className: "h-9 w-auto" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[0.55rem] tracking-[0.3em] text-muted-foreground", children: "CRM · GESTÃO DE CLIENTES" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleLogout, className: "inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-primary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
        " Sair"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-7xl mx-auto px-6 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-bold", children: "Funil de clientes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Trabalhe cada cliente nas 5 etapas — do Diagnóstico aos Resultados." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StageChip, { active: filter === "all", onClick: () => setFilter("all"), label: "Todos", count: counts.all }),
        STAGES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(StageChip, { active: filter === s.value, onClick: () => setFilter(s.value), label: s.label, count: counts[s.value] ?? 0, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-3.5 w-3.5" }) }, s.value))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-2 rounded-lg border border-border bg-background/60 backdrop-blur px-3 py-2 max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Buscar por nome, WhatsApp, CNPJ...", spellCheck: false, autoCapitalize: "off", autoCorrect: "off", className: "flex-1 bg-transparent text-sm focus:outline-none" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 rounded-2xl border border-border bg-card/60 backdrop-blur overflow-hidden", style: {
        boxShadow: "var(--shadow-card)"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-secondary/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-left text-xs uppercase tracking-wider text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Cliente" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Negócio" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "WhatsApp" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Etapa" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Recebido em" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "px-4 py-10 text-center text-muted-foreground", children: "Carregando..." }) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "px-4 py-10 text-center text-muted-foreground", children: "Nenhum cliente nesta etapa ainda." }) }) : filtered.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { onClick: () => setSelected(l), className: "border-t border-border/40 cursor-pointer hover:bg-secondary/30 transition", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: l.nome }),
            l.cnpj && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-0.5", children: [
              "CNPJ: ",
              l.cnpj
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: l.tipo_negocio || "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: l.whatsapp }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StageBadge, { stage: l.stage }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-xs text-muted-foreground", children: new Date(l.created_at).toLocaleDateString("pt-BR") })
        ] }, l.id)) })
      ] }) }) })
    ] }),
    selected && /* @__PURE__ */ jsxRuntimeExports.jsx(LeadDrawer, { lead: selected, onClose: () => setSelected(null), onSaved: () => {
      setSelected(null);
      fetchLeads();
    }, onDeleted: () => {
      setSelected(null);
      fetchLeads();
    } })
  ] });
}
function StageChip({
  active,
  onClick,
  label,
  count,
  icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick, className: `inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition border ${active ? "bg-primary text-primary-foreground border-primary" : "bg-background/40 text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"}`, children: [
    icon,
    label,
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2 py-0.5 text-[0.65rem] ${active ? "bg-primary-foreground/20" : "bg-secondary"}`, children: count })
  ] });
}
function StageBadge({
  stage
}) {
  const s = STAGES.find((x) => x.value === stage);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-primary/15 border border-primary/30 px-2.5 py-1 text-xs font-semibold text-primary", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-3 w-3" }),
    " ",
    s.label
  ] });
}
function LeadDrawer({
  lead,
  onClose,
  onSaved,
  onDeleted
}) {
  const [draft, setDraft] = reactExports.useState(lead);
  const [saving, setSaving] = reactExports.useState(false);
  const [err, setErr] = reactExports.useState(null);
  const [tab, setTab] = reactExports.useState(lead.stage);
  const [aiLoading, setAiLoading] = reactExports.useState(null);
  const [aiError, setAiError] = reactExports.useState(null);
  const runEnrich = useServerFn(enrichDiagnostico);
  const runAnalise = useServerFn(generateAnalise);
  const runPlano = useServerFn(generatePlano);
  const runMetricas = useServerFn(suggestMetricas);
  async function save() {
    setSaving(true);
    setErr(null);
    const {
      error
    } = await supabase.from("leads").update({
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
      resultados_notas: draft.resultados_notas
    }).eq("id", lead.id);
    setSaving(false);
    if (error) {
      setErr(error.message);
      return;
    }
    onSaved();
  }
  async function remove() {
    if (!confirm("Excluir este cliente do funil?")) return;
    const {
      error
    } = await supabase.from("leads").delete().eq("id", lead.id);
    if (!error) onDeleted();
  }
  async function runAI(key, fn, apply) {
    setAiLoading(key);
    setAiError(null);
    try {
      apply(await fn());
    } catch (e) {
      setAiError(e?.message ?? "Erro ao consultar a IA");
    } finally {
      setAiLoading(null);
    }
  }
  async function exportPDF() {
    await generateOrientamaisPlanoPdf({
      draft,
      logoUrl: logoUrl$1
    });
    return;
  }
  const waLink = `https://wa.me/${draft.whatsapp.replace(/\D/g, "")}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex justify-end", onClick: onClose, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/70 backdrop-blur-sm" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { onClick: (e) => e.stopPropagation(), className: "relative w-full max-w-2xl bg-card border-l border-border h-full flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 pb-0 shrink-0 border-b border-border bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Cliente" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mt-1", children: lead.nome }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: waLink, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-1 text-xs text-primary hover:underline", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3 w-3" }),
                " Abrir WhatsApp"
              ] }),
              draft.cnpj && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-3 w-3" }),
                " ",
                draft.cnpj
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: exportPDF, title: "Exportar PDF", className: "inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold hover:border-primary hover:text-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileDown, { className: "h-4 w-4" }),
              " PDF"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "p-2 rounded-lg hover:bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 -mb-px flex gap-1 overflow-x-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabBtn, { active: tab === "dados", onClick: () => setTab("dados"), label: "Dados" }),
          STAGES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(TabBtn, { active: tab === s.value, onClick: () => setTab(s.value), label: s.label, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-3.5 w-3.5" }) }, s.value))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-5 flex-1 overflow-y-auto", children: [
        aiError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive", children: aiError }),
        tab === "dados" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Etapa do funil", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-1.5", children: STAGES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setDraft({
            ...draft,
            stage: s.value
          }), className: `flex flex-col items-center gap-1 rounded-lg border px-2 py-2 text-[0.65rem] uppercase tracking-wider font-semibold transition ${draft.stage === s.value ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/50"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-4 w-4" }),
            " ",
            s.label
          ] }, s.value)) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nome", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: draft.nome, onChange: (v) => setDraft({
              ...draft,
              nome: v
            }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "WhatsApp", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: draft.whatsapp, onChange: (v) => setDraft({
              ...draft,
              whatsapp: v
            }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Tipo de negócio", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: draft.tipo_negocio ?? "", onChange: (v) => setDraft({
              ...draft,
              tipo_negocio: v
            }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "CNPJ", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: draft.cnpj ?? "", onChange: (v) => setDraft({
              ...draft,
              cnpj: v
            }) }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Desafios reais", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: draft.desafios_reais ?? "", onChange: (v) => setDraft({
            ...draft,
            desafios_reais: v
          }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Objetivos organizacionais", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: draft.objetivos_organizacionais ?? "", onChange: (v) => setDraft({
            ...draft,
            objetivos_organizacionais: v
          }) }) })
        ] }),
        tab === "diagnostico" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Anotações do consultor (insumo da IA)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: draft.anotacoes ?? "", onChange: (v) => setDraft({
            ...draft,
            anotacoes: v
          }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AIButton, { loading: aiLoading === "diag", onClick: () => runAI("diag", () => runEnrich({
            data: {
              leadId: lead.id
            }
          }), (r) => setDraft({
            ...draft,
            diagnostico_ai: r.diagnostico_ai,
            stage: "diagnostico"
          })), label: draft.diagnostico_ai ? "Reprocessar diagnóstico com IA" : "Enriquecer diagnóstico com IA", hint: "Combina os dados do formulário + suas anotações" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Diagnóstico enriquecido", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 12, value: draft.diagnostico_ai ?? "", onChange: (v) => setDraft({
            ...draft,
            diagnostico_ai: v
          }) }) })
        ] }),
        tab === "analise" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AIButton, { loading: aiLoading === "ana", disabled: !draft.diagnostico_ai, onClick: () => runAI("ana", () => runAnalise({
            data: {
              leadId: lead.id
            }
          }), (r) => setDraft({
            ...draft,
            analise_ai: r.analise_ai,
            oportunidades: r.oportunidades,
            stage: "analise"
          })), label: draft.analise_ai ? "Reprocessar análise" : "Gerar análise + oportunidades", hint: draft.diagnostico_ai ? "Transborda o diagnóstico em análise detalhada" : "Gere o diagnóstico antes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Análise detalhada", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 10, value: draft.analise_ai ?? "", onChange: (v) => setDraft({
            ...draft,
            analise_ai: v
          }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-3.5 w-3.5" }),
              " Oportunidades encontradas"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 space-y-2", children: [
              (draft.oportunidades ?? []).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Nenhuma oportunidade ainda. Gere a análise." }),
              (draft.oportunidades ?? []).map((o, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `flex gap-3 rounded-lg border p-3 cursor-pointer transition ${o.selecionada ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: !!o.selecionada, onChange: (e) => {
                  const next = [...draft.oportunidades];
                  next[i] = {
                    ...o,
                    selecionada: e.target.checked
                  };
                  setDraft({
                    ...draft,
                    oportunidades: next
                  });
                }, className: "mt-1 accent-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-sm", children: o.titulo }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center rounded-full border px-1.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider ${getImpactoStyles(o.impacto).badge}`, children: getImpactoStyles(o.impacto).label })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: o.descricao })
                ] })
              ] }, i))
            ] })
          ] })
        ] }),
        tab === "estrategia" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AIButton, { loading: aiLoading === "plano", disabled: (draft.oportunidades ?? []).filter((o) => o.selecionada).length === 0, onClick: () => runAI("plano", () => runPlano({
            data: {
              leadId: lead.id
            }
          }), (r) => setDraft({
            ...draft,
            plano_acoes: r.plano_acoes,
            stage: "estrategia"
          })), label: draft.plano_acoes?.length ? "Reprocessar plano" : "Gerar plano de ação personalizado", hint: "Com base nas oportunidades selecionadas" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            (draft.plano_acoes ?? []).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Nenhuma ação ainda." }),
            (draft.plano_acoes ?? []).map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary", children: [
                    i + 1,
                    "."
                  ] }),
                  " ",
                  a.titulo
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center rounded-full border px-1.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider ${getPrioridadeStyles(a.prioridade).badge}`, children: getPrioridadeStyles(a.prioridade).label })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[0.65rem] uppercase tracking-wider text-muted-foreground mt-1", children: [
                "Prazo: ",
                a.prazo,
                " · Responsável: ",
                a.responsavel
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-2 whitespace-pre-wrap", children: a.descricao })
            ] }, i))
          ] }),
          draft.plano_acoes?.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: exportPDF, className: "w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground font-bold px-4 py-3 hover:opacity-90", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileDown, { className: "h-4 w-4" }),
            " Gerar PDF para o empreendedor"
          ] })
        ] }),
        tab === "execucao" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border p-3 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-foreground mb-1 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, { className: "h-3.5 w-3.5 text-primary" }),
              " Acompanhamento da execução"
            ] }),
            "Marque as ações concluídas e registre observações de campo."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: (draft.plano_acoes ?? []).map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition ${a.concluida ? "border-primary bg-primary/5" : "border-border"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: !!a.concluida, onChange: (e) => {
              const next = [...draft.plano_acoes];
              next[i] = {
                ...a,
                concluida: e.target.checked
              };
              setDraft({
                ...draft,
                plano_acoes: next
              });
            }, className: "mt-1 accent-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `font-semibold text-sm ${a.concluida ? "line-through text-muted-foreground" : ""}`, children: a.titulo }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[0.65rem] uppercase tracking-wider text-muted-foreground mt-0.5", children: [
                a.prazo,
                " · ",
                a.responsavel
              ] })
            ] }),
            a.concluida && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-primary" })
          ] }, i)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Notas de execução", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 6, value: draft.execucao_notas ?? "", onChange: (v) => setDraft({
            ...draft,
            execucao_notas: v
          }) }) })
        ] }),
        tab === "resultados" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AIButton, { loading: aiLoading === "metricas", disabled: (draft.plano_acoes ?? []).length === 0, onClick: () => runAI("metricas", () => runMetricas({
            data: {
              leadId: lead.id
            }
          }), (r) => setDraft({
            ...draft,
            resultados_metricas: r.resultados_metricas,
            stage: "resultados"
          })), label: draft.resultados_metricas?.length ? "Atualizar métricas sugeridas" : "Sugerir métricas com IA", hint: "Métricas-chave para mensurar e ajustar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            (draft.resultados_metricas ?? []).map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border p-3 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold text-sm flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3.5 w-3.5 text-primary" }),
                  " ",
                  m.nome
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[0.6rem] uppercase tracking-wider text-muted-foreground", children: m.frequencia })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[0.6rem] uppercase text-muted-foreground", children: "Meta" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold", children: [
                    m.meta,
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: m.unidade })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[0.6rem] uppercase text-muted-foreground", children: "Valor atual" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: m.valor_atual, onChange: (e) => {
                    const next = [...draft.resultados_metricas];
                    next[i] = {
                      ...m,
                      valor_atual: e.target.value
                    };
                    setDraft({
                      ...draft,
                      resultados_metricas: next
                    });
                  }, spellCheck: false, autoCapitalize: "off", autoCorrect: "off", className: "w-full rounded bg-input border border-border px-2 py-1 text-xs focus:border-primary focus:outline-none" })
                ] })
              ] })
            ] }, i)),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setDraft({
              ...draft,
              resultados_metricas: [...draft.resultados_metricas ?? [], {
                nome: "",
                unidade: "",
                frequencia: "Semanal",
                meta: "",
                valor_atual: ""
              }]
            }), className: "w-full inline-flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-border py-2 text-xs text-muted-foreground hover:border-primary hover:text-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
              " Adicionar métrica manual"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Observações de acompanhamento e ajustes", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 5, value: draft.resultados_notas ?? "", onChange: (v) => setDraft({
            ...draft,
            resultados_notas: v
          }) }) })
        ] }),
        err && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: err }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: remove, className: "inline-flex items-center gap-2 text-xs text-destructive hover:underline", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }),
            " Excluir"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: save, disabled: saving, className: "inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground font-bold px-5 py-2.5 hover:opacity-90 transition disabled:opacity-60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
            " ",
            saving ? "Salvando..." : "Salvar"
          ] })
        ] })
      ] })
    ] })
  ] });
}
function TabBtn({
  active,
  onClick,
  label,
  icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick, className: `inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-wider whitespace-nowrap border-b-2 transition ${active ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`, children: [
    icon,
    " ",
    label
  ] });
}
function AIButton({
  loading,
  disabled,
  onClick,
  label,
  hint
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-primary/30 bg-primary/5 p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick, disabled: loading || disabled, className: "w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground font-bold px-4 py-2.5 hover:opacity-90 transition disabled:opacity-50", children: [
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
      loading ? "Processando com IA..." : label
    ] }),
    hint && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[0.7rem] text-center text-muted-foreground", children: hint })
  ] });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1", children })
  ] });
}
function Input({
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value, onChange: (e) => onChange(e.target.value), spellCheck: false, autoCapitalize: "off", autoCorrect: "off", className: "w-full rounded-lg bg-input border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none" });
}
function Textarea({
  value,
  onChange,
  rows = 3
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value, onChange: (e) => onChange(e.target.value), rows, spellCheck: false, autoCapitalize: "off", autoCorrect: "off", className: "w-full rounded-lg bg-input border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none resize-none" });
}
export {
  CrmPage as component
};
