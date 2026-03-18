import { useMemo, useState } from "react";
import { useComparison } from "../../hooks/useComparison";
import { LuActivity, LuArrowDownRight, LuArrowRightLeft, LuArrowUpRight, LuCheckCheck, LuShieldAlert, LuShieldCheck, LuThermometer } from "react-icons/lu";
import Navbar from "../../components/nav/Navbar";
import { formatTimeBRT, getLocalDateString } from "../../utils/formatters/formatTimeBRT";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export interface HistoryPoint {
  timestamp: string;   // ISO string
  value: number;       // temperatura (média se granular)
  samples?: number;    // quantos registros formaram o ponto (opcional)
}

const ComparisonPage = () => {

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

 
  const [dateA, setDateA] = useState(getLocalDateString(yesterday));
  const [dateB, setDateB] = useState(getLocalDateString(new Date()));


 const { data, isLoading, isError, refetch } = useComparison({ 
    rangeA: dateA, 
    rangeB: dateB,
    granularity: '10m'
  });

  const seriesA = data?.seriesA || [];
  const seriesB = data?.seriesB || [];

  const chartDataA = useMemo(() => {
    return seriesA.map((p: HistoryPoint) => ({ 
      displayTime: formatTimeBRT(p.timestamp), 
      value: p.value 
    }));
  }, [seriesA]);

  const chartDataB = useMemo(() => {
    return seriesB.map((p: HistoryPoint) => ({ 
      displayTime: formatTimeBRT(p.timestamp), 
      value: p.value 
    }));
  }, [seriesB]);

  if (isLoading) {
    return <div className="p-20 text-center animate-pulse">Carregando análise...</div>;
  }

  if (isError || !data) {
    return <div className="p-20 text-center text-red-500">Erro ao carregar comparação.</div>;
  }
 
  const handleDateAChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateA(e.target.value);
  };

  const handleDateBChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateB(e.target.value);
  };

  const handleUpdate = () => {
    refetch();
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <Navbar />

      <header className="flex flex-col md:flex-row justify-between items-end gap-6 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-50">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-gray-800">Comparação de Períodos</h2>
          <p className="text-sm text-gray-400 font-medium">Analise a evolução térmica entre duas datas distintas</p>
        </div>

        <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-3xl border border-gray-100">
          <div className="flex flex-col px-4">
            <span className="text-[10px] font-black text-brand-purple uppercase tracking-widest">Série A</span>
            <input 
              type="date" 
              value={dateA} 
              onChange={handleDateAChange}
              className="bg-transparent font-bold text-sm outline-none cursor-pointer"
            />
          </div>
          
          <div className="p-2 bg-white rounded-full shadow-sm text-gray-300">
            <LuArrowRightLeft size={18} />
          </div>

          <div className="flex flex-col px-4">
            <span className="text-[10px] font-black text-brand-orange uppercase tracking-widest">Série B</span>
            <input 
              type="date" 
              value={dateB} 
              onChange={handleDateBChange}
              className="bg-transparent font-bold text-sm outline-none cursor-pointer"
            />
          </div>

          <button 
            onClick={handleUpdate}
            disabled={isLoading}
            className="bg-brand-purple text-white px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-brand-purple/20 disabled:opacity-50"
          >
            {isLoading ? 'Carregando...' : 'Atualizar'}
          </button>
        </div>
      </header>

      {/* Renderização condicional dos dados vindos do hook */}
      {isLoading ? (
        <div className="flex justify-center p-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-brand-purple" />
        </div>
      ) : isError ? (
        <div className="p-10 text-center text-red-500 bg-red-50 rounded-[2rem]">
          Erro ao carregar comparação. Verifique os períodos selecionados.
        </div>
      ) : (
        <>
       <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white p-6 rounded-[2rem] border-l-4 border-l-green-500 shadow-sm flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <div className="p-3 bg-green-50 text-green-500 rounded-2xl">
              <LuCheckCheck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-gray-800">Equilíbrio de Amostragem</h4>
              <p className="text-xs text-gray-400">Dados equivalentes para uma análise robusta</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-gray-800">98%</span>
            <p className="text-[10px] font-black text-gray-300 uppercase">Paridade</p>
          </div>
        </div>

        <div className="bg-brand-purple text-white p-6 rounded-[2rem] shadow-xl shadow-brand-purple/10 flex flex-col justify-center">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Veredito</span>
          <p className="text-lg font-bold">Período B é 12% mais estável</p>
        </div>
      </section>

      {/* 3. Gráficos Comparativos Lado a Lado */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-50">
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Tendência Série A</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartDataA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                <XAxis dataKey="displayTime" hide />
                <YAxis hide domain={['auto', 'auto']} />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#962fd6" fill="#962fd6" fillOpacity={0.1} strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-50">
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Tendência Série B</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartDataB}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                <XAxis dataKey="displayTime" hide />
                <YAxis hide domain={['auto', 'auto']} />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#ce6e46" fill="#ce6e46" fillOpacity={0.1} strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
<section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-50 space-y-12">
  <div className="space-y-2">
    <h3 className="text-2xl font-black text-gray-800">Detalhamento Estatístico</h3>
    <p className="text-sm text-gray-400 font-medium">Análise comparativa agrupada por indicadores técnicos</p>
  </div>

  {/* GRUPO 1: Tendência Central (Média e Mediana) */}
  <div className="space-y-4">
    <h4 className="text-[10px] font-black uppercase text-brand-purple tracking-[0.2em] ml-4">Tendência Central</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <MetricComparisonCard 
        label="Média Térmica" 
        valA={data.rangeA.statistics.media} 
        valB={data.rangeB.statistics.media} 
        diff={data.comparison.metrics.media.absolute} 
        percent={data.comparison.metrics.media.percentage} 
        icon={<LuThermometer />}
      />
      <MetricComparisonCard 
        label="Mediana" 
        valA={data.rangeA.statistics.mediana} 
        valB={data.rangeB.statistics.mediana} 
        diff={data.comparison.metrics.mediana.absolute} 
        percent={data.comparison.metrics.mediana.percentage} 
        icon={<LuThermometer className="rotate-90" />}
      />
    </div>
  </div>

  {/* GRUPO 2: Dispersão e Variabilidade (Variância e Desvio Padrão) */}
  <div className="space-y-4">
    <h4 className="text-[10px] font-black uppercase text-brand-purple tracking-[0.2em] ml-4">Dispersão e Variabilidade</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <MetricComparisonCard 
        label="Variância" 
        valA={data.rangeA.statistics.variancia} 
        valB={data.rangeB.statistics.variancia} 
        diff={data.comparison.metrics.variancia.absolute} 
        percent={data.comparison.metrics.variancia.percentage} 
        icon={<LuActivity />}
        isInverse
      />
      <MetricComparisonCard 
        label="Desvio Padrão" 
        valA={data.rangeA.statistics.desvioPadrao} 
        valB={data.rangeB.statistics.desvioPadrao} 
        diff={data.comparison.metrics.desvioPadrao.absolute} 
        percent={data.comparison.metrics.desvioPadrao.percentage} 
        icon={<LuActivity />}
        isInverse
      />
    </div>
  </div>

  {/* GRUPO 3: Estabilidade Relativa (CV com e sem Outliers) */}
  <div className="space-y-4">
    <h4 className="text-[10px] font-black uppercase text-brand-purple tracking-[0.2em] ml-4">Estabilidade de Amostragem</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <MetricComparisonCard 
        label="CV (Com Outliers)" 
        valA={data.rangeA.statistics.CVOutlier} 
        valB={data.rangeB.statistics.CVOutlier} 
        diff={data.comparison.metrics.CVOutlier.absolute} 
        percent={data.comparison.metrics.CVOutlier.percentage} 
        icon={<LuActivity />}
        isInverse
      />
      <MetricComparisonCard 
        label="CV (Sem Outliers)" 
        valA={data.rangeA.statistics.CVNoOutlier} 
        valB={data.rangeB.statistics.CVNoOutlier} 
        diff={data.comparison.metrics.CVNoOutlier.absolute} 
        percent={data.comparison.metrics.CVNoOutlier.percentage} 
        icon={<LuActivity />}
        isInverse
      />
    </div>
  </div>

  {/* GRUPO 4: Extremos e Anomalias (Min, Max, Outliers) */}
  <div className="space-y-4">
    <h4 className="text-[10px] font-black uppercase text-brand-purple tracking-[0.2em] ml-4">Extremos e Anomalias</h4>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Amplitude: Diferença entre Max e Min */}
      <MetricComparisonCard 
        label="Amplitude Total" 
        valA={data.rangeA.statistics.max - data.rangeA.statistics.min} 
        valB={data.rangeB.statistics.max - data.rangeB.statistics.min} 
        diff={data.comparison.metrics.amplitude.absolute} 
        percent={data.comparison.metrics.amplitude.percentage} 
        icon={<LuActivity />}
        isInverse
      />
      
      {/* Total de Outliers: Diferença absoluta entre os dois períodos */}
      <MetricComparisonCard 
        label="Frequência de Outliers" 
        valA={data.rangeA.statistics.totalOutliers} 
        valB={data.rangeB.statistics.totalOutliers} 
        diff={data.rangeB.statistics.totalOutliers - data.rangeA.statistics.totalOutliers} 
        percent={(((data.rangeB.statistics.totalOutliers - data.rangeA.statistics.totalOutliers) / (data.rangeA.statistics.totalOutliers || 1)) * 100)} 
        icon={<LuShieldAlert />}
        isInverse
      />

      {/* Sugestão Extra: Máxima Registrada */}
      <MetricComparisonCard 
        label="Pico Térmico (Máx)" 
        valA={data.rangeA.statistics.max} 
        valB={data.rangeB.statistics.max} 
        diff={data.rangeB.statistics.max - data.rangeA.statistics.max} 
        percent={((data.rangeB.statistics.max - data.rangeA.statistics.max) / data.rangeA.statistics.max) * 100} 
        icon={<LuActivity className="text-orange-500" />}
        isInverse
      />
    </div>
  </div>
</section>
<section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  
  {/* Card Principal de Paridade */}
  <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50 space-y-6">
    <div className="flex justify-between items-start">
      <div className="space-y-1">
        <h4 className="text-lg font-black text-gray-800">Equilíbrio de Amostragem</h4>
        <p className="text-xs text-gray-400 font-medium">Paridade entre o volume de dados dos períodos A e B</p>
      </div>
      <div className="text-right">
        <span className="text-3xl font-black text-brand-purple">
          {(data.balanceAnalysis.ratio * 100).toFixed(0)}%
        </span>
        <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Ratio de Paridade</p>
      </div>
    </div>

    {/* Barra de Progresso Visual */}
    <div className="relative h-4 w-full bg-gray-100 rounded-full overflow-hidden">
      <div 
        className="absolute top-0 left-0 h-full bg-brand-purple transition-all duration-1000 ease-out rounded-full"
        style={{ width: `${(data.balanceAnalysis.ratio * 100)}%` }}
      />
    </div>

    {/* Detalhes de Registros */}
    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-50">
      <div className="text-center">
        <p className="text-[10px] font-bold text-gray-400 uppercase">Série A</p>
        <p className="text-sm font-black text-gray-700">{data.balanceAnalysis.recordsA} regs</p>
      </div>
      <div className="w-[1px] h-8 bg-gray-100 mx-auto" />
      <div className="text-center">
        <p className="text-[10px] font-bold text-gray-400 uppercase">Série B</p>
        <p className="text-sm font-black text-gray-700">{data.balanceAnalysis.recordsB} regs</p>
      </div>
    </div>
  </div>

  {/* Card de Nível de Confiabilidade */}
  <div className={`p-8 rounded-[2.5rem] flex flex-col justify-between shadow-lg transition-all ${
    data.balanceAnalysis.reliability === 'alta' ? 'bg-green-600 text-white shadow-green-200' :
    data.balanceAnalysis.reliability === 'limitada' ? 'bg-amber-500 text-white shadow-amber-200' :
    'bg-red-500 text-white shadow-red-200'
  }`}>
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <LuShieldCheck size={24} />
        <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Status Técnico</span>
      </div>
      <h3 className="text-2xl font-black capitalize">Confiabilidade {data.balanceAnalysis.reliability}</h3>
      <p className="text-sm font-medium opacity-90 leading-relaxed">
        {data.balanceAnalysis.reliability === 'alta' 
          ? "Os volumes de dados são equivalentes, permitindo uma análise estatística robusta." 
          : `O desequilíbrio ${data.balanceAnalysis.imbalanceLevel} de amostras pode influenciar as médias.`}
      </p>
    </div>

    <div className="pt-6 border-t border-white/20">
      <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Nível de Imbalanço</span>
      <p className="text-lg font-bold uppercase italic">{data.balanceAnalysis.imbalanceLevel}</p>
    </div>
  </div>
</section>
        </>
      )}
    </div>
  );
};

