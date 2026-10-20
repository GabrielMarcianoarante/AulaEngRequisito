"use client";
import { useState } from "react";
import { useAcesso } from "@/lib/acesso";
import { PixelFace } from "./Art";
import { Win } from "./ui";

const perfis = [
  { id: "aluno", file: "aluno.html", kind: "cap", t: "Aluno", where: "Nos murais e corredores da escola", d: "Responda apenas se você é estudante." },
  { id: "equipe", file: "equipe.html", kind: "pencil", t: "Equipe escolar", where: "Na sala dos professores, na coordenação e na sala de recursos", d: "Professores, coordenação, psicologia, fisioterapia e demais profissionais da escola." },
  { id: "pais", file: "pais.html", kind: "check", t: "Pais e responsáveis", where: "Na secretaria e na entrada da escola", d: "Responda apenas se você é pai, mãe ou responsável por um estudante." },
] as const;
type P = (typeof perfis)[number];

const btn = "inline-flex min-h-11 items-center justify-center border-2 border-ink bg-orange px-5 py-2 text-sm font-semibold text-black shadow-[4px_4px_0_#14301f] transition-all hover:bg-white active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50";

function Gate({ p, i, token, done }: { p: P; i: number; token: string; done: boolean }) {
  const [codigo, setCodigo] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [feito, setFeito] = useState(done);
  const call = async (body: object) => {
    setBusy(true); setMsg("");
    try { const r = await fetch("/api/acesso", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token, ...body }) }); const d = await r.json(); setBusy(false); if (r.status === 409) setFeito(true); return { ok: r.ok, d }; }
    catch { setBusy(false); setMsg("Sem conexão. Tente novamente."); return null; }
  };
  const entrar = async (e: React.FormEvent) => { e.preventDefault(); const r = await call({ codigo }); if (!r) return; if (r.ok) window.location.href = r.d.url; else setMsg(r.d.erro); };
  const gerar = async () => { const r = await call({ gerar: true }); if (!r) return; if (r.ok) { setCodigo(r.d.codigo); setMsg("Código gerado. Agora é só continuar."); } else setMsg(r.d.erro); };
  if (feito) return (
    <Win title={p.file} className="mt-12 max-w-2xl !bg-white"><div className="p-6 sm:p-8"><h3 className="font-display text-2xl font-bold">Obrigado pela sua resposta!</h3><p className="mt-3 text-sm leading-relaxed text-ink/80">Você já respondeu o formulário de {p.t.toLowerCase()} neste aparelho. Cada pessoa responde uma única vez, para a pesquisa ficar confiável.</p></div></Win>
  );
  return (
    <Win title={p.file} className="mt-12 max-w-2xl !bg-white">
      <div className="p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <div className="w-16 shrink-0 border-2 border-ink bg-leaf p-1"><PixelFace kind={p.kind} i={i} className="w-full" /></div>
          <div><p className="text-sm font-semibold text-ink/70">Participar da pesquisa como</p><h3 className="font-display text-2xl font-bold">{p.t}</h3></div>
        </div>
        <form onSubmit={entrar} className="mt-6">
          <label htmlFor="codigo" className="text-sm font-bold">Código do cartaz</label>
          <input id="codigo" value={codigo} onChange={(e) => setCodigo(e.target.value)} autoComplete="off" autoCapitalize="characters" required placeholder="Ex.: ALU-7392" className="mt-2 block w-full border-2 border-ink bg-sand px-4 py-3 font-pixel text-xl uppercase tracking-wider outline-offset-2" />
          <p role="status" aria-live="polite" className="mt-2 min-h-5 text-sm font-semibold">{msg}</p>
          <div className="mt-3 flex flex-wrap items-center gap-4">
            <button type="submit" disabled={busy} className={btn}>Ir para o formulário</button>
            <button type="button" onClick={gerar} disabled={busy} className="text-sm font-semibold underline underline-offset-4">Esqueci o código, gerar um</button>
          </div>
        </form>
      </div>
    </Win>
  );
}

export function Profiles() {
  const a = useAcesso();
  const sel = a ? perfis.find((x) => x.id === a.perfil) : undefined;
  if (a && sel) return <Gate p={sel} i={perfis.indexOf(sel)} token={a.token} done={a.jaRespondeu} />;
  return (
    <>
      <div className="mt-12 grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {perfis.map((p, i) => (
          <Win key={p.id} title={p.file} className="!bg-white">
            <div className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-14 shrink-0 border-2 border-ink bg-leaf p-1"><PixelFace kind={p.kind} i={i} className="w-full" /></div>
                <h3 className="font-display text-xl font-bold leading-tight">{p.t}</h3>
              </div>
              <p className="mt-4 text-sm font-bold">Onde encontrar o QR code</p>
              <p className="text-sm text-ink/80">{p.where}</p>
              <p className="mt-3 border-t-2 border-ink/15 pt-3 text-sm text-ink/80">{p.d}</p>
            </div>
          </Win>
        ))}
      </div>
      <p className="mt-8 max-w-2xl text-sm leading-relaxed text-black/80">Para participar, escaneie o QR code do seu espaço na escola. Ele leva você a esta página já no seu perfil, onde você informa o código do cartaz (ou gera um) e segue para o formulário.</p>
    </>
  );
}
