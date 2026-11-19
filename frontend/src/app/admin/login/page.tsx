'use client';

import React, { useState, Suspense } from 'react';
import Image from 'next/image';
import { R2_MEDIA } from '@/lib/constants';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, User, Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/admin/dashboard';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !password) {
      setError('Please enter both username and password.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'Authentication failed. Please check your credentials.');
        setLoading(false);
        return;
      }

      // Success - Redirect
      router.push(from);
      router.refresh();
    } catch (err) {
      console.error('Login error:', err);
      setError('A network connection error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Brand Card - Clean White Theme */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-xl p-6 sm:p-8">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="inline-block mx-auto mb-4 p-2">
            <Image
              src={R2_MEDIA.brand.logo}
              alt="RK International Language Academy"
              width={200}
              height={150}
              priority
              className="h-20 w-auto object-contain mx-auto"
            />
          </div>
          <h1 className="text-2xl font-black text-[#062343] tracking-tight">Admin & Staff Portal</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Sign in with your assigned <strong className="text-[#062343]">Username</strong> and password.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in slide-in-from-top-1">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="leading-snug">{error}</div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. superadmin"
                disabled={loading}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0098DA] focus:border-transparent transition-all disabled:opacity-50"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Password
              </label>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
                required
                className="w-full pl-10 pr-11 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0098DA] focus:border-transparent transition-all disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700 transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 bg-[#0098DA] hover:bg-[#0082ba] text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Verifying credentials...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Quick Credentials Info Box for Setup */}
        <div className="mt-6 p-3.5 rounded-xl bg-sky-50/70 border border-sky-100 text-xs text-slate-700 space-y-2">
          <div className="flex items-center gap-1.5 text-[#0098DA] font-bold text-[11px] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Default Academy Credentials</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
            <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
              <span className="block text-amber-700 font-bold mb-0.5">Super Admin:</span>
              <div className="text-slate-600">User: <code className="text-[#062343] font-mono font-bold bg-slate-100 px-1 py-0.5 rounded">superadmin</code></div>
              <div className="text-slate-600">Pass: <code className="text-[#062343] font-mono font-bold bg-slate-100 px-1 py-0.5 rounded">admin123</code></div>
            </div>
            <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
              <span className="block text-[#0098DA] font-bold mb-0.5">Staff Admin:</span>
              <div className="text-slate-600">User: <code className="text-[#062343] font-mono font-bold bg-slate-100 px-1 py-0.5 rounded">staff</code></div>
              <div className="text-slate-600">Pass: <code className="text-[#062343] font-mono font-bold bg-slate-100 px-1 py-0.5 rounded">staff123</code></div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0098DA]" />
            <span>Secure JWT Cookie Session</span>
          </div>
          <Link href="/" className="hover:text-[#0098DA] font-semibold transition-colors">
            ← Back to Website
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      <Suspense fallback={
        <div className="w-10 h-10 border-4 border-[#0098DA] border-t-transparent rounded-full animate-spin"></div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}
