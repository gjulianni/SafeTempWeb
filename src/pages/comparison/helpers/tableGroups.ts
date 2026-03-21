// Helper: monta as linhas agrupadas para a tabela
const fmt = (val: number) => val.toFixed(2);
export const isDown = (diff: number) => diff < 0;

export const tableGroups = (data: any) => [
  {
    label: 'Tendência Central',
    rows: [
      { label: 'Média Térmica',  valB: `${fmt(data.rangeB.statistics.media)}°`,    valA: `${fmt(data.rangeA.statistics.media)}°`,    diff: data.comparison.metrics.media.absolute,       percent: data.comparison.metrics.media.percentage,       isInverse: false },
      { label: 'Mediana',        valB: `${fmt(data.rangeB.statistics.mediana)}°`,  valA: `${fmt(data.rangeA.statistics.mediana)}°`,  diff: data.comparison.metrics.mediana.absolute,     percent: data.comparison.metrics.mediana.percentage,     isInverse: false },
    ],
  },
  {
    label: 'Dispersão e Variabilidade',
    rows: [
      { label: 'Variância',       valB: `${fmt(data.rangeB.statistics.variancia)}°`,    valA: `${fmt(data.rangeA.statistics.variancia)}°`,    diff: data.comparison.metrics.variancia.absolute,    percent: data.comparison.metrics.variancia.percentage,    isInverse: true },
      { label: 'Desvio Padrão',   valB: `${fmt(data.rangeB.statistics.desvioPadrao)}°`, valA: `${fmt(data.rangeA.statistics.desvioPadrao)}°`, diff: data.comparison.metrics.desvioPadrao.absolute, percent: data.comparison.metrics.desvioPadrao.percentage, isInverse: true },
      { label: 'CV com Outliers', valB: `${fmt(data.rangeB.statistics.CVOutlier)}°`,    valA: `${fmt(data.rangeA.statistics.CVOutlier)}°`,    diff: data.comparison.metrics.CVOutlier.absolute,    percent: data.comparison.metrics.CVOutlier.percentage,    isInverse: true },
      { label: 'CV sem Outliers', valB: `${fmt(data.rangeB.statistics.CVNoOutlier)}°`,  valA: `${fmt(data.rangeA.statistics.CVNoOutlier)}°`,  diff: data.comparison.metrics.CVNoOutlier.absolute,  percent: data.comparison.metrics.CVNoOutlier.percentage,  isInverse: true },
    ],
  },
  {
    label: 'Extremos e Anomalias',
    rows: [
      { label: 'Amplitude Total',         valB: `${fmt(data.rangeB.statistics.max - data.rangeB.statistics.min)}°`, valA: `${fmt(data.rangeA.statistics.max - data.rangeA.statistics.min)}°`, diff: data.comparison.metrics.amplitude.absolute,    percent: data.comparison.metrics.amplitude.percentage,    isInverse: true },
      { label: 'Pico Térmico (Máx)',      valB: `${fmt(data.rangeB.statistics.max)}°`,           valA: `${fmt(data.rangeA.statistics.max)}°`,           diff: data.rangeB.statistics.max - data.rangeA.statistics.max,                                                                                     percent: ((data.rangeB.statistics.max - data.rangeA.statistics.max) / data.rangeA.statistics.max) * 100,           isInverse: false },
      { label: 'Frequência de Outliers',  valB: `${data.rangeB.statistics.totalOutliers}`,       valA: `${data.rangeA.statistics.totalOutliers}`,       diff: data.rangeB.statistics.totalOutliers - data.rangeA.statistics.totalOutliers, percent: (((data.rangeB.statistics.totalOutliers - data.rangeA.statistics.totalOutliers) / (data.rangeA.statistics.totalOutliers || 1)) * 100), isInverse: true },
    ],
  },
];

export const buildExportRows = (data: any) =>
  tableGroups(data).flatMap((group) =>
    group.rows.map((row) => ({
      Grupo: group.label,
      Metrica: row.label,
      SerieB: row.valB,
      SerieA: row.valA,
      Variacao_Absoluta: row.diff.toFixed(4),
      Variacao_Percentual: `${row.percent.toFixed(2)}%`,
    }))
  );