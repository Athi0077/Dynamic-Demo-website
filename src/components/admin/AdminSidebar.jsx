import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Layers,
  Image as ImageIcon,
  Settings,
  LogOut,
  ExternalLink,
  Edit,
  X,
  Wand2,
} from 'lucide-react';
import { useAuth } from '../../auth/AuthContext';

export const AdminSidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    {
      to: '/admin/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      end: true,
    },
    {
      to: '/admin/easy-edit',
      label: 'Easy Edit',
      icon: Wand2,
      badge: 'New',
    },
    {
      to: '/admin/editor',
      label: 'Website Editor',
      icon: Edit,
      badge: 'Pro',
    },
    {
      to: '/admin/sections',
      label: 'Sections',
      icon: Layers,
    },
    {
      to: '/admin/media',
      label: 'Media',
      icon: ImageIcon,
    },
    {
      to: '/admin/settings',
      label: 'Settings',
      icon: Settings,
    },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between bg-slate-900 text-slate-300 p-5 select-none">
      <div>
        {/* Logo & Header */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800">
          <Link
            to="/admin/dashboard"
            onClick={onClose}
            className="flex items-center gap-2.5 group"
          >
            <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black tracking-tighter text-sm shadow-md shadow-indigo-600/30">
              N
            </span>
            <div>
              <span className="text-base font-extrabold tracking-widest text-white block leading-none">
                NOVA
              </span>
              <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
                Admin Console
              </span>
            </div>
          </Link>

          {/* Close button on mobile */}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <div className="space-y-1.5">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            Navigation
          </p>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className="shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Footer Area: Live Site & User Profile */}
      <div className="pt-6 border-t border-slate-800 space-y-4">
        {/* Quick View Public Website Link */}
        <Link
          to="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 text-xs font-semibold transition-colors border border-slate-700/60"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>View Live Website</span>
          </div>
          <ExternalLink size={14} className="text-slate-400" />
        </Link>

        {/* User Profile Card */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800/40">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
              {user?.name ? user.name[0] : 'A'}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">
                {user?.name || 'Admin'}
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                {user?.email || 'admin@nova.com'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            title="Log Out"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed Left) */}
      <aside className="hidden lg:block w-64 h-screen fixed top-0 left-0 z-30 border-r border-slate-800">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Sidebar */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            onClick={onClose}
          />
          <div className="relative w-64 max-w-xs h-full z-10 shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;
