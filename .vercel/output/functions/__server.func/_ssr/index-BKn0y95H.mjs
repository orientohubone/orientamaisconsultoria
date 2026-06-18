import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { l as logoUrl } from "./logo orientamais-BvCW8YDi.mjs";
import { s as supabase } from "./client-CQo1km_T.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { A as ArrowRight, s as Crosshair, t as Megaphone, U as Users, g as TrendingUp, u as ChartPie, C as ClipboardCheck, S as Search, L as Lightbulb, R as Rocket, a as ChartColumn, v as ChevronRight, w as CircleCheck } from "../_libs/lucide-react.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/@supabase/functions-js.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const fernandoUrl = "/assets/fernando-lo6fTQQx.jpeg";
const solucoes = [{
  icon: Crosshair,
  title: "Posicionamento",
  desc: "Clareza sobre quem você é, o que faz e para quem faz."
}, {
  icon: Megaphone,
  title: "Marketing e Comunicação",
  desc: "Mensagem certa para atrair, conectar e converter."
}, {
  icon: Users,
  title: "Gestão e Processos",
  desc: "Organização que aumenta produtividade e reduz perdas."
}, {
  icon: TrendingUp,
  title: "Vendas e Resultados",
  desc: "Estratégias para vender mais, com previsibilidade."
}, {
  icon: ChartPie,
  title: "Análise e Planejamento",
  desc: "Decisões baseadas em dados e visão de futuro."
}];
const etapas = [{
  n: "1",
  icon: ClipboardCheck,
  title: "Diagnóstico",
  desc: "Entendemos seu negócio e os desafios reais."
}, {
  n: "2",
  icon: Search,
  title: "Análise",
  desc: "Mergulho profundo para encontrar oportunidades."
}, {
  n: "3",
  icon: Lightbulb,
  title: "Discovery",
  desc: "Mapeamos soluções prestadas, recursos e prioridades para sustentar a estratégia."
}, {
  n: "4",
  icon: Rocket,
  title: "Execução",
  desc: "Implementação com orientação prática."
}, {
  n: "5",
  icon: ChartColumn,
  title: "Resultados",
  desc: "Acompanhamento para garantir crescimento."
}];
function Logo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logoUrl, alt: "Orientamais", className: "h-10 w-auto" });
}
function Index() {
  const [sent, setSent] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({
    nome: "",
    whatsapp: "",
    tipo_negocio: "",
    cnpj: "",
    solucoes_prestadas: "",
    desafios_reais: "",
    objetivos_organizacionais: ""
  });
  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const {
      error: dbError
    } = await supabase.from("leads").insert({
      nome: form.nome.trim(),
      whatsapp: form.whatsapp.trim(),
      tipo_negocio: form.tipo_negocio.trim() || null,
      cnpj: form.cnpj.trim() || null,
      solucoes_prestadas: form.solucoes_prestadas.trim() || null,
      desafios_reais: form.desafios_reais.trim() || null,
      objetivos_organizacionais: form.objetivos_organizacionais.trim() || null
    });
    setLoading(false);
    if (dbError) {
      setError("Não foi possível enviar agora. Tente novamente.");
      return;
    }
    setSent(true);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen text-foreground", style: {
    background: "var(--gradient-hero)"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "max-w-7xl mx-auto px-6 py-6 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/crm", className: "hidden sm:inline-flex text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-primary transition", children: "Painel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#agendar", className: "hidden sm:inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition", children: [
          "Quero minha vaga ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "max-w-7xl mx-auto px-6 pt-8 pb-20 grid lg:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-6 uppercase tracking-widest", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-primary animate-pulse" }),
          " Orientação 100% Gratuita"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight", children: [
          "ORIENTAÇÃO",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "QUE GERA CLAREZA.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary", children: [
            "DECISÃO QUE",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "GERA RESULTADO."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-lg text-muted-foreground max-w-xl uppercase tracking-wide font-medium", children: [
          "Soluções práticas para empreendedores que querem",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "crescer com estratégia." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#agendar", className: "inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground hover:opacity-90 transition", style: {
            boxShadow: "var(--shadow-glow)"
          }, children: [
            "Agendar orientação gratuita ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-5 w-5" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#solucoes", className: "inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 font-semibold hover:bg-secondary transition", children: "Ver soluções" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid grid-cols-3 gap-4 max-w-lg", children: [{
          label: "FOCO",
          desc: "no que realmente gera resultado."
        }, {
          label: "ESTRATÉGIA",
          desc: "para competir e se posicionar."
        }, {
          label: "CRESCIMENTO",
          desc: "com direção, métrica e ação."
        }].map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-l-2 border-primary pl-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-primary text-xs font-bold tracking-wider", children: p.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1 leading-snug", children: p.desc })
        ] }, p.label)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-4 bg-primary/20 blur-3xl rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-3xl overflow-hidden border border-primary/30", style: {
          boxShadow: "var(--shadow-card)"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: fernandoUrl, alt: "Fernando Ramalho — Consultor Orientamais", className: "w-full h-auto object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-primary font-bold", children: "Seu consultor" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold mt-1", children: "Fernando Ramalho" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "Especialista em estratégia para pequenos negócios" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "solucoes", className: "max-w-7xl mx-auto px-6 py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-block border border-primary/40 rounded-full px-5 py-1.5 text-xs font-bold tracking-widest text-primary uppercase", children: "Soluções que transformam negócios" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-6 text-4xl md:text-5xl font-bold", children: "O que você vai destravar na sessão" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-5", children: solucoes.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group rounded-2xl border border-border bg-card backdrop-blur-sm p-6 hover:border-primary/60 transition", style: {
        boxShadow: "var(--shadow-card)"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-6 w-6 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold tracking-wide uppercase", children: s.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground leading-relaxed", children: s.desc })
      ] }, s.title)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "max-w-7xl mx-auto px-6 py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-block text-primary text-xs font-bold tracking-widest uppercase border-y border-primary py-1.5 px-6", children: "Como funciona" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-6 text-4xl md:text-5xl font-bold", children: "5 passos até o seu próximo nível" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-6", children: etapas.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mx-auto h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-black text-xl", style: {
          boxShadow: "var(--shadow-glow)"
        }, children: e.n }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(e.icon, { className: "h-7 w-7 text-primary mx-auto mt-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 font-bold uppercase tracking-wide text-sm", children: e.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground leading-relaxed", children: e.desc }),
        i < etapas.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "hidden md:block absolute top-5 -right-5 h-6 w-6 text-primary/60" })
      ] }, e.n)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "agendar", className: "max-w-5xl mx-auto px-6 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border-2 border-primary/40 p-8 md:p-12 relative overflow-hidden", style: {
      background: "linear-gradient(135deg, oklch(0.22 0.05 155 / 0.8), oklch(0.15 0.04 155 / 0.8))",
      boxShadow: "var(--shadow-glow)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-20 -right-20 h-60 w-60 rounded-full bg-primary/20 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative grid md:grid-cols-2 gap-10 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl md:text-4xl font-bold uppercase", children: [
            "Empreendedor, você não precisa",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "fazer tudo sozinho." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-muted-foreground", children: [
            "Você precisa de direção, estratégia e alguém ao seu lado para te ajudar a",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-semibold", children: "chegar lá." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-6 space-y-3", children: ["Sessão 100% gratuita e sem compromisso", "Diagnóstico personalizado do seu negócio", "Plano de ação prático para os próximos passos"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 text-primary mt-0.5 shrink-0" }),
            " ",
            t
          ] }, t)) })
        ] }),
        sent ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-primary/15 border border-primary/40 p-8 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-12 w-12 text-primary mx-auto" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 text-2xl font-bold", children: "Vaga reservada!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground text-sm", children: "Em breve entraremos em contato para agendar sua orientação gratuita." })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "rounded-2xl bg-background/60 backdrop-blur border border-border p-6 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Nome" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: form.nome, onChange: (e) => setForm({
              ...form,
              nome: e.target.value
            }), spellCheck: false, autoCapitalize: "off", autoCorrect: "off", className: "mt-1 w-full rounded-lg bg-input border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none", placeholder: "Seu nome" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "WhatsApp" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "tel", value: form.whatsapp, onChange: (e) => setForm({
              ...form,
              whatsapp: e.target.value
            }), spellCheck: false, autoCapitalize: "off", autoCorrect: "off", className: "mt-1 w-full rounded-lg bg-input border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none", placeholder: "(00) 00000-0000" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Seu negócio" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.tipo_negocio, onChange: (e) => setForm({
                ...form,
                tipo_negocio: e.target.value
              }), spellCheck: false, autoCapitalize: "off", autoCorrect: "off", className: "mt-1 w-full rounded-lg bg-input border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none", placeholder: "O que você faz?" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "CNPJ" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: form.cnpj, onChange: (e) => setForm({
                ...form,
                cnpj: e.target.value
              }), spellCheck: false, autoCapitalize: "off", autoCorrect: "off", className: "mt-1 w-full rounded-lg bg-input border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none", placeholder: "Opcional" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Soluções prestadas" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 2, value: form.solucoes_prestadas, onChange: (e) => setForm({
              ...form,
              solucoes_prestadas: e.target.value
            }), spellCheck: false, autoCapitalize: "off", autoCorrect: "off", className: "mt-1 w-full rounded-lg bg-input border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none resize-none", placeholder: "Liste as soluções que você já entrega hoje" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Desafios reais" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 2, value: form.desafios_reais, onChange: (e) => setForm({
              ...form,
              desafios_reais: e.target.value
            }), spellCheck: false, autoCapitalize: "off", autoCorrect: "off", className: "mt-1 w-full rounded-lg bg-input border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none resize-none", placeholder: "O que mais te trava hoje?" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Objetivos" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 2, value: form.objetivos_organizacionais, onChange: (e) => setForm({
              ...form,
              objetivos_organizacionais: e.target.value
            }), spellCheck: false, autoCapitalize: "off", autoCorrect: "off", className: "mt-1 w-full rounded-lg bg-input border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none resize-none", placeholder: "Onde você quer chegar?" })
          ] }),
          error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: error }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: loading, type: "submit", className: "w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground font-bold py-3.5 hover:opacity-90 transition disabled:opacity-60", children: loading ? "Enviando..." : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            "Garantir minha vaga ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-5 w-5" })
          ] }) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border/40 mt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Orientamais. Todos os direitos reservados."
      ] })
    ] }) })
  ] });
}
export {
  Index as component
};
