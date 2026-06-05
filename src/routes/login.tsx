import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight } from "lucide-react";
import logoUrl from "@/assets/logo orientamais.png";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Entrar — Orientamais CRM" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate({ to: "/crm" });
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/crm" });
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null); setMsg(null); setLoading(true);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setErr(error.message);
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/crm` },
      });
      if (error) setErr(error.message);
      else setMsg("Conta criada! Verifique seu e-mail para confirmar e depois faça login.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: "var(--gradient-hero)" }}>
      <div className="w-full max-w-md rounded-3xl border border-primary/30 bg-card/80 backdrop-blur p-8" style={{ boxShadow: "var(--shadow-glow)" }}>
        <Link to="/" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-primary">← voltar</Link>
        <img src={logoUrl} alt="Orientamais" className="mt-4 h-10 w-auto" />
        <h1 className="mt-4 text-3xl font-bold">
          {mode === "signin" ? "Entrar no painel" : "Criar conta"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Acesso restrito à equipe Orientamais.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">E-mail</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              className="mt-1 w-full rounded-lg bg-input border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Senha</label>
            <input required type="password" minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              className="mt-1 w-full rounded-lg bg-input border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none" />
          </div>
          {err && <p className="text-xs text-destructive">{err}</p>}
          {msg && <p className="text-xs text-primary">{msg}</p>}
          <button disabled={loading} type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground font-bold py-3 hover:opacity-90 transition disabled:opacity-60">
            {loading ? "Aguarde..." : <>{mode === "signin" ? "Entrar" : "Criar conta"} <ArrowRight className="h-4 w-4" /></>}
          </button>
        </form>

        <button onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setErr(null); setMsg(null); }}
          className="mt-6 w-full text-xs text-muted-foreground hover:text-primary uppercase tracking-widest">
          {mode === "signin" ? "Não tem conta? Criar conta" : "Já tem conta? Entrar"}
        </button>
      </div>
    </div>
  );
}
