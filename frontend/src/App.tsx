import React, { Suspense } from 'react';
// 1. WAJIB TAMBAHKAN 'Outlet' DI IMPORT INI 👇
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/layout/AdminLayout';
import { ToastProvider } from './components/ui/Toast';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';

// Public Pages
import Home from './pages/public/Home';
import Lapangan from './pages/public/Lapangan';
import Booking from './pages/public/Booking';
import Tentang from './pages/public/Tentang';
import Kontak from './pages/public/Kontak';
import Login from './pages/public/Login';

// Admin Pages (Lazy Load)
const Dashboard = React.lazy(() => import('./pages/admin/Dashboard'));
const Bookings = React.lazy(() => import('./pages/admin/Bookings'));
const Courts = React.lazy(() => import('./pages/admin/Courts'));
const Reports = React.lazy(() => import('./pages/admin/Reports'));

const GlobalSuspenseFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center bg-slate-50">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-4 border-slate-200 border-t-green-500 rounded-full animate-spin"></div>
      <p className="text-slate-500 font-medium text-sm animate-pulse">Memuat halaman...</p>
    </div>
  </div>
);

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/lapangan" element={<Lapangan />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/tentang" element={<Tentang />} />
              <Route path="/kontak" element={<Kontak />} />
            </Route>

            <Route path="/login" element={<Login />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin', 'cs']} />}>
              <Route element={<AdminLayout />}>

                {/* 2. PERBAIKAN DI SINI: Gunakan Outlet di dalam element */}
                <Route element={
                  <Suspense fallback={<GlobalSuspenseFallback />}>
                    <Outlet />
                  </Suspense>
                }>
                  <Route index element={<Dashboard />} />
                  <Route path="bookings" element={<Bookings />} />
                  <Route path="courts" element={<Courts />} />
                  <Route path="reports" element={<Reports />} />
                  <Route path="settings" element={<div className="p-8 font-bold text-slate-700">Pengaturan (Segera Hadir)</div>} />
                </Route>

              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;