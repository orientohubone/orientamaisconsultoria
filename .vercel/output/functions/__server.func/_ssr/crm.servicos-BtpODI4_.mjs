import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./client-CQo1km_T.mjs";
import { p as parseEntregaveis, C as CrmShell, f as formatBRL, c as PAYMENT_LABELS } from "./types-X5ke7Yv5.mjs";
import { e as Package, x as Power, D as DollarSign, S as Search, k as LoaderCircle, h as Plus, o as Clock, p as CreditCard, q as ListChecks, m as ChevronUp, n as ChevronDown, i as Trash2, j as Save } from "../_libs/lucide-react.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/@supabase/functions-js.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-separator.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-tooltip.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
function ServicosPage() {
  const navigate = useNavigate();
  const [authReady, setAuthReady] = reactExports.useState(false);
  const [list, setList] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [err, setErr] = reactExports.useState(null);
  const [query, setQuery] = reactExports.useState("");
  const [showInactive, setShowInactive] = reactExports.useState(false);
  const reload = reactExports.useCallback(async () => {
    setLoading(true);
    setErr(null);
    const {
      data,
      error
    } = await supabase.from("services_catalog").select("*").order("nome");
    if (error) setErr(error.message);
    const rows = data ?? [];
    setList(rows.map((c) => ({
      ...c,
      entregaveis: parseEntregaveis(c.entregaveis)
    })));
    setLoading(false);
  }, []);
  reactExports.useEffect(() => {
    (async () => {
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
      await reload();
    })();
  }, [navigate, reload]);
  const filtered = reactExports.useMemo(() => {
    return list.filter((s) => {
      if (!showInactive && !s.ativo) return false;
      if (query) {
        const q = query.toLowerCase();
        return s.nome.toLowerCase().includes(q) || (s.descricao ?? "").toLowerCase().includes(q);
      }
      return true;
    });
  }, [list, query, showInactive]);
  const stats = reactExports.useMemo(() => {
    const ativos = list.filter((s) => s.ativo);
    const ticketMedio = ativos.length ? ativos.reduce((acc, s) => acc + Number(s.valor_padrao ?? 0), 0) / ativos.length : 0;
    return {
      total: list.length,
      ativos: ativos.length,
      ticketMedio
    };
  }, [list]);
  async function createNew() {
    const {
      error
    } = await supabase.from("services_catalog").insert({
      nome: "Novo serviço",
      valor_padrao: 0,
      prazo_dias: 30,
      entregaveis: [],
      forma_pagamento_padrao: "a_vista",
      parcelas_padrao: 1
    });
    if (error) {
      setErr(error.message);
      return;
    }
    reload();
  }
  if (!authReady) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center text-muted-foreground", children: "Carregando..." });
  }
  const actions = /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: createNew, className: "inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-3 py-1.5 text-xs font-bold hover:opacity-90", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
    " Novo serviço"
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CrmShell, { title: "Catálogo de serviços", subtitle: "Modelos reutilizáveis para montar propostas dos clientes", actions, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-6 py-8 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4" }), label: "Serviços cadastrados", value: String(stats.total) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Power, { className: "h-4 w-4" }), label: "Ativos", value: String(stats.ativos), accent: "emerald" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-4 w-4" }), label: "Ticket médio", value: formatBRL(stats.ticketMedio), accent: "primary" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-[220px] flex items-center gap-2 rounded-lg border border-border bg-background/60 backdrop-blur px-3 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Buscar serviço...", className: "flex-1 bg-transparent text-sm focus:outline-none" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "inline-flex items-center gap-2 text-xs text-muted-foreground cursor-pointer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: showInactive, onChange: (e) => setShowInactive(e.target.checked), className: "accent-primary" }),
        "Mostrar inativos"
      ] })
    ] }),
    err && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive", children: err }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
      " Carregando..."
    ] }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-dashed border-border bg-secondary/30 p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-10 w-10 mx-auto text-muted-foreground/60" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: list.length === 0 ? "Nenhum serviço cadastrado ainda." : "Nenhum serviço encontrado." }),
      list.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: createNew, className: "mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-bold hover:opacity-90", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " Criar primeiro serviço"
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: filtered.map((svc) => /* @__PURE__ */ jsxRuntimeExports.jsx(ServiceCard, { svc, onChange: reload }, svc.id)) })
  ] }) });
}
function StatCard({
  icon,
  label,
  value,
  accent
}) {
  const accentCls = accent === "primary" ? "text-primary" : accent === "emerald" ? "text-emerald-600 dark:text-emerald-400" : "text-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card/60 backdrop-blur px-4 py-3", style: {
    boxShadow: "var(--shadow-card)"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground", children: [
      icon,
      " ",
      label
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-1 text-xl font-bold ${accentCls}`, children: value })
  ] });
}
function ServiceCard({
  svc,
  onChange
}) {
  const [draft, setDraft] = reactExports.useState(svc);
  const [saving, setSaving] = reactExports.useState(false);
  const [expanded, setExpanded] = reactExports.useState(false);
  const [entregavelInput, setEntregavelInput] = reactExports.useState("");
  reactExports.useEffect(() => {
    setDraft(svc);
  }, [svc]);
  async function save() {
    setSaving(true);
    const {
      error
    } = await supabase.from("services_catalog").update({
      nome: draft.nome,
      descricao: draft.descricao,
      valor_padrao: Number(draft.valor_padrao ?? 0),
      prazo_dias: draft.prazo_dias,
      entregaveis: draft.entregaveis,
      forma_pagamento_padrao: draft.forma_pagamento_padrao,
      parcelas_padrao: draft.parcelas_padrao,
      ativo: draft.ativo
    }).eq("id", svc.id);
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
    setDraft({
      ...draft,
      ativo: next
    });
    await supabase.from("services_catalog").update({
      ativo: next
    }).eq("id", svc.id);
    onChange();
  }
  function addEntregavel() {
    const v = entregavelInput.trim();
    if (!v) return;
    setDraft({
      ...draft,
      entregaveis: [...draft.entregaveis, v]
    });
    setEntregavelInput("");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `group rounded-2xl border bg-card/70 backdrop-blur overflow-hidden transition ${draft.ativo ? "border-border hover:border-primary/40" : "border-border/50 opacity-70"}`, style: {
    boxShadow: "var(--shadow-card)"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-b border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: draft.nome, onChange: (e) => setDraft({
          ...draft,
          nome: e.target.value
        }), className: "w-full bg-transparent text-base font-bold focus:outline-none border-b border-transparent focus:border-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-3 w-3" }), children: formatBRL(draft.valor_padrao) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Chip, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }), children: [
            draft.prazo_dias ?? 0,
            " dias"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-3 w-3" }), children: PAYMENT_LABELS[draft.forma_pagamento_padrao ?? "a_vista"] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Chip, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ListChecks, { className: "h-3 w-3" }), children: [
            draft.entregaveis.length,
            " entregáveis"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: toggleAtivo, className: `shrink-0 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[0.65rem] font-bold ${draft.ativo ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "border-border bg-secondary text-muted-foreground"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Power, { className: "h-3 w-3" }),
        " ",
        draft.ativo ? "Ativo" : "Inativo"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setExpanded((e) => !e), className: "w-full px-4 py-2 text-left text-xs font-semibold text-muted-foreground hover:bg-secondary/40 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: expanded ? "Recolher detalhes" : "Editar detalhes" }),
      expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3.5 w-3.5" })
    ] }),
    expanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3 border-t border-border/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldMini, { label: "Descrição", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: draft.descricao ?? "", onChange: (e) => setDraft({
        ...draft,
        descricao: e.target.value
      }), rows: 2, placeholder: "Para que serve este serviço?", className: "w-full rounded-lg bg-input border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none resize-none" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldMini, { label: "Valor (R$)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", step: "0.01", min: "0", value: draft.valor_padrao ?? 0, onChange: (e) => setDraft({
          ...draft,
          valor_padrao: Number(e.target.value)
        }), className: "w-full rounded-lg bg-input border border-border px-2.5 py-2 text-sm focus:border-primary focus:outline-none" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldMini, { label: "Prazo (dias)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: "0", value: draft.prazo_dias ?? 0, onChange: (e) => setDraft({
          ...draft,
          prazo_dias: Number(e.target.value)
        }), className: "w-full rounded-lg bg-input border border-border px-2.5 py-2 text-sm focus:border-primary focus:outline-none" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldMini, { label: "Pagamento", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: draft.forma_pagamento_padrao ?? "a_vista", onChange: (e) => setDraft({
          ...draft,
          forma_pagamento_padrao: e.target.value
        }), className: "w-full rounded-lg bg-input border border-border px-2 py-2 text-sm focus:border-primary focus:outline-none", children: Object.keys(PAYMENT_LABELS).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p, children: PAYMENT_LABELS[p] }, p)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldMini, { label: "Parcelas", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: "1", value: draft.parcelas_padrao ?? 1, onChange: (e) => setDraft({
          ...draft,
          parcelas_padrao: Number(e.target.value)
        }), className: "w-full rounded-lg bg-input border border-border px-2.5 py-2 text-sm focus:border-primary focus:outline-none" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldMini, { label: "Entregáveis", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        draft.entregaveis.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[0.65rem] text-muted-foreground w-5", children: [
            i + 1,
            "."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: e, onChange: (ev) => {
            const next = [...draft.entregaveis];
            next[i] = ev.target.value;
            setDraft({
              ...draft,
              entregaveis: next
            });
          }, className: "flex-1 rounded-lg bg-input border border-border px-3 py-1.5 text-sm focus:border-primary focus:outline-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setDraft({
            ...draft,
            entregaveis: draft.entregaveis.filter((_, idx) => idx !== i)
          }), className: "p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
        ] }, i)),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: entregavelInput, onChange: (ev) => setEntregavelInput(ev.target.value), onKeyDown: (ev) => {
            if (ev.key === "Enter") {
              ev.preventDefault();
              addEntregavel();
            }
          }, placeholder: "Adicionar entregável...", className: "flex-1 rounded-lg bg-input border border-border px-3 py-1.5 text-sm focus:border-primary focus:outline-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: addEntregavel, className: "inline-flex items-center gap-1 rounded-lg border border-border px-2 py-1.5 text-xs hover:border-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center pt-2 border-t border-border/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: remove, className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
          " Excluir"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: save, disabled: saving, className: "inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-3 py-2 text-xs font-bold hover:opacity-90 disabled:opacity-50", children: [
          saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3.5 w-3.5" }),
          " ",
          "Salvar"
        ] })
      ] })
    ] })
  ] });
}
function Chip({
  icon,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-md border border-border bg-secondary/60 px-1.5 py-0.5 text-[0.65rem] font-semibold text-muted-foreground", children: [
    icon,
    " ",
    children
  ] });
}
function FieldMini({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1", children })
  ] });
}
export {
  ServicosPage as component
};
