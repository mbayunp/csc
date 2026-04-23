import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-secondary text-white py-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[70vh]">
      {/* Overlay Gelap untuk background image nantinya */}
      <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
      
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
          Booking Lapangan Futsal, Badminton & Basket di Cianjur
        </h1>
        <p className="text-xl sm:text-2xl text-gray-300 mb-10">
          Pilih jadwal, booking cepat, tanpa ribet. Langsung main!
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={() => navigate('/booking')}
            className="bg-primary hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg text-lg transition-all transform hover:scale-105"
          >
            Booking Sekarang
          </button>
          <button 
            onClick={() => navigate('/courts')}
            className="bg-transparent border-2 border-white hover:bg-white hover:text-secondary text-white font-bold py-4 px-8 rounded-lg shadow-lg text-lg transition-all"
          >
            Lihat Lapangan
          </button>
        </div>

        {/* Upgrade Ide: Highlight jam kosong (Promo) */}
        <div className="mt-8 inline-block bg-yellow-500 text-secondary text-sm font-bold px-4 py-2 rounded-full animate-bounce">
          🔥 Promo Slot Kosong Malam Ini! Cek Sekarang
        </div>
      </div>
    </section>
  );
};

export default Hero;