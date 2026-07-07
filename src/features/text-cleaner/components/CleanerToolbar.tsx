"use client";

import {
  AlignJustify,
  CaseSensitive,
  Link2Off,
  ScanSearch,
} from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { cn } from "@/shared/lib/utils";
import type { CaseMode } from "../types";

const CASE_OPTIONS: { mode: CaseMode; label: string }[] = [
  { mode: "upper", label: "MAYÚSCULAS" },
  { mode: "lower", label: "minúsculas" },
  { mode: "title", label: "Tipo Título" },
  { mode: "sentence", label: "Tipo Oración" },
];

interface CleanerToolbarProps {
  disabled: boolean;
  aggressiveUrlMode: boolean;
  onToggleAggressiveUrlMode: () => void;
  onCleanSpaces: () => void;
  onCleanUrls: () => void;
  onChangeCase: (mode: CaseMode) => void;
  onExtract: () => void;
}

export function CleanerToolbar({
  disabled,
  aggressiveUrlMode,
  onToggleAggressiveUrlMode,
  onCleanSpaces,
  onCleanUrls,
  onChangeCase,
  onExtract,
}: CleanerToolbarProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="secondary" disabled={disabled} onClick={onCleanSpaces}>
          <AlignJustify className="size-4" />
          Limpiar espacios
        </Button>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="accent" disabled={disabled} onClick={onCleanUrls}>
            <Link2Off className="size-4" />
            Limpiar enlaces
          </Button>
          <label className="flex items-center gap-1.5 text-xs text-ink-faded select-none">
            <input
              type="checkbox"
              checked={aggressiveUrlMode}
              onChange={onToggleAggressiveUrlMode}
              className="size-3.5 accent-info"
            />
            Eliminar TODOS los parámetros
          </label>
        </div>

        <Button variant="secondary" disabled={disabled} onClick={onExtract}>
          <ScanSearch className="size-4" />
          Extraer emails y links
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.04em] text-ink-faded">
          <CaseSensitive className="size-4" />
          Mayús/minús
        </span>
        {CASE_OPTIONS.map(({ mode, label }) => (
          <button
            key={mode}
            type="button"
            disabled={disabled}
            onClick={() => onChangeCase(mode)}
            className={cn(
              "rounded border-[1.5px] border-rule px-3 py-1.5 text-xs font-semibold text-ink-faded transition-colors duration-150 ease-out",
              "hover:border-ink hover:text-ink disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
