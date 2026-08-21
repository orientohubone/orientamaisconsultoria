import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  CalendarDays,
  Check,
  ChevronRight,
  Clipboard,
  Copy,
  MessageCircle,
  Target,
} from "lucide-react";

import { CrmShell } from "@/components/crm/CrmShell";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/crm/fluxo-vendedor")({
  head: () => ({ meta: [{ title: "Fluxo Vendedor — Orientamais" }] }),
  component: FluxoVendedorPage,
});

const STEPS = [
  {
    title: "Primeiro contato",
    text: `Oi, [nome]! Tudo bem?

Aqui é o Fernando, do Orientohub.

Estou conhecendo alguns empreendedores e negócios da região e queria aproveitar para conhecer um pouco mais sobre a [empresa].

Como estão as coisas por aí hoje?`,
  },
  {
    title: "Depois da resposta",
    text: `Legal. E olhando para o negócio hoje, tem alguma área que você sente que poderia estar performando melhor?

Pode ser vendas, marketing, processos, gestão, tecnologia ou até alguma questão que você ainda não conseguiu identificar exatamente.`,
  },
  {
    title: "Explorar o problema",
    text: `Entendi.

E isso hoje é algo que já está impactando o negócio ou é mais uma oportunidade que você percebe que poderia aproveitar melhor?`,
  },
  {
    title: "Fazer a ponte",
    text: `Te perguntei porque temos uma iniciativa no Orientohub chamada Orienta+ Empreendedores.

É um programa gratuito em que sentamos com o empreendedor para olhar o negócio de forma mais ampla.

A partir dessa conversa, fazemos um diagnóstico, identificamos oportunidades e estruturamos um plano de ação com os próximos passos.`,
  },
  {
    title: "Convite",
    text: `Pelo que você me contou, acho que faria sentido olhar principalmente para [problema/oportunidade mencionada pela pessoa].

Se você topar, posso abrir um horário para fazermos esse diagnóstico juntos.

Sem custo.`,
  },
  {
    title: "Agendamento",
    text: `Tenho alguns horários disponíveis.

Qual período costuma ser melhor para você: manhã ou tarde?`,
  },
];

const INTERESTED_FLOW = `Oi, [nome]! Tudo bem?

Aqui é o Fernando, do Orientohub.

Vi seu interesse no Orienta+ Empreendedores.

A proposta é bem prática: entender o momento atual do seu negócio, identificar possíveis gargalos e oportunidades e, a partir disso, construir um plano de ação com você.

Antes de agendarmos, queria entender uma coisa:

qual é o principal desafio que você gostaria de resolver no seu negócio hoje?`;

function FluxoVendedorPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate({ to: "/login" });
        return;
      }
      setReady(true);
    });
  }, [navigate]);

  async function copyStep(index: number, text: string) {
    await navigator.clipboard.writeText(text);
    setCopied(index);
    window.setTimeout(() => setCopied(null), 2200);
  }

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Carregando...
      </div>
    );
  }

  return (
    <CrmShell
      title="Fluxo vendedor"
      subtitle="Roteiros de prospecção e conversão para o Orienta+ Empreendedores."
    >
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div
          className="rounded-3xl border border-primary/20 bg-card/70 p-6 md:p-8"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                <Target className="h-3.5 w-3.5" /> PROSPECÇÃO ORIENTA+
              </div>
              <h2 className="text-2xl font-bold md:text-3xl">Fluxo vendedor</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                Escolha o roteiro conforme o contato: novos empreendedores ou pessoas que já
                demonstraram interesse no programa.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-border bg-background/60 px-3 py-2 text-xs text-muted-foreground">
              <MessageCircle className="h-4 w-4 text-primary" /> 2 roteiros disponíveis
            </div>
          </div>
        </div>

        <section
          className="mt-7 rounded-2xl border border-primary/30 bg-primary/5 p-5"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                <Target className="h-3.5 w-3.5" /> Para quem já conhece o programa
              </div>
              <h3 className="mt-1 text-lg font-bold">Retomada de interesse</h3>
            </div>
            <button
              onClick={() => copyStep(-1, INTERESTED_FLOW)}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-primary/30 bg-background/70 px-3 py-1.5 text-xs font-bold transition hover:border-primary hover:text-primary"
            >
              {copied === -1 ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied === -1 ? "Copiado" : "Copiar mensagem"}
            </button>
          </div>
          <p className="mt-4 whitespace-pre-line rounded-xl border border-primary/15 bg-background/50 p-4 text-sm leading-6 text-foreground/90">
            {INTERESTED_FLOW}
          </p>
        </section>

        <div className="mt-7">
          <div className="mb-4 flex items-center gap-2 text-sm font-bold">
            <MessageCircle className="h-4 w-4 text-primary" /> Para novos contatos
          </div>
          <div className="space-y-4">
            {STEPS.map((step, index) => (
              <section
                key={step.title}
                className="relative rounded-2xl border border-border bg-card/65 p-5 backdrop-blur"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                {index < STEPS.length - 1 && (
                  <div className="absolute left-8 top-full z-0 h-4 border-l border-dashed border-primary/35" />
                )}
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="font-bold">{step.title}</h3>
                      <button
                        onClick={() => copyStep(index, step.text)}
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-background/60 px-3 py-1.5 text-xs font-bold transition hover:border-primary hover:text-primary"
                      >
                        {copied === index ? (
                          <Check className="h-3.5 w-3.5" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                        {copied === index ? "Copiado" : "Copiar mensagem"}
                      </button>
                    </div>
                    <p className="mt-4 whitespace-pre-line rounded-xl border border-border/60 bg-background/45 p-4 text-sm leading-6 text-foreground/90">
                      {step.text}
                    </p>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-5 text-sm md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-primary" />
            <span>
              <strong>Objetivo final:</strong> agendar o diagnóstico gratuito com o empreendedor.
            </span>
          </div>
          <div className="inline-flex items-center gap-1 text-xs font-bold text-primary">
            <Clipboard className="h-3.5 w-3.5" /> Personalize os campos entre colchetes{" "}
            <ChevronRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>
    </CrmShell>
  );
}
