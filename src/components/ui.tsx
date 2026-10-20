"use client";
import { useEffect, useState } from "react";
import { MotionConfig, animate, motion, useScroll, useSpring } from "motion/react";
import { DUR, EASE, useReducedMotion } from "@/lib/motion";

export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export function researchLinkProps() {
  // Cada perfil tem o seu formulário; os botões gerais levam à escolha de perfil.
  return { href: "#pesquisa" };
}

type Variant = "orange" | "white" | "ink" | "ghost";
const styles: Record<Variant, string> = {
  orange: "border-2 border-sand bg-orange text-black shadow-[4px_4px_0_#dff3c8] hover:bg-white",
  white: "border-2 border-black bg-white text-black shadow-[4px_4px_0_#000] hover:bg-orange",
  ink: "border-2 border-ink bg-ink text-white shadow-[4px_4px_0_#14301f] hover:bg-coal",
  ghost: "border-2 border-sand/70 text-white shadow-[4px_4px_0_rgba(223,243,200,.35)] hover:bg-sand hover:text-ink",
};
const base = "group inline-flex min-h-12 items-center justify-center gap-2.5 px-6 py-3 text-sm font-semibold transition-all active:translate-x-1 active:translate-y-1 active:shadow-none";

export function ResearchButton({ children = "Contribuir com a pesquisa", variant = "orange", className = "" }: { children?: React.ReactNode; variant?: Variant; className?: string }) {
  return (
    <motion.a {...researchLinkProps()} whileTap={{ scale: 0.97 }} transition={{ duration: DUR.fast }} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </motion.a>
  );
}

export function AnchorButton({ href, children, variant = "ghost", className = "" }: { href: string; children: React.ReactNode; variant?: Variant; className?: string }) {
  return (
    <motion.a href={href} whileTap={{ scale: 0.97 }} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </motion.a>
  );
}

export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  if (reduce) return null;
  return <motion.div aria-hidden style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-orange" />;
}

/** Rótulo em mono com marcador quadrado laranja, como nos detalhes das referências. */
export function Label({ children, tone = "dark", className = "" }: { children: React.ReactNode; tone?: "dark" | "orange"; className?: string }) {
  return (
    <p className={`text-sm font-bold sm:text-base ${tone === "dark" ? "text-orange" : "text-black/75"} ${className}`}>{children}</p>
  );
}

/** Moldura fina com quadrados nos cantos (referência "Less Isn't Empty"). */
export function Frame({ children, className = "", tone = "dark" }: { children: React.ReactNode; className?: string; tone?: "dark" | "orange" }) {
  const line = tone === "dark" ? "border-white/20" : "border-black/40";
  const sq = tone === "dark" ? "bg-orange" : "bg-white";
  const c = `absolute size-3 sm:size-4 ${sq}`;
  return (
    <div className={`relative border ${line} ${className}`}>
      {children}
    </div>
  );
}

// Números que "contam" até o valor final quando aparecem; leitores de tela recebem o valor final direto.
export function CountUp({ text, delay = 0 }: { text: string; delay?: number }) {
  const reduce = useReducedMotion();
  const m = /^(\d+(?:,\d+)?)(.*)$/.exec(text);
  const decimals = m && m[1].includes(",") ? m[1].split(",")[1].length : 0;
  const target = m ? parseFloat(m[1].replace(",", ".")) : 0;
  const [shown, setShown] = useState(m ? (0).toFixed(decimals).replace(".", ",") : "");
  useEffect(() => {
    if (!m) return;
    if (reduce) { setShown(m[1]); return; }
    const c = animate(0, target, { duration: 1, delay, ease: "easeOut", onUpdate: (v) => setShown(v.toFixed(decimals).replace(".", ",")) });
    return () => c.stop();
  }, [text, reduce]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!m) return <>{text}</>;
  return (<><span aria-hidden>{shown}{m[2]}</span><span className="sr-only">{text}</span></>);
}

// Revelação de entrada: opacidade + deslocamento curto, uma vez só.
export function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} initial={{ opacity: 0, y: reduce ? 0 : 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: DUR.base, delay, ease: EASE }}>
      {children}
    </motion.div>
  );
}

// Anel quadrado que chama a atenção para o CTA duas vezes ao entrar na tela e depois fica parado.
export function AttentionRing({ children, tone = "white" }: { children: React.ReactNode; tone?: "white" | "black" }) {
  const reduce = useReducedMotion();
  return (
    <span className="relative inline-flex max-w-full">
      {!reduce && (
        <motion.span aria-hidden className={`pointer-events-none absolute inset-0 border-2 ${tone === "white" ? "border-white" : "border-black"}`} initial={{ opacity: 0, scale: 1 }} whileInView={{ opacity: [0, 0.9, 0], scale: [1, 1.08, 1.18] }} viewport={{ once: true, amount: 1 }} transition={{ duration: 1.3, delay: 0.8, repeat: 2, repeatDelay: 0.6, ease: EASE }} />
      )}
      {children}
    </span>
  );
}

/** Janela retrô: barra de título com nome de arquivo, borda grossa e sombra sólida. */
export function Win({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`border-2 border-ink bg-sand text-ink shadow-[6px_6px_0_#88c070] ${className}`}>
      <div aria-hidden className="flex items-center gap-1.5 border-b-2 border-ink bg-leaf px-3 py-1.5">
        <span className="size-3 rounded-full border-2 border-ink bg-sand" /><span className="size-3 rounded-full border-2 border-ink bg-sand" />
        <span className="mx-auto pr-8 font-pixel text-xs">{title}</span>
      </div>
      {children}
    </div>
  );
}

/** Título que entra palavra por palavra, subindo de uma linha recortada. */
export function Words({ text }: { text: string }) {
  const reduce = useReducedMotion();
  return (
    <span aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span className="inline-block" initial={{ y: reduce ? 0 : "105%", opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}>{w}&nbsp;</motion.span>
        </span>
      ))}
    </span>
  );
}
