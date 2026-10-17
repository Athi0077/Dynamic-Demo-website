import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'qnyt9vnl',
  api_key: process.env.CLOUDINARY_API_KEY || '473697861747978',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'g5eb2942cUQ1EneMPLrBTsVfWPA',
  secure: true,
});

/**
 * Upload an image (base64 string, data URL, or remote URL) to Cloudinary
 * @param {string} image - Base64 Data URL or remote URL
 * @param {object} options - Custom Cloudinary upload options
 * @returns {Promise<object>} Upload result
 */
export const uploadToCloudinary = async (image, options = {}) => {
  try {
    const uploadOptions = {
      folder: 'nova_cms',
      resource_type: 'image',
      transformation: [
        { quality: 'auto', fetch_format: 'auto' },
      ],
      ...options,
    };

    const result = await cloudinary.uploader.upload(image, uploadOptions);
    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      width: result.width,
      height: result.height,
      bytes: result.bytes,
    };
  } catch (error) {
    console.error('[Cloudinary Upload Error]:', error);
    return {
      success: false,
      error: error.message || 'Failed to upload image to Cloudinary.',
    };
  }
};

/**
 * Delete an image asset from Cloudinary
 * @param {string} publicId
 * @returns {Promise<object>}
 */
export const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return { success: true };
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return { success: true, result };
  } catch (error) {
    console.warn('[Cloudinary Delete Warning]:', error.message);
    return { success: false, error: error.message };
  }
};

export default cloudinary;
