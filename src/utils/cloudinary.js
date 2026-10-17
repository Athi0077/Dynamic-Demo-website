// Cloudinary Image Upload Utility
// Supports secure client-side unsigned uploads using environment variables
// Validates file formats (JPG, JPEG, PNG, WEBP) and maximum file size (5 MB)

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
 * Uploads an image to Cloudinary (or falls back to local data URL if env is not configured)
 * @param {File} file
 * @param {function} [onProgress]
 * @returns {Promise<{ success: boolean, url?: string, publicId?: string, isLocal?: boolean, error?: string }>}
 */
export const uploadImageToCloudinary = async (file, onProgress) => {
  // Run validation first
  const validation = validateImageFile(file);
  if (!validation.valid) {
    return { success: false, error: validation.error };
  }

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  // If Cloudinary environment variables are available, perform direct unsigned upload
  if (cloudName && uploadPreset) {
    try {
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);

      if (onProgress) onProgress(30);

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (onProgress) onProgress(80);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error?.message || `Cloudinary upload failed with status ${response.status}`
        );
      }

      const data = await response.json();
      if (onProgress) onProgress(100);

      return {
        success: true,
        url: data.secure_url || data.url,
        publicId: data.public_id,
        format: data.format,
        size: data.bytes,
        isLocal: false,
      };
    } catch (err) {
      console.warn('Cloudinary upload error:', err.message);
      return {
        success: false,
        error: `Cloudinary upload failed: ${err.message}`,
      };
    }
  }

  // Fallback: If Cloudinary keys are not set yet, convert to base64 Data URL
  // so the user can test the editor and preview immediately without blocking
  return new Promise((resolve) => {
    if (onProgress) onProgress(50);
    const reader = new FileReader();

    reader.onload = () => {
      if (onProgress) onProgress(100);
      resolve({
        success: true,
        url: reader.result,
        publicId: `local-${Date.now()}`,
        isLocal: true,
        notice: 'Using local storage. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in .env for Cloudinary CDN hosting.',
      });
    };

    reader.onerror = () => {
      resolve({
        success: false,
        error: 'Failed to read image file locally.',
      });
    };

    reader.readAsDataURL(file);
  });
};
