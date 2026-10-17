import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { testimonialsData } from '../../data/testimonials';
import { siteConfig } from '../../data/siteConfig';

export const Testimonials = ({
  testimonials = testimonialsData,
  config = siteConfig.testimonials,
}) => {
  const {
    badge = 'Verified Reviews',
    title = 'What Our Customers Say',
    subtitle = 'Join over 25,000 creators, engineers, and designers who trust NOVA daily.',
    backgroundColor,
    cardBackground,
    textColor,
  } = config;

  return (
    <section
      id="testimonials"
      style={{
        backgroundColor: backgroundColor || undefined,
      }}
      className="py-20 lg:py-24 bg-slate-50/70 border-t border-slate-200/60 transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          {badge && (
            <span className="text-xs font-bold tracking-wider uppercase text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full inline-block mb-3">
              {badge}
            </span>
          )}
          <h2
            style={{ color: textColor || undefined }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            {title}
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* 3 Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: cardBackground || undefined,
              }}
              className="relative flex flex-col justify-between p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Quote mark decoration */}
              <div className="absolute top-6 right-6 text-slate-100">
                <Quote size={40} className="fill-slate-100 stroke-none" />
              </div>

              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star
                      key={i}
                      size={17}
                      className="fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic relative z-10">
                  "{item.review}"
                </p>
              </div>

              {/* Customer Info */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-3.5">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs bg-slate-100"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-slate-900 truncate">
                      {item.name}
                    </h4>
                    {item.verified !== false && (
                      <CheckCircle
                        size={14}
                        className="text-emerald-500 fill-emerald-50 shrink-0"
                        title="Verified Customer"
                      />
                    )}
                  </div>
                  <p className="text-xs text-slate-500 truncate mt-0.5">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
