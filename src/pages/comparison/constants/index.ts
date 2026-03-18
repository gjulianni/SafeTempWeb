export  const STATS_EXPLANATIONS = {
  "Média Térmica": "Representa o valor central das temperaturas. Útil para entender o patamar geral de calor na estufa.",
  "Variância": "Indica quão distantes os valores estão da média. Uma variância alta significa que a temperatura oscilou muito.",
  "Desvio Padrão": "Mostra a variação média em relação à média. É mais fácil de interpretar pois usa a mesma unidade (°C).",
  "Estabilidade (CV)": "O Coeficiente de Variação é a métrica definitiva: quanto menor o CV, mais estável foi o ambiente, independente da temperatura média."
};

export const getReliabilityConfig = (reliability: string) => {
  switch (reliability) {
    case 'boa':
      return { color: '#10B981', bg: '#F0FDF4', icon: 'check-decagram' as const, label: 'Dados Confiáveis' };
    case 'limitada':
      return { color: '#F59E0B', bg: '#FFFBEB', icon: 'alert-decagram' as const, label: 'Confiabilidade Limitada' };
    case 'baixa':
      return { color: '#EF4444', bg: '#FEF2F2', icon: 'shield-alert' as const, label: 'Atenção: Baixa Confiabilidade' };
    default:
      return { color: '#64748B', bg: '#F8FAFC', icon: 'information' as const, label: 'Análise de Equilíbrio' };
  }
};

export const smallChartConfigA = {
  backgroundColor: "#fff",
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 1, 
  color: (opacity = 1) => `rgba(106, 17, 203, ${opacity})`, 
  labelColor: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`, 
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "0", 
  },
  propsForBackgroundLines: {
    strokeDasharray: "", 
    stroke: "#E2E8F0",
  }
};

export const smallChartConfigB = {
  ...smallChartConfigA,
  color: (opacity = 1) => `rgba(206, 110, 70, ${opacity})`,
};