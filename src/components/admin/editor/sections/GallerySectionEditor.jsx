import React from 'react';
import { ImageUploader } from '../controls/ImageUploader';

export const GallerySectionEditor = ({ content = {}, onContentChange }) => {
  const images = content.images || [];

  const handleUpdateImage = (index, newUrl) => {
    const updated = [...images];
    updated[index] = newUrl;
    onContentChange({ images: updated });
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
          placeholder="Visual Gallery"
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
          placeholder="Captured In The Wild"
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
          placeholder="See how designers, photographers..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium focus:outline-hidden focus:border-indigo-500 leading-relaxed"
        />
      </div>

      <div className="space-y-4 pt-2 border-t border-slate-200/80">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Gallery Photos (4)
        </h4>

        {images.map((img, idx) => (
          <ImageUploader
            key={idx}
            label={`Photo #${idx + 1}`}
            currentImage={img}
            onImageChange={(url) => handleUpdateImage(idx, url)}
            aspectRatio="aspect-video"
          />
        ))}
      </div>
    </div>
  );
};
