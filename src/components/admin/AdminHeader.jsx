import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, LogOut, ExternalLink, ChevronDown, User, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../auth/AuthContext';

export const AdminHeader = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-20 bg-white/85 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
      {/* Left: Mobile hamburger & Welcome greeting */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu size={22} />
        </button>

        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
            Welcome back, {user?.name?.split(' ')[0] || 'Admin'}
          </h2>
          <p className="text-xs text-slate-500 hidden sm:block">
            NOVA Store • All systems operational
          </p>
        </div>
      </div>

      {/* Right: Quick actions, Live Site link & User Dropdown */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Quick View Website Button */}
        <Link
          to="/"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
        >
          <span>View Website</span>
          <ExternalLink size={13} />
        </Link>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 p-1 sm:p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            aria-expanded={dropdownOpen}
          >
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center shadow-xs">
              {user?.name ? user.name[0] : 'A'}
            </div>
            <div className="hidden md:block text-left">
              <span className="text-xs font-bold text-slate-900 block leading-tight">
                {user?.name || 'Admin'}
              </span>
              <span className="text-[10px] text-slate-500 font-medium">
                {user?.role || 'Super Admin'}
              </span>
            </div>
            <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-30 animate-in fade-in duration-150">
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <p className="text-xs font-bold text-slate-900">{user?.name || 'Admin'}</p>
                <p className="text-[11px] text-slate-500 truncate">{user?.email || 'admin@nova.com'}</p>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 mt-1">
                  <ShieldCheck size={12} />
                  <span>Verified Session</span>
                </span>
              </div>

              <Link
                to="/admin/settings"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <User size={15} />
                <span>Account & Settings</span>
              </Link>

              <Link
                to="/"
                target="_blank"
                rel="noreferrer"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors sm:hidden"
              >
                <ExternalLink size={15} />
                <span>View Public Website</span>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full mt-1 flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer text-left"
              >
                <LogOut size={15} />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
