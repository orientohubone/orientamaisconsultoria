import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./client-CQo1km_T.mjs";
import { C as CrmShell, c as cn, b as buttonVariants, B as Button } from "./CrmShell-DKvjT1c5.mjs";
import { P as Popover, a as PopoverTrigger, b as PopoverContent } from "./popover-DQKRE8Bu.mjs";
import { r as CalendarDays, h as Plus, I as Clock3, X, j as Save, n as ChevronDown, f as Check, i as Trash2, J as ChevronLeft, v as ChevronRight } from "../_libs/lucide-react.mjs";
import { g as getDefaultClassNames, D as DayPicker } from "../_libs/react-day-picker.mjs";
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
import "../_libs/radix-ui__react-popover.mjs";
import "../_libs/date-fns__tz.mjs";
import "../_libs/date-fns.mjs";
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DayPicker,
    {
      showOutsideDays,
      className: cn(
        "bg-background group/calendar p-3 [--cell-size:2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      ),
      captionLayout,
      formatters: {
        formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }),
        ...formatters
      },
      classNames: {
        root: cn("w-fit", defaultClassNames.root),
        months: cn("relative flex flex-col gap-4 md:flex-row", defaultClassNames.months),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-(--cell-size) w-(--cell-size) select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-(--cell-size) w-(--cell-size) select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn("bg-popover absolute inset-0 opacity-0", defaultClassNames.dropdown),
        caption_label: cn(
          "select-none font-medium",
          captionLayout === "label" ? "text-sm" : "[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground flex-1 select-none rounded-md text-[0.8rem] font-normal",
          defaultClassNames.weekday
        ),
        week: cn("mt-2 flex w-full", defaultClassNames.week),
        week_number_header: cn("w-(--cell-size) select-none", defaultClassNames.week_number_header),
        week_number: cn(
          "text-muted-foreground select-none text-[0.8rem]",
          defaultClassNames.week_number
        ),
        day: cn(
          "group/day relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md",
          defaultClassNames.day
        ),
        range_start: cn("bg-accent rounded-l-md", defaultClassNames.range_start),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("bg-accent rounded-r-md", defaultClassNames.range_end),
        today: cn(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn("text-muted-foreground opacity-50", defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames
      },
      components: {
        Root: ({ className: className2, rootRef, ...props2 }) => {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-slot": "calendar", ref: rootRef, className: cn(className2), ...props2 });
        },
        Chevron: ({ className: className2, orientation, ...props2 }) => {
          if (orientation === "left") {
            return /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: cn("size-4", className2), ...props2 });
          }
          if (orientation === "right") {
            return /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: cn("size-4", className2), ...props2 });
          }
          return /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: cn("size-4", className2), ...props2 });
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props2 }) => {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("td", { ...props2, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children }) });
        },
        ...components
      },
      ...props
    }
  );
}
function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames();
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Button,
    {
      ref,
      variant: "ghost",
      size: "icon",
      "data-day": day.date.toLocaleDateString(),
      "data-selected-single": modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle,
      "data-range-start": modifiers.range_start,
      "data-range-end": modifiers.range_end,
      "data-range-middle": modifiers.range_middle,
      className: cn(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square h-auto w-full min-w-(--cell-size) flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      ),
      ...props
    }
  );
}
const STATUS = {
  agendado: {
    label: "Agendado",
    className: "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300"
  },
  realizado: {
    label: "Realizado",
    className: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
  },
  cancelado: {
    label: "Cancelado",
    className: "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300"
  }
};
const TIME_SLOTS = Array.from({ length: 29 }, (_, index) => {
  const minutes = 8 * 60 + index * 30;
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
});
function emptyForm() {
  return { lead_id: "", data: void 0, horario: "" };
}
function AgendaDiagnosticos() {
  const [items, setItems] = reactExports.useState([]);
  const [leads, setLeads] = reactExports.useState([]);
  const [form, setForm] = reactExports.useState(emptyForm);
  const [showForm, setShowForm] = reactExports.useState(false);
  const [timeOpen, setTimeOpen] = reactExports.useState(false);
  const [statusOpenId, setStatusOpenId] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const reload = reactExports.useCallback(async () => {
    setLoading(true);
    const { data, error: fetchError } = await supabase.from("diagnostic_appointments").select("*").order("agendado_para", { ascending: true });
    if (fetchError) setError(fetchError.message);
    else setItems(data ?? []);
    setLoading(false);
  }, []);
  reactExports.useEffect(() => {
    reload();
  }, [reload]);
  reactExports.useEffect(() => {
    supabase.from("leads").select("id, nome, whatsapp, tipo_negocio, desafios_reais").order("created_at", { ascending: false }).then(({ data, error: leadsError }) => {
      if (leadsError) setError(leadsError.message);
      else setLeads(data ?? []);
    });
  }, []);
  const upcoming = reactExports.useMemo(
    () => items.filter(
      (item) => item.status === "agendado" && new Date(item.agendado_para) >= /* @__PURE__ */ new Date()
    ),
    [items]
  );
  const selectedLead = leads.find((lead) => lead.id === form.lead_id);
  async function save(event) {
    event.preventDefault();
    if (!selectedLead || !form.data || !form.horario) return;
    const [hours, minutes] = form.horario.split(":").map(Number);
    const scheduledAt = new Date(form.data);
    scheduledAt.setHours(hours, minutes, 0, 0);
    setSaving(true);
    setError(null);
    const { error: insertError } = await supabase.from("diagnostic_appointments").insert({
      nome: selectedLead.nome,
      empresa: selectedLead.tipo_negocio,
      whatsapp: selectedLead.whatsapp,
      agendado_para: scheduledAt.toISOString(),
      observacoes: selectedLead.desafios_reais
    });
    setSaving(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
    setForm(emptyForm());
    setShowForm(false);
    reload();
  }
  async function updateStatus(id, status) {
    const { error: updateError } = await supabase.from("diagnostic_appointments").update({ status }).eq("id", id);
    if (updateError) setError(updateError.message);
    else reload();
  }
  async function remove(id) {
    if (!confirm("Excluir este agendamento?")) return;
    const { error: deleteError } = await supabase.from("diagnostic_appointments").delete().eq("id", id);
    if (deleteError) setError(deleteError.message);
    else reload();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      className: "rounded-3xl border border-border bg-card/70 p-5 md:p-6",
      style: { boxShadow: "var(--shadow-card)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-3.5 w-3.5" }),
              " Agenda de diagnósticos"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-1 text-xl font-bold", children: "Acompanhe quem entrou no Orienta+" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
              upcoming.length,
              " diagnóstico",
              upcoming.length === 1 ? "" : "s",
              " futuro",
              upcoming.length === 1 ? "" : "s",
              " agendado",
              upcoming.length === 1 ? "" : "s",
              "."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setShowForm((value) => !value),
              className: "inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground hover:opacity-90",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
                " Novo agendamento"
              ]
            }
          )
        ] }),
        showForm && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: save,
            className: "mt-5 grid gap-3 border-t border-border pt-5 md:grid-cols-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  required: true,
                  value: form.lead_id,
                  onChange: (e) => setForm({ ...form, lead_id: e.target.value }),
                  className: "rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none md:col-span-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Selecione um cliente do funil *" }),
                    leads.map((lead) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: lead.id, children: [
                      lead.nome,
                      lead.tipo_negocio ? ` · ${lead.tipo_negocio}` : ""
                    ] }, lead.id))
                  ]
                }
              ),
              selectedLead && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-primary/20 bg-primary/5 px-3 py-3 text-xs leading-5 md:col-span-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-primary", children: "Dados trazidos do funil" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-muted-foreground", children: [
                  selectedLead.whatsapp,
                  selectedLead.tipo_negocio ? ` · ${selectedLead.tipo_negocio}` : "",
                  selectedLead.desafios_reais ? ` · Desafio: ${selectedLead.desafios_reais}` : ""
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { open: timeOpen, onOpenChange: setTimeOpen, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    className: "flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-left text-sm hover:border-primary",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-4 w-4 text-primary" }),
                      form.data ? form.data.toLocaleDateString("pt-BR", {
                        weekday: "short",
                        day: "2-digit",
                        month: "long"
                      }) : "Escolha a data *"
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Calendar,
                  {
                    mode: "single",
                    selected: form.data,
                    onSelect: (data) => setForm({ ...form, data }),
                    disabled: (date) => date < new Date((/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0)),
                    initialFocus: true
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    className: "flex items-center gap-2 rounded-lg border border-border bg-card/70 px-3 py-2 text-left text-sm transition hover:border-primary",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock3, { className: "h-4 w-4 text-primary" }),
                      form.horario || "Escolha o horário *"
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(PopoverContent, { className: "w-72 border-border bg-card p-3", align: "start", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Horários disponíveis" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-1.5", children: TIME_SLOTS.map((time) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        setForm({ ...form, horario: time });
                        setTimeOpen(false);
                      },
                      className: `rounded-md px-2 py-1.5 text-xs font-bold transition ${form.horario === time ? "bg-primary text-primary-foreground" : "bg-secondary/60 text-foreground hover:bg-primary/15 hover:text-primary"}`,
                      children: time
                    },
                    time
                  )) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 md:col-span-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowForm(false),
                    className: "rounded-lg border border-border px-3 py-2 text-xs font-bold hover:border-primary",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "mr-1 inline h-3.5 w-3.5" }),
                      " Cancelar"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    disabled: saving,
                    className: "rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground disabled:opacity-50",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "mr-1 inline h-3.5 w-3.5" }),
                      " ",
                      saving ? "Salvando..." : "Salvar agendamento"
                    ]
                  }
                )
              ] })
            ]
          }
        ),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive", children: error }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 space-y-2", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-4 text-sm text-muted-foreground", children: "Carregando agenda..." }) : items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-xl border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground", children: "Nenhum diagnóstico agendado ainda." }) : items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col gap-3 rounded-xl border border-border/70 bg-background/45 p-4 md:flex-row md:items-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock3, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-bold", children: [
                    item.nome,
                    item.empresa ? ` · ${item.empresa}` : ""
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 text-xs text-muted-foreground", children: [
                    new Date(item.agendado_para).toLocaleString("pt-BR", {
                      dateStyle: "short",
                      timeStyle: "short"
                    }),
                    item.whatsapp ? ` · ${item.whatsapp}` : ""
                  ] }),
                  item.observacoes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: item.observacoes })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Popover,
                  {
                    open: statusOpenId === item.id,
                    onOpenChange: (open) => setStatusOpenId(open ? item.id : null),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          className: `inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-bold transition hover:brightness-95 ${STATUS[item.status].className}`,
                          children: [
                            STATUS[item.status].label,
                            " ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3 w-3" })
                          ]
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverContent, { className: "w-40 border-border bg-card p-1.5", align: "end", children: Object.keys(STATUS).map((status) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => {
                            setStatusOpenId(null);
                            updateStatus(item.id, status);
                          },
                          className: `flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left text-xs font-bold transition hover:bg-secondary ${STATUS[status].className}`,
                          children: [
                            STATUS[status].label,
                            item.status === status && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5" })
                          ]
                        },
                        status
                      )) })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => remove(item.id),
                    title: "Excluir agendamento",
                    className: "rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                  }
                )
              ] })
            ]
          },
          item.id
        )) })
      ]
    }
  );
}
function AgendaPage() {
  const navigate = useNavigate();
  const [ready, setReady] = reactExports.useState(false);
  reactExports.useEffect(() => {
    supabase.auth.getSession().then(({
      data
    }) => {
      if (!data.session) {
        navigate({
          to: "/login"
        });
        return;
      }
      setReady(true);
    });
  }, [navigate]);
  if (!ready) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center text-muted-foreground", children: "Carregando..." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CrmShell, { title: "Agenda de diagnósticos", subtitle: "Acompanhe os empreendedores que entraram no Orienta+.", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-5xl px-6 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AgendaDiagnosticos, {}) }) });
}
export {
  AgendaPage as component
};
