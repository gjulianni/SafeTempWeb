export interface HistoryStats {
  min: number;
  max: number;
  desvioPadrao: number;
  variancia: number;
}

export interface DashboardData {
  lastRecord: {
    id: number;
    value: number;
    timestamp: string;
  };
  statistics: HistoryStats;
}