import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { Card } from '../../components/ui/Card';
import { SummaryCard } from '../../components/dashboard/SummaryCard';
import { Wallet, Trophy, BarChart3, TrendingUp } from 'lucide-react';
// Assuming we are using a simple UI visualization since recharts isn't explicitly installed yet, 
// but we will build out the layout perfectly.

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1';

export const Reports: React.FC = () => {
  const [dailyData, setDailyData] = useState<any[]>([]);
  const [courtData, setCourtData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setIsLoading(true);
    try {
      // Mocking fetch since we don't have real data yet but need to structure the UI
      // In production this calls GET /reports/daily and GET /reports/by-court
      setTimeout(() => {
        setDailyData([
          { date: '2026-04-15', revenue: 450000 },
          { date: '2026-04-16', revenue: 800000 },
          { date: '2026-04-17', revenue: 650000 },
          { date: '2026-04-18', revenue: 1200000 },
          { date: '2026-04-19', revenue: 1500000 },
          { date: '2026-04-20', revenue: 900000 },
          { date: '2026-04-21', revenue: 1100000 },
        ]);
        
        setCourtData([
          { court: 'Futsal A (Vinyl)', revenue: 5400000, percentage: 45 },
          { court: 'Basket Full Court', revenue: 3600000, percentage: 30 },
          { court: 'Futsal B (Sintetis)', revenue: 1800000, percentage: 15 },
          { court: 'Badminton Pro', revenue: 1200000, percentage: 10 },
        ]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Failed to fetch reports', error);
      setIsLoading(false);
    }
  };

  const totalRevenue = dailyData.reduce((acc, curr) => acc + curr.revenue, 0);
  const bestCourt = courtData.length > 0 ? courtData[0].court : '-';

  const formatRupiah = (val: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);

  return (
    <AdminLayout>
      <div className="mb-10 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Laporan Keuangan</h2>
          <p className="text-slate-500 font-medium">Analisis pendapatan dan performa lapangan secara detail.</p>
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 outline-none focus:border-green-500 transition-all font-semibold shadow-sm">
            <option>7 Hari Terakhir</option>
            <option>30 Hari Terakhir</option>
            <option>Bulan Ini</option>
            <option>Tahun Ini</option>
          </select>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <SummaryCard 
          title="Total Pendapatan (Periode Ini)" 
          value={formatRupiah(totalRevenue)} 
          icon={<Wallet size={26} strokeWidth={2.5} />} 
          colorTheme="green"
        />
        <SummaryCard 
          title="Lapangan Terlaris" 
          value={bestCourt} 
          icon={<Trophy size={26} strokeWidth={2.5} />} 
          colorTheme="orange"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Daily Revenue Chart Placeholder/Visual */}
        <Card className="flex flex-col shadow-sm border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
              <TrendingUp size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Tren Pendapatan Harian</h3>
          </div>
          
          <div className="flex-1 bg-slate-50 rounded-2xl border border-slate-100 p-6 flex flex-col justify-end min-h-[300px]">
            {isLoading ? (
              <div className="h-full flex items-center justify-center animate-pulse">
                <BarChart3 className="w-12 h-12 text-slate-300" />
              </div>
            ) : (
              <div className="flex items-end justify-between h-48 gap-2 mt-auto">
                {dailyData.map((data, idx) => {
                  const maxRevenue = Math.max(...dailyData.map(d => d.revenue));
                  const height = `${(data.revenue / maxRevenue) * 100}%`;
                  return (
                    <div key={idx} className="flex flex-col items-center flex-1 group">
                      <div className="w-full relative flex justify-center items-end h-full">
                        {/* Tooltip */}
                        <div className="opacity-0 group-hover:opacity-100 absolute -top-10 bg-slate-900 text-white text-xs font-bold py-1.5 px-3 rounded-lg whitespace-nowrap transition-opacity pointer-events-none z-10 shadow-xl">
                          {formatRupiah(data.revenue)}
                        </div>
                        {/* Bar */}
                        <div 
                          className="w-full max-w-[40px] bg-indigo-500 rounded-t-md transition-all duration-500 ease-out group-hover:bg-indigo-600"
                          style={{ height }}
                        ></div>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-400 mt-3 whitespace-nowrap truncate w-full text-center">
                        {new Date(data.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </Card>

        {/* Revenue by Court */}
        <Card className="flex flex-col shadow-sm border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <BarChart3 size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Pendapatan per Lapangan</h3>
          </div>

          <div className="flex-1 space-y-6">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-16 bg-slate-100 animate-pulse rounded-xl"></div>
                ))}
              </div>
            ) : (
              courtData.map((data, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-bold text-slate-800">{data.court}</span>
                    <span className="font-black text-slate-900">{formatRupiah(data.revenue)}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-blue-500 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${data.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Reports;
