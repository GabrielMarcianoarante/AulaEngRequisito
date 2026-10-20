"use client";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { TAGLINE } from "@/lib/config";
import { AnchorButton, CountUp, Frame, Label, ResearchButton } from "./ui";
import { DUR, EASE, useReducedMotion } from "@/lib/motion";
import { Badge3D, Write, type StickerKind } from "./Art";

const notes = [
  { k: "Notas", v: "8,4", s: "média de exemplo", cls: "max-sm:hidden -left-4 top-10 w-32", r: -5 },
  { k: "Frequência", v: "96%", s: "valor de exemplo", cls: "max-sm:hidden -right-4 top-28 w-32", r: 4 },
  { k: "Atividades", v: "3", s: "pendentes, de exemplo", cls: "max-sm:hidden -left-2 bottom-12 w-32", r: 3 },
  { k: "Aviso", v: "Reunião de pais", s: "texto fictício", cls: "max-sm:hidden -right-2 bottom-4 w-36", r: -4 },
];
const badges: { kind: StickerKind; cls: string; r: number; tone?: "orange" | "graphite"; blur?: boolean }[] = [
  { kind: "bubble", cls: "max-sm:hidden -top-12 right-2 w-20 sm:right-6 sm:w-28", r: 10 },
  { kind: "check", cls: "max-sm:hidden -top-8 left-[26%] w-14 sm:w-16", r: -12, tone: "graphite", blur: true },
];

function Pop({ r, d, className, children, depth = 0 }: { r: number; d: number; className: string; children: React.ReactNode; depth?: number }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, reduce ? 0 : -depth]);
  return (
    <motion.div
      style={{ y }}
      className={`absolute z-10 ${className}`}
      initial={{ opacity: 0, scale: reduce ? 1 : 0.7, rotate: reduce ? r : r - 12 }}
      animate={{ opacity: 1, scale: 1, rotate: r }}
      transition={{ delay: d, type: "spring", stiffness: 140, damping: 14 }}
    >
      {children}
    </motion.div>
  );
}

function NoteCard({ n }: { n: (typeof notes)[number] }) {
  return (
    <div className="relative bg-white p-4 text-black border-2 border-ink shadow-[4px_4px_0_#88c070]">
      <p className="font-sans text-[10px] text-black/60">{n.k}</p>
      <p className="mt-2 font-display text-3xl font-semibold leading-none tracking-tight"><CountUp text={n.v} delay={0.9} /></p>
      <p className="mt-2 text-xs text-black/60">{n.s}</p>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 18 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18 });
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const b = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - b.left) / b.width - 0.5) * 8);
    rx.set(-((e.clientY - b.top) / b.height - 0.5) * 8);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };
  const fade = (d: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DUR.base, delay: d, ease: EASE },
  });
  const line = (d: number) => ({
    initial: { y: reduce ? 0 : "105%" },
    animate: { y: 0 },
    transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section id="topo" className="grain relative isolate overflow-hidden bg-ink pb-20 pt-24 text-white sm:pb-28 sm:pt-32">
      <div aria-hidden className="absolute inset-0 -z-10 grid-dark [mask-image:radial-gradient(ellipse_at_50%_28%,#000_15%,transparent_72%)]" />

      <div className="wrap">
        <motion.div {...fade(0)} className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <Label>{TAGLINE}</Label>
        </motion.div>

        <Frame className="mt-8 px-5 py-10 sm:mt-10 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          <h1 className="font-display font-semibold">
            <span className="block overflow-hidden pb-[0.1em]">
              <motion.span className="ghost-text block text-[clamp(1.3rem,3.4vw,2.6rem)] leading-[1.02] tracking-[-0.03em] text-balance" {...line(0)}>Uma escola mais conectada,</motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span className="block text-[clamp(2.2rem,8.4vw,6rem)] leading-[0.9] tracking-[-0.035em]" {...line(0.12)}>transparente</motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span className="block text-[clamp(2.2rem,8.4vw,6rem)] leading-[0.9] tracking-[-0.035em]" {...line(0.22)}>e inclusiva<span className="text-orange">.</span></motion.span>
            </span>
          </h1>
          <div className="pointer-events-none absolute -bottom-9 right-3 -rotate-3 sm:-bottom-10 sm:right-10"><Write text="vamos ouvir você" size={44} delay={1.3} /></div>
        </Frame>

        <div className="mt-14 grid items-center gap-16 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <motion.p {...fade(0.35)} className="max-w-md text-base leading-relaxed text-white/65 sm:text-lg">
              Estamos propondo uma plataforma que reúna notas, frequência, atividades e avisos, e aproxime famílias, professores e coordenação. Antes de construí-la, queremos ouvir quem vive a escola.
            </motion.p>
            <motion.div {...fade(0.45)} className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <ResearchButton>Contribuir com a pesquisa</ResearchButton>
              <AnchorButton href="#visao-geral">Conhecer o projeto</AnchorButton>
            </motion.div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:col-span-7 xl:max-w-[42rem] lg:py-10">
            {badges.map((b, i) => (
              <Pop key={b.kind} r={b.r} d={0.5 + i * 0.1} depth={30 + i * 20} className={b.cls}><Badge3D kind={b.kind} tone={b.tone} blur={b.blur} float={b.kind === "bubble"} /></Pop>
            ))}
            <motion.div onPointerMove={onMove} onPointerLeave={onLeave} style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }} className="relative mx-auto max-w-md overflow-hidden border-2 border-sand bg-coal shadow-[8px_8px_0_#88c070]">
              <div className="flex items-center justify-between border-b-2 border-sand bg-leaf px-4 py-2 text-ink" aria-hidden>
                <span className="flex gap-1.5"><span className="size-3 rounded-full border-2 border-ink bg-sand" /><span className="size-3 rounded-full border-2 border-ink bg-sand" /></span>
                <span className="font-pixel text-xs text-ink">semana.html</span>
              </div>
              <div className="p-5 sm:p-7">
                <p className="font-display text-2xl font-bold tracking-tight">Semana do estudante</p>
                <p className="mt-1 text-xs text-white/50">Exemplo ilustrativo da futura plataforma</p>
                <motion.ul variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.9 } } }} initial="hidden" animate="show" className="mt-5 divide-y divide-white/10 text-sm">
                  {[["Matemática", "Lista de exercícios", "Entrega sexta"], ["Português", "Leitura do capítulo 3", "Entrega quinta"], ["Ciências", "Trabalho em grupo", "Em andamento"]].map(([a, b, c]) => (
                    <motion.li key={a} variants={{ hidden: { opacity: 0, x: reduce ? 0 : -12 }, show: { opacity: 1, x: 0, transition: { duration: DUR.base, ease: EASE } } }} className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 py-3.5">
                      <span><span className="font-semibold">{a}</span> <span className="text-white/55">{b}</span></span>
                      <span className="shrink-0 bg-orange px-2 py-0.5 font-sans text-[11px] font-semibold text-black">{c}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>

            {notes.map((n, i) => (
              <Pop key={n.k} r={n.r} d={0.8 + i * 0.1} depth={20} className={`hidden xl:block ${n.cls}`}><NoteCard n={n} /></Pop>
            ))}
            <div className="mt-8 grid grid-cols-2 gap-3 xl:hidden">
              {notes.map((n) => <NoteCard key={n.k} n={n} />)}
            </div>
            <p className="mt-8 text-center font-sans text-[11px] text-white/40 xl:mt-16">Ilustração conceitual com dados fictícios. Nenhum dado real é exibido.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
