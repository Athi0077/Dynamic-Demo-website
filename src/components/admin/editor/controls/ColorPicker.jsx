import React from 'react';

const PRESET_SWATCHES = [
  '#0f172a', // Obsidian
  '#4f46e5', // Indigo
  '#059669', // Emerald
  '#d97706', // Amber
  '#e11d48', // Rose
  '#64748b', // Slate
  '#f8fafc', // Light slate
  '#ffffff', // Pure white
];

export const ColorPicker = ({
  label,
  value = '#ffffff',
  onChange,
  hint,
}) => {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          {label}
        </label>
        {hint && <span className="text-[11px] text-slate-400">{hint}</span>}
      </div>

      <div className="flex items-center gap-2">
        {/* Native color picker */}
        <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-slate-300 shadow-2xs shrink-0 cursor-pointer">
          <input
            type="color"
            value={value || '#ffffff'}
            onChange={(e) => onChange(e.target.value)}
            className="absolute -top-2 -left-2 w-14 h-14 cursor-pointer border-0 p-0"
          />
        </div>

        {/* Hex input */}
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#000000"
          className="w-28 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-800 uppercase focus:outline-hidden focus:border-indigo-500"
        />

        {/* Preset palette */}
        <div className="flex items-center gap-1 ml-auto overflow-x-auto py-1">
          {PRESET_SWATCHES.map((hex) => (
            <button
              key={hex}
              type="button"
              onClick={() => onChange(hex)}
              style={{ backgroundColor: hex }}
              className={`w-5 h-5 rounded-full border transition-transform hover:scale-110 cursor-pointer shrink-0 ${
                value?.toLowerCase() === hex.toLowerCase()
                  ? 'border-indigo-600 ring-2 ring-indigo-500/30'
                  : 'border-slate-300'
              }`}
              title={hex}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
