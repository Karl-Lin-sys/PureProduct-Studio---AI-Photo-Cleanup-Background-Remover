/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface EditVersion {
  id: string;
  timestamp: number;
  imageUrl: string;
  prompt: string;
  modelUsed: string;
  label: string;
}

export type PresetCategory = 
  | 'remove-bg'
  | 'pure-white'
  | 'podium'
  | 'clean-imperfections'
  | 'lifestyle'
  | 'shadows';

export interface PromptPreset {
  id: string;
  title: string;
  icon: string;
  prompt: string;
  category: PresetCategory;
  description: string;
}

export const PROMPT_PRESETS: PromptPreset[] = [
  {
    id: 'transparent-isolate',
    title: 'Transparent Cutout',
    icon: 'Sparkles',
    prompt: 'Remove the entire background completely. Isolate the product cleanly on a transparent background with crisp, smooth product edges and no leftover artifacts.',
    category: 'remove-bg',
    description: 'Perfect for logos, product catalog listings, and PNG cutouts.'
  },
  {
    id: 'amazon-pure-white',
    title: 'Amazon Pure White (#FFF)',
    icon: 'Sun',
    prompt: 'Remove the background and place the product on a seamless, pure white (#FFFFFF) studio background with a subtle, realistic contact drop shadow underneath for depth.',
    category: 'pure-white',
    description: 'Compliant with Amazon, eBay, and Google Shopping marketplace standards.'
  },
  {
    id: 'clean-scratches-glare',
    title: 'Erase Dust & Glare',
    icon: 'Wand2',
    prompt: 'Clean up the product surface: remove any dust specks, fingerprints, surface scratches, stickers, price tags, and harsh glare reflections while preserving sharp product details and original textures.',
    category: 'clean-imperfections',
    description: 'Retouch blemishes, smudges, tags, and surface imperfections.'
  },
  {
    id: 'minimalist-podium',
    title: 'Stone Podium & Studio Light',
    icon: 'Layers',
    prompt: 'Place the product centered on an elegant, minimalist matte stone podium with soft architectural studio lighting, gentle ambient occlusion shadows, and a clean neutral gradient background.',
    category: 'podium',
    description: 'Modern luxury aesthetic for DTC brands, skincare, and electronics.'
  },
  {
    id: 'warm-wood-lifestyle',
    title: 'Warm Wooden Tabletop',
    icon: 'Coffee',
    prompt: 'Remove the cluttered background and place the product on a warm, natural oak wooden tabletop with soft morning sunlight streaming in, subtle window shadow casting, and a softly blurred warm interior background.',
    category: 'lifestyle',
    description: 'Warm, cozy lifestyle feel for apparel, homeware, and beverages.'
  },
  {
    id: 'luxury-marble-bathroom',
    title: 'Marble Countertop',
    icon: 'Sparkle',
    prompt: 'Place the product on a luxurious white Carrara marble countertop with delicate grey veining, soft diffused studio light, and a clean minimalist blurred background.',
    category: 'lifestyle',
    description: 'High-end aesthetic for perfumes, cosmetics, and jewelry.'
  },
  {
    id: 'commercial-reflection',
    title: 'Studio Reflection Floor',
    icon: 'Mirror',
    prompt: 'Isolate the product on a sleek glossy dark acrylic surface with a crystal-clear subtle mirror reflection directly underneath, illuminated by crisp rim lighting.',
    category: 'shadows',
    description: 'Sleek tech, luxury watches, and premium gadgets.'
  },
  {
    id: 'botanical-spa',
    title: 'Botanical & Palm Shadows',
    icon: 'Palmtree',
    prompt: 'Place the product in a high-end wellness aesthetic setting: warm textured plaster backdrop with gentle, elegant organic palm leaf shadow patterns and soft warm natural lighting.',
    category: 'lifestyle',
    description: 'Organic, wellness, skincare, and eco-friendly products.'
  }
];

/**
 * Builds an enhanced retoucher prompt tailored for Gemini image generation
 */
export function buildRetouchPrompt(userInstruction: string): string {
  const trimmed = userInstruction.trim();
  if (!trimmed) {
    return 'Clean up the product photo, isolate the product cleanly, remove distractions, and enhance image clarity.';
  }

  // Prepend professional studio guidance to ensure the subject integrity is kept intact
  return `Professional commercial product photography retouching: ${trimmed}. Ensure the main product geometry, branding, labels, colors, and authentic details are preserved with razor-sharp fidelity, perfectly balanced lighting, and zero AI noise.`;
}

/**
 * Calculate canvas display dimensions preserving aspect ratio
 */
export function calculateAspectRatioDimensions(aspectRatio: string, maxDim: number = 800): { width: number; height: number } {
  const parts = aspectRatio.split(':');
  if (parts.length !== 2) return { width: maxDim, height: maxDim };
  
  const w = parseFloat(parts[0]);
  const h = parseFloat(parts[1]);
  if (!w || !h || isNaN(w) || isNaN(h)) return { width: maxDim, height: maxDim };

  if (w >= h) {
    return {
      width: maxDim,
      height: Math.round((maxDim * h) / w),
    };
  } else {
    return {
      width: Math.round((maxDim * w) / h),
      height: maxDim,
    };
  }
}

/**
 * Add a new edit version to the timeline history
 */
export function addVersionToHistory(
  history: EditVersion[],
  newImageUrl: string,
  prompt: string,
  modelUsed: string = 'gemini-nano-banana-2.1'
): EditVersion[] {
  const newVersion: EditVersion = {
    id: `ver-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: Date.now(),
    imageUrl: newImageUrl,
    prompt,
    modelUsed,
    label: `Version ${history.length + 1}`
  };

  return [...history, newVersion];
}

/**
 * Generates appropriate filename for downloading
 */
export function generateExportFilename(
  originalName: string = 'product',
  presetTitle: string = 'cleaned',
  extension: 'png' | 'jpg' | 'webp' = 'png'
): string {
  const cleanOriginal = originalName.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_');
  const cleanPreset = presetTitle.toLowerCase().replace(/[^a-zA-Z0-9_-]/g, '_');
  return `${cleanOriginal}_${cleanPreset}_${Date.now()}.${extension}`;
}

/**
 * Human-readable byte formatting
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}
