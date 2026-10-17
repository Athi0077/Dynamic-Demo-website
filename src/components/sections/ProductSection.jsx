import React, { useState } from 'react';
import { ProductCard } from '../common/ProductCard';
import { mainProducts } from '../../data/products';
import { siteConfig } from '../../data/siteConfig';

export const ProductSection = ({
  products = mainProducts,
  config = siteConfig.productSection,
}) => {
  const {
    badge = 'Curated Catalogue',
    title = 'Our Products',
    subtitle = 'Signature pieces engineered for daily comfort, uncompromising durability, and pure aesthetic harmony.',
    backgroundColor,
    textColor,
    displayCount = 4,
  } = config;

  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter out any hidden products
  const visibleProducts = products.filter((p) => p.visible !== false);

  // Extract unique categories for filter tabs
  const categories = ['All', ...new Set(visibleProducts.map((p) => p.category).filter(Boolean))];

  const displayedProducts = (
    selectedCategory === 'All'
      ? visibleProducts
      : visibleProducts.filter((p) => p.category === selectedCategory)
  ).slice(0, displayCount);

  return (
    <section
      id="products"
      style={{
        backgroundColor: backgroundColor || undefined,
      }}
      className="py-20 lg:py-24 bg-slate-50/70 border-t border-slate-200/60 transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
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

          {/* Category Filter Tabs */}
          {categories.length > 1 && (
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
