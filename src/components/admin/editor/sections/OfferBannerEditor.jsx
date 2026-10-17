import React from 'react';
import { ColorPicker } from '../controls/ColorPicker';
import { ImageUploader } from '../controls/ImageUploader';

export const OfferBannerEditor = ({ config, onChange }) => {
  if (!config) return null;

  const handleUpdate = (field, value) => {
    onChange({ [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Offer Title
        </label>
        <textarea
          rows={2}
          value={config.title || ''}
          onChange={(e) => handleUpdate('title', e.target.value)}
          placeholder="Special Collection — Up to 40% Off"
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium focus:outline-hidden focus:border-indigo-500 leading-relaxed"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Offer Description
        </label>
        <textarea
          rows={3}
          value={config.description || ''}
          onChange={(e) => handleUpdate('description', e.target.value)}
          placeholder="Upgrade your workspace and daily carry today..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium focus:outline-hidden focus:border-indigo-500 leading-relaxed"
        />
      </div>

      {/* Promo Code & Badge */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Promo Code Badge
          </label>
          <input
            type="text"
            value={config.codeBadge || ''}
            onChange={(e) => handleUpdate('codeBadge', e.target.value)}
            placeholder="CODE: NOVA40"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Badge Text
          </label>
          <input
            type="text"
            value={config.badge || ''}
            onChange={(e) => handleUpdate('badge', e.target.value)}
            placeholder="LIMITED TIME EXCLUSIVE"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
          />
        </div>
      </div>

      {/* Button Settings */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Offer Button
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
            label="Button Color"
            value={config.buttonColor || '#ffffff'}
            onChange={(val) => handleUpdate('buttonColor', val)}
          />
          <ColorPicker
            label="Button Text"
            value={config.buttonTextColor || '#0f172a'}
            onChange={(val) => handleUpdate('buttonTextColor', val)}
          />
        </div>
      </div>

      {/* Optional Banner Image */}
      <ImageUploader
        label="Background / Banner Image (Optional)"
        currentImage={config.bannerImage}
        onImageChange={(url) => handleUpdate('bannerImage', url)}
        aspectRatio="aspect-21/9"
      />

      {/* Colors */}
      <div className="space-y-4 pt-2 border-t border-slate-200/80">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Banner Styling
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <ColorPicker
            label="Background Color"
            value={config.backgroundColor || '#0f172a'}
            onChange={(val) => handleUpdate('backgroundColor', val)}
          />
          <ColorPicker
            label="Text Color"
            value={config.textColor || '#ffffff'}
            onChange={(val) => handleUpdate('textColor', val)}
          />
        </div>
      </div>
    </div>
  );
};
