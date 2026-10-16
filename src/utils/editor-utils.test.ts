import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildRetouchPrompt,
  calculateAspectRatioDimensions,
  addVersionToHistory,
  generateExportFilename,
  formatBytes,
  PROMPT_PRESETS,
} from './editor-utils.ts';

test('buildRetouchPrompt enhances prompt with commercial photography constraints', () => {
  const result = buildRetouchPrompt('Remove background and put on white podium');
  assert.ok(result.includes('Remove background and put on white podium'));
  assert.ok(result.includes('Professional commercial product photography'));
  assert.ok(result.includes('razor-sharp fidelity'));
});

test('buildRetouchPrompt handles empty input gracefully', () => {
  const fallback = buildRetouchPrompt('');
  assert.ok(fallback.includes('Clean up the product photo'));
});

test('calculateAspectRatioDimensions computes square correctly', () => {
  const dims = calculateAspectRatioDimensions('1:1', 800);
  assert.equal(dims.width, 800);
  assert.equal(dims.height, 800);
});

test('calculateAspectRatioDimensions computes 16:9 correctly', () => {
  const dims = calculateAspectRatioDimensions('16:9', 1600);
  assert.equal(dims.width, 1600);
  assert.equal(dims.height, 900);
});

test('calculateAspectRatioDimensions computes 9:16 portrait correctly', () => {
  const dims = calculateAspectRatioDimensions('9:16', 1600);
  assert.equal(dims.height, 1600);
  assert.equal(dims.width, 900);
});

test('addVersionToHistory immutably appends new version entry', () => {
  const initialHistory: import('./editor-utils.ts').EditVersion[] = [];
  const updated = addVersionToHistory(initialHistory, 'data:image/png;base64,abc', 'White background');
  assert.equal(updated.length, 1);
  assert.equal(updated[0].prompt, 'White background');
  assert.equal(updated[0].label, 'Version 1');
  assert.equal(updated[0].modelUsed, 'gemini-nano-banana-2.1');

  const second = addVersionToHistory(updated, 'data:image/png;base64,def', 'Wood table');
  assert.equal(second.length, 2);
  assert.equal(second[1].label, 'Version 2');
});

test('generateExportFilename sanitizes filename and attaches format', () => {
  const filename = generateExportFilename('perfume bottle.png', 'Pure White #FFF', 'png');
  assert.ok(filename.startsWith('perfume_bottle_pure_white__fff_'));
  assert.ok(filename.endsWith('.png'));
});

test('formatBytes formats file sizes correctly', () => {
  assert.equal(formatBytes(0), '0 Bytes');
  assert.equal(formatBytes(1024), '1 KB');
  assert.equal(formatBytes(1536), '1.5 KB');
  assert.equal(formatBytes(1048576), '1 MB');
});

test('PROMPT_PRESETS contains required preset categories', () => {
  assert.ok(PROMPT_PRESETS.length >= 6);
  const categories = PROMPT_PRESETS.map((p) => p.category);
  assert.ok(categories.includes('remove-bg'));
  assert.ok(categories.includes('pure-white'));
  assert.ok(categories.includes('clean-imperfections'));
});
