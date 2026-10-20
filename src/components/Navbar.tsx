"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { PixelLogo } from "./Art";
import { PROJECT_NAME } from "@/lib/config";
import { ResearchButton } from "./ui";

const links = [
  { href: "#visao-geral", label: "Visão geral" },
  { href: "#funcionalidades", label: "Funcionalidades" },
  { href: "#inclusao", label: "Inclusão" },
  { href: "#pesquisa", label: "Pesquisa" },
];


export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => {
    const els = ["#topo", ...links.map((l) => l.href)].map((h) => document.querySelector(h)).filter(Boolean) as Element[];
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id === "topo" ? "" : `#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // menu móvel: trava a rolagem e fecha com Esc
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <>
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${scrolled || open ? "border-white/10 bg-ink " : "border-transparent bg-transparent"}`}>
      <nav aria-label="Principal" className="wrap flex h-16 items-center justify-between gap-4">
        <a href="#topo" onClick={() => setOpen(false)} className="flex min-w-0 items-center gap-3">
          <span className="block size-10 shrink-0 border-2 border-sand bg-leaf p-1"><PixelLogo className="size-full" /></span>
          <span aria-hidden className="hidden h-6 w-px bg-white/25 sm:block" />
          <span className="truncate font-display text-lg font-bold tracking-tight">{PROJECT_NAME}</span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} aria-current={active === l.href ? "true" : undefined} className={`relative py-2 font-sans text-xs transition-colors ${active === l.href ? "text-white" : "text-white/55 hover:text-white"}`}>
                {l.label}
                {active === l.href && <motion.span layoutId="nav-line" className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-orange" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block"><ResearchButton className="!min-h-10 !px-5 !py-2">Participar da pesquisa</ResearchButton></div>

        <button className="grid size-11 place-items-center border border-white/25 lg:hidden" aria-expanded={open} aria-controls="menu-mobile" aria-label={open ? "Fechar menu" : "Abrir menu"} onClick={() => setOpen((v) => !v)}>
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

    </header>
      <AnimatePresence>
        {open && (
          <motion.div id="menu-mobile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-ink lg:hidden">
            <div className="wrap flex min-h-full flex-col py-8">
              <ul className="border-t border-white/15">
                {links.map((l, i) => (
                  <li key={l.href}>
                    <a href={l.href} onClick={() => setOpen(false)} className="flex items-baseline gap-4 border-b border-white/15 py-5 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-8" onClick={() => setOpen(false)}><ResearchButton className="w-full">Participar da pesquisa</ResearchButton></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
