import { type TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/shared/lib/utils";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Increment this whenever a transformation just ran, to replay the "cleaned" pulse. */
  pulseKey?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, pulseKey, ...props }, ref) => {
    return (
      <textarea
        key={pulseKey}
        ref={ref}
        className={cn(
          "w-full rounded-md border-[1.5px] border-rule bg-page px-4 py-3 font-mono text-[0.95rem] leading-[1.7] text-ink placeholder:text-ink-faded focus:border-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2 focus-visible:ring-offset-background resize-y",
          pulseKey ? "animate-pulse-clean" : "",
          className,
        )}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";
