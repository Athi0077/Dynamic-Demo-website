import React, { useState } from 'react';
import { RotateCcw, X, Edit3, Sliders, Type, Save, UploadCloud, Loader2, Check } from 'lucide-react';
import { useWebsite } from '../../../context/WebsiteContext';
import { SectionLayoutSettings } from './controls/SectionLayoutSettings';

// Section Editors
import { HeroEditor } from './sections/HeroEditor';
import { ProductEditor } from './sections/ProductEditor';
import { ImageTextEditor } from './sections/ImageTextEditor';
import { OfferBannerEditor } from './sections/OfferBannerEditor';
import { FeaturedProductsEditor } from './sections/FeaturedProductsEditor';
import { TestimonialsEditor } from './sections/TestimonialsEditor';
import { CTAEditor } from './sections/CTAEditor';
import { TextSectionEditor } from './sections/TextSectionEditor';
import { ImageSectionEditor } from './sections/ImageSectionEditor';
import { VideoSectionEditor } from './sections/VideoSectionEditor';
import { GallerySectionEditor } from './sections/GallerySectionEditor';
import { FAQSectionEditor } from './sections/FAQSectionEditor';
import { ContactSectionEditor } from './sections/ContactSectionEditor';

export const EditorPanel = ({
  selectedSection,
  onClose,
}) => {
  const {
    updateSectionContent,
    updateSectionSettings,
    updateProductItem,
    updateTestimonialItem,
    resetSectionToTemplate,
    saveDraft,
    publishWebsite,
    isSavingDraft,
    isPublishing,
    hasUnsavedChanges,
  } = useWebsite();

  const [activeTab, setActiveTab] = useState('content'); // 'content' | 'settings'

  if (!selectedSection) {
    return (
      <div className="h-full w-84 lg:w-96 bg-white border-l border-slate-200 p-6 flex flex-col items-center justify-center text-center text-slate-400">
        <Edit3 size={32} className="text-slate-300 mb-3" />
        <h3 className="text-sm font-bold text-slate-700">No Section Selected</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-xs">
          Select a section from the builder list on the left or click directly on any section in the live preview to begin editing.
        </p>
      </div>
    );
  }

  const content = selectedSection.content || {};
  const settings = selectedSection.settings || {};

  const handleContentChange = (partial) => {
    updateSectionContent(selectedSection.id, partial);
  };

  const handleSettingsChange = (partial) => {
    updateSectionSettings(selectedSection.id, partial);
  };

  return (
    <div className="h-full w-84 lg:w-96 bg-white border-l border-slate-200 flex flex-col shrink-0 overflow-hidden shadow-sm">
      {/* Panel Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="min-w-0 pr-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
            Editing {selectedSection.type}
          </span>
          <h3 className="text-sm font-black text-slate-900 mt-1 truncate">
            {selectedSection.name}
          </h3>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => resetSectionToTemplate(selectedSection.id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
            title="Reset this section to default"
          >
            <RotateCcw size={15} />
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
              title="Close panel"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Tab Switcher: Content vs Settings */}
      <div className="flex border-b border-slate-200 bg-slate-100/60 p-1">
        <button
          type="button"
          onClick={() => setActiveTab('content')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'content'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Type size={13} />
          <span>Content</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('settings')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'settings'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sliders size={13} />
          <span>Settings</span>
        </button>
      </div>

      {/* Editor Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
        {activeTab === 'settings' ? (
          <SectionLayoutSettings
            settings={settings}
            onSettingsChange={handleSettingsChange}
          />
        ) : (
          <>
            {selectedSection.type === 'hero' && (
              <HeroEditor
                config={{ ...content, ...settings }}
                onChange={(newVals) => {
                  handleContentChange(newVals);
                  handleSettingsChange(newVals);
                }}
              />
            )}

            {selectedSection.type === 'products' && (
              <ProductEditor
                config={{ ...content, ...settings }}
                onChange={(newVals) => {
                  handleContentChange(newVals);
                  handleSettingsChange(newVals);
                }}
                onProductChange={(productId, fields) =>
                  updateProductItem(selectedSection.id, productId, fields)
                }
              />
            )}

            {selectedSection.type === 'image-text' && (
              <ImageTextEditor
                config={{ ...content, ...settings }}
                onChange={(newVals) => {
                  handleContentChange(newVals);
                  handleSettingsChange(newVals);
                }}
              />
            )}

            {selectedSection.type === 'offer-banner' && (
              <OfferBannerEditor
                config={{ ...content, ...settings }}
                onChange={(newVals) => {
                  handleContentChange(newVals);
                  handleSettingsChange(newVals);
                }}
              />
            )}

            {selectedSection.type === 'featured' && (
              <FeaturedProductsEditor
                config={{ ...content, ...settings }}
                onChange={(newVals) => {
                  handleContentChange(newVals);
                  handleSettingsChange(newVals);
                }}
                onProductChange={(productId, fields) =>
                  updateProductItem(selectedSection.id, productId, fields)
                }
              />
            )}

            {selectedSection.type === 'testimonials' && (
              <TestimonialsEditor
                config={{ ...content, ...settings }}
                onChange={(newVals) => {
                  handleContentChange(newVals);
                  handleSettingsChange(newVals);
                }}
                onTestimonialChange={(testimonialId, fields) =>
                  updateTestimonialItem(selectedSection.id, testimonialId, fields)
                }
              />
            )}

            {selectedSection.type === 'cta' && (
              <CTAEditor
                config={{ ...content, ...settings }}
                onChange={(newVals) => {
                  handleContentChange(newVals);
                  handleSettingsChange(newVals);
                }}
              />
            )}

            {selectedSection.type === 'text' && (
              <TextSectionEditor
                content={content}
                settings={settings}
                onContentChange={handleContentChange}
                onSettingsChange={handleSettingsChange}
              />
            )}

            {selectedSection.type === 'image' && (
              <ImageSectionEditor
                content={content}
                onContentChange={handleContentChange}
              />
            )}

            {selectedSection.type === 'video' && (
              <VideoSectionEditor
                content={content}
                onContentChange={handleContentChange}
              />
            )}

            {selectedSection.type === 'gallery' && (
              <GallerySectionEditor
                content={content}
                onContentChange={handleContentChange}
              />
            )}

            {selectedSection.type === 'faq' && (
              <FAQSectionEditor
                content={content}
                onContentChange={handleContentChange}
              />
            )}

            {selectedSection.type === 'contact' && (
              <ContactSectionEditor
                content={content}
                onContentChange={handleContentChange}
              />
            )}
          </>
        )}
      </div>

      {/* Bottom Save & Publish Action Footer */}
      <div className="p-3.5 bg-slate-50 border-t border-slate-200 shrink-0 space-y-2">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-slate-500 font-medium">Status:</span>
          {isSavingDraft ? (
            <span className="text-indigo-600 font-semibold flex items-center gap-1">
              <Loader2 size={11} className="animate-spin" />
              <span>Saving draft...</span>
            </span>
          ) : hasUnsavedChanges ? (
            <span className="text-amber-600 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span>Unsaved changes (auto-saving)</span>
            </span>
          ) : (
            <span className="text-emerald-600 font-semibold flex items-center gap-1">
              <Check size={12} />
              <span>Draft auto-saved</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => saveDraft(false)}
            disabled={isSavingDraft}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50"
            title="Save draft to MongoDB"
          >
            {isSavingDraft ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            onClick={publishWebsite}
            disabled={isPublishing}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20 cursor-pointer disabled:opacity-50"
            title="Publish changes to live storefront"
          >
            <UploadCloud size={14} />
            <span>Publish Live</span>
          </button>
        </div>
      </div>
    </div>
  );
};
