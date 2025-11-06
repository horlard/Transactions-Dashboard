import React from "react";
import { cn } from "@/lib/cn";

type BadgeVariant = "success" | "error";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: "bg-green-100 text-green-800",
  error: "bg-red-100 text-red-800",
};

export default function Badge({
  variant = "success",
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
