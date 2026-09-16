import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, AlertCircle, ArrowRight } from 'lucide-react';
import SEO from '../components/common/SEO';
import { authService } from '../services/api';
import { RouterBitGlyph } from '../components/cutsheet/LineworkVector';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!username.trim() || !password) {
      setError('Please enter both username and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await authService.login({ username, password });
      if (res.data?.token) {
        localStorage.setItem('realcnc_token', res.data.token);
        localStorage.setItem('realcnc_user', JSON.stringify(res.data.user));
        navigate('/admin');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(
        err.response?.data?.message || 'Invalid credentials. Default admin setup is configured in backend/.env'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title="Admin Login" description="Workshop Admin Portal for Wood CNC Design Shop - RealCNC" />
      <div className="min-h-[75vh] flex items-center justify-center py-20 px-4 bg-ivory/40">
        <div className="max-w-md w-full border border-hairline bg-paper p-8 sm:p-10 shadow-sm">
          
          <div className="text-center mb-8 pb-4 border-b border-hairline">
            <div className="p-3 border border-hairline bg-ivory text-walnut inline-block mx-auto mb-3">
              <RouterBitGlyph className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-charcoal tracking-tight">
              Workshop Ledger Access
            </h1>
            <p className="font-mono text-xs text-warm-gray mt-1 uppercase">
              Wood CNC Design Shop - RealCNC
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 border border-red-300 bg-red-50 text-red-700 text-xs flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-charcoal mb-1 font-semibold">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-9 pr-3.5 py-2 text-sm border border-hairline bg-ivory/50 text-charcoal focus:bg-paper focus:outline-none focus:ring-1 focus:ring-walnut"
                />
                <User className="w-4 h-4 text-warm-gray absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-charcoal mb-1 font-semibold">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3.5 py-2 text-sm border border-hairline bg-ivory/50 text-charcoal focus:bg-paper focus:outline-none focus:ring-1 focus:ring-walnut"
                />
                <Lock className="w-4 h-4 text-warm-gray absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-charcoal hover:bg-walnut text-paper font-mono text-xs tracking-wider uppercase transition-colors flex items-center justify-center pt-3"
            >
              {loading ? (
                <span>Verifying credentials...</span>
              ) : (
                <>
                  <span>Sign In To Dashboard</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-hairline text-center">
            <span className="font-mono text-[10px] text-warm-gray">
              AUTHENTICATION PROTECTED VIA JWT PROTOCOL
            </span>
          </div>

        </div>
      </div>
    </>
  );
};

export default AdminLogin;
