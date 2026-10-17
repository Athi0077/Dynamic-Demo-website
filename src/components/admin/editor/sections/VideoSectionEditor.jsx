import React from 'react';
import { ImageUploader } from '../controls/ImageUploader';

export const VideoSectionEditor = ({ content = {}, onContentChange }) => {
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
          placeholder="Behind The Scenes"
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium focus:outline-hidden focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Headline
        </label>
        <input
          type="text"
          value={content.title || ''}
          onChange={(e) => onContentChange({ title: e.target.value })}
          placeholder="How We Craft The Perfect Sound"
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium focus:outline-hidden focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Description
        </label>
        <textarea
          rows={3}
          value={content.description || ''}
          onChange={(e) => onContentChange({ description: e.target.value })}
          placeholder="Go behind the design board..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium focus:outline-hidden focus:border-indigo-500 leading-relaxed"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Video Embed URL
        </label>
        <input
          type="url"
          value={content.videoUrl || ''}
          onChange={(e) => onContentChange({ videoUrl: e.target.value })}
          placeholder="https://www.youtube.com/embed/..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-mono focus:outline-hidden focus:border-indigo-500"
        />
      </div>

      <ImageUploader
        label="Video Cover Thumbnail"
        currentImage={content.thumbnail}
        onImageChange={(url) => onContentChange({ thumbnail: url })}
        aspectRatio="aspect-16/9"
      />
    </div>
  );
};
