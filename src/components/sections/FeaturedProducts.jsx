import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '../common/ProductCard';
import { featuredProducts } from '../../data/products';
import { siteConfig } from '../../data/siteConfig';

export const FeaturedProducts = ({
  products = featuredProducts,
  config = siteConfig.featuredProducts,
}) => {
  const {
    badge = 'Editor’s Choice',
    title = 'Featured Collection',
    subtitle = 'Our most acclaimed and award-winning designs, voted favorites by design professionals worldwide.',
    backgroundColor,
    textColor,
  } = config;

  // Filter out any hidden products
  const visibleProducts = products.filter((p) => p.visible !== false);

  return (
    <section
      id="featured"
      style={{
        backgroundColor: backgroundColor || undefined,
      }}
      className="py-20 lg:py-24 bg-white border-t border-slate-200/60 transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl text-left">
            {badge && (
              <span className="text-xs font-bold tracking-wider uppercase text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full inline-block mb-3">
                {badge}
              </span>
            )}
            <h2
              style={{ color: textColor || undefined }}
              className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
            >
              {title}
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              {subtitle}
            </p>
          </div>

          <a
            href="#products"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-indigo-600 transition-colors group self-start md:self-end"
          >
            <span>View all products</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Responsive Grid with Reusable ProductCard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
