"use client";

import { type ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { Textarea } from "@/shared/ui/Textarea";
import { cleanSpaces } from "../lib/clean-spaces";
import { cleanTrackingParams } from "../lib/clean-urls";
import { changeCase } from "../lib/text-case";
import { extractEmailsAndLinks } from "../lib/extract";
import {
  MAX_RECOMMENDED_LENGTH,
  type CaseMode,
  type ExtractResult,
} from "../types";
import { CleanerToolbar } from "./CleanerToolbar";
import { CopyButton } from "./CopyButton";
import { ExtractPanel } from "./ExtractPanel";

export function TextCleanerTool() {
  const [text, setText] = useState("");
  const [pulseKey, setPulseKey] = useState(0);
  const [aggressiveUrlMode, setAggressiveUrlMode] = useState(false);
  const [extractResult, setExtractResult] = useState<ExtractResult | null>(
    null,
  );

  const isEmpty = text.trim().length === 0;

  function applyTransform(next: string) {
    setText(next);
    setPulseKey((key) => key + 1);
  }

  function handleTextChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setText(event.target.value);
    setExtractResult(null);
  }

  function handleCleanSpaces() {
    applyTransform(cleanSpaces(text));
  }

  function handleCleanUrls() {
    const result = cleanTrackingParams(
      text,
      aggressiveUrlMode ? "all-query-params" : "known-tracking",
    );
    if (result === text) {
      toast.info("No se encontraron enlaces para limpiar");
      return;
    }
    applyTransform(result);
  }

  function handleChangeCase(mode: CaseMode) {
    applyTransform(changeCase(text, mode));
  }

  function handleExtract() {
    setExtractResult(extractEmailsAndLinks(text));
  }

  return (
    <div className="flex flex-col gap-6">
      <CleanerToolbar
        disabled={isEmpty}
        aggressiveUrlMode={aggressiveUrlMode}
        onToggleAggressiveUrlMode={() =>
          setAggressiveUrlMode((value) => !value)
        }
        onCleanSpaces={handleCleanSpaces}
        onCleanUrls={handleCleanUrls}
        onChangeCase={handleChangeCase}
        onExtract={handleExtract}
      />

      <div className="flex flex-col gap-3">
        <Textarea
          value={text}
          onChange={handleTextChange}
          pulseKey={pulseKey}
          placeholder="Pega aquí tu texto sucio…"
          rows={12}
          maxLength={200_000}
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          {text.length > MAX_RECOMMENDED_LENGTH ? (
            <p className="text-xs text-warning">
              Texto muy largo — puede tardar un poco más
            </p>
          ) : (
            <span />
          )}
          <CopyButton text={text} />
        </div>
      </div>

      {extractResult && <ExtractPanel result={extractResult} />}
    </div>
  );
}
