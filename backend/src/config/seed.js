import { Admin } from '../models/Admin.js';
import { Website } from '../models/Website.js';
import { Media } from '../models/Media.js';

export const defaultSections = [
  {
    id: 'hero-1',
    type: 'hero',
    name: 'Hero Section',
    order: 1,
    enabled: true,
    icon: 'Sparkles',
    content: {
      badge: 'New Season 2026 Collection',
      headline: 'Curated Elegance for the Modern Lifestyle.',
      description: 'Discover thoughtfully engineered essentials crafted with aerospace-grade precision and timeless minimalist aesthetics.',
      primaryCta: { text: 'Shop Now', href: '#products' },
      secondaryCta: { text: 'Explore Collection', href: '#featured' },
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1200&q=80',
      stats: [
        { value: '25K+', label: 'Happy Customers' },
        { value: '4.9/5', label: 'Customer Rating' },
        { value: '100%', label: 'Carbon Neutral' },
      ],
    },
    settings: {
      backgroundColor: '#fafafa',
      textColor: '#0f172a',
      headingFontSize: 56,
      descriptionFontSize: 18,
      buttonBgColor: '#0f172a',
      buttonTextColor: '#ffffff',
      alignment: 'left',
      sectionHeight: 110,
      spacing: 'medium',
    },
  },
  {
    id: 'products-1',
    type: 'products',
    name: 'Product Section',
    order: 2,
    enabled: true,
    icon: 'ShoppingBag',
    content: {
      badge: 'Curated Catalogue',
      title: 'Our Products',
      subtitle: 'Signature pieces engineered for daily comfort, uncompromising durability, and pure aesthetic harmony.',
      displayCount: 4,
      items: [
        {
          id: 'prod-1',
          name: 'Apex Minimalist Chronograph',
          category: 'Watches',
          price: 289,
          originalPrice: 349,
          rating: 4.9,
          reviewsCount: 128,
          badge: 'Best Seller',
          inStock: true,
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
          description: 'Surgical stainless steel casing with sapphire crystal glass and Japanese quartz movement.',
          visible: true,
        },
        {
          id: 'prod-2',
          name: 'Aero Wireless Active ANC',
          category: 'Audio',
          price: 349,
          originalPrice: null,
          rating: 4.8,
          reviewsCount: 94,
          badge: 'New',
          inStock: true,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
          description: 'Ultra-low latency lossless audio with 40-hour battery life and custom titanium acoustic drivers.',
          visible: true,
        },
        {
          id: 'prod-3',
          name: 'Lumina Aluminum Desk Lamp',
          category: 'Lighting',
          price: 169,
          originalPrice: 199,
          rating: 4.9,
          reviewsCount: 76,
          badge: null,
          inStock: true,
          image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
          description: 'Stepless capacitive touch dimming with circadian temperature tuning and integrated fast Qi charger.',
          visible: true,
        },
        {
          id: 'prod-4',
          name: 'Vanguard Leather Folio Case',
          category: 'Accessories',
          price: 119,
          originalPrice: null,
          rating: 4.7,
          reviewsCount: 63,
          badge: null,
          inStock: true,
          image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
          description: 'Vegetable-tanned full-grain Italian leather with magnetic closure and aerospace aluminum pen clip.',
          visible: true,
        },
      ],
    },
    settings: {
      backgroundColor: '#f8fafc',
      textColor: '#0f172a',
      spacing: 'medium',
    },
  },
  {
    id: 'image-text-1',
    type: 'image-text',
    name: 'Image + Text Section',
    order: 3,
    enabled: true,
    icon: 'Layout',
    content: {
      badge: 'The NOVA Standard',
      title: 'Sculpted with Precision. Crafted for Everyday Life.',
      description: 'We believe everyday objects should inspire you. Every seam, edge, and surface is meticulously calibrated to deliver tactile delight and lifelong durability.',
      image: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&w=1000&q=80',
      imagePosition: 'left',
      buttonText: 'Discover The Craft',
      buttonLink: '#products',
      bullets: [
        { title: 'Precision CNC Machining', text: 'Zero-tolerance tolerances engineered for tactile perfection.' },
        { title: 'Sustainable Sourcing', text: '100% recyclable packaging and ethically audited partners.' },
        { title: 'Ergonomic Excellence', text: 'Designed in collaboration with ergonomic specialists.' },
      ],
    },
    settings: {
      backgroundColor: '#ffffff',
      textColor: '#0f172a',
      headingFontSize: 36,
      descriptionFontSize: 16,
      buttonBgColor: '#0f172a',
      buttonTextColor: '#ffffff',
      contentWidth: 'medium',
      spacing: 'medium',
    },
  },
  {
    id: 'offer-banner-1',
    type: 'offer-banner',
    name: 'Offer Banner',
    order: 4,
    enabled: true,
    icon: 'Tag',
    content: {
      badge: 'LIMITED TIME EXCLUSIVE',
      title: 'Special Collection — Up to 40% Off',
      description: 'Upgrade your workspace and daily carry today. Claim complimentary express delivery on all orders over $100.',
      buttonText: 'Explore Offers',
      buttonLink: '#products',
      codeBadge: 'CODE: NOVA40',
      validityText: 'Offer expires in 48 hours • Free returns included',
      bannerImage: '',
    },
    settings: {
      backgroundColor: '#0f172a',
      textColor: '#ffffff',
      buttonColor: '#ffffff',
      buttonTextColor: '#0f172a',
      spacing: 'medium',
    },
  },
  {
    id: 'featured-1',
    type: 'featured',
    name: 'Featured Products',
    order: 5,
    enabled: true,
    icon: 'Star',
    content: {
      badge: 'Editor’s Choice',
      title: 'Featured Collection',
      subtitle: 'Our most acclaimed and award-winning designs, voted favorites by design professionals worldwide.',
      items: [
        {
          id: 'feat-1',
          name: 'Aero Earbuds ANC Pro',
          category: 'Audio',
          price: 249,
          originalPrice: 299,
          rating: 4.9,
          reviewsCount: 164,
          badge: 'Editor Pick',
          inStock: true,
          image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
          description: 'Dual driver architecture with 3D spatial surround audio and ceramic acoustic chambers.',
          visible: true,
        },
        {
          id: 'feat-2',
          name: 'Precision Aluminum Mechanical Keyboard',
          category: 'Workspace',
          price: 199,
          originalPrice: null,
          rating: 5.0,
          reviewsCount: 88,
          badge: 'Limited Edition',
          inStock: true,
          image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
          description: 'Gasket-mounted hot-swappable tactile mechanical keyboard milled from aircraft aluminum.',
          visible: true,
        },
        {
          id: 'feat-3',
          name: 'Aero Urban Tech Backpack',
          category: 'Carry',
          price: 189,
          originalPrice: 229,
          rating: 4.8,
          reviewsCount: 112,
          badge: 'Best Travel',
          inStock: true,
          image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
          description: 'Weatherproof Cordura ballistics nylon with dedicated fleece-lined 16” laptop compartment.',
          visible: true,
        },
        {
          id: 'feat-4',
          name: 'Apex Horizon Polarized Eyewear',
          category: 'Lifestyle',
          price: 159,
          originalPrice: null,
          rating: 4.7,
          reviewsCount: 73,
          badge: 'New',
          inStock: true,
          image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
          description: 'Japanese titanium wire frames with Carl Zeiss anti-reflective UV400 polarized lenses.',
          visible: true,
        },
      ],
    },
    settings: {
      backgroundColor: '#ffffff',
      textColor: '#0f172a',
      spacing: 'medium',
    },
  },
  {
    id: 'testimonials-1',
    type: 'testimonials',
    name: 'Testimonial Section',
    order: 6,
    enabled: true,
    icon: 'MessageSquare',
    content: {
      badge: 'Verified Reviews',
      title: 'What Our Customers Say',
      subtitle: 'Join over 25,000 creators, engineers, and designers who trust NOVA daily.',
      items: [
        {
          id: 'test-1',
          name: 'Sophia Sterling',
          role: 'Creative Director at StudioForm',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
          rating: 5,
          headline: 'Exceptional craftsmanship and restraint',
          review: 'NOVA products redefine what minimalist design should feel like. The precision machining and tactile feel are superior to anything else on the market.',
          verified: true,
        },
        {
          id: 'test-2',
          name: 'Marcus Vance',
          role: 'Industrial Designer & Architect',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
          rating: 5,
          headline: 'The new benchmark for modern work gear',
          review: 'Every single line, finish, and bevel feels deliberate. My desk has never felt so cohesive, productive, and calm. Customer support was also world-class.',
          verified: true,
        },
        {
          id: 'test-3',
          name: 'Elena Rostova',
          role: 'Founder & Tech Entrepreneur',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
          rating: 5,
          headline: 'Worth every penny and built to last',
          review: 'I bought the watch and folio case over six months ago. They have weathered daily commutes across three continents and still look brand new. 10/10.',
          verified: true,
        },
      ],
    },
    settings: {
      backgroundColor: '#f8fafc',
      cardBackground: '#ffffff',
      textColor: '#0f172a',
      spacing: 'medium',
    },
  },
  {
    id: 'cta-1',
    type: 'cta',
    name: 'CTA Section',
    order: 7,
    enabled: true,
    icon: 'Compass',
    content: {
      badge: 'Get Started Today',
      title: 'Ready to Explore NOVA?',
      description: 'Experience design purity and uncompromising craftsmanship. Elevate your everyday routine with our newest releases.',
      buttonText: 'Start Shopping',
      buttonLink: '#products',
      secondaryButtonText: 'Explore Collection',
      secondaryButtonLink: '#featured',
      guaranteeText: '30-Day Money-Back Guarantee • Free Global Shipping • 24/7 Concierge Support',
    },
    settings: {
      backgroundColor: '#0f172a',
      textColor: '#ffffff',
      buttonColor: '#ffffff',
      buttonTextColor: '#0f172a',
      spacing: 'medium',
    },
  },
];

