import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl transition-all duration-300 transform translate-y-0 bg-royal-charcoal text-white border border-royal-gold/40">
      {isError ? (
        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
      ) : (
        <CheckCircle2 className="w-5 h-5 text-royal-gold flex-shrink-0" />
      )}
      <p className="text-sm font-medium pr-2 text-royal-cream">{toast.message || toast}</p>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-white transition p-1"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
