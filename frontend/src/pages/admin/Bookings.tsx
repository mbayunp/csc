import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { Table } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Search, Filter, CheckCircle, XCircle } from 'lucide-react';

import { useToast } from '../../components/ui/Toast';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1';

export const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // Modal states
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      // Assuming a GET /bookings endpoint exists for admin
      const response = await fetch(`${API_URL}/bookings`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Placeholder for auth
        }
      });
      if (response.ok) {
        const data = await response.json();
        setBookings(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch bookings', error);
      toast('Gagal mengambil data booking', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = async (action: 'approve' | 'reject') => {
    if (!selectedBooking) return;
    setActionLoading(true);
    try {
      const response = await fetch(`${API_URL}/bookings/${selectedBooking.id}/${action}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        // Optimistic update
        setBookings(prev => prev.map(b => 
          b.id === selectedBooking.id ? { ...b, status: action === 'approve' ? 'approved' : 'rejected' } : b
        ));
        toast(`Booking berhasil di-${action}`, 'success');
      } else {
        throw new Error('Action failed');
      }
    } catch (error) {
      console.error(`Failed to ${action} booking`, error);
      toast(`Gagal melakukan ${action} booking`, 'error');
    } finally {
      setActionLoading(false);
      setIsApproveModalOpen(false);
      setIsRejectModalOpen(false);
      setSelectedBooking(null);
    }
  };

  // Debounce search term
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Derived state for filtering
  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.customer_name?.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    { 
      header: 'Customer', 
      accessor: (row: any) => (
        <div>
          <p className="font-bold text-slate-900">{row.customer_name || 'Tamu'}</p>
          <p className="text-xs text-slate-500">{row.phone || '-'}</p>
        </div>
      )
    },
    { header: 'Lapangan', accessor: (row: any) => row.Court?.name || 'Unknown' },
    { 
      header: 'Jadwal', 
      accessor: (row: any) => (
        <div>
          <p className="font-semibold text-slate-800">{row.date}</p>
          <p className="text-sm text-slate-500">{row.start_time} ({row.duration} Jam)</p>
        </div>
      )
    },
    { 
      header: 'Total', 
      accessor: (row: any) => <span className="font-bold text-slate-900">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(row.total_price)}</span>
    },
    { 
      header: 'Status', 
      accessor: (row: any) => <Badge status={row.status} /> 
    },
    { 
      header: 'Aksi', 
      accessor: (row: any) => row.status === 'pending' ? (
        <div className="flex gap-2">
          <button 
            onClick={() => { setSelectedBooking(row); setIsApproveModalOpen(true); }}
            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            title="Approve"
          >
            <CheckCircle size={20} />
          </button>
          <button 
            onClick={() => { setSelectedBooking(row); setIsRejectModalOpen(true); }}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Reject"
          >
            <XCircle size={20} />
          </button>
        </div>
      ) : (
        <span className="text-xs text-slate-400 italic">Selesai</span>
      )
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Manajemen Booking</h2>
          <p className="text-slate-500 font-medium">Kelola dan verifikasi pesanan lapangan masuk.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50/50">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input 
              placeholder="Cari nama customer..." 
              className="pl-10 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Filter className="text-slate-400 w-5 h-5 hidden sm:block" />
            <select 
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Semua Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="p-0">
          <Table 
            data={filteredBookings} 
            columns={columns} 
            keyExtractor={(row) => row.id} 
            isLoading={isLoading}
            emptyMessage="Tidak ada data booking yang cocok."
          />
        </div>
      </div>

      {/* Approve Modal */}
      <Modal isOpen={isApproveModalOpen} onClose={() => setIsApproveModalOpen(false)} title="Konfirmasi Approve">
        <div className="mb-6">
          <p className="text-slate-600">Apakah Anda yakin ingin menyetujui booking dari <strong className="text-slate-900">{selectedBooking?.customer_name}</strong>?</p>
          <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-sm"><span className="text-slate-500">Lapangan:</span> <span className="font-semibold">{selectedBooking?.Court?.name}</span></p>
            <p className="text-sm mt-1"><span className="text-slate-500">Jadwal:</span> <span className="font-semibold">{selectedBooking?.date} • {selectedBooking?.start_time}</span></p>
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <Button variant="ghost" onClick={() => setIsApproveModalOpen(false)}>Batal</Button>
          <Button onClick={() => handleAction('approve')} isLoading={actionLoading}>Setujui Booking</Button>
        </div>
      </Modal>

      {/* Reject Modal */}
      <Modal isOpen={isRejectModalOpen} onClose={() => setIsRejectModalOpen(false)} title="Konfirmasi Reject">
        <div className="mb-6">
          <p className="text-slate-600">.......Apakah Anda yakin ingin menolak booking dari <strong className="text-slate-900">{selectedBooking?.customer_name}</strong>?</p>
          <p className="text-sm text-red-500 mt-2">Tindakan ini tidak dapat dibatalkan.</p>
        </div>
        <div className="flex gap-3 justify-end">
          <Button variant="ghost" onClick={() => setIsRejectModalOpen(false)}>Batal</Button>
          <Button variant="danger" onClick={() => handleAction('reject')} isLoading={actionLoading}>Tolak Booking</Button>
        </div>
      </Modal>

    </AdminLayout>
  );
};

export default Bookings;
