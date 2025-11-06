"use client";

import Button from "./ui/Button";

interface TransactionFiltersProps {
  filterType: "all" | "credit" | "debit";
  onFilterChange: (type: "all" | "credit" | "debit") => void;
}

export default function TransactionFilters({
  filterType,
  onFilterChange,
}: TransactionFiltersProps) {
  const filters: Array<{ label: string; value: "all" | "credit" | "debit" }> = [
    { label: "All", value: "all" },
    { label: "Credits", value: "credit" },
    { label: "Debits", value: "debit" },
  ];

  return (
    <div className="flex gap-2 flex-wrap">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          variant={filterType === filter.value ? "primary" : "outline"}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}
