/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, Layers, RefreshCw, Upload, Image as ImageIcon, Zap, Info } from 'lucide-react';

interface HeaderProps {
  onNewImageClick: () => void;
  onOpenSampleModal: () => void;
  onOpenHelpModal: () => void;
  currentModel: string;
  hasActiveImage: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onNewImageClick,
  onOpenSampleModal,
  onOpenHelpModal,
  currentModel,
  hasActiveImage,
}) => {
  return (
    <header className="h-16 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
      {/* Brand & Title */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-amber-400 p-[1.5px] shadow-lg shadow-sky-500/20">
          <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-sky-400" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-base tracking-tight text-slate-100">PureProduct</span>
            <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
              Studio AI
            </span>
          </div>
          <p className="text-xs text-slate-400 hidden sm:block">
            Remove backgrounds & clean up product photos by typing instructions
          </p>
        </div>
      </div>

      {/* Model & Quick Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Model Indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-400 font-mono">Engine:</span>
          <span className="font-semibold text-slate-200">{currentModel}</span>
        </div>

        {/* Sample Photos Button */}
        <button
          onClick={onOpenSampleModal}
          aria-label="Open sample product photos"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-all cursor-pointer"
        >
          <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden xs:inline">Sample Photos</span>
        </button>

        {/* New / Change Image */}
        {hasActiveImage && (
          <button
            onClick={onNewImageClick}
            aria-label="Upload a new product photo"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-all cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Change Photo</span>
          </button>
        )}

        {/* Help / Tips */}
        <button
          onClick={onOpenHelpModal}
          aria-label="Show instructions and guidance"
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
          title="Keyboard shortcuts & instructions"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
