type Oportunidade = { titulo: string; descricao: string; impacto: string; selecionada?: boolean };
type Acao = { titulo: string; descricao: string; prazo: string; responsavel: string; prioridade: string; concluida?: boolean };
type Metrica = { nome: string; unidade: string; frequencia: string; meta: string; valor_atual: string };

type LeadPdf = {
  nome: string;
  whatsapp: string;
  tipo_negocio: string | null;
  cnpj: string | null;
  desafios_reais: string | null;
  objetivos_organizacionais: string | null;
  diagnostico_ai: string | null;
  analise_ai: string | null;
  oportunidades: Oportunidade[];
  plano_acoes: Acao[];
  resultados_metricas: Metrica[];
};

type PdfPalette = {
  primary: [number, number, number];
  primaryDark: [number, number, number];
  ink: [number, number, number];
  sub: [number, number, number];
  soft: [number, number, number];
  paper: [number, number, number];
  border: [number, number, number];
  accent: [number, number, number];
  red: [number, number, number];
  amber: [number, number, number];
  green: [number, number, number];
  slate: [number, number, number];
};

type GeneratePdfParams = {
  draft: Pick<
    LeadPdf,
    | "nome"
    | "whatsapp"
    | "tipo_negocio"
    | "cnpj"
    | "desafios_reais"
    | "objetivos_organizacionais"
    | "diagnostico_ai"
    | "analise_ai"
    | "oportunidades"
    | "plano_acoes"
    | "resultados_metricas"
  >;
  logoUrl: string;
};

export async function generateOrientamaisPlanoPdf({ draft, logoUrl }: GeneratePdfParams) {
  const { default: jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const M = 48;
  const CONTENT_W = W - M * 2;

  const C: PdfPalette = {
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
    slate: [107, 114, 128],
  };

  const fill = (rgb: [number, number, number]) => doc.setFillColor(rgb[0], rgb[1], rgb[2]);
  const stroke = (rgb: [number, number, number]) => doc.setDrawColor(rgb[0], rgb[1], rgb[2]);
  const ink = (rgb: [number, number, number]) => doc.setTextColor(rgb[0], rgb[1], rgb[2]);
  const setFont = (size: number, bold = false) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(size);
  };

  const safeText = (value: string | null | undefined, fallback = "—") => (value && value.trim() ? value.trim() : fallback);
  const stripMd = (s: string) => s.replace(/\*\*(.+?)\*\*/g, "$1").replace(/`([^`]+)`/g, "$1").replace(/^#+\s*/gm, "");
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

  const drawBadge = (
    text: string,
    x: number,
    yPos: number,
    colors: { fill: [number, number, number]; text: [number, number, number] },
  ) => {
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

  const drawPill = (text: string, x: number, yPos: number, colors: { fill: [number, number, number]; text: [number, number, number] }) =>
    drawBadge(text, x, yPos, colors);

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
    fill([229, 239, 222]);
    doc.circle(W - 78, 76, 48, "F");
    fill([238, 246, 226]);
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

  const renderFlowText = (title: string, text: string, opts: { bodySize?: number; lineGap?: number; tone?: [number, number, number] } = {}) => {
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

  const sectionTitle = (num: number, title: string, tone: [number, number, number] = C.primary) => {
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
    const titleLines = measureLines(o.titulo, CONTENT_W - 156, 12.2, true);
    const descLines = measureLines(o.descricao, CONTENT_W - 118, 10.1, false);
    const titleBlockH = titleLines.length * 15;
    const descBlockH = descLines.length * 13;
    const height = 34 + titleBlockH + descBlockH + 30;
    ensure(height + 16);
    card(M, y, CONTENT_W, height);
    fill(C.soft);
    doc.roundedRect(M + 14, y + 14, 26, 26, 8, 8, "F");
    ink(C.primaryDark);
    setFont(11, true);
    doc.text(String(index + 1).padStart(2, "0"), M + 27, y + 31, { align: "center" });
    drawWrappedLines(titleLines, M + 52, y + 28, { size: 12.2, color: C.ink, lineHeight: 15, bold: true });
    const badgeY = y + 16;
    drawBadge(badge.label, W - M - 88, badgeY, { fill: badge.fill, text: badge.text });
    const descY = y + 28 + titleBlockH + 14;
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

  const estimateActionHeight = (a: Acao) => {
    const titleLines = measureLines(a.titulo, CONTENT_W - 124, 12.4, true);
    const descLines = measureLines(a.descricao, CONTENT_W - 112, 10.1, false);
    const metaLine = `Prazo: ${safeText(a.prazo)}   ·   Responsável: ${safeText(a.responsavel)}`;
    const metaLines = measureLines(metaLine, CONTENT_W - 36, 9.2, false);
    return 34 + titleLines.length * 15 + metaLines.length * 12 + descLines.length * 13 + 24;
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

  card(M, y, CONTENT_W, 172, C.soft);
  ink(C.primaryDark);
  setFont(10, true);
  doc.text("VISÃO GERAL", M + 18, y + 20);
  const summaryRows = tocItems.map((item) => ({
    ...item,
    status: item.on ? "Incluso" : "Pendente",
    colors: item.on ? { fill: [232, 246, 237] as [number, number, number], text: C.green } : { fill: [241, 245, 249] as [number, number, number], text: C.slate },
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
