import { createFileRoute } from "@tanstack/react-router";
import { Target, Megaphone, Users, TrendingUp, PieChart, ClipboardCheck, Search, Lightbulb, Rocket, BarChart3, ArrowRight, CheckCircle2, Crosshair, ChevronRight } from "lucide-react";
import { useState } from "react";
import fernandoAsset from "@/assets/fernando.jpeg.asset.json";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OrientoHub — Orientação Gratuita para Empreendedores" },
      { name: "description", content: "Sessão de orientação gratuita: clareza, estratégia e direção para o seu negócio crescer com método. Garanta sua vaga." },
      { property: "og:title", content: "OrientoHub — Orientação Gratuita para Empreendedores" },
      { property: "og:description", content: "Sessão de orientação gratuita: clareza, estratégia e direção para o seu negócio crescer." },
    ],
  }),
  component: Index,
});

const solucoes = [
  { icon: Crosshair, title: "Posicionamento", desc: "Clareza sobre quem você é, o que faz e para quem faz." },
  { icon: Megaphone, title: "Marketing e Comunicação", desc: "Mensagem certa para atrair, conectar e converter." },
  { icon: Users, title: "Gestão e Processos", desc: "Organização que aumenta produtividade e reduz perdas." },
  { icon: TrendingUp, title: "Vendas e Resultados", desc: "Estratégias para vender mais, com previsibilidade." },
  { icon: PieChart, title: "Análise e Planejamento", desc: "Decisões baseadas em dados e visão de futuro." },
];

const etapas = [
  { n: "1", icon: ClipboardCheck, title: "Diagnóstico", desc: "Entendemos seu negócio e os desafios reais." },
  { n: "2", icon: Search, title: "Análise", desc: "Mergulho profundo para encontrar oportunidades." },
  { n: "3", icon: Lightbulb, title: "Estratégia", desc: "Plano personalizado com ações claras e objetivas." },
  { n: "4", icon: Rocket, title: "Execução", desc: "Implementação com orientação prática." },
  { n: "5", icon: BarChart3, title: "Resultados", desc: "Acompanhamento para garantir crescimento." },
];

function Logo() {
  return (
    <div className="flex flex-col leading-none">
      <div className="text-2xl font-bold tracking-tight">
        oriento<span className="text-primary">hub</span>
      </div>
      <div className="text-[0.6rem] tracking-[0.3em] text-muted-foreground mt-1">SOLUÇÕES EMPRESARIAIS</div>
    </div>
  );
}

