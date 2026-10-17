import { Media } from '../models/Media.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';

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
 * @desc    Upload image directly to Cloudinary and save record into MongoDB
 * @route   POST /api/admin/media/upload
 * @access  Private (Admin)
 */
export const uploadMedia = async (req, res) => {
  try {
    const { image, name, category } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'Image file or data is required.' });
    }

    // 1. Upload to Cloudinary
    const cloudRes = await uploadToCloudinary(image, {
      folder: 'nova_cms',
    });

    if (!cloudRes.success) {
      return res.status(500).json({
        error: cloudRes.error || 'Failed to upload image to Cloudinary.',
      });
    }

    // 2. Format size & dimensions
    const sizeMb = cloudRes.bytes
      ? `${(cloudRes.bytes / (1024 * 1024)).toFixed(2)} MB`
      : '1.0 MB';

    const dimensions =
      cloudRes.width && cloudRes.height
        ? `${cloudRes.width} × ${cloudRes.height}`
        : '1920 × 1080';

    // 3. Save metadata into MongoDB
    const newMedia = new Media({
      url: cloudRes.url,
      publicId: cloudRes.publicId,
      name: name || `Image-${Date.now()}`,
      size: sizeMb,
      dimensions: dimensions,
      category: category || 'General',
      uploadedBy: req.admin?._id,
    });

    const savedMedia = await newMedia.save();

    return res.status(201).json({
      success: true,
      message: 'Image stored in Cloudinary and saved to MongoDB.',
      url: savedMedia.url,
      publicId: savedMedia.publicId,
      media: savedMedia,
    });
  } catch (error) {
    console.error('[Media Controller] uploadMedia error:', error);
    return res.status(500).json({
      error: error.message || 'Failed to process image upload.',
    });
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
 * @desc    Delete media record from MongoDB and Cloudinary
 * @route   DELETE /api/admin/media/:id
 * @access  Private (Admin)
 */
export const deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);

    if (!media) {
      return res.status(404).json({ error: 'Media file not found.' });
    }

    // Also remove file from Cloudinary CDN if publicId is stored
    if (media.publicId) {
      await deleteFromCloudinary(media.publicId);
    }

    await Media.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: 'Media asset deleted successfully.' });
  } catch (error) {
    console.error('[Media Controller] deleteMedia error:', error);
    return res.status(500).json({ error: 'Failed to delete media asset.' });
  }
};
