import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Search,
  Upload,
  Check,
  Image as ImageIcon,
  Loader2,
  CloudLightning,
  FolderOpen,
} from 'lucide-react';
import { websiteService } from '../../../../services/websiteService';
import { uploadImageToCloudinary } from '../../../../utils/cloudinary';
import { initialMediaFiles } from '../../../../data/media';

const CATEGORIES = ['All', 'Products', 'Hero', 'Banners', 'General'];

export const MediaPickerModal = ({ isOpen, onClose, onSelectImage, currentImage }) => {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null);

  // Load media from MongoDB & default media
  const loadMedia = async () => {
    setLoading(true);
    try {
      const res = await websiteService.getMedia(
        selectedCategory === 'All' ? '' : selectedCategory,
        searchQuery
      );
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        // Map backend MongoDB media
        const backendItems = res.data.map((item) => ({
          id: item._id || item.id,
          name: item.name,
          url: item.url,
          size: item.size || '1.0 MB',
          dimensions: item.dimensions || '1920 × 1080',
          category: item.category || 'General',
          isCloudinary: item.url?.includes('cloudinary.com'),
        }));
        setMediaList(backendItems);
      } else {
        // Fallback to initial media files filtered
        const filtered = initialMediaFiles.filter((item) => {
          const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
          const matchSearch =
            !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase());
          return matchCat && matchSearch;
        });
        setMediaList(filtered);
      }
    } catch {
      setMediaList(initialMediaFiles);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadMedia();
    }
  }, [isOpen, selectedCategory, searchQuery]);

  // Handle uploading a new image right from the picker
  const handleUploadNew = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError('');
    setIsUploading(true);

    try {
      const res = await uploadImageToCloudinary(file, null, {
        category: selectedCategory === 'All' ? 'General' : selectedCategory,
      });

      if (res.success && res.url) {
        // Auto select and apply immediately
        onSelectImage(res.url);
        onClose();
      } else {
        setUploadError(res.error || 'Upload failed.');
      }
    } catch (err) {
      setUploadError(err.message || 'Upload error.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <FolderOpen size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <span>Select from Media Library</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-semibold flex items-center gap-1">
                  <CloudLightning size={10} /> Cloudinary & MongoDB
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Click any image to replace immediately, or upload a new one.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              {isUploading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
              <span>{isUploading ? 'Uploading...' : 'Upload New'}</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.webp,image/*"
              onChange={handleUploadNew}
              className="hidden"
            />
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="px-6 py-3 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-white">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search images..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Upload Error Banner */}
        {uploadError && (
          <div className="px-6 py-2 bg-rose-50 border-b border-rose-100 text-rose-700 text-xs">
            {uploadError}
          </div>
        )}

        {/* Image Grid Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="h-64 flex flex-col items-center justify-center text-slate-400 gap-2">
              <Loader2 size={28} className="animate-spin text-indigo-600" />
              <span className="text-xs font-medium">Loading media assets...</span>
            </div>
          ) : mediaList.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-slate-400 text-center p-6">
              <ImageIcon size={36} className="text-slate-300 mb-2" />
              <p className="text-sm font-semibold text-slate-600">No images found</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Upload your first image to store it in Cloudinary and save it to MongoDB.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {mediaList.map((item) => {
                const isSelected = currentImage === item.url;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelectImage(item.url);
                      onClose();
                    }}
                    className={`group relative rounded-2xl overflow-hidden border transition-all cursor-pointer bg-slate-50 aspect-square flex flex-col ${
                      isSelected
                        ? 'border-indigo-600 ring-2 ring-indigo-600/30 shadow-md'
                        : 'border-slate-200 hover:border-indigo-400 hover:shadow-md'
                    }`}
                  >
                    <img
                      src={item.url}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2.5">
                      <span className="text-white text-xs font-semibold truncate">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-slate-300">
                        {item.dimensions || item.size}
                      </span>
                    </div>

                    {/* Selected Checkmark Badge */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-md">
                        <Check size={14} strokeWidth={3} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>{mediaList.length} media assets available</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 font-semibold text-slate-700 transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
