/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Sparkles,
  Wand2,
  Send,
  Loader2,
  Sun,
  Layers,
  Coffee,
  Sparkle,
  Sliders,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Lightbulb,
} from 'lucide-react';
import { PROMPT_PRESETS, PromptPreset } from '../utils/editor-utils.ts';

interface InstructionPanelProps {
  prompt: string;
  setPrompt: (val: string) => void;
  onSubmit: (e?: React.FormEvent) => void;
  isProcessing: boolean;
  aspectRatio: string;
  setAspectRatio: (val: string) => void;
  imageSize: string;
  setImageSize: (val: string) => void;
  onRequestSuggestions: () => void;
  isSuggesting: boolean;
  suggestions: string[];
  clientAdjustments: {
    brightness: number;
    contrast: number;
    saturation: number;
  };
  setClientAdjustments: React.Dispatch<
    React.SetStateAction<{
      brightness: number;
      contrast: number;
      saturation: number;
    }>
  >;
  hasResult: boolean;
}

export const InstructionPanel: React.FC<InstructionPanelProps> = ({
  prompt,
  setPrompt,
  onSubmit,
  isProcessing,
  aspectRatio,
  setAspectRatio,
  imageSize,
  setImageSize,
  onRequestSuggestions,
  isSuggesting,
  suggestions,
  clientAdjustments,
  setClientAdjustments,
  hasResult,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showAdjustments, setShowAdjustments] = useState<boolean>(false);

  const filteredPresets = activeCategory === 'all'
    ? PROMPT_PRESETS
    : PROMPT_PRESETS.filter((p) => p.category === activeCategory);

  const handlePresetClick = (preset: PromptPreset) => {
    setPrompt(preset.prompt);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      if (!isProcessing && prompt.trim()) {
        onSubmit();
      }
    }
  };

  const resetAdjustments = () => {
    setClientAdjustments({
      brightness: 100,
      contrast: 100,
      saturation: 100,
    });
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/90 border-r border-slate-800 p-4 overflow-y-auto">
      {/* Header section */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <label htmlFor="instruction-input" className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Retouch Instructions
          </label>
          <button
            type="button"
            onClick={onRequestSuggestions}
            disabled={isSuggesting || isProcessing}
            aria-label="Generate AI suggestions"
            className="flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isSuggesting ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <Lightbulb className="w-3 h-3" />
            )}
            <span>AI Ideas</span>
          </button>
        </div>

        {/* Text Input Area */}
        <div className="mt-2 relative">
          <textarea
            id="instruction-input"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isProcessing}
            rows={3}
            placeholder="e.g., Remove the background and place product on a clean white marble podium with soft shadow, remove dust and fingerprints..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all resize-none shadow-inner"
          />
          <div className="flex items-center justify-between mt-1 text-[11px] text-slate-500 px-1">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">Ctrl / Cmd + Enter</kbd> to run</span>
            {prompt.length > 0 && (
              <button
                type="button"
                onClick={() => setPrompt('')}
                className="hover:text-slate-300 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={() => onSubmit()}
          disabled={isProcessing || !prompt.trim()}
          aria-label="Generate photo retouch"
          className="mt-3 w-full py-2.5 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-lg shadow-sky-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer active:scale-[0.99]"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Retouching in Studio...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4" />
              <span>Apply Instructions</span>
            </>
          )}
        </button>
      </div>

      {/* AI Suggestions Pill Tray */}
      {suggestions.length > 0 && (
        <div className="mb-4 p-2.5 rounded-xl bg-sky-950/30 border border-sky-800/40">
          <div className="text-[11px] font-semibold text-sky-400 flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3 h-3" />
            <span>Suggested for this photo</span>
          </div>
          <div className="flex flex-col gap-1.5">
            {suggestions.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setPrompt(item)}
                className="text-left text-xs p-2 rounded-lg bg-slate-950/60 hover:bg-sky-900/40 text-slate-300 hover:text-white border border-slate-800/80 hover:border-sky-500/40 transition-colors line-clamp-2 cursor-pointer"
              >
                "{item}"
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Generation Settings (Aspect Ratio & Resolution) */}
      <div className="mb-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Image Output Settings
        </div>
        <div className="grid grid-cols-2 gap-3">
          {/* Aspect Ratio */}
          <div>
            <label htmlFor="aspect-ratio-select" className="block text-[11px] text-slate-400 mb-1">
              Aspect Ratio
            </label>
            <select
              id="aspect-ratio-select"
              value={aspectRatio}
              onChange={(e) => setAspectRatio(e.target.value)}
              disabled={isProcessing}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500 cursor-pointer"
            >
              <option value="1:1">1:1 Square (E-Commerce)</option>
              <option value="4:3">4:3 Standard</option>
              <option value="3:4">3:4 Portrait</option>
              <option value="16:9">16:9 Banner</option>
              <option value="9:16">9:16 Story / Reel</option>
            </select>
          </div>

          {/* Resolution */}
          <div>
            <label htmlFor="resolution-select" className="block text-[11px] text-slate-400 mb-1">
              Resolution
            </label>
            <select
              id="resolution-select"
              value={imageSize}
              onChange={(e) => setImageSize(e.target.value)}
              disabled={isProcessing}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500 cursor-pointer"
            >
              <option value="1K">1K High-Definition</option>
              <option value="2K">2K Ultra HD</option>
              <option value="4K">4K Studio Master</option>
            </select>
          </div>
        </div>
      </div>

      {/* Preset Library */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Quick Studio Presets
          </span>
          <div className="flex gap-1 text-[11px]">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                activeCategory === 'all'
                  ? 'bg-slate-800 text-sky-400 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('pure-white')}
              className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                activeCategory === 'pure-white'
                  ? 'bg-slate-800 text-sky-400 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              White
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('clean-imperfections')}
              className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                activeCategory === 'clean-imperfections'
                  ? 'bg-slate-800 text-sky-400 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Clean
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('lifestyle')}
              className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                activeCategory === 'lifestyle'
                  ? 'bg-slate-800 text-sky-400 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Scene
            </button>
          </div>
        </div>

        {/* Preset Cards */}
        <div className="grid grid-cols-1 gap-2">
          {filteredPresets.map((preset) => {
            const isSelected = prompt === preset.prompt;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handlePresetClick(preset)}
                className={`text-left p-2.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-sky-500/10 border-sky-500/60 ring-1 ring-sky-500/40'
                    : 'bg-slate-950/40 hover:bg-slate-800/60 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-5 h-5 rounded-md bg-slate-800 flex items-center justify-center text-sky-400">
                    {preset.category === 'pure-white' && <Sun className="w-3 h-3 text-amber-400" />}
                    {preset.category === 'remove-bg' && <Sparkles className="w-3 h-3 text-sky-400" />}
                    {preset.category === 'clean-imperfections' && <Wand2 className="w-3 h-3 text-emerald-400" />}
                    {preset.category === 'podium' && <Layers className="w-3 h-3 text-indigo-400" />}
                    {preset.category === 'lifestyle' && <Coffee className="w-3 h-3 text-orange-400" />}
                    {preset.category === 'shadows' && <Sparkle className="w-3 h-3 text-cyan-400" />}
                  </div>
                  <span className="text-xs font-semibold text-slate-200">{preset.title}</span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-1">{preset.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Local Post-Processing Fine Tuning (Brightness, Contrast, Saturation) */}
      {hasResult && (
        <div className="mt-4 pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={() => setShowAdjustments(!showAdjustments)}
            className="w-full flex items-center justify-between text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors py-1 cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-indigo-400" />
              <span>Local Lighting & Color Tuning</span>
            </span>
            {showAdjustments ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showAdjustments && (
            <div className="mt-3 space-y-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-xs">
              <div>
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>Brightness</span>
                  <span className="font-mono">{clientAdjustments.brightness}%</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="140"
                  value={clientAdjustments.brightness}
                  onChange={(e) =>
                    setClientAdjustments((prev) => ({ ...prev, brightness: Number(e.target.value) }))
                  }
                  className="w-full accent-sky-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>Contrast</span>
                  <span className="font-mono">{clientAdjustments.contrast}%</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="140"
                  value={clientAdjustments.contrast}
                  onChange={(e) =>
                    setClientAdjustments((prev) => ({ ...prev, contrast: Number(e.target.value) }))
                  }
                  className="w-full accent-sky-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>Saturation</span>
                  <span className="font-mono">{clientAdjustments.saturation}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={clientAdjustments.saturation}
                  onChange={(e) =>
                    setClientAdjustments((prev) => ({ ...prev, saturation: Number(e.target.value) }))
                  }
                  className="w-full accent-sky-500 cursor-pointer"
                />
              </div>

              <button
                type="button"
                onClick={resetAdjustments}
                className="w-full py-1 text-[11px] text-slate-400 hover:text-slate-200 flex items-center justify-center gap-1 bg-slate-900 rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Sliders</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
