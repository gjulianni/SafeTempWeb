import { LuShieldCheck, LuShieldAlert, LuShieldOff, LuSparkles, LuInfo } from 'react-icons/lu';

// Interface baseada na estrutura do seu app
interface SummaryType {
  confidence: "alta" | "média" | "baixa";
  tags: string[];
  headline: string;
  highlights: string[];
}

interface Props {
  summary?: SummaryType;
}

const ComparisonSummaryCard = ({ summary }: Props) => {
  if (!summary) return null;

  const getConfidenceStyles = (level: "alta" | "média" | "baixa") => {
    switch (level) {
      case 'alta':
        return {
          textColor: 'text-green-700',
          bgColor: 'bg-green-50',
          borderColor: 'border-l-green-600',
          icon: <LuShieldCheck size={14} />,
          label: 'Confiança Alta'
        };
      case 'média':
        return {
          textColor: 'text-amber-700',
          bgColor: 'bg-amber-50',
          borderColor: 'border-l-amber-600',
          icon: <LuShieldAlert size={14} />,
          label: 'Confiança Média'
        };
      case 'baixa':
        return {
          textColor: 'text-red-700',
          bgColor: 'bg-red-50',
          borderColor: 'border-l-red-600',
          icon: <LuShieldOff size={14} />,
          label: 'Confiança Baixa'
        };
      default:
        return { 
          textColor: 'text-slate-600', 
          bgColor: 'bg-slate-50', 
          borderColor: 'border-l-slate-400', 
          icon: <LuInfo size={14} />, 
          label: 'Confiança' 
        };
    }
  };

  const config = getConfidenceStyles(summary.confidence);

  return (
    <div className={`bg-white p-8 rounded-[2rem] border-l-[6px] shadow-xl shadow-brand-purple/5 transition-all hover:shadow-brand-purple/10 ${config.borderColor}`}>
      
      <div className="flex flex-col gap-4 mb-6">
        <h3 className="text-2xl font-black text-slate-800 tracking-tight">Sumário da IA</h3>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${config.bgColor} ${config.textColor}`}>
            {config.icon}
            {config.label}
          </div>

          <div className="flex gap-2">
            {summary.tags.map((tag, index) => (
              <span key={index} className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="text-lg font-extrabold text-slate-800 leading-snug mb-6">
        {summary.headline}
      </p>

      <ul className="space-y-4 mb-8">
        {summary.highlights.map((highlight, index) => (
          <li key={index} className="flex items-start gap-4">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-purple mt-2.5 shrink-0" />
            <span className="text-sm font-medium text-slate-600 leading-relaxed">
              {highlight}
            </span>
          </li>
        ))}
      </ul>

      <footer className="flex items-center gap-3 pt-6 border-t border-slate-50">
        <div className="p-2 bg-brand-purple/10 rounded-lg text-brand-purple">
          <LuSparkles size={18} />
        </div>
        <p className="text-xs italic font-medium text-brand-purple/80">
          Análise técnica gerada pelo processador Llama 3 do SafeTemp
        </p>
      </footer>
    </div>
  );
};

export default ComparisonSummaryCard;