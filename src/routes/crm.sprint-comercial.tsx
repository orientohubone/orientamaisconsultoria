import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { CrmShell } from "@/components/crm/CrmShell";
import { SprintComercial } from "@/components/crm/SprintComercial";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/crm/sprint-comercial")({
  head: () => ({ meta: [{ title: "Sprint Comercial — Orientamais" }] }),
  component: SprintComercialPage,
});

function SprintComercialPage() {
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
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Carregando...</div>;
  }

  return (
    <CrmShell title="Sprint Comercial" subtitle="A operação que conecta Orienta+ e OrientoHub.">
      <SprintComercial />
    </CrmShell>
  );
}
