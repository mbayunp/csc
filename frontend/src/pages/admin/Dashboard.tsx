import React from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { SummaryCard } from '../../components/dashboard/SummaryCard';
import { Wallet, CalendarCheck, Users, Activity, BarChart3, Clock, ArrowUpRight } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Table } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export const Dashboard: React.FC = () => {
  // Mock data for table
  const recentBookings = [
    { id: '1', customer: 'Budi Santoso', court: 'Futsal A (Vinyl)', date: '21 Apr 2026', time: '19:00', status: 'approved', price: 120000 },
    { id: '2', customer: 'Andi Pratama', court: 'Badminton Pro', date: '21 Apr 2026', time: '20:00', status: 'pending', price: 60000 },
    { id: '3', customer: 'Tim Basket XYZ', court: 'Basket Full Court', date: '22 Apr 2026', time: '15:00', status: 'approved', price: 300000 },
    { id: '4', customer: 'Dimas Anggara', court: 'Futsal B', date: '22 Apr 2026', time: '16:00', status: 'rejected', price: 100000 },
  ];

  const columns = [
    { header: 'Customer', accessor: 'customer' as const },
    { header: 'Lapangan', accessor: 'court' as const },
    { 
      header: 'Jadwal', 
      accessor: (row: any) => <span className="font-semibold text-slate-800">{row.date} <span className="text-slate-300 font-normal mx-1.5">•</span> {row.time}</span> 
    },
    { 
      header: 'Total', 
      accessor: (row: any) => <span className="font-bold text-slate-900">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(row.price)}</span>
    },
    { 
      header: 'Status', 
      accessor: (row: any) => <Badge status={row.status} /> 
    },
  ];

  // Live Date
  const today = new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());

  return (
    <AdminLayout>
      {/* Premium Header */}
      <div className="mb-10 pb-6 border-b border-slate-200 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-semibold mb-4">
            <Clock size={16} className="text-indigo-500" />
            <span>{today}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Overview Dashboard</h2>
          <p className="text-slate-500 font-medium text-lg">Pantau performa dan ringkasan aktivitas CSC hari ini.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-white">Unduh Laporan</Button>
          <Button>Buat Booking Manual</Button>
        </div>
      </div>

      {/* Grid Summary Cards with varying widths for dynamic feel */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <div className="xl:col-span-1">
          <SummaryCard 
            title="Pendapatan (Bulan Ini)" 
            value="Rp 15.4M" 
            icon={<Wallet size={24} strokeWidth={2.5} />} 
            trend={{ value: 12, isPositive: true }}
            colorTheme="green"
          />
        </div>
        <div className="xl:col-span-1">
          <SummaryCard 
            title="Booking Aktif Hari Ini" 
            value="24" 
            icon={<CalendarCheck size={24} strokeWidth={2.5} />} 
            colorTheme="blue"
          />
        </div>
        <div className="xl:col-span-1">
          <SummaryCard 
            title="Total User Aktif" 
            value="1,240" 
            icon={<Users size={24} strokeWidth={2.5} />} 
            trend={{ value: 5, isPositive: true }}
            colorTheme="purple"
          />
        </div>
        <div className="xl:col-span-1">
          <SummaryCard 
            title="Tingkat Utilisasi" 
            value="78%" 
            icon={<Activity size={24} strokeWidth={2.5} />} 
            colorTheme="orange"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Bookings Table - takes 2 cols on XL */}
        <div className="xl:col-span-2 flex flex-col">
          <Card noPadding className="flex-1 shadow-sm border-slate-200">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-white/50 backdrop-blur-sm">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Booking Terbaru</h3>
                <p className="text-sm text-slate-500 font-medium mt-0.5">Transaksi terakhir yang masuk ke sistem.</p>
              </div>
              <a href="/admin/bookings" className="inline-flex items-center gap-1 text-sm font-semibold text-green-600 hover:text-green-700 hover:bg-green-50 px-3 py-1.5 rounded-lg transition-all duration-200 ease-out">
                Lihat Semua <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="p-0 bg-white">
              <Table 
                data={recentBookings} 
                columns={columns} 
                keyExtractor={(row) => row.id} 
                emptyMessage="Belum ada booking masuk hari ini."
              />
            </div>
          </Card>
        </div>

        {/* Analytics Placeholder - takes 1 col on XL */}
        <div className="xl:col-span-1 flex flex-col">
          <Card className="flex-1 p-6 shadow-sm border-slate-200 bg-white relative overflow-hidden group cursor-default">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-gradient-to-br from-indigo-50 to-blue-50 opacity-50 transition-transform duration-500 group-hover:scale-150"></div>
            
            <h3 className="text-lg font-bold text-slate-900 relative z-10 mb-6">Tren Pendapatan</h3>
            
            <div className="flex-1 bg-slate-50/80 rounded-2xl border border-slate-200/60 flex flex-col items-center justify-center min-h-[320px] p-8 text-center relative z-10">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-6 transform transition-transform duration-300 group-hover:-translate-y-1">
                <BarChart3 className="w-10 h-10 text-slate-400" />
              </div>
              <p className="text-slate-900 font-bold mb-2">Area Visualisasi Data</p>
              <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-[200px]">
                Integrasikan library chart (misal: Recharts) untuk grafik dinamis.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
