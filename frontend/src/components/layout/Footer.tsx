import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => navigate('/')}>
              <div className="bg-green-600 p-2 rounded text-white font-bold text-lg">CSC</div>
              <span className="font-bold text-white text-xl">Cianjur Sport Center</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Sistem manajemen lapangan dan booking modern. Menghubungkan fasilitas olahraga terbaik di Bandung, Garut, dan Cianjur.
            </p>
          </div>

          {/* Navigasi */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Navigasi</h4>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => navigate('/')} className="hover:text-green-500 transition-colors">Home</button></li>
              <li><button onClick={() => navigate('/booking')} className="hover:text-green-500 transition-colors">Booking Lapangan</button></li>
              <li><button onClick={() => navigate('/courts')} className="hover:text-green-500 transition-colors">Informasi Fasilitas</button></li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Hubungi Kami</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-green-500 shrink-0 mt-1" />
                <span>Jl. Raya Cianjur No. 123<br/>Jawa Barat, 43211</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-green-500 shrink-0" />
                +62 812-3456-7890
              </li>
            </ul>
          </div>

          {/* Operasional */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Jam Operasional</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex justify-between border-b border-gray-800 pb-2">
                  <span>Senin - Jumat</span>
                  <span className="text-green-400 font-medium">08:00 - 23:00</span>
              </li>
              <li className="flex justify-between border-b border-gray-800 pb-2">
                  <span>Sabtu - Minggu</span>
                  <span className="text-green-400 font-medium">06:00 - 24:00</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Cianjur Sport Center.</p>
          <p>EST 2025 by <b className="text-gray-400">MBNP Tech</b>.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;