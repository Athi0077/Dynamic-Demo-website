import React, { useState, useEffect } from 'react';
import { PageRenderer } from '../components/common/PageRenderer';
import { initialPageSections } from '../context/WebsiteContext';
import { websiteService } from '../services/websiteService';
import { siteConfig } from '../data/siteConfig';

// Static Fixed Sections
import { Navbar } from '../components/sections/Navbar';
import { Footer } from '../components/sections/Footer';

// Interactive UI Overlays
import { CartDrawer } from '../components/common/CartDrawer';
import { SearchModal } from '../components/common/SearchModal';
import { Toast } from '../components/common/Toast';

export const Home = () => {
  // Storefront displays strictly publishedConfig from backend API
  const [publishedSections, setPublishedSections] = useState(() => {
    try {
      const cached = localStorage.getItem('nova_published_config');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed?.sections) && parsed.sections.length > 0) {
          return parsed.sections;
        }
      }
    } catch (e) {
      console.warn('Failed reading cached published config:', e);
    }
    return initialPageSections;
  });

  const [navbarConfig, setNavbarConfig] = useState(siteConfig.navbar);
  const [footerConfig, setFooterConfig] = useState(siteConfig.footer);

  // Fetch latest published configuration on load
  useEffect(() => {
    let isMounted = true;

    websiteService.getPublicWebsite('nova').then((res) => {
      if (!isMounted) return;
      if (res.success && res.data) {
        if (Array.isArray(res.data.sections) && res.data.sections.length > 0) {
          setPublishedSections(res.data.sections);
        }
        if (res.data.settings?.navbar) {
          setNavbarConfig((prev) => ({ ...prev, ...res.data.settings.navbar }));
        }
        if (res.data.settings?.footer) {
          setFooterConfig((prev) => ({ ...prev, ...res.data.settings.footer }));
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* 1. FIXED NAVBAR */}
      <Navbar config={navbarConfig} />

      {/* 2. DYNAMIC HOMEPAGE SECTIONS - Strictly rendered from publishedConfig */}
      <main className="flex-grow">
        <PageRenderer sections={publishedSections} isEditor={false} />
      </main>

      {/* 3. FIXED FOOTER */}
      <Footer config={footerConfig} />

      {/* Interactive Overlays */}
      <CartDrawer />
      <SearchModal />
      <Toast />
    </div>
  );
};

export default Home;
