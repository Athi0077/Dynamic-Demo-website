import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection = ({ config = {} }) => {
  const {
    badge = 'Help & Support',
    title = 'Frequently Asked Questions',
    subtitle = 'Everything you need to know about our products, shipping, warranty, and returns.',
    items = [
      {
        q: 'What is the standard shipping delivery time?',
        a: 'We provide complimentary express delivery on orders over $100. Most orders arrive within 2-4 business days in North America and 4-7 business days internationally.',
      },
      {
        q: 'What is covered under the 2-Year NOVA Warranty?',
        a: 'Our comprehensive warranty covers all manufacturing defects, acoustic degradation, internal electronic malfunctions, and mechanical failures. Free worldwide replacement is guaranteed.',
      },
      {
        q: 'Can I return my order if I am not satisfied?',
        a: 'Yes. We offer a 30-day risk-free trial. If you are not completely in love with your NOVA items, return them in original condition for a 100% full refund.',
      },
      {
        q: 'Are your materials sustainably sourced?',
        a: 'All our packaging is 100% plastic-free and recyclable. Our metals use recycled aerospace-grade aluminum alloys, and our leather is ethically certified by the Leather Working Group.',
      },
    ],
    backgroundColor = '#f8fafc',
    textColor = '#0f172a',
    spacing = 'medium',
  } = config;

  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  const spacingClasses = {
    small: 'py-12',
    medium: 'py-20 lg:py-24',
    large: 'py-28 lg:py-32',
  };

  return (
    <section
      style={{
        backgroundColor: backgroundColor || '#f8fafc',
        color: textColor || undefined,
      }}
      className={`border-t border-slate-200/60 ${spacingClasses[spacing] || spacingClasses.medium} transition-colors duration-200`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
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

        {/* Accordion list */}
        <div className="space-y-3">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-2xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <HelpCircle size={18} className="text-indigo-600 shrink-0" />
                    <span className="text-sm sm:text-base font-bold text-slate-900">
                      {item.q}
                    </span>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-indigo-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
