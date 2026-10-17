import React, { useState, useEffect, useRef } from 'react';
import {
  Upload,
  Trash2,
  Eye,
  X,
  Search,
  Filter,
  CheckCircle2,
  CloudLightning,
  Loader2,
  Copy,
  Check,
} from 'lucide-react';
import { initialMediaFiles } from '../../data/media';
import { websiteService } from '../../services/websiteService';
import { uploadImageToCloudinary, validateImageFile } from '../../utils/cloudinary';
import { getAuthToken } from '../../services/api';

export const AdminMedia = () => {
  const [mediaList, setMediaList] = useState(initialMediaFiles);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [previewImage, setPreviewImage] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Fetch media from backend on mount and filter changes
  useEffect(() => {
    let isMounted = true;
    const token = getAuthToken();
    if (!token) return;

    websiteService.getMedia(selectedCategory, searchQuery).then((res) => {
      if (!isMounted) return;
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        const formatted = res.data.map((item) => ({
          id: item._id || item.id,
          name: item.name,
          url: item.url,
          size: item.size || '1.0 MB',
          dimensions: item.dimensions || '1920 × 1080',
          category: item.category || 'General',
          uploadedAt: item.createdAt
            ? new Date(item.createdAt).toLocaleDateString()
            : 'Recently',
        }));
        setMediaList(formatted);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [selectedCategory, searchQuery]);

  const handleDelete = async (id, name) => {
    // Optimistic UI update
    setMediaList((prev) => prev.filter((item) => item.id !== id));
    showToast(`Deleted "${name}" from media library.`);

    try {
      await websiteService.deleteMedia(id);
    } catch (e) {
      console.warn('Backend delete error:', e);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.valid) {
      showToast(validation.error);
      return;
    }

    setIsUploading(true);

    try {
      const uploadRes = await uploadImageToCloudinary(file, null, {
        category: selectedCategory === 'All' ? 'General' : selectedCategory,
      });

      if (uploadRes.success && uploadRes.url) {
        const savedDoc = uploadRes.media;
        const newItem = {
          id: savedDoc?._id || savedDoc?.id || `media-${Date.now()}`,
          url: uploadRes.url,
          publicId: uploadRes.publicId || '',
          name: file.name,
          size: savedDoc?.size || `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          dimensions: savedDoc?.dimensions || '1920 × 1080',
          category: selectedCategory === 'All' ? 'General' : selectedCategory,
          uploadedAt: 'Just now',
        };

        setMediaList((prev) => [newItem, ...prev]);
        showToast(`Stored in Cloudinary and saved to MongoDB!`);
      } else {
        showToast(uploadRes.error || 'Failed to upload image.');
      }
    } catch (err) {
      showToast('Error uploading image: ' + err.message);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const categories = ['All', 'Products', 'Hero', 'About'];

  const filteredMedia = mediaList.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesQuery =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-semibold animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Media Library
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
              {filteredMedia.length} Files
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Browse, preview, and manage images persisted in MongoDB and optimized by Cloudinary
          </p>
        </div>

        {/* Upload Trigger Button */}
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            type="button"
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer self-start sm:self-auto disabled:opacity-50"
          >
            {isUploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
            <span>{isUploading ? 'Uploading Image...' : 'Upload Image'}</span>
          </button>
        </div>
      </div>

      {/* Persistence Info Banner */}
      <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200/60 text-xs text-indigo-950 flex items-start gap-3">
        <CloudLightning size={18} className="text-indigo-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="font-bold text-indigo-900">Real MongoDB Media Storage + Cloudinary CDN</p>
          <p className="text-indigo-800">
            Uploaded assets are safely stored with CDN URLs, dimensions, and categories in MongoDB. Images can be directly referenced inside any visual builder section.
          </p>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full sm:max-w-xs">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by filename or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          <Filter size={14} className="text-slate-400 mr-1 hidden sm:block" />
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      {filteredMedia.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
          <p className="text-sm font-semibold text-slate-600">No media found</p>
          <p className="text-xs mt-1">Try adjusting your search query or upload a new image.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                <img
                  src={item.url}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Category Badge & Cloudinary Badge */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1">
                  <span className="px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold">
                    {item.category}
                  </span>
                  {item.url?.includes('cloudinary.com') && (
                    <span className="px-1.5 py-0.5 rounded-md bg-indigo-600/90 backdrop-blur-xs text-white text-[9px] font-bold flex items-center gap-0.5">
                      <CloudLightning size={9} /> CDN
                    </span>
                  )}
                </div>

                {/* Hover Action Overlay */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPreviewImage(item)}
                    className="p-2 rounded-xl bg-white text-slate-900 hover:bg-slate-100 transition-colors shadow-md cursor-pointer"
                    title="Preview Image"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id, item.name)}
                    className="p-2 rounded-xl bg-white text-rose-600 hover:bg-rose-50 transition-colors shadow-md cursor-pointer"
                    title="Delete Image"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Details & Delete Button */}
              <div className="p-3.5 space-y-2">
                <h4 className="text-xs font-bold text-slate-900 truncate" title={item.name}>
                  {item.name}
                </h4>

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>{item.dimensions}</span>
                  <span>{item.size}</span>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(item.url);
                      showToast('Image URL copied to clipboard!');
                    }}
                    className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-700 transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Copy size={11} />
                    <span>Copy URL</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id, item.name)}
                    className="text-xs font-semibold text-rose-600 hover:text-rose-700 transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 size={12} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 truncate max-w-sm">
                  {previewImage.name}
                </h3>
                <p className="text-xs text-slate-400">
                  {previewImage.dimensions} • {previewImage.size} • {previewImage.category}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close preview"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 bg-slate-100 max-h-[70vh] flex items-center justify-center overflow-hidden">
              <img
                src={previewImage.url}
                alt={previewImage.name}
                className="max-h-[60vh] max-w-full object-contain rounded-xl shadow-md"
              />
            </div>

            <div className="p-4 bg-white flex justify-end">
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMedia;
