import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Kontak: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.message) {
      alert("Mohon isi minimal Nama Lengkap dan Pesan Anda.");
      return;
    }

    const targetPhone = "6287711476068";
    const textMessage = `Halo Admin CSC, saya ingin bertanya:
    
*Nama Lengkap:* ${formData.name}
*Email:* ${formData.email || '-'}
*No. HP:* ${formData.phone || '-'}
*Subjek:* ${formData.subject || 'Lainnya'}

*Pesan:*
${formData.message}

_Dikirim melalui Form Kontak Website CSC_`;

    const encodedMessage = encodeURIComponent(textMessage);
    const waLink = `https://wa.me/${targetPhone}?text=${encodedMessage}`;
    window.open(waLink, '_blank');
  };

  return (
    <div className="flex flex-col bg-gray-50 font-sans text-gray-900 min-h-screen">

      <section className="pt-32 pb-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Hubungi Kami</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Punya pertanyaan seputar booking, membership, atau ingin bekerja sama? Tim Cianjur Sport Center siap membantu Anda.
          </p>
        </div>
      </section>

      <section className="py-16 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">

            {/* KIRI: FORM */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Kirim Pesan</h2>

              <form className="space-y-5" onSubmit={handleWhatsAppSubmit}>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Masukkan nama Anda"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="contoh@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">No. WhatsApp</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0812-xxxx-xxxx"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subjek Pesan</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-white"
                  >
                    <option value="">Pilih Subjek</option>
                    <option value="Pertanyaan Booking">Pertanyaan Booking</option>
                    <option value="Membership">Info Membership / Member Tetap</option>
                    <option value="Kerja Sama">Kerja Sama / Event</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Pesan Anda *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Tulis pesan Anda di sini..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <Send size={20} /> Kirim via WhatsApp
                </button>
              </form>
            </div>

            {/* KANAN: INFO & MAPS */}
            <div className="flex flex-col gap-8">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-2xl border border-green-100 flex flex-col items-start hover:-translate-y-1 transition-transform">
                  <div className="bg-green-600 p-3 rounded-full text-white mb-4 shadow-sm">
                    <Phone size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">Telepon / WhatsApp</h3>
                  <p className="text-gray-600 text-sm mb-2">Fast response saat jam kerja.</p>
                  <p className="font-extrabold text-green-700">+62 877-1147-6068</p>
                </div>

                <div className="bg-gray-100 p-6 rounded-2xl border border-gray-200 flex flex-col items-start hover:-translate-y-1 transition-transform">
                  <div className="bg-gray-900 p-3 rounded-full text-white mb-4 shadow-sm">
                    <Mail size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600 text-sm mb-2">Untuk keperluan formal/bisnis.</p>
                  <p className="font-extrabold text-gray-900">cs@cianjursport.com</p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex-grow">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <MapPin className="text-green-600" /> Lokasi Pusat Kami
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed font-medium">
                  Jl. Raya Cianjur No. 123, Pusat Kota Cianjur<br />
                  Jawa Barat, Indonesia 43211
                </p>

                {/* --- GOOGLE MAPS EMBED BARU --- */}
                <div className="w-full h-48 bg-gray-200 rounded-xl overflow-hidden mb-8 relative">
                  <iframe
                    title="CSC Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.7222401603!2d107.17350497499552!3d-6.803605493193852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6853d9dfa41c0f%3A0xd07de46dd2971c2c!2sCianjur%20sport%20centre!5e0!3m2!1sen!2sid!4v1776910627288!5m2!1sen!2sid"
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
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex justify-between border-b border-gray-100 pb-2">
                    <span>Setiap Hari (Senin - Minggu)</span>
                    <span className="font-extrabold text-green-600 bg-green-50 px-2 py-1 rounded">07:00 - 22:00 WIB</span>
                  </li>
                  <li className="pt-1">
                    <p className="text-xs text-gray-400 italic">
                      *Tutup pada hari besar keagamaan tertentu.
                    </p>
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