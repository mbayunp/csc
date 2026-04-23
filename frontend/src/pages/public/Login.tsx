import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/ui/Toast';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { ShieldCheck, Mail, Lock } from 'lucide-react';
import api from '../../services/api';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast('Email dan Password wajib diisi', 'warning');
      return;
    }

    setIsLoading(true);
    try {
  const response = await api.post('/auth/login', { email, password });
  const data = response.data;

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  toast("Login berhasil", "success");
      
      // Redirect based on role
      if (data.user.role === 'admin' || data.user.role === 'cs') {
        navigate('/admin');
      } else {
        navigate('/');
      }
      
    } catch (error: any) {
      console.error('Login error:', error);
      const message = error.response?.data?.message || 'Login gagal. Periksa kembali email dan password Anda.';
      toast(message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-green-500/20 mb-6">
          <ShieldCheck className="text-white w-8 h-8" />
        </div>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
          Masuk ke Akun Anda
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500 font-medium">
          Dashboard Portal Cianjur Sport Center
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-6 shadow-xl shadow-slate-200/50 rounded-3xl border border-slate-100 sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            
            <div className="space-y-1">
              <label className="block text-sm font-bold text-slate-700">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <Input
                  type="email"
                  placeholder="admin@csc.com"
                  className="pl-11 h-12 text-slate-900"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-bold text-slate-700">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="pl-11 h-12 text-slate-900"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="pt-2">
              <Button 
                type="submit" 
                fullWidth 
                size="lg" 
                className="h-12 shadow-lg shadow-green-500/20 text-base"
                isLoading={isLoading}
              >
                Sign In
              </Button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
