"use client";

import { formatCurrency } from "@/lib/currency";
import type { Transaction } from "@/lib/types";
import { MoveDownLeftIcon, MoveUpRight, WalletIcon } from "lucide-react";
import { MetricCard } from "./ui/MetricCard";

interface TransactionStatsProps {
  transactions: Transaction[];
}

export default function TransactionStats({
  transactions,
}: TransactionStatsProps) {
  const totalInflow = transactions
    .filter((t) => t.type === "credit")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalOutflow = transactions
    .filter((t) => t.type === "debit")
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalInflow - totalOutflow;

  const formatFn = (amount: number) => {
    return formatCurrency(amount, {
      notation: amount > 99999 ? "compact" : "standard",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      currencyDisplay: "narrowSymbol",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <MetricCard
        valueClassName="text-green-600"
        title="Total Inflow"
        value={formatFn(totalInflow)}
        descriptionText="Total credit transactions"
        icon={
          <div className="p-2 bg-green-100 rounded-lg">
            <MoveDownLeftIcon className="w-5 h-5 text-green-600" />
          </div>
        }
      />

      <MetricCard
        valueClassName="text-red-600"
        title="Total Outflow"
        value={formatFn(totalOutflow)}
        descriptionText="Total debit transactions"
        icon={
          <div className="p-2 bg-red-100 rounded-lg">
            <MoveUpRight className=" w-5 h-5 text-red-600" />
          </div>
        }
      />

      <MetricCard
        valueClassName={netBalance >= 0 ? "text-blue-600" : "text-red-600"}
        title="Net Balance"
        value={formatFn(netBalance)}
        descriptionText="Inflow - Outflow"
        icon={
          <div className="p-2 bg-blue-100 rounded-lg">
            <WalletIcon className=" w-5 h-5 text-blue-600" />
          </div>
        }
      />
    </div>
  );
}
