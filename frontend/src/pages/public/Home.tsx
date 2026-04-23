import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import {
  CalendarCheck, ShieldCheck, MapPin, ArrowRight,
  Zap, Star, Clock, Users, CheckCircle2, Trophy, Quote, Activity
} from 'lucide-react';

const courtsPreviewData = [
  { id: 1, name: 'Futsal A (Vinyl)', type: 'Futsal', zone: 'Zona A', price: 120000, popular: true, image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop' },
  { id: 2, name: 'Futsal B (Sintetis)', type: 'Futsal', zone: 'Zona B', price: 100000, popular: false, image: 'https://images.unsplash.com/photo-1518605368461-1ee7e54f7626?q=80&w=1000&auto=format&fit=crop' },
  { id: 3, name: 'Badminton A1', type: 'Badminton', zone: 'Zona A', price: 40000, popular: true, image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1000&auto=format&fit=crop' },
  { id: 5, name: 'Badminton B1', type: 'Badminton', zone: 'Zona B', price: 40000, popular: false, image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1000&auto=format&fit=crop' },
  { id: 8, name: 'Basket Full Court', type: 'Basket', zone: 'Tanpa Zona', price: 150000, popular: true, image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1000&auto=format&fit=crop' },
];

const testimonials = [
  { name: 'Andi S.', role: 'Kapten Futsal', text: 'Sistem bookingnya sangat cepat, nggak perlu lagi nunggu balasan WA admin yang lama. Langsung pilih slot jam 19:00, bayar, beres!' },
  { name: 'Budi Raharjo', role: 'Pemain Badminton', text: 'Sangat memudahkan, apalagi ada pilihan Zona. Bisa lihat mana lapangan yang kosong secara real-time. Standar lapangannya juga mantap.' },
  { name: 'Dimas', role: 'Komunitas Basket', text: 'Selalu booking basket di sini karena tanpa drama jadwal bentrok. Sistemnya rapi banget dan harganya juga sangat bersaing.' }
];

const Home: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-slate-900 bg-white">

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-28 lg:pt-44 lg:pb-40 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent z-10"></div>
          <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-green-500/20 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl animate-in slide-in-from-bottom-8 duration-700 ease-out">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-semibold mb-6 shadow-sm">
              <Zap size={16} className="fill-green-400" />
              <span>Sistem Booking SaaS Real-time</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black mb-6 tracking-tight leading-[1.1]">
              Olahraga Tanpa <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Drama Rebutan.</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-medium">
              Manajemen fasilitas olahraga modern. Pilih cabang olahraga, zona, dan lapangan secara instan.
              Sistem pintar anti bentrok, 100% aman dan terverifikasi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/booking">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg font-bold shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] hover:-translate-y-1 transition-all duration-300">
                  Booking Sekarang <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link to="/lapangan">
                <Button size="lg" variant="ghost" className="w-full sm:w-auto h-14 px-8 text-lg font-bold border-2 border-slate-700 text-white hover:bg-slate-800 hover:border-slate-600 transition-colors">
                  Lihat Katalog Lapangan
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BANNER */}
      <div className="bg-green-600 text-white py-4 relative z-20 shadow-md">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-sm font-bold uppercase tracking-wider">
          <div className="flex items-center gap-2"><Trophy size={18} /> 100+ Booking / Minggu</div>
          <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-green-300"></div>
          <div className="flex items-center gap-2"><Star size={18} className="fill-white" /> Lapangan Standar Kompetisi</div>
          <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-green-300"></div>
          <div className="flex items-center gap-2"><Activity size={18} /> Sinkronisasi Real-time</div>
        </div>
      </div>

      {/* 2. SPORT & COURT PREVIEW SECTION */}
      <section className="py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Katalog Fasilitas Kami</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">Temukan lapangan yang tepat dengan multi-zona eksklusif untuk Futsal, Badminton, dan Basket.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courtsPreviewData.map(court => (
              <div key={court.id} className="flex flex-col overflow-hidden border-slate-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-200/60 bg-white group cursor-pointer" onClick={() => navigate(`/booking?sport=${court.type.toLowerCase()}&zone=${court.zone}&court_id=${court.id}`)}>
                {/* Image Area */}
                <div className="relative h-56 overflow-hidden bg-slate-200">
                  <img
                    src={court.image}
                    alt={court.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-slate-900/90 backdrop-blur-md text-white text-xs font-bold rounded-md uppercase tracking-wider shadow-sm">
                      {court.type}
                    </span>
                    {court.zone !== 'Tanpa Zona' && (
                      <span className="px-3 py-1 bg-green-600/90 backdrop-blur-md text-white text-xs font-bold rounded-md uppercase tracking-wider shadow-sm">
                        {court.zone}
                      </span>
                    )}
                  </div>
                  {court.popular && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs font-bold rounded-md uppercase tracking-wider shadow-lg flex items-center gap-1">
                        <Star size={12} className="fill-white" /> Popular
                      </span>
                    </div>
                  )}
                </div>

                {/* Content Area */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-2xl font-extrabold text-slate-900 mb-2">{court.name}</h3>
                  <p className="text-2xl font-black text-green-600 mb-6 tracking-tight">
                    {formatRupiah(court.price)}
                    <span className="text-sm text-slate-400 font-medium tracking-normal"> / jam</span>
                  </p>

                  <Button fullWidth className="h-12 bg-slate-900 hover:bg-green-600 text-white font-bold transition-colors mt-auto">
                    Pilih Lapangan Ini
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/lapangan">
              <Button variant="outline" size="lg" className="border-2 border-slate-300 text-slate-700 hover:bg-slate-100 font-bold px-8">
                Lihat Semua Lapangan
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. OPERATIONAL HOURS SECTION */}
      <section className="py-16 bg-slate-900 text-white border-y border-slate-800">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-slate-800 rounded-full mb-6 ring-4 ring-slate-800/50">
            <Clock size={32} className="text-green-400" />
          </div>
          <h2 className="text-3xl font-black mb-4 tracking-tight">Buka Setiap Hari <span className="text-green-400">07:00 – 22:00</span></h2>
          <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto">Kami siap melayani kebutuhan olahraga Anda dengan jam operasional yang panjang. Booking multi-slot tanpa batas secara real-time.</p>

          <div className="inline-flex items-center gap-3 bg-slate-800 px-6 py-3 rounded-2xl border border-slate-700 shadow-lg">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
            </span>
            <span className="font-bold text-slate-200 tracking-wide">Jam Ramai (Peak Hour): <span className="text-white">18:00 – 21:00</span></span>
          </div>
        </div>
      </section>

      {/* 4. ENHANCED FEATURES SECTION */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Kenapa Harus Lewat CSC?</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">Bukan sekadar booking biasa, kami mendesain ekosistem agar Anda fokus bermain, bukan mengurus administrasi.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:border-green-200 hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 text-green-600 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-green-50 transition-all">
                <Zap size={32} />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-3">Booking Dalam 10 Detik</h3>
              <p className="text-slate-500 leading-relaxed font-medium">Lupakan chat admin yang memakan waktu. Pilih lapangan, klik jam, dan langsung amankan slot Anda dalam hitungan detik.</p>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:border-indigo-200 hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 text-indigo-600 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-indigo-50 transition-all">
                <Activity size={32} />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-3">Multi-Lapangan Fleksibel</h3>
              <p className="text-slate-500 leading-relaxed font-medium">Sistem hierarki kami memungkinkan Anda memilih cabang olahraga, zona, hingga lapangan spesifik dengan antarmuka yang intuitif.</p>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:border-amber-200 hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 text-amber-500 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-amber-50 transition-all">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-3">Tanpa Antri & Konflik Jadwal</h3>
              <p className="text-slate-500 leading-relaxed font-medium">Sistem booking tertutup kami mengunci slot secara otomatis. Dijamin 100% tidak ada jadwal ganda saat Anda tiba di lokasi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS (UPDATE) */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1 space-y-8 relative z-10">
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">Alur Booking Super Cepat & Transparan.</h2>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent hidden md:block"></div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-500 text-slate-900 font-black flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(34,197,94,0.4)]">1</div>
                  <div className="pt-1.5">
                    <h4 className="text-lg font-bold text-white mb-2 tracking-wide">Pilih Olahraga & Zona</h4>
                    <p className="text-slate-400 font-medium">Pilih antara Futsal, Badminton, atau Basket, lalu tentukan Zona A/B sesuai kebutuhan tim.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-500 text-slate-900 font-black flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(34,197,94,0.4)]">2</div>
                  <div className="pt-1.5">
                    <h4 className="text-lg font-bold text-white mb-2 tracking-wide">Tentukan Lapangan & Tanggal</h4>
                    <p className="text-slate-400 font-medium">Pilih lapangan spesifik (misal: A1, B2) dan tentukan tanggal main Anda.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-500 text-slate-900 font-black flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(34,197,94,0.4)]">3</div>
                  <div className="pt-1.5">
                    <h4 className="text-lg font-bold text-white mb-2 tracking-wide">Pilih Multi-Slot Jam (07:00 - 22:00)</h4>
                    <p className="text-slate-400 font-medium">Sistem menampilkan ketersediaan real-time. Klik beberapa slot berurutan untuk durasi panjang.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white text-slate-900 font-black flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.2)]">4</div>
                  <div className="pt-1.5">
                    <h4 className="text-lg font-bold text-white mb-2 tracking-wide">Konfirmasi & Main</h4>
                    <p className="text-slate-400 font-medium">Selesaikan prosesnya dan lapangan sudah dipastikan milik Anda 100%.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full relative z-10">
              {/* Visual Presentation */}
              <div className="bg-slate-800 rounded-3xl p-2 shadow-2xl border border-slate-700 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="bg-white rounded-2xl overflow-hidden shadow-inner">
                  <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <span className="ml-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Live Preview</span>
                  </div>
                  <div className="p-6">
                    <div className="flex gap-2 mb-4">
                      <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">Badminton</div>
                      <div className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded">Zona A</div>
                    </div>
                    <div className="h-6 bg-slate-200 rounded w-2/3 mb-6"></div>
                    <div className="grid grid-cols-4 gap-2 mb-6">
                      <div className="h-10 bg-green-500 rounded-lg flex items-center justify-center"><CheckCircle2 size={16} className="text-white" /></div>
                      <div className="h-10 bg-green-500 rounded-lg flex items-center justify-center"><CheckCircle2 size={16} className="text-white" /></div>
                      <div className="h-10 bg-slate-200 rounded-lg opacity-50 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center"><div className="w-full h-px bg-slate-400 transform -rotate-12"></div></div>
                      </div>
                      <div className="h-10 bg-slate-100 rounded-lg border border-slate-200"></div>
                    </div>
                    <div className="h-12 bg-slate-900 rounded-xl mt-4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIAL / TRUST SECTION */}
      <section className="py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Dipercaya Komunitas Olahraga</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">Ribuan jam telah dibooking melalui sistem kami setiap bulannya.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testi, idx) => (
              <Card key={idx} className="bg-white border border-slate-100 shadow-lg shadow-slate-200/40 p-8 relative hover:-translate-y-1 transition-transform">
                <Quote size={40} className="text-green-100 absolute top-6 right-6" />
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-slate-600 font-medium leading-relaxed mb-8 italic">"{testi.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">
                    {testi.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900">{testi.name}</h4>
                    <p className="text-sm font-semibold text-green-600">{testi.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA (UPGRADE) */}
      <section className="py-24 bg-green-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-green-700 to-transparent pointer-events-none"></div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Siap Keringatan Hari Ini?</h2>

          <div className="inline-flex items-center gap-2 bg-red-500/20 text-white px-5 py-2.5 rounded-full border border-red-400/30 font-bold mb-10 shadow-lg">
            <Activity size={18} className="text-red-300 animate-pulse" />
            Jam sore (18:00 - 21:00) sangat cepat habis setiap hari!
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking?sport=futsal">
              <Button size="lg" className="w-full sm:w-auto bg-red-600 text-white hover:bg-slate-800 border-none h-14 px-8 text-lg font-extrabold shadow-xl hover:scale-105 transition-transform">
                Booking Futsal
              </Button>
            </Link>
            <Link to="/booking?sport=badminton">
              <Button size="lg" className="w-full sm:w-auto bg-slate-900 text-white hover:bg-slate-800 border-none h-14 px-8 text-lg font-extrabold shadow-xl hover:scale-105 transition-transform">
                Booking Badminton
              </Button>
            </Link>
            <Link to="/booking?sport=basket">
              <Button size="lg" className="w-full sm:w-auto bg-amber-500 text-slate-900 hover:bg-amber-400 border-none h-14 px-8 text-lg font-extrabold shadow-xl hover:scale-105 transition-transform">
                Booking Basket
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;