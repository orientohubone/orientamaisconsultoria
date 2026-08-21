ALTER TABLE public.leads
ADD COLUMN IF NOT EXISTS agendado_para TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS leads_agendado_para_idx
ON public.leads (agendado_para);
