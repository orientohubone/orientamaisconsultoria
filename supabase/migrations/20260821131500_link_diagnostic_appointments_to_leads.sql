ALTER TABLE public.diagnostic_appointments
ADD COLUMN lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL;

CREATE INDEX diagnostic_appointments_lead_id_idx
ON public.diagnostic_appointments (lead_id);