const MetricComparisonCard = ({ label, valA, valB, diff, percent, icon, isInverse = false }: any) => {
  const isPositive = diff > 0;
  const isBetter = isInverse ? !isPositive : isPositive;
  const color = isBetter ? "text-green-500" : "text-red-500";

  const format = (val: number | string | null | undefined) => {
    const num = Number(val);
    return isNaN(num) ? "0.00" : num.toFixed(2);
  };

  return (
    <div className="p-6 bg-gray-50 rounded-[2rem] border border-transparent hover:border-gray-100 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-white rounded-xl text-brand-purple shadow-sm">{icon}</div>
        <div className={`flex items-center gap-1 text-[10px] font-black uppercase ${color}`}>
          {isPositive ? <LuArrowUpRight /> : <LuArrowDownRight />}
          {format(percent)}%
        </div>
      </div>
      
      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
      
      <div className="flex items-baseline gap-4 mt-2">
        <div className="flex flex-col">
          <span className="text-2xl font-black text-gray-800">{format(valB)}°</span>
          <span className="text-[9px] font-bold text-gray-300 uppercase">Série B</span>
        </div>
        <div className="h-8 w-[1px] bg-gray-200 mx-2" />
        <div className="flex flex-col">
          <span className="text-lg font-bold text-gray-400 line-through decoration-gray-200">{format(valA)}°</span>
          <span className="text-[9px] font-bold text-gray-300 uppercase">Série A</span>
        </div>
      </div>
    </div>
  );
};

export default ComparisonPage;