import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, CalendarCheck, Map, BarChart3,
  LogOut, Menu, X, Bell
} from 'lucide-react';

const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { name: 'Bookings', icon: CalendarCheck, path: '/admin/bookings' },
    { name: 'Courts', icon: Map, path: '/admin/courts' },
    { name: 'Reports', icon: BarChart3, path: '/admin/reports' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">

      {/* Sidebar Desktop & Mobile */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:block`}>
        <div className="flex items-center justify-between h-20 px-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="bg-green-500 text-slate-900 font-black p-2 rounded-lg text-xl">CSC</div>
            <span className="font-bold text-xl tracking-wide">Admin</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-2 mt-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all duration-200
                  ${isActive
                    ? 'bg-green-500 text-slate-900 shadow-lg shadow-green-500/20'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
              >
                <item.icon size={20} />
                {item.name}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-800">
          <button
            onClick={() => navigate('/login')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-40">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-600">
            <Menu size={24} />
          </button>

          <div className="hidden lg:block">
            <h2 className="text-xl font-bold text-slate-800 capitalize">
              {location.pathname.split('/')[2] || 'Dashboard Overview'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-600">
                AD
              </div>
              <div className="hidden md:block text-sm">
                <p className="font-bold text-slate-900">Admin Utama</p>
                <p className="text-slate-500">Superadmin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content (Outlet) */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <Outlet />
        </main>
      </div>

      {/* Overlay untuk Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}
    </div>
  );
};

export default AdminLayout;