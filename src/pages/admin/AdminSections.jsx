import React, { useState } from 'react';
import { Plus, Info, Sparkles } from 'lucide-react';
import { SectionList } from '../../components/admin/SectionList';

export const AdminSections = () => {
  const [addNotice, setAddNotice] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Website Sections
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200/60">
              CMS Layout
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Configure the homepage section components, toggle active visibility, and prepare for Step 3 drag-and-drop.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setAddNotice(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Add Section</span>
        </button>
      </div>

      {/* Architecture Information Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-start gap-3.5 text-xs text-indigo-900">
        <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
          <Info size={17} />
        </div>
        <div className="space-y-1">
          <p className="font-bold">Modular Page Builder Architecture</p>
          <p className="text-indigo-800/80 leading-relaxed">
            Every section below is mapped to an independent, isolated React component. In Step 3, you will be able to reorder these sections with drag-and-drop, edit live texts and images, and persist settings to the database.
          </p>
        </div>
      </div>

      {/* Sections List */}
      <SectionList showHeader={true} />

      {/* Add Section Coming Soon Modal */}
      {addNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white border border-slate-100 rounded-3xl p-6 text-slate-800 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <Sparkles size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Section Library Coming in Step 3
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              In Step 3, you'll be able to choose from a library of pre-built responsive sections (FAQ accordions, Video banners, Pricing tables, Newsletter forms) and insert them onto your page with one click.
            </p>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setAddNotice(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSections;
