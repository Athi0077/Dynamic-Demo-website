import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Globe,
  Layers,
  ShoppingBag,
  Image as ImageIcon,
  ExternalLink,
  Edit,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Wand2,
} from 'lucide-react';
import { DashboardCard } from '../../components/admin/DashboardCard';
import { SectionList } from '../../components/admin/SectionList';
import { useWebsite } from '../../context/WebsiteContext';
import { websiteService } from '../../services/websiteService';
import { getAuthToken } from '../../services/api';

export const AdminDashboard = () => {
  const { sections, websiteStatus, publishedAt } = useWebsite();
  const [mediaCount, setMediaCount] = useState(4);

  // Fetch real media files count from backend API if authenticated
  useEffect(() => {
    let isMounted = true;
    const token = getAuthToken();
    if (token) {
      websiteService.getMedia().then((res) => {
        if (!isMounted) return;
        if (res.success && Array.isArray(res.data)) {
          setMediaCount(res.data.length);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const formattedPublished = publishedAt
    ? new Date(publishedAt).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      })
    : 'Recently';

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time status of your NOVA storefront, layout sections, and media assets
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-semibold transition-colors shadow-xs"
          >
            <span>View Live Site</span>
            <ExternalLink size={14} />
          </Link>
        </div>
      </div>

      {/* 4 Dashboard Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* 1. Website Status */}
        <DashboardCard
          title="Website Status"
          value={websiteStatus === 'published' ? 'Published' : 'Draft Mode'}
          subtitle={`Updated ${formattedPublished}`}
          icon={Globe}
          badge={websiteStatus === 'published' ? 'Live' : 'Draft'}
          badgeType={websiteStatus === 'published' ? 'success' : 'warning'}
        />

        {/* 2. Total Sections */}
        <DashboardCard
          title="Total Sections"
          value={String(sections.length)}
          subtitle={`${sections.filter((s) => s.enabled).length} active on homepage`}
          icon={Layers}
          badge="Configured"
          badgeType="info"
        />

        {/* 3. Products */}
        <DashboardCard
          title="Products"
          value="12"
          subtitle="8 live in catalogue"
          icon={ShoppingBag}
          badge="In Stock"
          badgeType="success"
        />

        {/* 4. Media Files */}
        <DashboardCard
          title="Media Files"
          value={String(mediaCount)}
          subtitle="Cloudinary CDN tracked"
          icon={ImageIcon}
          badge="Synced"
          badgeType="info"
        />
      </div>

      {/* Website Preview Section */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                MongoDB Persistence • Active Release
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Website Preview & Storefront
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl">
              Preview the current public storefront experience. Your site is dynamically powered by MongoDB with draft/publish separation.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold transition-all shadow-md"
            >
              <ExternalLink size={15} />
              <span>View Website</span>
            </Link>

            <Link
              to="/admin/easy-edit"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-600/20 transition-all"
            >
              <Wand2 size={15} />
              <span>Easy Edit (In-Page)</span>
            </Link>

            <Link
              to="/admin/editor"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs sm:text-sm font-bold border border-indigo-200/60 transition-all"
            >
              <Edit size={15} />
              <span>Advanced Builder</span>
            </Link>
          </div>
        </div>

        {/* Interactive Storefront Mockup Frame */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-100/60 p-4 sm:p-6 overflow-hidden">
          <div className="bg-white rounded-xl shadow-md border border-slate-200/80 overflow-hidden">
            {/* Mock browser bar */}
            <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                <span className="ml-2 font-mono text-[11px] text-slate-600 bg-white px-3 py-1 rounded-md border border-slate-200">
                  http://localhost:5173/ (NOVA Public Site)
                </span>
              </div>
              <span className="text-[11px] text-emerald-600 font-semibold hidden sm:inline-flex items-center gap-1">
                <ShieldCheck size={12} />
                <span>MongoDB Connected</span>
              </span>
            </div>

            {/* Mock Header & Hero teaser */}
            <div className="p-6 sm:p-8 bg-slate-50">
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-4 mb-6">
                <span className="font-extrabold tracking-widest text-slate-900 text-sm">
                  NOVA
                </span>
                <div className="hidden sm:flex gap-6 text-xs text-slate-500 font-medium">
                  <span>Home</span>
                  <span>Products</span>
                  <span>About</span>
                  <span>Contact</span>
                </div>
                <div className="flex gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-200 text-slate-700 font-bold">
                    Cart (0)
                  </span>
                </div>
              </div>

              <div className="max-w-md">
                <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                  NEW SEASON 2026
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
                  Curated Elegance for the Modern Lifestyle.
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Discover thoughtfully engineered essentials crafted with aerospace-grade precision and timeless minimalist aesthetics.
                </p>
                <div className="mt-4 flex gap-2">
                  <Link
                    to="/"
                    className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-indigo-600 transition-colors"
                  >
                    Open Live Page
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2 px-1">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-600" />
              <span>Full-width responsive viewport (Mobile, Tablet, Desktop)</span>
            </span>
            <span className="text-slate-400">Next publish will sync instantly to MongoDB</span>
          </div>
        </div>
      </div>

      {/* Website Sections Preview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Homepage Layout Structure
            </h2>
            <p className="text-xs text-slate-500">
              Modular components currently rendered on the public landing page
            </p>
          </div>
          <Link
            to="/admin/sections"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            <span>Manage All Sections</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <SectionList showHeader={false} />
      </div>
    </div>
  );
};

export default AdminDashboard;
