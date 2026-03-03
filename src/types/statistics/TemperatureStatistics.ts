export interface TemperatureStatistics {
  media: number;
  mediaNoOutlier: number;
  mediana: number;
  medianaNoOutlier: number;
  desvioPadrao: number;
  min: number;
  max: number;
  variancia: number;
  CVOutlier: number;
  CVNoOutlier: number;
  outliers: number[];
  totalOutliers: number;
  totalRecords: number;
}