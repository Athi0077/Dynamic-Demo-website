import React from 'react';
import { useWebsite } from '../../../context/WebsiteContext';
import { PageRenderer } from '../../common/PageRenderer';
import { PreviewSectionWrapper } from './PreviewSectionWrapper';
import { Navbar } from '../../sections/Navbar';
import { Footer } from '../../sections/Footer';
import { siteConfig } from '../../../data/siteConfig';

export const LivePreview = ({
  previewDevice = 'desktop',
  selectedSectionId,
  onSelectSection,
}) => {
  const { sections } = useWebsite();

  // Device frame styles
  const deviceContainerClasses = {
    desktop: 'w-full min-h-screen bg-slate-50',
    tablet: 'w-[768px] mx-auto my-8 bg-slate-50 rounded-3xl shadow-2xl border-8 border-slate-800 overflow-hidden',
    mobile: 'w-[375px] mx-auto my-8 bg-slate-50 rounded-4xl shadow-2xl border-10 border-slate-900 overflow-hidden',
  };

  return (
    <div className="flex-1 bg-slate-100 overflow-y-auto relative flex justify-center p-2 sm:p-4">
      <div
        className={`transition-all duration-300 relative ${
          deviceContainerClasses[previewDevice] || deviceContainerClasses.desktop
        }`}
      >
        {/* Device Notch / Camera on Mobile */}
        {previewDevice === 'mobile' && (
          <div className="w-32 h-4 bg-slate-900 mx-auto rounded-b-xl mb-1 sticky top-0 z-50 flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block mr-2" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700 inline-block" />
          </div>
        )}

        {/* 1. Static Navbar (Sticky inside preview frame) */}
        <Navbar config={siteConfig.navbar} isEditor={true} />

        {/* 2. Dynamically Rendered Homepage Sections via PageRenderer */}
        <main className="flex-grow">
          <PageRenderer
            sections={sections}
            isEditor={true}
            selectedSectionId={selectedSectionId}
            onSelectSection={onSelectSection}
            WrapperComponent={PreviewSectionWrapper}
          />
        </main>

        {/* 3. Static Fixed Footer */}
        <Footer config={siteConfig.footer} />
      </div>
    </div>
  );
};
