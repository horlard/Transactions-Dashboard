"use client";

import { useMemo, useState } from "react";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionsList";
import TransactionStats from "./TransactionsOverviewStats";
import { exportToCSV } from "@/lib/export";
import TransactionFilters from "./TransactionFilters";
import Button from "./ui/Button";
import { Download } from "lucide-react";
import Modal from "./ui/Modal";
import useModalState from "@/hooks/useModalState";
import { useTransactionsContext } from "@/context/TransactionsContext";
import Image from "next/image";

export default function TransactionDashboard() {
  const { transactions, addTransaction, deleteTransaction } =
    useTransactionsContext();

  const [filterType, setFilterType] = useState<"all" | "credit" | "debit">(
    "all"
  );

  const { openModal, closeModal, isOpen } = useModalState();

  const filteredTransactions = useMemo(() => {
    if (filterType === "all") {
      return transactions;
    }
    return transactions.filter((t) => t.type === filterType);
  }, [filterType, transactions]);

  const handleExportCSV = () => {
    const date = new Date();
    const exportTime = `${date.toLocaleDateString()}-${date.toLocaleTimeString()}`;
    exportToCSV({
      data: filteredTransactions,
      fileName:
        filterType === "all"
          ? `transactions_${exportTime}`
          : `transactions_${filterType}_${exportTime}`,
      headers: ["ID", "Description", "Amount", "Type", "Date"],
    });
  };

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-2">
          <div>
            <Image
              src="/afripay.svg"
              alt="AfriPay Logo"
              width={100}
              height={24}
            />
          </div>
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
                disabled={filteredTransactions.length === 0}
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
