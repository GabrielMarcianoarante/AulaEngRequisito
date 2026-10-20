import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource/atkinson-hyperlegible/400.css";
import "@fontsource/atkinson-hyperlegible/700.css";
import "@fontsource/pixelify-sans/500.css";
import "@fontsource/kalam/400.css";
import "@fontsource/kalam/700.css";
import { Providers } from "@/components/ui";
import { PROJECT_NAME } from "@/lib/config";
import "./globals.css";

export const metadata: Metadata = {
  title: `${PROJECT_NAME} | Educação mais conectada, transparente e inclusiva`,
  description:
    "Proposta acadêmica de plataforma digital para aproximar famílias, professores e coordenação no ambiente escolar público. Participe da pesquisa.",
  openGraph: {
    title: `${PROJECT_NAME} | Uma escola mais conectada, transparente e inclusiva`,
    description: "Ajude a pesquisa a entender as necessidades da comunidade escolar.",
    type: "website",
    locale: "pt_BR",
  },
};
export const viewport: Viewport = { themeColor: "#0e1a33", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <noscript><style>{`[style*="opacity: 0"],[style*="opacity:0"]{opacity:1 !important;transform:none !important}`}</style></noscript>
      </head>
      <body className="font-sans">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-orange focus:px-4 focus:py-2 focus:font-semibold focus:text-black">
          Pular para o conteúdo
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
