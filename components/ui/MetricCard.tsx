"use client";

import { cn } from "@/lib/cn";

interface MetricCardProps {
  title: string;
  value: string;
  descriptionText: string;
  icon: React.ReactNode;
  className?: string;
  valueClassName?: string;
}

export const MetricCard = ({
  title,
  value,
  descriptionText,
  icon,
  className,
  valueClassName,
}: MetricCardProps) => {
  return (
    <div
      className={cn(
        "bg-white rounded-lg border border-slate-200 shadow-sm px-6 py-4",
        className
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-slate-600">{title}</h3>
        {icon}
      </div>
      <div className={cn("text-3xl font-bold", valueClassName)}>{value}</div>
      <p className="text-xs text-slate-500 mt-2">{descriptionText}</p>
    </div>
  );
};
