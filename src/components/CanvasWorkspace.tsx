/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Columns2,
  SlidersHorizontal,
  Eye,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Download,
  Loader2,
  Palette,
  Check,
  RotateCcw,
} from 'lucide-react';

interface CanvasWorkspaceProps {
  originalImage: string;
  resultImage: string | null;
  isProcessing: boolean;
  onOpenExport: () => void;
  clientAdjustments: {
    brightness: number;
    contrast: number;
    saturation: number;
  };
  promptUsed?: string;
  activeVersionLabel?: string;
}

type ViewMode = 'split' | 'side-by-side' | 'single';
type BackdropStyle = 'checker-dark' | 'checker-light' | 'white' | 'studio-grey' | 'slate' | 'warm' | 'custom';

export const CanvasWorkspace: React.FC<CanvasWorkspaceProps> = ({
  originalImage,
  resultImage,
  isProcessing,
  onOpenExport,
  clientAdjustments,
  promptUsed,
  activeVersionLabel,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0-100
  const [isDraggingSlider, setIsDraggingSlider] = useState<boolean>(false);
  const [isHoldingPeek, setIsHoldingPeek] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [backdrop, setBackdrop] = useState<BackdropStyle>('checker-dark');
  const [customBgColor, setCustomBgColor] = useState<string>('#ffffff');
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);

  // Compute CSS filter for client adjustments
  const filterStyle = {
    filter: `brightness(${clientAdjustments.brightness}%) contrast(${clientAdjustments.contrast}%) saturate(${clientAdjustments.saturation}%)`,
  };

  // Slider drag handling
  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsDraggingSlider(true);
  };

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!isDraggingSlider || !imageFrameRef.current) return;
    const rect = imageFrameRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = Math.round((x / rect.width) * 100);
    setSliderPos(percent);
  }, [isDraggingSlider]);

  const handlePointerUp = useCallback(() => {
    setIsDraggingSlider(false);
  }, []);

  useEffect(() => {
    if (isDraggingSlider) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    }
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDraggingSlider, handlePointerMove, handlePointerUp]);

  // Backdrop background class or style
  const getBackdropStyle = (): { className: string; style?: React.CSSProperties } => {
    switch (backdrop) {
      case 'checker-dark':
        return { className: 'bg-checkerboard-dark' };
      case 'checker-light':
        return { className: 'bg-checkerboard-light' };
      case 'white':
        return { className: 'bg-white' };
      case 'studio-grey':
        return { className: 'bg-[#F3F4F6]' };
      case 'slate':
        return { className: 'bg-[#0F172A]' };
      case 'warm':
        return { className: 'bg-[#FAF5EE]' };
      case 'custom':
        return { className: '', style: { backgroundColor: customBgColor } };
      default:
        return { className: 'bg-checkerboard-dark' };
    }
  };

  const backdropInfo = getBackdropStyle();
  const currentDisplayImage = resultImage || originalImage;

  return (
    <div
      ref={containerRef}
      className={`relative flex-1 flex flex-col bg-slate-950 overflow-hidden ${
        isFullscreen ? 'fixed inset-0 z-50' : 'h-full'
      }`}
    >
      {/* Top Controls Bar */}
      <div className="h-12 border-b border-slate-800/80 bg-slate-900/80 backdrop-blur px-4 flex items-center justify-between text-xs text-slate-300 z-20">
        {/* Left: View Mode Toggles */}
        <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800">
          <button
            type="button"
            onClick={() => setViewMode('split')}
            disabled={!resultImage}
            aria-label="Split Before and After comparison"
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              viewMode === 'split' && resultImage
                ? 'bg-sky-500/20 text-sky-400 font-medium'
                : 'text-slate-400 hover:text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Split Compare</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('side-by-side')}
            disabled={!resultImage}
            aria-label="Side by side comparison"
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              viewMode === 'side-by-side' && resultImage
                ? 'bg-sky-500/20 text-sky-400 font-medium'
                : 'text-slate-400 hover:text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed'
            }`}
          >
            <Columns2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Side by Side</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('single')}
            aria-label="Single view"
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              viewMode === 'single' || !resultImage
                ? 'bg-sky-500/20 text-sky-400 font-medium'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Single View</span>
          </button>
        </div>

        {/* Center: Hold to Peek Original (in Single View) */}
        {resultImage && viewMode === 'single' && (
          <button
            type="button"
            onMouseDown={() => setIsHoldingPeek(true)}
            onMouseUp={() => setIsHoldingPeek(false)}
            onMouseLeave={() => setIsHoldingPeek(false)}
            onTouchStart={() => setIsHoldingPeek(true)}
            onTouchEnd={() => setIsHoldingPeek(false)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-semibold select-none cursor-pointer transition-all active:scale-95"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Hold to See Original</span>
          </button>
        )}

        {/* Center label if active version */}
        {resultImage && viewMode !== 'single' && activeVersionLabel && (
          <div className="hidden md:flex items-center gap-2 text-slate-400 text-[11px]">
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
              {activeVersionLabel}
            </span>
            {promptUsed && (
              <span className="max-w-xs truncate text-slate-400" title={promptUsed}>
                "{promptUsed}"
              </span>
            )}
          </div>
        )}

        {/* Right: Backdrop switcher & Zoom */}
        <div className="flex items-center gap-2">
          {/* Backdrop color picker dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowColorPicker(!showColorPicker)}
              aria-label="Switch backdrop preview background"
              className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Preview backdrop background"
            >
              <Palette className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden md:inline">Backdrop</span>
            </button>

            {showColorPicker && (
              <div className="absolute right-0 top-9 w-52 p-2.5 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl z-30 space-y-2">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Backdrop Test Color
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    aria-label="Set backdrop to Dark Transparency Grid"
                    onClick={() => {
                      setBackdrop('checker-dark');
                      setShowColorPicker(false);
                    }}
                    className={`h-8 rounded-lg bg-checkerboard-dark border text-[10px] flex items-center justify-center cursor-pointer ${
                      backdrop === 'checker-dark' ? 'border-sky-500 ring-1 ring-sky-500' : 'border-slate-700'
                    }`}
                    title="Dark Transparency Grid"
                  >
                    Dark Grid
                  </button>
                  <button
                    type="button"
                    aria-label="Set backdrop to Light Transparency Grid"
                    onClick={() => {
                      setBackdrop('checker-light');
                      setShowColorPicker(false);
                    }}
                    className={`h-8 rounded-lg bg-checkerboard-light border text-[10px] text-slate-800 flex items-center justify-center cursor-pointer ${
                      backdrop === 'checker-light' ? 'border-sky-500 ring-1 ring-sky-500' : 'border-slate-700'
                    }`}
                    title="Light Transparency Grid"
                  >
                    Light Grid
                  </button>
                  <button
                    type="button"
                    aria-label="Set backdrop to Pure White"
                    onClick={() => {
                      setBackdrop('white');
                      setShowColorPicker(false);
                    }}
                    className={`h-8 rounded-lg bg-white border text-[10px] text-slate-900 font-semibold flex items-center justify-center cursor-pointer ${
                      backdrop === 'white' ? 'border-sky-500 ring-1 ring-sky-500' : 'border-slate-700'
                    }`}
                    title="Pure White (#FFFFFF)"
                  >
                    Pure White
                  </button>
                  <button
                    type="button"
                    aria-label="Set backdrop to Studio Grey"
                    onClick={() => {
                      setBackdrop('studio-grey');
                      setShowColorPicker(false);
                    }}
                    className={`h-8 rounded-lg bg-[#F3F4F6] border text-[10px] text-slate-800 flex items-center justify-center cursor-pointer ${
                      backdrop === 'studio-grey' ? 'border-sky-500 ring-1 ring-sky-500' : 'border-slate-700'
                    }`}
                    title="Studio Grey"
                  >
                    Studio Grey
                  </button>
                  <button
                    type="button"
                    aria-label="Set backdrop to Obsidian Slate"
                    onClick={() => {
                      setBackdrop('slate');
                      setShowColorPicker(false);
                    }}
                    className={`h-8 rounded-lg bg-[#0F172A] border text-[10px] text-slate-300 flex items-center justify-center cursor-pointer ${
                      backdrop === 'slate' ? 'border-sky-500 ring-1 ring-sky-500' : 'border-slate-700'
                    }`}
                    title="Obsidian Slate"
                  >
                    Slate
                  </button>
                  <button
                    type="button"
                    aria-label="Set backdrop to Warm Ivory"
                    onClick={() => {
                      setBackdrop('warm');
                      setShowColorPicker(false);
                    }}
                    className={`h-8 rounded-lg bg-[#FAF5EE] border text-[10px] text-amber-900 flex items-center justify-center cursor-pointer ${
                      backdrop === 'warm' ? 'border-sky-500 ring-1 ring-sky-500' : 'border-slate-700'
                    }`}
                    title="Warm Ivory"
                  >
                    Warm Ivory
                  </button>
                </div>
                {/* Custom Color Input */}
                <div className="flex items-center gap-2 pt-1 border-t border-slate-800">
                  <input
                    type="color"
                    value={customBgColor}
                    onChange={(e) => {
                      setCustomBgColor(e.target.value);
                      setBackdrop('custom');
                    }}
                    className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent"
                  />
                  <span className="text-[11px] text-slate-400">Custom Color</span>
                </div>
              </div>
            )}
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800">
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.max(25, z - 25))}
              aria-label="Zoom out"
              className="p-1 hover:text-white rounded cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1 font-mono text-[11px] w-9 text-center text-slate-400">
              {zoomLevel}%
            </span>
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.min(300, z + 25))}
              aria-label="Zoom in"
              className="p-1 hover:text-white rounded cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            {zoomLevel !== 100 && (
              <button
                type="button"
                onClick={() => setZoomLevel(100)}
                aria-label="Reset zoom"
                className="p-1 text-sky-400 hover:text-sky-300 rounded cursor-pointer"
                title="Reset Zoom to 100%"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Fullscreen */}
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:text-white transition-colors cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          {/* Export Button */}
          {resultImage && (
            <button
              type="button"
              onClick={onOpenExport}
              aria-label="Download and export photo"
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Canvas Viewport */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 overflow-auto select-none">
        {/* SIDE-BY-SIDE MODE */}
        {resultImage && viewMode === 'side-by-side' ? (
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full max-w-5xl">
            {/* Original Card */}
            <div className="flex-1 w-full flex flex-col items-center">
              <span className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                Original Photo
              </span>
              <div
                className={`w-full max-w-md aspect-square rounded-2xl overflow-hidden border border-slate-800 shadow-xl flex items-center justify-center ${backdropInfo.className}`}
                style={backdropInfo.style}
              >
                <img
                  src={originalImage}
                  alt="Original Product"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Cleaned Result Card */}
            <div className="flex-1 w-full flex flex-col items-center">
              <span className="text-xs font-semibold text-sky-400 mb-2 uppercase tracking-wider flex items-center gap-1">
                <span>Cleaned & Isolated</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </span>
              <div
                className={`w-full max-w-md aspect-square rounded-2xl overflow-hidden border border-sky-500/30 shadow-2xl flex items-center justify-center relative ${backdropInfo.className}`}
                style={backdropInfo.style}
              >
                <img
                  src={resultImage}
                  alt="Retouched Result"
                  referrerPolicy="no-referrer"
                  style={filterStyle}
                  className="w-full h-full object-contain transition-transform"
                />
              </div>
            </div>
          </div>
        ) : (
          /* SPLIT OR SINGLE VIEW MODE */
          <div
            ref={imageFrameRef}
            className={`relative max-w-3xl max-h-[75vh] aspect-square w-full rounded-2xl overflow-hidden border border-slate-800/90 shadow-2xl transition-all ${backdropInfo.className}`}
            style={{
              ...backdropInfo.style,
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: 'center center',
            }}
          >
            {/* Loading / Retouching Laser Scan Overlay */}
            {isProcessing && (
              <div className="absolute inset-0 z-30 bg-slate-950/70 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
                {/* Scanning Laser Line */}
                <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent shadow-[0_0_15px_#38bdf8] animate-scanline pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center max-w-xs">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-4 animate-pulse">
                    <Loader2 className="w-6 h-6 animate-spin" />
                  </div>
                  <h4 className="text-base font-bold text-slate-100 mb-1">
                    AI Retouching in Progress
                  </h4>
                  <p className="text-xs text-slate-400 mb-4">
                    Analyzing subject geometry, cutting edges & executing instructions...
                  </p>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-sky-500 to-indigo-500 h-full w-2/3 animate-pulse"></div>
                  </div>
                </div>
              </div>
            )}

            {/* If Single Mode or No Result yet */}
            {viewMode === 'single' || !resultImage ? (
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src={isHoldingPeek ? originalImage : currentDisplayImage}
                  alt="Product Display"
                  referrerPolicy="no-referrer"
                  style={isHoldingPeek ? {} : filterStyle}
                  className="w-full h-full object-contain"
                />
                {isHoldingPeek && (
                  <div className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-amber-500/90 text-slate-950 font-bold text-xs uppercase tracking-wider z-20">
                    Showing Original
                  </div>
                )}
              </div>
            ) : (
              /* SPLIT VIEW COMPARISON */
              <div className="relative w-full h-full">
                {/* Result Image (Bottom Layer) */}
                <img
                  src={resultImage}
                  alt="Retouched Result"
                  referrerPolicy="no-referrer"
                  style={filterStyle}
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                />

                {/* Original Image (Top Layer, clipped by slider position) */}
                <div
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                >
                  <img
                    src={originalImage}
                    alt="Original Product"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                </div>

                {/* Draggable Divider Handle */}
                <div
                  className="absolute top-0 bottom-0 z-20 -ml-3 w-6 cursor-ew-resize flex items-center justify-center group"
                  style={{ left: `${sliderPos}%` }}
                  onPointerDown={handlePointerDown}
                  aria-label="Drag slider to compare Before and After"
                >
                  {/* Vertical line */}
                  <div className="w-0.5 h-full bg-white shadow-[0_0_10px_rgba(0,0,0,0.8)]" />
                  {/* Center Knob */}
                  <div className="absolute w-8 h-8 rounded-full bg-white text-slate-900 shadow-xl flex items-center justify-center text-[10px] font-bold border border-slate-300 group-hover:scale-110 transition-transform">
                    <SlidersHorizontal className="w-4 h-4 text-slate-800" />
                  </div>
                </div>

                {/* Floating Labels */}
                <div className="absolute bottom-4 left-4 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur border border-slate-800 text-[11px] font-semibold text-slate-300 pointer-events-none z-10">
                  Original (Before)
                </div>
                <div className="absolute bottom-4 right-4 px-2.5 py-1 rounded-md bg-sky-950/80 backdrop-blur border border-sky-800/80 text-[11px] font-semibold text-sky-300 pointer-events-none z-10">
                  Cleaned (After)
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Info Pill */}
      {resultImage && (
        <div className="h-8 border-t border-slate-800/80 bg-slate-950/80 px-4 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span>Drag slider horizontally to inspect edges & surface retouching</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Gemini Nano Banana 2.1 Studio</span>
          </div>
        </div>
      )}
    </div>
  );
};
