"use client";
import { useReducedMotion } from "@/lib/motion";
import { useEffect, useId, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";

export type StickerKind = "book" | "bubble" | "cap" | "pencil" | "check";

const glyphs: Record<StickerKind, React.ReactNode> = {
  bubble: <path d="M60 80 C32 62 32 40 49 40 C55 40 60 44 60 48 C60 44 65 40 71 40 C88 40 88 62 60 80 Z" />,
  book: <path d="M32 42 Q46 37 60 44 V82 Q46 75 32 80 Z M88 42 Q74 37 60 44 V82 Q74 75 88 80 Z" />,
  cap: <path d="M60 34 L92 49 L60 64 L28 49 Z M41 60 V75 Q60 88 79 75 V60 L60 70 Z" />,
  pencil: <path d="M79 34 L94 49 L56 87 L37 92 L42 73 Z" />,
  check: <path d="M36 60 L53 77 L84 42" fill="none" stroke="#fff" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />,
};

const tones = {
  orange: { top: "#f5b82e", bottom: "#f5b82e", depth: "#0a1226" },
  graphite: { top: "#dff3c8", bottom: "#dff3c8", depth: "#0a1226" },
};

/**
 * Ícone "3D" estilo notificação (referências): corpo extrudado, brilho no topo, sombra projetada.
 * Decorativo. `blur` simula o desfoque de movimento das referências.
 */
export function Badge3D({ kind, tone = "orange", blur = false, float = true, className = "" }: { kind: StickerKind; tone?: keyof typeof tones; blur?: boolean; float?: boolean; className?: string }) {
  const reduce = useReducedMotion();
  const id = useId().replace(/:/g, "");
  const t = tones[tone];
  const seed = Array.from(id).reduce((a, c) => a + c.charCodeAt(0), 0);
  const body = "M38 18 H82 A22 22 0 0 1 104 40 V72 A22 22 0 0 1 82 94 H56 L30 112 L36 94 H38 A22 22 0 0 1 16 72 V40 A22 22 0 0 1 38 18 Z";
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 120 124"
      className={`overflow-visible ${className}`}
      style={blur ? { filter: "blur(1.6px)" } : undefined}
      animate={float && !reduce ? { y: [0, -9, 0], rotate: [0, 2.5, -1.5, 0] } : undefined}
      transition={{ duration: 4.5 + (seed % 4) * 0.6, delay: (seed % 5) * 0.35, repeat: Infinity, ease: "easeInOut" }}
      whileHover={reduce ? undefined : { rotate: [0, -8, 6, 0], scale: 1.08, transition: { duration: 0.6 } }}
    >
      <defs>
        <linearGradient id={`f${id}`} x1="0" y1="18" x2="0" y2="112" gradientUnits="userSpaceOnUse">
          <stop stopColor={t.top} /><stop offset="1" stopColor={t.bottom} />
        </linearGradient>
        <clipPath id={`c${id}`}><path d={body} /></clipPath>
        <linearGradient id={`s${id}`} x1="0" x2="1">
          <stop stopColor="#fff" stopOpacity="0" /><stop offset=".5" stopColor="#fff" stopOpacity=".55" /><stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`h${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#fff" stopOpacity=".75" /><stop offset=".45" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={body} fill={t.depth} transform="translate(0 8)" />
      <path d={body} fill={`url(#f${id})`} />
            <g fill="#14301f">{glyphs[kind]}</g>
    </motion.svg>
  );
}

/** Lanterna com feixe de luz (referência "Who we are"). Decorativa. */
export function Flashlight({ className = "", on = true }: { className?: string; on?: boolean }) {
  const reduce = useReducedMotion();
  const id = useId().replace(/:/g, "");
  return (
    <svg aria-hidden viewBox="0 0 120 360" className={className}>
      <defs>
        <linearGradient id={`b${id}`} x1="0" x2="1">
          <stop stopColor="#050505" /><stop offset=".3" stopColor="#363636" /><stop offset=".62" stopColor="#111" /><stop offset="1" stopColor="#000" />
        </linearGradient>
        <radialGradient id={`g${id}`}>
          <stop stopColor="#fff" /><stop offset=".35" stopColor="#fff" stopOpacity=".55" /><stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <motion.ellipse cx="60" cy="18" rx="60" ry="26" fill={`url(#g${id})`} initial={{ opacity: 0 }} animate={on ? { opacity: reduce ? 1 : [0, 0.9, 0.1, 1, 0.45, 1] } : { opacity: 0 }} transition={{ duration: 1.2, times: [0, 0.15, 0.3, 0.5, 0.7, 1] }} />
      <rect x="22" y="16" width="76" height="30" rx="5" fill={`url(#b${id})`} />
      <motion.ellipse cx="60" cy="17" rx="36" ry="7" fill="#fff" initial={{ opacity: 0 }} animate={on ? { opacity: reduce ? 1 : [0, 0.9, 0.1, 1, 0.45, 1] } : { opacity: 0 }} transition={{ duration: 1.2, times: [0, 0.15, 0.3, 0.5, 0.7, 1] }} />
      <rect x="38" y="44" width="44" height="316" fill={`url(#b${id})`} />
      <path d="M38 66H82M38 71H82M38 76H82" stroke="#000" strokeWidth="2" />
      <path d="M38 150H82M38 157H82M38 164H82M38 171H82M38 178H82M38 185H82" stroke="#fff" strokeOpacity=".1" strokeWidth="2" />
    </svg>
  );
}

/** Faixa de setas laranja (referência "Who we are"). Decorativa. */
export function Chevrons({ className = "", on = true, layer = "both" }: { className?: string; on?: boolean; layer?: "bg" | "text" | "both" }) {
  const row = Array.from({ length: 12 }, (_, i) => ["Escutar", "Aprender", "Incluir", "Conectar"][i % 4]).map((w, i) => (
    <span key={i} className="flex shrink-0 items-center gap-8 px-4">{w}<span aria-hidden>✦</span></span>
  ));
  const bg = layer !== "text" ? "border-y-2 border-ink bg-orange" : "";
  const txt = layer !== "bg" ? "text-ink [text-shadow:0_0_5px_#f5b82e,0_0_2px_#f5b82e]" : "text-transparent";
  // a luz da lanterna abre a faixa a partir do centro para as bordas
  return (
    <motion.div aria-hidden initial={{ clipPath: "inset(0 50% 0 50%)" }} animate={{ clipPath: on ? "inset(0 0% 0 0%)" : "inset(0 50% 0 50%)" }} transition={{ duration: 1.3, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-center overflow-hidden font-display text-[clamp(1.6rem,4vw,3rem)] font-semibold ${bg} ${txt} ${className}`}>
      <div className="marquee flex shrink-0">{row}{row}</div>
    </motion.div>
  );
}

const HEART = "M0 34 C-46 4 -34 -34 -14 -34 C-6 -34 0 -28 0 -22 C0 -28 6 -34 14 -34 C34 -34 46 4 0 34 Z";

/** Coração dentro de um <svg>: é traçado, preenche e passa a bater (lub-dub). */
export function HeartG({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const reduce = useReducedMotion();
  const box = { transformBox: "fill-box", transformOrigin: "center" } as const;
  const beat = { duration: 1.2, times: [0, 0.14, 0.28, 0.42, 1], repeat: Infinity, delay: 2.2, ease: "easeOut" as const };
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {<motion.path d={HEART} fill="none" stroke="#d7263d" strokeWidth={2} style={box} initial={{ opacity: 0 }} animate={{ scale: [1, 1, 1.9], opacity: [0, 0.7, 0] }} transition={{ ...beat, times: [0, 0.14, 1] }} />}
      <motion.g style={box} animate={{ scale: [1, 1.16, 1, 1.1, 1] }} transition={beat}>
        <motion.path d={HEART} fill="#d7263d" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.7, duration: 0.5 }} />
        <motion.path d={HEART} fill="none" stroke="#14301f" strokeWidth={3} strokeLinejoin="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, delay: 0.4, ease: "easeInOut" }} />
      </motion.g>
    </g>
  );
}

/** Texto que é escrito à mão: um pincel em zigue-zague revela as letras da esquerda para a direita, com a caneta na frente. */
export function Write({ text, size = 48, color = "#f5b82e", delay = 0, className = "" }: { text: string; size?: number; color?: string; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  const id = useId().replace(/:/g, "");
  const ref = useRef<SVGSVGElement>(null);
  const tx = useRef<SVGTextElement>(null);
  const [w, setW] = useState(text.length * size * 0.5);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const p = useMotionValue(0);
  const h = size * 1.6;
  useEffect(() => { document.fonts?.ready.then(() => tx.current && setW(tx.current.getComputedTextLength() + 10)); }, [text, size]);
  useEffect(() => {
    if (!inView) return;
    const c = animate(p, 1, { duration: Math.max(1.2, text.length * 0.1), delay, ease: "easeInOut" });
    return () => c.stop();
  }, [inView, reduce]); // eslint-disable-line react-hooks/exhaustive-deps
  const step = size * 0.32;
  const n = Math.ceil(w / step) + 1;
  const d = Array.from({ length: n }, (_, i) => `${i ? "L" : "M"}${i * step} ${i % 2 ? h * 0.1 : h * 0.95}`).join(" ");
  const px = useTransform(p, (v) => v * w);
  const py = useTransform(p, (v) => h * 0.72 + Math.sin(v * text.length * 2.4) * size * 0.14);
  const pen = useTransform(p, (v) => (v > 0 && v < 0.995 ? 1 : 0));
  return (
    <svg ref={ref} role="img" aria-label={text} viewBox={`0 0 ${w} ${h}`} width={w} style={{ maxWidth: "100%" }} className={`overflow-visible ${className}`}>
      <defs><mask id={`m${id}`}><motion.path d={d} fill="none" stroke="#fff" strokeWidth={step * 2.6} strokeLinecap="round" strokeLinejoin="round" style={{ pathLength: p }} /></mask></defs>
      <text ref={tx} x="4" y={h * 0.74} fill={color} fontSize={size} mask={`url(#m${id})`} style={{ fontFamily: "var(--font-hand)", fontWeight: 700 }}>{text}</text>
      <motion.g aria-hidden style={{ x: px, y: py, opacity: pen }}>
        <path d="M0 0 L26 -16 L34 -8 L8 10 Z" fill="#fff" stroke="#14301f" strokeWidth="2" strokeLinejoin="round" />
        <path d="M0 0 L8 10 L-2 8 Z" fill="#14301f" />
      </motion.g>
    </svg>
  );
}

const FACES: Record<string, string[]> = {
  cap: ["...######...", "..########..", ".##oooooo##.", ".#oooooooo#.", ".#o#oooo#o#.", ".#oooooooo#.", ".#o#oooo#o#.", "..#o####o#..", "...######..."],
  pencil: ["....####....", "..########..", ".#oooooooo#.", ".#oooooooo#.", ".###oooo###.", ".#o#oooo#o#.", ".#oooooooo#.", "..#oo##oo#..", "...######..."],
  check: ["...######...", "..########..", ".#oooooooo#.", ".#o#oooo#o#.", ".#oooooooo#.", ".##########.", ".#o######o#.", "..########..", "...######..."],
  bubble: ["..########..", ".##########.", ".###oooo###.", ".##o#oo#o##.", ".##oooooo##.", ".##o####o##.", ".##oooooo##.", ".##......##.", ".##......##."],
};
const EYES: Record<string, [number, number][]> = { cap: [[3, 4], [8, 4]], pencil: [[3, 5], [8, 5]], check: [[3, 3], [8, 3]], bubble: [[4, 3], [7, 3]] };
/** Rosto em pixel art (grade 12x9), paleta de 2 tons como nas telas de Game Boy. */
export function PixelFace({ kind, className = "", i = 0 }: { kind: StickerKind; className?: string; i?: number }) {
  return (
    <svg aria-hidden viewBox="0 0 12 10" shapeRendering="crispEdges" className={`overflow-visible ${className}`}>
      <motion.g animate={{ y: [1, 1, -0.6, -0.6, 1], rotate: [0, 0, -3, 3, 0] }} style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }} transition={{ duration: 1.1, times: [0, 0.4, 0.45, 0.9, 1], repeat: Infinity, delay: i * 0.3 }}>
      {FACES[kind].flatMap((r, y) => [...r].map((c, x) => c === "." ? null : <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={c === "#" ? "#14301f" : "#dff3c8"} />))}
      {EYES[kind].map(([x, y]) => <motion.rect key={x} x={x} y={y} width="1" height="1" fill="#dff3c8" animate={{ opacity: [0, 0, 1, 1, 0, 0] }} transition={{ duration: 2.6, times: [0, 0.7, 0.72, 0.78, 0.8, 1], repeat: Infinity, delay: i * 0.5 }} />)}
      </motion.g>
    </svg>
  );
}

const LOGO = ["....####....", "...#aaaa#...", "..#aaaaaa#..", ".#aaaaaaaa#.", "############", ".#oooooooo#.", ".#o##oo##o#.", ".#o##oo##o#.", ".#oooooooo#.", ".#ooo##ooo#.", ".##########."];
/** Logo em pixel art: a escola com as janelas acendendo, a mesma linguagem dos rostinhos. */
export function PixelLogo({ className = "" }: { className?: string }) {
  const fill = { "#": "#14301f", o: "#dff3c8", a: "#f5b82e" } as const;
  return (
    <svg aria-hidden viewBox="0 0 12 11" shapeRendering="crispEdges" className={className}>
      {LOGO.flatMap((r, y) => [...r].map((c, x) => c === "." ? null : <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={fill[c as keyof typeof fill]} />))}
      {[3, 8].map((x, i) => <motion.rect key={x} x={x} y={6} width="1" height="2" fill="#f5b82e" animate={{ opacity: [0.1, 1, 1, 0.1] }} transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.8, times: [0, 0.2, 0.7, 1] }} />)}
    </svg>
  );
}
