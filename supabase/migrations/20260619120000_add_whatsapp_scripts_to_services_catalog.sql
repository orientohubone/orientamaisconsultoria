ALTER TABLE public.services_catalog
ADD COLUMN IF NOT EXISTS scripts_whatsapp jsonb NOT NULL DEFAULT '[]'::jsonb;
