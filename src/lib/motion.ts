import { useSyncExternalStore } from "react";
// Tokens de movimento compartilhados: mesma curva e durações em todo o site.
export const EASE = [0.22, 1, 0.36, 1] as const;
export const DUR = { fast: 0.2, base: 0.55, slow: 0.9 } as const;

/** prefers-reduced-motion sem quebrar a hidratação: o servidor e o 1º render do cliente sempre assumem "false". */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    (cb) => { const q = window.matchMedia("(prefers-reduced-motion: reduce)"); q.addEventListener("change", cb); return () => q.removeEventListener("change", cb); },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}
