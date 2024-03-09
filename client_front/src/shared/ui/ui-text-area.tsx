import clsx from "clsx";
import { TextareaHTMLAttributes, PropsWithRef, useId } from "react";

export type UiTextAreaProps = {
  inputProps?: PropsWithRef<TextareaHTMLAttributes<HTMLTextAreaElement>>;
  className?: string,
  label?: string
};

export function UiTextArea({ inputProps, className, label }: UiTextAreaProps) {
  const id = useId();

  return (
    <div className={clsx(className, "flex flex-col gap-1")}>
      {label && (
        <label htmlFor={id} className="block">
          {label}
        </label>
      )}
    <textarea
      id={id}
      {...inputProps}
      className={clsx(
        inputProps?.className,
        "border bg-slate-100 border-slate-300 px-1 text-justify focus:bg-white outline-none h-[100px] w-[250px]"
      )}
    />
    </div>
  );
}
