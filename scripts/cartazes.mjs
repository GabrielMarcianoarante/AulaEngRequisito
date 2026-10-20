// Gera cartazes A4 (um por perfil) com QR code e código de acesso. Uso: cp forms.local.example.json forms.local.json; npm run cartazes
import fs from "node:fs";
import crypto from "node:crypto";
import QRCode from "qrcode";
const forms = JSON.parse(fs.readFileSync("forms.local.json", "utf8"));
const site = (forms.site ?? "").replace(/\/$/, "");
if (!site.startsWith("http")) { console.error("Defina \"site\" em forms.local.json (endereço do site publicado)."); process.exit(1); }
let mudou = false;
for (const k of ["aluno", "equipe", "pais"]) if (forms[k] && !forms[k].token) { forms[k].token = crypto.randomBytes(24).toString("base64url"); mudou = true; }
if (mudou) { fs.writeFileSync("forms.local.json", JSON.stringify(forms, null, 2)); console.log("Tokens criados em forms.local.json: copie o conteúdo para a variável FORMS_JSON da hospedagem."); }
const nomes = { aluno: "Alunos", equipe: "Equipe escolar", pais: "Pais e responsáveis" };
let pages = "";
for (const [k, nome] of Object.entries(nomes)) {
  const f = forms[k];
  if (!f?.codigo) { console.warn(`! ${k}: sem código, cartaz pulado`); continue; }
  const svg = await QRCode.toString(`${site}/?t=${f.token}`, { type: "svg", margin: 2, color: { dark: "#14301f", light: "#ffffff" } });
  pages += `<section><p class="k">Pesquisa Conecta Escola</p><h1>${nome}</h1><p class="s">Responda apenas se você faz parte deste grupo.<br>Aponte a câmera do celular para o QR code, clique em <b>Participar da pesquisa</b> e digite o código abaixo.</p><div class="qr">${svg}</div><p class="c">Código de acesso<br><b>${f.codigo}</b><br><small>Esqueceu? Gere um novo no site.</small></p><p class="n">Cada grupo tem um formulário próprio. Responder no formulário errado prejudica a pesquisa.</p></section>`;
}
fs.writeFileSync("cartazes.html", `<!doctype html><meta charset="utf-8"><title>Cartazes</title><style>
@page{size:A4;margin:0}body{margin:0;font-family:system-ui,sans-serif;color:#14301f}
section{height:297mm;box-sizing:border-box;padding:22mm 18mm;text-align:center;page-break-after:always;border:6mm solid #88c070}
.k{font-size:14pt;letter-spacing:.04em}h1{font-size:40pt;margin:6mm 0}.s{font-size:16pt;line-height:1.4}.qr svg{width:105mm;height:105mm;margin:8mm auto;display:block;border:2mm solid #14301f}
.c{font-size:15pt}.c b{font-size:30pt;letter-spacing:.12em;border:2px dashed #14301f;padding:2mm 6mm;display:inline-block;margin-top:2mm}.n{font-size:11pt;margin-top:10mm}</style>${pages}`);
console.log("Gerado: cartazes.html (abra no navegador e imprima)");
