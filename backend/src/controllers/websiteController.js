import { Website } from '../models/Website.js';

/**
 * @desc    Get public website configuration (ONLY publishedConfig)
 * @route   GET /api/website
 * @access  Public
 */
export const getPublicWebsite = async (req, res) => {
  try {
    const slug = req.query.slug || 'nova';
    const website = await Website.findOne({ slug });

    if (!website) {
      return res.status(404).json({ error: 'Website not found.' });
    }

    // Strictly return publishedConfig only! Public visitors must never see uncommitted drafts
    const publicResponse = {
      name: website.name,
      slug: website.slug,
      status: website.status,
      sections: website.publishedConfig?.sections || [],
      settings: {
        ...(website.settings || {}),
        ...(website.publishedConfig?.settings || {}),
      },
      publishedAt: website.publishedAt,
    };

    return res.status(200).json(publicResponse);
  } catch (error) {
    console.error('[Website Controller] getPublicWebsite error:', error);
    return res.status(500).json({ error: 'Failed to fetch public website configuration.' });
  }
};

/**
 * @desc    Get complete website document for Admin Editor (draft + published)
 * @route   GET /api/admin/website
 * @access  Private (Admin)
 */
export const getAdminWebsite = async (req, res) => {
  try {
    const slug = req.query.slug || 'nova';
    let website = await Website.findOne({ slug });

    if (!website) {
      return res.status(404).json({ error: 'Website not found.' });
    }

    return res.status(200).json(website);
  } catch (error) {
    console.error('[Website Controller] getAdminWebsite error:', error);
    return res.status(500).json({ error: 'Failed to fetch website administration data.' });
  }
};

/**
 * @desc    Save working draft configuration without publishing
 * @route   PUT /api/admin/website/draft
 * @access  Private (Admin)
 */
export const saveDraftWebsite = async (req, res) => {
  try {
    const slug = req.body.slug || 'nova';
    const { sections, settings } = req.body;

    if (!sections || !Array.isArray(sections)) {
      return res.status(400).json({ error: 'Invalid payload: sections must be an array.' });
    }

    let website = await Website.findOne({ slug });

    if (!website) {
      return res.status(404).json({ error: 'Website not found.' });
    }

    website.draftConfig = {
      sections,
      settings: settings || website.draftConfig?.settings || {},
      updatedAt: new Date(),
    };
    website.status = 'draft';

    const saved = await website.save();

    return res.status(200).json({
      message: 'Draft saved successfully.',
      website: saved,
      savedAt: saved.draftConfig.updatedAt,
    });
  } catch (error) {
    console.error('[Website Controller] saveDraftWebsite error:', error);
    return res.status(500).json({ error: 'Failed to save website draft.' });
  }
};

/**
 * @desc    Publish website (copy draftConfig -> publishedConfig)
 * @route   POST /api/admin/website/publish
 * @access  Private (Admin)
 */
export const publishWebsite = async (req, res) => {
  try {
    const slug = req.body.slug || 'nova';
    let website = await Website.findOne({ slug });

    if (!website) {
      return res.status(404).json({ error: 'Website not found.' });
    }

    const currentDraftSections = website.draftConfig?.sections || [];
    const currentDraftSettings = website.draftConfig?.settings || {};
    const now = new Date();

    // Copy draft to published
    website.publishedConfig = {
      sections: currentDraftSections,
      settings: currentDraftSettings,
      publishedAt: now,
    };
    website.publishedAt = now;
    website.status = 'published';

    const saved = await website.save();

    return res.status(200).json({
      message: 'Website published successfully! Changes are live on the storefront.',
      website: saved,
      publishedAt: now,
      sectionCount: currentDraftSections.length,
    });
  } catch (error) {
    console.error('[Website Controller] publishWebsite error:', error);
    return res.status(500).json({ error: 'Failed to publish website.' });
  }
};
