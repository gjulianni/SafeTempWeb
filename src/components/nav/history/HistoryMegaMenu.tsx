import { motion } from 'framer-motion';
import { FileSpreadsheet, FlaskConical, CalendarSearch, DownloadCloud } from 'lucide-react';
import { LuArrowUpRight } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

const subItems = [
  {
    titulo: 'Relatórios',
    desc: 'Listagem detalhada de todos os registros das últimas 24h.',
    icon: FileSpreadsheet,
    path: '/historico/relatorios',
    cor: 'text-blue-500'
  },
  {
    titulo: 'Análise de Experimentos',
    desc: 'Compare o desempenho de ciclos de cultivo específicos.',
    icon: FlaskConical,
    path: '/historico/experimentos',
    cor: 'text-purple-500'
  },
  {
    titulo: 'Consulta de Dados',
    desc: 'Filtros personalizados e geração de gráficos históricos.',
    icon: CalendarSearch,
    path: '/historico',
    cor: 'text-brand-orange'
  },
  {
    titulo: 'Exportação em Massa',
    desc: 'Baixe dados processados em CSV ou PDF para pesquisa.',
    icon: DownloadCloud,
    path: '/historico/exportar',
    cor: 'text-green-500'
  },
];

const HistoryMegaMenu = () => {
  const navigate = useNavigate();

  return (
<motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="absolute top-full left-0 right-0 bg-white shadow-[0_20px_40px_rgba(0,0,0,0.08)] border-x border-b border-gray-100 overflow-hidden z-50"
    >
     <div className="max-w-7xl mx-auto p-12 grid grid-cols-3 gap-16">
        
        <div className="flex flex-col gap-6">
          <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">
            Histórico
          </h5>
          <div className="flex flex-col gap-2">
            {[subItems[0], subItems[2]].map((item) => (
              <button
                key={item.titulo}
                onClick={() => navigate(item.path)}
                className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-all group text-left cursor-pointer"
              >
                <div className={`flex-shrink-0 p-2 rounded-lg bg-white shadow-sm border border-gray-100 group-hover:scale-110 transition-transform ${item.cor}`}>
                  <item.icon size={20} />
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="font-bold text-gray-900 text-sm leading-none mb-1 group-hover:text-brand-purple transition-colors">
                    {item.titulo}
                  </h4>
                  <p className="text-[11px] text-gray-400 font-medium leading-tight">
                    {item.desc}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">
            Ferramentas de Pesquisa
          </h5>
          <div className="flex flex-col gap-2">
            {[subItems[1], subItems[3]].map((item) => (
              <button
                key={item.titulo}
                onClick={() => navigate(item.path)}
                className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-all group text-left cursor-pointer"
              >
                <div className={`flex-shrink-0 p-2 rounded-lg bg-white shadow-sm border border-gray-100 group-hover:scale-110 transition-transform ${item.cor}`}>
                  <item.icon size={20} />
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="font-bold text-gray-900 text-sm leading-none mb-1 group-hover:text-brand-purple transition-colors">
                    {item.titulo}
                  </h4>
                  <p className="text-[11px] text-gray-400 font-medium leading-tight">
                    {item.desc}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

<div className="flex flex-col gap-4">
  <div className="bg-[#282735] p-7 rounded-[0.1em] text-white relative overflow-hidden h-full flex flex-col justify-end group shadow-2xl border border-white/5">
    
    <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-brand-purple to-[#6b3e7d] opacity-80 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700 rounded-2xl rotate-45" />
    
    <div className="absolute top-1/2 -right-3 w-10 h-10 bg-gradient-to-tr from-brand-orange to-[#ff914d] opacity-60 group-hover:-translate-y-2 transition-transform duration-500 rounded-lg -rotate-12" />
    
    <div className="absolute -bottom-3 right-16 w-12 h-12 bg-brand-purple/30 backdrop-blur-sm border border-white/10 rounded-xl rotate-12 group-hover:opacity-100 transition-opacity" />

    <div className="relative z-10 cursor-pointer">
      <div className='flex flex-row max-w-full items-center gap-3'>
      <h4 className="font-black text-2xl mb-2 tracking-tight">Insights Ativos</h4>
      <h4 className='font-black text-2xl tracking-tight mb-1'> <LuArrowUpRight /></h4>
      </div>
      <p className="text-[12px] text-gray-400 mb-10 font-flat leading-relaxed max-w-[90%] tracking-[0.1em]">
        Identifique instabilidades com o sistema SafeTemp
      </p>
    </div>
  </div>
</div>

      </div>
      <div className="bg-gray-50/50 p-4 mt-2 rounded-b-3xl text-center border-t border-gray-100">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
          SafeTemp • Sistema de Monitoramento
        </p>
      </div>
    </motion.div>
  );
};

export default HistoryMegaMenu;