/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Sparkles, Command, CheckCircle2 } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-sky-400" />
            <h3 className="font-bold text-slate-100 text-base">Studio Guide & Tips</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close help modal"
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs text-slate-300 overflow-y-auto max-h-[75vh]">
          <div>
            <h4 className="font-bold text-slate-100 text-sm mb-1.5">
              How to write effective retouching prompts
            </h4>
            <p className="text-slate-400 leading-relaxed">
              PureProduct Studio uses Gemini Nano Banana 2.1 to edit your product photos. Be specific about what to remove, what to clean, and what background to place the subject on:
            </p>
          </div>

          <div className="space-y-2.5">
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <div className="font-semibold text-sky-400 mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Background Isolation</span>
              </div>
              <p className="text-slate-400">
                "Remove background completely and keep only the product on transparent background with crisp, smooth edges."
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <div className="font-semibold text-emerald-400 mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Surface Cleanup & Blemishes</span>
              </div>
              <p className="text-slate-400">
                "Clean scratches on the glass surface, remove dust specks, fingerprints, and harsh reflection glare while keeping label text sharp."
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <div className="font-semibold text-amber-400 mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Studio Podium & Lifestyle</span>
              </div>
              <p className="text-slate-400">
                "Place on an off-white stone pedestal with warm morning sunlight rays and soft contact shadow."
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800">
            <h4 className="font-bold text-slate-100 mb-2">Keyboard Shortcuts</h4>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span>Run Prompt</span>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">Ctrl / Cmd + Enter</kbd>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span>Reset Zoom</span>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">100%</kbd>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs cursor-pointer"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
