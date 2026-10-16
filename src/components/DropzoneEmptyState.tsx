/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { Upload, Sparkles, Wand2, ShieldCheck, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { SAMPLE_PRODUCTS, SampleProduct } from '../data/sample-products.ts';

interface DropzoneEmptyStateProps {
  onImageSelected: (dataUrl: string, name?: string) => void;
  onSelectSample: (product: SampleProduct) => void;
}

export const DropzoneEmptyState: React.FC<DropzoneEmptyStateProps> = ({
  onImageSelected,
  onSelectSample,
}) => {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        onImageSelected(result, file.name);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-4xl mx-auto w-full">
      {/* Hero Intro */}
      <div className="text-center max-w-xl mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Gen Gemini Nano Banana 2.1 Photo Studio</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
          Commercial Product Retouching <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-sky-400 via-indigo-300 to-amber-300 bg-clip-text text-transparent">
            Just By Typing Instructions
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Remove backgrounds, erase scratches & glare, and place items in photorealistic studio environments using natural language.
        </p>
      </div>

      {/* Main Drag-and-Drop Area */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`w-full max-w-xl p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center text-center ${
          isDragOver
            ? 'border-sky-400 bg-sky-500/10 scale-[1.01]'
            : 'border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-slate-700 shadow-xl'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFile(e.target.files[0]);
            }
          }}
        />

        <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-4 group-hover:scale-105 transition-transform">
          <Upload className="w-6 h-6" />
        </div>

        <h3 className="text-sm font-bold text-slate-200">
          Upload your product photo
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Drag and drop here, or <span className="text-sky-400 font-semibold underline">browse files</span>
        </p>
        <span className="text-[10px] text-slate-500 mt-3 font-mono">
          Supports PNG, JPG, WEBP, or SVG
        </span>
      </div>

      {/* Instant Test With Sample Products */}
      <div className="w-full max-w-3xl mt-10">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
            <span>Or test immediately with a sample product:</span>
          </span>
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            Each sample includes simulated scratches, glare & messy backgrounds
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SAMPLE_PRODUCTS.slice(0, 4).map((sample) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => onSelectSample(sample)}
              className="group text-left p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-sky-500/50 hover:bg-slate-850 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-full aspect-square rounded-lg bg-slate-950 overflow-hidden mb-2 border border-slate-800/80 group-hover:scale-[1.02] transition-transform">
                  <img
                    src={sample.thumbnail}
                    alt={sample.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xs font-bold text-slate-200 group-hover:text-sky-300 line-clamp-1">
                  {sample.name}
                </h4>
                <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                  {sample.category}
                </p>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-sky-400 font-medium">
                <span>Try this</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