export const defaultSettings = {
  navbar: {
    brandName: 'NOVA',
    logoText: 'NOVA',
    links: [
      { id: 'home', name: 'Home', label: 'Home', href: '#home' },
      { id: 'products', name: 'Products', label: 'Products', href: '#products' },
      { id: 'about', name: 'About', label: 'About', href: '#about' },
      { id: 'contact', name: 'Contact', label: 'Contact', href: '#contact' },
    ],
    showSearch: true,
    showCart: true,
    fixed: true,
  },
  footer: {
    brandName: 'NOVA',
    tagline: 'Refining modern living through precision engineering, quiet luxury, and sustainable innovation.',
    copyrightYear: 2026,
    socials: [
      { name: 'Twitter', href: 'https://twitter.com' },
      { name: 'Instagram', href: 'https://instagram.com' },
      { name: 'LinkedIn', href: 'https://linkedin.com' },
      { name: 'GitHub', href: 'https://github.com' },
    ],
  },
  theme: {
    primaryColor: '#0f172a',
    accentColor: '#4f46e5',
  },
};

export const seedDatabase = async () => {
  try {
    // 1. Seed Admin
    const adminEmail = 'admin@nova.com';
    let admin = await Admin.findOne({ email: adminEmail });

    if (!admin) {
      admin = new Admin({
        name: 'Alex Rivera',
        email: adminEmail,
        password: 'Admin@123', // Will be hashed by pre-save hook
        role: 'ADMIN',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      });
      await admin.save();
      console.log(`[Database Seed] Default Admin created: ${adminEmail} (password: Admin@123)`);
    } else {
      console.log(`[Database Seed] Admin ${adminEmail} already exists.`);
    }

    // 2. Seed Website Document
    let website = await Website.findOne({ slug: 'nova' });

    if (!website) {
      website = new Website({
        slug: 'nova',
        name: 'NOVA Store',
        status: 'published',
        draftConfig: {
          sections: defaultSections,
          settings: defaultSettings,
          updatedAt: new Date(),
        },
        publishedConfig: {
          sections: defaultSections,
          settings: defaultSettings,
          publishedAt: new Date(),
        },
        settings: defaultSettings,
        publishedAt: new Date(),
      });
      await website.save();
      console.log(`[Database Seed] Default Website "nova" created with 7 initial sections (Draft + Published).`);
    } else {
      console.log(`[Database Seed] Website "nova" already exists.`);
    }

    // 3. Seed Media Assets
    const mediaCount = await Media.countDocuments();
    if (mediaCount === 0) {
      const initialMedia = [
        {
          name: 'hero-smartwatch-lifestyle.jpg',
          url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1200&q=80',
          size: '1.4 MB',
          dimensions: '1920 × 1080',
          category: 'Hero',
          uploadedBy: admin._id,
        },
        {
          name: 'apex-chronograph-black.jpg',
          url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
          size: '890 KB',
          dimensions: '1200 × 1200',
          category: 'Products',
          uploadedBy: admin._id,
        },
        {
          name: 'aero-wireless-headphones.jpg',
          url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
          size: '950 KB',
          dimensions: '1200 × 1200',
          category: 'Products',
          uploadedBy: admin._id,
        },
        {
          name: 'craftsmanship-desk-detail.jpg',
          url: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&w=1000&q=80',
          size: '1.1 MB',
          dimensions: '1600 × 1060',
          category: 'About',
          uploadedBy: admin._id,
        },
      ];
      await Media.insertMany(initialMedia);
      console.log(`[Database Seed] Seeded ${initialMedia.length} initial media library assets.`);
    }
  } catch (error) {
    console.error('[Database Seed Error]:', error.message);
  }
};
