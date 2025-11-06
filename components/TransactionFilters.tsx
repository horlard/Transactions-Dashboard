"use client";

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
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-4 py-2 font-medium rounded-lg transition-colors ${
            filterType === filter.value
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
