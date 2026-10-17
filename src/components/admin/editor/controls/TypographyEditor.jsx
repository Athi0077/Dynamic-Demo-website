import React from 'react';
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { ColorPicker } from './ColorPicker';

export const TypographyEditor = ({
  headingFontSize = 48,
  onHeadingSizeChange,
  descriptionFontSize = 16,
  onDescriptionSizeChange,
  alignment = 'left',
  onAlignmentChange,
  textColor = '#0f172a',
  onTextColorChange,
}) => {
  return (
    <div className="space-y-4 pt-2">
      {/* Heading Font Size Slider */}
      {onHeadingSizeChange && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <label className="font-bold text-slate-700 uppercase tracking-wider">
              Heading Font Size
            </label>
            <span className="font-mono text-slate-500 font-semibold">{headingFontSize}px</span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="24"
              max="72"
              value={headingFontSize}
              onChange={(e) => onHeadingSizeChange(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <input
              type="number"
              min="24"
              max="72"
              value={headingFontSize}
              onChange={(e) => onHeadingSizeChange(Number(e.target.value))}
              className="w-14 px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold text-center text-slate-800"
            />
          </div>
        </div>
      )}

      {/* Description Font Size Slider */}
      {onDescriptionSizeChange && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <label className="font-bold text-slate-700 uppercase tracking-wider">
              Description Font Size
            </label>
            <span className="font-mono text-slate-500 font-semibold">{descriptionFontSize}px</span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="12"
              max="24"
              value={descriptionFontSize}
              onChange={(e) => onDescriptionSizeChange(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <input
              type="number"
              min="12"
              max="24"
              value={descriptionFontSize}
              onChange={(e) => onDescriptionSizeChange(Number(e.target.value))}
              className="w-14 px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold text-center text-slate-800"
            />
          </div>
        </div>
      )}

      {/* Alignment Selector */}
      {onAlignmentChange && (
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Text Alignment
          </label>
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              onClick={() => onAlignmentChange('left')}
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                alignment === 'left'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <AlignLeft size={14} />
              <span>Left</span>
            </button>
            <button
              type="button"
              onClick={() => onAlignmentChange('center')}
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                alignment === 'center'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <AlignCenter size={14} />
              <span>Center</span>
            </button>
            <button
              type="button"
              onClick={() => onAlignmentChange('right')}
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                alignment === 'right'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <AlignRight size={14} />
              <span>Right</span>
            </button>
          </div>
        </div>
      )}

      {/* Text Color */}
      {onTextColorChange && (
        <ColorPicker
          label="Text Color"
          value={textColor}
          onChange={onTextColorChange}
        />
      )}
    </div>
  );
};
