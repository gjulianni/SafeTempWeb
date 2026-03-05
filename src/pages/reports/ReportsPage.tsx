import React, { useEffect, useState } from 'react';
import api from '../../services/api'; 
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LuFileText, LuSearch,
  LuChevronRight, LuFilter, 
  LuDownload,
  LuLoader,
  LuShare2
} from 'react-icons/lu';
import Navbar from '../../components/nav/Navbar';
import logost from '../../assets/logost.png';
import formatToBR from '../../utils/formatters/formatDateToBR';
import ReportsHero from '../../components/reports/ReportsHero';
import ReportDataChart from '../../components/reports/ReportDataChart';

interface Report {
  id: number;
  chip_id: string;
  data: string;
  relatorio: string;
  resumo: string; 
  criado_em: string;
}

const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchDates, setSearchDates] = useState({ inicio: '', fim: '' });
  const [isDownloading, setIsDownloading] = useState({ pdf: false, csv: false, share: false });
  const [viewMode, setViewMode] = useState<"leitura" | "graphical">(() => {
  const savedMode = localStorage.getItem("@SafeTemp:viewMode");
  return (savedMode === "graphical" || savedMode === "leitura") ? savedMode : "leitura";
});

  useEffect(() => {
    fetchTodayReports();
  }, []);

  const fetchTodayReports = async () => {
    setLoading(true);
    try {
      const response = await api.get('reports/today'); 
      setReports(response.data);
      if (response.data.length > 0) setSelectedReport(response.data[0]);
    } catch (err) {
      console.error("Erro ao carregar hoje:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.get(`reports/interval`, { params: searchDates });
      setReports(response.data);
    } catch (err) {
      console.error("Erro na busca:", err);
    } finally {
      setLoading(false);
    }
  };

  const parseResumo = (jsonStr: string) => {
    try { return JSON.parse(jsonStr); } catch { return null; }
  };

  const handlePDFDownload = async (id: number) => {
  setIsDownloading(prev => ({ ...prev, pdf: true }));
  try {
  
    const response = await api.get(`reports/reportpdf/${id}`, { 
      responseType: 'blob' 
    });

   
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `relatorio_${id}_safetemp.pdf`);
    document.body.appendChild(link);
    link.click();
    
   
    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
    alert("Não foi possível baixar o PDF.");
  } finally {
    setIsDownloading(prev => ({ ...prev, pdf: false }));
  }
};

