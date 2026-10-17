/* oxlint-disable react/only-export-components */
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { templateRegistry, createSectionFromTemplate } from '../data/templates';
import { mainProducts, featuredProducts } from '../data/products';
import { testimonialsData } from '../data/testimonials';
import { websiteService } from '../services/websiteService';

export const WebsiteContext = createContext(null);

// Initial 7 Homepage Sections conforming to the unified schema
export const initialPageSections = [
  {
    id: 'hero-1',
    type: 'hero',
    name: 'Hero Section',
    order: 1,
    enabled: true,
    icon: 'Sparkles',
    content: {
      badge: 'New Season 2026 Collection',
      headline: 'Curated Elegance for the Modern Lifestyle.',
      description: 'Discover thoughtfully engineered essentials crafted with aerospace-grade precision and timeless minimalist aesthetics.',
      primaryCta: { text: 'Shop Now', href: '#products' },
      secondaryCta: { text: 'Explore Collection', href: '#featured' },
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1200&q=80',
      stats: [
        { value: '25K+', label: 'Happy Customers' },
        { value: '4.9/5', label: 'Customer Rating' },
        { value: '100%', label: 'Carbon Neutral' },
      ],
    },
    settings: {
      backgroundColor: '#fafafa',
      textColor: '#0f172a',
      headingFontSize: 56,
      descriptionFontSize: 18,
      buttonBgColor: '#0f172a',
      buttonTextColor: '#ffffff',
      alignment: 'left',
      sectionHeight: 110,
      spacing: 'medium',
    },
  },
  {
    id: 'products-1',
    type: 'products',
    name: 'Product Section',
    order: 2,
    enabled: true,
    icon: 'ShoppingBag',
    content: {
      badge: 'Curated Catalogue',
      title: 'Our Products',
      subtitle: 'Signature pieces engineered for daily comfort, uncompromising durability, and pure aesthetic harmony.',
      displayCount: 4,
      items: mainProducts.map((p) => ({ ...p, visible: true })),
    },
    settings: {
      backgroundColor: '#f8fafc',
      textColor: '#0f172a',
      spacing: 'medium',
    },
  },
  {
    id: 'image-text-1',
    type: 'image-text',
    name: 'Image + Text Section',
    order: 3,
    enabled: true,
    icon: 'Layout',
    content: {
      badge: 'The NOVA Standard',
      title: 'Sculpted with Precision. Crafted for Everyday Life.',
      description: 'We believe everyday objects should inspire you. Every seam, edge, and surface is meticulously calibrated to deliver tactile delight and lifelong durability.',
      image: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&w=1000&q=80',
      imagePosition: 'left',
      buttonText: 'Discover The Craft',
      buttonLink: '#products',
      bullets: [
        { title: 'Precision CNC Machining', text: 'Zero-tolerance tolerances engineered for tactile perfection.' },
        { title: 'Sustainable Sourcing', text: '100% recyclable packaging and ethically audited partners.' },
        { title: 'Ergonomic Excellence', text: 'Designed in collaboration with ergonomic specialists.' },
      ],
    },
    settings: {
      backgroundColor: '#ffffff',
      textColor: '#0f172a',
      headingFontSize: 36,
      descriptionFontSize: 16,
      buttonBgColor: '#0f172a',
      buttonTextColor: '#ffffff',
      contentWidth: 'medium',
      spacing: 'medium',
    },
  },
  {
    id: 'offer-banner-1',
    type: 'offer-banner',
    name: 'Offer Banner',
    order: 4,
    enabled: true,
    icon: 'Tag',
    content: {
      badge: 'LIMITED TIME EXCLUSIVE',
      title: 'Special Collection — Up to 40% Off',
      description: 'Upgrade your workspace and daily carry today. Claim complimentary express delivery on all orders over $100.',
      buttonText: 'Explore Offers',
      buttonLink: '#products',
      codeBadge: 'CODE: NOVA40',
      validityText: 'Offer expires in 48 hours • Free returns included',
      bannerImage: '',
    },
    settings: {
      backgroundColor: '#0f172a',
      textColor: '#ffffff',
      buttonColor: '#ffffff',
      buttonTextColor: '#0f172a',
      spacing: 'medium',
    },
  },
  {
    id: 'featured-1',
    type: 'featured',
    name: 'Featured Products',
    order: 5,
    enabled: true,
    icon: 'Star',
    content: {
      badge: 'Editor’s Choice',
      title: 'Featured Collection',
      subtitle: 'Our most acclaimed and award-winning designs, voted favorites by design professionals worldwide.',
      items: featuredProducts.map((p) => ({ ...p, visible: true })),
    },
    settings: {
      backgroundColor: '#ffffff',
      textColor: '#0f172a',
      spacing: 'medium',
    },
  },
  {
    id: 'testimonials-1',
    type: 'testimonials',
    name: 'Testimonial Section',
    order: 6,
    enabled: true,
    icon: 'MessageSquare',
    content: {
      badge: 'Verified Reviews',
      title: 'What Our Customers Say',
      subtitle: 'Join over 25,000 creators, engineers, and designers who trust NOVA daily.',
      items: testimonialsData.map((t) => ({ ...t })),
    },
    settings: {
      backgroundColor: '#f8fafc',
      cardBackground: '#ffffff',
      textColor: '#0f172a',
      spacing: 'medium',
    },
  },
  {
    id: 'cta-1',
    type: 'cta',
    name: 'CTA Section',
    order: 7,
    enabled: true,
    icon: 'Compass',
    content: {
      badge: 'Get Started Today',
      title: 'Ready to Explore NOVA?',
      description: 'Experience design purity and uncompromising craftsmanship. Elevate your everyday routine with our newest releases.',
      buttonText: 'Start Shopping',
      buttonLink: '#products',
      secondaryButtonText: 'Explore Collection',
      secondaryButtonLink: '#featured',
      guaranteeText: '30-Day Money-Back Guarantee • Free Global Shipping • 24/7 Concierge Support',
    },
    settings: {
      backgroundColor: '#0f172a',
      textColor: '#ffffff',
      buttonColor: '#ffffff',
      buttonTextColor: '#0f172a',
      spacing: 'medium',
    },
  },
];

