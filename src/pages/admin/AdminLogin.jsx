import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../../auth/AuthContext';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, loading, error, setError } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [formValidation, setFormValidation] = useState('');

  // If already authenticated, redirect immediately
  useEffect(() => {
    if (isAuthenticated) {
      const destination = location.state?.from?.pathname || '/admin/dashboard';
      navigate(destination, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleFillDemo = () => {
    setEmail('admin@nova.com');
    setPassword('Admin@123');
    setError('');
    setFormValidation('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormValidation('');
    setError('');

    if (!email.trim() || !password) {
      setFormValidation('Please fill in both email and password.');
      return;
    }

    const result = await login(email, password, rememberMe);
    if (result.success) {
      const destination = location.state?.from?.pathname || '/admin/dashboard';
      navigate(destination, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-indigo-600 selection:text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Brand Link */}
      <div className="mb-8 text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 group text-white hover:opacity-90 transition-opacity"
        >
          <span className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black tracking-tighter text-base shadow-lg shadow-indigo-500/25">
            N
          </span>
          <span className="text-2xl font-black tracking-widest text-white">
            NOVA
          </span>
        </Link>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">
          CMS & Builder Console
        </p>
      </div>

      {/* Centered Login Card */}
      <div className="w-full max-w-md bg-slate-800/90 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-slate-700/80 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-slate-700/60 border border-slate-600/60 flex items-center justify-center mx-auto mb-4 text-indigo-400">
            <Lock size={22} />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Admin Login
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Sign in to manage sections, media, and site settings
          </p>
        </div>

        {/* Demo Credentials Pill */}
        <div className="mb-6 p-3.5 rounded-2xl bg-indigo-950/50 border border-indigo-500/30 flex items-center justify-between text-xs">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-indigo-300 font-semibold">
              <Sparkles size={13} />
              <span>Demo Account Available</span>
            </div>
            <p className="text-slate-400 font-mono text-[11px]">
              admin@nova.com • Admin@123
            </p>
          </div>
          <button
            type="button"
            onClick={handleFillDemo}
            className="px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-[11px] transition-colors shrink-0 shadow-xs cursor-pointer"
          >
            Auto Fill
          </button>
        </div>

        {/* Error Alert */}
        {(error || formValidation) && (
          <div className="mb-6 p-3.5 rounded-2xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
            <AlertCircle size={16} className="text-rose-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">{error || formValidation}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail size={17} />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@nova.com"
                className="w-full pl-10 pr-4 py-3 bg-slate-900/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Password
              </label>
              <span className="text-[11px] text-slate-400">Case-sensitive</span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock size={17} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-11 py-3 bg-slate-900/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900 cursor-pointer"
              />
              <span className="text-xs text-slate-300 font-medium">Remember me</span>
            </label>
            <span className="text-xs text-indigo-400 hover:text-indigo-300 cursor-default">
              Encrypted session
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all duration-200 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/25 cursor-pointer"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Bottom Security Note */}
        <div className="mt-8 pt-6 border-t border-slate-700/60 flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck size={15} className="text-emerald-400" />
          <span>NOVA Protected Admin Portal • 256-bit SSL</span>
        </div>
      </div>

      {/* Back to Public Website Link */}
      <div className="mt-8 text-center z-10">
        <Link
          to="/"
          className="text-xs text-slate-400 hover:text-white transition-colors underline underline-offset-4"
        >
          ← Return to public website
        </Link>
      </div>
    </div>
  );
};

export default AdminLogin;
