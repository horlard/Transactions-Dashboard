"use client";

import { formatCurrency } from "@/lib/currency";
import { formatDate } from "@/lib/date";
import type { Transaction } from "@/lib/types";
import { PencilIcon, Trash2Icon } from "lucide-react";
import Button from "./ui/Button";
import Badge from "./ui/Badge";
import Modal from "./ui/Modal";
import useModalState from "@/hooks/useModalState";
import { useState } from "react";
import TransactionForm from "./TransactionForm";
import { useTransactionsContext } from "@/context/TransactionsContext";

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export default function TransactionList({
  transactions,
  onDelete,
}: TransactionListProps) {
  const {
    openModal: openDetailsModal,
    closeModal: closeDetailsModal,
    isOpen: isDetailsModalOpen,
  } = useModalState();

  const {
    openModal: openEditModal,
    closeModal: closeEditModal,
    isOpen: isEditModalOpen,
  } = useModalState();

  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const { editTransaction } = useTransactionsContext();
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
                  onClick={() => {
                    openDetailsModal();
                    setSelectedTransaction(transaction);
                  }}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <td className="py-3  text-slate-600 text-xs">
                    {transaction.id.slice(0, 8)}
                  </td>
                  <td className="py-3  text-slate-900 max-w-[100px] truncate pr-3">
                    {transaction.description}
                  </td>
                  <td className="py-3  font-semibold text-slate-900">
                    ₦ {formatCurrency(transaction.amount)}
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
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTransaction(transaction);
                        openEditModal();
                      }}
                      variant="ghost"
                    >
                      <PencilIcon className="w-4 h-4 cursor-pointer text-blue-500" />
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(transaction.id);
                      }}
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
              onClick={() => {
                setSelectedTransaction(transaction);
                openDetailsModal();
              }}
            >
              <p className="text-xs text-slate-500">
                ID: {transaction.id.slice(0, 8)}
              </p>
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 max-w-[200px] truncate">
                    {transaction.description}
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatDate(transaction.date)}
                  </p>
                </div>

                <div>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTransaction(transaction);
                      openEditModal();
                    }}
                    variant="ghost"
                  >
                    <PencilIcon className="w-4 h-4 cursor-pointer text-blue-500" />
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(transaction.id);
                    }}
                    variant="ghost"
                  >
                    <Trash2Icon className="w-4 h-4 cursor-pointer text-red-500" />
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                <Badge
                  variant={transaction.type === "credit" ? "success" : "error"}
                >
                  {transaction.type === "credit" ? "Credit" : "Debit"}
                </Badge>
                <span className="font-semibold text-slate-900">
                  ₦ {formatCurrency(transaction.amount)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        open={isDetailsModalOpen && !!selectedTransaction}
        onClose={() => {
          closeDetailsModal();
          setSelectedTransaction(null);
        }}
        title="Transaction Details"
        contentClassName="!max-w-lg"
      >
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-sm text-slate-600 mb-2 font-medium">Amount</p>
            <p className=" text-slate-900 break-all">
              ₦ {formatCurrency(selectedTransaction?.amount as number)}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-600 mb-2 font-medium">
              Transaction ID
            </p>
            <p className=" text-slate-900 break-all">
              {selectedTransaction?.id}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-2 font-medium">Type</p>
            <p className=" text-slate-900 break-all">
              {selectedTransaction?.type === "credit" ? "Credit" : "Debit"}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-2 font-medium">
              Description:
            </p>
            <p className=" text-slate-900 break-all">
              {selectedTransaction?.description}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-600 mb-2 font-medium">Date</p>
            <p className=" text-slate-900 break-all">
              {formatDate(selectedTransaction?.date as string)}
            </p>
          </div>
        </div>
      </Modal>

      <Modal
        open={isEditModalOpen && !!selectedTransaction}
        onClose={closeEditModal}
        title="Edit Transaction"
        subTitle="Modify the details of your transaction"
      >
        <TransactionForm
          onSubmit={(t) => {
            editTransaction(selectedTransaction!.id, t);
            closeEditModal();
          }}
          onCancel={closeEditModal}
          transaction={selectedTransaction as Transaction}
        />
      </Modal>
    </div>
  );
}
