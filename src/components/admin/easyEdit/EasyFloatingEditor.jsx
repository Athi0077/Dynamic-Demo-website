import React, { useState } from 'react';
import {
  X,
  Type,
  Palette,
  Image as ImageIcon,
  Check,
  RotateCcw,
  Upload,
  Loader2,
  Sparkles,
  ArrowUp,
  ArrowDown,
  UploadCloud,
  Save,
  FolderOpen,
  CloudLightning,
} from 'lucide-react';
import { useWebsite } from '../../../context/WebsiteContext';
import { uploadImageToCloudinary, validateImageFile } from '../../../utils/cloudinary';
import { ColorPicker } from '../editor/controls/ColorPicker';
import { MediaPickerModal } from '../editor/controls/MediaPickerModal';

export const EasyFloatingEditor = ({
  section,
  onClose,
  index,
  totalSections,
}) => {
  const {
    updateSectionContent,
    updateSectionSettings,
    resetSectionToTemplate,
    reorderSections,
    sections,
    saveDraft,
    publishWebsite,
    isSavingDraft,
    isPublishing,
    hasUnsavedChanges,
  } = useWebsite();

  const [activeTab, setActiveTab] = useState('text'); // 'text' | 'style' | 'image'
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [directImageUrl, setDirectImageUrl] = useState('');
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  if (!section) return null;

  const content = section.content || {};
  const settings = section.settings || {};

  const handleContentUpdate = (fields) => {
    updateSectionContent(section.id, fields);
  };

  const handleSettingsUpdate = (fields) => {
    updateSectionSettings(section.id, fields);
  };

  const applyImageChange = (url) => {
    if (content.bannerImage !== undefined) {
      handleContentUpdate({ bannerImage: url });
    } else {
      handleContentUpdate({ image: url });
    }
  };

  // Move container up
  const handleMoveUp = () => {
    if (index === 0) return;
    const newOrder = [...sections];
    const temp = newOrder[index];
    newOrder[index] = newOrder[index - 1];
    newOrder[index - 1] = temp;
    reorderSections(newOrder);
  };

  // Move container down
  const handleMoveDown = () => {
    if (index === totalSections - 1) return;
    const newOrder = [...sections];
    const temp = newOrder[index];
    newOrder[index] = newOrder[index + 1];
    newOrder[index + 1] = temp;
    reorderSections(newOrder);
  };

  // Image Upload handler
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError('');
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setUploadError(validation.error);
      return;
    }

    setIsUploading(true);
    try {
      const res = await uploadImageToCloudinary(file, null, {
        category: section.type === 'hero' ? 'Hero' : section.type === 'offer-banner' ? 'Banners' : 'General',
      });
      if (res.success && res.url) {
        applyImageChange(res.url);
      } else {
        setUploadError(res.error || 'Failed to upload image.');
      }
    } catch (err) {
      setUploadError(err.message || 'Error uploading image.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleApplyDirectUrl = (e) => {
    e.preventDefault();
    if (directImageUrl.trim()) {
      applyImageChange(directImageUrl.trim());
      setDirectImageUrl('');
    }
  };

  const handleSelectFromLibrary = (url) => {
    applyImageChange(url);
  };

  const hasImage = Boolean(
    content.image !== undefined ||
    content.bannerImage !== undefined ||
    section.type === 'hero' ||
    section.type === 'image-text' ||
    section.type === 'offer-banner' ||
    section.type === 'image'
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col max-h-[85vh] animate-in slide-in-from-bottom duration-200">
      {/* Editor Modal Header */}
      <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
            <Sparkles size={14} />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-extrabold text-white truncate">
              {section.name}
            </h3>
            <p className="text-[10px] text-slate-400 capitalize">
              Easy Editor • Section #{index + 1}
            </p>
          </div>
        </div>

        {/* Header Controls: Reorder Up/Down, Reset, Close */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={index === 0}
            onClick={handleMoveUp}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Move container up"
          >
            <ArrowUp size={13} />
          </button>

          <button
            type="button"
            disabled={index === totalSections - 1}
            onClick={handleMoveDown}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Move container down"
          >
            <ArrowDown size={13} />
          </button>

          <button
            type="button"
            onClick={() => resetSectionToTemplate(section.id)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Reset to template defaults"
          >
            <RotateCcw size={13} />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors cursor-pointer ml-1"
            title="Close editor"
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {/* Navigation Tabs: Text / Style / Image */}
      <div className="flex bg-slate-100 p-1 border-b border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab('text')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'text'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Type size={14} />
          <span>Texts</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('style')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'style'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Palette size={14} />
          <span>Colors & Style</span>
        </button>

        {hasImage && (
          <button
            type="button"
            onClick={() => setActiveTab('image')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'image'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <ImageIcon size={14} />
            <span>Image</span>
          </button>
        )}
      </div>

      {/* Tab Body Content */}
      <div className="p-5 overflow-y-auto space-y-4 flex-1">
        {/* TAB 1: TEXTS & CONTENT */}
        {activeTab === 'text' && (
          <div className="space-y-4">
            {/* Badge Text (if applicable) */}
            {content.badge !== undefined && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Top Badge / Eyebrow Text
                </label>
                <input
                  type="text"
                  value={content.badge || ''}
                  onChange={(e) => handleContentUpdate({ badge: e.target.value })}
                  placeholder="e.g. New Season 2026 Collection"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-hidden focus:border-indigo-500"
                />
              </div>
            )}

            {/* Headline / Title */}
            {(content.headline !== undefined || content.title !== undefined) && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Main Headline / Title
                </label>
                <input
                  type="text"
                  value={content.headline !== undefined ? content.headline : (content.title || '')}
                  onChange={(e) =>
                    content.headline !== undefined
                      ? handleContentUpdate({ headline: e.target.value })
                      : handleContentUpdate({ title: e.target.value })
                  }
                  placeholder="Enter section headline..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-hidden focus:border-indigo-500"
                />
              </div>
            )}

            {/* Description / Subtitle */}
            {(content.description !== undefined || content.subtitle !== undefined) && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Description / Subtitle
                </label>
                <textarea
                  rows={3}
                  value={content.description !== undefined ? content.description : (content.subtitle || '')}
                  onChange={(e) =>
                    content.description !== undefined
                      ? handleContentUpdate({ description: e.target.value })
                      : handleContentUpdate({ subtitle: e.target.value })
                  }
                  placeholder="Enter supporting paragraph text..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-hidden focus:border-indigo-500 resize-none"
                />
              </div>
            )}

            {/* Primary CTA Button Text & Link */}
            {content.primaryCta && (
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={content.primaryCta.text || ''}
                    onChange={(e) =>
                      handleContentUpdate({
                        primaryCta: { ...content.primaryCta, text: e.target.value },
                      })
                    }
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Button Link
                  </label>
                  <input
                    type="text"
                    value={content.primaryCta.href || ''}
                    onChange={(e) =>
                      handleContentUpdate({
                        primaryCta: { ...content.primaryCta, href: e.target.value },
                      })
                    }
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800"
                  />
                </div>
              </div>
            )}

            {/* General Button Text & Link (Image+Text, Offer Banner, CTA) */}
            {content.buttonText !== undefined && (
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={content.buttonText || ''}
                    onChange={(e) => handleContentUpdate({ buttonText: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Button Link
                  </label>
                  <input
                    type="text"
                    value={content.buttonLink || ''}
                    onChange={(e) => handleContentUpdate({ buttonLink: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800"
                  />
                </div>
              </div>
            )}

            {/* Offer Banner Coupon Code */}
            {content.codeBadge !== undefined && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Coupon / Promo Code
                </label>
                <input
                  type="text"
                  value={content.codeBadge || ''}
                  onChange={(e) => handleContentUpdate({ codeBadge: e.target.value })}
                  placeholder="e.g. CODE: NOVA40"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-indigo-700"
                />
              </div>
            )}
          </div>
        )}

        {/* TAB 2: COLORS, FONT SIZES & SPACING */}
        {activeTab === 'style' && (
          <div className="space-y-4">
            {/* Background Color & Text Color Pickers */}
            <div className="grid grid-cols-2 gap-3">
              <ColorPicker
                label="Background"
                color={settings.backgroundColor || '#ffffff'}
                onChange={(c) => handleSettingsUpdate({ backgroundColor: c })}
              />

              <ColorPicker
                label="Text Color"
                color={settings.textColor || '#0f172a'}
                onChange={(c) => handleSettingsUpdate({ textColor: c })}
              />
            </div>

            {/* Button Background & Button Text Color */}
            {(settings.buttonBgColor !== undefined || settings.buttonColor !== undefined) && (
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                <ColorPicker
                  label="Button Color"
                  color={settings.buttonBgColor || settings.buttonColor || '#0f172a'}
                  onChange={(c) =>
                    settings.buttonBgColor !== undefined
                      ? handleSettingsUpdate({ buttonBgColor: c })
                      : handleSettingsUpdate({ buttonColor: c })
                  }
                />

                <ColorPicker
                  label="Button Text"
                  color={settings.buttonTextColor || '#ffffff'}
                  onChange={(c) => handleSettingsUpdate({ buttonTextColor: c })}
                />
              </div>
            )}

            {/* Heading Font Size Slider */}
            {settings.headingFontSize !== undefined && (
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
                  <span>Headline Size</span>
                  <span className="font-mono text-indigo-600">{settings.headingFontSize}px</span>
                </div>
                <input
                  type="range"
                  min="24"
                  max="72"
                  value={settings.headingFontSize || 48}
                  onChange={(e) =>
                    handleSettingsUpdate({ headingFontSize: Number(e.target.value) })
                  }
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>
            )}

            {/* Description Font Size Slider */}
            {settings.descriptionFontSize !== undefined && (
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
                  <span>Description Size</span>
                  <span className="font-mono text-indigo-600">{settings.descriptionFontSize}px</span>
                </div>
                <input
                  type="range"
                  min="13"
                  max="22"
                  value={settings.descriptionFontSize || 16}
                  onChange={(e) =>
                    handleSettingsUpdate({ descriptionFontSize: Number(e.target.value) })
                  }
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>
            )}

            {/* Vertical Padding / Height Slider */}
            {settings.sectionHeight !== undefined && (
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
                  <span>Section Padding</span>
                  <span className="font-mono text-indigo-600">{settings.sectionHeight}px</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="160"
                  step="10"
                  value={settings.sectionHeight || 100}
                  onChange={(e) =>
                    handleSettingsUpdate({ sectionHeight: Number(e.target.value) })
                  }
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>
            )}

            {/* Text Alignment */}
            {settings.alignment !== undefined && (
              <div className="pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Text Alignment
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['left', 'center', 'right'].map((align) => (
                    <button
                      key={align}
                      type="button"
                      onClick={() => handleSettingsUpdate({ alignment: align })}
                      className={`py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                        settings.alignment === align
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {align}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: IMAGE REPLACEMENT */}
        {activeTab === 'image' && (
          <div className="space-y-4">
            {/* Current Image Preview */}
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner relative group">
              {content.image || content.bannerImage ? (
                <img
                  src={content.image || content.bannerImage}
                  alt="Section visual"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-4">
                  <ImageIcon size={28} className="mb-1" />
                  <span className="text-xs">No image set</span>
                </div>
              )}

              {isUploading && (
                <div className="absolute inset-0 bg-slate-900/75 flex flex-col items-center justify-center text-white">
                  <Loader2 size={24} className="animate-spin text-indigo-400 mb-1" />
                  <span className="text-xs font-bold">Uploading image...</span>
                </div>
              )}
            </div>

            {uploadError && (
              <p className="text-xs text-rose-600 bg-rose-50 p-2 rounded-xl">
                {uploadError}
              </p>
            )}

            {/* Upload & Library Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer text-center">
                <Upload size={13} />
                <span>Upload File</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={() => setIsPickerOpen(true)}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 text-xs font-bold transition-all cursor-pointer"
              >
                <FolderOpen size={13} />
                <span>Media Library</span>
              </button>
            </div>

            {/* Or Paste Direct URL */}
            <form onSubmit={handleApplyDirectUrl} className="flex gap-2 pt-2 border-t border-slate-100">
              <input
                type="url"
                value={directImageUrl}
                onChange={(e) => setDirectImageUrl(e.target.value)}
                placeholder="Paste image URL https://..."
                className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>

            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 pt-1">
              <CloudLightning size={12} className="text-indigo-500 shrink-0" />
              <span>Cloudinary CDN & MongoDB Auto-Sync Active</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions: Save Draft & Publish */}
      <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2.5">
        <div className="text-[11px]">
          {isSavingDraft ? (
            <span className="text-indigo-600 font-semibold flex items-center gap-1">
              <Loader2 size={11} className="animate-spin" />
              <span>Saving...</span>
            </span>
          ) : hasUnsavedChanges ? (
            <span className="text-amber-600 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span>Auto-saving draft</span>
            </span>
          ) : (
            <span className="text-emerald-600 font-semibold flex items-center gap-1">
              <Check size={12} />
              <span>Draft saved</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => saveDraft(false)}
            disabled={isSavingDraft}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
            title="Save draft to MongoDB"
          >
            <Save size={13} />
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            onClick={publishWebsite}
            disabled={isPublishing}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-sm cursor-pointer disabled:opacity-50"
            title="Publish changes live"
          >
            <UploadCloud size={13} />
            <span>Publish</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>

      {/* Media Library Picker Modal */}
      <MediaPickerModal
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        onSelectImage={handleSelectFromLibrary}
        currentImage={content.image || content.bannerImage}
      />
    </div>
  );
};

export default EasyFloatingEditor;
