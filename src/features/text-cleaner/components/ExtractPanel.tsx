import type { ExtractResult } from "../types";
import { CopyButton } from "./CopyButton";

interface ExtractPanelProps {
  result: ExtractResult;
}

function ResultList({
  title,
  items,
  emptyMessage,
}: {
  title: string;
  items: string[];
  emptyMessage: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-body text-sm font-semibold uppercase tracking-[0.04em] text-ink-faded">
          {title} {items.length > 0 && `(${items.length})`}
        </h3>
        <CopyButton
          text={items.join("\n")}
          label="Copiar lista"
          variant="ghost"
          className="min-h-0 px-0 text-xs"
        />
      </div>

      {items.length === 0 ? (
        <p className="font-body text-sm text-ink-faded italic">
          {emptyMessage}
        </p>
      ) : (
        <ul className="flex flex-col gap-1 font-mono text-sm text-ink">
          {items.map((item) => (
            <li key={item} className="truncate">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ExtractPanel({ result }: ExtractPanelProps) {
  const hasNothing = result.emails.length === 0 && result.links.length === 0;

  return (
    <div className="animate-fade-in-up rounded-md border-t-2 border-dashed border-rule bg-page px-5 py-5 sm:px-6">
      {hasNothing ? (
        <p className="font-body text-sm text-ink-faded">
          No se encontraron emails ni enlaces en este texto.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          <ResultList
            title="Emails encontrados"
            items={result.emails}
            emptyMessage="Ninguno encontrado"
          />
          <ResultList
            title="Links encontrados"
            items={result.links}
            emptyMessage="Ninguno encontrado"
          />
        </div>
      )}
    </div>
  );
}
