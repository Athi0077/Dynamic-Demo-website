import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  GripVertical,
  Eye,
  EyeOff,
  Copy,
  Trash2,
  Edit3,
  Sparkles,
  ShoppingBag,
  Layout,
  Tag,
  Star,
  MessageSquare,
  Compass,
  FileText,
  Image as ImageIcon,
  Video,
  Grid,
  HelpCircle,
  Mail,
  AlertTriangle,
} from 'lucide-react';

const iconMap = {
  Sparkles,
  ShoppingBag,
  Layout,
  Tag,
  Star,
  MessageSquare,
  Compass,
  FileText,
  Image: ImageIcon,
  Video,
  Grid,
  HelpCircle,
  Mail,
};

export const SortableSectionCard = ({
  section,
  index,
  isSelected,
  onSelect,
  onDuplicate,
  onToggleVisibility,
  onDelete,
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const IconComponent = iconMap[section.icon] || Layout;

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        onClick={() => onSelect(section.id)}
        className={`group relative rounded-2xl border transition-all duration-200 cursor-pointer select-none ${
          isDragging
            ? 'z-50 shadow-2xl ring-2 ring-indigo-500 bg-white opacity-90 scale-[1.02]'
            : isSelected
            ? 'bg-indigo-50/70 border-indigo-300 shadow-sm ring-1 ring-indigo-400'
            : section.enabled === false
            ? 'bg-slate-100/70 border-slate-200 opacity-60'
            : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-xs'
        }`}
      >
        <div className="p-3 sm:p-3.5 flex flex-col gap-2.5">
          {/* Top Row: Drag Handle + Icon + Name + Status */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              {/* Drag Handle - Only this element initiates dragging */}
              <button
                type="button"
                {...attributes}
                {...listeners}
                onClick={(e) => e.stopPropagation()}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-grab active:cursor-grabbing transition-colors shrink-0"
                title="Drag to reorder"
                aria-label="Drag handle"
              >
                <GripVertical size={16} />
              </button>

              {/* Order number */}
              <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-500 font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                {index + 1}
              </span>

              {/* Icon */}
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  isSelected
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                <IconComponent size={14} />
              </div>

              {/* Name */}
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">
                  {section.name}
                </p>
                <span className="text-[10px] text-slate-400 font-mono">
                  type: {section.type}
                </span>
              </div>
            </div>

            {/* Status Badge */}
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                section.enabled !== false
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {section.enabled !== false ? 'Active' : 'Hidden'}
            </span>
          </div>

          {/* Bottom Action Buttons: Edit | Duplicate | Hide/Show | Delete */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-500"
          >
            {/* Edit button */}
            <button
              type="button"
              onClick={() => onSelect(section.id)}
              className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 transition-colors p-1 rounded-md hover:bg-indigo-50/50"
              title="Edit section content"
            >
              <Edit3 size={12} />
              <span>Edit</span>
            </button>

            {/* Duplicate button */}
            <button
              type="button"
              onClick={() => onDuplicate(section.id)}
              className="inline-flex items-center gap-1 hover:text-slate-800 transition-colors p-1 rounded-md hover:bg-slate-100"
              title="Duplicate section"
            >
              <Copy size={12} />
              <span className="hidden sm:inline">Duplicate</span>
            </button>

            {/* Hide/Show button */}
            <button
              type="button"
              onClick={() => onToggleVisibility(section.id)}
              className={`inline-flex items-center gap-1 transition-colors p-1 rounded-md hover:bg-slate-100 ${
                section.enabled !== false ? 'hover:text-amber-600' : 'text-emerald-600'
              }`}
              title={section.enabled !== false ? 'Hide section' : 'Show section'}
            >
              {section.enabled !== false ? (
                <>
                  <EyeOff size={12} />
                  <span>Hide</span>
                </>
              ) : (
                <>
                  <Eye size={12} />
                  <span>Show</span>
                </>
              )}
            </button>

            {/* Delete button */}
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-rose-600 transition-colors p-1 rounded-md hover:bg-rose-50"
              title="Delete section"
            >
              <Trash2 size={12} />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
        >
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Remove "{section.name}"?
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Are you sure you want to remove this section? You can undo this action anytime from the editor header.
            </p>

            <div className="mt-6 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  onDelete(section.id);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 transition-colors shadow-xs cursor-pointer"
              >
                Delete Section
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
