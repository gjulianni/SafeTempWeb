import { LuInfo, LuArrowUpRight, LuArrowDownRight } from 'react-icons/lu';

interface MetricRowProps {
  label: string;
  metric: {
    absolute: number;
    percentage: number;
  } | undefined;
  isLowerBetter?: boolean; 
  onInfoPress: (label: string) => void;
}

export const MetricRow = ({ label, metric, isLowerBetter = false, onInfoPress }: MetricRowProps) => {
  if (!metric) return null;

  const isPositive = metric.absolute > 0;
  const isGood = isLowerBetter ? !isPositive : isPositive;
  
  const colorClass = isGood ? 'text-green-500' : 'text-red-500';
  const bgBadgeClass = isGood ? 'bg-green-50' : 'bg-red-50';

  return (
    <div className="flex items-center justify-between p-4 hover:bg-white hover:shadow-sm transition-all rounded-2xl group">
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-gray-500">{label}</span>
        <button 
          onClick={() => onInfoPress(label)}
          className="text-gray-300 hover:text-brand-purple transition-colors"
        >
          <LuInfo size={14} />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <span className={`text-sm font-black ${colorClass}`}>
          {isPositive ? '+' : ''}{metric.absolute.toFixed(2)}
        </span>
        
        <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${bgBadgeClass} ${colorClass}`}>
          {isPositive ? <LuArrowUpRight size={12} /> : <LuArrowDownRight size={12} />}
          <span className="text-[10px] font-black uppercase">
            {Math.abs(metric.percentage).toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
};