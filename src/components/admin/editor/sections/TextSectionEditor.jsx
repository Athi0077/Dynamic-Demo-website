import React from 'react';
import { TypographyEditor } from '../controls/TypographyEditor';

export const TextSectionEditor = ({ content = {}, settings = {}, onContentChange, onSettingsChange }) => {
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
          placeholder="Brand Story"
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
          placeholder="Simplicity is the Ultimate Sophistication"
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium focus:outline-hidden focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Body Text
        </label>
        <textarea
          rows={5}
          value={content.content || ''}
          onChange={(e) => onContentChange({ content: e.target.value })}
          placeholder="Enter text paragraph here..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium focus:outline-hidden focus:border-indigo-500 leading-relaxed"
        />
      </div>

      <TypographyEditor
        headingFontSize={settings.headingFontSize || 38}
        onHeadingSizeChange={(val) => onSettingsChange({ headingFontSize: val })}
        descriptionFontSize={settings.descriptionFontSize || 18}
        onDescriptionSizeChange={(val) => onSettingsChange({ descriptionFontSize: val })}
        alignment={settings.alignment || 'center'}
        onAlignmentChange={(val) => onSettingsChange({ alignment: val })}
      />
    </div>
  );
};