function Index() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    nome: "",
    whatsapp: "",
    tipo_negocio: "",
    cnpj: "",
    desafios_reais: "",
    objetivos_organizacionais: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: dbError } = await supabase.from("leads").insert({
      nome: form.nome.trim(),
      whatsapp: form.whatsapp.trim(),
      tipo_negocio: form.tipo_negocio.trim() || null,
      cnpj: form.cnpj.trim() || null,
      desafios_reais: form.desafios_reais.trim() || null,
      objetivos_organizacionais: form.objetivos_organizacionais.trim() || null,
    });
    setLoading(false);
    if (dbError) {
      setError("Não foi possível enviar agora. Tente novamente.");
      return;
    }
    setSent(true);
  }

  return (
    <div className="min-h-screen text-foreground" style={{ background: "var(--gradient-hero)" }}>
      {/* NAV */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-3">
          <Link to="/crm" className="hidden sm:inline-flex text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-primary transition">
            Painel
          </Link>
          <a href="#agendar" className="hidden sm:inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition">
            Quero minha vaga <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-8 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-6 uppercase tracking-widest">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" /> Orientação 100% Gratuita
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight">
            ORIENTAÇÃO<br />
            QUE GERA CLAREZA.<br />
            <span className="text-primary">DECISÃO QUE<br />GERA RESULTADO.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl uppercase tracking-wide font-medium">
            Soluções práticas para empreendedores que querem{" "}
            <span className="text-primary">crescer com estratégia.</span>
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#agendar" className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground hover:opacity-90 transition" style={{ boxShadow: "var(--shadow-glow)" }}>
              Agendar orientação gratuita <ArrowRight className="h-5 w-5" />
            </a>
            <a href="#solucoes" className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 font-semibold hover:bg-secondary transition">
              Ver soluções
            </a>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
            {[
              { label: "FOCO", desc: "no que realmente gera resultado." },
              { label: "ESTRATÉGIA", desc: "para competir e se posicionar." },
              { label: "CRESCIMENTO", desc: "com direção, métrica e ação." },
            ].map((p) => (
              <div key={p.label} className="border-l-2 border-primary pl-3">
                <div className="text-primary text-xs font-bold tracking-wider">{p.label}</div>
                <div className="text-xs text-muted-foreground mt-1 leading-snug">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full" />
          <div className="relative rounded-3xl overflow-hidden border border-primary/30" style={{ boxShadow: "var(--shadow-card)" }}>
            <img src={fernandoAsset.url} alt="Fernando Ramalho — Consultor OrientoHub" className="w-full h-auto object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="text-xs uppercase tracking-widest text-primary font-bold">Seu consultor</div>
              <div className="text-2xl font-bold mt-1">Fernando Ramalho</div>
              <div className="text-sm text-muted-foreground">Especialista em estratégia para pequenos negócios</div>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUÇÕES */}
      <section id="solucoes" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <div className="inline-block border border-primary/40 rounded-full px-5 py-1.5 text-xs font-bold tracking-widest text-primary uppercase">
            Soluções que transformam negócios
          </div>
          <h2 className="mt-6 text-4xl md:text-5xl font-bold">O que você vai destravar na sessão</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {solucoes.map((s) => (
            <div key={s.title} className="group rounded-2xl border border-border bg-card backdrop-blur-sm p-6 hover:border-primary/60 transition" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition">
                <s.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold tracking-wide uppercase">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <div className="inline-block text-primary text-xs font-bold tracking-widest uppercase border-y border-primary py-1.5 px-6">
            Como funciona
          </div>
          <h2 className="mt-6 text-4xl md:text-5xl font-bold">5 passos até o seu próximo nível</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {etapas.map((e, i) => (
            <div key={e.n} className="relative text-center">
              <div className="relative mx-auto h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-black text-xl" style={{ boxShadow: "var(--shadow-glow)" }}>
                {e.n}
              </div>
              <e.icon className="h-7 w-7 text-primary mx-auto mt-4" />
              <h3 className="mt-3 font-bold uppercase tracking-wide text-sm">{e.title}</h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{e.desc}</p>
              {i < etapas.length - 1 && (
                <ChevronRight className="hidden md:block absolute top-5 -right-5 h-6 w-6 text-primary/60" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA FORM */}
      <section id="agendar" className="max-w-5xl mx-auto px-6 py-20">
        <div className="rounded-3xl border-2 border-primary/40 p-8 md:p-12 relative overflow-hidden" style={{ background: "linear-gradient(135deg, oklch(0.22 0.05 155 / 0.8), oklch(0.15 0.04 155 / 0.8))", boxShadow: "var(--shadow-glow)" }}>
          <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold uppercase">
                Empreendedor, você não precisa{" "}
                <span className="text-primary">fazer tudo sozinho.</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Você precisa de direção, estratégia e alguém ao seu lado para te ajudar a{" "}
                <span className="text-primary font-semibold">chegar lá.</span>
              </p>
              <ul className="mt-6 space-y-3">
                {["Sessão 100% gratuita e sem compromisso", "Diagnóstico personalizado do seu negócio", "Plano de ação prático para os próximos passos"].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" /> {t}
                  </li>
                ))}
              </ul>
            </div>

            {sent ? (
              <div className="rounded-2xl bg-primary/15 border border-primary/40 p-8 text-center">
                <CheckCircle2 className="h-12 w-12 text-primary mx-auto" />
                <h3 className="mt-4 text-2xl font-bold">Vaga reservada!</h3>
                <p className="mt-2 text-muted-foreground text-sm">Em breve entraremos em contato para agendar sua orientação gratuita.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl bg-background/60 backdrop-blur border border-border p-6 space-y-4"
              >
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Nome</label>
                  <input required value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} className="mt-1 w-full rounded-lg bg-input border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none" placeholder="Seu nome" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">WhatsApp</label>
                  <input required type="tel" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} className="mt-1 w-full rounded-lg bg-input border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none" placeholder="(00) 00000-0000" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Seu negócio</label>
                    <input value={form.tipo_negocio} onChange={(e) => setForm({ ...form, tipo_negocio: e.target.value })} className="mt-1 w-full rounded-lg bg-input border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none" placeholder="O que você faz?" />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">CNPJ</label>
                    <input value={form.cnpj} onChange={(e) => setForm({ ...form, cnpj: e.target.value })} className="mt-1 w-full rounded-lg bg-input border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none" placeholder="Opcional" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Desafios reais</label>
                  <textarea rows={2} value={form.desafios_reais} onChange={(e) => setForm({ ...form, desafios_reais: e.target.value })} className="mt-1 w-full rounded-lg bg-input border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none resize-none" placeholder="O que mais te trava hoje?" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Objetivos</label>
                  <textarea rows={2} value={form.objetivos_organizacionais} onChange={(e) => setForm({ ...form, objetivos_organizacionais: e.target.value })} className="mt-1 w-full rounded-lg bg-input border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none resize-none" placeholder="Onde você quer chegar?" />
                </div>
                {error && <p className="text-xs text-destructive">{error}</p>}
                <button disabled={loading} type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground font-bold py-3.5 hover:opacity-90 transition disabled:opacity-60">
                  {loading ? "Enviando..." : <>Garantir minha vaga <ArrowRight className="h-5 w-5" /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-border/40 mt-10">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo />
          <div className="text-xs text-muted-foreground">© {new Date().getFullYear()} OrientoHub. Todos os direitos reservados.</div>
        </div>
      </footer>
    </div>
  );
}
