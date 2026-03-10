import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LuHistory, LuBarcode, LuTable,
  LuTrendingUp, LuActivity, LuSearch, LuLoader,
  LuTrendingDown
} from 'react-icons/lu';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';
import Navbar from '../../components/nav/Navbar';
import { useData } from '../../hooks/useDashboard'; 
import formatTimeBRT from '../../utils/formatters/formatTimeBRT';


const HistoryHero = () => {
  const [activeCard, setActiveCard] = useState(0);
  const cards = [
    { title: "Gráficos", desc: "Tendências térmicas em tempo real.", icon: <LuBarcode />, color: "bg-brand-purple" },
    { title: "Tabular", desc: "Dados brutos para exportação direta.", icon: <LuTable />, color: "bg-brand-orange" },
    { title: "Estatística", desc: "Cálculo de desvio e variância.", icon: <LuActivity />, color: "bg-blue-500" },
  ];

  useEffect(() => {
    const timer = setInterval(() => setActiveCard(prev => (prev + 1) % cards.length), 4000);
    return () => clearInterval(timer);
  }, [cards.length]);

  return (
    <section className="w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24 py-12 px-6 lg:px-20 bg-white rounded-[3.5rem] border border-gray-50 shadow-sm overflow-hidden">
      <div className="flex-1 text-center lg:text-left">
        <h1 className="text-4xl lg:text-6xl font-black text-gray-900 leading-tight mb-6">
          Exploração de <span className="text-brand-purple">Dados Históricos</span>
        </h1>
        <p className="text-gray-500 text-lg font-medium max-w-xl">
          Consulte o passado da sua estufa para prever o futuro. Analise picos, 
          identifique anomalias e exporte relatórios técnicos completos.
        </p>
      </div>

      <div className="flex-1 relative w-full max-w-[400px] h-[200px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCard}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className={`p-8 rounded-[2.5rem] text-white shadow-2xl w-full ${cards[activeCard].color}`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/20 rounded-2xl">{cards[activeCard].icon}</div>
              <h4 className="font-black uppercase tracking-widest text-sm">{cards[activeCard].title}</h4>
            </div>
            <p className="font-medium text-white/80">{cards[activeCard].desc}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};


export default function HistoryPage() {

  const [formValues, setFormValues] = useState({
    date: new Date().toISOString().split('T')[0],
    start: '',
    end: '',
    granularity: '1m'
  });

  const [queryParams, setQueryParams] = useState({
    date: new Date().toISOString().split('T')[0]
  });

  const { data, isLoading } = useData(queryParams);

  const handleSearch = () => {
    setQueryParams({ ...formValues });
  };

    const records = data?.records ?? [];
  
  const chartData = records.map((record) => ({
    hour: formatTimeBRT(record.timestamp),
    temp: record.value
  }));

  return (
    <div className="min-h-screen bg-[#f8f9fc] p-4 sm:p-8 max-w-[100vw] overflow-x-hidden">
      <Navbar />
      
      <div className="mt-24 space-y-12">
        <HistoryHero />

        {/* BARRA DE FILTRO RESPONSIVA */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col lg:flex-row gap-6 items-end justify-between">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Data</label>
              <input 
                type="date" 
                value={formValues.date}
                onChange={(e) => setFormValues({...formValues, date: e.target.value})}
                className="w-full p-3 bg-gray-50 border-none rounded-2xl text-xs font-bold outline-none focus:ring-2 ring-brand-purple/20" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Início</label>
              <input 
                type="time" 
                value={formValues.start}
                onChange={(e) => setFormValues({...formValues, start: e.target.value})}
                className="w-full p-3 bg-gray-50 border-none rounded-2xl text-xs font-bold outline-none focus:ring-2 ring-brand-purple/20" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Fim</label>
              <input 
                type="time" 
                value={formValues.end}
                onChange={(e) => setFormValues({...formValues, end: e.target.value})}
                className="w-full p-3 bg-gray-50 border-none rounded-2xl text-xs font-bold outline-none focus:ring-2 ring-brand-purple/20" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-2">Granularidade</label>
              <select 
                value={formValues.granularity}
                onChange={(e) => setFormValues({...formValues, granularity: e.target.value})}
                className="w-full p-3 bg-gray-50 border-none rounded-2xl text-xs font-bold outline-none focus:ring-2 ring-brand-purple/20"
              >
                <option value="1m">1 minuto</option>
                <option value="5m">5 minutos</option>
                <option value="15m">15 minutos</option>
              </select>
            </div>
          </div>
          
          <button 
            onClick={handleSearch}
            disabled={isLoading}
            className="w-full cursor-pointer lg:w-auto px-10 py-4 bg-brand-purple text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-brand-purple/20 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? <LuLoader className="animate-spin" /> : <LuSearch size={16} />}
            Resgatar Histórico
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                       <StatCard 
              label="Total de Amostras" 
              value={data?.records?.length.toString() || "0"} 
              unit="un" icon={<LuHistory />} color="green" 
            />
           <StatCard 
              label="Média do Período" 
              value={data?.statistics?.media.toFixed(2) || "0.00"} 
              unit="°C" icon={<LuActivity />} color="orange" 
            />
           <StatCard 
              label="Pico Registrado" 
              value={data?.statistics?.max.toFixed(2) || "0.00"} 
              unit="°C" icon={<LuTrendingUp />} color="orange" 
            />
           <StatCard 
              label="Mínima Registrada" 
              value={`${data?.statistics?.min.toFixed(3) || "0.000"}`} 
              unit="°C" icon={<LuTrendingDown />} color="orange" 
            />

        </div>

        <div className="bg-white p-6 sm:p-8 rounded-[3.5rem] border border-gray-100 shadow-sm h-[450px]">
           <div className="flex justify-between items-center mb-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Telemetria Temporal</h3>
              {isLoading && <span className="text-[10px] font-bold text-brand-purple animate-pulse uppercase">Sincronizando...</span>}
           </div>
           
           <ResponsiveContainer width="100%" height="90%">
             <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d57a25" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#d57a25" stopOpacity={0}/>
                  </linearGradient>
                </defs>
               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
               <XAxis 
                dataKey="hour" 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 10, fill: '#9ca3af', fontWeight: 600}} 
               />
               <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9ca3af', fontWeight: 600}} />
               <Tooltip 
                contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}} 
               />
               <Area 
                type="monotone" 
                dataKey="temp" 
                stroke="#d57a25" 
                strokeWidth={2} 
                fillOpacity={1} 
                fill="url(#colorValue)" 
               />
             </AreaChart>
           </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

const StatCard = ({ label, value, unit, icon, color }: any) => (
  <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center justify-between">
    <div>
      <p className="text-[10px] font-black text-gray-400 uppercase mb-1">{label}</p>
      <p className={`text-2xl font-black text-brand-${color}`}>{value}<span className="text-xs ml-1 text-gray-400 font-bold">{unit}</span></p>
    </div>
    <div className={`p-4 bg-brand-${color}/10 text-brand-${color} rounded-2xl`}>{icon}</div>
  </div>
);