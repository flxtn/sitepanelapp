import clsx from "clsx";
import { PropsWithRef, SelectHTMLAttributes, useId } from "react";



export type UiSelectFieldProps = {
  className?: string;
  label?: string;
  error?: string;
  selectProps?: PropsWithRef<SelectHTMLAttributes<HTMLSelectElement>>;
  options?: string[];
};

export function UiSelectField({
  className,
  error,
  label,
  selectProps: selectProps,
  options,
}: UiSelectFieldProps) {
  const id = useId();

  return (
    <div className={clsx(className, "flex flex-col gap-1")}>
      {label && (
        <label htmlFor={id} className="block">
          {label}
        </label>
      )}
      <select
        {...selectProps}
        id={id}
        className={clsx(
          selectProps?.className,
          "rounded border border-slate-300 focus:border-teal-600 px-2 h-10 outline-none",
        )}
      >
        {options?.map((option, i) => (
          <option key={i} value={option}>{option}</option>
        ))}
      </select>
      {error && <div className="text-rose-400 text-sm">{error}</div>}
    </div>
  );
}
