import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, Loader2, AlertCircle } from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // Simpan token ke Context & LocalStorage
        login(result.data.user, result.data.token);

        // Arahkan berdasarkan Role
        if (result.data.user.role === 'admin' || result.data.user.role === 'cs') {
          navigate('/admin');
        } else {
          navigate('/'); // User biasa ke beranda
        }
      } else {
        throw new Error(result.message || 'Login gagal');
      }
    } catch (error: any) {
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-slate-900 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-slate-900/20">
            <span className="text-2xl font-black text-green-500">CSC</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Selamat Datang Kembali</h2>
          <p className="text-slate-500 text-sm mt-1">Masuk untuk mengelola sistem CSC</p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-6 bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 border border-red-100">
            <AlertCircle size={18} /> {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Mail size={18} />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all text-sm"
                placeholder="admin@cianjursport.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Lock size={18} />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-slate-900 hover:bg-green-500 text-white hover:text-slate-900 font-bold py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 mt-2"
          >
            {isLoading ? <><Loader2 size={18} className="animate-spin" /> Memproses...</> : 'Login ke Dashboard'}
          </button>
        </form>

        <button
          onClick={() => navigate('/')}
          className="w-full mt-6 text-sm text-slate-500 hover:text-slate-900 font-medium transition-colors"
        >
          &larr; Kembali ke Beranda
        </button>

      </div>
    </div>
  );
};

export default Login;