const handleCSVDownload = async (id: number) => {
  setIsDownloading(prev => ({ ...prev, csv: true }));
  try {
    const response = await api.get(`data/exportcsv`, { 
      params: { type: 'relatorios', id },
      responseType: 'blob' 
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `resumo_relatorio_${id}.csv`);
    document.body.appendChild(link);
    link.click();
    
    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
    alert("Erro ao exportar CSV.");
  } finally {
    setIsDownloading(prev => ({ ...prev, csv: false }));
  }
};

const handleShare = async (id: number) => {
 
  if (!navigator.share) {
    alert("Compartilhamento não suportado neste navegador. O arquivo será baixado.");
    handlePDFDownload(id);
    return;
  }

  setIsDownloading(prev => ({ ...prev, share: true }));
  try {
    const response = await api.get(`reports/reportpdf/${id}`, { responseType: 'blob' });
    const file = new File([response.data], `relatorio_${id}.pdf`, { type: 'application/pdf' });

    await navigator.share({
      title: 'Relatório SafeTemp',
      text: `Confira os dados térmicos da estufa #${id}`,
      files: [file],
    });
  } catch (error) {
    console.error("Erro ao compartilhar:", error);
  } finally {
    setIsDownloading(prev => ({ ...prev, share: false }));
  }
};

  return (
    <div className="flex min-h-screen bg-[#f8f9fc]">
    <Navbar />

    <div className="flex-1 flex flex-col p-8">
      
      <div className="mb-8 mt-20">
        <ReportsHero viewMode={viewMode} setViewMode={setViewMode}/>
      </div>

      <div className="flex gap-8 items-start">
        <aside className="w-[400px] bg-white rounded-[2.5rem] border border-gray-100 flex flex-col shadow-xl z-10 overflow-hidden">
          <div className="p-6 border-b border-gray-50 bg-gray-50/30">
            <h2 className="text-xl font-black text-gray-800 mb-4 flex items-center gap-2">
              <LuFilter className="text-brand-purple" /> Filtro de Relatórios
            </h2>
            <form onSubmit={handleSearch} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Início</label>
                  <input 
                    type="date" 
                    className="w-full p-2 bg-white border border-gray-200 rounded-xl text-xs font-bold outline-none focus:border-brand-purple"
                    onChange={(e) => setSearchDates({...searchDates, inicio: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Fim</label>
                  <input 
                    type="date" 
                    className="w-full p-2 bg-white border border-gray-200 rounded-xl text-xs font-bold outline-none focus:border-brand-purple"
                    onChange={(e) => setSearchDates({...searchDates, fim: e.target.value})}
                  />
                </div>
              </div>
              <button type="submit" className="w-full py-3 cursor-pointer bg-brand-purple text-white rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-all">
                <LuSearch size={16} /> Pesquisar
              </button>
            </form>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-2">
              {reports.length} Resultados encontrados
            </p>
            {loading ? (
                <div className="text-center py-10 font-bold text-gray-300 animate-pulse">Buscando...</div>
            ) : (
              reports.map((report) => (
                <button
                  key={report.id}
                  onClick={() => setSelectedReport(report)}
                  className={`
                    w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 text-left border
                    ${selectedReport?.id === report.id 
                      ? 'bg-brand-purple cursor-pointer text-white border-brand-purple shadow-lg scale-[1.02]' 
                      : 'bg-white cursor-pointer text-gray-600 border-gray-100 hover:border-brand-purple/30'}
                  `}
                >
                  <div className={`p-2.5 rounded-xl ${selectedReport?.id === report.id ? 'bg-white/20' : 'bg-brand-purple/10 text-brand-purple'}`}>
                    <LuFileText size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-black truncate">Relatório #{report.id}</p>
                    <p className={`text-[9px] font-bold ${selectedReport?.id === report.id ? 'text-white/60' : 'text-gray-400'}`}>
                        {new Date(report.data).toLocaleDateString()} às {new Date(report.data).toLocaleTimeString()}
                    </p>
                  </div>
                  <LuChevronRight size={14} />
                </button>
              ))
            )}
          </div>
        </aside>

      {/* ÁREA DE VISUALIZAÇÃO (70%) */}
     <main className="bg-[#f8f9fc] relative ">
  <AnimatePresence mode="wait">
    {selectedReport ? (
      <motion.div
        key={selectedReport.id + viewMode} 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-2 border-b border-gray-50 pb-8">
            <h2 className="text-3xl font-black text-gray-900 leading-tight">Visualizar Relatório</h2>
          </div>
          
          <div className='flex justify-between gap-2 items-center mb-6'>
            <img src={logost} className='max-w-[20%]' alt="Logo" />
            <h1 className='text-gray-900 uppercase font-normal tracking-[0.2em]'>Relatório de Temperatura</h1>
          </div>
          
          <div className='flex flex-col max-w-full px-2 gap-1'>
            <p><strong>ID Relatório:</strong> {selectedReport.id}</p>
            <p><strong>Gerado em:</strong> {formatToBR(selectedReport.criado_em)}</p>
            <p><strong>Chip ID:</strong> {selectedReport.chip_id}</p>
          </div>

          <div className='h-[1px] bg-[#e7e7e7] mb-8 mt-5'></div>
          
          {viewMode === 'leitura' ? (
            <div className="animate-in fade-in duration-500">
              <h1 className='text-gray-900 font-bold text-lg border-l-6 border-[#4A148C] pl-2 mb-6'>Resumo Estatístico</h1>
              
              <div className="grid grid-cols-4 gap-4 mb-10">
                {[
                  { label: 'Média Geral', val: parseResumo(selectedReport.resumo)?.media.toFixed(2), unit: '°C' },
                  { label: 'Mínima', val: parseResumo(selectedReport.resumo)?.min, unit: '°C' },
                  { label: 'Máxima', val: parseResumo(selectedReport.resumo)?.max, unit: '°C' },
                  { label: 'Registros', val: parseResumo(selectedReport.resumo)?.registros, unit: 'un' }
                ].map((stat, i) => (
                  <div key={i} className="bg-gray-50 p-5 rounded-3xl border border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter mb-1">{stat.label}</p>
                    <p className="text-xl font-black text-brand-purple">{stat.val}<span className="text-xs ml-0.5">{stat.unit}</span></p>
                  </div>
                ))}
              </div>

              <div className="prose prose-purple max-w-none mb-10">
                <div className="whitespace-pre-wrap text-sm text-gray-600 leading-relaxed font-medium bg-gray-50/50 p-8 rounded-3xl border border-dashed border-gray-200">
                  {selectedReport.relatorio}
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in duration-500 space-y-8">
              <h1 className='text-gray-900 font-bold text-lg border-l-6 border-brand-orange pl-2'>Histórico de Telemetria</h1>
            
                <ReportDataChart reportId={selectedReport.id} />
           
            </div>
          )}

          <div className="flex items-center justify-between p-6 bg-white/50 backdrop-blur-sm border border-gray-100 rounded-[2rem] shadow-sm">
            <div className="flex flex-col">
              <span className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${viewMode === 'leitura' ? 'text-brand-purple' : 'text-brand-orange'}`}>
                Gestão de Dados
              </span>
              <h3 className="text-sm font-bold text-gray-700">Exportar Resultados</h3>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => handlePDFDownload(selectedReport.id)} disabled={isDownloading.pdf} className="group flex items-center cursor-pointer gap-3 px-6 py-3 bg-[#ff3838] text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-red-500/20 hover:scale-105 transition-all disabled:opacity-50">
                {isDownloading.pdf ? <LuLoader size={18} className="animate-spin" /> : <LuFileText size={18} />}
                <span>PDF</span>
              </button>
              
              <button onClick={() => handleCSVDownload(selectedReport.id)} disabled={isDownloading.csv} className="group flex items-center cursor-pointer gap-3 px-6 py-3 bg-[#27ae60] text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-green-600/20 hover:scale-105 transition-all disabled:opacity-50">
                {isDownloading.csv ? <LuLoader size={18} className="animate-spin" /> : <LuDownload size={18} />}
                <span>CSV</span>
              </button>

              <button onClick={() => handleShare(selectedReport.id)} className="flex items-center cursor-pointer justify-center w-12 h-11 bg-[#3498db] text-white rounded-2xl shadow-lg hover:scale-110 transition-all">
                <LuShare2 size={20} />
              </button>
            </div>
          </div>

        </div>
      </motion.div>
    ) : (
      <div className="h-full flex flex-col items-center justify-center text-gray-300">
        <LuFileText size={64} className="mb-4 opacity-20" />
        <p className="font-bold text-xl">Selecione um relatório para visualizar</p>
      </div>
    )}
  </AnimatePresence>
</main>
    </div>
    </div>
  </div>
  );
};

export default ReportsPage;