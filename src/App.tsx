/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { InstructionPanel } from './components/InstructionPanel.tsx';
import { CanvasWorkspace } from './components/CanvasWorkspace.tsx';
import { VersionHistory } from './components/VersionHistory.tsx';
import { ExportModal } from './components/ExportModal.tsx';
import { SampleProductPicker } from './components/SampleProductPicker.tsx';
import { DropzoneEmptyState } from './components/DropzoneEmptyState.tsx';
import { HelpModal } from './components/HelpModal.tsx';
import { SAMPLE_PRODUCTS, SampleProduct } from './data/sample-products.ts';
import { EditVersion, addVersionToHistory } from './utils/editor-utils.ts';
import { AlertCircle, X } from 'lucide-react';

export default function App() {
  // Initialize with the amber perfume bottle sample so the studio is immediately ready to try
  const [currentProduct, setCurrentProduct] = useState<SampleProduct | null>(SAMPLE_PRODUCTS[0]);
  const [originalImage, setOriginalImage] = useState<string | null>(SAMPLE_PRODUCTS[0].thumbnail);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [history, setHistory] = useState<EditVersion[]>([]);
  const [activeVersionId, setActiveVersionId] = useState<string | null>(null);

  // Prompt and Settings
  const [prompt, setPrompt] = useState<string>(SAMPLE_PRODUCTS[0].defaultPrompt);
  const [aspectRatio, setAspectRatio] = useState<string>('1:1');
  const [imageSize, setImageSize] = useState<string>('1K');
  const [suggestions, setSuggestions] = useState<string[]>(SAMPLE_PRODUCTS[0].suggestedPrompts);

  // Loading & Error States
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSuggesting, setIsSuggesting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Modals
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isSamplePickerOpen, setIsSamplePickerOpen] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);

  // Local post-processing adjustments
  const [clientAdjustments, setClientAdjustments] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
  });

  // Handle URL query param (?autostart=1 or ?sample=perfume)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sampleId = params.get('sample');
    if (sampleId) {
      const found = SAMPLE_PRODUCTS.find((p) => p.id === sampleId);
      if (found) {
        loadSampleProduct(found);
      }
    }
  }, []);

  const loadSampleProduct = (sample: SampleProduct) => {
    setCurrentProduct(sample);
    setOriginalImage(sample.thumbnail);
    setResultImage(null);
    setHistory([]);
    setActiveVersionId(null);
    setPrompt(sample.defaultPrompt);
    setSuggestions(sample.suggestedPrompts);
    setErrorMessage(null);
    setClientAdjustments({ brightness: 100, contrast: 100, saturation: 100 });
  };

  const handleCustomUpload = (dataUrl: string, name?: string) => {
    setCurrentProduct(null);
    setOriginalImage(dataUrl);
    setResultImage(null);
    setHistory([]);
    setActiveVersionId(null);
    setPrompt('Remove the background and isolate this product on a seamless pure white #FFFFFF background with a soft natural contact shadow.');
    setSuggestions([
      'Isolate on pure white (#FFFFFF) with a delicate soft contact shadow.',
      'Place on a minimalist marble podium with soft diffuse lighting.',
      'Remove all surface scratches, fingerprints, and harsh reflection glare.',
      'Place in an aesthetic warm oak tabletop lifestyle setting.',
    ]);
    setErrorMessage(null);
    setClientAdjustments({ brightness: 100, contrast: 100, saturation: 100 });
  };

  // Submit retouch prompt to server API
  const handleRetouchSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!originalImage || !prompt.trim() || isProcessing) return;

    try {
      setIsProcessing(true);
      setErrorMessage(null);

      // Determine input image (if we have a current result and want to build upon it, or use original)
      const rawInput = resultImage || originalImage;

      // Ensure vector SVGs are rasterized to a PNG canvas before sending to Gemini
      let inputImage = rawInput;
      if (rawInput.startsWith('data:image/svg+xml')) {
        inputImage = await new Promise<string>((resolve) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 800;
            canvas.height = 800;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, 800, 800);
              resolve(canvas.toDataURL('image/png'));
            } else {
              resolve(rawInput);
            }
          };
          img.onerror = () => resolve(rawInput);
          img.src = rawInput;
        });
      }

      const response = await fetch('/api/edit-product-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: inputImage,
          prompt: prompt.trim(),
          aspectRatio,
          imageSize,
          model: 'gemini-nano-banana-2.1',
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to edit product photo');
      }

      const newImageUrl = data.imageUrl;
      const modelUsed = data.modelUsed || 'gemini-nano-banana-2.1';

      // Append to history
      const updatedHistory = addVersionToHistory(history, newImageUrl, prompt.trim(), modelUsed);
      setHistory(updatedHistory);
      const latestVersion = updatedHistory[updatedHistory.length - 1];
      setActiveVersionId(latestVersion.id);
      setResultImage(newImageUrl);
    } catch (err: any) {
      console.error('Retouch failed:', err);
      setErrorMessage(err.message || 'Error executing photo retouch. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Request AI suggestions for current image
  const handleRequestSuggestions = async () => {
    if (!originalImage || isSuggesting) return;
    try {
      setIsSuggesting(true);
      const response = await fetch('/api/suggest-edits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: originalImage,
          productName: currentProduct?.name || 'Product',
        }),
      });
      const data = await response.json();
      if (data.suggestions && Array.isArray(data.suggestions)) {
        setSuggestions(data.suggestions);
      }
    } catch (err) {
      console.error('Failed to get suggestions:', err);
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleSelectVersion = (version: EditVersion) => {
    setActiveVersionId(version.id);
    setResultImage(version.imageUrl);
    setPrompt(version.prompt);
  };

  const handleResetToOriginal = () => {
    setActiveVersionId(null);
    setResultImage(null);
  };

  const activeVersion = history.find((v) => v.id === activeVersionId);

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* App Header */}
      <Header
        onNewImageClick={() => setOriginalImage(null)}
        onOpenSampleModal={() => setIsSamplePickerOpen(true)}
        onOpenHelpModal={() => setIsHelpOpen(true)}
        currentModel="gemini-nano-banana-2.1"
        hasActiveImage={!!originalImage}
      />

      {/* Error Toast Banner */}
      {errorMessage && (
        <div className="bg-red-500/10 border-b border-red-500/20 px-4 py-2.5 flex items-center justify-between text-xs text-red-400 z-50">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button
            onClick={() => setErrorMessage(null)}
            className="p-1 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Studio Viewport */}
      {!originalImage ? (
        <DropzoneEmptyState
          onImageSelected={handleCustomUpload}
          onSelectSample={loadSampleProduct}
        />
      ) : (
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
          {/* Left Panel: Instructions, Presets, Settings */}
          <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 h-1/2 lg:h-full z-10">
            <InstructionPanel
              prompt={prompt}
              setPrompt={setPrompt}
              onSubmit={handleRetouchSubmit}
              isProcessing={isProcessing}
              aspectRatio={aspectRatio}
              setAspectRatio={setAspectRatio}
              imageSize={imageSize}
              setImageSize={setImageSize}
              onRequestSuggestions={handleRequestSuggestions}
              isSuggesting={isSuggesting}
              suggestions={suggestions}
              clientAdjustments={clientAdjustments}
              setClientAdjustments={setClientAdjustments}
              hasResult={!!resultImage}
            />
          </div>

          {/* Center Workspace: Canvas with Interactive Split Slider */}
          <CanvasWorkspace
            originalImage={originalImage}
            resultImage={resultImage}
            isProcessing={isProcessing}
            onOpenExport={() => setIsExportOpen(true)}
            clientAdjustments={clientAdjustments}
            promptUsed={activeVersion?.prompt}
            activeVersionLabel={activeVersion?.label}
          />

          {/* Right Panel: Version History Timeline */}
          {history.length > 0 && (
            <div className="hidden xl:block w-72 flex-shrink-0 h-full z-10">
              <VersionHistory
                history={history}
                activeVersionId={activeVersionId}
                onSelectVersion={handleSelectVersion}
                onResetToOriginal={handleResetToOriginal}
                originalImage={originalImage}
              />
            </div>
          )}
        </div>
      )}

      {/* Export Modal */}
      {resultImage && (
        <ExportModal
          isOpen={isExportOpen}
          onClose={() => setIsExportOpen(false)}
          imageUrl={resultImage}
          currentPrompt={activeVersion?.prompt || prompt}
        />
      )}

      {/* Sample Product Picker Modal */}
      <SampleProductPicker
        isOpen={isSamplePickerOpen}
        onClose={() => setIsSamplePickerOpen(false)}
        onSelectProduct={loadSampleProduct}
      />

      {/* Help Modal */}
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
}
