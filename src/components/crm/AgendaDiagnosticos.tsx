import { useCallback, useEffect, useMemo, useState } from "react";
import { CalendarDays, Check, ChevronDown, Clock3, Plus, Save, Trash2, X } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type AppointmentStatus = "agendado" | "realizado" | "cancelado";
type Appointment = {
  id: string;
  nome: string;
  empresa: string | null;
  whatsapp: string | null;
  agendado_para: string;
  status: AppointmentStatus;
  observacoes: string | null;
};

type FunnelLead = {
  id: string;
  nome: string;
  whatsapp: string;
  tipo_negocio: string | null;
  desafios_reais: string | null;
};

const STATUS: Record<AppointmentStatus, { label: string; className: string }> = {
  agendado: {
    label: "Agendado",
    className: "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300",
  },
  realizado: {
    label: "Realizado",
    className: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  },
  cancelado: {
    label: "Cancelado",
    className: "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300",
  },
};

const TIME_SLOTS = Array.from({ length: 29 }, (_, index) => {
  const minutes = 8 * 60 + index * 30;
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
});

function emptyForm() {
  return { lead_id: "", data: undefined as Date | undefined, horario: "" };
}

export function AgendaDiagnosticos() {
  const [items, setItems] = useState<Appointment[]>([]);
  const [leads, setLeads] = useState<FunnelLead[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [statusOpenId, setStatusOpenId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from("diagnostic_appointments")
      .select("*")
      .order("agendado_para", { ascending: true });
    if (fetchError) setError(fetchError.message);
    else setItems((data ?? []) as Appointment[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  useEffect(() => {
    supabase
      .from("leads")
      .select("id, nome, whatsapp, tipo_negocio, desafios_reais")
      .order("created_at", { ascending: false })
      .then(({ data, error: leadsError }) => {
        if (leadsError) setError(leadsError.message);
        else setLeads((data ?? []) as FunnelLead[]);
      });
  }, []);

  const upcoming = useMemo(
    () =>
      items.filter(
        (item) => item.status === "agendado" && new Date(item.agendado_para) >= new Date(),
      ),
    [items],
  );
  const selectedLead = leads.find((lead) => lead.id === form.lead_id);

  async function save(event: React.FormEvent<HTMLFormElement>) {
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
      observacoes: selectedLead.desafios_reais,
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

  async function updateStatus(id: string, status: AppointmentStatus) {
    const { error: updateError } = await supabase
      .from("diagnostic_appointments")
      .update({ status })
      .eq("id", id);
    if (updateError) setError(updateError.message);
    else reload();
  }

  async function remove(id: string) {
    if (!confirm("Excluir este agendamento?")) return;
    const { error: deleteError } = await supabase
      .from("diagnostic_appointments")
      .delete()
      .eq("id", id);
    if (deleteError) setError(deleteError.message);
    else reload();
  }

  return (
    <section
      className="rounded-3xl border border-border bg-card/70 p-5 md:p-6"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <CalendarDays className="h-3.5 w-3.5" /> Agenda de diagnósticos
          </div>
          <h3 className="mt-1 text-xl font-bold">Acompanhe quem entrou no Orienta+</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {upcoming.length} diagnóstico{upcoming.length === 1 ? "" : "s"} futuro
            {upcoming.length === 1 ? "" : "s"} agendado{upcoming.length === 1 ? "" : "s"}.
          </p>
        </div>
        <button
          onClick={() => setShowForm((value) => !value)}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground hover:opacity-90"
        >
          <Plus className="h-4 w-4" /> Novo agendamento
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={save}
          className="mt-5 grid gap-3 border-t border-border pt-5 md:grid-cols-2"
        >
          <select
            required
            value={form.lead_id}
            onChange={(e) => setForm({ ...form, lead_id: e.target.value })}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none md:col-span-2"
          >
            <option value="">Selecione um cliente do funil *</option>
            {leads.map((lead) => (
              <option key={lead.id} value={lead.id}>
                {lead.nome}
                {lead.tipo_negocio ? ` · ${lead.tipo_negocio}` : ""}
              </option>
            ))}
          </select>
          {selectedLead && (
            <div className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-3 text-xs leading-5 md:col-span-2">
              <strong className="text-primary">Dados trazidos do funil</strong>
              <div className="mt-1 text-muted-foreground">
                {selectedLead.whatsapp}
                {selectedLead.tipo_negocio ? ` · ${selectedLead.tipo_negocio}` : ""}
                {selectedLead.desafios_reais ? ` · Desafio: ${selectedLead.desafios_reais}` : ""}
              </div>
            </div>
          )}
          <Popover open={timeOpen} onOpenChange={setTimeOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-left text-sm hover:border-primary"
              >
                <CalendarDays className="h-4 w-4 text-primary" />
                {form.data
                  ? form.data.toLocaleDateString("pt-BR", {
                      weekday: "short",
                      day: "2-digit",
                      month: "long",
                    })
                  : "Escolha a data *"}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={form.data}
                onSelect={(data) => setForm({ ...form, data })}
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg border border-border bg-card/70 px-3 py-2 text-left text-sm transition hover:border-primary"
              >
                <Clock3 className="h-4 w-4 text-primary" />
                {form.horario || "Escolha o horário *"}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-72 border-border bg-card p-3" align="start">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Horários disponíveis
              </p>
              <div className="grid grid-cols-3 gap-1.5">
                {TIME_SLOTS.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => {
                      setForm({ ...form, horario: time });
                      setTimeOpen(false);
                    }}
                    className={`rounded-md px-2 py-1.5 text-xs font-bold transition ${form.horario === time ? "bg-primary text-primary-foreground" : "bg-secondary/60 text-foreground hover:bg-primary/15 hover:text-primary"}`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <div className="flex justify-end gap-2 md:col-span-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-lg border border-border px-3 py-2 text-xs font-bold hover:border-primary"
            >
              <X className="mr-1 inline h-3.5 w-3.5" /> Cancelar
            </button>
            <button
              disabled={saving}
              className="rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground disabled:opacity-50"
            >
              <Save className="mr-1 inline h-3.5 w-3.5" />{" "}
              {saving ? "Salvando..." : "Salvar agendamento"}
            </button>
          </div>
        </form>
      )}

      {error && (
        <p className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
          {error}
        </p>
      )}
      <div className="mt-5 space-y-2">
        {loading ? (
          <p className="py-4 text-sm text-muted-foreground">Carregando agenda...</p>
        ) : items.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground">
            Nenhum diagnóstico agendado ainda.
          </p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-3 rounded-xl border border-border/70 bg-background/45 p-4 md:flex-row md:items-center"
            >
              <div className="flex flex-1 items-start gap-3">
                <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <div className="font-bold">
                    {item.nome}
                    {item.empresa ? ` · ${item.empresa}` : ""}
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {new Date(item.agendado_para).toLocaleString("pt-BR", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                    {item.whatsapp ? ` · ${item.whatsapp}` : ""}
                  </p>
                  {item.observacoes && (
                    <p className="mt-1 text-xs text-muted-foreground">{item.observacoes}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Popover
                  open={statusOpenId === item.id}
                  onOpenChange={(open) => setStatusOpenId(open ? item.id : null)}
                >
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-bold transition hover:brightness-95 ${STATUS[item.status].className}`}
                    >
                      {STATUS[item.status].label} <ChevronDown className="h-3 w-3" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-40 border-border bg-card p-1.5" align="end">
                    {(Object.keys(STATUS) as AppointmentStatus[]).map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => {
                          setStatusOpenId(null);
                          updateStatus(item.id, status);
                        }}
                        className={`flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left text-xs font-bold transition hover:bg-secondary ${STATUS[status].className}`}
                      >
                        {STATUS[status].label}
                        {item.status === status && <Check className="h-3.5 w-3.5" />}
                      </button>
                    ))}
                  </PopoverContent>
                </Popover>
                <button
                  onClick={() => remove(item.id)}
                  title="Excluir agendamento"
                  className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
