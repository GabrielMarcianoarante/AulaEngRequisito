"use client";
import { useState } from "react";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { PROJECT_NAME } from "@/lib/config";
import { Profiles } from "./Profiles";
import { Words, Win, AttentionRing, CountUp, Frame, Label, Reveal, ResearchButton } from "./ui";
import { DUR, EASE, useReducedMotion } from "@/lib/motion";
import { Badge3D, PixelLogo, Chevrons, Flashlight, HeartG, PixelFace, type StickerKind } from "./Art";

const h2 = "font-display font-semibold tracking-[-0.03em]";

/* ───────── Problema: notas sob o feixe da lanterna ───────── */
const problemNotes = [
  { t: "Boletins impressos", d: "Em alguns contextos, o desempenho chega à família em datas fixas e em papel.", r: -1.5 },
  { t: "Contato direto", d: "Tirar uma dúvida pode exigir ir até a escola, nem sempre possível na rotina de todos.", r: 1.2 },
  { t: "Acesso demorado", d: "Com informações dispersas, acompanhar a evolução do estudante leva tempo.", r: -1 },
  { t: "Uma hipótese, não uma regra", d: "Cada escola funciona de um jeito. É isso que a pesquisa quer entender.", r: 1.6 },
];

function PinNote({ n, i, on }: { n: (typeof problemNotes)[number]; i: number; on: boolean }) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      style={{ zIndex: 10 + i }}
      initial={{ opacity: 0, y: reduce ? 0 : 24, rotate: n.r }}
      animate={on ? { opacity: 1, y: 0, rotate: n.r } : {}}
      transition={{ duration: 0.7, delay: reduce ? 0 : 1.7 + i * 0.22, ease: EASE }}
      whileHover={{ rotate: 0, y: -6, zIndex: 30 }}
      className="relative border-2 border-ink bg-sand text-ink shadow-[6px_6px_0_#88c070] lg:-ml-6 lg:first:ml-0 lg:even:translate-y-12"
    >
      <div aria-hidden className="flex items-center gap-1.5 border-b-2 border-ink bg-leaf px-3 py-1.5"><span className="size-3 rounded-full border-2 border-ink bg-sand" /><span className="size-3 rounded-full border-2 border-ink bg-sand" /><span className="mx-auto pr-8 font-pixel text-xs">{["boletim", "contato", "acesso", "hipotese"][i]}.txt</span></div>
      <div className="p-5"><h3 className="font-display text-xl font-bold leading-tight">{n.t}</h3><p className="mt-3 text-sm leading-relaxed text-ink/80">{n.d}</p></div>
    </motion.article>
  );
}

export function Problem() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { once: true, amount: 0.1 });
  const lit = (d: number) => ({ initial: { opacity: 0 }, animate: on ? { opacity: 1 } : {}, transition: { duration: reduce ? 0 : 0.9, delay: reduce ? 0 : d } });
  return (
    <section id="visao-geral" className="relative isolate overflow-hidden bg-ink pt-24 text-white sm:pt-32">
      <div aria-hidden className="grid-dark absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]" />
      <div className="wrap">
        <Reveal className="max-w-5xl">
          <Label>O problema</Label>
          <h2 className={`${h2} mt-5 text-[clamp(2rem,5vw,4rem)] leading-[0.95]`}><Words text="Acompanhar a vida escolar nem sempre é simples" /></h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">Tratamos isso como uma pergunta a ser investigada, não como uma conclusão. Não sabemos como cada escola pública funciona, e a pesquisa existe para descobrir.</p>
        </Reveal>

        <div ref={ref} className="relative mt-20 lg:mt-28">
          {/* palavra gigante atrás: só aparece quando a luz chega, e as notas ficam por cima dela */}
          <motion.p aria-hidden {...lit(1.3)} className="pointer-events-none absolute inset-x-0 -top-16 select-none text-center font-display text-[clamp(6rem,27vw,25rem)] font-semibold leading-none tracking-[-0.035em] text-transparent [-webkit-text-stroke:2px_rgba(245,184,46,.4)]">dúvidas</motion.p>
          <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {problemNotes.map((n, i) => <PinNote key={n.t} n={n} i={i} on={on} />)}
          </div>
        </div>
      </div>

      <div className="relative mt-24 h-60 sm:mt-32 sm:h-72">
        <motion.div aria-hidden initial={{ opacity: 0, scaleY: 0 }} animate={on ? { opacity: reduce ? 1 : [0, 1, 0.7, 1], scaleY: 1 } : {}} transition={{ duration: 1.4, delay: reduce ? 0 : 0.9, ease: EASE }} style={{ transformOrigin: "50% 100%" }} className="absolute bottom-[calc(100%-1.1rem)] left-1/2 -z-10 h-[75rem] w-[min(120vw,70rem)] -translate-x-1/2 bg-[linear-gradient(to_top,rgba(255,244,190,.42),rgba(255,244,190,.07)_55%,transparent)] [clip-path:polygon(47%_100%,53%_100%,100%_0,0_0)]" />
        <Chevrons on={on} layer="bg" className="absolute inset-x-0 bottom-0 z-0 h-28 w-full sm:h-36" />
        <Flashlight on={on} className="absolute bottom-0 left-1/2 z-10 h-full -translate-x-1/2" />
        <Chevrons on={on} layer="text" className="absolute inset-x-0 bottom-0 z-20 h-28 w-full sm:h-36" />
      </div>
    </section>
  );
}

