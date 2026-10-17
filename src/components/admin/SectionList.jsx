import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShoppingBag,
  Layout,
  Tag,
  Star,
  MessageSquare,
  Compass,
  FileText,
  Image as ImageIcon,
  Video,
  Grid,
  HelpCircle,
  Mail,
  Edit3,
  CheckCircle2,
  XCircle,
  X,
  Info,
  ArrowRight,
} from 'lucide-react';
import { useWebsite } from '../../context/WebsiteContext';

const iconMap = {
  Sparkles,
  ShoppingBag,
  Layout,
  Tag,
  Star,
  MessageSquare,
  Compass,
  FileText,
  Image: ImageIcon,
  Video,
  Grid,
  HelpCircle,
  Mail,
};

export const SectionList = ({ showHeader = true, maxItems }) => {
  const { sections, toggleSectionVisibility } = useWebsite();
  const [editorModalSection, setEditorModalSection] = useState(null);

  const displayedSections = maxItems ? sections.slice(0, maxItems) : sections;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      {showHeader && (
        <div className="px-6 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Website Sections</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Current homepage layout structure, active order, and visibility status
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
              {sections.filter((s) => s.enabled !== false).length} of {sections.length} Active
            </span>
            <Link
              to="/admin/editor"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 transition-colors shadow-xs"
            >
              <span>Launch Builder</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      )}

      {/* List items */}
      <div className="divide-y divide-slate-100">
        {displayedSections.map((sec, idx) => {
          const IconComponent = iconMap[sec.icon] || Layout;

          return (
            <div
              key={sec.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
            >
              <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                {/* Order Index */}
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-500 text-xs font-bold flex items-center justify-center shrink-0">
                  {sec.order || idx + 1}
                </span>

                {/* Section Icon */}
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <IconComponent size={20} />
                </div>

                {/* Name & Details */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm font-bold text-slate-900 truncate">
                      {sec.name}
                    </h4>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-mono text-[11px]">
                      type: {sec.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                    {sec.description || 'Customized page section component'}
                  </p>
                </div>
              </div>

              {/* Status & Actions */}
              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                {/* Active Toggle / Status badge */}
                <button
                  type="button"
                  onClick={() => toggleSectionVisibility(sec.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                    sec.enabled !== false
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                      : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                  }`}
                  title="Click to toggle active status"
                >
                  {sec.enabled !== false ? (
                    <>
                      <CheckCircle2 size={13} className="text-emerald-600" />
                      <span>Active</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={13} className="text-slate-400" />
                      <span>Hidden</span>
                    </>
                  )}
                </button>

                {/* Edit Button */}
                <Link
                  to="/admin/editor"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Edit3 size={13} />
                  <span>Edit in Builder</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Temporary Notice Modal when clicking Edit */}
      {editorModalSection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Info size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {editorModalSection.name}
                  </h3>
                  <span className="text-xs text-indigo-600 font-semibold">
                    Page Builder Ready
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditorModalSection(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-2">
              <p className="font-semibold text-slate-800">
                Visual Drag & Drop Page Builder Active
              </p>
              <p>
                You can rearrange section order, customize headlines, colors, images, and add new section templates in the Page Builder.
              </p>
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                <span>Section ID: {editorModalSection.id}</span>
                <span>Type: {editorModalSection.type}</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setEditorModalSection(null)}
                className="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Close
              </button>
              <Link
                to="/admin/editor"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 transition-colors shadow-xs"
              >
                <span>Open in Website Editor</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
