// Lógica de acesso compartilhada: usada pela API do Next (dev/Render único) e pelo servidor standalone (server/index.mjs).
import { createHash, createHmac, randomInt, timingSafeEqual } from "node:crypto";
import fs from "node:fs";

// Links, códigos e tokens ficam só no servidor: FORMS_JSON (produção) ou forms.local.json (local).
function load() {
  try { return JSON.parse(process.env.FORMS_JSON ?? fs.readFileSync("forms.local.json", "utf8")); } catch { return {}; }
}
const PREFIX = { aluno: "ALU", equipe: "EQP", pais: "PAI" };
const NOME = { aluno: "Aluno", equipe: "Equipe escolar", pais: "Pais e responsáveis" };
const h = (s) => createHash("sha256").update(s).digest();
const safeEq = (a, b) => timingSafeEqual(h(a), h(b));
const sig = (p, body) => createHmac("sha256", process.env.CODE_SECRET ?? "troque-esta-chave").update(p + body).digest("hex").slice(0, 3).toUpperCase();
const ALFABETO = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";

// limite de tentativas erradas por IP (em memória: no Render o processo é contínuo, então funciona bem)
const MAX = 8, JANELA = 15 * 60_000;
const store = (globalThis.__tent ??= new Map());
const bloqueado = (ip) => { const e = store.get(ip); return !!e && Date.now() - e.t < JANELA && e.n >= MAX; };
const falha = (ip) => { const e = store.get(ip); const now = Date.now(); store.set(ip, !e || now - e.t >= JANELA ? { n: 1, t: now } : { n: e.n + 1, t: e.t }); };

export function handleAcesso({ body, cookie = "", ip = "local" }) {
  const { token, codigo, gerar, info } = body ?? {};
  if (bloqueado(ip)) return { status: 429, body: { erro: "Muitas tentativas. Tente novamente em alguns minutos." } };
  const cfg = load();
  const perfil = Object.keys(PREFIX).find((k) => { const v = cfg[k]; return typeof v === "object" && !!v.token && typeof token === "string" && safeEq(v.token, token); });
  if (!perfil) { falha(ip); return { status: 401, body: { erro: "Link inválido. Use o QR code do seu espaço na escola." } }; }
  const c = cfg[perfil];
  const jaRespondeu = cookie.includes(`resp_${perfil}=1`);
  if (info) return { status: 200, body: { perfil, nome: NOME[perfil], jaRespondeu } };
  if (jaRespondeu) return { status: 409, body: { erro: "Você já respondeu este formulário. Obrigado pela participação!" } };
  if (!c.url?.startsWith("https://")) return { status: 503, body: { erro: "O formulário ainda não está disponível." } };
  if (gerar) {
    const b = Array.from({ length: 4 }, () => ALFABETO[randomInt(ALFABETO.length)]).join("");
    return { status: 200, body: { codigo: `${PREFIX[perfil]}-${b}-${sig(perfil, b)}` } };
  }
  const code = String(codigo ?? "").trim().toUpperCase();
  const m = /^[A-Z]{3}-([A-Z0-9]{4})-([A-F0-9]{3})$/.exec(code);
  const ok = (!!c.codigo && code === c.codigo.toUpperCase()) || (!!m && code.startsWith(PREFIX[perfil] + "-") && m[2] === sig(perfil, m[1]));
  if (!ok) { falha(ip); return { status: 401, body: { erro: "Código não reconhecido. Confira o cartaz ou gere um novo." } }; }
  return { status: 200, body: { url: c.url }, cookie: { name: `resp_${perfil}` } };
}
