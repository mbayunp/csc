import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { Table } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Plus, Edit2, Check, X } from 'lucide-react';

import { useToast } from '../../components/ui/Toast';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1';

export const Courts: React.FC = () => {
  const [courts, setCourts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    name: '',
    type: 'Futsal',
    price_per_hour: '',
    is_active: true
  });

  useEffect(() => {
    fetchCourts();
  }, []);

  const fetchCourts = async () => {
    setIsLoading(true);
    try {
      setCourts([
        { id: 1, name: 'Futsal A (Vinyl)', type: 'Futsal', price_per_hour: 120000, is_active: true },
        { id: 2, name: 'Futsal B (Sintetis)', type: 'Futsal', price_per_hour: 100000, is_active: true },
        { id: 3, name: 'Badminton Pro', type: 'Badminton', price_per_hour: 60000, is_active: true },
        { id: 4, name: 'Basket Full Court', type: 'Basket', price_per_hour: 150000, is_active: false },
      ]);
    } catch (error) {
      console.error('Failed to fetch courts', error);
      toast('Gagal memuat daftar lapangan', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setFormData({ id: null, name: '', type: 'Futsal', price_per_hour: '', is_active: true });
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (court: any) => {
    setFormData({ 
      id: court.id, 
      name: court.name, 
      type: court.type, 
      price_per_hour: court.price_per_hour.toString(), 
      is_active: court.is_active 
    });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    // Form validation
    if (!formData.name.trim()) {
      toast('Nama lapangan wajib diisi', 'warning');
      return;
    }
    const price = Number(formData.price_per_hour);
    if (isNaN(price) || price <= 0) {
      toast('Harga harus berupa angka lebih dari 0', 'warning');
      return;
    }

    setActionLoading(true);
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (isEditMode) {
        setCourts(prev => prev.map(c => c.id === formData.id ? { ...formData, price_per_hour: price } : c));
        toast('Lapangan berhasil diperbarui', 'success');
      } else {
        const newCourt = { ...formData, id: Date.now(), price_per_hour: price };
        setCourts(prev => [...prev, newCourt]);
        toast('Lapangan berhasil ditambahkan', 'success');
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save court', error);
      toast('Gagal menyimpan lapangan', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleActive = async (id: number, currentStatus: boolean, name: string) => {
    if (!window.confirm(`Apakah Anda yakin ingin menonaktifkan lapangan ${name}? Lapangan ini tidak akan bisa di-booking.`)) {
      return;
    }
    try {
      // Optimistic update
      setCourts(prev => prev.map(c => c.id === id ? { ...c, is_active: !currentStatus } : c));
      toast(`Status lapangan ${name} berhasil diubah`, 'success');
    } catch (error) {
      console.error('Failed to toggle status', error);
      toast('Gagal mengubah status', 'error');
    }
  };

  const columns = [
    { 
      header: 'Nama Lapangan', 
      accessor: (row: any) => <span className="font-bold text-slate-900">{row.name}</span>
    },
    { 
      header: 'Tipe', 
      accessor: (row: any) => (
        <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-bold uppercase tracking-wider">
          {row.type}
        </span>
      )
    },
    { 
      header: 'Harga / Jam', 
      accessor: (row: any) => <span className="font-bold text-green-600">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(row.price_per_hour)}</span>
    },
    { 
      header: 'Status', 
      accessor: (row: any) => (
        <button 
          onClick={() => handleToggleActive(row.id, row.is_active, row.name)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-colors ${row.is_active ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
        >
          {row.is_active ? <Check size={14} /> : <X size={14} />}
          {row.is_active ? 'Aktif' : 'Nonaktif'}
        </button>
      )
    },
    { 
      header: 'Aksi', 
      accessor: (row: any) => (
        <button 
          onClick={() => handleOpenEdit(row)}
          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          title="Edit"
        >
          <Edit2 size={18} />
        </button>
      )
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Manajemen Lapangan</h2>
          <p className="text-slate-500 font-medium">Kelola data, harga, dan ketersediaan lapangan.</p>
        </div>
        <Button onClick={handleOpenAdd} className="shadow-lg shadow-green-500/20">
          <Plus size={20} className="mr-2" /> Tambah Lapangan
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-0">
          <Table 
            data={courts} 
            columns={columns} 
            keyExtractor={(row) => row.id} 
            isLoading={isLoading}
            emptyMessage="Belum ada data lapangan."
          />
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={isEditMode ? "Edit Lapangan" : "Tambah Lapangan"}>
        <div className="space-y-4 mb-6">
          <Input 
            label="Nama Lapangan" 
            placeholder="Contoh: Futsal A (Vinyl)" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Tipe Lapangan</label>
            <select 
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
            >
              <option value="Futsal">Futsal</option>
              <option value="Badminton">Badminton</option>
              <option value="Basket">Basket</option>
              <option value="Voli">Voli</option>
              <option value="Tennis">Tennis</option>
            </select>
          </div>
          <Input 
            type="number"
            label="Harga per Jam (Rp)" 
            placeholder="Contoh: 120000" 
            value={formData.price_per_hour}
            onChange={(e) => setFormData({...formData, price_per_hour: e.target.value})}
          />
        </div>
        <div className="flex gap-3 justify-end pt-4 border-t border-slate-100">
          <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Batal</Button>
          <Button onClick={handleSubmit} isLoading={actionLoading} disabled={!formData.name || !formData.price_per_hour}>
            {isEditMode ? 'Simpan Perubahan' : 'Tambah Lapangan'}
          </Button>
        </div>
      </Modal>

    </AdminLayout>
  );
};

export default Courts;
