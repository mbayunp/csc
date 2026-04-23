import React from 'react';
import { Card } from '../ui/Card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  colorTheme?: 'green' | 'blue' | 'purple' | 'orange';
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend,
  colorTheme = 'green'
}) => {
  const themes = {
    green: 'bg-green-50 text-green-600',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
  };

  return (
    <Card className="flex flex-col justify-between p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/50 group cursor-default">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3.5 rounded-2xl ${themes[colorTheme]} transition-transform duration-300 group-hover:scale-110`}>
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-semibold px-2.5 py-1 rounded-full ${trend.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {trend.isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-500 mb-1">{title}</p>
        <h4 className="text-3xl font-black text-gray-900 tracking-tight">{value}</h4>
        {trend && (
          <p className="text-xs mt-2 text-gray-400 font-medium">dibandingkan bulan lalu</p>
        )}
      </div>
    </Card>
  );
};
