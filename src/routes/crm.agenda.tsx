import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { AgendaDiagnosticos } from "@/components/crm/AgendaDiagnosticos";
import { CrmShell } from "@/components/crm/CrmShell";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/crm/agenda")({
  head: () => ({ meta: [{ title: "Agenda — Orientamais" }] }),
  component: AgendaPage,
});

function AgendaPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate({ to: "/login" });
        return;
      }
      setReady(true);
    });
  }, [navigate]);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Carregando...
      </div>
    );
  }

  return (
    <CrmShell
      title="Agenda de diagnósticos"
      subtitle="Acompanhe os empreendedores que entraram no Orienta+."
    >
      <div className="mx-auto max-w-5xl px-6 py-8">
        <AgendaDiagnosticos />
      </div>
    </CrmShell>
  );
}
