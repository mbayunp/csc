import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import { ToastProvider } from './components/ui/Toast';

import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';

// Public Pages (Normal import for faster initial load)
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
            
            {/* Login without MainLayout */}
            <Route path="/login" element={<Login />} />

            {/* Admin Routes with Suspense and ProtectedRoute */}
            <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin', 'cs']} />}>
              <Route index element={
                <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div></div>}>
                  <Dashboard />
                </Suspense>
              } />
              <Route path="bookings" element={
                <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div></div>}>
                  <Bookings />
                </Suspense>
              } />
              <Route path="courts" element={
                <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div></div>}>
                  <Courts />
                </Suspense>
              } />
              <Route path="reports" element={
                <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div></div>}>
                  <Reports />
                </Suspense>
              } />
              <Route path="settings" element={<div className="p-8">Settings (To Be Implemented)</div>} />
            </Route>
            
            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;