ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS diagnostico_ai text,
  ADD COLUMN IF NOT EXISTS analise_ai text,
  ADD COLUMN IF NOT EXISTS oportunidades jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS plano_acoes jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS execucao_notas text,
  ADD COLUMN IF NOT EXISTS resultados_metricas jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS resultados_notas text;