export const WebsiteProvider = ({ children }) => {
  // Load unified page sections state
  const [sections, setSections] = useState(() => {
    try {
      const stored = localStorage.getItem('nova_page_builder_config');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed?.sections)) {
          return parsed.sections;
        }
      }
    } catch (e) {
      console.warn('Failed to parse nova_page_builder_config:', e);
    }
    return initialPageSections;
  });

  // Undo / Redo history stacks
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  // Persistence & Draft / Publish state
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [websiteStatus, setWebsiteStatus] = useState('published');
  const [publishedAt, setPublishedAt] = useState(null);
  const [lastSaved, setLastSaved] = useState(null);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  // Keep a ref to current sections for callbacks and auto-save
  const sectionsRef = useRef(sections);
  useEffect(() => {
    sectionsRef.current = sections;
  }, [sections]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  };

  /**
   * Load live website data from backend on mount
   */
  useEffect(() => {
    let isMounted = true;
    const token = localStorage.getItem('nova_admin_token') || sessionStorage.getItem('nova_admin_token');

    if (token) {
      websiteService.getAdminWebsite('nova').then((res) => {
        if (!isMounted) return;
        if (res.success && res.data) {
          const adminDoc = res.data;
          if (Array.isArray(adminDoc.draftConfig?.sections) && adminDoc.draftConfig.sections.length > 0) {
            setSections(adminDoc.draftConfig.sections);
          }
          if (adminDoc.status) {
            setWebsiteStatus(adminDoc.status);
          }
          if (adminDoc.publishedAt) {
            setPublishedAt(adminDoc.publishedAt);
          }
          if (adminDoc.draftConfig?.updatedAt) {
            setLastSaved(adminDoc.draftConfig.updatedAt);
          }
        }
      });
    } else {
      // Public / unauthenticated visitor loads published configuration
      websiteService.getPublicWebsite('nova').then((res) => {
        if (!isMounted) return;
        if (res.success && res.data) {
          if (Array.isArray(res.data.sections) && res.data.sections.length > 0) {
            setSections(res.data.sections);
          }
          if (res.data.status) {
            setWebsiteStatus(res.data.status);
          }
          if (res.data.publishedAt) {
            setPublishedAt(res.data.publishedAt);
          }
        }
      });
    }

    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * Push current snapshot to undo stack before mutation
   */
  const pushUndoSnapshot = useCallback((currentSections) => {
    setUndoStack((prev) => [JSON.parse(JSON.stringify(currentSections)), ...prev.slice(0, 24)]);
    setRedoStack([]); // Clear redo stack on new action
    setHasUnsavedChanges(true);
  }, []);

  /**
   * Recalculates order (1, 2, 3...) for an array of sections
   */
  const recalculateOrder = (sectionList) => {
    return sectionList.map((sec, idx) => ({
      ...sec,
      order: idx + 1,
    }));
  };

  /**
   * Reorder sections after drag-and-drop
   */
  const reorderSections = (newOrderedList) => {
    pushUndoSnapshot(sections);
    const ordered = recalculateOrder(newOrderedList);
    setSections(ordered);
    setHasUnsavedChanges(true);
  };

  /**
   * Add a new section instance from template
   */
  const addSection = (templateType, targetIndex = null) => {
    pushUndoSnapshot(sections);
    const newSection = createSectionFromTemplate(templateType, sections.length + 1);

    let updatedList;
    if (targetIndex !== null && targetIndex >= 0 && targetIndex <= sections.length) {
      updatedList = [
        ...sections.slice(0, targetIndex),
        newSection,
        ...sections.slice(targetIndex),
      ];
    } else {
      updatedList = [...sections, newSection];
    }

    const ordered = recalculateOrder(updatedList);
    setSections(ordered);
    setHasUnsavedChanges(true);
    showToast(`Added new ${newSection.name}!`);
    return newSection;
  };

  /**
   * Delete a section by unique ID
   */
  const deleteSection = (sectionId) => {
    const target = sections.find((s) => s.id === sectionId);
    if (!target) return;

    pushUndoSnapshot(sections);
    const updated = sections.filter((s) => s.id !== sectionId);
    const ordered = recalculateOrder(updated);
    setSections(ordered);
    setHasUnsavedChanges(true);
    showToast(`Removed "${target.name}".`);
  };

  /**
   * Duplicate a section by unique ID
   */
  const duplicateSection = (sectionId) => {
    const originalIndex = sections.findIndex((s) => s.id === sectionId);
    if (originalIndex === -1) return;

    const original = sections[originalIndex];
    pushUndoSnapshot(sections);

    const uniqueSuffix = Date.now().toString(36).slice(-4) + Math.random().toString(36).slice(-3);
    const duplicated = {
      ...JSON.parse(JSON.stringify(original)),
      id: `${original.type}-${uniqueSuffix}`,
      name: `${original.name} (Copy)`,
      order: originalIndex + 2,
    };

    const updated = [
      ...sections.slice(0, originalIndex + 1),
      duplicated,
      ...sections.slice(originalIndex + 1),
    ];

    const ordered = recalculateOrder(updated);
    setSections(ordered);
    setHasUnsavedChanges(true);
    showToast(`Duplicated "${original.name}"!`);
    return duplicated;
  };

  /**
   * Toggle visibility of a section (Hide / Show)
   */
  const toggleSectionVisibility = (sectionId) => {
    pushUndoSnapshot(sections);
    setSections((prev) =>
      prev.map((sec) =>
        sec.id === sectionId ? { ...sec, enabled: !sec.enabled } : sec
      )
    );
    setHasUnsavedChanges(true);
  };

  /**
   * Update content of a section
   */
  const updateSectionContent = (sectionId, partialContent) => {
    setSections((prev) =>
      prev.map((sec) => {
        if (sec.id === sectionId) {
          return {
            ...sec,
            content: {
              ...(sec.content || {}),
              ...partialContent,
            },
          };
        }
        return sec;
      })
    );
    setHasUnsavedChanges(true);
  };

  /**
   * Update settings (colors, alignment, spacing) of a section
   */
  const updateSectionSettings = (sectionId, partialSettings) => {
    setSections((prev) =>
      prev.map((sec) => {
        if (sec.id === sectionId) {
          return {
            ...sec,
            settings: {
              ...(sec.settings || {}),
              ...partialSettings,
            },
          };
        }
        return sec;
      })
    );
    setHasUnsavedChanges(true);
  };

  /**
   * Update a specific product item inside a section
   */
  const updateProductItem = (sectionId, productId, updatedFields) => {
    setSections((prev) =>
      prev.map((sec) => {
        if (sec.id === sectionId && sec.content?.items) {
          const updatedItems = sec.content.items.map((item) =>
            item.id === productId ? { ...item, ...updatedFields } : item
          );
          return {
            ...sec,
            content: {
              ...sec.content,
              items: updatedItems,
            },
          };
        }
        return sec;
      })
    );
    setHasUnsavedChanges(true);
  };

  /**
   * Update a specific testimonial item inside a section
   */
  const updateTestimonialItem = (sectionId, testimonialId, updatedFields) => {
    setSections((prev) =>
      prev.map((sec) => {
        if (sec.id === sectionId && sec.content?.items) {
          const updatedItems = sec.content.items.map((item) =>
            item.id === testimonialId ? { ...item, ...updatedFields } : item
          );
          return {
            ...sec,
            content: {
              ...sec.content,
              items: updatedItems,
            },
          };
        }
        return sec;
      })
    );
    setHasUnsavedChanges(true);
  };

  /**
   * Reset a section to template defaults
   */
  const resetSectionToTemplate = (sectionId) => {
    const target = sections.find((s) => s.id === sectionId);
    if (!target) return;

    const template = templateRegistry.find((t) => t.type === target.type);
    if (!template) return;

    pushUndoSnapshot(sections);
    setSections((prev) =>
      prev.map((sec) => {
        if (sec.id === sectionId) {
          return {
            ...sec,
            content: JSON.parse(JSON.stringify(template.defaultContent || {})),
            settings: JSON.parse(JSON.stringify(template.defaultSettings || {})),
          };
        }
        return sec;
      })
    );
    setHasUnsavedChanges(true);
    showToast(`Reset "${target.name}" to default content.`);
  };

  /**
   * Undo last action
   */
  const undo = () => {
    if (undoStack.length === 0) return;
    const previous = undoStack[0];
    setRedoStack((prev) => [JSON.parse(JSON.stringify(sections)), ...prev]);
    setUndoStack((prev) => prev.slice(1));
    setSections(previous);
    setHasUnsavedChanges(true);
    showToast('Undo action');
  };

  /**
   * Redo action
   */
  const redo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[0];
    setUndoStack((prev) => [JSON.parse(JSON.stringify(sections)), ...prev]);
    setRedoStack((prev) => prev.slice(1));
    setSections(next);
    setHasUnsavedChanges(true);
    showToast('Redo action');
  };

  /**
   * Save Draft to MongoDB backend and localStorage
   */
  const saveDraft = async (silent = false) => {
    setIsSavingDraft(true);
    const currentSections = sectionsRef.current;

    try {
      const res = await websiteService.saveDraft(currentSections);
      setIsSavingDraft(false);

      if (res.success) {
        setHasUnsavedChanges(false);
        setWebsiteStatus('draft');
        setLastSaved(new Date().toISOString());
        if (!silent) {
          showToast(res.isLocal ? 'Draft saved locally (Offline mode)' : 'Draft saved to server successfully!');
        }
        return true;
      } else {
        if (!silent) showToast(res.error || 'Failed to save draft.');
        return false;
      }
    } catch (e) {
      console.error('Error during draft save:', e);
      setIsSavingDraft(false);
      if (!silent) showToast('Error saving draft.');
      return false;
    }
  };

  /**
   * Auto-save debounced effect: saves draft 1.5s after user stops typing/dragging
   */
  useEffect(() => {
    if (!hasUnsavedChanges) return;

    const timer = setTimeout(() => {
      saveDraft(true); // Silent auto-save
    }, 1500);

    return () => clearTimeout(timer);
  }, [sections, hasUnsavedChanges]);

  /**
   * Open / Close Publish Confirmation Modal
   */
  const openPublishModal = () => setIsPublishModalOpen(true);
  const closePublishModal = () => setIsPublishModalOpen(false);

  /**
   * Publish Website to live public view
   */
  const confirmPublish = async () => {
    setIsPublishing(true);
    const currentSections = sectionsRef.current;

    try {
      const res = await websiteService.publishWebsite('nova', currentSections);
      setIsPublishing(false);
      setIsPublishModalOpen(false);

      if (res.success) {
        setHasUnsavedChanges(false);
        setWebsiteStatus('published');
        const publishTime = res.data?.publishedAt || new Date().toISOString();
        setPublishedAt(publishTime);
        setLastSaved(publishTime);
        showToast('Website published successfully! Changes are live on the storefront.');
        return true;
      } else {
        showToast(res.error || 'Failed to publish website.');
        return false;
      }
    } catch (e) {
      console.error('Error during publish:', e);
      setIsPublishing(false);
      setIsPublishModalOpen(false);
      showToast('Error during publish operation.');
      return false;
    }
  };

  /**
   * Reset all sections to factory default configuration
   */
  const resetAll = () => {
    pushUndoSnapshot(sections);
    setSections(JSON.parse(JSON.stringify(initialPageSections)));
    setHasUnsavedChanges(true);
    showToast('Reset all sections to factory defaults.');
  };

  // Keyboard shortcut listener for Undo / Redo (Ctrl+Z / Ctrl+Y)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <WebsiteContext.Provider
      value={{
        sections,
        hasUnsavedChanges,
        isSavingDraft,
        isPublishing,
        websiteStatus,
        publishedAt,
        lastSaved,
        toastMessage,
        isPublishModalOpen,
        canUndo: undoStack.length > 0,
        canRedo: redoStack.length > 0,
        reorderSections,
        addSection,
        deleteSection,
        duplicateSection,
        toggleSectionVisibility,
        updateSectionContent,
        updateSectionSettings,
        updateProductItem,
        updateTestimonialItem,
        resetSectionToTemplate,
        undo,
        redo,
        saveDraft,
        openPublishModal,
        closePublishModal,
        confirmPublish,
        publishWebsite: openPublishModal, // Publish button triggers confirmation modal
        resetAll,
        showToast,
      }}
    >
      {children}
    </WebsiteContext.Provider>
  );
};

export const useWebsite = () => {
  const context = useContext(WebsiteContext);
  if (!context) {
    throw new Error('useWebsite must be used within a WebsiteProvider');
  }
  return context;
};
