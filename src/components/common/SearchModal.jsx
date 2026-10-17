import React, { useState, useMemo } from 'react';
import { Search, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { allProducts } from '../../data/products';

export const SearchModal = () => {
  const { isSearchOpen, setIsSearchOpen, addToCart } = useCart();
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={() => {
          setIsSearchOpen(false);
          setQuery('');
        }}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-10 animate-in fade-in duration-200">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search size={22} className="text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search audio, watches, backpacks, workspace gear..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full text-base bg-transparent text-slate-800 placeholder-slate-400 focus:outline-hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600 px-2 py-1 rounded bg-slate-100"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setIsSearchOpen(false);
              setQuery('');
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close search"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto p-4">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-sm text-slate-400">
              <p className="font-medium text-slate-600">Quick Searches</p>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {['Audio', 'Backpack', 'Watch', 'Keyboard', 'Desk Lamp'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-xs transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <p className="text-base font-medium">No products found for "{query}"</p>
              <p className="text-xs text-slate-400 mt-1">Try searching for keywords like "audio", "watch", or "leather"</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2">
                Found {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
              </p>
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-14 h-14 rounded-lg object-cover bg-slate-100 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-slate-800 truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs text-slate-500 truncate">{product.category}</p>
                      <span className="text-xs font-bold text-slate-900 mt-0.5 inline-block">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      addToCart(product);
                      setIsSearchOpen(false);
                      setQuery('');
                    }}
                    className="shrink-0 ml-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-indigo-600 text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    <ShoppingBag size={13} />
                    <span>Add</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
