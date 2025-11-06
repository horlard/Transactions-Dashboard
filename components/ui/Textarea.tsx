import React from "react";
import { cn } from "@/lib/cn";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={props.id}
            className="block mb-1 text-sm font-medium text-slate-700"
          >
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          {...props}
          className={cn(
            "w-full px-3 py-2 border rounded-lg min-h-[100px] bg-white text-slate-900 placeholder-slate-400",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none",
            error ? "border-red-500" : "border-slate-300",
            className
          )}
        />

        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
