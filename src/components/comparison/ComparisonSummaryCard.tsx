import { LuShieldCheck, LuShieldAlert, LuShieldOff, LuSparkles, LuTag } from 'react-icons/lu';
import type { ComparisonResponse } from '../../types/comparison';

type SummaryType = ComparisonResponse['summary'];

interface Props {
  summary?: SummaryType;
}

const ComparisonSummaryCard = ({ summary }: Props) => {
  if (!summary) return null;

  const getConfidenceStyles = (level: "alta" | "média" | "baixa") => {
    switch (level) {
      case 'alta':
        return {
          color: 'text-green-600',
          border: 'border-l-green-600',
          bgColor: 'bg-green-50',
          icon: <LuShieldCheck size={14} />,
          label: 'Confiança Alta'
        };
      case 'média':
        return {
          color: 'text-amber-600',
          border: 'border-l-amber-600',
          bgColor: 'bg-amber-50',
          icon: <LuShieldAlert size={14} />,
          label: 'Confiança Média'
        };
      case 'baixa':
        return {
          color: 'text-red-600',
          border: 'border-l-red-600',
          bgColor: 'bg-red-50',
          icon: <LuShieldOff size={14} />,
          label: 'Confiança Baixa'
        };
      default:
        return { color: 'text-slate-500', border: 'border-l-slate-400', bgColor: 'bg-slate-50', icon: <LuShieldOff size={14} />, label: 'Confiança' };
    }
  };

  const config = getConfidenceStyles(summary.confidence);

  return (
    <div className={`flex flex-col h-full bg-white rounded-[2.5rem] p-8 border-l-[6px] ${config.border} shadow-xl shadow-slate-200/40 transition-all hover:shadow-brand-purple/5`}>
      
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-xl font-black text-slate-800 tracking-tight">Sumário de Insights</h3>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-xl ${config.bgColor} ${config.color}`}>
          {config.icon}
          <span className="text-[10px] font-black uppercase tracking-widest">{config.label}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {summary.tags.map((tag, index) => (
          <div key={index} className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
            <LuTag size={10} /> #{tag}
          </div>
        ))}
      </div>

      <p className="text-lg font-extrabold text-slate-800 leading-tight mb-6 italic">
        "{summary.headline}"
      </p>

      <div className="flex-1 space-y-4 mb-8">
        {summary.highlights.map((highlight, index) => (
          <div key={index} className="flex items-start gap-3 group">
            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-purple shrink-0 group-hover:scale-150 transition-transform" />
            <p className="text-sm text-slate-600 font-medium leading-relaxed">{highlight}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 pt-6 border-t border-slate-50">
        <div className="p-2 bg-brand-purple/10 text-brand-purple rounded-xl">
          <LuSparkles size={18} className="animate-pulse" />
        </div>
        <span className="text-xs font-semibold text-brand-purple italic opacity-80">
          Análise gerada pelo sistema SafeTemp
        </span>
      </div>
    </div>
  );
};

export default ComparisonSummaryCard;