import React from "react";
import { cn } from "@/lib/cn";

type BadgeVariant = "success" | "error" | "info" | "warning" | "default";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: "bg-green-100 text-green-800",
  error: "bg-red-100 text-red-800",
  info: "bg-blue-100 text-blue-800",
  warning: "bg-yellow-100 text-yellow-800",
  default: "bg-slate-100 text-slate-800",
};

export default function Badge({
  variant = "default",
  children,
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      {...props}
      className={cn(
        "inline-flex items-center px-2 py-1 rounded text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
