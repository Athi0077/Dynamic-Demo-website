import React from 'react';
import { Edit3, EyeOff } from 'lucide-react';

export const PreviewSectionWrapper = ({
  section,
  isSelected,
  onSelect,
  children,
}) => {
  const isHidden = section.enabled === false;

  return (
    <div
      id={`preview-section-${section.id}`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(section.id);
      }}
      className={`group relative transition-all duration-200 cursor-pointer ${
        isSelected
          ? 'ring-2 ring-indigo-600 ring-offset-2 shadow-lg z-20'
          : 'hover:ring-2 hover:ring-indigo-500/70 hover:ring-offset-1'
      } ${isHidden ? 'opacity-50 grayscale-25' : ''}`}
    >
      {/* Floating Edit Pill Button */}
      <div
        className={`absolute top-4 right-4 z-30 transition-all duration-200 ${
          isSelected
            ? 'opacity-100 scale-100'
            : 'opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 pointer-events-none group-hover:pointer-events-auto'
        }`}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(section.id);
          }}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-lg transition-transform active:scale-95 cursor-pointer ${
            isSelected
              ? 'bg-indigo-600 text-white shadow-indigo-600/30'
              : 'bg-slate-900 text-white hover:bg-indigo-600'
          }`}
        >
          <Edit3 size={13} />
          <span>Edit {section.name}</span>
        </button>
      </div>

      {/* Hidden Section Banner Badge in Editor */}
      {isHidden && (
        <div className="absolute top-4 left-4 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/85 text-white text-[11px] font-bold backdrop-blur-xs shadow-md">
          <EyeOff size={13} className="text-amber-400" />
          <span>Hidden from Public</span>
        </div>
      )}

      {/* Rendered section content */}
      <div className="pointer-events-none select-none">
        {children}
      </div>
    </div>
  );
};
