import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

type UiButtonVariant = "primary" | "secondary" 

export type UiButtonProps = {
  variant: UiButtonVariant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function UiButton({ className, variant, ...props }: UiButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        className,
        "px-4 h-10 rounded cursor-pointer flex gap-2 items-center justify-center",
        { 
          primary:
            "text-white bg-gray-500 hover:bg-gray-600 disabled:opacity-50 shadow shadow-gray-500/30",
          secondary:
            "border border-slate-300 hover:border-slate-500 disabled:opacity-50 ",
        }[variant],
      )}
    />
  );
}
