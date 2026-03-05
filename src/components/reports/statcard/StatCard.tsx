import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon: React.ReactNode;
  color: 'purple' | 'orange' | 'blue' | 'red' | 'green';
}

const StatCard = ({ label, value, unit, icon, color }: StatCardProps) => {
 
  const colorStyles = {
    purple: "bg-brand-purple/10 text-brand-purple border-brand-purple/20",
    orange: "bg-brand-orange/10 text-brand-orange border-brand-orange/20",
    blue: "bg-blue-50 text-blue-500 border-blue-100",
    red: "bg-red-50 text-red-500 border-red-100",
    green: "bg-green-50 text-green-500 border-green-100",
  };

  const iconStyles = {
    purple: "bg-brand-purple text-white",
    orange: "bg-brand-orange text-white",
    blue: "bg-blue-500 text-white",
    red: "bg-red-500 text-white",
    green: "bg-green-500 text-white",
  };

  return (
    <div className={`p-6 rounded-[2rem] border transition-all duration-300 hover:shadow-lg hover:scale-[1.02] bg-white ${colorStyles[color]}`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-black uppercase tracking-[0.15em] opacity-70">
          {label}
        </span>
        <div className={`p-2 rounded-xl shadow-sm ${iconStyles[color]}`}>
          {React.cloneElement(icon as React.ReactElement)}
        </div>
      </div>
      
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-black tracking-tight text-gray-800">
          {value}
        </span>
        {unit && (
          <span className="text-xs font-bold opacity-60">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;