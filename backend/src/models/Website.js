import mongoose from 'mongoose';

const websiteSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      default: 'nova',
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
      default: 'NOVA',
      trim: true,
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'published',
    },
    // Working draft configuration edited in the admin visual builder
    draftConfig: {
      sections: {
        type: [mongoose.Schema.Types.Mixed],
        default: [],
      },
      settings: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
    },
    // Immutable snapshot served to public visitors on GET /api/website
    publishedConfig: {
      sections: {
        type: [mongoose.Schema.Types.Mixed],
        default: [],
      },
      settings: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
      },
      publishedAt: {
        type: Date,
        default: Date.now,
      },
    },
    // Global site settings (brand name, navbar links, social links, footer)
    settings: {
      navbar: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
      },
      footer: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
      },
      theme: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
      },
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Website = mongoose.model('Website', websiteSchema);
