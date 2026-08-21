CREATE UNIQUE INDEX diagnostic_appointments_active_slot_key
ON public.diagnostic_appointments (agendado_para)
WHERE status = 'agendado';
