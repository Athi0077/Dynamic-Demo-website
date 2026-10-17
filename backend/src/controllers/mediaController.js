import { Media } from '../models/Media.js';

/**
 * @desc    Get all media files
 * @route   GET /api/admin/media
 * @access  Private (Admin)
 */
export const getMedia = async (req, res) => {
  try {
    const { category, search } = req.query;
    const query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const mediaList = await Media.find(query).sort({ createdAt: -1 });
    return res.status(200).json(mediaList);
  } catch (error) {
    console.error('[Media Controller] getMedia error:', error);
    return res.status(500).json({ error: 'Failed to fetch media assets.' });
  }
};

/**
 * @desc    Record uploaded image metadata
 * @route   POST /api/admin/media
 * @access  Private (Admin)
 */
export const addMedia = async (req, res) => {
  try {
    const { url, publicId, name, size, dimensions, category } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'Media URL is required.' });
    }

    const newMedia = new Media({
      url,
      publicId: publicId || '',
      name: name || 'Uploaded Image',
      size: size || '1.0 MB',
      dimensions: dimensions || '1920 × 1080',
      category: category || 'General',
      uploadedBy: req.admin?._id,
    });

    const saved = await newMedia.save();
    return res.status(201).json(saved);
  } catch (error) {
    console.error('[Media Controller] addMedia error:', error);
    return res.status(500).json({ error: 'Failed to record media asset.' });
  }
};

/**
 * @desc    Delete media record
 * @route   DELETE /api/admin/media/:id
 * @access  Private (Admin)
 */
export const deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);

    if (!media) {
      return res.status(404).json({ error: 'Media file not found.' });
    }

    await Media.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: 'Media asset deleted successfully.' });
  } catch (error) {
    console.error('[Media Controller] deleteMedia error:', error);
    return res.status(500).json({ error: 'Failed to delete media asset.' });
  }
};
