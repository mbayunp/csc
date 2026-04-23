import React from 'react';
import { useNavigate } from 'react-router-dom';

const courts = [
  { id: 1, name: 'Lapangan Futsal Vinyl', price: 'Rp 120.000', type: 'Futsal', icon: '⚽' },
  { id: 2, name: 'Lapangan Badminton Karpet', price: 'Rp 40.000', type: 'Badminton', icon: '🏸' },
  { id: 3, name: 'Lapangan Basket Full Court', price: 'Rp 150.000', type: 'Basket', icon: '🏀' },
];

const CourtTypes: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Pilih Lapangan Favoritmu</h2>
          <p className="mt-4 text-xl text-gray-500">Fasilitas standar turnamen dengan harga terjangkau.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courts.map((court) => (
            <div key={court.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gray-200 flex items-center justify-center text-6xl">
                {/* Placeholder Gambar Lapangan */}
                {court.icon}
              </div>
              <div className="p-6">
                <div className="uppercase tracking-wide text-sm text-primary font-semibold mb-1">
                  {court.type}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{court.name}</h3>
                <p className="text-gray-600 mb-4 font-medium">{court.price} <span className="text-sm font-normal">/ jam</span></p>
                
                <button 
                  onClick={() => navigate(`/booking?court=${court.id}`)}
                  className="w-full bg-secondary hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded transition-colors"
                >
                  Booking {court.type}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourtTypes;