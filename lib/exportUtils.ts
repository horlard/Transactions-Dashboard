import type { Transaction } from "./types";

export function exportToCSV(transactions: Transaction[], fileName: string) {
  const headers = ["ID", "Description", "Amount", "Type", "Date"];
  const rows = transactions.map((t) => [
    t.id,
    t.description,
    t.amount,
    t.type,
    t.date,
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  downloadFile(blob, `${fileName}.csv`);
}

function downloadFile(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
