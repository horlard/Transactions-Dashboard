"use client";

import { useState } from "react";
import TransactionForm from "./AddTransactionForm";
import TransactionList from "./TransactionsList";
import TransactionStats from "./TransactionsOverviewStats";
import { exportToCSV } from "@/lib/exportUtils";
import TransactionFilters from "./TransactionFilters";
import { useTransactions } from "@/hooks/useTransactions";
import Button from "./ui/Button";
import { Download } from "lucide-react";
import Modal from "./ui/Modal";
import useModalState from "@/hooks/useModalState";

export default function TransactionDashboard() {
  const { transactions, addTransaction, deleteTransaction } = useTransactions();

  const [filterType, setFilterType] = useState<"all" | "credit" | "debit">(
    "all"
  );

  const { openModal, closeModal, isOpen } = useModalState();

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
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Transactions Dashboard
          </h1>
          <p className="text-sm text-slate-600">
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
            <Button onClick={openModal} variant="primary">
              + Add Transaction
            </Button>

            <div className="flex gap-2">
              <Button
                onClick={handleExportCSV}
                className="flex-1 sm:flex-none flex items-center justify-center"
                variant="outline"
              >
                <Download className="w-4 h-4 mr-2" />
                Download as CSV
              </Button>
            </div>
          </div>
        </div>

        {filteredTransactions.length === 0 ? (
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-8 text-center h-[300px] flex items-center justify-center">
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

      <Modal
        open={isOpen}
        onClose={closeModal}
        title="Add New Transaction"
        subTitle="Enter the details of your transaction"
      >
        <TransactionForm
          onSubmit={(t) => {
            addTransaction(t);
            closeModal();
          }}
          onCancel={closeModal}
        />
      </Modal>
    </>
  );
}
