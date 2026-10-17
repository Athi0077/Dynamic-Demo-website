import React, { useState } from 'react';
import {
  Edit3,
  ArrowUp,
  ArrowDown,
  Copy,
  Eye,
  EyeOff,
  Trash2,
  Sparkles,
} from 'lucide-react';
import { useWebsite } from '../../../context/WebsiteContext';

export const EasySectionWrapper = ({
  section,
  isSelected,
  onSelect,
  onOpenEditor,
  index,
  totalSections,
  children,
}) => {
  const {
    reorderSections,
    duplicateSection,
    toggleSectionVisibility,
    deleteSection,
    sections,
  } = useWebsite();

  const [isHovered, setIsHovered] = useState(false);

  // Move container up
  const handleMoveUp = (e) => {
    e.stopPropagation();
    if (index === 0) return;
    const newOrder = [...sections];
    const temp = newOrder[index];
    newOrder[index] = newOrder[index - 1];
    newOrder[index - 1] = temp;
    reorderSections(newOrder);
  };

  // Move container down
  const handleMoveDown = (e) => {
    e.stopPropagation();
    if (index === totalSections - 1) return;
    const newOrder = [...sections];
    const temp = newOrder[index];
    newOrder[index] = newOrder[index + 1];
    newOrder[index + 1] = temp;
    reorderSections(newOrder);
  };

  const handleDuplicate = (e) => {
    e.stopPropagation();
    duplicateSection(section.id);
  };

  const handleToggleHide = (e) => {
    e.stopPropagation();
    toggleSectionVisibility(section.id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`Delete "${section.name}" section?`)) {
      deleteSection(section.id);
    }
  };

  const handleContainerDoubleClick = (e) => {
    e.stopPropagation();
    onSelect(section.id);
    onOpenEditor(section.id);
  };

  const isHidden = section.enabled === false;

  return (
    <div
      id={`easy-section-${section.id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(section.id)}
      onDoubleClick={handleContainerDoubleClick}
      className={`relative transition-all duration-200 group ${
        isHidden ? 'opacity-40 grayscale-75' : ''
      }`}
    >
      {/* Container Selection Outline Border */}
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-200 z-30 ${
          isSelected
            ? 'ring-4 ring-indigo-600 ring-offset-2 ring-offset-white border-2 border-indigo-500 shadow-xl'
            : isHovered
            ? 'ring-2 ring-indigo-400/80 ring-offset-1 border-2 border-dashed border-indigo-400 shadow-sm'
            : ''
        }`}
      >
        {/* Corner Indicator Dots when Selected */}
        {isSelected && (
          <>
            <span className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 bg-indigo-600 rounded-full border-2 border-white shadow-xs" />
            <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-indigo-600 rounded-full border-2 border-white shadow-xs" />
            <span className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 bg-indigo-600 rounded-full border-2 border-white shadow-xs" />
            <span className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 bg-indigo-600 rounded-full border-2 border-white shadow-xs" />
          </>
        )}
      </div>

      {/* Container Top Edge Action Bar (Visible on Hover or when Selected) */}
      <div
        className={`absolute -top-5 left-1/2 -translate-x-1/2 z-40 transition-all duration-200 flex items-center gap-1.5 bg-slate-900 text-white px-3 py-1.5 rounded-2xl shadow-2xl border border-slate-700/80 ${
          isSelected || isHovered
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        {/* Section Title Pill */}
        <div className="flex items-center gap-1.5 pr-2 border-r border-slate-700 text-xs font-bold">
          <Sparkles size={13} className="text-indigo-400" />
          <span className="text-white max-w-[140px] truncate">{section.name}</span>
          <span className="text-[10px] text-slate-400 font-mono">#{index + 1}</span>
        </div>

        {/* PRIMARY EDIT BUTTON: Opens the in-place customizer modal */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(section.id);
            onOpenEditor(section.id);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold transition-all shadow-sm shadow-indigo-600/30 cursor-pointer active:scale-95"
          title="Click to edit text, colors, font sizes, spacing, and image"
        >
          <Edit3 size={13} />
          <span>Edit Container</span>
        </button>

        {/* Reordering: Move Up (▲) */}
        <button
          type="button"
          disabled={index === 0}
          onClick={handleMoveUp}
          className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors cursor-pointer"
          title="Move container up"
        >
          <ArrowUp size={14} />
        </button>

        {/* Reordering: Move Down (▼) */}
        <button
          type="button"
          disabled={index === totalSections - 1}
          onClick={handleMoveDown}
          className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors cursor-pointer"
          title="Move container down"
        >
          <ArrowDown size={14} />
        </button>

        {/* Duplicate Button */}
        <button
          type="button"
          onClick={handleDuplicate}
          className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          title="Duplicate this container"
        >
          <Copy size={13} />
        </button>

        {/* Toggle Hide / Show Button */}
        <button
          type="button"
          onClick={handleToggleHide}
          className={`p-1 rounded-lg transition-colors cursor-pointer ${
            isHidden
              ? 'text-amber-400 hover:text-amber-300 bg-amber-950/60'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title={isHidden ? 'Show container' : 'Hide container'}
        >
          {isHidden ? <EyeOff size={13} /> : <Eye size={13} />}
        </button>

        {/* Delete Button */}
        <button
          type="button"
          onClick={handleDelete}
          className="p-1 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
          title="Delete container"
        >
          <Trash2 size={13} />
        </button>
      </div>

      {/* Helpful hover instruction pill (appears if hovered but not selected) */}
      {isHovered && !isSelected && (
        <span className="absolute bottom-2 right-4 z-40 bg-slate-900/85 backdrop-blur-xs text-white text-[11px] font-medium px-3 py-1 rounded-full shadow-lg pointer-events-none">
          Double-click to customize container
        </span>
      )}

      {/* Render the actual website section content */}
      {children}
    </div>
  );
};

export default EasySectionWrapper;
