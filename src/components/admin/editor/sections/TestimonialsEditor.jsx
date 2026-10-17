import React, { useState } from 'react';
import { ColorPicker } from '../controls/ColorPicker';
import { ImageUploader } from '../controls/ImageUploader';
import { ChevronDown, ChevronUp, Star } from 'lucide-react';

export const TestimonialsEditor = ({ config, onChange, onTestimonialChange }) => {
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

  if (!config) return null;

  const handleUpdate = (field, value) => {
    onChange({ [field]: value });
  };

  const testimonialsList = config.items || [];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Section Title
        </label>
        <input
          type="text"
          value={config.title || ''}
          onChange={(e) => handleUpdate('title', e.target.value)}
          placeholder="What Our Customers Say"
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium focus:outline-hidden focus:border-indigo-500"
        />
      </div>

      {/* Subtitle */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Subtitle
        </label>
        <textarea
          rows={2}
          value={config.subtitle || ''}
          onChange={(e) => handleUpdate('subtitle', e.target.value)}
          placeholder="Join over 25,000 creators, engineers..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium focus:outline-hidden focus:border-indigo-500 leading-relaxed"
        />
      </div>

      {/* Colors */}
      <div className="grid grid-cols-2 gap-4">
        <ColorPicker
          label="Section Background"
          value={config.backgroundColor || '#f8fafc'}
          onChange={(val) => handleUpdate('backgroundColor', val)}
        />
        <ColorPicker
          label="Card Background"
          value={config.cardBackground || '#ffffff'}
          onChange={(val) => handleUpdate('cardBackground', val)}
        />
      </div>

      {/* Individual Testimonial Editors */}
      <div className="pt-4 border-t border-slate-200/80 space-y-3">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Customer Reviews ({testimonialsList.length})
        </h4>

        <div className="space-y-2">
          {testimonialsList.map((item, idx) => {
            const isExpanded = activeTestimonialIndex === idx;

            return (
              <div
                key={item.id || idx}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs"
              >
                {/* Header */}
                <div
                  onClick={() => setActiveTestimonialIndex(isExpanded ? -1 : idx)}
                  className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-9 h-9 rounded-full object-cover bg-slate-100 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {item.name}
                      </p>
                      <div className="flex items-center gap-1 text-[11px] text-amber-500">
                        <Star size={11} className="fill-amber-400" />
                        <span className="font-semibold">{item.rating || 5} Stars</span>
                        <span className="text-slate-400 ml-1">• {item.role}</span>
                      </div>
                    </div>
                  </div>

                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>

                {/* Expanded Fields */}
                {isExpanded && (
                  <div className="p-4 pt-2 border-t border-slate-100 space-y-3 bg-slate-50/60">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Customer Name
                        </label>
                        <input
                          type="text"
                          value={item.name || ''}
                          onChange={(e) =>
                            onTestimonialChange(item.id, { name: e.target.value })
                          }
                          className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Rating (1 to 5)
                        </label>
                        <select
                          value={item.rating || 5}
                          onChange={(e) =>
                            onTestimonialChange(item.id, {
                              rating: parseInt(e.target.value, 10),
                            })
                          }
                          className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold"
                        >
                          <option value="5">★★★★★ (5 Stars)</option>
                          <option value="4">★★★★☆ (4 Stars)</option>
                          <option value="3">★★★☆☆ (3 Stars)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Role / Title
                      </label>
                      <input
                        type="text"
                        value={item.role || ''}
                        onChange={(e) =>
                          onTestimonialChange(item.id, { role: e.target.value })
                        }
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Review Quote
                      </label>
                      <textarea
                        rows={3}
                        value={item.review || ''}
                        onChange={(e) =>
                          onTestimonialChange(item.id, { review: e.target.value })
                        }
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs leading-relaxed"
                      />
                    </div>

                    <ImageUploader
                      label="Customer Avatar (Cloudinary)"
                      currentImage={item.avatar}
                      onImageChange={(url) =>
                        onTestimonialChange(item.id, { avatar: url })
                      }
                      aspectRatio="aspect-square"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
