import React from 'react';
import {
  Hero,
  ProductSection,
  ImageTextSection,
  OfferBanner,
  FeaturedProducts,
  Testimonials,
  CTASection,
  TextSection,
  ImageSection,
  VideoSection,
  GallerySection,
  FAQSection,
  ContactSection,
} from '../sections';

export const PageRenderer = ({
  sections = [],
  isEditor = false,
  selectedSectionId = null,
  onSelectSection = null,
  WrapperComponent = null,
}) => {
  // Sort sections by numeric order
  const sortedSections = [...sections].sort((a, b) => (a.order || 0) - (b.order || 0));

  // In public view, filter only enabled sections.
  // In editor view, display all but mark disabled ones visually.
  const displaySections = isEditor
    ? sortedSections
    : sortedSections.filter((sec) => sec.enabled !== false);

  const renderSectionComponent = (sec) => {
    // Merge section.content and section.settings so every section component receives full config
    const mergedConfig = {
      ...(sec.content || {}),
      ...(sec.settings || {}),
    };

    switch (sec.type) {
      case 'hero':
        return <Hero config={mergedConfig} />;

      case 'products':
        return (
          <ProductSection
            config={mergedConfig}
            products={mergedConfig.items || []}
          />
        );

      case 'image-text':
        return <ImageTextSection config={mergedConfig} />;

      case 'offer-banner':
        return <OfferBanner config={mergedConfig} />;

      case 'featured':
        return (
          <FeaturedProducts
            config={mergedConfig}
            products={mergedConfig.items || []}
          />
        );

      case 'testimonials':
        return (
          <Testimonials
            config={mergedConfig}
            testimonials={mergedConfig.items || []}
          />
        );

      case 'cta':
        return <CTASection config={mergedConfig} />;

      case 'text':
        return <TextSection config={mergedConfig} />;

      case 'image':
        return <ImageSection config={mergedConfig} />;

      case 'video':
        return <VideoSection config={mergedConfig} />;

      case 'gallery':
        return <GallerySection config={mergedConfig} />;

      case 'faq':
        return <FAQSection config={mergedConfig} />;

      case 'contact':
        return <ContactSection config={mergedConfig} />;

      default:
        return null;
    }
  };

  return (
    <>
      {displaySections.map((sec) => {
        const isSelected = selectedSectionId === sec.id;
        const rendered = renderSectionComponent(sec);

        if (!rendered) return null;

        // If in editor and a wrapper is provided, wrap with outline and selection behavior
        if (isEditor && WrapperComponent) {
          return (
            <WrapperComponent
              key={sec.id}
              section={sec}
              isSelected={isSelected}
              onSelect={onSelectSection}
            >
              {rendered}
            </WrapperComponent>
          );
        }

        return <div key={sec.id}>{rendered}</div>;
      })}
    </>
  );
};
