"use client";
import TransactionDashboard from "../components/TransactionDashboard";

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <TransactionDashboard />
    </main>
  );
}
