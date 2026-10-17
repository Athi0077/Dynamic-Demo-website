import React, { useState } from 'react';
import { ArrowRight, Tag, Clock, Check, Copy } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

export const OfferBanner = ({ config = siteConfig.offerBanner }) => {
  const {
    badge = 'LIMITED TIME EXCLUSIVE',
    title = 'Special Collection — Up to 40% Off',
    description = 'Upgrade your workspace and daily carry today. Claim complimentary express delivery on all orders over $100.',
    buttonText = 'Explore Offers',
    buttonLink = '#products',
    cta,
    codeBadge = 'CODE: NOVA40',
    validityText = 'Offer expires in 48 hours • Free returns included',
    bannerImage,
    // Dynamic customization fields
    backgroundColor,
    textColor,
    buttonColor,
    buttonTextColor,
  } = config;

  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    const code = codeBadge.replace('CODE: ', '').trim();
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const finalButtonText = buttonText || cta?.text || 'Explore Offers';
  const finalButtonLink = buttonLink || cta?.href || '#products';

  return (
    <section
      style={{
        backgroundColor: backgroundColor || '#0f172a',
        color: textColor || '#ffffff',
        backgroundImage: bannerImage ? `linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.85)), url(${bannerImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="relative overflow-hidden bg-slate-900 py-16 sm:py-20 text-white transition-colors duration-200"
    >
      {/* Decorative background grid pattern */}
      {!bannerImage && (
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left Text Content */}
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-semibold tracking-wider uppercase mb-4">
              <Tag size={13} />
              <span>{badge}</span>
            </div>

            <h2
              style={{ color: textColor || undefined }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight"
            >
              {title}
            </h2>

            <p
              style={{ color: textColor ? `${textColor}cc` : undefined }}
              className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl"
            >
              {description}
            </p>

            <div className="mt-6 flex items-center justify-center lg:justify-start gap-2 text-xs text-slate-400">
              <Clock size={14} className="text-amber-400" />
              <span>{validityText}</span>
            </div>
          </div>

          {/* Right Action / Promo Code Box */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-4 shrink-0">
            {/* Promo Code Pill with Copy Action */}
            <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/80 px-4 py-2.5 rounded-xl">
              <span className="font-mono text-sm font-bold text-indigo-300 tracking-wider">
                {codeBadge}
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                title="Copy promo code"
                aria-label="Copy promo code"
              >
                {copied ? (
                  <Check size={15} className="text-emerald-400" />
                ) : (
                  <Copy size={15} />
                )}
              </button>
            </div>

            {/* CTA Button */}
            <a
              href={finalButtonLink}
              style={{
                backgroundColor: buttonColor || '#ffffff',
                color: buttonTextColor || '#0f172a',
              }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-slate-900 font-bold text-sm sm:text-base hover:bg-indigo-50 active:scale-98 transition-all duration-200 shadow-lg hover:shadow-white/10"
            >
              <span>{finalButtonText}</span>
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
