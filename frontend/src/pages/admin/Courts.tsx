import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Power, Trash2, Save, X, Activity } from 'lucide-react';
import { useToast } from '../../components/ui/Toast';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1';

interface CourtData {
  id?: number;
  name: string;
  type: string;
  price_per_hour: number | string;
  is_active: boolean;
}

const Courts = () => {
  const { toast } = useToast();
  const [courts, setCourts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedCourtId, setSelectedCourtId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CourtData>({
    name: '',
    type: 'futsal',
    price_per_hour: '',
    is_active: true
  });

  const fetchCourts = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('csc_token');
      const res = await fetch(`${API_URL}/courts/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.status === 'success') {
        setCourts(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch courts', error);
      toast('Failed to load courts', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleStatus = async (id: number, currentStatus: boolean) => {
    try {
      const token = localStorage.getItem('csc_token');
      const newStatus = !currentStatus;
      const res = await fetch(`${API_URL}/courts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ is_active: newStatus })
      });
      const data = await res.json();
      if (data.status === 'success') {
        setCourts(courts.map(court => 
          court.id === id ? { ...court, is_active: newStatus } : court
        ));
        toast('Status berhasil diubah', 'success');
      } else {
        toast(data.message || 'Failed to update court status', 'error');
      }
    } catch (error) {
      console.error('Failed to update court status', error);
      toast('Network error while updating court', 'error');
    }
  };

  const openAddModal = () => {
    setModalMode('add');
    setFormData({ name: '', type: 'futsal', price_per_hour: '', is_active: true });
    setSelectedCourtId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (court: any) => {
    setModalMode('edit');
    setFormData({ 
      name: court.name, 
      type: court.type, 
      price_per_hour: court.price_per_hour, 
      is_active: court.is_active 
    });
    setSelectedCourtId(court.id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.type || !formData.price_per_hour) {
      toast('Harap lengkapi semua data wajib', 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('csc_token');
      const url = modalMode === 'add' ? `${API_URL}/courts/` : `${API_URL}/courts/${selectedCourtId}`;
      const method = modalMode === 'add' ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          price_per_hour: Number(formData.price_per_hour)
        })
      });

      const data = await res.json();

      if (res.ok && data.status === 'success') {
        toast(modalMode === 'add' ? 'Lapangan berhasil ditambah' : 'Lapangan berhasil diperbarui', 'success');
        closeModal();
        fetchCourts(); // Refresh list
      } else {
        toast(data.message || 'Gagal menyimpan lapangan', 'error');
      }
    } catch (error) {
      console.error('Save error:', error);
      toast('Terjadi kesalahan jaringan', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`Yakin ingin menghapus lapangan "${name}" secara permanen?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('csc_token');
      const res = await fetch(`${API_URL}/courts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();

      if (res.ok && data.status === 'success') {
        toast('Lapangan berhasil dihapus', 'success');
        setCourts(courts.filter(c => c.id !== id));
      } else {
        toast(data.message || 'Gagal menghapus lapangan', 'error');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast('Terjadi kesalahan jaringan saat menghapus', 'error');
    }
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Manajemen Lapangan</h1>
          <p className="text-slate-500 text-sm mt-1">Kelola data, tambah lapangan, dan atur status operasional.</p>
        </div>
        
        <button onClick={openAddModal} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl transition-all shadow-sm hover:shadow hover:-translate-y-0.5">
          <Plus className="w-5 h-5" />
          <span className="font-semibold text-sm">Tambah Lapangan</span>
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : courts.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center text-slate-500 shadow-sm border border-slate-100 flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
            <Activity className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-700 mb-1">Belum ada Lapangan</h3>
          <p className="text-sm">Silakan tambah lapangan terlebih dahulu.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {courts.map((court) => (
            <div key={court.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 relative overflow-hidden group">
              <div className={`absolute top-0 left-0 w-1.5 h-full ${court.is_active ? 'bg-green-500' : 'bg-red-500'}`}></div>
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{court.name}</h3>
                  <p className="text-sm font-medium text-slate-500 mt-0.5 capitalize">{court.type}</p>
                </div>
                <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${
                  court.is_active ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
                }`}>
                  {court.is_active ? 'Aktif' : 'Maintenance'}
                </span>
              </div>

              <div className="mb-6 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Harga per jam</p>
                <p className="text-lg font-black text-slate-800">Rp {Number(court.price_per_hour).toLocaleString('id-ID')}</p>
              </div>

              <div className="flex flex-wrap items-center justify-between pt-4 border-t border-slate-100 gap-y-3">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => openEditModal(court)}
                    className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1.5 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(court.id, court.name)}
                    className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 px-2 py-1.5 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Hapus
                  </button>
                </div>
                
                <button 
                  onClick={() => toggleStatus(court.id, court.is_active)}
                  className={`flex items-center gap-1.5 text-sm font-bold transition-colors px-3 py-1.5 rounded-lg ${
                    court.is_active 
                      ? 'text-red-600 bg-red-50 hover:bg-red-100' 
                      : 'text-green-600 bg-green-50 hover:bg-green-100'
                  }`}
                >
                  <Power className="w-4 h-4" />
                  {court.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-800">
                {modalMode === 'add' ? 'Tambah Lapangan Baru' : 'Edit Lapangan'}
              </h2>
              <button onClick={closeModal} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Nama Lapangan</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 font-medium transition-all"
                  placeholder="Misal: Futsal A (Vinyl)"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Tipe Olahraga</label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 font-medium transition-all appearance-none bg-white"
                  required
                >
                  <option value="futsal">Futsal</option>
                  <option value="badminton">Badminton</option>
                  <option value="basket">Basket</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Harga per Jam (Rp)</label>
                <input 
                  type="number" 
                  value={formData.price_per_hour}
                  onChange={(e) => setFormData({...formData, price_per_hour: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 font-medium transition-all"
                  placeholder="Misal: 150000"
                  min="0"
                  step="1000"
                  required
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <label className="block text-sm font-bold text-slate-800">Status Operasional</label>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Lapangan dapat disewa jika aktif</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={formData.is_active}
                    onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={closeModal}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed transition-colors shadow-sm shadow-blue-600/20"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Simpan
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Courts;
