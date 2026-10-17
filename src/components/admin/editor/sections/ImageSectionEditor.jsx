import React from 'react';
import { ImageUploader } from '../controls/ImageUploader';

export const ImageSectionEditor = ({ content = {}, onContentChange }) => {
  return (
    <div className="space-y-5">
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Headline Overlay
        </label>
        <input
          type="text"
          value={content.title || ''}
          onChange={(e) => onContentChange({ title: e.target.value })}
          placeholder="Engineered Without Compromise"
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium focus:outline-hidden focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Caption
        </label>
        <textarea
          rows={2}
          value={content.caption || ''}
          onChange={(e) => onContentChange({ caption: e.target.value })}
          placeholder="Every curve precision milled..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium focus:outline-hidden focus:border-indigo-500 leading-relaxed"
        />
      </div>

      <ImageUploader
        label="Visual Showcase Image"
        currentImage={content.image}
        onImageChange={(url) => onContentChange({ image: url })}
        aspectRatio="aspect-16/9"
      />

      <div className="grid grid-cols-2 gap-3 pt-2">
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
            Button Text
          </label>
          <input
            type="text"
            value={content.buttonText || ''}
            onChange={(e) => onContentChange({ buttonText: e.target.value })}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
            Button Link
          </label>
          <input
            type="text"
            value={content.buttonLink || ''}
            onChange={(e) => onContentChange({ buttonLink: e.target.value })}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
          />
        </div>
      </div>
    </div>
  );
};
