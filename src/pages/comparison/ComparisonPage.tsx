import { useMemo, useState } from "react";
import { useComparison } from "../../hooks/useComparison";
import { LuActivity, LuArrowDownRight, LuArrowRightLeft, LuArrowUpRight, LuCalendar, LuInfo, LuRefreshCw, LuSettings2, LuShieldAlert, LuShieldCheck, LuShieldOff, LuSparkles, LuThermometer } from "react-icons/lu";
import Navbar from "../../components/nav/Navbar";
import { formatTimeBRT } from "../../utils/formatters/formatTimeBRT";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";
import ComparisonSummaryCard from "../../components/comparison/ComparisonSummaryCard";

export interface HistoryPoint {
  timestamp: string;   // ISO string
  value: number;       // temperatura (média se granular)
  samples?: number;    // quantos registros formaram o ponto (opcional)
}

const ComparisonPage = () => {

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

 
  const [dateA, setDateA] = useState("");
  const [dateB, setDateB] = useState("");
  const [granularity, setGranularity] = useState('10m');


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


const handleUpdate = () => {
    if (dateA && dateB) refetch();
  };

  const getReliabilityStyles = (reliability: string) => {
  switch (reliability) {
    case 'alta':
      return { 
        color: 'text-green-600', 
        border: 'border-green-500', 
        bg: 'bg-green-50', 
        icon: <LuShieldCheck size={18} />, 
        label: 'Dados Confiáveis' 
      };
    case 'limitada':
      return { 
        color: 'text-amber-600', 
        border: 'border-amber-500', 
        bg: 'bg-amber-50', 
        icon: <LuShieldAlert size={18} />, 
        label: 'Confiabilidade Limitada' 
      };
    case 'baixa':
      return { 
        color: 'text-red-600', 
        border: 'border-red-500', 
        bg: 'bg-red-50', 
        icon: <LuShieldOff size={18} />, 
        label: 'Atenção: Baixa Confiabilidade' 
      };
    default:
      return { 
        color: 'text-slate-500', 
        bg: 'bg-slate-50', 
        border: 'border-slate-200',
        icon: <LuInfo size={18} />, 
        label: 'Análise de Equilíbrio' 
      };
  }
};

  return (
    <div className="p-3 max-w-full mx-auto">
      <Navbar />

<section className="w-full mt-30 bg-white overflow-hidden p-8 lg:p-12 relative">
      
      {/* ESTA DIV É A CHAVE: 
          1. max-w-6xl ou 7xl define o limite máximo de onde o conteúdo pode se espalhar.
          2. mx-auto centraliza esse bloco no meio da section w-full.
          3. justify-center traz os dois lados para o centro.
          4. gap-24 (ou o valor que você preferir) define a distância exata entre o texto e o card.
      */}
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-64 mb-8">
        
        {/* Lado Esquerdo: Introdução */}
        <div className="flex-1 max-w-xl text-center lg:text-left z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-brand-purple/10 text-brand-purple rounded-full mb-6 text-[10px] font-black uppercase tracking-widest"
          >
            <LuArrowRightLeft size={14} /> Data Intelligence
          </motion.div>
          
          <h1 className="text-5xl lg:text-7xl font-black text-gray-900 tracking-tighter leading-[0.95] mb-8">
            Análise <span className="text-brand-purple">Relativa</span>
          </h1>
          
          <p className="text-gray-500 text-lg font-medium leading-relaxed">
            Estabeleça correlações térmicas comparando dois períodos distintos. 
            Identifique padrões de estabilidade, oscilações e outliers para validar 
            a integridade do seu experimento laboratorial.
          </p>
        </div>

        {/* Lado Direito: O Card de Tendências */}
      <div className="flex-1 relative w-full max-w-[580px] h-[340px] z-10">
  <motion.div
    initial={{ opacity: 0, scale: 0.9, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    className="p-8 rounded-[3.5rem] text-white shadow-[0_35px_60px_-15px_rgba(106,17,203,0.4)] w-full h-full bg-gradient-to-br from-brand-purple via-purple-600 to-purple-800 border border-white/20 flex flex-col justify-between overflow-hidden relative"
  >
    {/* Glow decorativo de fundo */}
    <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />

    {/* Header do Card */}
    <div className="flex items-center justify-between relative z-10">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 shadow-inner">
          <LuArrowRightLeft size={22} className="text-purple-100" />
        </div>
        <div>
          <h4 className="font-black text-xl tracking-tight leading-none">Tendências Cruzadas</h4>
          <p className="text-purple-200/50 text-[10px] font-bold uppercase tracking-widest mt-1">Cross-Period Analysis</p>
        </div>
      </div>
      <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">SafeTemp v3.0</div>
    </div>

    {/* Área de Conteúdo Central (Gráfico + Tabela Lado a Lado) */}
    <div className="flex items-center gap-8 py-4 relative z-10">
      
      {/* 1. Lado Esquerdo: Animação SVG das Linhas */}
      <div className="flex-1">
        <svg viewBox="0 0 100 50" className="w-full h-24 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          {/* Série A: Sólida */}
          <motion.path
            d="M0 35 Q 20 10, 40 25 T 80 15 T 100 5"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Série B: Tracejada */}
          <motion.path
            d="M0 20 Q 30 40, 50 20 T 80 30 T 100 10"
            fill="none"
            stroke="#FDBA74"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* 2. Lado Direito: Mini Tabela Comparativa (Estilo Log) */}
      <div className="w-[200px] shrink-0 font-mono text-[10px] bg-black/20 backdrop-blur-lg p-4 rounded-3xl border border-white/10 shadow-2xl">
        <div className="flex justify-between text-white/30 border-b border-white/5 pb-2 mb-2 font-black uppercase tracking-tighter">
          <span>Métrica</span>
          <span>A vs B</span>
        </div>
        
        <div className="space-y-2.5">
          <div className="flex justify-between items-center group">
            <span className="text-white/50 group-hover:text-white transition-colors">MÉDIA</span>
            <div className="flex items-center gap-1.5">
              <span className="text-white/90">25.4</span>
              <LuArrowRightLeft size={8} className="text-white/20" />
              <span className="text-green-400 font-bold">26.2</span>
            </div>
          </div>

          <div className="flex justify-between items-center group">
            <span className="text-white/50 group-hover:text-white transition-colors">VAR (%)</span>
            <div className="flex items-center gap-1.5">
              <span className="text-white/90">1.2</span>
              <LuArrowRightLeft size={8} className="text-white/20" />
              <span className="text-red-400 font-bold">0.8</span>
            </div>
          </div>

          <div className="flex justify-between items-center group">
            <span className="text-white/50 group-hover:text-white transition-colors">STAB.</span>
            <div className="flex items-center gap-1.5">
              <span className="text-white/90">HIGH</span>
              <LuArrowRightLeft size={8} className="text-white/20" />
              <span className="text-purple-300 font-bold underline decoration-dotted">CRIT</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Footer do Card */}
    <div className="flex items-center justify-between pt-4 border-t border-white/10 relative z-10">
      <div className="flex items-center gap-2 text-[9px] font-black uppercase text-purple-200/60 tracking-tighter">
        <LuSparkles size={12} className="animate-pulse" /> 
        AI Statistical Engine Active
      </div>
      <div className="flex gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
      </div>
    </div>
  </motion.div>
</div>
      </div>

      {/* 2. Parte Inferior: Barra de Seleção de Datas */}
      <div className="bg-gray-50/50 p-6 rounded-[0.5rem] border border-gray-100 flex flex-col lg:flex-row gap-6 items-end">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {/* Seletor Série A */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Período de Referência (A)</label>
            <div className="relative flex items-center">
              <LuCalendar className="absolute left-4 text-brand-purple" size={16} />
              <input 
                type="date" 
                value={dateA}
                onChange={(e) => setDateA(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl text-xs font-bold outline-none focus:ring-2 ring-brand-purple/20 transition-all cursor-pointer" 
              />
            </div>
          </div>

          {/* Seletor Série B */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Período de Comparação (B)</label>
            <div className="relative flex items-center">
              <LuCalendar className="absolute left-4 text-brand-orange" size={16} />
              <input 
                type="date" 
                value={dateB}
                onChange={(e) => setDateB(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl text-xs font-bold outline-none focus:ring-2 ring-brand-orange/20 transition-all cursor-pointer" 
              />
            </div>
          </div>
        </div>
        
        <button 
          onClick={handleUpdate}
          disabled={isLoading || !dateA || !dateB}
          className="w-full lg:w-auto px-12 py-4 bg-brand-purple text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-purple/20 disabled:opacity-30 flex items-center justify-center gap-3 cursor-pointer"
        >
          {isLoading ? (
            <LuRefreshCw className="animate-spin" size={18} />
          ) : (
            <LuArrowRightLeft size={18} />
          )}
          <span>Iniciar Comparação</span>
        </button>
      </div>
    </section>      {isLoading ? (
        <div className="p-20 text-center animate-pulse text-gray-400 font-bold">Gerando estatísticas térmicas...</div>
      ) : isError ? (
        <div className="p-10 text-center text-red-500 bg-red-50 rounded-[2rem] border border-red-100">
          <LuShieldAlert size={40} className="mx-auto mb-4 opacity-50" />
          <p className="font-bold">Erro ao carregar comparação.</p>
          <p className="text-xs opacity-70">Certifique-se de que ambos os períodos possuem dados registrados.</p>
        </div>
      ) : !data ? (
        // Estado Inicial (Placeholder)
        <div className="p-20 text-center bg-white rounded-[2rem] border-2 border-dashed border-gray-100">
          <LuCalendar size={48} className="mx-auto text-gray-200 mb-4" />
          <h3 className="text-xl font-bold text-gray-300">Escolha as datas acima para iniciar a análise.</h3>
        </div>
          ) : (
            // RESULTADOS (Só renderiza se 'data' existir e não houver erro)
            <div className="space-y-8 animate-in fade-in duration-700">
              {/* Gráficos */}
<section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  {/* CARD GRÁFICO - SÉRIE A */}
  <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50 flex flex-col">
    {/* Header: Título + Data Badge */}
    <div className="flex justify-between items-center mb-8">
      <div className="space-y-1">
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Tendência Série A</h3>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-brand-purple/10 text-brand-purple rounded-full text-[10px] font-black">
            {dateA || 'Selecione uma data'}
          </span>
        </div>
      </div>
      <div className="p-3 bg-gray-50 rounded-2xl text-brand-purple">
        <LuActivity size={20} />
      </div>
    </div>

    {/* Gráfico */}
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartDataA}>
          <defs>
            <linearGradient id="colorA" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#962fd6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#962fd6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="displayTime" 
            interval="preserveStartEnd" 
            minTickGap={60} 
            tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }}
            axisLine={false} 
            tickLine={false}
            dy={10}
          />
          <YAxis hide domain={['auto', 'auto']} />
          <Tooltip 
            contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
          />
          <Area type="monotone" dataKey="value" stroke="#962fd6" fill="url(#colorA)" strokeWidth={1.2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>

    {/* Footer: Seletor de Drill-down */}
    <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <LuSettings2 size={14} className="text-gray-300" />
        <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Drill-down</span>
      </div>
      <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
        {['1m', '5m', '10m', '30m', '1h'].map((opt) => (
          <button
            key={opt}
            onClick={() => setGranularity(opt)}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${
              granularity === opt 
                ? 'bg-brand-purple text-white shadow-lg shadow-brand-purple/20' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  </div>

  {/* CARD GRÁFICO - SÉRIE B (Repita a estrutura, mudando as cores e as variáveis para B) */}
  <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50 flex flex-col">
    <div className="flex justify-between items-center mb-8">
      <div className="space-y-1">
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Tendência Série B</h3>
        <span className="px-3 py-1 bg-brand-orange/10 text-brand-orange rounded-full text-[10px] font-black">
          {dateB || 'Selecione uma data'}
        </span>
      </div>
      <div className="p-3 bg-gray-50 rounded-2xl text-brand-orange">
        <LuActivity size={20} />
      </div>
    </div>

    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartDataB}>
          <defs>
            <linearGradient id="colorB" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ce6e46" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#ce6e46" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="displayTime" 
            interval="preserveStartEnd" 
            minTickGap={60} 
            tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }}
            axisLine={false} 
            tickLine={false}
            dy={10}
          />
          <YAxis hide domain={['auto', 'auto']} />
          <Tooltip contentStyle={{ borderRadius: '1rem', border: 'none' }} />
          <Area type="monotone" dataKey="value" stroke="#ce6e46" fill="url(#colorB)" strokeWidth={1.2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>

    <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <LuSettings2 size={14} className="text-gray-300" />
        <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Drill-down</span>
      </div>
      <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
        {['1m', '5m', '10m', '30m', '1h'].map((opt) => (
          <button
            key={opt}
            onClick={() => setGranularity(opt)}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${
              granularity === opt 
                ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  </div>
</section>

          {/* Cards de Paridade */}

<section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
  
  {/* 1. Lado Esquerdo: Equilíbrio de Amostragem (Releitura do anterior para o novo layout) */}
  {(() => {
    const reliabilityConfig = getReliabilityStyles(data.balanceAnalysis.reliability);
    const ratioPercent = (data.balanceAnalysis.ratio * 100).toFixed(0);

    return (
      <div className={`bg-white p-8 rounded-[2.5rem] border-t-8 ${reliabilityConfig.border} shadow-xl shadow-slate-200/40 flex flex-col justify-between`}>
        <div>
          <div className="flex justify-between items-center mb-8">
            <div className={`flex items-center gap-2 px-3 py-1 rounded-xl ${reliabilityConfig.bg} ${reliabilityConfig.color}`}>
              {reliabilityConfig.icon}
              <span className="text-[10px] font-black uppercase tracking-widest">{reliabilityConfig.label}</span>
            </div>
            <span className="text-2xl font-black text-slate-800">{ratioPercent}%</span>
          </div>

          <h3 className="text-xl font-black text-slate-800 mb-4">Equilíbrio de Amostragem</h3>
          
          <div className="relative h-2.5 w-full bg-slate-100 rounded-full overflow-hidden mb-8">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${ratioPercent}%` }}
              className={`absolute top-0 left-0 h-full ${reliabilityConfig.color.replace('text', 'bg')}`}
            />
          </div>

          {/* Versão compacta da grid de detalhes para caber no 50/50 */}
          <div className="space-y-4 p-6 bg-slate-50/50 rounded-3xl border border-slate-100">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-slate-400 uppercase">Série A (Ref)</span>
              <span className="text-sm font-black text-slate-700">{data.rangeA.totalRecords} regs</span>
            </div>
            <div className="h-[1px] bg-slate-200 w-full" />
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-slate-400 uppercase">Série B (Comp)</span>
              <span className="text-sm font-black text-slate-700">{data.rangeB.totalRecords} regs</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-start gap-3 p-4 bg-brand-orange/5 rounded-2xl border border-dashed border-brand-orange/20">
          <LuShieldAlert className="text-brand-orange mt-1 shrink-0" size={16} />
          <p className="text-[11px] text-slate-500 font-medium leading-relaxed italic">
            O desbalanceamento {data.balanceAnalysis.imbalanceLevel} pode influenciar a percepção de estabilidade entre os períodos.
          </p>
        </div>
      </div>
    );
  })()}

  {/* 2. Lado Direito: Sumário da IA */}
  <ComparisonSummaryCard summary={data.summary} />

</section>

          {/* Grupos de Estatísticas */}
               
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
        </div>
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