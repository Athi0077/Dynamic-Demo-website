import React from 'react';
import { ColorPicker } from '../controls/ColorPicker';

export const CTAEditor = ({ config, onChange }) => {
  if (!config) return null;

  const handleUpdate = (field, value) => {
    onChange({ [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Badge */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Badge
        </label>
        <input
          type="text"
          value={config.badge || ''}
          onChange={(e) => handleUpdate('badge', e.target.value)}
          placeholder="Get Started Today"
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
          placeholder="Ready to Explore NOVA?"
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
          placeholder="Experience design purity and uncompromising craftsmanship..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium focus:outline-hidden focus:border-indigo-500 leading-relaxed"
        />
      </div>

      {/* Primary Button */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Primary Action Button
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

      {/* Guarantee Text */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Guarantee / Disclaimer Text
        </label>
        <input
          type="text"
          value={config.guaranteeText || ''}
          onChange={(e) => handleUpdate('guaranteeText', e.target.value)}
          placeholder="30-Day Money-Back Guarantee • Free Global Shipping..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-indigo-500"
        />
      </div>

      {/* Styling */}
      <div className="space-y-4 pt-2 border-t border-slate-200/80">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Section Styling
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <ColorPicker
            label="Card Background"
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
