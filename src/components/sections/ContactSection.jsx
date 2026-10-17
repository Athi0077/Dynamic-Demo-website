import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const ContactSection = ({ config = {} }) => {
  const {
    badge = 'Get in Touch',
    title = 'We Are Here For You',
    subtitle = 'Have a question about our collections or need tailored concierge support? Reach out anytime.',
    email = 'support@nova.com',
    phone = '+1 (800) 555-NOVA',
    address = '742 Design Way, New York, NY 10001',
    backgroundColor = '#ffffff',
    textColor = '#0f172a',
    spacing = 'medium',
  } = config;

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 4000);
    }
  };

  const spacingClasses = {
    small: 'py-12',
    medium: 'py-20 lg:py-24',
    large: 'py-28 lg:py-32',
  };

  return (
    <section
      style={{
        backgroundColor: backgroundColor || undefined,
        color: textColor || undefined,
      }}
      className={`border-t border-slate-200/60 ${spacingClasses[spacing] || spacingClasses.medium} transition-colors duration-200`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          {badge && (
            <span className="text-xs font-bold tracking-wider uppercase text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full inline-block mb-3">
              {badge}
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {title}
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Details Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Email Us</p>
                <p className="text-sm font-bold text-slate-900 mt-0.5">{email}</p>
                <p className="text-xs text-slate-500 mt-0.5">Average response: &lt; 2 hours</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Call Concierge</p>
                <p className="text-sm font-bold text-slate-900 mt-0.5">{phone}</p>
                <p className="text-xs text-slate-500 mt-0.5">Mon–Fri, 9am–6pm EST</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Design Studio</p>
                <p className="text-sm font-bold text-slate-900 mt-0.5">{address}</p>
                <p className="text-xs text-slate-500 mt-0.5">Visits by appointment only</p>
              </div>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Send a Message</h3>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center space-y-2 animate-in fade-in">
                <CheckCircle2 size={32} className="mx-auto text-emerald-600" />
                <h4 className="text-sm font-bold">Message Dispatched</h4>
                <p className="text-xs text-emerald-700">
                  Thank you! Our concierge team will reach out to your inbox shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can our design team help you today?"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-indigo-500 leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs rounded-xl transition-colors shadow-xs cursor-pointer"
                >
                  <Send size={14} />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
