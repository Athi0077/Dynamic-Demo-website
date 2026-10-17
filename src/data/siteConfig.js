// Site-wide configuration and section contents
// Structured for seamless future integration with Admin Dashboard / CMS / Page Builder

export const siteConfig = {
  brand: {
    name: 'NOVA',
    tagline: 'Modern Design & Curated Essentials',
    logoText: 'NOVA',
  },

  navbar: {
    brandName: 'NOVA',
    links: [
      { id: 'home', label: 'Home', href: '#home' },
      { id: 'products', label: 'Products', href: '#products' },
      { id: 'about', label: 'About', href: '#about' },
      { id: 'contact', label: 'Contact', href: '#contact' },
    ],
  },

  hero: {
    badge: 'New Season 2026 Collection',
    headline: 'Curated Elegance for the Modern Lifestyle.',
    description: 'Discover thoughtfully engineered essentials crafted with aerospace-grade precision and timeless minimalist aesthetics.',
    primaryCta: {
      text: 'Shop Now',
      href: '#products',
    },
    secondaryCta: {
      text: 'Explore Collection',
      href: '#featured',
    },
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { value: '25K+', label: 'Happy Customers' },
      { value: '4.9/5', label: 'Customer Rating' },
      { value: '100%', label: 'Carbon Neutral' },
    ],
    features: [
      'Free Express Shipping Worldwide',
      '30-Day Risk-Free Guarantee',
      '2-Year Premium Warranty',
    ],
  },

  productSection: {
    badge: 'Curated Catalogue',
    title: 'Our Products',
    subtitle: 'Signature pieces engineered for daily comfort, uncompromising durability, and pure aesthetic harmony.',
  },

  imageTextSection: {
    badge: 'The NOVA Standard',
    title: 'Sculpted with Precision. Crafted for Everyday Life.',
    description: 'We believe everyday objects should inspire you. Every seam, edge, and surface is meticulously calibrated to deliver tactile delight and lifelong durability. We merge aerospace materials with conscious environmental sustainability.',
    bullets: [
      {
        title: 'Precision CNC Machining',
        text: 'Zero-tolerance tolerances engineered for tactile perfection and longevity.',
      },
      {
        title: 'Sustainable Sourcing',
        text: '100% recyclable packaging and ethically audited manufacturing partners.',
      },
      {
        title: 'Ergonomic Excellence',
        text: 'Designed in collaboration with ergonomic specialists for effortless all-day use.',
      },
    ],
    image: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'NOVA craft and design details',
    cta: {
      text: 'Discover The Craft',
      href: '#products',
    },
    reversed: false, // Image on one side, text on the other (can be toggled in CMS)
  },

  offerBanner: {
    badge: 'LIMITED TIME EXCLUSIVE',
    title: 'Special Collection — Up to 40% Off',
    description: 'Upgrade your workspace and daily carry today. Claim complimentary express delivery on all orders over $100.',
    cta: {
      text: 'Explore Offers',
      href: '#products',
    },
    codeBadge: 'CODE: NOVA40',
    validityText: 'Offer expires in 48 hours • Free returns included',
  },

  featuredProducts: {
    badge: 'Editor’s Choice',
    title: 'Featured Collection',
    subtitle: 'Our most acclaimed and award-winning designs, voted favorites by design professionals worldwide.',
  },

  testimonials: {
    badge: 'Verified Reviews',
    title: 'What Our Customers Say',
    subtitle: 'Join over 25,000 creators, engineers, and designers who trust NOVA daily.',
  },

  ctaSection: {
    badge: 'Get Started Today',
    title: 'Ready to Explore NOVA?',
    description: 'Experience design purity and uncompromising craftsmanship. Elevate your everyday routine with our newest releases.',
    primaryCta: {
      text: 'Start Shopping',
      href: '#products',
    },
    secondaryCta: {
      text: 'Explore Collection',
      href: '#featured',
    },
    guaranteeText: '30-Day Money-Back Guarantee • Free Global Shipping • 24/7 Concierge Support',
  },

  footer: {
    brandName: 'NOVA',
    tagline: 'Modern Design & Curated Essentials',
    description: 'Pioneering minimalist lifestyle accessories and workspace tools that seamlessly blend functional engineering with timeless aesthetics.',
    quickLinks: [
      { label: 'Home', href: '#home' },
      { label: 'Our Products', href: '#products' },
      { label: 'Featured Collection', href: '#featured' },
      { label: 'Philosophy', href: '#about' },
      { label: 'Reviews', href: '#testimonials' },
    ],
    supportLinks: [
      { label: 'Shipping & Delivery', href: '#shipping' },
      { label: 'Returns & Warranty', href: '#returns' },
      { label: 'Track Order', href: '#track' },
      { label: 'Contact Us', href: '#contact' },
      { label: 'FAQ', href: '#faq' },
    ],
    socialLinks: [
      { platform: 'Twitter / X', href: 'https://twitter.com', icon: 'Twitter' },
      { platform: 'Instagram', href: 'https://instagram.com', icon: 'Instagram' },
      { platform: 'LinkedIn', href: 'https://linkedin.com', icon: 'Linkedin' },
      { platform: 'GitHub', href: 'https://github.com', icon: 'Github' },
    ],
    copyright: '© 2026 NOVA Inc. All rights reserved. Designed for the modern world.',
  },
};
