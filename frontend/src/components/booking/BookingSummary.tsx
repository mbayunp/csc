import React, { useEffect, useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { ChevronRight, Lightbulb } from 'lucide-react';

interface BookingSummaryProps {
  courtName?: string;
  date: string;
  time: string | null;
  duration: number;
  totalPrice: number;
  formatRupiah: (val: number) => string;
  customerName: string;
  setCustomerName: (val: string) => void;
  customerPhone: string;
  setCustomerPhone: (val: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  isValid: boolean;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({
  courtName,
  date,
  time,
  duration,
  totalPrice,
  formatRupiah,
  customerName,
  setCustomerName,
  customerPhone,
  setCustomerPhone,
  onSubmit,
  isSubmitting,
  isValid
}) => {
  const [animatePrice, setAnimatePrice] = useState(false);

  // Trigger bounce animation when price changes
  useEffect(() => {
    setAnimatePrice(true);
    const timer = setTimeout(() => setAnimatePrice(false), 300);
    return () => clearTimeout(timer);
  }, [totalPrice]);

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-[2rem] shadow-2xl border border-gray-700/50 p-6 md:p-8 sticky top-28 text-white transition-all">
      <h3 className="text-xl font-bold mb-6 border-b border-gray-700/50 pb-4 text-gray-100">Ringkasan Booking</h3>
      
      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-start">
          <span className="text-gray-400">Lapangan</span>
          <span className="font-semibold text-right max-w-[150px]">{courtName || '-'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Tanggal</span>
          <span className="font-semibold text-gray-100">{date}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Jam Mulai</span>
          {time ? (
            <span className="font-bold text-green-400 bg-green-400/10 px-3 py-1 rounded-lg border border-green-400/20 shadow-inner">
              {time}
            </span>
          ) : (
            <span className="text-gray-500 italic">Belum dipilih</span>
          )}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Durasi</span>
          <span className="font-semibold text-gray-100">{duration} Jam</span>
        </div>
      </div>

      {/* Info Tip */}
      <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-xl mb-6 flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-blue-200 leading-relaxed">
          <strong className="text-blue-300">Tips:</strong> Jam 19:00 - 21:00 biasanya padat. Pastikan Anda datang 15 menit sebelum jadwal.
        </p>
      </div>

      {/* Form Input CS / Tamu */}
      <div className="bg-gray-800/80 p-5 rounded-2xl mb-8 space-y-4 border border-gray-700/50 shadow-inner">
        <Input 
          type="text" 
          placeholder="Nama Pemesan" 
          value={customerName}
          onChange={e => setCustomerName(e.target.value)}
          className="bg-gray-900/50 text-white border-gray-600/50 focus:border-green-500 text-sm placeholder:text-gray-500"
        />
        <Input 
          type="tel" 
          placeholder="No. WhatsApp" 
          value={customerPhone}
          onChange={e => setCustomerPhone(e.target.value)}
          className="bg-gray-900/50 text-white border-gray-600/50 focus:border-green-500 text-sm placeholder:text-gray-500"
        />
      </div>

      <div className="border-t border-gray-700/50 pt-6 mb-8">
        <div className="flex justify-between items-end">
          <span className="text-gray-400 pb-1">Total Pembayaran</span>
          <span className={`text-3xl font-black tracking-tight text-green-400 transition-transform duration-300 ${animatePrice ? 'scale-110' : 'scale-100'}`}>
            {formatRupiah(totalPrice)}
          </span>
        </div>
      </div>

      <Button 
        onClick={onSubmit}
        disabled={!isValid || isSubmitting}
        isLoading={isSubmitting}
        fullWidth
        size="lg"
        className="py-4 text-lg font-bold shadow-green-600/20 shadow-xl"
      >
        Konfirmasi Booking <ChevronRight size={22} className="ml-1" />
      </Button>
    </div>
  );
};
