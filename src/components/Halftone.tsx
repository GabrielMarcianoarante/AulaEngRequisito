"use client";
import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";

export type StickerKind = "book" | "bubble" | "cap" | "pencil" | "check";

const shapes: Record<StickerKind, { d: string; lines?: string }> = {
  book: { d: "M20 60 L100 76 L180 60 L180 150 L100 166 L20 150 Z", lines: "M100 76 V166 M38 90 L84 98 M38 112 L84 120 M116 98 L162 90 M116 120 L162 112" },
  bubble: { d: "M30 40 H170 Q185 40 185 55 V115 Q185 130 170 130 H105 L62 162 V130 H30 Q15 130 15 115 V55 Q15 40 30 40 Z", lines: "M42 72 H158 M42 92 H138 M42 112 H110" },
  cap: { d: "M100 38 L192 80 L100 122 L8 80 Z M48 104 V142 Q100 172 152 142 V104 L100 128 Z", lines: "M180 86 V138" },
  pencil: { d: "M152 18 L184 50 L74 162 L26 174 L38 126 Z", lines: "M140 30 L172 62 M44 132 L68 156" },
  check: { d: "M30 100 a70 70 0 1 0 140 0 a70 70 0 1 0 -140 0", lines: "M66 102 L92 128 L138 76" },
};

const hover: Record<StickerKind, { rotate?: number; scale?: number; x?: number; y?: number }> = {
  book: { rotate: -5, scale: 1.06 },
  bubble: { scale: 1.1 },
  cap: { rotate: -9, y: -4 },
  pencil: { rotate: 8, x: 4 },
  check: { rotate: 5, scale: 1.08 },
};

// Figura em estilo halftone com contorno de papel recortado. Decorativa.
// Animações: flutuação lenta (desligada com movimento reduzido), traços internos que se desenham ao aparecer e leve balanço no hover.
export function Sticker({ kind, className = "", float = false }: { kind: StickerKind; className?: string; float?: boolean }) {
  const reduce = useReducedMotion();
  const id = useId().replace(/:/g, "");
  const seed = Array.from(id).reduce((a, c) => a + c.charCodeAt(0), 0);
  const s = shapes[kind];
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 200 200"
      className={`overflow-visible drop-shadow-[0_6px_8px_rgba(0,0,0,.28)] ${className}`}
      animate={float && !reduce ? { y: [0, -6, 0], rotate: [0, 1.5, 0] } : undefined}
      transition={{ duration: 5 + (seed % 3), delay: (seed % 5) * 0.4, repeat: Infinity, ease: "easeInOut" }}
      whileHover={reduce ? undefined : { ...hover[kind], transition: { type: "spring", stiffness: 300, damping: 14 } }}
    >
      <defs>
        <filter id={`r${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="2" seed="4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="7" />
        </filter>
        <pattern id={`d${id}`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
          <circle cx="3.5" cy="3.5" r="2" fill="#000" />
        </pattern>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset=".3" stopColor="#000" />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>
        <mask id={`m${id}`}><rect width="200" height="200" fill={`url(#g${id})`} /></mask>
      </defs>
      <motion.path
        d={s.d} fill="#fff" stroke="#fff" strokeWidth="18" strokeLinejoin="round" filter={`url(#r${id})`}
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
      />
      <path d={s.d} fill={`url(#d${id})`} fillRule="evenodd" />
      <path d={s.d} fill="#000" mask={`url(#m${id})`} fillRule="evenodd" />
      {s.lines && (
        <motion.path
          d={s.lines} stroke="#fff" strokeWidth="5" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
        />
      )}
    </motion.svg>
  );
}
