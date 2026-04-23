import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Deteksi scroll untuk efek glassmorphism
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

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Lapangan', path: '/lapangan' },
    { name: 'Booking', path: '/booking' },
    { name: 'Tentang Kami', path: '/tentang' },
    { name: 'Kontak', path: '/kontak' },
  ];

  // Logic warna dan efek modern: Glassmorphism saat discroll
  const textColorClass = isScrolled ? 'text-gray-900' : 'text-white drop-shadow-md';
  const navBackgroundClass = isScrolled
    ? 'bg-white/90 backdrop-blur-md shadow-lg py-2'
    : 'bg-gradient-to-b from-black/60 to-transparent py-5';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${navBackgroundClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* Logo Section */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            {/* Memanggil logo1.png dari folder public */}
            <img
              src="/logo1.png"
              alt="CSC Logo"
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className={`font-extrabold text-xl sm:text-2xl tracking-tight hidden sm:block transition-colors duration-300 ${textColorClass}`}>
              CSC <span className="font-medium text-green-500">Arena</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <button
                  key={link.name}
                  onClick={() => navigate(link.path)}
                  className={`relative px-4 py-2 font-bold text-sm tracking-wide transition-all duration-300 rounded-lg overflow-hidden group
                    ${textColorClass} 
                    ${isActive ? 'text-green-500' : 'hover:text-green-400'}`
                  }
                >
                  <span className="relative z-10">{link.name}</span>
                  {/* Efek indikator aktif bergaya sporty */}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-green-500 rounded-full"></span>
                  )}
                </button>
              )
            })}

            <div className="pl-4 ml-2 border-l border-gray-300/30">
              <button
                onClick={() => navigate('/login')}
                className="bg-green-500 hover:bg-green-400 text-gray-900 px-6 py-2.5 rounded-full font-extrabold text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:shadow-[0_0_25px_rgba(34,197,94,0.6)] hover:-translate-y-0.5"
              >
                Masuk
              </button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${isScrolled ? 'text-gray-900 bg-gray-100' : 'text-white bg-white/20 backdrop-blur-sm'}`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full animate-slide-down shadow-2xl">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                className={`block w-full text-left px-4 py-4 text-base font-bold uppercase tracking-wider border-b border-gray-50 transition-colors
                  ${location.pathname === link.path ? 'text-green-600 bg-green-50' : 'text-gray-600 hover:bg-gray-50'}`}
                onClick={() => navigate(link.path)}
              >
                {link.name}
              </button>
            ))}
            <div className="pt-6 px-4">
              <button className="w-full bg-gray-900 hover:bg-green-500 text-white hover:text-gray-900 transition-colors duration-300 py-4 rounded-xl font-extrabold uppercase tracking-widest shadow-lg">
                Masuk
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;