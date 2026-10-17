import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ExternalLink,
  Save,
  UploadCloud,
  Loader2,
  Check,
  Plus,
  MousePointerClick,
  Eye,
  Sliders,
} from 'lucide-react';
import { useWebsite } from '../../../context/WebsiteContext';
import { PublishModal } from '../editor/PublishModal';

export const EasyEditToolbar = ({
  isEditMode,
  setIsEditMode,
  onOpenAddModal,
}) => {
  const {
    sections,
    hasUnsavedChanges,
    isSavingDraft,
    isPublishing,
    websiteStatus,
    publishedAt,
    isPublishModalOpen,
    saveDraft,
    openPublishModal,
    closePublishModal,
    confirmPublish,
  } = useWebsite();

  return (
    <>
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md text-white border-b border-slate-800 px-3 sm:px-4 py-2 flex items-center justify-between gap-2 shadow-md">
        {/* Left: Back & Easy Edit Badge */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <Link
            to="/admin/dashboard"
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Back to Admin Dashboard"
          >
            <ArrowLeft size={16} />
          </Link>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
              N
            </span>
            <span className="text-xs sm:text-sm font-extrabold tracking-wide text-white hidden xs:inline">
              NOVA Easy Edit
            </span>
            <span
              className={`text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wider ${
                websiteStatus === 'published' && !hasUnsavedChanges
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}
            >
              {websiteStatus === 'published' && !hasUnsavedChanges ? 'Published' : 'Draft'}
            </span>
          </div>
        </div>

        {/* Center: Mode Switcher (Edit vs Browse) */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="flex items-center bg-slate-800 p-0.5 rounded-xl border border-slate-700 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setIsEditMode(true)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                isEditMode
                  ? 'bg-indigo-600 text-white shadow-xs font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Edit sections and customize inline"
            >
              <MousePointerClick size={13} />
              <span className="text-[11px] sm:text-xs">Edit</span>
            </button>

            <button
              type="button"
              onClick={() => setIsEditMode(false)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                !isEditMode
                  ? 'bg-indigo-600 text-white shadow-xs font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Browse website as a visitor"
            >
              <Eye size={13} />
              <span className="text-[11px] sm:text-xs">Browse</span>
            </button>
          </div>

          {/* Add Section Button */}
          <button
            type="button"
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700 cursor-pointer"
            title="Add a new section"
          >
            <Plus size={14} className="text-indigo-400" />
            <span className="hidden md:inline text-xs">Add Section</span>
          </button>
        </div>

        {/* Right: Save Draft, Preview & Publish */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Auto-save Status Pill */}
          <div className="hidden lg:flex items-center gap-1.5 text-[11px] px-2 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60">
            {isSavingDraft ? (
              <span className="text-indigo-400 flex items-center gap-1 font-semibold">
                <Loader2 size={11} className="animate-spin" />
                <span>Saving draft...</span>
              </span>
            ) : hasUnsavedChanges ? (
              <span className="text-amber-400 flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>Auto-saving draft</span>
              </span>
            ) : (
              <span className="text-slate-300 flex items-center gap-1">
                <Check size={12} className="text-emerald-400" />
                <span>Draft Saved</span>
              </span>
            )}
          </div>

          {/* Save Draft Button */}
          <button
            type="button"
            onClick={() => saveDraft(false)}
            disabled={isSavingDraft}
            className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700 cursor-pointer disabled:opacity-50"
            title="Save draft"
          >
            <Save size={13} />
            <span className="hidden sm:inline text-xs">Save</span>
          </button>

          {/* Switch to Advanced 3-Column Editor */}
          <Link
            to="/admin/editor"
            className="hidden xl:inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors border border-slate-700"
            title="Switch to 3-column builder"
          >
            <Sliders size={13} />
            <span>Builder</span>
          </Link>

          {/* View Live Storefront */}
          <Link
            to="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 p-1.5 sm:px-2 sm:py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors border border-slate-700"
            title="View live website"
          >
            <ExternalLink size={13} />
          </Link>

          {/* Publish Live Button */}
          <button
            type="button"
            onClick={openPublishModal}
            className="inline-flex items-center gap-1 px-3 sm:px-3.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/25 cursor-pointer active:scale-98"
            title="Publish changes to live storefront"
          >
            <UploadCloud size={13} />
            <span className="text-xs">Publish</span>
          </button>
        </div>
      </header>

      {/* Confirmation Modal */}
      <PublishModal
        isOpen={isPublishModalOpen}
        onClose={closePublishModal}
        onConfirm={confirmPublish}
        isPublishing={isPublishing}
        sectionCount={sections.length}
        lastPublishedAt={publishedAt}
      />
    </>
  );
};

export default EasyEditToolbar;
