import React from 'react';

export const ContactSectionEditor = ({ content = {}, onContentChange }) => {
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
          placeholder="Get in Touch"
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
          placeholder="We Are Here For You"
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
          placeholder="Have a question about our collections..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium focus:outline-hidden focus:border-indigo-500 leading-relaxed"
        />
      </div>

      <div className="space-y-3 pt-2 border-t border-slate-200/80">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Contact Channels
        </h4>

        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={content.email || ''}
            onChange={(e) => onContentChange({ email: e.target.value })}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
            Phone Number
          </label>
          <input
            type="text"
            value={content.phone || ''}
            onChange={(e) => onContentChange({ phone: e.target.value })}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
            Studio Location
          </label>
          <input
            type="text"
            value={content.address || ''}
            onChange={(e) => onContentChange({ address: e.target.value })}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
          />
        </div>
      </div>
    </div>
  );
};
