import React from 'react';
import {
  UploadCloud,
  CheckCircle2,
  X,
  Loader2,
  ShieldCheck,
} from 'lucide-react';

export const PublishModal = ({
  isOpen,
  onClose,
  onConfirm,
  isPublishing,
  sectionCount = 7,
  lastPublishedAt,
}) => {
  if (!isOpen) return null;

  const formattedLastPublished = lastPublishedAt
    ? new Date(lastPublishedAt).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : 'Never';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative max-w-md w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center">
              <UploadCloud size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Publish Changes to Live Storefront
              </h3>
              <p className="text-[11px] text-slate-500">
                Synchronize draft layout to public visitors
              </p>
            </div>
          </div>
          <button
            type="button"
            disabled={isPublishing}
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors cursor-pointer disabled:opacity-50"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Homepage Sections:</span>
              <span className="font-bold text-slate-900">{sectionCount} Active Sections</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Target Storefront:</span>
              <span className="font-semibold text-slate-800 font-mono text-[11px]">nova (Production)</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Last Published:</span>
              <span className="text-slate-500">{formattedLastPublished}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 text-xs text-emerald-900 flex items-start gap-2.5">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              Publishing will update the live MongoDB <code className="font-mono bg-emerald-100 px-1 py-0.5 rounded">publishedConfig</code> document. Visitors to the public website will immediately see your newly reordered sections and edited content.
            </p>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <ShieldCheck size={14} className="text-indigo-600 shrink-0" />
            <span>Working draft will remain safely preserved and editable at any time.</span>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <button
            type="button"
            disabled={isPublishing}
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={isPublishing}
            onClick={onConfirm}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/25 cursor-pointer disabled:opacity-50"
          >
            {isPublishing ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Publishing to Storefront...</span>
              </>
            ) : (
              <>
                <UploadCloud size={14} />
                <span>Confirm & Publish Now</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublishModal;
