"use client";

import { createContext, useContext } from "react";
import { useTransactions } from "@/hooks/useTransactions";

type TransactionsContextValue = ReturnType<typeof useTransactions>;

const TransactionsContext = createContext<TransactionsContextValue | null>(
  null
);

export function TransactionsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const transactions = useTransactions();
  return (
    <TransactionsContext.Provider value={transactions}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactionsContext() {
  const ctx = useContext(TransactionsContext);
  if (!ctx) {
    throw new Error(
      "useTransactionsContext must be used within TransactionsProvider"
    );
  }
  return ctx;
}
