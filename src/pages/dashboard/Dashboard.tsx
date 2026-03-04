import React from 'react';
import Navbar from '../../components/nav/Navbar';

import {
  LuClockAlert,
  LuLightbulb,
  LuActivity,
  LuTrendingUp,
  LuShieldCheck,
  LuThermometer,
  LuBadgePercent,
  LuSigma,
} from 'react-icons/lu';

import {
  AreaChart,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
} from 'recharts';


import { useHistory } from '../../hooks/useDashboard';
import type { TemperatureRecord } from '../../types/records/TemperatureRecord';
import Plot from 'react-plotly.js';
import stdashboard from '../../assets/stdashboard.png';
import formatTimeBRT from '../../utils/formatters/formatTimeBRT';


const PIE_COLORS = ['#32c5ff', '#4b2a59', '#ff4343'];


const Dashboard: React.FC = () => {

  const { data, isLoading, isError } = useHistory();
  const [thresholds, setThresholds] = React.useState({ cold: 20, hot: 25 });

  if (isLoading) return <div className="p-10 text-center font-bold">Carregando...</div>;
  if (isError || !data?.records) return <div className="p-10 text-center text-red-500">Erro.</div>;

const coldCount = data.records.filter(r => r.value < thresholds.cold).length;
  const hotCount = data.records.filter(r => r.value > thresholds.hot).length;
  const normalCount = data.records.filter(r => r.value >= thresholds.cold && r.value <= thresholds.hot).length;
  const total = data.records.length;

  const pieData = [
    { name: `Frio (<${thresholds.cold}°C)`, value: total > 0 ? (coldCount / total) * 100 : 0 },
    { name: `Normal (${thresholds.cold}-${thresholds.hot}°C)`, value: total > 0 ? (normalCount / total) * 100 : 0 },
    { name: `Quente (>${thresholds.hot}°C)`, value: total > 0 ? (hotCount / total) * 100 : 0 },
  ];

const values = data.records.map(r => r.value);
  const barData: { hour: string; temp: number }[] = data?.records.map((record: TemperatureRecord) => {
 
        const date = formatTimeBRT(record.timestamp);
  return { hour:`${date}`, temp: record.value };
}) ?? [];


  return (
  <div className="grid grid-cols-[20px_1fr] grid-rows-[80px_1fr] h-screen w-full bg-[#f7f8fc] font-sans">
    <Navbar />

    <main className="col-start-2 col-end-3 row-start-2 row-end-3 p-8 overflow-y-auto">
      <div className='flex items-center justify-center max-w-full mb-8'>
 <img src={stdashboard} className='w-[25%]'/>
      </div>
     

  
      <div className="grid grid-cols-3 gap-6">
        
 
        <div className="col-span-2 bg-white p-6 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
          <h3 className="text-[1.1rem] font-semibold text-[#333333]">Histórico </h3>
          <p className="text-[0.85rem] text-[#8a8a8a] mt-1 mb-5">Última hora</p>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="hour" axisLine={false} tickLine={false} />
                <YAxis unit="°C" axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: 'rgba(75, 42, 89, 0.1)' }} />
                <Area dataKey="temp" fill="#ce6e46" type="monotone"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

 <div className="col-span-1 bg-white p-6 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.02)] flex flex-col">
  <div className="flex justify-between items-start mb-5">
    <div>
      <h3 className="text-[1.1rem] font-semibold text-[#333333]">Distribuição de Temperatura</h3>
      <p className="text-[0.85rem] text-[#8a8a8a] mt-1">Ajuste as faixas de análise térmica</p>
    </div>
  </div>

  <div className="grid grid-cols-2 gap-4 mb-6 p-3 bg-gray-50 rounded-xl">
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase text-blue-500 tracking-wider">Limite Frio</label>
      <input 
        type="number" 
        value={thresholds.cold}
        onChange={(e) => setThresholds({ ...thresholds, cold: Number(e.target.value) })}
        className="w-full bg-white border border-gray-200 rounded-lg p-2 text-sm font-bold outline-none focus:border-blue-400"
      />
    </div>
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase text-red-500 tracking-wider">Limite Quente</label>
      <input 
        type="number" 
        value={thresholds.hot}
        onChange={(e) => setThresholds({ ...thresholds, hot: Number(e.target.value) })}
        className="w-full bg-white border border-gray-200 rounded-lg p-2 text-sm font-bold outline-none focus:border-red-400"
      />
    </div>
  </div>

  <div className="w-full h-[250px] mb-4">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie 
          data={pieData} 
          cx="50%" 
          cy="50%" 
          innerRadius={60} 
          outerRadius={80} 
          paddingAngle={5}
          dataKey="value"
        >
          {pieData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
          ))}
        </Pie>
       <Tooltip formatter={(value: number | undefined) => value !== undefined ? `${value.toFixed(2)}%` : '0%'
  } 
/>
        <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 'bold' }} />
      </PieChart>
    </ResponsiveContainer>
  </div>
   
