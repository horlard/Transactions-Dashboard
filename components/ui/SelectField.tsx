import React from "react";
import { cn } from "@/lib/cn";
import { ChevronDownIcon } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
}

const SelectField = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = "", ...props }, ref) => {
    return (
      <div className="w-full relative">
        {label && (
          <label
            htmlFor={props.id}
            className="block mb-1 text-sm font-medium text-slate-700"
          >
            {label}
          </label>
        )}

        <ChevronDownIcon className="absolute right-3 top-[33px] z-20" />
        <select
          ref={ref}
          {...props}
          className={cn(
            "w-full px-3 py-2 border rounded-lg bg-white text-slate-900",
            " transition-colors",
            error ? "border-red-500" : "border-slate-300",
            className
          )}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

SelectField.displayName = "SelectField";

export default SelectField;
