/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Sparkles, ArrowRight, Tag } from 'lucide-react';
import { SAMPLE_PRODUCTS, SampleProduct } from '../data/sample-products.ts';

interface SampleProductPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: SampleProduct) => void;
}

export const SampleProductPicker: React.FC<SampleProductPickerProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Sample Product Photos</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Select a pre-loaded photo with messy backgrounds, reflections, or dust to test AI retouching instantly.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close sample product picker"
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {SAMPLE_PRODUCTS.map((prod) => (
            <button
              key={prod.id}
              type="button"
              onClick={() => {
                onSelectProduct(prod);
                onClose();
              }}
              className="group text-left p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-sky-500/50 hover:bg-slate-900 transition-all flex flex-col justify-between cursor-pointer shadow-md hover:shadow-sky-500/10"
            >
              <div>
                <div className="w-full aspect-[4/3] rounded-lg bg-slate-900 overflow-hidden mb-3 border border-slate-800 group-hover:scale-[1.02] transition-transform">
                  <img
                    src={prod.thumbnail}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    {prod.category}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-200 group-hover:text-sky-300 transition-colors">
                  {prod.name}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                  {prod.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-sky-400 font-semibold">
                <span>Load Photo & Prompts</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
