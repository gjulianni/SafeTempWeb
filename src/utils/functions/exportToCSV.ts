import type { TemperatureRecord } from "../../types/records/TemperatureRecord";
import type { TemperatureStatistics } from "../../types/statistics/TemperatureStatistics";

type CSVRow = Record<string, string | number | boolean | null | undefined>;

export const exportToCSV = (
   data: TemperatureRecord[] | TemperatureStatistics | undefined,
   fileName = "SafeTemp_Export"
) => {

  if (!data) {
    console.error("Nenhum dado disponível para exportação");
    return;
  }
 let rowsArray: CSVRow[] = [];
  
 if (Array.isArray(data)) {
    rowsArray = data as unknown as CSVRow[]; 
  } else {
    rowsArray = Object.entries(data).map(([chave, valor]) => ({
      Metrica: chave,
      Valor: Array.isArray(valor) ? valor.join(" | ") : (valor as string | number)
    }));
  }

  if (rowsArray.length === 0) return;

  const headers = Object.keys(rowsArray[0]).join(",");
  const body = rowsArray.map(obj => 
    Object.values(obj).map(val => `"${val}"`).join(",")
  ).join("\n");

  const csvContent = `${headers}\n${body}`;
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  const timestamp = new Date().toLocaleTimeString('pt-BR').replace(/:/g, '-');
  link.setAttribute("href", url);
  link.setAttribute("download", `${fileName}_${timestamp}.csv`);
  link.click();
};