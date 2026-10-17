// Cloudinary Image Upload Utility
// Uploads via backend directly to Cloudinary and automatically persists to MongoDB Media collection
// Validates file formats (JPG, JPEG, PNG, WEBP) and maximum file size (5 MB)

import { api } from '../services/api';

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

/**
 * Validates an image file before upload
 * @param {File} file
 * @returns {{ valid: boolean, error?: string }}
 */
export const validateImageFile = (file) => {
  if (!file) {
    return { valid: false, error: 'No file selected.' };
  }

  // Validate format
  const fileType = file.type?.toLowerCase();
  const fileExt = file.name ? file.name.split('.').pop().toLowerCase() : '';
  const isAllowedExt = ['jpg', 'jpeg', 'png', 'webp'].includes(fileExt);

  if (!ALLOWED_TYPES.includes(fileType) && !isAllowedExt) {
    return {
      valid: false,
      error: 'Invalid file format. Allowed formats: JPG, JPEG, PNG, WEBP.',
    };
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE_BYTES) {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `File is too large (${sizeMb} MB). Maximum allowed size is 5 MB.`,
    };
  }

  return { valid: true };
};

/**
 * Reads a File object into a base64 Data URL
 * @param {File} file
 * @returns {Promise<string>}
 */
const readFileAsBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.readAsDataURL(file);
  });
};

/**
 * Uploads an image to Cloudinary & saves record to MongoDB
 * @param {File} file
 * @param {function} [onProgress]
 * @param {object} [metadata]
 * @returns {Promise<{ success: boolean, url?: string, publicId?: string, media?: object, isLocal?: boolean, error?: string }>}
 */
export const uploadImageToCloudinary = async (file, onProgress, metadata = {}) => {
  // 1. Run client-side validation
  const validation = validateImageFile(file);
  if (!validation.valid) {
    return { success: false, error: validation.error };
  }

  if (onProgress) onProgress(20);

  try {
    // 2. Convert file to Base64
    const base64Data = await readFileAsBase64(file);
    if (onProgress) onProgress(45);

    // 3. Post to backend which uploads to Cloudinary and saves into MongoDB
    const response = await api.post('/admin/media/upload', {
      image: base64Data,
      name: file.name,
      category: metadata.category || 'General',
    });

    if (onProgress) onProgress(90);

    if (response.success && response.data?.url) {
      if (onProgress) onProgress(100);
      return {
        success: true,
        url: response.data.url,
        publicId: response.data.publicId,
        media: response.data.media,
        isLocal: false,
        message: 'Stored in Cloudinary and saved to MongoDB.',
      };
    }

    // If offline fallback mode or error
    if (response.isOffline) {
      if (onProgress) onProgress(100);
      return {
        success: true,
        url: base64Data,
        publicId: `local-${Date.now()}`,
        isLocal: true,
        notice: 'Backend offline: Using local preview.',
      };
    }

    throw new Error(response.error || 'Failed to upload image.');
  } catch (err) {
    console.warn('[Upload Error]:', err.message);
    return {
      success: false,
      error: err.message || 'Image upload failed.',
    };
  }
};
