import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  Layers,
  Plus,
  Lock,
} from 'lucide-react';
import { useWebsite } from '../../../context/WebsiteContext';
import { SortableSectionCard } from './SortableSectionCard';
import { AddSectionModal } from './AddSectionModal';

export const SectionSelector = ({
  selectedSectionId,
  onSelectSection,
}) => {
  const {
    sections,
    reorderSections,
    addSection,
    deleteSection,
    duplicateSection,
    toggleSectionVisibility,
  } = useWebsite();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Configure drag sensors with a 4px distance constraint to differentiate clicks from drags
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 4,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);
      const reordered = arrayMove(sections, oldIndex, newIndex);
      reorderSections(reordered);
    }
  };

  const handleTemplateSelect = (templateType) => {
    const created = addSection(templateType);
    if (created && created.id) {
      onSelectSection(created.id);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white border-r border-slate-200 w-80 lg:w-88 shrink-0 select-none">
      {/* Panel Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-2">
          <Layers size={17} className="text-indigo-600" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Page Sections
          </h2>
        </div>
        <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
          {sections.length} Sections
        </span>
      </div>

      {/* Sortable Sections Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {/* Pinned Fixed Top Item: Navbar */}
        <div className="p-2.5 rounded-xl border border-dashed border-slate-200 bg-slate-50 text-slate-400 flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-2">
            <Lock size={13} className="text-slate-400" />
            <span className="text-slate-600 font-bold">Navbar</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 uppercase">Fixed Top</span>
        </div>

        {/* DnD Context with Sortable Items */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sections.map((s) => s.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {sections.map((sec, idx) => (
                <SortableSectionCard
                  key={sec.id}
                  section={sec}
                  index={idx}
                  isSelected={selectedSectionId === sec.id}
                  onSelect={onSelectSection}
                  onDuplicate={duplicateSection}
                  onToggleVisibility={toggleSectionVisibility}
                  onDelete={deleteSection}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {/* Pinned Fixed Bottom Item: Footer */}
        <div className="p-2.5 rounded-xl border border-dashed border-slate-200 bg-slate-50 text-slate-400 flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-2">
            <Lock size={13} className="text-slate-400" />
            <span className="text-slate-600 font-bold">Footer</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 uppercase">Fixed Bottom</span>
        </div>
      </div>

      {/* Bottom Action: "+ Add Section" Button */}
      <div className="p-3.5 border-t border-slate-100 bg-slate-50/70">
        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs transition-all duration-150 flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-98"
        >
          <Plus size={15} />
          <span>Add Section</span>
        </button>
      </div>

      {/* Add Section Template Selector Modal */}
      <AddSectionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSelectTemplate={handleTemplateSelect}
      />
    </div>
  );
};
