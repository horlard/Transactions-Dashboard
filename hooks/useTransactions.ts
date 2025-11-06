import { useEffect, useState } from "react";
import type { Transaction } from "@/lib/types";
import { generateUUID } from "@/lib/uuid";

const STORAGE_KEY = "transactions";

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setTransactions(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load transactions:", e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    }
  }, [transactions, isLoaded]);

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

  const editTransaction = (
    id: string,
    updatedFields: Partial<Omit<Transaction, "id">>
  ) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              ...updatedFields,
            }
          : t
      )
    );
  };

  return {
    transactions,
    addTransaction,
    deleteTransaction,
    editTransaction,
  };
}
