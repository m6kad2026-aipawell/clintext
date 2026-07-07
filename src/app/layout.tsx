import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Clintext — Limpiador de Textos y Enlaces",
  description:
    "Clintext: pega texto sucio, un click, texto limpio. Quita espacios dobles, limpia parámetros de tracking de enlaces, cambia mayúsculas/minúsculas y extrae emails y links — todo en tu navegador, sin subir nada a un servidor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${instrumentSans.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            classNames: {
              toast: "!font-body !border-none",
              success: "!bg-[var(--color-success)] !text-[var(--color-page)]",
              error: "!bg-[var(--color-dirty)] !text-[var(--color-page)]",
            },
          }}
        />
      </body>
    </html>
  );
}
