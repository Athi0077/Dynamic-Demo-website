import React, { useState } from 'react';
import { ShoppingBag, Star, Check, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  if (!product) return null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-white p-4 shadow-sm border border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all duration-300">
      {/* Product Image & Badges */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-900/90 text-white backdrop-blur-xs shadow-xs">
              {product.badge}
            </span>
          )}
          {discountPercentage && discountPercentage > 0 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-white shadow-xs">
              -{discountPercentage}%
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          type="button"
          onClick={() => setIsLiked(!isLiked)}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 z-10 ${
            isLiked
              ? 'bg-red-50 text-red-500'
              : 'bg-white/80 backdrop-blur-xs text-slate-600 hover:text-red-500 hover:bg-white shadow-xs'
          }`}
          aria-label="Save to wishlist"
        >
          <Heart size={16} className={isLiked ? 'fill-red-500' : ''} />
        </button>
      </div>

      {/* Product Details */}
      <div className="mt-4 flex flex-col flex-grow">
        {/* Category & Rating */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
          <span className="uppercase tracking-wider font-semibold text-slate-400">
            {product.category || 'Collection'}
          </span>
          <div className="flex items-center gap-1">
            <Star size={13} className="fill-amber-400 text-amber-400" />
            <span className="font-medium text-slate-700">{product.rating || '4.9'}</span>
            <span className="text-slate-400">({product.reviewsCount || '90+'})</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
          {product.name}
        </h3>

        {/* Short Description */}
        <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Price & Add to Cart button */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold text-slate-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold tracking-wide">
              {product.inStock ? 'In Stock • Ready to ship' : 'Pre-order'}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 active:scale-95 shadow-xs ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 text-white hover:bg-indigo-600 hover:shadow-md'
            }`}
          >
            {isAdded ? (
              <>
                <Check size={14} className="stroke-[2.5]" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag size={14} />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
