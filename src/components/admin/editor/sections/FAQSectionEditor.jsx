import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export const FAQSectionEditor = ({ content = {}, onContentChange }) => {
  const items = content.items || [];

  const handleUpdateItem = (index, field, value) => {
    const updated = items.map((item, idx) =>
      idx === index ? { ...item, [field]: value } : item
    );
    onContentChange({ items: updated });
  };

  const handleAddItem = () => {
    const newItem = {
      q: 'New Question?',
      a: 'Answer description goes here.',
    };
    onContentChange({ items: [...items, newItem] });
  };

  const handleDeleteItem = (index) => {
    const updated = items.filter((_, idx) => idx !== index);
    onContentChange({ items: updated });
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Badge
        </label>
        <input
          type="text"
          value={content.badge || ''}
          onChange={(e) => onContentChange({ badge: e.target.value })}
          placeholder="Help & Support"
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium focus:outline-hidden focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Section Title
        </label>
        <input
          type="text"
          value={content.title || ''}
          onChange={(e) => onContentChange({ title: e.target.value })}
          placeholder="Frequently Asked Questions"
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium focus:outline-hidden focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Subtitle
        </label>
        <textarea
          rows={2}
          value={content.subtitle || ''}
          onChange={(e) => onContentChange({ subtitle: e.target.value })}
          placeholder="Everything you need to know about our products..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium focus:outline-hidden focus:border-indigo-500 leading-relaxed"
        />
      </div>

      <div className="space-y-3 pt-2 border-t border-slate-200/80">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Questions & Answers ({items.length})
          </h4>
          <button
            type="button"
            onClick={handleAddItem}
            className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700"
          >
            <Plus size={14} />
            <span>Add Item</span>
          </button>
        </div>

        {items.map((item, idx) => (
          <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Question #{idx + 1}</span>
              <button
                type="button"
                onClick={() => handleDeleteItem(idx)}
                className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                title="Delete question"
              >
                <Trash2 size={13} />
              </button>
            </div>
            <input
              type="text"
              value={item.q}
              onChange={(e) => handleUpdateItem(idx, 'q', e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-900"
            />
            <textarea
              rows={2}
              value={item.a}
              onChange={(e) => handleUpdateItem(idx, 'a', e.target.value)}
              className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 leading-relaxed"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
