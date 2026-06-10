import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./client-CQo1km_T.mjs";
import { l as logoUrl } from "./logo orientamais-BvCW8YDi.mjs";
import { A as ArrowRight } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/@supabase/functions-js.mjs";
function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = reactExports.useState("signin");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [msg, setMsg] = reactExports.useState(null);
  const [err, setErr] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate({
        to: "/crm"
      });
    });
    supabase.auth.getSession().then(({
      data
    }) => {
      if (data.session) navigate({
        to: "/crm"
      });
    });
    return () => subscription.unsubscribe();
  }, [navigate]);
  async function handleSubmit(e) {
    e.preventDefault();
    setErr(null);
    setMsg(null);
    setLoading(true);
    if (mode === "signin") {
      const {
        error
      } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) setErr(error.message);
    } else {
      const {
        error
      } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/crm`
        }
      });
      if (error) setErr(error.message);
      else setMsg("Conta criada! Verifique seu e-mail para confirmar e depois faça login.");
    }
    setLoading(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center px-6", style: {
    background: "var(--gradient-hero)"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md rounded-3xl border border-primary/30 bg-card/80 backdrop-blur p-8", style: {
    boxShadow: "var(--shadow-glow)"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "text-xs uppercase tracking-widest text-muted-foreground hover:text-primary", children: "← voltar" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logoUrl, alt: "Orientamais", className: "mt-4 h-10 w-auto" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 text-3xl font-bold", children: mode === "signin" ? "Entrar no painel" : "Criar conta" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Acesso restrito à equipe Orientamais." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "mt-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "E-mail" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "email", value: email, onChange: (e) => setEmail(e.target.value), spellCheck: false, autoCapitalize: "off", autoCorrect: "off", className: "mt-1 w-full rounded-lg bg-input border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Senha" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "password", minLength: 6, value: password, onChange: (e) => setPassword(e.target.value), spellCheck: false, autoCapitalize: "off", autoCorrect: "off", className: "mt-1 w-full rounded-lg bg-input border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none" })
      ] }),
      err && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: err }),
      msg && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary", children: msg }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: loading, type: "submit", className: "w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground font-bold py-3 hover:opacity-90 transition disabled:opacity-60", children: loading ? "Aguarde..." : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        mode === "signin" ? "Entrar" : "Criar conta",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
      setMode(mode === "signin" ? "signup" : "signin");
      setErr(null);
      setMsg(null);
    }, className: "mt-6 w-full text-xs text-muted-foreground hover:text-primary uppercase tracking-widest", children: mode === "signin" ? "Não tem conta? Criar conta" : "Já tem conta? Entrar" })
  ] }) });
}
export {
  LoginPage as component
};
