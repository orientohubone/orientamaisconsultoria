CREATE TABLE public.diagnostic_appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  empresa TEXT,
  whatsapp TEXT,
  agendado_para TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'agendado'
    CHECK (status IN ('agendado', 'realizado', 'cancelado')),
  observacoes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX diagnostic_appointments_agendado_para_idx
ON public.diagnostic_appointments (agendado_para);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.diagnostic_appointments TO authenticated;
GRANT ALL ON public.diagnostic_appointments TO service_role;

ALTER TABLE public.diagnostic_appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team can manage diagnostic appointments"
ON public.diagnostic_appointments FOR ALL
TO authenticated
USING (public.is_team_member(auth.uid()))
WITH CHECK (public.is_team_member(auth.uid()));

CREATE TRIGGER diagnostic_appointments_set_updated_at
BEFORE UPDATE ON public.diagnostic_appointments
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
