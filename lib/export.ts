import { IObject } from "./types";

interface ExportToCsvProps {
  data: IObject[];
  fileName: string;
  headers: string[];
}

export function exportToCSV({ data, fileName, headers }: ExportToCsvProps) {
  const rows = data.map((t) => Object.values(t));

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
