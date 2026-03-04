import { motion } from 'framer-motion';
import { FileSpreadsheet, FlaskConical, CalendarSearch, DownloadCloud } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const subItems = [
  {
    titulo: 'Relatórios Diários',
    desc: 'Listagem detalhada de todos os registros das últimas 24h.',
    icon: FileSpreadsheet,
    path: '/historico/diario',
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
    titulo: 'Consulta por Data',
    desc: 'Filtros personalizados e geração de gráficos históricos.',
    icon: CalendarSearch,
    path: '/historico/busca',
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
      className="absolute top-full left-0 right-0 bg-white rounded-b-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.08)] border-x border-b border-gray-100 overflow-hidden z-50"
    >
      <div className="p-8 grid grid-cols-4 gap-6"> 
        {subItems.map((item) => (
          <button
            key={item.titulo}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-start gap-4 p-6 rounded-3xl hover:bg-gray-50 transition-all group text-left cursor-pointer border border-transparent hover:border-gray-100"
          >
            <div className={`p-4 rounded-2xl bg-white shadow-sm border border-gray-100 group-hover:scale-110 transition-transform ${item.cor}`}>
              <item.icon size={28} />
            </div>
            <div>
              <h4 className="font-black text-gray-900 text-base mb-1">{item.titulo}</h4>
              <p className="text-xs text-gray-400 font-medium leading-relaxed">{item.desc}</p>
            </div>
          </button>
        ))}
      </div>
      <div className="bg-gray-50/50 p-4 mt-2 rounded-b-3xl text-center border-t border-gray-100">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
          Dados processados via Azure Cloud • 2026
        </p>
      </div>
    </motion.div>
  );
};

export default HistoryMegaMenu;