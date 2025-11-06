"use client";

import { useState } from "react";
import TransactionForm from "./AddTransactionForm";
import TransactionList from "./TransactionsList";
import TransactionStats from "./TransactionsOverviewStats";
import { exportToCSV } from "@/lib/exportUtils";
import TransactionFilters from "./TransactionFilters";
import { useTransactions } from "@/hooks/useTransactions";

export default function TransactionDashboard() {
  const { transactions, addTransaction, deleteTransaction } = useTransactions();

  const [filterType, setFilterType] = useState<"all" | "credit" | "debit">(
    "all"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTransactions =
    filterType === "all"
      ? transactions
      : transactions.filter((t) => t.type === filterType);

  const handleExportCSV = () => {
    exportToCSV(filteredTransactions, "transactions");
  };

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
            AfriPay Frontend Assessment Test
          </h1>
          <p className="text-lg text-slate-600">
            Manage and track your financial transactions with ease
          </p>
        </div>

        <TransactionStats transactions={transactions} />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TransactionFilters
            filterType={filterType}
            onFilterChange={setFilterType}
          />

          <div className="flex flex-col gap-2 w-full sm:w-auto sm:flex-row">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              + Add Transaction
            </button>

            <div className="flex gap-2">
              <button
                onClick={handleExportCSV}
                className="flex-1 sm:flex-none px-3 py-2 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
              >
                CSV
              </button>
            </div>
          </div>
        </div>

        {filteredTransactions.length === 0 ? (
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-8 text-center">
            <p className="text-slate-600">
              {transactions.length === 0
                ? "No transactions yet. Add one to get started!"
                : "No transactions match the selected filter."}
            </p>
          </div>
        ) : (
          <TransactionList
            transactions={filteredTransactions}
            onDelete={deleteTransaction}
          />
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900">
                Add New Transaction
              </h2>
              <p className="text-slate-600 mt-1">
                Enter the details of your transaction
              </p>
            </div>
            <div className="p-6">
              <TransactionForm
                onSubmit={(t) => {
                  addTransaction(t);
                  setIsModalOpen(false);
                }}
                onCancel={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
