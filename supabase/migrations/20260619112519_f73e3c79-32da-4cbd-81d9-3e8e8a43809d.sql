ALTER TABLE public.services_catalog
ADD COLUMN IF NOT EXISTS scripts_whatsapp jsonb NOT NULL DEFAULT '[]'::jsonb;

INSERT INTO public.services_catalog (
  nome, descricao, valor_padrao, prazo_dias, entregaveis, scripts_whatsapp, forma_pagamento_padrao, parcelas_padrao, ativo
)
SELECT
  'Soluções empresariais',
  'Oferta guarda-chuva para negócios que precisam de múltiplas frentes ao mesmo tempo, como site, identidade, presença digital, marketing, estratégia e proteção da marca.',
  0,
  30,
  '[]'::jsonb,
  '[
    {"titulo":"1. Abertura - soluções empresariais","categoria":"abertura","mensagem":"Olá, [nome]! Tudo bem?\n\nEstou entrando em contato porque, em alguns negócios, não existe um único problema, mas vários pontos que se conectam: presença digital, marca, marketing, site, estrutura comercial e posicionamento.\n\nPosso te mostrar como isso funciona em uma conversa rápida?"},
    {"titulo":"2. Situação atual - soluções empresariais","categoria":"situacao","mensagem":"Hoje, quais dessas frentes estão mais sensíveis para você: domínio e site, identidade visual, Google, marketing, consultoria estratégica ou proteção da marca?"},
    {"titulo":"3. Problema - soluções empresariais","categoria":"problema","mensagem":"O que pesa mais hoje: a empresa está sem uma base digital consistente, sem clareza estratégica, sem previsibilidade comercial ou sem proteção e padronização da marca?"},
    {"titulo":"4. Implicação - soluções empresariais","categoria":"implicacao","mensagem":"Quando essas frentes ficam desconectadas, o negócio perde autoridade, confiança e chance de venda. No fim, cada área puxa para um lado e o resultado fica mais lento.\n\nIsso tem acontecido por aí?"},
    {"titulo":"5. Necessidade - soluções empresariais","categoria":"necessidade","mensagem":"Se você tivesse uma solução organizada, com prioridades claras e execução por etapas, isso ajudaria o negócio a ganhar mais consistência e resultado?"},
    {"titulo":"6. Fechamento - soluções empresariais","categoria":"fechamento","mensagem":"Se fizer sentido, eu posso te apresentar uma proposta de soluções empresariais com diagnóstico inicial e os serviços que realmente fazem sentido para o seu caso.\n\nQuer que eu te envie uma visão resumida?"}
  ]'::jsonb,
  'a_vista',
  1,
  true
WHERE NOT EXISTS (
  SELECT 1 FROM public.services_catalog WHERE lower(nome) = lower('Soluções empresariais')
);