import React from 'react';
import { ColorPicker } from './ColorPicker';
import { AlignLeft, AlignCenter, AlignRight, Maximize2, MoveHorizontal, Minimize2 } from 'lucide-react';

export const SectionLayoutSettings = ({ settings = {}, onSettingsChange }) => {
  const handleUpdate = (field, value) => {
    onSettingsChange({ [field]: value });
  };

  return (
    <div className="space-y-4 pt-2 border-t border-slate-200">
      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
        Layout & Spacing Settings
      </h4>

      {/* Content Width (Full / Medium / Narrow) */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          Content Width
        </label>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => handleUpdate('contentWidth', 'narrow')}
            className={`flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              settings.contentWidth === 'narrow'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Minimize2 size={13} />
            <span>Narrow</span>
          </button>

          <button
            type="button"
            onClick={() => handleUpdate('contentWidth', 'medium')}
            className={`flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              settings.contentWidth === 'medium' || !settings.contentWidth
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <MoveHorizontal size={13} />
            <span>Medium</span>
          </button>

          <button
            type="button"
            onClick={() => handleUpdate('contentWidth', 'full')}
            className={`flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              settings.contentWidth === 'full'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Maximize2 size={13} />
            <span>Full</span>
          </button>
        </div>
      </div>

      {/* Section Spacing (Small / Medium / Large) */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          Vertical Spacing
        </label>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => handleUpdate('spacing', 'small')}
            className={`py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              settings.spacing === 'small'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Small
          </button>

          <button
            type="button"
            onClick={() => handleUpdate('spacing', 'medium')}
            className={`py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              settings.spacing === 'medium' || !settings.spacing
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Medium
          </button>

          <button
            type="button"
            onClick={() => handleUpdate('spacing', 'large')}
            className={`py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              settings.spacing === 'large'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Large
          </button>
        </div>
      </div>

      {/* Text Alignment */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          Text Alignment
        </label>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => handleUpdate('alignment', 'left')}
            className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              settings.alignment === 'left' || !settings.alignment
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <AlignLeft size={13} />
            <span>Left</span>
          </button>

          <button
            type="button"
            onClick={() => handleUpdate('alignment', 'center')}
            className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              settings.alignment === 'center'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <AlignCenter size={13} />
            <span>Center</span>
          </button>

          <button
            type="button"
            onClick={() => handleUpdate('alignment', 'right')}
            className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              settings.alignment === 'right'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <AlignRight size={13} />
            <span>Right</span>
          </button>
        </div>
      </div>

      {/* Section Background & Text Color */}
      <div className="grid grid-cols-2 gap-4 pt-2">
        <ColorPicker
          label="Background Color"
          value={settings.backgroundColor || '#ffffff'}
          onChange={(val) => handleUpdate('backgroundColor', val)}
        />
        <ColorPicker
          label="Text Color"
          value={settings.textColor || '#0f172a'}
          onChange={(val) => handleUpdate('textColor', val)}
        />
      </div>
    </div>
  );
};
