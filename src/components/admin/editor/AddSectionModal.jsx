import React, { useState } from 'react';
import {
  X,
  Plus,
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
  Search,
} from 'lucide-react';
import { templateRegistry } from '../../../data/templates';

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

export const AddSectionModal = ({ isOpen, onClose, onSelectTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const categories = [
    'All',
    'Headers',
    'Commerce',
    'Content',
    'Promotions',
    'Social Proof',
    'Media',
    'Support',
    'Call to Action',
  ];

  const filteredTemplates = templateRegistry.filter((template) => {
    const matchesCat =
      selectedCategory === 'All' || template.category === selectedCategory;
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                <Plus size={18} />
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Add New Section
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Choose from 13 responsive pre-built templates to insert into your landing page
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close template selector"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative w-full sm:max-w-xs">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-indigo-500"
            />
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredTemplates.length === 0 ? (
            <div className="py-16 text-center text-slate-400">
              <p className="text-sm font-semibold text-slate-600">No templates match your search</p>
              <p className="text-xs mt-1">Try selecting "All" or a different category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTemplates.map((template) => {
                const Icon = iconMap[template.icon] || Layout;

                return (
                  <div
                    key={template.type}
                    onClick={() => {
                      onSelectTemplate(template.type);
                      onClose();
                    }}
                    className="group flex flex-col justify-between p-5 rounded-2xl border border-slate-200 bg-white hover:border-indigo-500 hover:shadow-lg transition-all duration-200 cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors flex items-center justify-center shrink-0">
                          <Icon size={20} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                          {template.category}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {template.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-3">
                        {template.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600 group-hover:text-indigo-700">
                      <span>Insert Section</span>
                      <Plus size={15} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
