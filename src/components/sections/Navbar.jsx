import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { siteConfig } from '../../data/siteConfig';

export const Navbar = ({ config = siteConfig.navbar, isEditor = false }) => {
  const { totalItems, setIsCartOpen, setIsSearchOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = config?.links || [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'products', label: 'Products', href: '#products' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ];

  const brandName = config?.brandName || 'NOVA';

  return (
    <header
      className={`${
        isEditor ? 'sticky top-0 z-10' : 'fixed top-0 left-0 right-0 z-40'
      } transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 backdrop-blur-md shadow-xs border-b border-slate-200/60 py-3.5'
          : 'bg-white/60 backdrop-blur-xs border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand Name */}
          <a
            href="#home"
            className="flex items-center gap-2 group focus:outline-hidden"
          >
            <span className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black tracking-tighter text-sm group-hover:bg-indigo-600 transition-colors shadow-xs">
              N
            </span>
            <span className="text-xl font-extrabold tracking-widest text-slate-900 group-hover:text-indigo-600 transition-colors">
              {brandName}
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link, idx) => {
              const label = link.label || link.name || 'Link';
              const key = link.id || link.label || link.name || link.href || `nav-item-${idx}`;
              return (
                <a
                  key={key}
                  href={link.href || '#'}
                  className="text-sm font-medium text-slate-600 hover:text-slate-950 transition-colors relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-slate-900 after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-200"
                >
                  {label}
                </a>
              );
            })}
          </nav>

          {/* Action Icons (Search, Cart, Mobile Toggle) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 rounded-xl text-slate-600 hover:text-slate-950 hover:bg-slate-100/80 transition-colors cursor-pointer"
              aria-label="Open search"
            >
              <Search size={19} />
            </button>

            {/* Cart Trigger */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl text-slate-600 hover:text-slate-950 hover:bg-slate-100/80 transition-colors cursor-pointer"
              aria-label="View shopping cart"
            >
              <ShoppingBag size={19} />
              {totalItems > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-scale shadow-xs">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-slate-200 shadow-xl px-4 pt-3 pb-6 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1">
            {links.map((link, idx) => {
              const label = link.label || link.name || 'Link';
              const key = `mob-${link.id || link.label || link.name || link.href || idx}`;
              return (
                <a
                  key={key}
                  href={link.href || '#'}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-base font-semibold text-slate-800 hover:bg-slate-100 hover:text-indigo-600 transition-colors"
                >
                  <span>{label}</span>
                  <ArrowUpRight size={16} className="text-slate-400" />
                </a>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between px-3">
            <span className="text-xs text-slate-400 font-medium">Curated Essentials</span>
            <span className="text-xs font-semibold text-emerald-600">Free Worldwide Shipping</span>
          </div>
        </div>
      )}
    </header>
  );
};
