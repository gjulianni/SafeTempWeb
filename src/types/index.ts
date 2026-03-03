import type { TemperatureRecord } from "./records/TemperatureRecord";
import type { TemperatureStatistics } from "./statistics/TemperatureStatistics";

export interface TemperatureHistoryResponse {
  records: TemperatureRecord[];
  statistics: TemperatureStatistics;
};