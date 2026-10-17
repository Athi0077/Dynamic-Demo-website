import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

export const CTASection = ({ config = siteConfig.ctaSection }) => {
  const {
    badge = 'Get Started Today',
    title = 'Ready to Explore NOVA?',
    description = 'Experience design purity and uncompromising craftsmanship. Elevate your everyday routine with our newest releases.',
    buttonText = 'Start Shopping',
    buttonLink = '#products',
    secondaryButtonText = 'Explore Collection',
    secondaryButtonLink = '#featured',
    primaryCta,
    secondaryCta,
    guaranteeText = '30-Day Money-Back Guarantee • Free Global Shipping • 24/7 Concierge Support',
    // Dynamic customization fields
    backgroundColor,
    textColor,
    buttonColor,
    buttonTextColor,
  } = config;

  const finalPrimaryText = buttonText || primaryCta?.text || 'Start Shopping';
  const finalPrimaryLink = buttonLink || primaryCta?.href || '#products';
  const finalSecondaryText = secondaryButtonText || secondaryCta?.text || 'Explore Collection';
  const finalSecondaryLink = secondaryButtonLink || secondaryCta?.href || '#featured';

  return (
    <section className="py-20 lg:py-24 bg-white border-t border-slate-200/60 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          style={{
            backgroundColor: backgroundColor || '#0f172a',
            color: textColor || '#ffffff',
          }}
          className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-16 sm:px-16 sm:py-20 text-center text-white shadow-2xl transition-colors duration-200"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-3xl mx-auto flex flex-col items-center">
            {badge && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-6">
                <Sparkles size={13} />
                <span>{badge}</span>
              </span>
            )}

            <h2
              style={{ color: textColor || undefined }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight"
            >
              {title}
            </h2>

            <p
              style={{ color: textColor ? `${textColor}cc` : undefined }}
              className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl"
            >
              {description}
            </p>

            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href={finalPrimaryLink}
                style={{
                  backgroundColor: buttonColor || '#ffffff',
                  color: buttonTextColor || '#0f172a',
                }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-slate-900 font-bold text-sm sm:text-base hover:bg-indigo-50 active:scale-98 transition-all duration-200 shadow-lg hover:shadow-white/10"
              >
                <span>{finalPrimaryText}</span>
                <ArrowRight size={17} />
              </a>

              <a
                href={finalSecondaryLink}
                className="inline-flex items-center justify-center px-7 py-4 rounded-xl bg-slate-800 text-white font-semibold text-sm sm:text-base border border-slate-700 hover:bg-slate-700/80 transition-all duration-200"
              >
                <span>{finalSecondaryText}</span>
              </a>
            </div>

            {guaranteeText && (
              <p
                style={{ color: textColor ? `${textColor}88` : undefined }}
                className="mt-8 text-xs text-slate-400 font-medium"
              >
                {guaranteeText}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
