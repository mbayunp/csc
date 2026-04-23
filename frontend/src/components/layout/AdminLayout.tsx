import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, Map, BarChart3, Settings, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/admin/bookings', label: 'Bookings', icon: <CalendarDays size={20} /> },
    { path: '/admin/courts', label: 'Courts', icon: <Map size={20} /> },
    { path: '/admin/reports', label: 'Reports', icon: <BarChart3 size={20} /> },
    { path: '/admin/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-[280px] bg-white border-r border-slate-200 flex flex-col fixed inset-y-0 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="h-20 flex items-center px-8 border-b border-slate-100">
          <Link to="/admin" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-sm shadow-green-500/20 group-hover:shadow-green-500/40 transition-shadow duration-300">
              <span className="text-white font-black text-lg tracking-tight">C</span>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">CSC Admin</span>
          </Link>
        </div>
        
        <div className="px-6 py-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 ml-2">Menu Utama</p>
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ease-out group ${
                    isActive 
                      ? 'bg-green-50 text-green-700 font-semibold shadow-sm ring-1 ring-green-500/10' 
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`${isActive ? 'text-green-600' : 'text-slate-400 group-hover:text-slate-600'} transition-colors duration-200`}>
                      {item.icon}
                    </div>
                    {item.label}
                  </div>
                  {isActive && <ChevronRight size={16} className="text-green-500 opacity-60" />}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-100">
          <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-3 border border-slate-200/60 mb-4">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
              AD
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Admin Utama</p>
              <p className="text-xs font-medium text-slate-500">Super Admin</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200 ease-out border border-transparent hover:border-red-100">
            <LogOut size={18} />
            Keluar Sistem
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-[280px] min-h-screen">
        <div className="p-8 lg:p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
