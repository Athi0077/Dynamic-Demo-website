import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="text-slate-900" size={20} />
              <h2 className="text-lg font-bold text-slate-900">Your Cart</h2>
              <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {totalItems}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-slate-100">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                  <ShoppingBag size={28} />
                </div>
                <h3 className="text-base font-bold text-slate-800">Your cart is empty</h3>
                <p className="text-sm text-slate-500 mt-1 max-w-xs">
                  Looks like you haven't added anything to your cart yet. Explore our curated collection!
                </p>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-indigo-600 transition-colors"
                >
                  Start Shopping
                  <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-18 h-18 rounded-xl object-cover bg-slate-100 border border-slate-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-slate-900 truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      ${item.price.toFixed(2)} each
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="inline-flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:bg-slate-200 text-slate-600 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-slate-200 text-slate-600 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-bold text-slate-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-slate-100 bg-slate-50/50 space-y-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-medium text-slate-800">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Shipping</span>
                  <span className="text-emerald-600 font-medium">Free Express</span>
                </div>
                <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  alert('Thank you for checking out NOVA prototype! Checkout flow is disabled in this UI preview.');
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-slate-900 text-white rounded-xl font-semibold hover:bg-indigo-600 active:scale-[0.99] transition-all shadow-md"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </button>

              <p className="text-[11px] text-center text-slate-400">
                Guaranteed safe & secure checkout powered by NOVA
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
