import React, { useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Kontak: React.FC = () => {
  // Pastikan halaman mulai dari atas saat dibuka
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col bg-gray-50 font-sans text-gray-900 min-h-screen">
      
      {/* HEADER SECTION */}
      <section className="pt-32 pb-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Hubungi Kami</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Punya pertanyaan seputar booking, membership, atau ingin bekerja sama? Tim Cianjur Sport Center siap membantu Anda.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT SECTION */}
      <section className="py-16 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            
            {/* BAGIAN KIRI: FORM KONTAK */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Kirim Pesan</h2>
              
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                  <input 
                    type="text" 
                    placeholder="Masukkan nama Anda" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input 
                      type="email" 
                      placeholder="contoh@email.com" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">No. WhatsApp</label>
                    <input 
                      type="tel" 
                      placeholder="0812-xxxx-xxxx" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subjek Pesan</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-white">
                    <option value="">Pilih Subjek</option>
                    <option value="booking">Pertanyaan Booking</option>
                    <option value="membership">Info Membership / Member Tetap</option>
                    <option value="kerjasama">Kerja Sama / Event</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Pesan Anda</label>
                  <textarea 
                    rows={4} 
                    placeholder="Tulis pesan Anda di sini..." 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={20} /> Kirim Pesan Sekarang
                </button>
              </form>
            </div>

            {/* BAGIAN KANAN: INFORMASI & MAPS */}
            <div className="flex flex-col gap-8">
              
              {/* Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-2xl border border-green-100 flex flex-col items-start">
                  <div className="bg-green-600 p-3 rounded-full text-white mb-4">
                    <Phone size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">Telepon / WhatsApp</h3>
                  <p className="text-gray-600 text-sm mb-2">Fast response saat jam kerja.</p>
                  <p className="font-bold text-green-700">+62 812-3456-7890</p>
                </div>

                <div className="bg-gray-100 p-6 rounded-2xl border border-gray-200 flex flex-col items-start">
                  <div className="bg-gray-900 p-3 rounded-full text-white mb-4">
                    <Mail size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600 text-sm mb-2">Untuk keperluan formal/bisnis.</p>
                  <p className="font-bold text-gray-900">cs@cianjursport.com</p>
                </div>
              </div>

              {/* Lokasi & Operasional */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex-grow">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <MapPin className="text-green-600" /> Lokasi Pusat Kami
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Jl. Raya Cianjur No. 123, Pusat Kota Cianjur<br/>
                  Jawa Barat, Indonesia 43211
                </p>

                {/* Google Maps Embed (Bisa diganti link src-nya nanti) */}
                <div className="w-full h-48 bg-gray-200 rounded-xl overflow-hidden mb-6 relative">
                  <iframe 
                    title="CSC Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.60965004113!2d107.0536780074211!3d-6.824707693529341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68524458f2fb0b%3A0xc3f5c7193b2a26c4!2sCianjur%2C%20Cianjur%20Regency%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>

                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Clock className="text-green-600" /> Jam Operasional
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex justify-between border-b border-gray-100 pb-2">
                      <span>Senin - Jumat</span>
                      <span className="font-bold text-gray-900">08:00 - 23:00 WIB</span>
                  </li>
                  <li className="flex justify-between pt-1">
                      <span>Sabtu - Minggu</span>
                      <span className="font-bold text-gray-900">06:00 - 24:00 WIB</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Kontak;