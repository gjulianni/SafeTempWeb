import { useEffect, useMemo, useState } from "react";
import { useComparison } from "../../hooks/useComparison";
import { LuActivity, LuArrowDownRight, LuArrowRightLeft, LuArrowUpRight, LuCalendar, LuDownload, LuFileText, LuInfo, LuRefreshCw, LuSettings2, LuShieldAlert, LuShieldCheck, LuShieldOff, LuSparkles, LuThermometer } from "react-icons/lu";
import Navbar from "../../components/nav/Navbar";
import { formatTimeBRT } from "../../utils/formatters/formatTimeBRT";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";
import ComparisonSummaryCard from "../../components/comparison/ComparisonSummaryCard";
import { buildExportRows, isDown, tableGroups } from "./helpers/tableGroups";
import { exportToJSON } from "../../utils/functions/exportToJSON";
import { exportToCSV } from "../../utils/functions/exportToCSV";
import { LuTable2, LuChartBar } from 'react-icons/lu';

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
  const [activeTab, setActiveTab] = useState<'table' | 'charts'>('table');

 const { data, isLoading, isError, refetch } = useComparison({ 
    rangeA: dateA, 
    rangeB: dateB,
    granularity,
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

useEffect(() => {
  if (dateA && dateB) refetch();
}, [granularity]);


  const getReliabilityStyles = (reliability: string) => {
  switch (reliability) {
    case 'boa':
      return { 
        color: 'text-green-600', 
        border: 'border-green-500', 
        bg: 'bg-green-50', 
        progressBar: 'bg-green-500',
        icon: <LuShieldCheck size={18} />, 
        label: 'Dados Confiáveis' 
      };
    case 'limitada':
      return { 
        color: 'text-amber-600', 
        border: 'border-amber-500', 
        bg: 'bg-amber-50', 
        progressBar: 'bg-amber-500',
        icon: <LuShieldAlert size={18} />, 
        label: 'Confiabilidade Limitada' 
      };
    case 'baixa':
      return { 
        color: 'text-red-600', 
        border: 'border-red-500', 
        bg: 'bg-red-50', 
        progressBar: 'bg-red-500',  
        icon: <LuShieldOff size={18} />, 
        label: 'Atenção: Baixa Confiabilidade' 
      };
    default:
      return { 
        color: 'text-slate-500', 
        bg: 'bg-slate-50', 
        border: 'border-slate-200',
        progressBar: 'bg-slate-400',
        icon: <LuInfo size={18} />, 
        label: 'Análise de Equilíbrio' 
      };
  }
};

  return (
    <div className="p-3 max-w-full mx-auto">
      <Navbar />

<section className="w-full mt-30 bg-white overflow-hidden p-8 lg:p-12 relative">
      
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-64 mb-8">
        
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

      <div className="flex-1 relative w-full max-w-[580px] h-[340px] z-10">
  <motion.div
    initial={{ opacity: 0, scale: 0.9, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    className="p-8 rounded-[1.5rem] text-white shadow-[0_35px_60px_-15px_rgba(106,17,203,0.4)] w-full h-full bg-gradient-to-br from-brand-purple via-purple-600 to-purple-800 border border-white/20 flex flex-col justify-between overflow-hidden relative"
  >
  
    <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />

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

    <div className="flex items-center gap-8 py-4 relative z-10">
      
      <div className="flex-1">
        <svg viewBox="0 0 100 50" className="w-full h-24 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
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

    <div className="flex items-center justify-between pt-4 border-t border-white/10 relative z-10">
      <div className="flex items-center gap-2 text-[9px] font-black uppercase text-purple-200/60 tracking-tighter">
        <LuSparkles size={12} className="animate-pulse" /> 
        SafeTemp Engine
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

      <div className="bg-gray-50/50 p-6 rounded-[0.5rem] border border-gray-100 flex flex-col lg:flex-row gap-6 items-end">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
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
        <div className="p-20 text-center bg-white rounded-[2rem] border-2 border-dashed border-gray-100">
          <LuCalendar size={48} className="mx-auto text-gray-200 mb-4" />
          <h3 className="text-xl font-bold text-gray-300">Escolha as datas acima para iniciar a análise.</h3>
        </div>
          ) : (
            <div className="space-y-8 animate-in fade-in duration-700">
<section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50 flex flex-col">
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

    <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <LuSettings2 size={14} className="text-gray-300" />
        <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Drill-down</span>
      </div>
      <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
        {['1m', '5m', '10m', '15m', '30m', '1h'].map((opt) => (
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
        {['1m', '5m', '10m', '15m', '30m', '1h'].map((opt) => (
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

<section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

  {/* SUMÁRIO DA IA — ocupa 2/3 da largura */}
  <div className="lg:col-span-2">
    <ComparisonSummaryCard summary={data.summary} 
      statisticsA={data.rangeA.statistics}
  statisticsB={data.rangeB.statistics}
  metrics={data.comparison.metrics}
    />
  </div>

  {/* EQUILÍBRIO DE AMOSTRAGEM — ocupa 1/3 da largura */}
  {(() => {
    const reliabilityConfig = getReliabilityStyles(data.balanceAnalysis.reliability);
    const ratioPercent = (data.balanceAnalysis.ratio * 100).toFixed(1);

    return (
      <div className={`bg-white p-8 rounded-[2.5rem] border-t-8 ${reliabilityConfig.border} shadow-xl shadow-slate-200/40`}>

        {/* Badge + percentual */}
        <div className="flex justify-between items-center mb-6">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-xl ${reliabilityConfig.bg} ${reliabilityConfig.color}`}>
            {reliabilityConfig.icon}
            <span className="text-[10px] font-black uppercase tracking-widest">{reliabilityConfig.label}</span>
          </div>
          <span className="text-2xl font-black text-slate-800">{ratioPercent}%</span>
        </div>

        {/* Título */}
        <h3 className="text-xl font-black text-slate-800 mb-4">Equilíbrio de Amostragem</h3>

        {/* Barra de progresso */}
        <div className="relative h-2.5 w-full bg-slate-100 rounded-full overflow-hidden mb-8">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${ratioPercent}%` }}
            className={`absolute top-0 left-0 h-full ${reliabilityConfig.progressBar}`}
          />
        </div>

        {/* Registros */}
        <div className="space-y-4 p-5 bg-slate-50/50 rounded-2xl border border-slate-100 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-purple shrink-0" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Série A (Ref)</span>
            </div>
            <span className="text-sm font-black text-slate-700">{data.rangeA.totalRecords} regs</span>
          </div>
          <div className="h-[1px] bg-slate-200 w-full" />
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-orange shrink-0" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Série B (Comp)</span>
            </div>
            <span className="text-sm font-black text-slate-700">{data.rangeB.totalRecords} regs</span>
          </div>
        </div>

        {/* Aviso de desbalanceamento */}
        <div className="flex items-start gap-3 p-4 bg-brand-orange/5 rounded-2xl border border-dashed border-brand-orange/20">
          <LuShieldAlert className="text-brand-orange mt-0.5 shrink-0" size={16} />
          <p className="text-[11px] text-slate-500 font-medium leading-relaxed italic">
            O desbalanceamento {data.balanceAnalysis.imbalanceLevel} pode influenciar a percepção de estabilidade entre os períodos.
          </p>
        </div>

      </div>
    );
  })()}

</section>
               
{/* Grupos de Estatísticas */}
{(() => {

  const chartGroups = [
    {
      label: 'Tendência Central',
      rows: [
        { label: 'Média Térmica',   valA: data.rangeA.statistics.media,       valB: data.rangeB.statistics.media },
        { label: 'Mediana',         valA: data.rangeA.statistics.mediana,     valB: data.rangeB.statistics.mediana },
      ],
    },
    {
      label: 'Dispersão e Variabilidade',
      rows: [
        { label: 'Variância',       valA: data.rangeA.statistics.variancia,    valB: data.rangeB.statistics.variancia },
        { label: 'Desvio Padrão',   valA: data.rangeA.statistics.desvioPadrao, valB: data.rangeB.statistics.desvioPadrao },
        { label: 'CV com Outliers', valA: data.rangeA.statistics.CVOutlier,    valB: data.rangeB.statistics.CVOutlier },
        { label: 'CV sem Outliers', valA: data.rangeA.statistics.CVNoOutlier,  valB: data.rangeB.statistics.CVNoOutlier },
      ],
    },
    {
      label: 'Extremos e Anomalias',
      rows: [
        { label: 'Amplitude Total', valA: data.rangeA.statistics.max - data.rangeA.statistics.min, valB: data.rangeB.statistics.max - data.rangeB.statistics.min },
        { label: 'Pico Térmico',    valA: data.rangeA.statistics.max,          valB: data.rangeB.statistics.max },
      ],
    },
  ];

  return (
    <section className="bg-white rounded-[2.5rem] shadow-sm border border-gray-50 overflow-hidden">

      {/* Header */}
      <div className="flex justify-between items-end px-10 pt-10 pb-0 border-b border-gray-50">
        <div className="space-y-1 pb-5">
          <h3 className="text-2xl font-black text-gray-800">Detalhamento Estatístico</h3>
          <p className="text-sm text-gray-400 font-medium">Análise comparativa agrupada por indicadores técnicos</p>
        </div>
        <div className="flex items-center gap-3 pb-5">
          <button
            onClick={() => exportToCSV(buildExportRows(data) as any, `SafeTemp_Comparacao_${dateA}_vs_${dateB}`)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 text-[11px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all cursor-pointer"
          >
            <LuDownload size={13} /> CSV
          </button>
          <button
            onClick={() => exportToJSON(buildExportRows(data) as any, `SafeTemp_Comparacao_${dateA}_vs_${dateB}`)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-purple text-white text-[11px] font-black uppercase tracking-widest hover:opacity-90 transition-all cursor-pointer"
          >
            <LuFileText size={13} /> JSON
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 px-10 border-b border-gray-100">
        {([
          { key: 'table',  label: 'Tabela',       icon: <LuTable2 size={14} /> },
          { key: 'charts', label: 'Visualização',  icon: <LuChartBar size={14} /> },
        ] as const).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-widest border-b-2 -mb-px transition-all cursor-pointer ${
              activeTab === tab.key
                ? 'text-brand-purple border-brand-purple'
                : 'text-gray-400 border-transparent hover:text-gray-600'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Tabela */}
      {activeTab === 'table' && (
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left text-[10px] font-black uppercase tracking-[0.12em] text-gray-400 px-10 py-4 border-b border-gray-50">Métrica</th>
              <th className="text-right text-[10px] font-black uppercase tracking-[0.12em] text-gray-400 px-10 py-4 border-b border-gray-50">Série B</th>
              <th className="text-right text-[10px] font-black uppercase tracking-[0.12em] text-gray-400 px-10 py-4 border-b border-gray-50">Série A</th>
              <th className="text-right text-[10px] font-black uppercase tracking-[0.12em] text-gray-400 px-10 py-4 border-b border-gray-50">Variação</th>
            </tr>
          </thead>
          <tbody>
            {tableGroups(data).map((group) => (
              <>
                <tr key={group.label}>
                  <td colSpan={4} className="text-[9px] font-black uppercase tracking-[0.16em] text-brand-purple bg-brand-purple/[0.03] px-10 py-2.5 border-t border-brand-purple/10">
                    {group.label}
                  </td>
                </tr>
                {group.rows.map((row) => {
                  const isPositive = row.diff > 0;
                  const isBetter = row.isInverse ? isDown(row.diff) : !isDown(row.diff);
                  const isNeutral = row.diff === 0;
                  return (
                    <tr key={row.label} className="border-t border-gray-50 hover:bg-gray-50/60 transition-colors group">
                      <td className="px-10 py-4 text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors">{row.label}</td>
                      <td className="px-10 py-4 text-right text-sm font-black text-gray-800 tabular-nums">{row.valB}</td>
                      <td className="px-10 py-4 text-right text-sm font-medium text-gray-300 line-through decoration-gray-200 tabular-nums">{row.valA}</td>
                      <td className="px-10 py-4 text-right">
                        {isNeutral ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-black text-gray-400 bg-gray-100 rounded-md px-2.5 py-1">— 0%</span>
                        ) : isBetter ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-black text-green-600 bg-green-50 rounded-md px-2.5 py-1">
                            <LuArrowUpRight size={12} />{Math.abs(row.percent).toFixed(1)}%
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-black text-red-500 bg-red-50 rounded-md px-2.5 py-1">
                            <LuArrowDownRight size={12} />{Math.abs(row.percent).toFixed(1)}%
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </>
            ))}
          </tbody>
        </table>
      )}

      {/* Tab: Visualização */}
      {activeTab === 'charts' && (
        <div className="px-10 py-8 space-y-10">
          {chartGroups.map((group, gi) => (
            <div key={group.label} className="space-y-5">
              <h4 className="text-[9px] font-black uppercase tracking-[0.16em] text-brand-purple">
                {group.label}
              </h4>
              <div className="space-y-4">
                {group.rows.map((row) => {
                  const maxVal = Math.max(row.valA, row.valB);
                  const pctA = (row.valA / maxVal) * 100;
                  const pctB = (row.valB / maxVal) * 100;
                  return (
                    <div key={row.label} className="flex items-center gap-6">
                      {/* Label */}
                      <span className="w-36 shrink-0 text-right text-[11px] font-medium text-gray-500">
                        {row.label}
                      </span>
                      {/* Barras */}
                      <div className="flex-1 space-y-1.5">
                        {/* Série A */}
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-brand-purple shrink-0" />
                          <div className="flex-1 h-2.5 bg-gray-50 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${pctA}%` }}
                              transition={{ duration: 0.6, ease: 'easeOut' }}
                              className="h-full rounded-full bg-brand-purple/30"
                            />
                          </div>
                          <span className="text-[11px] font-black text-gray-500 tabular-nums w-14 text-right">
                            {row.valA.toFixed(2)}°
                          </span>
                        </div>
                        {/* Série B */}
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-brand-orange shrink-0" />
                          <div className="flex-1 h-2.5 bg-gray-50 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${pctB}%` }}
                              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
                              className="h-full rounded-full bg-brand-orange/40"
                            />
                          </div>
                          <span className="text-[11px] font-black text-gray-800 tabular-nums w-14 text-right">
                            {row.valB.toFixed(2)}°
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {gi < chartGroups.length - 1 && (
                <div className="h-px bg-gray-100 mt-2" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between px-10 py-5 border-t border-gray-50 bg-gray-50/40">
        <div className="flex items-center gap-6 text-[11px] text-gray-400 font-medium">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-brand-purple" />
            Série A — período de referência ({dateA})
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-brand-orange" />
            Série B — período de comparação ({dateB})
          </div>
        </div>
        <span className="text-[11px] text-gray-300 font-medium">10 métricas · valores em °C</span>
      </div>

    </section>
  );
})()}
        </div>
      )}
    </div>
  );
};

export default ComparisonPage;