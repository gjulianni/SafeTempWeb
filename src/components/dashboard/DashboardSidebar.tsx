import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuSettings, LuX, LuFileJson, LuDownload, LuImage } from 'react-icons/lu';
import type { TemperatureStatistics } from '../../types/statistics/TemperatureStatistics';

interface DashboardSidebarProps {
  stats: TemperatureStatistics | undefined;
  isLoading: boolean;
  onExportBoxplot: () => void;
  onExportCSV: () => void;
  onExportJSON: () => void;
}

export const DashboardSidebar = ({ stats, isLoading, onExportBoxplot, onExportCSV, onExportJSON }: DashboardSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setIsOpen(true)}
          className="fixed right-6 bottom-4 z-40 p-4 bg-gray-900 shadow-xl border border-gray-100 rounded-2xl text-white hover:scale-110 transition-transform cursor-pointer"
        >
          <LuSettings size={24} className="animate-spin-slow" />
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-40"
            />

            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-90 bg-white/90 backdrop-blur-2xl border-l border-gray-100 p-8 shadow-[-20px_0_50px_rgba(0,0,0,0.05)] z-50 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-orange/10 text-brand-orange rounded-xl">
                    <LuSettings size={20} />
                  </div>
                  <h2 className="text-sm font-black uppercase tracking-widest text-gray-900">Ações</h2>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer text-gray-400"
                >
                  <LuX size={20} />
                </button>
              </div>

               <div className="space-y-10">
    <div className="space-y-4">
      <p className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-2">Exportar Dados</p>
      <button onClick={onExportJSON} className="w-full cursor-pointer flex items-center justify-between p-4 bg-gray-50 hover:bg-brand-orange/5 rounded-2xl transition-all group">
        <div className="flex items-center gap-3">
          <LuFileJson className="text-gray-400 group-hover:text-brand-orange" />
          <span className="text-xs font-bold text-gray-600">Dados Brutos (JSON)</span>
        </div>
        <LuDownload size={14} className="text-gray-300" />
      </button>
      <button onClick={onExportCSV} className="w-full cursor-pointer flex items-center justify-between p-4 bg-gray-50 hover:bg-brand-orange/5 rounded-2xl transition-all group">
        <div className="flex items-center gap-3">
          <LuFileJson className="text-gray-400 group-hover:text-brand-orange" />
          <span className="text-xs font-bold text-gray-600">Dados Brutos (CSV)</span>
        </div>
        <LuDownload size={14} className="text-gray-300" />
      </button>
    </div>

    
              <div className="flex-1 space-y-8 overflow-y-auto pr-2 custom-scrollbar">
                <div className="space-y-4">
                  <p className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-2">Exportar Visualização</p>
                  <button 
                    onClick={onExportBoxplot}
                    disabled={isLoading || !stats}
                    className="w-full flex items-center justify-between p-5 bg-gray-50 hover:bg-brand-orange/5 border border-transparent hover:border-brand-orange/20 rounded-[2rem] transition-all group disabled:opacity-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-white rounded-lg shadow-sm group-hover:text-brand-orange transition-colors">
                        <LuImage size={18} />
                      </div>
                      <div className="text-left cursor-pointer">
                        <p className="text-xs font-black text-black">Boxplot Analysis</p>
                        <p className="text-[10px] text-gray-500 font-medium">Salvar gráfico como PNG</p>
                      </div>
                    </div>
                    <LuDownload size={16} className="text-gray-300" />
                  </button>
                </div>
              </div>

    <div className="bg-brand-purple/5 p-6 rounded-[2.5rem] border border-brand-purple/10">
      <p className="text-[10px] font-black text-brand-purple uppercase mb-4">IA Quick Insight</p>
      <p className="text-[11px] text-gray-500 leading-relaxed mb-4">
        Solicite uma análise rápida do comportamento térmico da última hora.
      </p>
      <button className="w-full cursor-pointer py-3 bg-brand-purple text-white rounded-xl text-[10px] hover:scale-[1.025] transition-all transition-100 font-black uppercase tracking-widest">
        Gerar Insight
      </button>
    </div>
  </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default DashboardSidebar;

 <aside className="fixed left-0 top-0 h-full w-80 bg-white/80 backdrop-blur-xl border-l border-gray-100 p-8 shadow-2xl z-50">
  <div className="flex items-center gap-3 mb-12">
    <div className="p-2 bg-brand-orange/10 text-brand-orange rounded-xl">
      <LuSettings size={20} />
    </div>
    <h2 className="text-sm font-black uppercase tracking-widest text-gray-900">Ações de Controle</h2>
  </div>

  <div className="space-y-10">
    <div className="space-y-4">
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Exportar Dados</p>
      <button className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-brand-orange/5 rounded-2xl transition-all group">
        <div className="flex items-center gap-3">
          <LuFileJson className="text-gray-400 group-hover:text-brand-orange" />
          <span className="text-xs font-bold text-gray-600">Dados Brutos (JSON)</span>
        </div>
        <LuDownload size={14} className="text-gray-300" />
      </button>
      {/* ... outros botões ... */}
    </div>

    <div className="bg-brand-purple/5 p-6 rounded-[2.5rem] border border-brand-purple/10">
      <p className="text-[10px] font-black text-brand-purple uppercase mb-4">IA Quick Insight</p>
      <p className="text-[11px] text-gray-500 leading-relaxed mb-4">
        Solicite uma análise rápida do comportamento térmico da última hora.
      </p>
      <button className="w-full py-3 bg-brand-purple text-white rounded-xl text-[10px] font-black uppercase tracking-widest">
        Gerar Insight
      </button>
    </div>
  </div>
</aside>