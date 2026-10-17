import React from 'react';
import { ImageUploader } from '../controls/ImageUploader';
import { ColorPicker } from '../controls/ColorPicker';
import { TypographyEditor } from '../controls/TypographyEditor';
import { PanelLeft, PanelRight } from 'lucide-react';

export const ImageTextEditor = ({ config, onChange }) => {
  if (!config) return null;

  const handleUpdate = (field, value) => {
    onChange({ [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Badge / Tagline */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Badge
        </label>
        <input
          type="text"
          value={config.badge || ''}
          onChange={(e) => handleUpdate('badge', e.target.value)}
          placeholder="The NOVA Standard"
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium focus:outline-hidden focus:border-indigo-500"
        />
      </div>

      {/* Heading */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Heading
        </label>
        <textarea
          rows={2}
          value={config.title || ''}
          onChange={(e) => handleUpdate('title', e.target.value)}
          placeholder="Sculpted with Precision. Crafted for Everyday Life."
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
          placeholder="We believe everyday objects should inspire you..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium focus:outline-hidden focus:border-indigo-500 leading-relaxed"
        />
      </div>

      {/* Image Position Toggle: Left vs Right */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          Image Position
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleUpdate('imagePosition', 'left')}
            className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              config.imagePosition === 'left'
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <PanelLeft size={16} />
            <span>Image on Left</span>
          </button>

          <button
            type="button"
            onClick={() => handleUpdate('imagePosition', 'right')}
            className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              config.imagePosition === 'right'
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <PanelRight size={16} />
            <span>Image on Right</span>
          </button>
        </div>
      </div>

      {/* Feature Image with Cloudinary Upload */}
      <ImageUploader
        label="Feature Image (Cloudinary)"
        currentImage={config.image}
        onImageChange={(url) => handleUpdate('image', url)}
        aspectRatio="aspect-4/3"
      />

      {/* Button Settings */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Call-To-Action Button
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Button Text
            </label>
            <input
              type="text"
              value={config.buttonText || ''}
              onChange={(e) => handleUpdate('buttonText', e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Button Link
            </label>
            <input
              type="text"
              value={config.buttonLink || ''}
              onChange={(e) => handleUpdate('buttonLink', e.target.value)}
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

      {/* Colors & Typography */}
      <div className="space-y-4 pt-2 border-t border-slate-200/80">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Section Styling
        </h4>

        <div className="grid grid-cols-2 gap-4">
          <ColorPicker
            label="Background Color"
            value={config.backgroundColor || '#ffffff'}
            onChange={(val) => handleUpdate('backgroundColor', val)}
          />
          <ColorPicker
            label="Text Color"
            value={config.textColor || '#0f172a'}
            onChange={(val) => handleUpdate('textColor', val)}
          />
        </div>

        <TypographyEditor
          headingFontSize={config.headingFontSize || 36}
          onHeadingSizeChange={(val) => handleUpdate('headingFontSize', val)}
          descriptionFontSize={config.descriptionFontSize || 16}
          onDescriptionSizeChange={(val) => handleUpdate('descriptionFontSize', val)}
        />
      </div>
    </div>
  );
};
