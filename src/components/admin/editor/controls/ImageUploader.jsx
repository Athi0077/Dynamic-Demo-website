import React, { useState, useRef } from 'react';
import {
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Link as LinkIcon,
  Loader2,
  RefreshCw,
  CloudLightning,
} from 'lucide-react';
import { uploadImageToCloudinary, validateImageFile } from '../../../../utils/cloudinary';

export const ImageUploader = ({
  currentImage,
  onImageChange,
  label = 'Section Image',
  aspectRatio = 'aspect-video',
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null); // 'success' | 'error' | null
  const [statusMessage, setStatusMessage] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset status
    setUploadStatus(null);
    setStatusMessage('');

    // Pre-upload validation
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setUploadStatus('error');
      setStatusMessage(validation.error);
      return;
    }

    setIsUploading(true);
    setUploadProgress(15);

    try {
      const result = await uploadImageToCloudinary(file, (progress) => {
        setUploadProgress(progress);
      });

      if (result.success && result.url) {
        onImageChange(result.url);
        setUploadStatus('success');
        setStatusMessage(
          result.isLocal
            ? 'Uploaded locally (Add Cloudinary keys to .env for CDN hosting)'
            : 'Uploaded to Cloudinary successfully!'
        );
      } else {
        setUploadStatus('error');
        setStatusMessage(result.error || 'Failed to upload image.');
      }
    } catch (err) {
      setUploadStatus('error');
      setStatusMessage(err.message || 'An unexpected error occurred during upload.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleApplyUrl = (e) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      onImageChange(inputUrl.trim());
      setUploadStatus('success');
      setStatusMessage('Image URL applied successfully!');
      setShowUrlInput(false);
      setInputUrl('');
    }
  };

  return (
    <div className="space-y-3">
      {/* Label and Mode Toggle */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-700 transition-colors inline-flex items-center gap-1 cursor-pointer"
        >
          <LinkIcon size={12} />
          <span>{showUrlInput ? 'Upload File' : 'Use Direct URL'}</span>
        </button>
      </div>

      {/* Image Preview Box */}
      <div
        className={`relative w-full ${aspectRatio} rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-2xs group`}
      >
        {currentImage ? (
          <img
            src={currentImage}
            alt="Preview"
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-4 text-center">
            <ImageIcon size={28} className="mb-2" />
            <span className="text-xs font-medium">No image selected</span>
          </div>
        )}

        {/* Uploading Spinner Overlay */}
        {isUploading && (
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-xs flex flex-col items-center justify-center text-white p-4">
            <Loader2 size={30} className="animate-spin text-indigo-400 mb-2" />
            <span className="text-xs font-bold">Uploading to Cloudinary...</span>
            <div className="w-32 bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-indigo-500 h-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-300 mt-1">{uploadProgress}%</span>
          </div>
        )}

        {/* Change Image Hover Button */}
        {!isUploading && !showUrlInput && (
          <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 rounded-xl bg-white text-slate-900 text-xs font-bold shadow-lg hover:bg-slate-100 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw size={14} />
              <span>Change Image</span>
            </button>
          </div>
        )}
      </div>

      {/* Direct URL Input Mode */}
      {showUrlInput ? (
        <form onSubmit={handleApplyUrl} className="flex gap-2">
          <input
            type="url"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="https://images.unsplash.com/photo-..."
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-indigo-500"
          />
          <button
            type="submit"
            className="px-3.5 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-indigo-600 transition-colors shrink-0 cursor-pointer"
          >
            Apply
          </button>
        </form>
      ) : (
        /* File Input & Upload Trigger */
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            type="button"
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-2.5 px-4 rounded-xl border border-dashed border-slate-300 hover:border-indigo-500 bg-slate-50 hover:bg-indigo-50/50 text-slate-600 hover:text-indigo-600 text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Upload size={14} />
            <span>Click to upload image (JPG, PNG, WEBP max 5MB)</span>
          </button>
        </div>
      )}

      {/* Upload Status / Validation Alert */}
      {uploadStatus === 'success' && (
        <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-[11px] flex items-center gap-2">
          <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
          <span className="truncate">{statusMessage}</span>
        </div>
      )}

      {uploadStatus === 'error' && (
        <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200/60 text-rose-800 text-[11px] flex items-center gap-2">
          <AlertCircle size={14} className="text-rose-600 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Cloudinary Info Tip */}
      <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
        <CloudLightning size={12} className="text-indigo-500 shrink-0" />
        <span>Optimized Cloudinary uploads supported via VITE_CLOUDINARY_CLOUD_NAME</span>
      </div>
    </div>
  );
};
