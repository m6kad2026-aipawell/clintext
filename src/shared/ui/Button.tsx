import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded whitespace-nowrap font-body font-semibold text-sm tracking-[0.01em] min-h-11 px-4 transition-[background-color,color,transform,box-shadow] duration-150 ease-out disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2 focus-visible:ring-offset-page",
  {
    variants: {
      variant: {
        primary:
          "bg-ink text-page shadow-[0_4px_0_0_rgba(28,26,23,0.25)] active:translate-y-[1px] active:shadow-[0_1px_0_0_rgba(28,26,23,0.25)] hover:bg-ink/90",
        secondary:
          "bg-page text-ink border-[1.5px] border-ink hover:bg-ink hover:text-page",
        accent:
          "bg-page text-info border-[1.5px] border-info hover:bg-info hover:text-page",
        ghost: "text-ink-faded hover:text-ink underline decoration-dotted",
      },
    },
    defaultVariants: {
      variant: "secondary",
    },
  },
);

export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant }), className)}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
