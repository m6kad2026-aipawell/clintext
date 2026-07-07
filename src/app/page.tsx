import { PenLine } from "lucide-react";
import { TextCleanerTool } from "@/features/text-cleaner/components/TextCleanerTool";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center px-5 py-12 sm:py-16">
      <div className="flex w-full max-w-[760px] flex-col gap-10">
        <header className="animate-fade-in-up flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2 text-ink">
            <PenLine className="size-5 text-dirty" aria-hidden />
            <span className="font-display text-xl font-semibold tracking-tight">
              Clintext
            </span>
          </div>

          <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">
            Pega texto sucio. Sale{" "}
            <span className="relative inline-block">
              texto limpio
              <svg
                aria-hidden
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
                className="absolute -bottom-1 left-0 h-2 w-full text-dirty"
              >
                <path
                  d="M0 5 Q 15 0, 30 5 T 60 5 T 100 5"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
            .
          </h1>

          <p className="max-w-md font-body text-sm text-ink-faded">
            Clintext limpia espacios, parámetros de tracking, mayúsculas y
            extrae emails/links — todo en tu navegador, sin cuentas ni
            servidores de por medio.
          </p>
        </header>

        <section
          className="animate-fade-in-up rounded-lg border border-rule bg-page p-5 shadow-[0_8px_24px_-12px_rgba(28,26,23,0.18)] sm:p-8"
          style={{ animationDelay: "80ms" }}
        >
          <TextCleanerTool />
        </section>

        <footer
          className="animate-fade-in-up text-center font-body text-xs text-ink-faded"
          style={{ animationDelay: "160ms" }}
        >
          Todo se procesa en tu navegador — nada de tu texto se sube a ningún
          servidor.
        </footer>
      </div>
    </main>
  );
}
