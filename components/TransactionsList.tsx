"use client";

import { formatCurrency } from "@/lib/currency";
import { formatDate } from "@/lib/date";
import type { Transaction } from "@/lib/types";
import { Trash2Icon } from "lucide-react";
import Button from "./ui/Button";
import Badge from "./ui/Badge";

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

      <div className="p-6 pt-4">
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
                    NGN {formatCurrency(transaction.amount)}
                  </td>
                  <td className="py-3 ">
                    <Badge
                      variant={
                        transaction.type === "credit" ? "success" : "error"
                      }
                    >
                      {transaction.type === "credit" ? "Credit" : "Debit"}
                    </Badge>
                  </td>
                  <td className="py-3  text-slate-600">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="py-3  text-right">
                    <Button
                      onClick={() => onDelete(transaction.id)}
                      variant="ghost"
                    >
                      <Trash2Icon className="w-4 h-4 cursor-pointer text-red-500" />
                    </Button>
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
                <Button
                  onClick={() => onDelete(transaction.id)}
                  variant="ghost"
                >
                  <Trash2Icon className="w-4 h-4 cursor-pointer text-red-500" />
                </Button>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                <Badge
                  variant={transaction.type === "credit" ? "success" : "error"}
                >
                  {transaction.type === "credit" ? "Credit" : "Debit"}
                </Badge>
                <span className="font-semibold text-slate-900">
                  NGN {formatCurrency(transaction.amount)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
