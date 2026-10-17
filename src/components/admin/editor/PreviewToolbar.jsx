import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
  Save,
  RotateCcw,
  Undo2,
  Redo2,
  UploadCloud,
  Loader2,
  Check,
  Wand2,
} from 'lucide-react';
import { useWebsite } from '../../../context/WebsiteContext';
import { PublishModal } from './PublishModal';

export const PreviewToolbar = ({
  previewDevice,
  setPreviewDevice,
  selectedSectionId,
}) => {
  const {
    sections,
    hasUnsavedChanges,
    isSavingDraft,
    isPublishing,
    websiteStatus,
    publishedAt,
    isPublishModalOpen,
    canUndo,
    canRedo,
    undo,
    redo,
    saveDraft,
    openPublishModal,
    closePublishModal,
    confirmPublish,
    resetSectionToTemplate,
  } = useWebsite();

  return (
    <>
      <header className="sticky top-0 z-50 bg-slate-900 text-white border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Back & Title */}
        <div className="flex items-center gap-3">
          <Link
            to="/admin/dashboard"
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Back to Dashboard"
          >
            <ArrowLeft size={18} />
          </Link>

          <div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                N
              </span>
              <h1 className="text-sm font-extrabold tracking-wide text-white">
                NOVA Page Builder
              </h1>

              {/* Status Badge */}
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  websiteStatus === 'published' && !hasUnsavedChanges
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}
              >
                {websiteStatus === 'published' && !hasUnsavedChanges ? 'Published' : 'Draft'}
              </span>
            </div>

            {/* Auto-save / Draft status note */}
            <div className="flex items-center gap-1.5 text-[10px] mt-0.5">
              {isSavingDraft ? (
                <span className="text-indigo-400 flex items-center gap-1">
                  <Loader2 size={10} className="animate-spin" />
                  <span>Saving draft...</span>
                </span>
              ) : hasUnsavedChanges ? (
                <span className="text-amber-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span>Unsaved changes (auto-saving)</span>
                </span>
              ) : (
                <span className="text-slate-400 flex items-center gap-1">
                  <Check size={11} className="text-emerald-400" />
                  <span>All changes saved</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Center: Undo/Redo & Device Switcher */}
        <div className="flex items-center gap-3">
          {/* Undo / Redo controls */}
          <div className="flex items-center bg-slate-800 p-0.5 rounded-xl border border-slate-700">
            <button
              type="button"
              disabled={!canUndo}
              onClick={undo}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
              title="Undo (Ctrl+Z)"
            >
              <Undo2 size={15} />
            </button>
            <button
              type="button"
              disabled={!canRedo}
              onClick={redo}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
              title="Redo (Ctrl+Y)"
            >
              <Redo2 size={15} />
            </button>
          </div>

          {/* Device Switcher */}
          <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700">
            <button
              type="button"
              onClick={() => setPreviewDevice('desktop')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                previewDevice === 'desktop'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Desktop View (100%)"
            >
              <Monitor size={14} />
              <span className="hidden md:inline">Desktop</span>
            </button>

            <button
              type="button"
              onClick={() => setPreviewDevice('tablet')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                previewDevice === 'tablet'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Tablet View (768px)"
            >
              <Tablet size={14} />
              <span className="hidden md:inline">Tablet</span>
            </button>

            <button
              type="button"
              onClick={() => setPreviewDevice('mobile')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                previewDevice === 'mobile'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Mobile View (375px)"
            >
              <Smartphone size={14} />
              <span className="hidden md:inline">Mobile</span>
            </button>
          </div>
        </div>

        {/* Right: Save Draft | Preview | Publish */}
        <div className="flex items-center gap-2">
          {selectedSectionId && (
            <button
              type="button"
              onClick={() => resetSectionToTemplate(selectedSectionId)}
              className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer border border-slate-700"
              title="Reset active section to default content"
            >
              <RotateCcw size={13} />
              <span>Reset Section</span>
            </button>
          )}

          {/* Save Draft */}
          <button
            type="button"
            onClick={() => saveDraft(false)}
            disabled={isSavingDraft}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700 cursor-pointer disabled:opacity-50"
            title="Save draft to MongoDB"
          >
            {isSavingDraft ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
            <span>Save Draft</span>
          </button>

          {/* Preview Website in new tab */}
          <Link
            to="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700"
            title="Open live public landing page"
          >
            <span>Preview</span>
            <ExternalLink size={13} />
          </Link>

          {/* Quick Switch to Easy Edit */}
          <Link
            to="/admin/easy-edit"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 hover:text-white text-xs font-semibold transition-all border border-indigo-500/40"
            title="Switch to in-page Easy Edit mode"
          >
            <Wand2 size={13} />
            <span>Easy Edit</span>
          </Link>

          {/* Publish Button */}
          <button
            type="button"
            onClick={openPublishModal}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/25 cursor-pointer active:scale-98"
            title="Publish current layout to public site"
          >
            <UploadCloud size={14} />
            <span>Publish</span>
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

export default PreviewToolbar;
