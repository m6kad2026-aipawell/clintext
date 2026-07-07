"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { Button, type ButtonProps } from "@/shared/ui/Button";

interface CopyButtonProps extends Omit<ButtonProps, "onClick" | "children"> {
  text: string;
  label?: string;
}

async function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to the legacy fallback below.
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  let succeeded = false;
  try {
    succeeded = document.execCommand("copy");
  } catch {
    succeeded = false;
  }
  document.body.removeChild(textarea);
  return succeeded;
}

export function CopyButton({
  text,
  label = "Copiar",
  variant = "primary",
  ...props
}: CopyButtonProps) {
  const [justCopied, setJustCopied] = useState(false);

  async function handleClick() {
    const succeeded = await copyToClipboard(text);

    if (succeeded) {
      toast.success("Copiado al portapapeles");
      setJustCopied(true);
      setTimeout(() => setJustCopied(false), 2000);
    } else {
      toast.error(
        "No pudimos copiar automáticamente. Selecciona el texto y copia con Ctrl+C",
      );
    }
  }

  return (
    <Button
      variant={variant}
      disabled={text.length === 0}
      onClick={handleClick}
      {...props}
    >
      {justCopied ? <Check className="size-4" /> : <Copy className="size-4" />}
      {justCopied ? "Copiado" : label}
    </Button>
  );
}
