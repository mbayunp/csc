import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { MapPin, Users, Activity, ChevronRight } from 'lucide-react';

const Lapangan: React.FC = () => {
  const [filter, setFilter] = useState('All');

  const courts = [
    { 
      id: 1, 
      name: 'Futsal A (Vinyl)', 
      type: 'Futsal', 
      price: 120000, 
      capacity: '10-15 Orang',
      material: 'Vinyl Standard Internasional',
      image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop'
    },
    { 
      id: 2, 
      name: 'Futsal B (Sintetis)', 
      type: 'Futsal', 
      price: 100000, 
      capacity: '10-15 Orang',
      material: 'Rumput Sintetis Premium',
      image: 'https://images.unsplash.com/photo-1518605368461-1ee7e54f7626?q=80&w=1000&auto=format&fit=crop'
    },
    { 
      id: 3, 
      name: 'Badminton Pro', 
      type: 'Badminton', 
      price: 60000, 
      capacity: '2-4 Orang',
      material: 'Karpet Badminton BWF',
      image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1000&auto=format&fit=crop'
    },
    { 
      id: 4, 
      name: 'Basket Full Court', 
      type: 'Basket', 
      price: 150000, 
      capacity: '10-20 Orang',
      material: 'Hardwood / Parquet',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1000&auto=format&fit=crop'
    },
  ];

  const filteredCourts = filter === 'All' ? courts : courts.filter(c => c.type === filter);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-24 font-sans text-slate-900">
      
      {/* Header */}
      <section className="bg-slate-900 text-white pt-36 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-5 tracking-tight">Fasilitas Lapangan</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Kami menyediakan berbagai tipe lapangan olahraga dengan spesifikasi material terbaik untuk menunjang performa Anda.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 -mt-6 relative z-10 w-full">
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar justify-center">
          {['All', 'Futsal', 'Badminton', 'Basket'].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all duration-200 ease-out shadow-sm
                ${filter === type 
                  ? 'bg-green-600 text-white border-transparent' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-green-500 hover:text-green-600'
                }`}
            >
              {type === 'All' ? 'Semua Lapangan' : type}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredCourts.map(court => (
            <Card key={court.id} noPadding className="flex flex-col overflow-hidden border-slate-200 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-200">
              {/* Image Area */}
              <div className="relative h-64 overflow-hidden bg-slate-200">
                <img 
                  src={court.image} 
                  alt={court.name} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold rounded-md uppercase tracking-wider">
                    {court.type}
                  </span>
                </div>
              </div>
              
              {/* Content Area */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{court.name}</h3>
                <p className="text-2xl font-black text-green-600 mb-6 tracking-tight">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(court.price)}
                  <span className="text-sm text-slate-400 font-medium tracking-normal"> / jam</span>
                </p>
                
                <div className="space-y-3 mb-8 flex-1">
                  <div className="flex items-center gap-3 text-slate-600">
                    <Users size={18} className="text-slate-400" />
                    <span className="text-sm font-medium">Kapasitas: {court.capacity}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Activity size={18} className="text-slate-400" />
                    <span className="text-sm font-medium">{court.material}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <MapPin size={18} className="text-slate-400" />
                    <span className="text-sm font-medium">Indoor / Full AC / Toilet Bersih</span>
                  </div>
                </div>
                
                <Link to={`/booking?court_id=${court.id}`} className="mt-auto">
                  <Button fullWidth className="h-12 shadow-md hover:shadow-lg">
                    Booking Lapangan Ini <ChevronRight size={18} className="ml-1" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
        
        {filteredCourts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Lapangan Tidak Ditemukan</h3>
            <p className="text-slate-500">Kategori lapangan yang Anda cari belum tersedia.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lapangan;