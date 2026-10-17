import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Send, Check } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

// Clean inline SVGs for social media icons
const TwitterIcon = ({ size = 16, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = ({ size = 16, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ size = 16, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = ({ size = 16, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const Footer = ({ config = siteConfig.footer }) => {
  const {
    brandName = 'NOVA',
    tagline = 'Modern Design & Curated Essentials',
    description = 'Pioneering minimalist lifestyle accessories and workspace tools that seamlessly blend functional engineering with timeless aesthetics.',
    quickLinks = [
      { label: 'Home', href: '#home' },
      { label: 'Our Products', href: '#products' },
      { label: 'Featured Collection', href: '#featured' },
      { label: 'Philosophy', href: '#about' },
      { label: 'Reviews', href: '#testimonials' },
    ],
    supportLinks = [
      { label: 'Shipping & Delivery', href: '#shipping' },
      { label: 'Returns & Warranty', href: '#returns' },
      { label: 'Track Order', href: '#track' },
      { label: 'Contact Us', href: '#contact' },
      { label: 'FAQ', href: '#faq' },
    ],
    copyright = '© 2026 NOVA Inc. All rights reserved. Designed for the modern world.',
  } = config;

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
          {/* Brand Info (2 Columns on large screens) */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#home" className="flex items-center gap-2 group">
              <span className="w-8 h-8 rounded-xl bg-white text-slate-950 flex items-center justify-center font-black tracking-tighter text-sm group-hover:bg-indigo-400 transition-colors">
                N
              </span>
              <span className="text-xl font-extrabold tracking-widest text-white">
                {brandName}
              </span>
            </a>

            <p className="text-xs uppercase tracking-wider text-indigo-400 font-semibold">
              {tagline}
            </p>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {description}
            </p>

            {/* Newsletter input */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-slate-200 mb-2">
                Stay updated with new releases
              </p>
              <form onSubmit={handleSubscribe} className="flex max-w-sm gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500 transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-colors shrink-0 flex items-center gap-1.5"
                >
                  {subscribed ? <Check size={14} /> : <Send size={14} />}
                  <span>{subscribed ? 'Joined' : 'Join'}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Support & Help
            </h4>
            <ul className="space-y-2.5 text-sm">
              {supportLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links & Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Connect With Us
            </h4>
            <p className="text-xs text-slate-400">
              Customer Experience Concierge: Mon–Fri, 9am–6pm EST.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-slate-800 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                aria-label="Twitter"
              >
                <TwitterIcon size={14} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-slate-800 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                aria-label="Instagram"
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-slate-800 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={16} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-slate-800 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                aria-label="GitHub"
              >
                <GithubIcon size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{copyright}</p>

          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-slate-400 transition-colors">
              Terms of Service
            </a>
            <Link to="/admin/login" className="hover:text-indigo-400 font-semibold transition-colors">
              Admin Portal
            </Link>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
