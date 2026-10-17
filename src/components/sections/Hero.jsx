import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

export const Hero = ({ config = siteConfig.hero }) => {
  const {
    badge = 'New Season 2026 Collection',
    headline = 'Curated Elegance for the Modern Lifestyle.',
    description = 'Discover thoughtfully engineered essentials crafted with aerospace-grade precision and timeless minimalist aesthetics.',
    primaryCta = { text: 'Shop Now', href: '#products' },
    secondaryCta = { text: 'Explore Collection', href: '#featured' },
    image = 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1200&q=80',
    stats = [
      { value: '25K+', label: 'Happy Customers' },
      { value: '4.9/5', label: 'Customer Rating' },
      { value: '100%', label: 'Carbon Neutral' },
    ],
    // Dynamic customization fields from Editor
    backgroundColor,
    textColor,
    headingFontSize,
    descriptionFontSize,
    buttonBgColor,
    buttonTextColor,
    alignment = 'left',
    sectionHeight,
  } = config;

  const isCenter = alignment === 'center';

  return (
    <section
      id="home"
      style={{
        backgroundColor: backgroundColor || undefined,
        paddingTop: sectionHeight ? `${sectionHeight}px` : undefined,
        paddingBottom: sectionHeight ? `${sectionHeight}px` : undefined,
      }}
      className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28 transition-colors duration-200"
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-50/70 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 ${isCenter ? 'lg:grid-cols-1 text-center' : 'lg:grid-cols-12'} gap-12 lg:gap-8 items-center`}>
          {/* Left Column: Content */}
          <div className={`${isCenter ? 'max-w-3xl mx-auto items-center text-center' : 'lg:col-span-7 items-start text-left'} flex flex-col`}>
            {/* Tagline / Badge */}
            {badge && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 text-indigo-700 text-xs sm:text-sm font-semibold tracking-wide mb-6 shadow-2xs">
                <Sparkles size={14} className="text-indigo-600 animate-pulse" />
                <span>{badge}</span>
              </div>
            )}

            {/* Headline */}
            <h1
              style={{
                color: textColor || undefined,
                fontSize: headingFontSize ? `${headingFontSize}px` : undefined,
              }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]"
            >
              {headline}
            </h1>

            {/* Short Description */}
            <p
              style={{
                fontSize: descriptionFontSize ? `${descriptionFontSize}px` : undefined,
              }}
              className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl"
            >
              {description}
            </p>

            {/* CTA Buttons */}
            <div className={`mt-8 sm:mt-10 flex flex-wrap items-center gap-4 w-full sm:w-auto ${isCenter ? 'justify-center' : ''}`}>
              <a
                href={primaryCta?.href || '#products'}
                style={{
                  backgroundColor: buttonBgColor || undefined,
                  color: buttonTextColor || undefined,
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-slate-900 text-white font-semibold text-sm sm:text-base hover:bg-indigo-600 active:scale-98 transition-all duration-200 shadow-md hover:shadow-indigo-500/25"
              >
                <span>{primaryCta?.text || 'Shop Now'}</span>
                <ArrowRight size={17} />
              </a>

              <a
                href={secondaryCta?.href || '#featured'}
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 rounded-xl bg-white text-slate-800 font-semibold text-sm sm:text-base border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 shadow-2xs"
              >
                <span>{secondaryCta?.text || 'Explore Collection'}</span>
              </a>
            </div>

            {/* Trust Badges / Stats */}
            <div className="mt-12 pt-8 border-t border-slate-200/80 w-full grid grid-cols-3 gap-4 sm:gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-black text-slate-900">
                    {stat.value}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className={`${isCenter ? 'max-w-xl mx-auto w-full' : 'lg:col-span-5'} relative`}>
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Product / Lifestyle Image */}
              <div className="relative rounded-3xl overflow-hidden bg-slate-100 shadow-2xl border border-slate-200/80 aspect-4/5 sm:aspect-square lg:aspect-4/5">
                <img
                  src={image}
                  alt="NOVA Flagship Collection"
                  className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
                  loading="eager"
                />

                {/* Subtle gradient overlay at the bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                {/* Bottom caption overlay */}
                <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none text-left">
                  <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold bg-white/20 backdrop-blur-md mb-2">
                    FLAGSHIP 2026
                  </span>
                  <h3 className="text-lg font-bold">Studio Acoustic & Tactile Series</h3>
                  <p className="text-xs text-slate-200 mt-1 line-clamp-1">
                    Machined aerospace aluminum with acoustic diaphragm tuning.
                  </p>
                </div>
              </div>

              {/* Floating Quality Badge */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3.5 max-w-xs animate-in slide-in-from-bottom duration-500 text-left">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">2-Year Warranty</h4>
                  <p className="text-[11px] text-slate-500">Free global replacements & guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Value Proposition Bar */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t border-slate-200/60">
          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white border border-slate-100 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Truck size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Free Express Delivery</p>
              <p className="text-xs text-slate-500">On all orders over $100 worldwide</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white border border-slate-100 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <RotateCcw size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">30-Day Free Trial</p>
              <p className="text-xs text-slate-500">Hassle-free 100% money-back returns</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white border border-slate-100 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Certified Durability</p>
              <p className="text-xs text-slate-500">Built to endure with aerospace grade materials</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
