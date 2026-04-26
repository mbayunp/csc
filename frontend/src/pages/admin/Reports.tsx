import React, { useState, useEffect } from 'react';
import { Calendar, DollarSign, Activity, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1';

const Reports = () => {
  const [dailyRevenue, setDailyRevenue] = useState<any[]>([]);
  const [revenueByCourt, setRevenueByCourt] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Helper fungsi untuk format Rupiah presisi (Rp. xxx.xxx,00)
  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 2,
    }).format(number);
  };

  // Helper fungsi untuk format singkat di sumbu Y grafik (agar tidak terlalu penuh)
  const formatRupiahShort = (number: number) => {
    if (number >= 1000000) {
      return `Rp ${(number / 1000000).toFixed(1)}jt`;
    }
    return `Rp ${number.toLocaleString('id-ID')}`;
  };

  useEffect(() => {
    const fetchReports = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('csc_token');
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };

        const [dailyRes, courtRes] = await Promise.all([
          fetch(`${API_URL}/reports/daily`, { headers }),
          fetch(`${API_URL}/reports/by-court`, { headers })
        ]);

        const dailyData = await dailyRes.json();
        const courtData = await courtRes.json();

        if (dailyData.status === 'success') {
          setDailyRevenue(dailyData.data.reverse());
        }
        if (courtData.status === 'success') {
          setRevenueByCourt(courtData.data);
        }
      } catch (error) {
        console.error('Failed to fetch reports', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  const totalRevenue = dailyRevenue.reduce((sum, item) => sum + Number(item.total_revenue), 0);

  const typeRevenue: Record<string, number> = {};
  revenueByCourt.forEach(item => {
    const type = item.Court?.type || 'Lainnya';
    if (!typeRevenue[type]) typeRevenue[type] = 0;
    typeRevenue[type] += Number(item.total_revenue);
  });

  const chartData = Object.keys(typeRevenue).map(key => ({
    name: key,
    Pendapatan: typeRevenue[key]
  }));

  const dailyChartData = dailyRevenue.map(item => {
    const dateObj = new Date(item.date);
    return {
      date: `${dateObj.getDate()}/${dateObj.getMonth() + 1}`,
      Pendapatan: Number(item.total_revenue)
    };
  });

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Laporan Keuangan</h1>
          <p className="text-slate-500 text-sm mt-1">Ringkasan performa bisnis dan analitik.</p>
        </div>

        <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl transition-all shadow-sm hover:shadow hover:bg-slate-50">
          <Calendar className="w-5 h-5 text-slate-500" />
          <span className="font-medium">Semua Waktu</span>
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Pendapatan Card - UPDATED FORMAT */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Total Pendapatan</p>
                  <h3 className="text-xl font-bold text-slate-800 mt-1">
                    {formatRupiah(totalRevenue)}
                  </h3>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Total Hari Transaksi</p>
                  <h3 className="text-2xl font-bold text-slate-800">{dailyRevenue.length}</h3>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Lapangan Populer</p>
                  <h3 className="text-lg font-bold text-slate-800 truncate">
                    {revenueByCourt.sort((a, b) => Number(b.total_revenue) - Number(a.total_revenue))[0]?.Court?.name || '-'}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Daily Revenue Chart */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm overflow-hidden">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-800">Tren Pendapatan Harian</h2>
                <p className="text-sm text-slate-500">Total pendapatan yang disetujui per hari</p>
              </div>

              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyChartData} margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#64748b', fontSize: 12 }}
                      tickFormatter={formatRupiahShort}
                    />
                    <RechartsTooltip
                      cursor={{ fill: '#f8fafc' }}
                      contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      formatter={(value: any) => [formatRupiah(Number(value)), "Pendapatan"]}
                    />
                    <Bar dataKey="Pendapatan" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Sport Type Revenue Chart */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm overflow-hidden">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-800">Pendapatan per Jenis Olahraga</h2>
                <p className="text-sm text-slate-500">Berdasarkan total pendapatan lapangan</p>
              </div>

              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#64748b', fontSize: 12 }}
                      tickFormatter={formatRupiahShort}
                    />
                    <RechartsTooltip
                      cursor={{ fill: '#f8fafc' }}
                      contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      formatter={(value: any) => [formatRupiah(Number(value)), "Pendapatan"]}
                    />
                    <Bar dataKey="Pendapatan" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Reports;