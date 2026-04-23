import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1', // sesuaikan
});

// ✅ REQUEST INTERCEPTOR
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ✅ RESPONSE INTERCEPTOR (AMAN)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // 🔥 HANYA trigger jika BUKAN di halaman login
    if (status === 401 && window.location.pathname !== '/login') {
      window.dispatchEvent(new Event('unauthorized'));
    }

    return Promise.reject(error);
  }
);

export default api;