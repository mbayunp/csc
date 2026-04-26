import React, { useState, useEffect } from 'react';
import { Search, Check, X, Trash2 } from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1';

const Bookings = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('csc_token');
      const res = await fetch(`${API_URL}/bookings/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.status === 'success') {
        setBookings(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch bookings', error);
      toast('Failed to load bookings', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    try {
      const token = localStorage.getItem('csc_token');
      const res = await fetch(`${API_URL}/bookings/${id}/${action}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.status === 'success') {
        // Optimistic UI update
        setBookings(bookings.map(b => b.id === id ? { ...b, status: action === 'approve' ? 'approved' : 'rejected' } : b));
        toast(`Booking ${action === 'approve' ? 'disetujui' : 'ditolak'}`, 'success');
      } else {
        toast(data.message || 'Failed to update booking status', 'error');
      }
    } catch (error) {
      console.error(`Failed to ${action} booking`, error);
      toast('Network error while updating booking', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus pesanan ini? Tindakan ini tidak dapat dibatalkan.')) {
      return;
    }

    try {
      const token = localStorage.getItem('csc_token');
      const res = await fetch(`${API_URL}/bookings/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      
      if (res.ok && data.status === 'success') {
        toast('Booking berhasil dihapus', 'success');
        setBookings(bookings.filter(b => b.id !== id));
      } else {
        toast(data.message || 'Gagal menghapus booking', 'error');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast('Terjadi kesalahan jaringan saat menghapus', 'error');
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const displayBookings = bookings.filter(b => {
    const custName = b.customer_name || 'No Name';
    const courtName = b.Court?.name || 'Unknown Court';
    return custName.toLowerCase().includes(searchTerm.toLowerCase()) || 
           b.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
           courtName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Manajemen Booking</h1>
          <p className="text-slate-500 text-sm mt-1">Kelola semua reservasi lapangan Anda di sini.</p>
        </div>
        
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all shadow-sm"
            placeholder="Cari booking..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden transition-all hover:shadow-md min-h-[400px]">
        {isLoading ? (
          <div className="flex justify-center items-center h-full min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50/50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Lapangan</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Waktu</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Harga</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {displayBookings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-slate-500">Tidak ada data booking ditemukan.</td>
                  </tr>
                ) : displayBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{booking.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{booking.customer_name || 'No Name'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{booking.Court?.name || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{booking.date} • {booking.start_time.substring(0,5)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-700">Rp {Number(booking.total_price).toLocaleString('id-ID')}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border capitalize ${getStatusStyle(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        {booking.status === 'pending' && (
                          <>
                            <button onClick={() => handleAction(booking.id, 'approve')} className="p-1.5 bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 rounded-lg transition-colors" title="Approve">
                              <Check className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleAction(booking.id, 'reject')} className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 rounded-lg transition-colors" title="Reject">
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button onClick={() => handleDelete(booking.id)} className="p-1.5 bg-slate-50 text-slate-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;