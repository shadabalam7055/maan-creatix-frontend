'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { FiMail, FiLock, FiAlertCircle, FiArrowRight } from 'react-icons/fi';

export default function AdminLoginPage() {
  const { admin, login, loading } = useAdminAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (!loading && admin) {
      router.replace('/admin');
    }
  }, [admin, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setStatus('error');
      setErrorMsg('Please enter email and password.');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    const res = await login(email, password);

    if (res.success) {
      setStatus('success');
      router.replace('/admin');
    } else {
      setStatus('error');
      setErrorMsg(res.message || 'Incorrect admin credentials.');
    }
  };

  if (loading) {
    return (
      <div className="bg-[#050816] text-white min-h-screen flex items-center justify-center flex-col space-y-4">
        <div className="w-12 h-12 border-t-2 border-blue-500 rounded-full animate-spin" />
        <span className="text-xs font-semibold text-slate-500 tracking-wider">Verifying Admin Session...</span>
      </div>
    );
  }

  return (
    <div className="bg-[#050816] text-white min-h-screen flex items-center justify-center relative p-6 font-body overflow-hidden admin-login-container">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[80px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[80px]" />
      
      {/* Main Glass Card Form */}
      <div className="w-full max-w-md bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-md shadow-2xl relative z-10">
        
        {/* Title Header */}
        <div className="text-center space-y-3 mb-10">
          <Link href="/" className="inline-block text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Maan Creatix
          </Link>
          <h1 className="text-2xl font-extrabold tracking-tight font-heading">Admin Console</h1>
          <p className="text-xs text-slate-500 font-light">Central administrative system controls.</p>
        </div>

        {/* Action Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email */}
          <div className="space-y-2 text-left">
            <label htmlFor="email" className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Admin Email
            </label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
              <input
                type="email"
                id="email"
                placeholder="admin@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full bg-slate-900/60 border border-white/5 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/30 transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2 text-left">
            <label htmlFor="password" className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full bg-slate-900/60 border border-white/5 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/30 transition-all"
              />
            </div>
          </div>

          {/* Error Banner */}
          {status === 'error' && (
            <div className="flex items-start space-x-2 bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-xs text-left">
              <FiAlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full inline-flex items-center justify-center text-xs font-bold py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl transition-all shadow-lg shadow-blue-500/10 disabled:opacity-50 active:scale-[0.98] group cursor-pointer"
          >
            {status === 'submitting' ? 'Authenticating...' : 'Sign In As Admin'}
            <FiArrowRight className="ml-2 group-hover:transform group-hover:translate-x-0.5 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-slate-500 font-light">
          Access restricted to system administrators.
        </div>
      </div>
    </div>
  );
}
