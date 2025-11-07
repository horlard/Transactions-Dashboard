type IObject = Record<string, any>;

interface ExportToCsvProps<T> {
  data: T[];
  fileName: string;
  headers: string[];
}

export function exportToCSV<T extends IObject>({
  data,
  fileName,
  headers,
}: ExportToCsvProps<T>) {
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
