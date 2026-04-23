import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { CalendarCheck, ShieldCheck, MapPin, ArrowRight, Zap, Star } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent z-10"></div>
          {/* Subtle abstract pattern/gradient for background */}
          <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-green-500/20 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-semibold mb-6">
              <Zap size={16} className="fill-green-400" />
              <span>Sistem Booking Real-time</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black mb-6 tracking-tight leading-[1.1]">
              Olahraga Tanpa <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Drama Rebutan.</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl">
              Booking lapangan Futsal, Badminton, dan Basket secara instan di Cianjur Sport Center. 
              Sistem pintar anti bentrok, 100% aman dan terverifikasi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/booking">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg shadow-green-500/25 shadow-xl hover:scale-105 transition-transform duration-300">
                  Booking Sekarang <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link to="/lapangan">
                <Button size="lg" variant="ghost" className="w-full sm:w-auto h-14 px-8 text-lg border border-slate-700 text-white hover:bg-slate-800 transition-colors">
                  Lihat Lapangan
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50 relative z-20 -mt-8 rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Kenapa Memilih CSC?</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Kami menghadirkan pengalaman booking fasilitas olahraga kelas premium.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg shadow-slate-200/50 p-8 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
                <CalendarCheck size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Real-time Availability</h3>
              <p className="text-slate-500 leading-relaxed">Sistem langsung tersinkronisasi. Jadwal yang Anda lihat adalah ketersediaan detik ini juga.</p>
            </Card>
            <Card className="border-none shadow-lg shadow-slate-200/50 p-8 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mb-6">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Anti Double-Booking</h3>
              <p className="text-slate-500 leading-relaxed">Arsitektur database transactional kami menjamin tidak ada jadwal yang bentrok sama sekali.</p>
            </Card>
            <Card className="border-none shadow-lg shadow-slate-200/50 p-8 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6">
                <Star size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Standar Profesional</h3>
              <p className="text-slate-500 leading-relaxed">Material lapangan dan pencahayaan berstandar kompetisi nasional untuk performa terbaik Anda.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1 space-y-8">
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">Booking Semudah Pesan Tiket Bioskop.</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-900 font-bold flex items-center justify-center flex-shrink-0">1</div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">Pilih Cabang Olahraga & Lapangan</h4>
                    <p className="text-slate-500">Pilih lapangan favorit Anda berdasarkan tipe dan fasilitas yang diinginkan.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-900 font-bold flex items-center justify-center flex-shrink-0">2</div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">Tentukan Tanggal & Waktu</h4>
                    <p className="text-slate-500">Cek kalender ketersediaan real-time dan pilih jam bermain Anda.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 font-bold flex items-center justify-center flex-shrink-0">3</div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">Bayar & Main</h4>
                    <p className="text-slate-500">Selesaikan pembayaran, tunjukkan bukti di kasir, dan lapangan siap digunakan.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full bg-slate-100 rounded-3xl p-8 flex items-center justify-center min-h-[400px]">
               {/* Visual Placeholder */}
               <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                 <div className="bg-slate-900 p-4 text-white font-bold flex items-center gap-2">
                   <CalendarCheck size={18} /> Mini Preview
                 </div>
                 <div className="p-6">
                   <div className="h-4 bg-slate-200 rounded w-1/2 mb-4"></div>
                   <div className="grid grid-cols-3 gap-2">
                     <div className="h-10 bg-green-500 rounded border border-green-600"></div>
                     <div className="h-10 bg-slate-100 rounded border border-slate-200"></div>
                     <div className="h-10 bg-slate-100 rounded border border-slate-200 relative overflow-hidden">
                       <div className="absolute inset-0 flex items-center justify-center"><div className="w-full h-px bg-slate-300 transform -rotate-12"></div></div>
                     </div>
                   </div>
                   <div className="mt-6 h-10 bg-slate-900 rounded-lg"></div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-green-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">Siap Keringatan Hari Ini?</h2>
          <p className="text-green-100 text-lg mb-10">Jadwal prime time sangat cepat habis. Amankan lapangan untuk tim Anda sekarang juga.</p>
          <Link to="/booking">
            <Button size="lg" className="bg-white text-green-700 hover:bg-slate-50 h-14 px-10 text-lg shadow-xl shadow-green-900/20">
              Booking Lapangan Sekarang
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;