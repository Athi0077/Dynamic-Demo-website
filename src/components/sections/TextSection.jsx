import React from 'react';

export const TextSection = ({ config = {} }) => {
  const {
    badge = 'Brand Story',
    title = 'Simplicity is the Ultimate Sophistication',
    content = 'At NOVA, we design products that seamlessly integrate into your daily rituals. Every curve, tactile interaction, and material choice is made with deliberate intent. We eliminate the unnecessary so the essential may speak.',
    alignment = 'center',
    backgroundColor = '#ffffff',
    textColor = '#0f172a',
    headingFontSize = 38,
    descriptionFontSize = 18,
    spacing = 'medium',
    contentWidth = 'medium',
  } = config;

  const spacingClasses = {
    small: 'py-12',
    medium: 'py-20 lg:py-24',
    large: 'py-28 lg:py-36',
  };

  const widthClasses = {
    narrow: 'max-w-2xl',
    medium: 'max-w-4xl',
    full: 'max-w-7xl',
  };

  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
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
        <div className={`flex flex-col ${alignClasses[alignment] || alignClasses.center} ${widthClasses[contentWidth] || widthClasses.medium}`}>
          {badge && (
            <span className="text-xs font-bold tracking-wider uppercase text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full inline-block mb-4">
              {badge}
            </span>
          )}

          <h2
            style={{
              color: textColor || undefined,
              fontSize: headingFontSize ? `${headingFontSize}px` : undefined,
            }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight"
          >
            {title}
          </h2>

          <p
            style={{
              color: textColor ? `${textColor}cc` : undefined,
              fontSize: descriptionFontSize ? `${descriptionFontSize}px` : undefined,
            }}
            className="mt-6 text-base sm:text-lg leading-relaxed text-slate-600 max-w-3xl"
          >
            {content}
          </p>
        </div>
      </div>
    </section>
  );
};
