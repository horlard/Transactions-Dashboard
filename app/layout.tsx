import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TransactionsProvider } from "@/context/TransactionsContext";

const _inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AfriPay Transactions Dashboard",
  description:
    "A simple transaction dashboard built with Next.js and TypeScript.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <TransactionsProvider>{children}</TransactionsProvider>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