/* ───────── Proposta e funcionalidades por perfil ───────── */
const profiles: { kind: StickerKind; t: string; d: string }[] = [
  { kind: "cap", t: "Alunos e responsáveis", d: "Consulta facilitada de desempenho, frequência e atividades." },
  { kind: "pencil", t: "Professores", d: "Organização de informações acadêmicas e apoio ao acompanhamento pedagógico." },
  { kind: "bubble", t: "Coordenação", d: "Apoio à organização de horários, comunicados e rotinas escolares." },
  { kind: "check", t: "Sala de recursos e apoio educacional", d: "Organização de atividades adaptadas e acompanhamento individualizado." },
];

const stag = { hidden: {}, show: { transition: { staggerChildren: 0.14 } } };
const rise = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } } };

export function Proposal() {
  return (
    <section id="funcionalidades" className="on-orange grid-orange relative isolate overflow-hidden bg-sand py-24 text-black sm:py-32">
      <div className="wrap grid gap-14 lg:grid-cols-[5fr_7fr] lg:gap-12">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <Label tone="orange">a proposta</Label>
          <h2 className={`${h2} mt-5 text-[clamp(1.9rem,3.6vw,3rem)] leading-[0.95]`}>
            <span>Reunir informações</span> <span className="text-black">e facilitar a conversa entre todos</span>
          </h2>
          <p className="mt-6 max-w-md text-base font-medium leading-relaxed text-black/80">A ideia é concentrar o que hoje fica espalhado e dar a cada pessoa da comunidade escolar o que ela precisa ver. Tudo abaixo é proposta: nenhuma dessas funcionalidades existe ainda.</p>
          <Badge3D kind="check" tone="orange" blur float className="mt-10 hidden w-20 lg:block" />
        </Reveal>

        <motion.ul variants={stag} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="relative rounded-tl-[2.5rem] bg-ink px-5 text-white shadow-[0_40px_60px_-30px_rgba(0,0,0,.6)] sm:rounded-tl-[4.5rem] sm:px-10">
          {profiles.map((p, i) => (
            <motion.li key={p.t} variants={rise} className="group grid grid-cols-[4.5rem_1fr] items-center gap-5 border-b border-white/12 py-7 last:border-b-0 sm:grid-cols-[6.5rem_1fr] sm:gap-8 sm:py-9">
              <div className="border-2 border-sand bg-leaf p-1.5 shadow-[4px_4px_0_#dff3c8] transition-transform group-hover:-translate-y-1"><PixelFace kind={p.kind} i={i} className="w-full" /></div>
              <div className="min-w-0">
                <h3 className="mt-1 font-display text-xl font-bold leading-tight tracking-tight sm:text-2xl">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65 sm:text-base">{p.d}</p>
                <span className="mt-4 inline-block border border-white/25 px-2.5 py-1 font-sans text-[10px] text-white/70">Funcionalidade proposta</span>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

/* ───────── Inclusão: diagrama de interseção ───────── */
const principles = [
  { t: "Respeito às necessidades individuais", d: "Cada estudante aprende de um jeito, e o acompanhamento precisa se adaptar às pessoas." },
  { t: "Acompanhamento pedagógico adequado", d: "Informação bem organizada ajuda equipes e famílias a trabalharem juntas." },
  { t: "Privacidade desde o início", d: "Esta página não mostra dados pessoais nem diagnósticos de estudantes, e o projeto tratará isso com cuidado." },
];

function Venn() {
  const reduce = useReducedMotion();
  const draw = { initial: { pathLength: 0 }, whileInView: { pathLength: 1 }, viewport: { once: true }, transition: { duration: 1.4, ease: "easeInOut" as const } };
  const font = { fontFamily: "var(--font-display)", fontWeight: 800 } as const;
  return (
    <svg viewBox="30 18 460 364" role="img" aria-label="Diagrama: famílias e escola se encontram no acompanhamento em conjunto" className="relative w-full">
      <defs>
        <pattern id="dotw" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><circle cx="3.5" cy="3.5" r="2" fill="#14301f" />{!reduce && <animateTransform attributeName="patternTransform" type="translate" additive="sum" from="0 0" to="0 7" dur="1.6s" repeatCount="indefinite" />}</pattern>
        <clipPath id="clipA"><circle cx="200" cy="210" r="140" /></clipPath>
      </defs>
      <motion.g clipPath="url(#clipA)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 1 }}><circle cx="320" cy="210" r="140" fill="url(#dotw)" /></motion.g>
      <motion.circle cx="200" cy="210" r="140" fill="none" stroke="#14301f" strokeWidth="2.5" {...draw} initial={{ pathLength: 0, cx: 150 }} whileInView={{ pathLength: 1, cx: 200 }} />
      <motion.circle cx="320" cy="210" r="140" fill="none" stroke="#14301f" strokeWidth="2.5" {...draw} initial={{ pathLength: 0, cx: 370 }} whileInView={{ pathLength: 1, cx: 320 }} />
      <motion.text x="120" y="216" fill="#14301f" fontSize="21" textAnchor="middle" style={font} animate={reduce ? undefined : { x: [0, 6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>Famílias</motion.text>
      <motion.text x="400" y="216" fill="#14301f" fontSize="21" textAnchor="middle" style={font} animate={reduce ? undefined : { x: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>Escola</motion.text>
      <motion.path d="M260 176 V62" stroke="#000" strokeOpacity=".75" strokeWidth="1.5" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 1.3 }} />
      <HeartG x={260} y={212} s={0.8} />
      <motion.text x="260" y="48" textAnchor="middle" fill="#000" fontSize="16" fontWeight="700" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.1, duration: 0.6 }}>acompanhamento em conjunto</motion.text>
    </svg>
  );
}

export function Inclusion() {
  return (
    <section id="inclusao" className="grain relative isolate overflow-hidden bg-ink py-24 text-white sm:py-32">
      <div aria-hidden className="absolute inset-0 -z-10 grid-dark [mask-image:radial-gradient(ellipse_at_20%_30%,#000,transparent_70%)]" />
      <div className="wrap grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
        <Reveal>
          <Label>inclusão e acessibilidade</Label>
          <h2 className={`${h2} mt-5 text-[clamp(2rem,4vw,3.2rem)] leading-[0.95]`}>
            <span className="lit-text">Uma escola para todos começa por</span> ouvir todos<span className="text-orange">.</span>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/65 sm:text-lg">Educação inclusiva é garantir que cada estudante participe, aprenda e seja acompanhado com respeito. A tecnologia só ajuda se nascer dessa escuta.</p>
          <ul className="mt-10 border-t border-white/15">
            {principles.map((p, i) => (
              <li key={p.t} className="grid grid-cols-1 border-b border-white/15 py-5">
                <div>
                  <h3 className="font-display text-lg font-bold tracking-tight">{p.t}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/60">{p.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="relative mx-auto grid aspect-square w-full max-w-[34rem] place-items-center">
          <div aria-hidden className="absolute inset-0 rounded-full bg-sand " />
          <div aria-hidden className="absolute inset-0 rounded-full opacity-0 [background-image:radial-gradient(rgba(0,0,0,.7)_1px,transparent_1.4px)] [background-size:6px_6px]" />
          <div className="relative w-[96%]"><Venn /></div>
        </div>
      </div>
    </section>
  );
}

/* ───────── Demonstração visual (dados fictícios) ───────── */
type View = { label: string; title: string; stats: [string, string][]; bars: [string, number][]; list: string[] };
const views: Record<"responsavel" | "professor", View> = {
  responsavel: {
    label: "Responsável",
    title: "Painel do responsável (exemplo)",
    stats: [["Média", "8,1"], ["Frequência", "94%"], ["Atividades pendentes", "2"]],
    bars: [["Matemática", 82], ["Português", 90], ["Ciências", 76]],
    list: ["Reunião de pais na próxima semana", "Trabalho de ciências até sexta-feira"],
  },
  professor: {
    label: "Professor",
    title: "Painel da turma (exemplo)",
    stats: [["Entregas", "18/25"], ["Frequência da turma", "92%"], ["Planos da semana", "3"]],
    bars: [["Leitura em dia", 72], ["Exercícios entregues", 68], ["Participação", 85]],
    list: ["Rever o plano de aula de matemática", "Registrar o acompanhamento pedagógico da semana"],
  },
};

export function Demo() {
  const [tab, setTab] = useState<keyof typeof views>("responsavel");
  const v = views[tab];
  return (
    <section className="relative isolate overflow-hidden bg-coal py-24 text-white sm:py-32">
      <div aria-hidden className="absolute inset-0 -z-10 grid-dark [mask-image:radial-gradient(ellipse_at_50%_20%,#000,transparent_75%)]" />
      <Badge3D kind="bubble" blur float className="absolute -right-4 top-10 hidden w-24 sm:block lg:right-[8%] lg:w-28" />
      <div className="wrap">
        <Reveal className="max-w-3xl">
          <Label>prévia</Label>
          <h2 className={`${h2} mt-5 text-[clamp(2rem,4.2vw,3.4rem)] leading-[0.95]`}>
            Uma prévia de <span className="lit-text">como poderia funcionar</span><span className="text-orange">.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">Telas de exemplo com dados inventados, só para você visualizar a ideia. Não existe sistema por trás delas.</p>
        </Reveal>

        <div className="mt-10 flex w-full max-w-sm border border-white/20 p-1" role="tablist" aria-label="Perfil da demonstração">
          {(Object.keys(views) as (keyof typeof views)[]).map((k) => (
            <button key={k} role="tab" id={`tab-${k}`} aria-selected={tab === k} aria-controls="demo-panel" onClick={() => setTab(k)}
              className={`relative isolate min-h-11 flex-1 px-5 py-2 font-sans text-xs font-semibold transition-colors ${tab === k ? "text-black" : "text-white/65 hover:text-white"}`}>
              {tab === k && <motion.span layoutId="tab-pill" className="absolute inset-0 -z-10 bg-orange" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
              {views[k].label}
            </button>
          ))}
        </div>

        <Frame className="mt-8 p-3 sm:p-6">
          <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: DUR.base, ease: EASE }} id="demo-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="overflow-hidden border border-white/12 bg-ink">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-4 py-3 sm:px-6">
              <span className="font-display text-base font-bold tracking-tight sm:text-lg">{v.title}</span>
              <span className="font-sans text-[10px] text-orange">dados fictícios</span>
            </div>
            <dl className="grid grid-cols-3 divide-x divide-white/10 border-b border-white/10">
              {v.stats.map(([k, val]) => (
                <div key={k} className="min-w-0 px-2 py-5 text-center sm:px-4 sm:py-7">
                  <dd className="font-display text-[clamp(1.6rem,6.5vw,3.6rem)] font-semibold leading-none tracking-[-0.04em]"><CountUp key={`${tab}-${k}`} text={val} /></dd>
                  <dt className="mt-2 text-[11px] leading-tight text-white/55 sm:text-xs">{k}</dt>
                </div>
              ))}
            </dl>
            <div className="grid gap-8 p-5 sm:p-8 md:grid-cols-2 md:gap-12">
              <ul key={tab} className="space-y-5">
                {v.bars.map(([n, pct]) => (
                  <li key={n}>
                    <div className="flex justify-between gap-3 text-sm"><span>{n}</span><span className="font-sans font-semibold">{pct}%</span></div>
                    <div className="mt-2 h-2.5 bg-white/10" role="img" aria-label={`${n}: ${pct}% (valor fictício)`}>
                      <motion.div className="h-full bg-orange" initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.7, ease: "easeOut" }} />
                    </div>
                  </li>
                ))}
              </ul>
              <div>
                <p className="font-sans text-xs text-white/50">Comunicados</p>
                <ul className="mt-3 divide-y divide-white/10 border-t border-white/10 text-sm text-white/80">
                  {v.list.map((l) => <li key={l} className="py-3.5">{l}</li>)}
                </ul>
              </div>
            </div>
          </motion.div>
        </Frame>
      </div>
    </section>
  );
}

/* ───────── Pesquisa ───────── */
export function Research() {
  return (
    <section id="pesquisa" className="on-orange grid-orange relative isolate overflow-hidden bg-sand py-24 text-black sm:py-32">
      <div className="wrap">
        <Frame tone="orange" className="px-5 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <Badge3D kind="bubble" tone="orange" blur float className="absolute right-8 top-10 hidden w-24 md:block lg:right-16 lg:w-32" />
          <Reveal>
            <Label tone="orange">pesquisa</Label>
            <h2 className={`${h2} mt-5 max-w-4xl text-[clamp(2rem,5vw,4rem)] leading-[0.92]`}>
              <span>Sua experiência</span> <span className="text-black">vai orientar o projeto</span>
            </h2>
          </Reveal>
          <p className="mt-8 max-w-xl text-base font-medium leading-relaxed text-black/85 sm:text-lg">Queremos entender necessidades, dificuldades e possíveis melhorias no acompanhamento escolar. Responder leva poucos minutos.</p>
          <Profiles />
        </Frame>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="grain relative isolate overflow-hidden bg-ink pt-24 text-white sm:pt-32">
      <div className="wrap">
        <Reveal>
          <h2 className="font-display font-semibold">
            <span className="ghost-text block text-[clamp(1.4rem,3.6vw,2.8rem)] leading-[1.02] tracking-[-0.03em]">Quanto mais vozes,</span>
            <span className="block text-[clamp(2.2rem,7vw,5.5rem)] leading-[0.9] tracking-[-0.035em] text-balance">melhor a proposta<span className="text-orange">.</span></span>
          </h2>
          <div className="mt-8 grid items-end gap-8 sm:mt-10 md:grid-cols-[1fr_auto]">
            <p className="max-w-lg text-base leading-relaxed text-white/65 sm:text-lg">Famílias, estudantes, professores e equipes escolares: cada resposta ajuda a decidir o que vale construir.</p>
            <ResearchButton className="w-full md:w-auto">Contribuir com a pesquisa</ResearchButton>
          </div>
        </Reveal>
      </div>
      <Chevrons className="mt-20 h-24 w-full sm:mt-28 sm:h-32" />
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-ink text-white/70">
      <div className="wrap py-14 sm:py-16">
        <div>
          <div className="flex items-center gap-3">
            <span className="block size-11 shrink-0 border-2 border-sand bg-leaf p-1"><PixelLogo className="size-full" /></span>
            <span aria-hidden className="h-7 w-px bg-white/25" />
            <p className="font-display text-2xl font-bold tracking-tight text-white">{PROJECT_NAME}</p>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed">Projeto de extensão universitária. Iniciativa acadêmica em desenvolvimento; ainda não é um sistema em funcionamento.</p>
        </div>
      </div>
      <p aria-hidden className="pointer-events-none -mb-[0.12em] select-none whitespace-nowrap text-center font-display text-[clamp(2rem,10.6vw,10rem)] font-semibold leading-none tracking-[-0.05em] text-white/[0.05]">{PROJECT_NAME}</p>
      <p className="relative border-t border-white/15 py-5 text-center font-sans text-[11px]">© {new Date().getFullYear()} {PROJECT_NAME}. Projeto acadêmico.</p>
    </footer>
  );
}
