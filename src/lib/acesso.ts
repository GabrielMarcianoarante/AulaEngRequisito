"use client";
import { useEffect, useState } from "react";

export type Acesso = { perfil: "aluno" | "equipe" | "pais"; nome: string; jaRespondeu: boolean; token: string };
let cache: Promise<Acesso | null> | null = null;

// O QR code traz ?t=<token>; o servidor descobre o perfil. Compartilhado entre o aviso e o formulário de código.
function carregar(): Promise<Acesso | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  return (cache ??= (async () => {
    const token = new URLSearchParams(location.search).get("t") ?? sessionStorage.getItem("t");
    if (!token) return null;
    try {
      const r = await fetch("/api/acesso", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token, info: true }) });
      const d = await r.json();
      if (!r.ok) { sessionStorage.removeItem("t"); return null; }
      sessionStorage.setItem("t", token);
      return { ...d, token } as Acesso;
    } catch { return null; }
  })());
}
export function useAcesso() {
  const [a, setA] = useState<Acesso | null>(null);
  useEffect(() => { carregar().then(setA); }, []);
  return a;
}
