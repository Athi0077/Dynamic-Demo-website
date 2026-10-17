import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      default: '',
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    size: {
      type: String,
      default: '1.0 MB',
    },
    dimensions: {
      type: String,
      default: '1920 × 1080',
    },
    category: {
      type: String,
      default: 'General',
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
  }
);

export const Media = mongoose.model('Media', mediaSchema);
