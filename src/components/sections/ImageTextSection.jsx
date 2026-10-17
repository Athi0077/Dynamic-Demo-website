import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

export const ImageTextSection = ({ config = siteConfig.imageTextSection }) => {
  const {
    badge = 'The NOVA Standard',
    title = 'Sculpted with Precision. Crafted for Everyday Life.',
    description = 'We believe everyday objects should inspire you. Every seam, edge, and surface is meticulously calibrated to deliver tactile delight and lifelong durability.',
    bullets = [
      {
        title: 'Precision CNC Machining',
        text: 'Zero-tolerance tolerances engineered for tactile perfection and longevity.',
      },
      {
        title: 'Sustainable Sourcing',
        text: '100% recyclable packaging and ethically audited manufacturing partners.',
      },
      {
        title: 'Ergonomic Excellence',
        text: 'Designed in collaboration with ergonomic specialists for effortless all-day use.',
      },
    ],
    image = 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&w=1000&q=80',
    imageAlt = 'NOVA craft and design details',
    buttonText = 'Discover The Craft',
    buttonLink = '#products',
    cta,
    imagePosition = 'left',
    reversed = false,
    // Dynamic customization fields
    backgroundColor,
    textColor,
    headingFontSize,
    descriptionFontSize,
    buttonBgColor,
    buttonTextColor,
  } = config;

  // Determine whether image should be on the right (reversed)
  const isReversed = imagePosition === 'right' || reversed;
  const finalCtaText = buttonText || cta?.text || 'Discover The Craft';
  const finalCtaLink = buttonLink || cta?.href || '#products';

  return (
    <section
      id="about"
      style={{
        backgroundColor: backgroundColor || undefined,
      }}
      className="py-20 lg:py-28 bg-white border-t border-slate-200/60 overflow-hidden transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image Column */}
          <div
            className={`lg:col-span-6 ${
              isReversed ? 'lg:order-2' : 'lg:order-1'
            }`}
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="relative rounded-3xl overflow-hidden bg-slate-100 shadow-xl border border-slate-100 aspect-4/3 sm:aspect-5/4">
                <img
                  src={image}
                  alt={imageAlt}
                  className="w-full h-full object-cover object-center hover:scale-103 transition-transform duration-700"
                  loading="lazy"
                />
              </div>

              {/* Decorative accent card */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-slate-900 text-white p-5 rounded-2xl shadow-xl max-w-xs hidden sm:block">
                <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                  Craftsmanship
                </p>
                <p className="text-sm font-bold mt-1">
                  Engineered to outlast transient trends.
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-indigo-400 font-medium">
                  <span>ISO 9001 Certified Quality</span>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content Column */}
          <div
            className={`lg:col-span-6 flex flex-col items-start text-left ${
              isReversed ? 'lg:order-1' : 'lg:order-2'
            }`}
          >
            {badge && (
              <span className="text-xs font-bold tracking-wider uppercase text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full inline-block mb-3">
                {badge}
              </span>
            )}

            <h2
              style={{
                color: textColor || undefined,
                fontSize: headingFontSize ? `${headingFontSize}px` : undefined,
              }}
              className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight"
            >
              {title}
            </h2>

            <p
              style={{
                fontSize: descriptionFontSize ? `${descriptionFontSize}px` : undefined,
              }}
              className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed"
            >
              {description}
            </p>

            {/* Feature Bullets */}
            {bullets && bullets.length > 0 && (
              <div className="mt-8 space-y-4 w-full">
                {bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 size={16} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {bullet.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-relaxed">
                        {bullet.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Button */}
            {finalCtaText && (
              <div className="mt-10">
                <a
                  href={finalCtaLink}
                  style={{
                    backgroundColor: buttonBgColor || undefined,
                    color: buttonTextColor || undefined,
                  }}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-indigo-600 transition-colors shadow-sm"
                >
                  <span>{finalCtaText}</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
