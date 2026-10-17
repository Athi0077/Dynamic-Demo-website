import { api } from './api';

const DRAFT_STORAGE_KEY = 'nova_page_builder_config';
const PUBLISHED_STORAGE_KEY = 'nova_published_config';

/**
 * Service to manage Website CMS data with offline-first localStorage fallback
 */
export const websiteService = {
  /**
   * Fetch the public website configuration (strictly publishedConfig)
   */
  async getPublicWebsite(slug = 'nova') {
    const res = await api.get(`/website?slug=${slug}`);
    if (res.success && res.data) {
      // Cache the latest published configuration locally for offline resilience
      try {
        localStorage.setItem(PUBLISHED_STORAGE_KEY, JSON.stringify(res.data));
      } catch (e) {
        console.warn('Could not cache published config to localStorage:', e);
      }
      return { success: true, data: res.data, isLocal: false };
    }

    // Offline / Network fallback
    console.warn('[websiteService] Backend offline or unavailable, checking localStorage...');
    try {
      const cached = localStorage.getItem(PUBLISHED_STORAGE_KEY) || localStorage.getItem(DRAFT_STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        return {
          success: true,
          data: {
            name: 'NOVA',
            slug: 'nova',
            status: 'published',
            sections: parsed.sections || [],
            settings: parsed.settings || {},
            publishedAt: parsed.publishedAt || new Date().toISOString(),
          },
          isLocal: true,
        };
      }
    } catch (e) {
      console.warn('Failed reading fallback config:', e);
    }

    return { success: false, error: res.error || 'Failed to fetch public website configuration.' };
  },

  /**
   * Fetch the complete website document for the visual editor (draftConfig + publishedConfig)
   */
  async getAdminWebsite(slug = 'nova') {
    const res = await api.get(`/admin/website?slug=${slug}`);
    if (res.success && res.data) {
      return { success: true, data: res.data, isLocal: false };
    }

    // Offline fallback: load from draft localStorage
    try {
      const cached = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        return {
          success: true,
          data: {
            name: 'NOVA',
            slug: 'nova',
            status: parsed.status || 'draft',
            draftConfig: {
              sections: parsed.sections || [],
              settings: parsed.settings || {},
              updatedAt: parsed.updatedAt || new Date().toISOString(),
            },
            publishedConfig: {
              sections: parsed.sections || [],
              settings: parsed.settings || {},
              publishedAt: parsed.publishedAt || new Date().toISOString(),
            },
            publishedAt: parsed.publishedAt || new Date().toISOString(),
          },
          isLocal: true,
        };
      }
    } catch (e) {
      console.warn('Failed reading draft from localStorage:', e);
    }

    return { success: false, error: res.error || 'Failed to fetch website administration data.' };
  },

  /**
   * Save working draft configuration
   */
  async saveDraft(sections, settings = {}, slug = 'nova') {
    // 1. Immediately persist to localStorage for zero-latency local recovery
    try {
      const localPayload = {
        page: 'home',
        slug,
        status: 'draft',
        updatedAt: new Date().toISOString(),
        sections,
        settings,
      };
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(localPayload));
    } catch (e) {
      console.warn('Failed writing draft to localStorage:', e);
    }

    // 2. Persist to MongoDB backend
    const res = await api.put('/admin/website/draft', { slug, sections, settings });
    if (res.success) {
      return { success: true, data: res.data, isLocal: false };
    }

    // If backend is offline, report local success with offline indicator
    if (res.isOffline) {
      return {
        success: true,
        data: { message: 'Draft saved locally (Backend offline)' },
        isLocal: true,
      };
    }

    return { success: false, error: res.error || 'Failed to save draft to server.' };
  },

  /**
   * Publish current draft configuration to live storefront
   */
  async publishWebsite(slug = 'nova', currentSections = null, currentSettings = {}) {
    // 1. First ensure current draft is stored locally
    if (currentSections) {
      try {
        const localPayload = {
          name: 'NOVA',
          slug,
          status: 'published',
          publishedAt: new Date().toISOString(),
          sections: currentSections,
          settings: currentSettings,
        };
        localStorage.setItem(PUBLISHED_STORAGE_KEY, JSON.stringify(localPayload));
        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(localPayload));
      } catch (e) {
        console.warn('Failed updating localStorage publish cache:', e);
      }
    }

    // 2. Call backend publish endpoint
    const res = await api.post('/admin/website/publish', { slug });
    if (res.success) {
      return { success: true, data: res.data, isLocal: false };
    }

    if (res.isOffline) {
      return {
        success: true,
        data: { message: 'Published locally (Backend offline)' },
        isLocal: true,
      };
    }

    return { success: false, error: res.error || 'Failed to publish website.' };
  },

  /**
   * Fetch media assets from backend
   */
  async getMedia(category = 'All', search = '') {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.append('category', category);
    if (search) params.append('search', search);

    const queryStr = params.toString() ? `?${params.toString()}` : '';
    const res = await api.get(`/admin/media${queryStr}`);
    return res;
  },

  /**
   * Upload image through backend to Cloudinary and automatically save record to MongoDB
   */
  async uploadMedia(uploadPayload) {
    const res = await api.post('/admin/media/upload', uploadPayload);
    return res;
  },

  /**
   * Save newly uploaded image metadata to backend
   */
  async addMedia(mediaData) {
    const res = await api.post('/admin/media', mediaData);
    return res;
  },

  /**
   * Delete media asset by ID
   */
  async deleteMedia(id) {
    const res = await api.delete(`/admin/media/${id}`);
    return res;
  },
};

export default websiteService;
