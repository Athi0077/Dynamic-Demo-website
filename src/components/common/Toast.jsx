import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const Toast = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700/50 animate-bounce duration-300">
      <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
      <span className="text-sm font-medium">{toastMessage}</span>
    </div>
  );
};
