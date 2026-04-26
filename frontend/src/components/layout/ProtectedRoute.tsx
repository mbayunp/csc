import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  allowedRoles?: Array<'admin' | 'cs' | 'user'>;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();

  // 1. Jika belum login, tendang ke halaman login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    console.log("Role tidak diizinkan:", user.role); // Coba tambah log ini untuk debug
    return <Navigate to="/" replace />;
  }

  // 3. Jika aman, persilakan masuk ke halaman yang dituju
  return <Outlet />;
};