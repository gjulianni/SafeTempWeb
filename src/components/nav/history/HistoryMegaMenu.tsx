import { motion } from 'framer-motion';
import { FileSpreadsheet, FlaskConical, CalendarSearch, DownloadCloud } from 'lucide-react';
import { LuTrendingUp } from 'react-icons/lu';
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
      className="absolute top-full left-0 right-0 bg-white  shadow-[0_20px_40px_rgba(0,0,0,0.08)] border-x border-b border-gray-100 overflow-hidden z-50"
    >
     <div className="max-w-7xl mx-auto p-12 grid grid-cols-3 gap-16">
        
        <div className="flex flex-col gap-6">
          <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">
            Histórico
          </h5>
          <div className="flex flex-col gap-2">
            {[subItems[0], subItems[1]].map((item) => (
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
            {[subItems[2], subItems[3]].map((item) => (
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

        {/* Coluna 3: Destaque / Promoção (Igual à imagem da Lightdash) */}
        <div className="flex flex-col gap-4">
          <div className="bg-gradient-to-br from-[#4b2a59] to-[#2d1936] p-6 rounded-[2rem] text-white relative overflow-hidden h-full flex flex-col justify-end">
             <div className="absolute top-4 right-4 bg-white/10 p-2 rounded-lg backdrop-blur-md">
                <LuTrendingUp className="text-brand-orange" size={20} />
             </div>
             <h4 className="font-black text-lg mb-2">Análise 2026</h4>
             <p className="text-xs text-purple-100/70 mb-4 font-medium">
                O SafeTemp processou mais de 31.000 registros este mês com 99% de precisão.
             </p>
             <button className="w-full py-2 bg-brand-orange text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-opacity">
                Ver Estatísticas
             </button>
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