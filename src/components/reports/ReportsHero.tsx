import { LucideBarChart3, LucideHelpCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { LuFileText, LuCloud, LuContainer } from 'react-icons/lu';

interface ReportsHeroProps {
  viewMode: "leitura" | "graphical";
  setViewMode: (mode: "leitura" | "graphical") => void;
};

interface RememberToggleProps {
  enabled: boolean;
  onToggle: (val: boolean) => void;
}

const ReportsHero = ({ viewMode, setViewMode }: ReportsHeroProps) => {

const RememberToggle = ({ enabled, onToggle }: RememberToggleProps) => (
  <div className="flex items-center gap-3 mt-4 px-2">
    <button
      onClick={() => onToggle(!enabled)}
      className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors cursor-pointer outline-none ${
        enabled ? 'bg-brand-purple' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
    <div className="flex items-center gap-2 group relative">
      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
        Lembrar minha escolha
      </span>
   <div className="cursor-help text-gray-300 hover:text-brand-purple transition-colors">
        <LucideHelpCircle size={14} />
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-52 p-4 bg-gray-900 text-white text-[10px] font-medium leading-relaxed rounded-2xl shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-[100]">
        Ao ativar, guardaremos sua escolha de visualização no navegador para seus próximos acessos.
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900" />
      </div>
    </div>
  </div>
 
);

const [remember, setRemember] = useState(() => {
    return localStorage.getItem("@SafeTemp:viewMode") !== null;
  });

  const handleToggle = (active: boolean) => {
    setRemember(active);
    if (active) {
      localStorage.setItem("@SafeTemp:viewMode", viewMode);
    } else {
      localStorage.removeItem("@SafeTemp:viewMode");
    }
  };

  useEffect(() => {
    if (remember) {
      localStorage.setItem("@SafeTemp:viewMode", viewMode);
    }
  }, [viewMode, remember]);

  return (
   <section className="flex flex-col lg:flex-row justify-center items-center gap-12 lg:gap-20 xl:gap-x-64 p-6 sm:p-12 max-w-full mx-auto rounded-[2.5rem] sm:rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-gray-50 overflow-hidden relative bg-white transition-all duration-500">
  
  {/* LADO ESQUERDO: TEXTO E SELEÇÃO */}
  <div className="space-y-8 relative z-10 max-w-xl flex flex-col items-center lg:items-start text-center lg:text-left">
    <div className="space-y-4">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-purple tracking-tight leading-[1.1]">
        Documentação integrada
      </h2>
      <p className="text-gray-400 font-medium text-base sm:text-lg leading-relaxed max-w-md">
        Utilize nosso sistema para documentar, visualizar e obter dados históricos a qualquer hora, 
        com diferentes formas de visualização.
      </p>
    </div>

    <div className="w-full space-y-4">
      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
        Como você deseja visualizar seus relatórios?
      </p>
      
      {/* Botões empilham em telas muito pequenas e ficam lado a lado a partir de 'sm' */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
        {/* MODO LEITURA */}
        <button 
          onClick={() => setViewMode('leitura')}
          className={`flex-1 p-5 sm:p-6 rounded-3xl cursor-pointer border-2 text-left transition-all group relative overflow-hidden
            ${viewMode === 'leitura' 
              ? 'border-brand-purple bg-brand-purple/5 shadow-lg shadow-brand-purple/10' 
              : 'border-gray-100 bg-white hover:border-brand-purple/30 hover:shadow-md'}`}
        >
          <div className={`p-3 rounded-2xl w-fit mb-4 transition-colors ${viewMode === 'leitura' ? 'bg-brand-purple text-white' : 'bg-gray-100 text-gray-400 group-hover:text-brand-purple'}`}>
            <LuFileText size={24} />
          </div>
          <h4 className={`font-black text-sm uppercase tracking-wider mb-2 ${viewMode === 'leitura' ? 'text-brand-purple' : 'text-gray-600'}`}>
            Modo Leitura
          </h4>
          <p className="text-[11px] sm:text-xs text-gray-400 font-medium leading-relaxed">
            Acesso completo ao conteúdo textual processado pela IA.
          </p>
          {viewMode === 'leitura' && <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-brand-purple animate-ping" />}
        </button>

        {/* FORMATO GRÁFICO */}
        <button 
          onClick={() => setViewMode('graphical')}
          className={`flex-1 p-5 sm:p-6 rounded-3xl cursor-pointer border-2 text-left transition-all group relative overflow-hidden
            ${viewMode === 'graphical' 
              ? 'border-brand-orange bg-brand-orange/5 shadow-lg shadow-brand-orange/10' 
              : 'border-gray-100 bg-white hover:border-brand-orange/30 hover:shadow-md'}`}
        >
          <div className={`p-3 rounded-2xl w-fit mb-4 transition-colors ${viewMode === 'graphical' ? 'bg-brand-orange text-white' : 'bg-gray-100 text-gray-400 group-hover:text-brand-orange'}`}>
            <LucideBarChart3 size={24} />
          </div>
          <h4 className={`font-black text-sm uppercase tracking-wider mb-2 ${viewMode === 'graphical' ? 'text-brand-orange' : 'text-gray-600'}`}>
            Formato Gráfico
          </h4>
          <p className="text-[11px] sm:text-xs text-gray-400 font-medium leading-relaxed">
            Geração dinâmica de gráficos e métricas térmicas.
          </p>
          {viewMode === 'graphical' && <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-brand-orange animate-ping" />}
        </button>
      </div>
    </div>

    <RememberToggle enabled={remember} onToggle={handleToggle} />
  </div>

  {/* LADO DIREITO: ILUSTRAÇÕES (Escondido em mobile/tablet, aparece em LG) */}
  <div className="relative h-[400px] xl:h-[450px] w-full max-w-[500px] hidden lg:flex items-center justify-center">
    <div className="absolute top-0 left-20 xl:left-40 w-56 xl:w-64 h-56 xl:h-64 group animate-float-slow">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/20 to-transparent blur-3xl rounded-full opacity-50" />
      <div className="relative bg-white/40 backdrop-blur-2xl border border-white/20 p-8 rounded-[2rem] shadow-2xl flex flex-col items-center justify-center transform rotate-6 group-hover:rotate-0 transition-transform duration-700">
        <LuCloud className="text-brand-purple mb-4 animate-pulse" size={60} />
        <div className="space-y-2 w-full">
          <div className="h-2 w-full bg-brand-purple/10 rounded-full" />
          <div className="h-2 w-3/4 bg-brand-purple/10 rounded-full" />
          <div className="h-2 w-1/2 bg-brand-orange/20 rounded-full" />
        </div>
      </div>
    </div>

    <div className="absolute bottom-10 left-0 xl:left-10 w-48 xl:w-56 h-48 xl:h-56 animate-float-delayed">
      <div className="relative bg-[#282735] p-6 rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/5">
        <div className="absolute top-2 right-2 w-8 h-8 bg-brand-orange rounded-lg rotate-12 opacity-80" />
        <div className="absolute bottom-4 left-2 w-6 h-6 bg-brand-purple rounded-md -rotate-12 opacity-60" />
        <LuContainer className="text-white/20 absolute -bottom-4 -right-4" size={100} />
        <div className="relative z-10 space-y-3 mt-4">
          <div className="flex items-end gap-1">
            <div className="w-2 h-8 bg-brand-orange rounded-full" />
            <div className="w-2 h-14 bg-brand-purple rounded-full" />
            <div className="w-2 h-10 bg-brand-orange rounded-full" />
          </div>
          <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Data Ecosystem</p>
        </div>
      </div>
    </div>
  </div>
</section>
  );
};

export default ReportsHero;