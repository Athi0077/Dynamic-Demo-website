import React from 'react';
import { ArrowRight } from 'lucide-react';

export const ImageSection = ({ config = {} }) => {
  const {
    image = 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&w=1600&q=80',
    title = 'Engineered Without Compromise',
    caption = 'Every curve precision milled from aerospace-grade aluminum.',
    buttonText = 'Explore The Engineering',
    buttonLink = '#products',
    backgroundColor = '#ffffff',
    textColor = '#ffffff',
    spacing = 'medium',
    contentWidth = 'full',
  } = config;

  const spacingClasses = {
    small: 'py-10',
    medium: 'py-16 sm:py-20',
    large: 'py-24 sm:py-28',
  };

  const widthClasses = {
    narrow: 'max-w-4xl',
    medium: 'max-w-6xl',
    full: 'max-w-7xl',
  };

  return (
    <section
      style={{ backgroundColor: backgroundColor || undefined }}
      className={`border-t border-slate-200/60 ${spacingClasses[spacing] || spacingClasses.medium} transition-colors duration-200`}
    >
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${widthClasses[contentWidth] || widthClasses.full}`}>
        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900 aspect-16/9 sm:aspect-21/9 border border-slate-200/80 group">
          <img
            src={image}
            alt={title || 'Visual showcase'}
            className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
            loading="lazy"
          />

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

          {/* Bottom text & CTA overlay */}
          <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="max-w-xl text-left">
              {title && (
                <h3
                  style={{ color: textColor || '#ffffff' }}
                  className="text-2xl sm:text-3xl font-extrabold tracking-tight"
                >
                  {title}
                </h3>
              )}
              {caption && (
                <p className="mt-2 text-sm sm:text-base text-slate-200 leading-relaxed">
                  {caption}
                </p>
              )}
            </div>

            {buttonText && (
              <a
                href={buttonLink || '#products'}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-900 font-bold text-xs sm:text-sm hover:bg-slate-100 transition-colors shadow-md self-start sm:self-auto shrink-0"
              >
                <span>{buttonText}</span>
                <ArrowRight size={15} />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
