CREATE UNIQUE INDEX IF NOT EXISTS diagnostic_appointments_active_slot_key
ON public.diagnostic_appointments (agendado_para)
WHERE status = 'agendado';