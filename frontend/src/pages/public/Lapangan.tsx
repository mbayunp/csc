import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button'; // Pastikan path ini sesuai dengan struktur foldermu
import { Card } from '../../components/ui/Card';     // Pastikan path ini sesuai dengan struktur foldermu
import { MapPin, Clock, ChevronRight, CheckCircle2 } from 'lucide-react';

const Lapangan: React.FC = () => {
  const [filter, setFilter] = useState('All');

  // Struktur Data Baru: Tersinkronisasi dengan konsep Olahraga -> Zona -> Lapangan
  const courtsData = [
    { id: 1, name: 'Futsal A (Vinyl)', type: 'Futsal', zone: 'Zona A', price: 120000, image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop' },
    { id: 2, name: 'Futsal B (Sintetis)', type: 'Futsal', zone: 'Zona B', price: 100000, image: 'https://images.unsplash.com/photo-1518605368461-1ee7e54f7626?q=80&w=1000&auto=format&fit=crop' },
    { id: 3, name: 'Badminton A1', type: 'Badminton', zone: 'Zona A', price: 40000, image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1000&auto=format&fit=crop' },
    { id: 4, name: 'Badminton A2', type: 'Badminton', zone: 'Zona A', price: 40000, image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1000&auto=format&fit=crop' },
    { id: 5, name: 'Badminton B1', type: 'Badminton', zone: 'Zona B', price: 40000, image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1000&auto=format&fit=crop' },
    { id: 6, name: 'Badminton B2', type: 'Badminton', zone: 'Zona B', price: 40000, image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1000&auto=format&fit=crop' },
    { id: 7, name: 'Badminton B3', type: 'Badminton', zone: 'Zona B', price: 40000, image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1000&auto=format&fit=crop' },
    { id: 8, name: 'Basket Full Court', type: 'Basket', zone: 'Tanpa Zona', price: 150000, image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1000&auto=format&fit=crop' },
  ];

  const sportsCategories = ['Futsal', 'Badminton', 'Basket'];

  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-24 font-sans text-slate-900">

      {/* Hero Section */}
      <section className="bg-slate-900 text-white pt-36 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-5 tracking-tight">Pilih Lapangan Favoritmu</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto flex items-center justify-center gap-2">
            <Clock size={20} className="text-green-500" /> Tersedia dari jam 07:00 – 22:00 setiap hari
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 -mt-6 relative z-10 w-full">
        {/* Fitur Filter Cepat */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-10 no-scrollbar justify-center">
          {['All', ...sportsCategories].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-8 py-3 rounded-full font-bold text-sm whitespace-nowrap transition-all duration-300 ease-out shadow-sm
                ${filter === type
                  ? 'bg-green-600 text-white border-transparent scale-105 shadow-green-500/30'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-green-500 hover:text-green-600 hover:bg-green-50'
                }`}
            >
              {type === 'All' ? 'Semua Kategori' : type}
            </button>
          ))}
        </div>

        {/* Kontainer Grouping Olahraga & Zona */}
        <div className="space-y-16">
          {sportsCategories.map(sport => {
            // Sembunyikan bagian olahraga jika tidak sesuai filter
            if (filter !== 'All' && filter !== sport) return null;

            const sportCourts = courtsData.filter(c => c.type === sport);
            if (sportCourts.length === 0) return null;

            // Kelompokkan lapangan berdasarkan Zona
            const zones = Array.from(new Set(sportCourts.map(c => c.zone)));

            return (
              <div key={sport} className="animate-fade-in-up">
                {/* Header Olahraga */}
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">{sport}</h2>
                  <div className="h-1 flex-1 bg-gradient-to-r from-slate-200 to-transparent rounded-full"></div>
                </div>

                {/* Looping per Zona */}
                {zones.map(zone => {
                  const courtsInZone = sportCourts.filter(c => c.zone === zone);

                  return (
                    <div key={zone} className="mb-10">
                      {/* Tampilkan nama zona jika bukan "Tanpa Zona" (seperti Basket) */}
                      {zone !== 'Tanpa Zona' && (
                        <h3 className="text-xl font-bold text-slate-700 mb-4 flex items-center gap-2">
                          <MapPin size={20} className="text-green-600" /> {zone}
                        </h3>
                      )}

                      {/* Grid Card Lapangan */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courtsInZone.map(court => (
                          <Card key={court.id} noPadding className="flex flex-col overflow-hidden border-slate-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-200/50 bg-white group">

                            {/* Bagian Gambar */}
                            <div className="relative h-56 overflow-hidden bg-slate-200">
                              <img
                                src={court.image}
                                alt={court.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                              <div className="absolute top-4 left-4 flex gap-2">
                                <span className="px-3 py-1 bg-slate-900/90 backdrop-blur-md text-white text-xs font-bold rounded-md uppercase tracking-wider shadow-lg">
                                  {court.type}
                                </span>
                                {zone !== 'Tanpa Zona' && (
                                  <span className="px-3 py-1 bg-green-600/90 backdrop-blur-md text-white text-xs font-bold rounded-md uppercase tracking-wider shadow-lg">
                                    {zone}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Bagian Konten */}
                            <div className="p-6 flex flex-col flex-1">
                              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">{court.name}</h3>
                              <p className="text-2xl font-black text-green-600 mb-6 tracking-tight">
                                {formatRupiah(court.price)}
                                <span className="text-sm text-slate-400 font-medium tracking-normal"> / jam</span>
                              </p>

                              <div className="space-y-3 mb-8 flex-1">
                                <div className="flex items-center gap-3 text-slate-600">
                                  <Clock size={18} className="text-slate-400" />
                                  <span className="text-sm font-medium">Operasional: 07:00 - 22:00</span>
                                </div>

                                {/* Status Ketersediaan (UI Preview) */}
                                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-100">
                                  <div className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-bold border border-green-100">
                                    <CheckCircle2 size={16} className="text-green-500" /> Tersedia Hari Ini
                                  </div>
                                </div>
                              </div>

                              {/* Deep Link Booking Action */}
                              <Link
                                to={`/booking?sport=${court.type.toLowerCase()}&zone=${court.zone}&court_id=${court.id}`}
                                className="mt-auto"
                              >
                                <Button fullWidth className="h-12 bg-slate-900 hover:bg-green-600 text-white font-bold transition-colors shadow-md hover:shadow-xl hover:shadow-green-500/20 group-hover:scale-[1.02]">
                                  Booking Sekarang <ChevronRight size={18} className="ml-1 transition-transform group-hover:translate-x-1" />
                                </Button>
                              </Link>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {courtsData.filter(c => filter === 'All' || c.type === filter).length === 0 && (
          <div className="text-center py-24 bg-white rounded-3xl border border-slate-200 shadow-sm mt-8">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="text-slate-400 w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Belum ada lapangan tersedia</h3>
            <p className="text-slate-500">Kategori lapangan yang Anda cari saat ini sedang tidak aktif atau belum ditambahkan.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lapangan;