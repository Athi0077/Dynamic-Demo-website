import React, { useState } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import { PreviewToolbar } from '../../components/admin/editor/PreviewToolbar';
import { SectionSelector } from '../../components/admin/editor/SectionSelector';
import { EditorPanel } from '../../components/admin/editor/EditorPanel';
import { LivePreview } from '../../components/admin/editor/LivePreview';
import { CheckCircle2, Layers, Edit, Eye } from 'lucide-react';

export const WebsiteEditor = () => {
  const { sections, toastMessage } = useWebsite();

  // Selected section state
  const [selectedSectionId, setSelectedSectionId] = useState(() => {
    return sections[0]?.id || 'hero-1';
  });
  const [previewDevice, setPreviewDevice] = useState('desktop');
  const [mobileTab, setMobileTab] = useState('sections'); // 'sections' | 'preview' | 'editor'

  // Ensure selectedSection points to a valid section in the list
  const selectedSection =
    sections.find((s) => s.id === selectedSectionId) || sections[0] || null;

  const handleSelectSection = (id) => {
    setSelectedSectionId(id);
    if (window.innerWidth < 1024) {
      setMobileTab('editor');
    }

    // Scroll to the selected section in the live preview
    const elem = document.getElementById(`preview-section-${id}`);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-900 overflow-hidden font-sans select-none">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 text-xs font-semibold animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. TOP BUILDER TOOLBAR */}
      <PreviewToolbar
        previewDevice={previewDevice}
        setPreviewDevice={setPreviewDevice}
        selectedSectionId={selectedSection?.id}
      />

      {/* Mobile Screen Tab Navigation (< 1024px) */}
      <div className="lg:hidden bg-slate-800 border-b border-slate-700 px-4 py-2 flex items-center justify-around text-xs font-bold text-slate-300">
        <button
          type="button"
          onClick={() => setMobileTab('sections')}
          className={`flex items-center gap-1.5 py-1 px-3 rounded-lg ${
            mobileTab === 'sections' ? 'bg-indigo-600 text-white' : ''
          }`}
        >
          <Layers size={14} />
          <span>Sections ({sections.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setMobileTab('preview')}
          className={`flex items-center gap-1.5 py-1 px-3 rounded-lg ${
            mobileTab === 'preview' ? 'bg-indigo-600 text-white' : ''
          }`}
        >
          <Eye size={14} />
          <span>Preview</span>
        </button>

        <button
          type="button"
          onClick={() => setMobileTab('editor')}
          className={`flex items-center gap-1.5 py-1 px-3 rounded-lg ${
            mobileTab === 'editor' ? 'bg-indigo-600 text-white' : ''
          }`}
        >
          <Edit size={14} />
          <span>Editor</span>
        </button>
      </div>

      {/* 2. THREE-COLUMN BUILDER WORKSPACE */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Column: Sortable Sections Builder Tree */}
        <div
          className={`${
            mobileTab === 'sections' ? 'flex' : 'hidden'
          } lg:flex h-full`}
        >
          <SectionSelector
            selectedSectionId={selectedSection?.id}
            onSelectSection={handleSelectSection}
          />
        </div>

        {/* Center Column: Live Website Preview Frame */}
        <div
          className={`${
            mobileTab === 'preview' ? 'flex' : 'hidden'
          } lg:flex flex-1 h-full min-w-0 overflow-hidden`}
        >
          <LivePreview
            previewDevice={previewDevice}
            selectedSectionId={selectedSection?.id}
            onSelectSection={handleSelectSection}
          />
        </div>

        {/* Right Column: Section Content & Settings Editor Panel */}
        <div
          className={`${
            mobileTab === 'editor' ? 'flex' : 'hidden'
          } lg:flex h-full`}
        >
          <EditorPanel
            selectedSection={selectedSection}
            onClose={() => setMobileTab('preview')}
          />
        </div>
      </div>
    </div>
  );
};

export default WebsiteEditor;
