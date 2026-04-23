import React from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Trophy, Target } from 'lucide-react';
import { Card } from '../../components/ui/Card';

const Tentang: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-24 font-sans text-slate-900">
      
      {/* Header */}
      <section className="bg-slate-900 text-white pt-36 pb-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=2000&auto=format&fit=crop')] opacity-20 bg-cover bg-center"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Lebih Dari Sekadar Lapangan.</h1>
          <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
            Cianjur Sport Center (CSC) didirikan dengan satu misi: menyediakan fasilitas olahraga bertaraf nasional 
            untuk masyarakat Cianjur, dengan sistem booking yang modern, transparan, dan tanpa hambatan.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-20 w-full">
        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <Card className="p-8 border-slate-200 shadow-lg hover:-translate-y-2 transition-transform duration-300 text-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Kualitas Premium</h3>
            <p className="text-slate-500">Menggunakan material lapangan bersertifikasi BWF dan FIFA untuk keamanan dan kenyamanan maksimal.</p>
          </Card>
          <Card className="p-8 border-slate-200 shadow-lg hover:-translate-y-2 transition-transform duration-300 text-center">
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Fokus Pelayanan</h3>
            <p className="text-slate-500">Staf yang ramah, kebersihan toilet yang terjaga, dan area tunggu yang sangat nyaman.</p>
          </Card>
          <Card className="p-8 border-slate-200 shadow-lg hover:-translate-y-2 transition-transform duration-300 text-center">
            <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Komunitas Sehat</h3>
            <p className="text-slate-500">Menjadi pusat lahirnya atlet lokal berbakat dan ruang silaturahmi yang sehat bagi masyarakat.</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[500px]">
             <img src="https://images.unsplash.com/photo-1518605368461-1ee7e54f7626?q=80&w=1000&auto=format&fit=crop" alt="Fasilitas CSC" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">Fasilitas Lengkap CSC</h2>
            <p className="text-slate-500 text-lg mb-8 leading-relaxed">
              Kami memastikan setiap sudut arena dirancang untuk kenyamanan pengunjung, baik pemain maupun penonton.
            </p>
            <ul className="space-y-4">
              {[
                'Area Parkir Luas (Motor & Mobil)',
                'Ruang Ganti & Toilet Bersih',
                'Kantin & Minimarket',
                'Tribun Penonton yang Nyaman',
                'Mushola Luas & Bersih',
                'WiFi Gratis di Area Tunggu'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold shrink-0">✓</div>
                  <span className="font-semibold text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Info Lokasi & Kontak */}
        <Card className="border-slate-200 shadow-sm p-8 md:p-12">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight text-center">Hubungi Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center text-slate-700 mb-4">
                <MapPin size={24} />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Lokasi Utama</h4>
              <p className="text-slate-500 text-sm">Jl. KH. Abdullah bin Nuh No. 88,<br/>Cianjur, Jawa Barat 43211</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center text-slate-700 mb-4">
                <Clock size={24} />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Jam Operasional</h4>
              <p className="text-slate-500 text-sm">Setiap Hari<br/>08:00 - 22:00 WIB</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center text-slate-700 mb-4">
                <Phone size={24} />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Telepon / WA</h4>
              <p className="text-slate-500 text-sm">+62 812 3456 7890<br/>Respon Cepat Jam Kerja</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center text-slate-700 mb-4">
                <Mail size={24} />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Email</h4>
              <p className="text-slate-500 text-sm">info@cianjursportcenter.com<br/>Untuk Kerjasama/Event</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Tentang;