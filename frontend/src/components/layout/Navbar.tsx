import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Deteksi scroll untuk mengubah warna background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tutup menu mobile jika pindah halaman
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Mudah di-edit: Tambah/ubah menu navigasi di sini
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Lapangan', path: '/lapangan' },
    { name: 'Booking', path: '/booking' },
    { name: 'Tentang Kami', path: '/tentang' },
    { name: 'Kontak', path: '/kontak' },
  ];

  // Logic warna text: putih saat di atas (karena nabrak background hero/gelap), gelap saat di-scroll
  const textColorClass = isScrolled ? 'text-gray-900' : 'text-white';
  const navBackgroundClass = isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navBackgroundClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-green-600 p-2 rounded-lg text-white font-bold text-xl">CSC</div>
            <span className={`font-bold text-xl hidden sm:block ${textColorClass}`}>
              Cianjur Sport Center
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <button 
                  key={link.name} 
                  onClick={() => navigate(link.path)} 
                  className={`font-medium transition-colors hover:text-green-500 
                    ${textColorClass} 
                    ${isActive ? 'text-green-500 border-b-2 border-green-500 pb-1' : ''}`
                  }
                >
                  {link.name}
                </button>
              )
            })}
            <button 
              onClick={() => navigate('/login')} 
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full font-bold transition-all shadow-lg"
            >
              Masuk
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={textColorClass}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

        </div>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full animate-slide-down shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                className={`block w-full text-left px-3 py-4 text-base font-medium border-b border-gray-50
                  ${location.pathname === link.path ? 'text-green-600' : 'text-gray-700'}`} 
                onClick={() => navigate(link.path)}
              >
                {link.name}
              </button>
            ))}
            <div className="pt-4 px-3">
              <button className="w-full bg-green-600 text-white py-3 rounded-lg font-bold">Masuk</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;