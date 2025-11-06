"use client";

import { formatCurrency } from "@/lib/currency";
import { formatDate } from "@/lib/date";
import type { Transaction } from "@/lib/types";
import { Trash2Icon } from "lucide-react";

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export default function TransactionList({
  transactions,
  onDelete,
}: TransactionListProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-900">Transactions</h2>
      </div>

      <div className="p-6">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 font-semibold text-slate-700">
                  ID
                </th>
                <th className="text-left py-3 font-semibold text-slate-700">
                  Description
                </th>
                <th className="text-left py-3 font-semibold text-slate-700">
                  Amount
                </th>
                <th className="text-left py-3 font-semibold text-slate-700">
                  Type
                </th>
                <th className="text-left py-3 font-semibold text-slate-700">
                  Date
                </th>
                <th className="text-right py-3 font-semibold text-slate-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="py-3  text-slate-600 text-xs">
                    {transaction.id.slice(0, 8)}
                  </td>
                  <td className="py-3  text-slate-900">
                    {transaction.description}
                  </td>
                  <td className="py-3  font-semibold text-slate-900">
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="py-3 ">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        transaction.type === "credit"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.type === "credit" ? "Credit" : "Debit"}
                    </span>
                  </td>
                  <td className="py-3  text-slate-600">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="py-3  text-right">
                    <button
                      onClick={() => onDelete(transaction.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      aria-label="Delete transaction"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="border border-slate-200 rounded-lg p-4 space-y-2"
            >
              <p className="text-xs text-slate-500">
                ID: {transaction.id.slice(0, 8)}
              </p>
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">
                    {transaction.description}
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatDate(transaction.date)}
                  </p>
                </div>
                <button
                  onClick={() => onDelete(transaction.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2Icon className="w-4 h-4" />
                </button>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    transaction.type === "credit"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {transaction.type === "credit" ? "Credit" : "Debit"}
                </span>
                <span className="font-semibold text-slate-900">
                  {formatCurrency(transaction.amount)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
