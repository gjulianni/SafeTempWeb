import { useState, useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, Minus, Zap, Activity, Waves, Clock } from 'lucide-react';
import { useDashboard } from '../../../hooks/useDashboard';

const DashboardCard = () => {
  const { data, isLoading } = useDashboard();
  const prevValueRef = useRef<number | null>(null);
  const [trend, setTrend] = useState({ icon: Minus, color: 'text-gray-400', text: 'Estável' });


  const getStability = (std: number) => {
    if (std < 1) return { label: "Alta Estabilidade", color: "text-green-500", Icon: Activity };
    if (std < 2.5) return { label: "Oscilação Normal", color: "text-yellow-500", Icon: Waves };
    return { label: "Alta Instabilidade", color: "text-red-500", Icon: Zap };
  };

  const getTimeDifference = (timestamp: string | undefined) => {
    if (!timestamp) return "Desconhecido";
  
  const now = new Date();
  const recordTime = new Date(timestamp);
  const diffMs = now.getTime() - recordTime.getTime(); 
  const diffMins = Math.floor(diffMs / 60000); 

  if (diffMins < 1) return "Agora mesmo";
  if (diffMins === 1) return "Há 1 minuto";
  if (diffMins < 60) return `Há ${diffMins} minutos`;
  
  const diffHours = Math.floor(diffMins / 60);
  return `Há ${diffHours} horas`;
};


  useEffect(() => {
    if (data?.lastRecord) {
      const newVal = data.lastRecord.value;
      const prevVal = prevValueRef.current;

      if (prevVal !== null) {
        if (newVal > prevVal) {
          setTrend({ icon: TrendingUp, color: 'text-red-400', text: 'Subindo' });
        } else if (newVal < prevVal) {
          setTrend({ icon: TrendingDown, color: 'text-blue-400', text: 'Descendo' });
        } else {
          setTrend({ icon: Minus, color: 'text-gray-400', text: 'Estável' });
        }
      }
      prevValueRef.current = newVal;
    }
  }, [data?.lastRecord.value]);

  if (isLoading || !data) return <div className="h-96 w-full bg-gray-50 animate-pulse rounded-[3rem]" />;
  const lastUpdateText = data ? getTimeDifference(data.lastRecord.timestamp) : "...";

  const stability = getStability(data.statistics.desvioPadrao);

return (
  <div className="bg-white rounded-[3rem] p-10 shadow-[0_10px_40px_rgba(75,42,89,0.15)] w-[450px] relative overflow-hidden border border-brand-purple/10">

    <div className="relative flex justify-between items-center mb-10">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-900">
          Monitoramento Ativo
        </span>
      </div>
      <stability.Icon className="text-gray-400" size={20} />
    </div>

    <div className="relative text-center">
      <h2 className="text-[88px] font-black text-gray-900 leading-none tracking-tight">
        {data.lastRecord.value.toFixed(1)}
        <span className="text-2xl text-gray-400 align-top ml-1">°C</span>
      </h2>

      <p className="text-gray-500 font-semibold text-xs uppercase tracking-widest mt-3">
        Temperatura Atual
      </p>

      <div className={`mt-4 inline-flex items-center gap-1 font-semibold text-sm ${trend.color}`}>
        <trend.icon size={16} />
        {trend.text}
      </div>
    </div>

    <div className="relative mt-4 flex justify-center">
        <div className='flex justify-center items-center gap-8'>
        <p className='text-[12px] font-bold uppercase tracking-tight text-gray-900'>Ambiente</p>
      <div className="bg-brand-purple/5 px-6 py-2 rounded-full flex items-center border border-brand-purple/10">
        <div className={`w-2 h-2 rounded-full mr-2 ${stability.color.replace('text', 'bg')}`} />
        <span className="text-[11px] font-bold uppercase tracking-tight text-brand-purple">
          {stability.label}
        </span>
        </div>
      </div>
    </div>

    <div className="relative mt-8 grid grid-cols-2 gap-4">
      <div className="bg-gray-50 p-4 rounded-2xl text-center border border-gray-100">
        <span className="text-[10px] font-semibold text-gray-400 uppercase">
          Mínima (1h)
        </span>
        <p className="text-lg font-bold text-gray-900 mt-1">
          {data.statistics.min.toFixed(2)}°
        </p>
      </div>

      <div className="bg-gray-50 p-4 rounded-2xl text-center border border-gray-100">
        <span className="text-[10px] font-semibold text-gray-400 uppercase">
          Máxima (1h)
        </span>
        <p className="text-lg font-bold text-gray-900 mt-1">
          {data.statistics.max.toFixed(2)}°
        </p>
      </div>
    </div>

    <div className="relative mt-8 flex items-center justify-center gap-2 text-gray-400 text-[12px] font-semibold uppercase">
      <Clock size={12} />
      <span>Última leitura: {lastUpdateText}</span>
    </div>
  </div>
)
};

export default DashboardCard;