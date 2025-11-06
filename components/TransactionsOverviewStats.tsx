"use client";

import { formatCurrency } from "@/lib/currency";
import type { Transaction } from "@/lib/types";
import { MoveDownLeftIcon, MoveUpRight, WalletIcon } from "lucide-react";

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-600">Total Inflow</h3>
          <div className="p-2 bg-green-100 rounded-lg">
            <MoveDownLeftIcon className="w-5 h-5 text-green-600" />
          </div>
        </div>
        <div className="text-3xl font-bold text-green-600">
          {formatCurrency(totalInflow)}
        </div>
        <p className="text-xs text-slate-500 mt-2">Total credit transactions</p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-600">
            Total Outflow
          </h3>
          <div className="p-2 bg-red-100 rounded-lg">
            <MoveUpRight className=" w-5 h-5 text-red-600" />
          </div>
        </div>
        <div className="text-3xl font-bold text-red-600">
          {formatCurrency(totalOutflow)}
        </div>
        <p className="text-xs text-slate-500 mt-2">Total debit transactions</p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-600">Net Balance</h3>
          <div className="p-2 bg-blue-100 rounded-lg">
            <WalletIcon className=" w-5 h-5 text-blue-600" />
          </div>
        </div>
        <div
          className={`text-3xl font-bold ${
            netBalance >= 0 ? "text-blue-600" : "text-red-600"
          }`}
        >
          {formatCurrency(netBalance)}
        </div>
        <p className="text-xs text-slate-500 mt-2">Inflow - Outflow</p>
      </div>
    </div>
  );
}
