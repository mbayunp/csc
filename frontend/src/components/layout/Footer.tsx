import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#0a0a0a] text-gray-400 pt-20 pb-8 border-t border-gray-800 mt-auto font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8 mb-16">

          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1 pr-0 lg:pr-8">
            <div className="flex items-center gap-3 mb-6 cursor-pointer group" onClick={() => navigate('/')}>
              {/* Memanggil logo1.png dari folder public */}
              <img
                src="/logo1.png"
                alt="CSC Logo"
                className="h-12 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <span className="font-extrabold text-white text-xl tracking-tight">
                CSC <span className="text-green-500">Arena</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6 font-medium">
              Sistem manajemen lapangan dan booking modern. Menghubungkan fasilitas olahraga terbaik dengan performa tinggi.
            </p>
          </div>

          {/* Navigasi */}
          <div>
            <h4 className="text-white font-extrabold mb-6 uppercase tracking-widest text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span> Navigasi
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              {['Home', 'Booking Lapangan', 'Informasi Fasilitas'].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => navigate(idx === 0 ? '/' : idx === 1 ? '/booking' : '/courts')}
                    className="flex items-center gap-2 hover:text-green-400 hover:translate-x-1 transition-all duration-300"
                  >
                    <ArrowRight size={14} className="opacity-0 -ml-4 transition-all duration-300 group-hover:opacity-100 group-hover:ml-0" />
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="text-white font-extrabold mb-6 uppercase tracking-widest text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span> Hubungi Kami
            </h4>
            <ul className="space-y-5 text-sm font-medium">
              <li className="flex items-start gap-3 group cursor-default">
                <div className="p-2 bg-gray-900 rounded-lg group-hover:bg-green-500/20 transition-colors">
                  <MapPin size={18} className="text-green-500" />
                </div>
                <span className="pt-1">Jl. Raya Cianjur No. 123<br />Jawa Barat, 43211</span>
              </li>
              <li className="flex items-center gap-3 group cursor-default">
                <div className="p-2 bg-gray-900 rounded-lg group-hover:bg-green-500/20 transition-colors">
                  <Phone size={18} className="text-green-500" />
                </div>
                <span className="pt-1">+62 877-1147-6068</span>
              </li>
            </ul>
          </div>

          {/* Operasional */}
          <div>
            <h4 className="text-white font-extrabold mb-6 uppercase tracking-widest text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span> Operasional
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex justify-between border-b border-gray-800/60 pb-3">
                <span className="font-medium text-gray-400">Setiap Hari</span>
                {/* Disinkronkan dengan slot baru 07:00 - 22:00 */}
                <span className="text-green-400 font-extrabold tracking-wider bg-green-500/10 px-2 py-0.5 rounded">07:00 - 22:00</span>
              </li>
              <li className="pt-2">
                <p className="text-xs text-gray-500 italic">
                  *Pemesanan di luar jam operasional hubungi CS via WhatsApp.
                </p>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800/80 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-medium text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Cianjur Sport Center. All rights reserved.</p>
          <p className="tracking-widest uppercase">
            Built by <b className="text-white hover:text-green-400 transition-colors cursor-pointer">MBNP Tech</b>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;