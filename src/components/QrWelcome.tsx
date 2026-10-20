"use client";
import { useEffect, useState } from "react";
import { useAcesso } from "@/lib/acesso";

/** Quem chega pelo QR code começa no topo do site, lê a proposta, e recebe um aviso discreto para ir à pesquisa no fim. */
export function QrWelcome() {
  const a = useAcesso();
  const [show, setShow] = useState(true);
  useEffect(() => {
    if (!new URLSearchParams(location.search).get("t")) return;
    // cartazes antigos traziam #pesquisa: tira o hash e volta ao início
    history.scrollRestoration = "manual";
    if (location.hash) history.replaceState(null, "", location.pathname + location.search);
    window.scrollTo(0, 0);
    const id = setTimeout(() => window.scrollTo(0, 0), 300);
    return () => clearTimeout(id);
  }, []);
  useEffect(() => {
    const el = document.getElementById("pesquisa");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setShow(false), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  if (!a || !show) return null;
  return (
    <div role="status" className="fixed inset-x-3 bottom-3 z-40 mx-auto flex max-w-xl items-center gap-3 border-2 border-ink bg-sand p-3 text-ink shadow-[4px_4px_0_#88c070] sm:p-4">
      <p className="flex-1 text-sm leading-snug"><b>Você chegou pelo QR code de {a.nome.toLowerCase()}.</b> Conheça o projeto; a pesquisa fica no final da página.</p>
      <a href="#pesquisa" className="shrink-0 border-2 border-ink bg-orange px-3 py-2 text-sm font-semibold">Ir à pesquisa</a>
      <button type="button" onClick={() => setShow(false)} aria-label="Fechar aviso" className="shrink-0 px-1 text-xl leading-none">×</button>
    </div>
  );
}
