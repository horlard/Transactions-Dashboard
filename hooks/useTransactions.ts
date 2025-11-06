import { useState } from "react";
import type { Transaction } from "@/lib/types";
import { generateUUID } from "@/lib/uuid";

const STORAGE_KEY = "transactions";

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to load transactions:", e);
      }
    }
    return [];
  });

  const addTransaction = (newTransaction: Omit<Transaction, "id">) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: generateUUID(),
    };
    setTransactions((prev) => [transaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const clearTransactions = () => {
    setTransactions([]);
  };

  return {
    transactions,
    addTransaction,
    deleteTransaction,
    clearTransactions,
  };
}
