// Template Definitions for Website Page Builder
// Used by "+ Add Section" template selector

export const templateRegistry = [
  {
    type: 'hero',
    name: 'Hero Section',
    category: 'Headers',
    description: 'Prominent headline, description, primary & secondary CTAs, showcase image, and trust perks.',
    icon: 'Sparkles',
    defaultContent: {
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
    defaultSettings: {
      backgroundColor: '#fafafa',
      textColor: '#0f172a',
      headingFontSize: 56,
      descriptionFontSize: 18,
      buttonBgColor: '#0f172a',
      buttonTextColor: '#ffffff',
      alignment: 'left',
      sectionHeight: 110,
    },
  },
  {
    type: 'products',
    name: 'Product Section',
    category: 'Commerce',
    description: 'Catalogue grid displaying product cards with prices, ratings, and Add to Cart buttons.',
    icon: 'ShoppingBag',
    defaultContent: {
      badge: 'Curated Catalogue',
      title: 'Our Products',
      subtitle: 'Signature pieces engineered for daily comfort, uncompromising durability, and pure aesthetic harmony.',
      displayCount: 4,
    },
    defaultSettings: {
      backgroundColor: '#f8fafc',
      textColor: '#0f172a',
    },
  },
  {
    type: 'image-text',
    name: 'Image + Text',
    category: 'Content',
    description: 'Two-column feature spotlight highlighting brand craft with customizable image alignment (Left/Right).',
    icon: 'Layout',
    defaultContent: {
      badge: 'The NOVA Standard',
      title: 'Sculpted with Precision. Crafted for Everyday Life.',
      description: 'We believe everyday objects should inspire you. Every seam, edge, and surface is meticulously calibrated to deliver tactile delight and lifelong durability.',
      image: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&w=1000&q=80',
      imagePosition: 'left',
      buttonText: 'Discover The Craft',
      buttonLink: '#products',
      bullets: [
        { title: 'Precision CNC Machining', text: 'Zero-tolerance tolerances engineered for tactile perfection.' },
        { title: 'Sustainable Sourcing', text: '100% recyclable packaging and audited partners.' },
        { title: 'Ergonomic Excellence', text: 'Designed for effortless all-day comfort.' },
      ],
    },
    defaultSettings: {
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
    type: 'offer-banner',
    name: 'Offer Banner',
    category: 'Promotions',
    description: 'Full-width promotional banner with urgency countdown, coupon code, and call-to-action button.',
    icon: 'Tag',
    defaultContent: {
      badge: 'LIMITED TIME EXCLUSIVE',
      title: 'Special Collection — Up to 40% Off',
      description: 'Upgrade your workspace and daily carry today. Claim complimentary express delivery on all orders over $100.',
      buttonText: 'Explore Offers',
      buttonLink: '#products',
      codeBadge: 'CODE: NOVA40',
      validityText: 'Offer expires in 48 hours • Free returns included',
      bannerImage: '',
    },
    defaultSettings: {
      backgroundColor: '#0f172a',
      textColor: '#ffffff',
      buttonColor: '#ffffff',
      buttonTextColor: '#0f172a',
    },
  },
  {
    type: 'featured',
    name: 'Featured Products',
    category: 'Commerce',
    description: 'Curated collection grid showcasing award-winning items using reusable ProductCard components.',
    icon: 'Star',
    defaultContent: {
      badge: 'Editor’s Choice',
      title: 'Featured Collection',
      subtitle: 'Our most acclaimed and award-winning designs, voted favorites by design professionals worldwide.',
    },
    defaultSettings: {
      backgroundColor: '#ffffff',
      textColor: '#0f172a',
    },
  },
  {
    type: 'testimonials',
    name: 'Testimonials',
    category: 'Social Proof',
    description: 'Customer review cards featuring 5-star ratings, quotes, verified badges, and client avatars.',
    icon: 'MessageSquare',
    defaultContent: {
      badge: 'Verified Reviews',
      title: 'What Our Customers Say',
      subtitle: 'Join over 25,000 creators, engineers, and designers who trust NOVA daily.',
    },
    defaultSettings: {
      backgroundColor: '#f8fafc',
      cardBackground: '#ffffff',
      textColor: '#0f172a',
    },
  },
  {
    type: 'cta',
    name: 'CTA Section',
    category: 'Call to Action',
    description: 'High-converting closing section with primary & secondary buttons and guarantee notice.',
    icon: 'Compass',
    defaultContent: {
      badge: 'Get Started Today',
      title: 'Ready to Explore NOVA?',
      description: 'Experience design purity and uncompromising craftsmanship. Elevate your everyday routine with our newest releases.',
      buttonText: 'Start Shopping',
      buttonLink: '#products',
      secondaryButtonText: 'Explore Collection',
      secondaryButtonLink: '#featured',
      guaranteeText: '30-Day Money-Back Guarantee • Free Global Shipping • 24/7 Concierge Support',
    },
    defaultSettings: {
      backgroundColor: '#0f172a',
      textColor: '#ffffff',
      buttonColor: '#ffffff',
      buttonTextColor: '#0f172a',
    },
  },
  {
    type: 'text',
    name: 'Text Section',
    category: 'Content',
    description: 'Clean typographic story block with title, subtitle, and paragraph text for brand mission or statements.',
    icon: 'FileText',
    defaultContent: {
      badge: 'Brand Story',
      title: 'Simplicity is the Ultimate Sophistication',
      content: 'At NOVA, we design products that seamlessly integrate into your daily rituals. Every curve, tactile interaction, and material choice is made with deliberate intent. We eliminate the unnecessary so the essential may speak.',
    },
    defaultSettings: {
      alignment: 'center',
      backgroundColor: '#ffffff',
      textColor: '#0f172a',
      headingFontSize: 38,
      descriptionFontSize: 18,
      spacing: 'medium',
      contentWidth: 'medium',
    },
  },
  {
    type: 'image',
    name: 'Image Section',
    category: 'Media',
    description: 'Full-width visual showcase image with caption overlay and optional CTA link.',
    icon: 'Image',
    defaultContent: {
      image: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&w=1600&q=80',
      title: 'Engineered Without Compromise',
      caption: 'Every curve precision milled from aerospace-grade aluminum.',
      buttonText: 'Explore The Engineering',
      buttonLink: '#products',
    },
    defaultSettings: {
      backgroundColor: '#ffffff',
      textColor: '#ffffff',
      spacing: 'medium',
      contentWidth: 'full',
    },
  },
  {
    type: 'video',
    name: 'Video Section',
    category: 'Media',
    description: 'High-impact video banner with custom thumbnail and interactive play button modal/embed.',
    icon: 'Video',
    defaultContent: {
      badge: 'Behind The Scenes',
      title: 'How We Craft The Perfect Sound',
      description: 'Go behind the design board with our acoustic engineers to witness how 24 months of prototyping culminated in the AeroSound Pro.',
      thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1600&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    },
    defaultSettings: {
      backgroundColor: '#0f172a',
      textColor: '#ffffff',
      spacing: 'medium',
    },
  },
  {
    type: 'gallery',
    name: 'Gallery Section',
    category: 'Media',
    description: 'Grid of 4 lifestyle or product photos with zoom-on-hover effect.',
    icon: 'Grid',
    defaultContent: {
      badge: 'Visual Gallery',
      title: 'Captured In The Wild',
      subtitle: 'See how designers, photographers, and architects carry NOVA essentials across the globe.',
      images: [
        'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
      ],
    },
    defaultSettings: {
      backgroundColor: '#ffffff',
      textColor: '#0f172a',
      spacing: 'medium',
    },
  },
  {
    type: 'faq',
    name: 'FAQ Section',
    category: 'Support',
    description: 'Interactive accordion list of questions and answers covering shipping, returns, and warranty.',
    icon: 'HelpCircle',
    defaultContent: {
      badge: 'Help & Support',
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know about our products, shipping, warranty, and returns.',
      items: [
        {
          q: 'What is the standard shipping delivery time?',
          a: 'We provide complimentary express delivery on orders over $100. Most orders arrive within 2-4 business days in North America and 4-7 business days internationally.',
        },
        {
          q: 'What is covered under the 2-Year NOVA Warranty?',
          a: 'Our comprehensive warranty covers all manufacturing defects, acoustic degradation, internal electronic malfunctions, and mechanical failures. Free worldwide replacement is guaranteed.',
        },
        {
          q: 'Can I return my order if I am not satisfied?',
          a: 'Yes. We offer a 30-day risk-free trial. If you are not completely in love with your NOVA items, return them in original condition for a 100% full refund.',
        },
        {
          q: 'Are your materials sustainably sourced?',
          a: 'All our packaging is 100% plastic-free and recyclable. Our metals use recycled aerospace-grade aluminum alloys, and our leather is ethically certified by the Leather Working Group.',
        },
      ],
    },
    defaultSettings: {
      backgroundColor: '#f8fafc',
      textColor: '#0f172a',
      spacing: 'medium',
    },
  },
  {
    type: 'contact',
    name: 'Contact Section',
    category: 'Support',
    description: 'Direct contact details (email, phone, address) and interactive customer message form.',
    icon: 'Mail',
    defaultContent: {
      badge: 'Get in Touch',
      title: 'We Are Here For You',
      subtitle: 'Have a question about our collections or need tailored concierge support? Reach out anytime.',
      email: 'support@nova.com',
      phone: '+1 (800) 555-NOVA',
      address: '742 Design Way, New York, NY 10001',
    },
    defaultSettings: {
      backgroundColor: '#ffffff',
      textColor: '#0f172a',
      spacing: 'medium',
    },
  },
];

/**
 * Creates a unique section instance from a template type
 */
export const createSectionFromTemplate = (templateType, order = 1) => {
  const template =
    templateRegistry.find((t) => t.type === templateType) || templateRegistry[0];

  const uniqueSuffix = Date.now().toString(36).slice(-4) + Math.random().toString(36).slice(-3);
  const id = `${template.type}-${uniqueSuffix}`;

  return {
    id,
    type: template.type,
    name: template.name,
    order,
    enabled: true,
    icon: template.icon,
    content: JSON.parse(JSON.stringify(template.defaultContent || {})),
    settings: JSON.parse(JSON.stringify(template.defaultSettings || {})),
  };
};
