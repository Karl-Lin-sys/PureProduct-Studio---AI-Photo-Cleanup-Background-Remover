/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Download, Copy, Check, FileImage, Sparkles, ShieldCheck } from 'lucide-react';
import { generateExportFilename } from '../utils/editor-utils.ts';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  currentPrompt: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  currentPrompt,
}) => {
  const [format, setFormat] = useState<'png' | 'jpg' | 'webp'>('png');
  const [preset, setPreset] = useState<'original' | 'shopify' | 'amazon' | 'instagram'>('original');
  const [hasCopied, setHasCopied] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const filename = generateExportFilename('product_cleaned', preset, format);

      // Create an offscreen canvas if resizing or format conversion is needed
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = imageUrl;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      let targetWidth = img.width;
      let targetHeight = img.height;

      if (preset === 'shopify') {
        targetWidth = 2048;
        targetHeight = 2048;
      } else if (preset === 'amazon') {
        targetWidth = 1600;
        targetHeight = 1600;
      } else if (preset === 'instagram') {
        targetWidth = 1080;
        targetHeight = 1080;
      }

      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas 2D context not available');

      // If JPG format, fill white background to avoid black alpha background
      if (format === 'jpg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, targetWidth, targetHeight);
      }

      // Draw image centered and contained
      const hRatio = targetWidth / img.width;
      const vRatio = targetHeight / img.height;
      const ratio = Math.min(hRatio, vRatio);
      const centerShiftX = (targetWidth - img.width * ratio) / 2;
      const centerShiftY = (targetHeight - img.height * ratio) / 2;
      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShiftX,
        centerShiftY,
        img.width * ratio,
        img.height * ratio
      );

      const mime = format === 'png' ? 'image/png' : format === 'webp' ? 'image/webp' : 'image/jpeg';
      const dataUrl = canvas.toDataURL(mime, 0.95);

      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Download failed:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-slate-100 text-base">Export Studio Image</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close export dialog"
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Preview Thumbnail */}
          <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="w-16 h-16 rounded-lg bg-checkerboard-dark overflow-hidden flex-shrink-0 border border-slate-700">
              <img
                src={imageUrl}
                alt="Export preview"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold text-slate-200">Retouched Product Photo</div>
              <p className="text-[11px] text-slate-400 truncate mt-0.5" title={currentPrompt}>
                "{currentPrompt}"
              </p>
              <div className="flex items-center gap-2 mt-1.5 text-[10px] text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Commercial-Ready Asset</span>
              </div>
            </div>
          </div>

          {/* Format selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              File Format
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setFormat('png')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  format === 'png'
                    ? 'bg-sky-500/20 text-sky-400 border-sky-500/50'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                <div>PNG</div>
                <div className="text-[10px] font-normal text-slate-500">Transparent</div>
              </button>
              <button
                type="button"
                onClick={() => setFormat('jpg')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  format === 'jpg'
                    ? 'bg-sky-500/20 text-sky-400 border-sky-500/50'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                <div>JPG</div>
                <div className="text-[10px] font-normal text-slate-500">Compressed</div>
              </button>
              <button
                type="button"
                onClick={() => setFormat('webp')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  format === 'webp'
                    ? 'bg-sky-500/20 text-sky-400 border-sky-500/50'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                <div>WEBP</div>
                <div className="text-[10px] font-normal text-slate-500">Modern Web</div>
              </button>
            </div>
          </div>

          {/* Preset size */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Marketplace Preset
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setPreset('original')}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  preset === 'original'
                    ? 'bg-sky-500/20 text-sky-300 border-sky-500/50'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                <div className="font-semibold text-slate-200">Native Resolution</div>
                <div className="text-[10px] text-slate-500">Full Quality Render</div>
              </button>
              <button
                type="button"
                onClick={() => setPreset('shopify')}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  preset === 'shopify'
                    ? 'bg-sky-500/20 text-sky-300 border-sky-500/50'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                <div className="font-semibold text-slate-200">Shopify Product</div>
                <div className="text-[10px] text-slate-500">2048 x 2048 Square</div>
              </button>
              <button
                type="button"
                onClick={() => setPreset('amazon')}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  preset === 'amazon'
                    ? 'bg-sky-500/20 text-sky-300 border-sky-500/50'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                <div className="font-semibold text-slate-200">Amazon Standard</div>
                <div className="text-[10px] text-slate-500">1600 x 1600 Square</div>
              </button>
              <button
                type="button"
                onClick={() => setPreset('instagram')}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  preset === 'instagram'
                    ? 'bg-sky-500/20 text-sky-300 border-sky-500/50'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                <div className="font-semibold text-slate-200">Social / IG</div>
                <div className="text-[10px] text-slate-500">1080 x 1080 Square</div>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleCopyToClipboard}
            className="flex-1 py-2.5 px-3 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            {hasCopied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Image</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isDownloading ? 'Exporting...' : 'Download Image'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
