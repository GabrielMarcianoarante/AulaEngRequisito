import { NextResponse } from "next/server";
import { handleAcesso } from "../../../../server/core.mjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Em dev (ou se o site e a API ficarem juntos) a API roda aqui. Com BACKEND_URL definido, /api/* vai para a Render.
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const ip = (req.headers.get("x-forwarded-for") ?? "local").split(",")[0].trim();
  const r = handleAcesso({ body, cookie: req.headers.get("cookie") ?? "", ip });
  const res = NextResponse.json(r.body, { status: r.status });
  if (r.cookie) res.cookies.set(r.cookie.name, "1", { httpOnly: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 90, path: "/" });
  return res;
}
