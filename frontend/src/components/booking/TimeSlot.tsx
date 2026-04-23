import React from 'react';
import { Check } from 'lucide-react';

interface TimeSlotProps {
  time: string;
  isBooked: boolean;
  isSelected: boolean;
  onSelect: (time: string) => void;
  isPopularHour?: boolean;
}

export const TimeSlot: React.FC<TimeSlotProps> = ({ 
  time, 
  isBooked, 
  isSelected, 
  onSelect,
  isPopularHour = false
}) => {
  if (isBooked) {
    return (
      <div className="py-3.5 rounded-xl border border-slate-200 bg-slate-100/50 text-slate-400 font-bold text-center cursor-not-allowed opacity-80 transition-all shadow-inner">
        <span className="line-through decoration-slate-400/60 decoration-2">{time}</span>
      </div>
    );
  }

  return (
    <button
      onClick={() => onSelect(time)}
      className={`
        relative py-3.5 rounded-xl border-2 font-black text-center transition-all duration-300 ease-out focus:outline-none flex items-center justify-center gap-1.5
        ${isSelected 
          ? 'bg-green-600 text-white border-green-600 shadow-lg shadow-green-500/25 transform scale-[1.03] ring-4 ring-green-600/10' 
          : 'bg-white text-slate-700 border-slate-200 hover:border-green-500 hover:text-green-700 hover:bg-green-50/50 hover:shadow-md hover:-translate-y-0.5 active:scale-95'}
      `}
    >
      {isSelected && <Check size={16} strokeWidth={3} className="text-white animate-in zoom-in" />}
      {time}
      
      {isPopularHour && !isSelected && (
        <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-gradient-to-tr from-orange-400 to-yellow-400 border-2 border-white shadow-sm"></span>
        </span>
      )}
    </button>
  );
};
