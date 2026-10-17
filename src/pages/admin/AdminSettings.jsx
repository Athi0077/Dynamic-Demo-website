import React, { useState } from 'react';
import {
  Save,
  RotateCcw,
  CheckCircle2,
  Globe,
  Palette,
  Mail,
  Share2,
  Sparkles,
} from 'lucide-react';

export const AdminSettings = () => {
  const defaultSettings = {
    websiteName: 'NOVA',
    tagline: 'Modern Design & Curated Essentials',
    companyDescription:
      'Pioneering minimalist lifestyle accessories and workspace tools that seamlessly blend functional engineering with timeless aesthetics.',
    primaryColor: '#0f172a',
    secondaryColor: '#4f46e5',
    contactEmail: 'support@nova.com',
    phoneNumber: '+1 (800) 555-6682',
    twitter: 'https://twitter.com/nova',
    instagram: 'https://instagram.com/nova',
    linkedin: 'https://linkedin.com/company/nova',
    github: 'https://github.com/nova',
  };

  const [settings, setSettings] = useState(defaultSettings);
  const [toastMessage, setToastMessage] = useState(null);

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setToastMessage('Website settings saved successfully!');
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleReset = () => {
    setSettings(defaultSettings);
    setToastMessage('Reset to default settings.');
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 text-xs font-semibold animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Website Settings
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            General brand identity, store colors, support contact, and social channels
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer"
          >
            <Save size={14} />
            <span>Save Settings</span>
          </button>
        </div>
      </div>

      {/* Persistence Note Banner */}
      <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-start gap-3 text-xs text-indigo-900">
        <Sparkles size={17} className="text-indigo-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Settings Mock Prototype</p>
          <p className="text-indigo-800/80 mt-0.5">
            Values are configured locally for Step 2. In future steps, these settings will persist to the backend database and dynamically update the public storefront theme colors and SEO metadata.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Card 1: Brand & Identity */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Globe size={18} className="text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900">Brand Identity</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Website Name
              </label>
              <input
                type="text"
                value={settings.websiteName}
                onChange={(e) => handleChange('websiteName', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium focus:outline-hidden focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Tagline
              </label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium focus:outline-hidden focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Company Description
            </label>
            <textarea
              rows={3}
              value={settings.companyDescription}
              onChange={(e) => handleChange('companyDescription', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium focus:outline-hidden focus:border-indigo-500 leading-relaxed"
            />
          </div>
        </div>

        {/* Card 2: Theme Colors */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Palette size={18} className="text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900">Brand Colors</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Primary Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={settings.primaryColor}
                  onChange={(e) => handleChange('primaryColor', e.target.value)}
                  className="w-10 h-10 rounded-xl cursor-pointer border border-slate-200 p-0.5 bg-white"
                />
                <input
                  type="text"
                  value={settings.primaryColor}
                  onChange={(e) => handleChange('primaryColor', e.target.value)}
                  className="w-36 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-900 focus:outline-hidden"
                />
                <span className="text-xs text-slate-400">Headings & Navbar</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Secondary Color (Accent)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={settings.secondaryColor}
                  onChange={(e) => handleChange('secondaryColor', e.target.value)}
                  className="w-10 h-10 rounded-xl cursor-pointer border border-slate-200 p-0.5 bg-white"
                />
                <input
                  type="text"
                  value={settings.secondaryColor}
                  onChange={(e) => handleChange('secondaryColor', e.target.value)}
                  className="w-36 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-900 focus:outline-hidden"
                />
                <span className="text-xs text-slate-400">Buttons & Highlights</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Contact & Support */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Mail size={18} className="text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900">Contact & Support</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Contact Email
              </label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => handleChange('contactEmail', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium focus:outline-hidden focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Phone Number
              </label>
              <input
                type="text"
                value={settings.phoneNumber}
                onChange={(e) => handleChange('phoneNumber', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium focus:outline-hidden focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Card 4: Social Media Links */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Share2 size={18} className="text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900">Social Media Links</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Twitter / X URL
              </label>
              <input
                type="url"
                value={settings.twitter}
                onChange={(e) => handleChange('twitter', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Instagram URL
              </label>
              <input
                type="url"
                value={settings.instagram}
                onChange={(e) => handleChange('instagram', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                LinkedIn URL
              </label>
              <input
                type="url"
                value={settings.linkedin}
                onChange={(e) => handleChange('linkedin', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                GitHub URL
              </label>
              <input
                type="url"
                value={settings.github}
                onChange={(e) => handleChange('github', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <Save size={15} />
            <span>Save All Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
