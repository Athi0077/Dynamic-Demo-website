import React, { useState } from 'react';
import { Play, X } from 'lucide-react';

export const VideoSection = ({ config = {} }) => {
  const {
    badge = 'Behind The Scenes',
    title = 'How We Craft The Perfect Sound',
    description = 'Go behind the design board with our audio acoustic engineers to witness how 24 months of prototyping culminated in the AeroSound Pro.',
    thumbnail = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1600&q=80',
    videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    backgroundColor = '#0f172a',
    textColor = '#ffffff',
    spacing = 'medium',
  } = config;

  const [isPlaying, setIsPlaying] = useState(false);

  const spacingClasses = {
    small: 'py-12',
    medium: 'py-20 lg:py-24',
    large: 'py-28 lg:py-32',
  };

  return (
    <section
      style={{
        backgroundColor: backgroundColor || '#0f172a',
        color: textColor || '#ffffff',
      }}
      className={`border-t border-slate-800 ${spacingClasses[spacing] || spacingClasses.medium} transition-colors duration-200`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          {badge && (
            <span className="text-xs font-bold tracking-wider uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-400/20 px-3 py-1 rounded-full inline-block mb-3">
              {badge}
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {title}
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Video Thumbnail Frame with Play Button */}
        <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl aspect-16/9 bg-slate-950 border border-slate-800 group">
          {isPlaying ? (
            <div className="w-full h-full relative">
              <iframe
                src={videoUrl}
                title={title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <button
                type="button"
                onClick={() => setIsPlaying(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 transition-colors z-20"
                aria-label="Close video"
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <>
              <img
                src={thumbnail}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/30 transition-colors flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  className="w-20 h-20 rounded-full bg-white/95 text-indigo-600 flex items-center justify-center pl-1 shadow-2xl group-hover:scale-110 active:scale-95 transition-all cursor-pointer ring-8 ring-white/20"
                  aria-label="Play video"
                >
                  <Play size={32} className="fill-indigo-600" />
                </button>
              </div>
              <div className="absolute bottom-4 left-6 text-xs text-slate-300 font-semibold bg-slate-900/60 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-700/60">
                <span>Watch Film (3:45)</span>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