{data?.statistics && (
    <div className="mt-auto pt-4 border-t border-gray-100 flex gap-3">
      <div className="flex-1 bg-gray-50 p-2 rounded-lg text-center">
        <span className="block text-[10px] text-gray-400 font-bold uppercase">Média</span>
        <span className="text-sm font-black text-[#4b2a59]">{data.statistics.media.toFixed(1)}°C</span>
      </div>
      <div className="flex-1 bg-gray-50 p-2 rounded-lg text-center">
        <span className="block text-[10px] text-gray-400 font-bold uppercase">Variação</span>
        <span className="text-sm font-black text-[#ce6e46]">{data.statistics.variancia.toFixed(1)}%</span>
      </div>
    </div>
  )}
        </div>

        <div className="col-span-1 bg-white p-6 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
          <h3 className="text-[1.1rem] font-semibold text-[#333333]">Análise de Outliers</h3>
          <div className="w-full h-[300px] mt-4">
            <Plot
              data={[{ y: values, type: 'box', name: 'Temp', marker: { color: '#585554' } }]}
              layout={{ autosize: true, margin: { t: 10, b: 30, l: 40, r: 10 } } as any}
              className="w-full h-full"
              useResizeHandler
            />
          </div>
          <div className="mt-4 p-3 bg-white rounded-lg flex justify-between items-center shadow-[0_5px_7px_rgba(0,0,0,0.08)]">
            <span className="font-medium text-[#313131]">Total Outliers:</span>
            <span className="font-bold text-[#ce6e46]">{data?.statistics.totalOutliers}</span>
          </div>
        </div>

   <div className="col-span-2 bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50">
  <div className="flex items-center justify-between mb-8">
    <div>
      <h3 className="text-xl font-black text-[#333333] tracking-tight">Análise Estatística</h3>
      <p className="text-sm text-gray-400 font-medium">Indicadores de estabilidade</p>
    </div>
    <div className="px-4 py-2 bg-[#ce6e46]/10 rounded-full text-[#ce6e46] text-xs font-bold uppercase tracking-widest">
      SafeTemp Analytics
    </div>
  </div>

  <div className="grid grid-cols-2 gap-4">
    {[
      { label: 'Total de Registros', val: data.statistics.totalRecords, icon: <LuSigma />, desc: 'Número total de registros'},
      { label: 'Mediana', val: data?.statistics.mediana, unit: '°C', icon: <LuBadgePercent />, desc: 'Valor central exato'},
      { label: 'Desvio Padrão', val: data?.statistics.desvioPadrao, unit: '%', icon: <LuActivity size={20} />, desc: 'Dispersão dos dados' },
      { label: 'Variância', val: data?.statistics.variancia, unit: '%', icon: <LuTrendingUp size={20} />, desc: 'Afastamento da média' },
      { label: 'CV sem Outliers', val: data?.statistics.CVNoOutlier, unit: '%', icon: <LuShieldCheck size={20} />, desc: 'Estabilidade filtrada' },
      { label: 'CV com Outliers', val: data?.statistics.CVOutlier, unit: '%', icon: <LuClockAlert size={20} />, desc: 'Variação bruta' },
      { label: 'Média Estabilizada', val: data?.statistics.mediaNoOutlier, unit: '°C', icon: <LuThermometer size={20} />, desc: 'Tendência central' }
    ].map((stat, i) => (
      <div 
        key={i} 
        className="group p-2 bg-gray-70 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 rounded-2xl border border-transparent hover:border-gray-100 transition-all duration-300"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="p-2 bg-white rounded-xl shadow-sm group-hover:bg-[#ce6e46] group-hover:text-white transition-colors text-[#ce6e46]">
            {stat.icon}
          </div>
          <div className="text-right">
            <span className="block text-2xl font-black text-[#333333] group-hover:text-[#ce6e46] transition-colors">
              {stat.val?.toFixed(2)}<span className="text-sm ml-0.5">{stat.unit}</span>
            </span>
          </div>
        </div>
        <div>
          <span className="block text-sm font-bold text-gray-700">{stat.label}</span>
          <span className="text-[10px] text-gray-400 uppercase font-black tracking-wider">{stat.desc}</span>
        </div>
      </div>
    ))}
  </div>

  {/* Bloco de Insights com Design Modernizado */}
  <div className="mt-8 p-6 bg-gradient-to-br from-[#4b2a59] to-[#2d1936] rounded-3xl text-white relative overflow-hidden group">
    {/* Efeito visual de fundo */}
    <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-[#ce6e46]/20 transition-all duration-500" />
    
    <div className="relative z-10 flex gap-5">
      <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
        <LuLightbulb className="text-[#ce6e46]" size={24} />
      </div>
      <div className="space-y-3">
        <h4 className="font-bold text-lg">Guia de Interpretação Científica</h4>
        <div className="grid grid-cols-2 gap-6 text-xs text-purple-100/80 leading-relaxed font-medium">
          <p>
            <strong className="text-white block mb-1 uppercase tracking-widest text-[10px]">Coeficiente de Variação</strong>
            Define a precisão relativa. Valores baixos indicam um ambiente laboratorial controlado e estável.
          </p>
          <p>
            <strong className="text-white block mb-1 uppercase tracking-widest text-[10px]">Outliers & Variância</strong>
            Pontos fora do padrão podem indicar falhas no hardware ou aberturas acidentais da estufa.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

      </div>
    </main>
  </div>
);
};

export default Dashboard;