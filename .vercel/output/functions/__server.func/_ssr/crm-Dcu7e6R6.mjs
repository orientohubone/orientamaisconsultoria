import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, e as useRouterState, O as Outlet, u as useRouter } from "../_libs/tanstack__react-router.mjs";
import { m as isRedirect } from "../_libs/tanstack__router-core.mjs";
import { s as supabase } from "./client-CQo1km_T.mjs";
import { a as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-Nzz9Dmzd.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-dqX5K5_Z.mjs";
import { C as CrmShell, p as parseEntregaveis, f as formatBRL, P as PROPOSAL_STATUS_LABELS, a as PROPOSAL_STATUS_STYLES, I as ITEM_STATUS_LABELS, b as ITEM_STATUS_STYLES, c as PAYMENT_LABELS, d as cn } from "./types-dTqo7EEy.mjs";
import { R as Root, P as Portal$1, C as Content, a as Close, T as Title, D as Description, O as Overlay } from "../_libs/radix-ui__react-dialog.mjs";
import { R as Root2, T as Trigger, P as Portal, C as Content2 } from "../_libs/radix-ui__react-popover.mjs";
import { l as logoUrl } from "./logo orientamais-BvCW8YDi.mjs";
import "../_libs/seroval.mjs";
import { C as ClipboardCheck, S as Search, L as Lightbulb, R as Rocket, a as ChartColumn, F as Funnel, b as LogOut, G as GripVertical, P as Phone, B as Building2, M as Minimize2, c as Maximize2, d as FileDown, X, e as Package, T as Target, f as Check, g as TrendingUp, h as Plus, i as Trash2, j as Save, k as LoaderCircle, l as Sparkles, m as ChevronUp, n as ChevronDown, o as Clock, p as CreditCard, q as ListChecks, r as CalendarDays } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-separator.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-tooltip.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
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
  if (draft.solucoes_prestadas || draft.desafios_reais || draft.objetivos_organizacionais) {
    sectionTitle(1, "Contexto informado");
    if (draft.solucoes_prestadas) {
      renderFlowText("Soluções prestadas", draft.solucoes_prestadas, { bodySize: 10.15, lineGap: 4.6, tone: C.primaryDark });
    }
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
const Dialog = Root;
const DialogPortal = Portal$1;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = Title.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = Description.displayName;
const Popover = Root2;
const PopoverTrigger = Trigger;
const PopoverContent = reactExports.forwardRef(({ className, align = "center", side = "bottom", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    align,
    side,
    sideOffset,
    className: cn(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
PopoverContent.displayName = Content2.displayName;
function SolucoesTab({ leadId }) {
  const [catalog, setCatalog] = reactExports.useState([]);
  const [proposals, setProposals] = reactExports.useState([]);
  const [itemsByProposal, setItemsByProposal] = reactExports.useState({});
  const [loading, setLoading] = reactExports.useState(true);
  const [err, setErr] = reactExports.useState(null);
  const [focusProposalId, setFocusProposalId] = reactExports.useState(null);
  const reload = reactExports.useCallback(async () => {
    setLoading(true);
    setErr(null);
    const [cat, props] = await Promise.all([
      supabase.from("services_catalog").select("*").eq("ativo", true).order("nome"),
      supabase.from("lead_proposals").select("*").eq("lead_id", leadId).order("created_at", { ascending: false })
    ]);
    if (cat.error) setErr(cat.error.message);
    if (props.error) setErr(props.error.message);
    const catalogRows = cat.data ?? [];
    const catalogList = catalogRows.map((c) => ({
      ...c,
      entregaveis: parseEntregaveis(c.entregaveis)
    }));
    const propList = props.data ?? [];
    setCatalog(catalogList);
    setProposals(propList);
    if (propList.length > 0) {
      const ids = propList.map((p) => p.id);
      const items = await supabase.from("proposal_items").select("*").in("proposal_id", ids).order("ordem");
      const grouped = {};
      const itemRows = items.data ?? [];
      itemRows.forEach((raw) => {
        const it = {
          ...raw,
          entregaveis: parseEntregaveis(raw.entregaveis),
          valor: Number(raw.valor ?? 0)
        };
        (grouped[it.proposal_id] ||= []).push(it);
      });
      setItemsByProposal(grouped);
    } else {
      setItemsByProposal({});
    }
    setLoading(false);
  }, [leadId]);
  reactExports.useEffect(() => {
    reload();
  }, [reload]);
  async function createProposal() {
    const { data, error } = await supabase.from("lead_proposals").insert({
      lead_id: leadId,
      titulo: `Proposta de ${(/* @__PURE__ */ new Date()).toLocaleDateString("pt-BR")}`
    }).select("*").single();
    if (error) {
      setErr(error.message);
      return;
    }
    setFocusProposalId(data?.id ?? null);
    reload();
  }
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
      " Carregando soluções..."
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    err && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive", children: err }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-bold", children: "Soluções pós-consultoria" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Crie propostas com os serviços contratados, valores, prazos e status de execução." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: createProposal,
          className: "inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-3 py-2 text-xs font-bold hover:opacity-90",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
            " Nova proposta"
          ]
        }
      )
    ] }),
    proposals.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-dashed border-border bg-secondary/30 p-6 text-center text-sm text-muted-foreground", children: [
      "Nenhuma proposta criada ainda. Clique em ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Nova proposta" }),
      " para começar."
    ] }),
    proposals.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProposalCard,
      {
        proposal: p,
        items: itemsByProposal[p.id] ?? [],
        catalog,
        onChange: reload,
        defaultOpen: focusProposalId === p.id,
        defaultShowCatalog: focusProposalId === p.id
      },
      p.id
    ))
  ] });
}
function ProposalCard({
  proposal,
  items,
  catalog,
  onChange,
  defaultOpen = true,
  defaultShowCatalog = false
}) {
  const [open, setOpen] = reactExports.useState(defaultOpen);
  const [draft, setDraft] = reactExports.useState(proposal);
  const [saving, setSaving] = reactExports.useState(false);
  const [showCatalog, setShowCatalog] = reactExports.useState(defaultShowCatalog);
  const [deleteDialogOpen, setDeleteDialogOpen] = reactExports.useState(false);
  const [deleting, setDeleting] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setDraft(proposal);
  }, [proposal]);
  reactExports.useEffect(() => {
    if (defaultOpen) setOpen(true);
  }, [defaultOpen]);
  reactExports.useEffect(() => {
    if (defaultShowCatalog) setShowCatalog(true);
  }, [defaultShowCatalog]);
  const total = reactExports.useMemo(() => items.reduce((acc, i) => acc + Number(i.valor || 0), 0), [items]);
  async function saveHeader() {
    setSaving(true);
    const patch = {
      titulo: draft.titulo,
      status: draft.status,
      observacoes: draft.observacoes,
      valor_total: total
    };
    if (draft.status === "enviada" && !proposal.sent_at) patch.sent_at = (/* @__PURE__ */ new Date()).toISOString();
    if ((draft.status === "aceita" || draft.status === "recusada") && !proposal.decided_at) {
      patch.decided_at = (/* @__PURE__ */ new Date()).toISOString();
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
  async function addFromCatalog(svc) {
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
      ordem: items.length
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
      ordem: items.length
    });
    onChange();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/60 backdrop-blur overflow-visible", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 p-4 border-b border-border/60", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setOpen((o) => !o),
            className: "mt-1 text-muted-foreground hover:text-foreground",
            children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              value: draft.titulo,
              onChange: (e) => setDraft({ ...draft, titulo: e.target.value }),
              className: "w-full bg-transparent text-base font-bold focus:outline-none border-b border-transparent focus:border-primary"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex flex-wrap items-center gap-2 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: draft.status }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
              items.length,
              " ",
              items.length === 1 ? "serviço" : "serviços"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "·" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
              "Total: ",
              formatBRL(total)
            ] }),
            proposal.sent_at && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
              "· Enviada em ",
              new Date(proposal.sent_at).toLocaleDateString("pt-BR")
            ] }),
            proposal.decided_at && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
              "· Decisão em ",
              new Date(proposal.decided_at).toLocaleDateString("pt-BR")
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setDeleteDialogOpen(true),
          className: "p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10",
          title: "Excluir proposta",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
        }
      )
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldMini, { label: "Status", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            value: draft.status,
            onChange: (e) => setDraft({ ...draft, status: e.target.value }),
            className: "w-full rounded-lg bg-input border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none",
            children: Object.keys(PROPOSAL_STATUS_LABELS).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: PROPOSAL_STATUS_LABELS[s] }, s))
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldMini, { label: "Valor total (auto)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-secondary/50 border border-border px-3 py-2 text-sm font-bold", children: formatBRL(total) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldMini, { label: "Observações da proposta", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          value: draft.observacoes ?? "",
          onChange: (e) => setDraft({ ...draft, observacoes: e.target.value }),
          rows: 2,
          className: "w-full rounded-lg bg-input border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none resize-none"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsx(ItemRow, { item: it, onChange }, it.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { open: showCatalog, onOpenChange: setShowCatalog, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/60 px-3 py-2 text-xs font-bold hover:border-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
          " Adicionar serviço"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          PopoverContent,
          {
            align: "start",
            side: "bottom",
            sideOffset: 10,
            avoidCollisions: false,
            className: "z-[60] w-[min(92vw,24rem)] max-h-[28rem] overflow-y-auto rounded-xl border border-border bg-popover p-2 shadow-2xl",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: addCustomItem,
                  className: "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-secondary",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 text-primary" }),
                    " Serviço personalizado"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-1 border-t border-border/60" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground", children: "Do catálogo" }),
              catalog.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-4 text-xs text-muted-foreground", children: "Catálogo vazio. Cadastre serviços em /crm/servicos." }),
              catalog.map((svc) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => addFromCatalog(svc),
                  className: "w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-secondary",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: svc.nome }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatBRL(svc.valor_padrao) })
                    ] }),
                    svc.descricao && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground line-clamp-1", children: svc.descricao })
                  ]
                },
                svc.id
              ))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end gap-2 pt-2 border-t border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: saveHeader,
          disabled: saving,
          className: "inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-3 py-2 text-xs font-bold hover:opacity-90 disabled:opacity-50",
          children: [
            saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3.5 w-3.5" }),
            "Salvar proposta"
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: deleteDialogOpen, onOpenChange: setDeleteDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Excluir proposta?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Essa ação remove a proposta e todos os serviços vinculados. Não é possível desfazer." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2 sm:gap-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setDeleteDialogOpen(false),
            className: "inline-flex items-center justify-center rounded-lg border border-border bg-background px-3 py-2 text-xs font-bold hover:border-primary",
            disabled: deleting,
            children: "Cancelar"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: confirmRemoveProposal,
            disabled: deleting,
            className: "inline-flex items-center justify-center gap-1.5 rounded-lg bg-destructive px-3 py-2 text-xs font-bold text-destructive-foreground hover:opacity-90 disabled:opacity-50",
            children: [
              deleting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
              "Excluir proposta"
            ]
          }
        )
      ] })
    ] }) })
  ] });
}
function StatusBadge({ status }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center rounded-full border px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider ${PROPOSAL_STATUS_STYLES[status]}`,
      children: PROPOSAL_STATUS_LABELS[status]
    }
  );
}
function ItemRow({ item, onChange }) {
  const [draft, setDraft] = reactExports.useState(item);
  const [saving, setSaving] = reactExports.useState(false);
  const [open, setOpen] = reactExports.useState(false);
  const [entregavelInput, setEntregavelInput] = reactExports.useState("");
  reactExports.useEffect(() => {
    setDraft(item);
  }, [item]);
  async function save() {
    setSaving(true);
    const { error } = await supabase.from("proposal_items").update({
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
      data_entrega_real: draft.data_entrega_real
    }).eq("id", item.id);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-background/70 overflow-hidden hover:border-primary/40 transition", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setOpen((o) => !o),
          className: "mt-0.5 text-muted-foreground hover:text-foreground shrink-0",
          children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              value: draft.nome,
              onChange: (e) => setDraft({ ...draft, nome: e.target.value }),
              className: "flex-1 min-w-0 bg-transparent text-sm font-bold focus:outline-none border-b border-transparent focus:border-primary"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-bold text-foreground whitespace-nowrap", children: formatBRL(draft.valor) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 flex flex-wrap items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[0.65rem] font-semibold ${ITEM_STATUS_STYLES[draft.status]}`,
              children: ITEM_STATUS_LABELS[draft.status]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(ItemChip, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }), children: [
            draft.prazo_dias ?? 0,
            " dias"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(ItemChip, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-3 w-3" }), children: [
            PAYMENT_LABELS[draft.forma_pagamento ?? "a_vista"],
            (draft.parcelas ?? 1) > 1 ? ` · ${draft.parcelas}x` : ""
          ] }),
          draft.entregaveis.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(ItemChip, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ListChecks, { className: "h-3 w-3" }), children: [
            draft.entregaveis.length,
            " entregáveis"
          ] }),
          draft.data_entrega_prevista && /* @__PURE__ */ jsxRuntimeExports.jsxs(ItemChip, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-3 w-3" }), children: [
            "Prev. ",
            new Date(draft.data_entrega_prevista).toLocaleDateString("pt-BR")
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: remove,
          className: "shrink-0 p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10",
          title: "Remover",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatusTimeline, { status: draft.status }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-3 border-t border-border/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldMini, { label: "Descrição", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          value: draft.descricao ?? "",
          onChange: (e) => setDraft({ ...draft, descricao: e.target.value }),
          rows: 2,
          className: "w-full rounded-lg bg-input border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none resize-none"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldMini, { label: "Valor (R$)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            step: "0.01",
            min: "0",
            value: draft.valor,
            onChange: (e) => setDraft({ ...draft, valor: Number(e.target.value) }),
            className: "w-full rounded-lg bg-input border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldMini, { label: "Prazo (dias)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            min: "0",
            value: draft.prazo_dias ?? 0,
            onChange: (e) => setDraft({ ...draft, prazo_dias: Number(e.target.value) }),
            className: "w-full rounded-lg bg-input border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldMini, { label: "Forma de pagamento", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            value: draft.forma_pagamento ?? "a_vista",
            onChange: (e) => setDraft({ ...draft, forma_pagamento: e.target.value }),
            className: "w-full rounded-lg bg-input border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none",
            children: Object.keys(PAYMENT_LABELS).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p, children: PAYMENT_LABELS[p] }, p))
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldMini, { label: "Parcelas", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            min: "1",
            value: draft.parcelas ?? 1,
            onChange: (e) => setDraft({ ...draft, parcelas: Number(e.target.value) }),
            className: "w-full rounded-lg bg-input border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldMini, { label: "Status do serviço", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "select",
        {
          value: draft.status,
          onChange: (e) => setDraft({ ...draft, status: e.target.value }),
          className: "w-full rounded-lg bg-input border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none",
          children: Object.keys(ITEM_STATUS_LABELS).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: ITEM_STATUS_LABELS[s] }, s))
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldMini, { label: "Início", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "date",
            value: draft.data_inicio ?? "",
            onChange: (e) => setDraft({ ...draft, data_inicio: e.target.value || null }),
            className: "w-full rounded-lg bg-input border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldMini, { label: "Entrega prevista", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "date",
            value: draft.data_entrega_prevista ?? "",
            onChange: (e) => setDraft({ ...draft, data_entrega_prevista: e.target.value || null }),
            className: "w-full rounded-lg bg-input border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldMini, { label: "Entrega real", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "date",
            value: draft.data_entrega_real ?? "",
            onChange: (e) => setDraft({ ...draft, data_entrega_real: e.target.value || null }),
            className: "w-full rounded-lg bg-input border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldMini, { label: "Entregáveis", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        draft.entregaveis.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              value: e,
              onChange: (ev) => {
                const next = [...draft.entregaveis];
                next[i] = ev.target.value;
                setDraft({ ...draft, entregaveis: next });
              },
              className: "flex-1 rounded-lg bg-input border border-border px-3 py-1.5 text-sm focus:border-primary focus:outline-none"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setDraft({
                ...draft,
                entregaveis: draft.entregaveis.filter((_, idx) => idx !== i)
              }),
              className: "p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
            }
          )
        ] }, i)),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              value: entregavelInput,
              onChange: (ev) => setEntregavelInput(ev.target.value),
              onKeyDown: (ev) => {
                if (ev.key === "Enter") {
                  ev.preventDefault();
                  addEntregavel();
                }
              },
              placeholder: "Adicionar entregável...",
              className: "flex-1 rounded-lg bg-input border border-border px-3 py-1.5 text-sm focus:border-primary focus:outline-none"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: addEntregavel,
              className: "inline-flex items-center gap-1 rounded-lg border border-border px-2 py-1.5 text-xs hover:border-primary",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" })
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: save,
          disabled: saving,
          className: "inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-3 py-1.5 text-xs font-bold hover:opacity-90 disabled:opacity-50",
          children: [
            saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3.5 w-3.5" }),
            " ",
            "Salvar serviço"
          ]
        }
      ) })
    ] })
  ] });
}
function FieldMini({ label, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1", children })
  ] });
}
function ItemChip({ icon, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-md border border-border bg-secondary/60 px-1.5 py-0.5 text-[0.65rem] font-semibold text-muted-foreground", children: [
    icon,
    " ",
    children
  ] });
}
const STATUS_FLOW = ["proposto", "aprovado", "em_execucao", "entregue"];
function StatusTimeline({ status }) {
  if (status === "cancelado") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 bg-rose-500/30" });
  }
  const idx = STATUS_FLOW.indexOf(status);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-1", children: STATUS_FLOW.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `flex-1 ${i <= idx ? "bg-primary" : "bg-secondary"} ${i > 0 ? "ml-0.5" : ""}`
    },
    i
  )) });
}
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
function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
function CrmPage() {
  const navigate = useNavigate();
  const pathname = useRouterState({
    select: (s) => s.location.pathname
  });
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
  if (pathname.startsWith("/crm/servicos")) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {});
  }
  const actions = /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleLogout, className: "inline-flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-xs font-bold hover:border-primary hover:text-primary", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
    " Sair"
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CrmShell, { title: "Funil de clientes", subtitle: "Trabalhe cada cliente nas 5 etapas — do Diagnóstico aos Resultados.", actions, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-8", children: [
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
    ] }) }) }),
    selected && /* @__PURE__ */ jsxRuntimeExports.jsx(LeadDrawer, { lead: selected, onClose: () => setSelected(null), onSaved: () => {
      setSelected(null);
      fetchLeads();
    }, onDeleted: () => {
      setSelected(null);
      fetchLeads();
    } })
  ] }) });
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
  const [drawerWidth, setDrawerWidth] = reactExports.useState(() => {
    if (typeof window === "undefined") return 860;
    return clamp(Math.round(window.innerWidth * 0.55), 560, 1120);
  });
  const [isMaximized, setIsMaximized] = reactExports.useState(false);
  const [isResizing, setIsResizing] = reactExports.useState(false);
  const resizeRef = reactExports.useRef(null);
  const needsDiscovery = !draft.solucoes_prestadas?.trim();
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
      solucoes_prestadas: draft.solucoes_prestadas,
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
      setAiError(e instanceof Error ? e.message : "Erro ao consultar a IA");
    } finally {
      setAiLoading(null);
    }
  }
  async function exportPDF() {
    await generateOrientamaisPlanoPdf({
      draft,
      logoUrl
    });
    return;
  }
  const waLink = `https://wa.me/${draft.whatsapp.replace(/\D/g, "")}`;
  reactExports.useEffect(() => {
    if (isMaximized || typeof window === "undefined") return;
    const next = clamp(drawerWidth, 560, Math.min(1120, window.innerWidth - 24));
    if (next !== drawerWidth) setDrawerWidth(next);
  }, [drawerWidth, isMaximized]);
  reactExports.useEffect(() => {
    if (!isResizing || typeof window === "undefined") return;
    const onPointerMove = (event) => {
      const nextWidth = clamp(window.innerWidth - event.clientX, 560, Math.min(1120, window.innerWidth - 24));
      setDrawerWidth(nextWidth);
    };
    const onPointerUp = () => {
      resizeRef.current = null;
      setIsResizing(false);
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };
    document.body.style.userSelect = "none";
    document.body.style.cursor = "ew-resize";
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };
  }, [isResizing]);
  function startResize(event) {
    if (isMaximized) return;
    resizeRef.current = {
      startX: event.clientX,
      startWidth: drawerWidth
    };
    setIsResizing(true);
    event.preventDefault();
  }
  function toggleMaximized() {
    setIsMaximized((current) => {
      if (!current && typeof window !== "undefined") {
        setDrawerWidth(Math.min(window.innerWidth - 24, 1280));
      }
      return !current;
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex justify-end", onClick: onClose, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/70 backdrop-blur-sm" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { onClick: (e) => e.stopPropagation(), className: "relative w-full bg-card border-l border-border h-full flex flex-col shadow-2xl", style: {
      width: isMaximized ? "min(100vw, 1280px)" : `${drawerWidth}px`
    }, children: [
      !isMaximized && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onPointerDown: startResize, className: "absolute left-0 top-0 h-full w-4 cursor-ew-resize touch-none", "aria-label": "Redimensionar painel", title: "Arraste para redimensionar", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-1 top-1/2 -translate-y-1/2 flex h-14 w-2 items-center justify-center rounded-full border border-border bg-background/80 text-muted-foreground shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 pb-0 shrink-0 border-b border-border bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 pl-2", children: [
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
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: toggleMaximized, title: isMaximized ? "Restaurar largura" : "Expandir painel", className: "inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold hover:border-primary hover:text-primary", children: [
              isMaximized ? /* @__PURE__ */ jsxRuntimeExports.jsx(Minimize2, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { className: "h-4 w-4" }),
              isMaximized ? "Restaurar" : "Expandir"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: exportPDF, title: "Exportar PDF", className: "inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold hover:border-primary hover:text-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileDown, { className: "h-4 w-4" }),
              " PDF"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "p-2 rounded-lg hover:bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 -mb-px flex gap-1 overflow-x-auto pl-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabBtn, { active: tab === "dados", onClick: () => setTab("dados"), label: "Dados" }),
          STAGES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(TabBtn, { active: tab === s.value, onClick: () => setTab(s.value), label: s.label, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-3.5 w-3.5" }) }, s.value)),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabBtn, { active: tab === "solucoes", onClick: () => setTab("solucoes"), label: "Soluções", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-3.5 w-3.5" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-5 flex-1 overflow-y-auto pl-8", children: [
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
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Soluções prestadas", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 4, value: draft.solucoes_prestadas ?? "", onChange: (v) => setDraft({
            ...draft,
            solucoes_prestadas: v
          }) }) }),
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
        tab === "estrategia" && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/60 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[0.65rem] uppercase tracking-widest text-muted-foreground", children: "Discovery" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-1 font-semibold text-sm", children: "Mapeamento de oferta e contexto" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTab("dados"), className: "rounded-full border border-border px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground hover:border-primary hover:text-primary transition", children: "Abrir dados" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 rounded-xl border border-dashed border-border bg-background/50 p-4", children: needsDiscovery ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Discovery pendente" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Quando o cliente ainda não tiver esse mapeamento, usamos diagnóstico e análise para seguir com a estratégia e deixamos esse bloco como contexto opcional." })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Discovery registrado" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 whitespace-pre-wrap text-xs text-muted-foreground", children: draft.solucoes_prestadas })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/60 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[0.65rem] uppercase tracking-widest text-muted-foreground", children: "Estratégia" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-1 font-semibold text-sm", children: "Plano gerado a partir do diagnóstico e da análise" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-primary", children: "Etapa 3" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AIButton, { loading: aiLoading === "plano", disabled: (draft.oportunidades ?? []).filter((o) => o.selecionada).length === 0, onClick: () => runAI("plano", () => runPlano({
              data: {
                leadId: lead.id
              }
            }), (r) => setDraft({
              ...draft,
              plano_acoes: r.plano_acoes,
              stage: "estrategia"
            })), label: draft.plano_acoes?.length ? "Reprocessar plano" : "Gerar plano de ação personalizado", hint: needsDiscovery ? "Começa pelo discovery quando o mapa ainda não está fechado" : "Com base nas oportunidades selecionadas" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-2", children: [
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
            draft.plano_acoes?.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: exportPDF, className: "mt-4 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground font-bold px-4 py-3 hover:opacity-90", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileDown, { className: "h-4 w-4" }),
              " Gerar PDF para o empreendedor"
            ] })
          ] })
        ] }) }),
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
        tab === "solucoes" && /* @__PURE__ */ jsxRuntimeExports.jsx(SolucoesTab, { leadId: lead.id }),
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
