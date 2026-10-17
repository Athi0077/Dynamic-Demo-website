import React from 'react';
import { ImageUploader } from '../controls/ImageUploader';
import { ColorPicker } from '../controls/ColorPicker';
import { TypographyEditor } from '../controls/TypographyEditor';

export const HeroEditor = ({ config, onChange }) => {
  if (!config) return null;

  const handleUpdate = (field, value) => {
    onChange({ [field]: value });
  };

  const handleNestedUpdate = (parentField, childField, value) => {
    onChange({
      [parentField]: {
        ...config[parentField],
        [childField]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Badge / Tagline */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Badge / Tagline
        </label>
        <input
          type="text"
          value={config.badge || ''}
          onChange={(e) => handleUpdate('badge', e.target.value)}
          placeholder="New Season 2026 Collection"
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium focus:outline-hidden focus:border-indigo-500"
        />
      </div>

      {/* Heading */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Headline
        </label>
        <textarea
          rows={2}
          value={config.headline || ''}
          onChange={(e) => handleUpdate('headline', e.target.value)}
          placeholder="Curated Elegance for the Modern Lifestyle."
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium focus:outline-hidden focus:border-indigo-500 leading-relaxed"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Description
        </label>
        <textarea
          rows={3}
          value={config.description || ''}
          onChange={(e) => handleUpdate('description', e.target.value)}
          placeholder="Discover thoughtfully engineered essentials..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium focus:outline-hidden focus:border-indigo-500 leading-relaxed"
        />
      </div>

      {/* Hero Image with Cloudinary Upload */}
      <ImageUploader
        label="Hero Showcase Image"
        currentImage={config.image}
        onImageChange={(url) => handleUpdate('image', url)}
        aspectRatio="aspect-4/3"
      />

      {/* Primary CTA Button */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Primary Button
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Button Text
            </label>
            <input
              type="text"
              value={config.primaryCta?.text || ''}
              onChange={(e) => handleNestedUpdate('primaryCta', 'text', e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Button Link
            </label>
            <input
              type="text"
              value={config.primaryCta?.href || ''}
              onChange={(e) => handleNestedUpdate('primaryCta', 'href', e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <ColorPicker
            label="Button BG"
            value={config.buttonBgColor || '#0f172a'}
            onChange={(val) => handleUpdate('buttonBgColor', val)}
          />
          <ColorPicker
            label="Button Text"
            value={config.buttonTextColor || '#ffffff'}
            onChange={(val) => handleUpdate('buttonTextColor', val)}
          />
        </div>
      </div>

      {/* Colors & Appearance */}
      <div className="space-y-4 pt-2 border-t border-slate-200/80">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Styling & Typography
        </h4>

        <div className="grid grid-cols-2 gap-4">
          <ColorPicker
            label="Section Background"
            value={config.backgroundColor || '#fafafa'}
            onChange={(val) => handleUpdate('backgroundColor', val)}
          />
          <ColorPicker
            label="Text Color"
            value={config.textColor || '#0f172a'}
            onChange={(val) => handleUpdate('textColor', val)}
          />
        </div>

        <TypographyEditor
          headingFontSize={config.headingFontSize || 56}
          onHeadingSizeChange={(val) => handleUpdate('headingFontSize', val)}
          descriptionFontSize={config.descriptionFontSize || 18}
          onDescriptionSizeChange={(val) => handleUpdate('descriptionFontSize', val)}
          alignment={config.alignment || 'left'}
          onAlignmentChange={(val) => handleUpdate('alignment', val)}
        />

        {/* Section Height / Padding */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <label className="font-bold text-slate-700 uppercase tracking-wider">
              Vertical Padding (Height)
            </label>
            <span className="font-mono text-slate-500 font-semibold">
              {config.sectionHeight || 110}px
            </span>
          </div>
          <input
            type="range"
            min="60"
            max="180"
            value={config.sectionHeight || 110}
            onChange={(e) => handleUpdate('sectionHeight', Number(e.target.value))}
            className="w-full accent-indigo-600 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
