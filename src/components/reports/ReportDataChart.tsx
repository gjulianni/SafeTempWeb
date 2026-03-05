import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LuActivity, LuLoader, LuShieldAlert, LuTrendingDown, LuTrendingUp, LuTriangleAlert, LuZap } from 'react-icons/lu';
import api from '../../services/api'; 
import StatCard from './statcard/StatCard';

interface ReportDataChartProps {
  reportId: number;
}

const ReportDataChart = ({ reportId }: ReportDataChartProps) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`reports/${reportId}/data`);
        const formattedRecords = response.data.records.map((r: any) => ({
          ...r,
          displayTime: new Date(r.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }));
        setData({ ...response.data, records: formattedRecords });
      } catch (err) {
        console.error("Erro ao carregar dados do gráfico:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [reportId]);

  if (loading) return (
    <div className="h-full w-full flex flex-col items-center justify-center space-y-4 text-brand-orange">
      <LuLoader className="animate-spin" size={40} />
      <p className="font-bold text-sm uppercase tracking-widest">Reconstruindo Histórico...</p>
    </div>
  );

  if (!data || data.records.length === 0) return (
    <div className="h-full w-full flex flex-col items-center justify-center text-gray-400">
      <LuTriangleAlert size={40} className="mb-2" />
      <p>Nenhum dado de telemetria encontrado para este período.</p>
    </div>
  );

  const stats = data.statistics;

 return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Média Real" value={stats.media.toFixed(2)} unit="°C" icon={<LuActivity />} color="purple" />
        <StatCard label="Pico Máximo" value={stats.max.toFixed(2)} unit="°C" icon={<LuTrendingUp />} color="orange" />
        <StatCard label="Ponto Mínimo" value={stats.min.toFixed(2)} unit="°C" icon={<LuTrendingDown />} color="blue" />
        <StatCard 
          label="Anomalias" 
          value={stats.totalOutliers} 
          unit="un" 
          icon={<LuShieldAlert />} 
          color={stats.totalOutliers > 0 ? "red" : "green"} 
        />
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Comportamento Térmico (Janela de 60min)</h4>
          <span className="px-3 py-1 bg-brand-orange/10 text-brand-orange text-[10px] font-black rounded-full">LIVE RECONSTRUCTION</span>
        </div>
        
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data.records} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorReport" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ce6e46" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ce6e46" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="displayTime" 
              axisLine={false} 
              tickLine={false} 
              tick={{fontSize: 10, fill: '#9ca3af', fontWeight: 600}} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{fontSize: 10, fill: '#9ca3af', fontWeight: 600}} 
            />
            <Tooltip 
              contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} 
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#ce6e46" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorReport)" 
            />
          </AreaChart>
        </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100 flex flex-col justify-between">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Precisão (Desvio Padrão)</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-gray-800">± {stats.desvioPadrao.toFixed(3)}</span>
            <span className="text-[10px] font-bold text-brand-purple">VAR: {stats.variancia.toFixed(2)}</span>
          </div>
          <p className="text-[9px] text-gray-400 mt-2 font-medium">Quanto menor este valor, mais estável foi a sua estufa.</p>
        </div>

        <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Coef. de Variação (CV)</span>
          <div className="mt-2 flex items-center gap-3">
             <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-brand-orange transition-all duration-1000" 
                  style={{ width: `${Math.min(stats.CVOutlier * 5, 100)}%` }} 
                />
             </div>
             <span className="text-sm font-black text-gray-700">{stats.CVOutlier.toFixed(2)}%</span>
          </div>
          <p className="text-[9px] text-gray-400 mt-2 font-medium">Indica a dispersão relativa dos dados em relação à média.</p>
        </div>

        <div className="bg-[#282735] p-6 rounded-3xl shadow-xl flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Amostragem</span>
            <p className="text-2xl font-black text-white">{stats.totalRecords}</p>
            <p className="text-[9px] text-white/40 font-bold">REGISTROS TOTAIS</p>
          </div>
          <LuZap className="text-brand-orange animate-pulse" size={32} />
        </div>
      </div>
    </div>
  );
};

export default ReportDataChart;