import React, { useState } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import { EasyEditToolbar } from '../../components/admin/easyEdit/EasyEditToolbar';
import { EasySectionWrapper } from '../../components/admin/easyEdit/EasySectionWrapper';
import { EasyFloatingEditor } from '../../components/admin/easyEdit/EasyFloatingEditor';
import { AddSectionModal } from '../../components/admin/editor/AddSectionModal';
import { siteConfig } from '../../data/siteConfig';

// Storefront Fixed Components
import { Navbar } from '../../components/sections/Navbar';
import { Footer } from '../../components/sections/Footer';
import { CartDrawer } from '../../components/common/CartDrawer';
import { SearchModal } from '../../components/common/SearchModal';
import { Toast } from '../../components/common/Toast';

// Section Components
import { Hero } from '../../components/sections/Hero';
import { ProductSection } from '../../components/sections/ProductSection';
import { ImageTextSection } from '../../components/sections/ImageTextSection';
import { OfferBanner } from '../../components/sections/OfferBanner';
import { FeaturedProducts } from '../../components/sections/FeaturedProducts';
import { Testimonials } from '../../components/sections/Testimonials';
import { CTASection } from '../../components/sections/CTASection';
import { TextSection } from '../../components/sections/TextSection';
import { ImageSection } from '../../components/sections/ImageSection';
import { VideoSection } from '../../components/sections/VideoSection';
import { GallerySection } from '../../components/sections/GallerySection';
import { FAQSection } from '../../components/sections/FAQSection';
import { ContactSection } from '../../components/sections/ContactSection';

// Component registry mapping section type to component
const componentMap = {
  hero: Hero,
  products: ProductSection,
  'image-text': ImageTextSection,
  'offer-banner': OfferBanner,
  featured: FeaturedProducts,
  testimonials: Testimonials,
  cta: CTASection,
  text: TextSection,
  image: ImageSection,
  video: VideoSection,
  gallery: GallerySection,
  faq: FAQSection,
  contact: ContactSection,
};

export const EasyEdit = () => {
  const { sections, addSection } = useWebsite();

  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [activeEditSectionId, setActiveEditSectionId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Active section currently open in the floating editor
  const activeSection = sections.find((s) => s.id === activeEditSectionId) || null;
  const activeSectionIndex = sections.findIndex((s) => s.id === activeEditSectionId);

  const handleOpenEditor = (id) => {
    setSelectedSectionId(id);
    setActiveEditSectionId(id);
  };

  const handleCloseEditor = () => {
    setActiveEditSectionId(null);
  };

  const handleAddSection = (templateType) => {
    const newSec = addSection(templateType);
    if (newSec) {
      setSelectedSectionId(newSec.id);
      setActiveEditSectionId(newSec.id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-indigo-600 selection:text-white">
      {/* 1. TOP EASY EDIT TOOLBAR */}
      <EasyEditToolbar
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        onOpenAddModal={() => setIsAddModalOpen(true)}
      />

      {/* 2. LIVE STOREFRONT NAVBAR (Sticky inside page) */}
      <Navbar config={siteConfig.navbar} isEditor={true} />

      {/* 3. DYNAMIC HOMEPAGE SECTIONS WRAPPED FOR IN-PAGE EDITING */}
      <main className="flex-grow">
        {sections.map((section, idx) => {
          const SectionComponent = componentMap[section.type];
          if (!SectionComponent) return null;

          const sectionProps = {
            content: section.content,
            settings: section.settings,
            config: { ...(section.content || {}), ...(section.settings || {}) },
          };

          if (isEditMode) {
            return (
              <EasySectionWrapper
                key={section.id}
                section={section}
                index={idx}
                totalSections={sections.length}
                isSelected={selectedSectionId === section.id}
                onSelect={(id) => setSelectedSectionId(id)}
                onOpenEditor={handleOpenEditor}
              >
                <SectionComponent {...sectionProps} />
              </EasySectionWrapper>
            );
          }

          // Clean preview mode without edit borders
          return (
            <div key={section.id}>
              <SectionComponent {...sectionProps} />
            </div>
          );
        })}
      </main>

      {/* 4. LIVE STOREFRONT FOOTER */}
      <Footer config={siteConfig.footer} />

      {/* 5. FLOATING IN-PLACE CUSTOMIZER MODAL */}
      {activeSection && (
        <EasyFloatingEditor
          section={activeSection}
          index={activeSectionIndex}
          totalSections={sections.length}
          onClose={handleCloseEditor}
        />
      )}

      {/* 6. ADD SECTION MODAL */}
      <AddSectionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddSection={handleAddSection}
      />

      {/* Interactive Overlays */}
      <CartDrawer />
      <SearchModal />
      <Toast />
    </div>
  );
};

export default EasyEdit;
