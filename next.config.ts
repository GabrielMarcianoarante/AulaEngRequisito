import type { NextConfig } from "next";

// Na Vercel, defina BACKEND_URL (ex.: https://conecta-escola-api.onrender.com) e /api/* passa a ser repassado à Render.
const backend = process.env.BACKEND_URL?.replace(/\/$/, "");
const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return backend ? { beforeFiles: [{ source: "/api/:path*", destination: `${backend}/api/:path*` }], afterFiles: [], fallback: [] } : [];
  },
};
export default nextConfig;
