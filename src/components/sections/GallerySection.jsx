import React from 'react';

export const GallerySection = ({ config = {} }) => {
  const {
    badge = 'Visual Gallery',
    title = 'Captured In The Wild',
    subtitle = 'See how designers, photographers, and architects carry NOVA essentials across the globe.',
    images = [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    ],
    backgroundColor = '#ffffff',
    textColor = '#0f172a',
    spacing = 'medium',
  } = config;

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
        <div className="text-center max-w-2xl mx-auto mb-12">
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

        {/* 4-Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {images.map((imgUrl, i) => (
            <div
              key={i}
              className="relative aspect-4/5 rounded-2xl overflow-hidden bg-slate-100 shadow-sm border border-slate-100 group"
            >
              <img
                src={imgUrl}
                alt={`Gallery ${i + 1}`}
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
