import React, { useState } from 'react';
import { ColorPicker } from '../controls/ColorPicker';
import { ImageUploader } from '../controls/ImageUploader';
import { ChevronDown, ChevronUp, Eye, EyeOff } from 'lucide-react';

export const ProductEditor = ({ config, onChange, onProductChange }) => {
  const [activeProductIndex, setActiveProductIndex] = useState(0);

  if (!config) return null;

  const handleUpdate = (field, value) => {
    onChange({ [field]: value });
  };

  const productsList = config.items || [];

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
          placeholder="Our Products"
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium focus:outline-hidden focus:border-indigo-500"
        />
      </div>

      {/* Description / Subtitle */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Section Subtitle
        </label>
        <textarea
          rows={2}
          value={config.subtitle || ''}
          onChange={(e) => handleUpdate('subtitle', e.target.value)}
          placeholder="Signature pieces engineered for daily comfort..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium focus:outline-hidden focus:border-indigo-500 leading-relaxed"
        />
      </div>

      {/* Display Count Slider */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <label className="font-bold text-slate-700 uppercase tracking-wider">
            Number of Products Displayed
          </label>
          <span className="font-mono text-slate-600 font-bold">
            {config.displayCount || 4} Cards
          </span>
        </div>
        <input
          type="range"
          min="1"
          max={productsList.length || 4}
          value={config.displayCount || 4}
          onChange={(e) => handleUpdate('displayCount', Number(e.target.value))}
          className="w-full accent-indigo-600 cursor-pointer"
        />
      </div>

      {/* Background Color */}
      <ColorPicker
        label="Section Background Color"
        value={config.backgroundColor || '#f8fafc'}
        onChange={(val) => handleUpdate('backgroundColor', val)}
      />

      {/* Per-Product Editor List */}
      <div className="pt-4 border-t border-slate-200/80 space-y-3">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Customize Products ({productsList.length})
        </h4>

        <div className="space-y-2">
          {productsList.map((product, idx) => {
            const isExpanded = activeProductIndex === idx;

            return (
              <div
                key={product.id || idx}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs"
              >
                {/* Accordion Header */}
                <div
                  onClick={() => setActiveProductIndex(isExpanded ? -1 : idx)}
                  className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {product.name}
                      </p>
                      <p className="text-[11px] text-slate-500 font-mono">
                        ${product.price.toFixed(2)} • {product.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Visibility Toggle */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onProductChange(product.id, {
                          visible: product.visible === false ? true : false,
                        });
                      }}
                      className={`p-1.5 rounded-lg transition-colors ${
                        product.visible !== false
                          ? 'text-emerald-600 hover:bg-emerald-50'
                          : 'text-slate-400 hover:bg-slate-100'
                      }`}
                      title={
                        product.visible !== false
                          ? 'Product visible'
                          : 'Product hidden'
                      }
                    >
                      {product.visible !== false ? <Eye size={15} /> : <EyeOff size={15} />}
                    </button>

                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>

                {/* Expanded Fields */}
                {isExpanded && (
                  <div className="p-4 pt-2 border-t border-slate-100 space-y-3 bg-slate-50/60">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Product Name
                      </label>
                      <input
                        type="text"
                        value={product.name || ''}
                        onChange={(e) =>
                          onProductChange(product.id, { name: e.target.value })
                        }
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Price ($)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={product.price || 0}
                          onChange={(e) =>
                            onProductChange(product.id, {
                              price: parseFloat(e.target.value) || 0,
                            })
                          }
                          className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Category
                        </label>
                        <input
                          type="text"
                          value={product.category || ''}
                          onChange={(e) =>
                            onProductChange(product.id, { category: e.target.value })
                          }
                          className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Description
                      </label>
                      <textarea
                        rows={2}
                        value={product.description || ''}
                        onChange={(e) =>
                          onProductChange(product.id, { description: e.target.value })
                        }
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs leading-relaxed"
                      />
                    </div>

                    <ImageUploader
                      label="Product Image (Cloudinary)"
                      currentImage={product.image}
                      onImageChange={(url) =>
                        onProductChange(product.id, { image: url })
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
