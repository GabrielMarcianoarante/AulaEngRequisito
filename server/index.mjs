// API standalone (sem dependências) para hospedar na Render. O front na Vercel repassa /api/* para cá.
import http from "node:http";
import { handleAcesso } from "./core.mjs";

const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
http.createServer(async (req, res) => {
  const path = (req.url ?? "").split("?")[0];
  if (path === "/api/health") { res.writeHead(200).end("ok"); return; }
  if (path === "/api/acesso" && req.method === "POST") {
    let raw = "";
    for await (const c of req) { raw += c; if (raw.length > 10_000) { res.writeHead(413).end(); return; } }
    let body = {}; try { body = JSON.parse(raw); } catch {}
    const ip = String(req.headers["x-forwarded-for"] ?? req.socket.remoteAddress ?? "local").split(",")[0].trim();
    const r = handleAcesso({ body, cookie: req.headers.cookie ?? "", ip });
    const headers = { "Content-Type": "application/json", "Cache-Control": "no-store" };
    if (r.cookie) headers["Set-Cookie"] = `${r.cookie.name}=1; HttpOnly; SameSite=Lax; Max-Age=${90 * 86400}; Path=/${secure}`;
    res.writeHead(r.status, headers).end(JSON.stringify(r.body));
    return;
  }
  res.writeHead(404).end();
}).listen(process.env.PORT || 3001, () => console.log("API no ar"));
