import type { TemperatureStatistics } from "../../types/statistics/TemperatureStatistics";
import type { TemperatureRecord } from "../../types/records/TemperatureRecord";

export const exportToJSON = (
  data: TemperatureStatistics | TemperatureRecord[] | undefined, 
  fileName = "SafeTemp_Data"
) => {
  if (!data) {
    console.error("Nenhum dado disponível para exportação em JSON.");
    return;
  }

  const jsonString = JSON.stringify(data, null, 2);

  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  
  link.href = url;
  link.download = `${fileName}_${timestamp}.json`;
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};