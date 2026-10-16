/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SampleProduct {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  description: string;
  defaultPrompt: string;
  tags: string[];
  suggestedPrompts: string[];
}

// High quality vector product renders with realistic textures, backgrounds, smudges & stickers
export const SAMPLE_PRODUCTS: SampleProduct[] = [
  {
    id: 'perfume-bottle',
    name: 'Amber Glass Perfume',
    category: 'Fragrance & Beauty',
    description: 'Amber glass flacon with finger smudges and cluttered vanity backdrop.',
    defaultPrompt: 'Remove the cluttered background and place the amber perfume bottle on a seamless pure white #FFFFFF background with a soft natural contact shadow underneath.',
    tags: ['Glassware', 'Reflections', 'Smudges'],
    suggestedPrompts: [
      'Isolate on pure white (#FFFFFF) with a delicate soft contact shadow.',
      'Place on a minimalist fluted stone podium with gentle warm sunlight rays.',
      'Clean all fingerprints, smudges, and glare spots on the glass flacon.',
      'Place on a luxury Carrara marble bathroom counter with blurred spa greenery.',
    ],
    thumbnail: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
      <defs>
        <!-- Messy background gradients -->
        <linearGradient id="bgWall" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="%23d8c8b8"/>
          <stop offset="50%" stop-color="%23c4b5a5"/>
          <stop offset="100%" stop-color="%239a8c7e"/>
        </linearGradient>
        <linearGradient id="counter" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="%23856d58"/>
          <stop offset="100%" stop-color="%235c4634"/>
        </linearGradient>
        <!-- Amber Glass Gradient -->
        <linearGradient id="amberGlass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="%238a4b08" stop-opacity="0.85"/>
          <stop offset="25%" stop-color="%23d97706" stop-opacity="0.95"/>
          <stop offset="50%" stop-color="%23fbbf24" stop-opacity="0.8"/>
          <stop offset="75%" stop-color="%23d97706" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="%2378350f" stop-opacity="0.85"/>
        </linearGradient>
        <linearGradient id="goldCap" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="%23fef08a"/>
          <stop offset="40%" stop-color="%23eab308"/>
          <stop offset="70%" stop-color="%23ca8a04"/>
          <stop offset="100%" stop-color="%23854d0e"/>
        </linearGradient>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="%23221a14" flood-opacity="0.6"/>
        </filter>
      </defs>
      
      <!-- Cluttered Background -->
      <rect width="800" height="520" fill="url(%23bgWall)"/>
      <!-- Background clutter shapes (makeup brushes, mirror frame, wires) -->
      <path d="M 60 120 L 160 80 L 170 380 L 70 420 Z" fill="%23b0a090" opacity="0.4"/>
      <circle cx="680" cy="220" r="140" fill="none" stroke="%238f8072" stroke-width="12" opacity="0.3"/>
      <!-- Cluttered cable wire -->
      <path d="M 20 490 Q 200 520 380 470 T 780 500" fill="none" stroke="%234a3e35" stroke-width="5" opacity="0.45"/>
      <rect y="500" width="800" height="300" fill="url(%23counter)"/>
      
      <!-- Cast Shadow on Table -->
      <ellipse cx="400" cy="620" rx="140" ry="24" fill="%23241b14" opacity="0.65"/>
      
      <!-- Perfume Flacon Group -->
      <g filter="url(%23shadow)">
        <!-- Bottle Body -->
        <rect x="290" y="320" width="220" height="280" rx="20" fill="url(%23amberGlass)"/>
        <!-- Inner Liquid Level -->
        <rect x="302" y="380" width="196" height="206" rx="12" fill="%23f59e0b" opacity="0.35"/>
        
        <!-- Gold Collar & Cap -->
        <rect x="365" y="275" width="70" height="45" rx="4" fill="url(%23goldCap)"/>
        <rect x="350" y="180" width="100" height="95" rx="10" fill="url(%23goldCap)"/>
        
        <!-- Label -->
        <rect x="330" y="420" width="140" height="110" rx="4" fill="%23fffbeb" stroke="%23ca8a04" stroke-width="1.5"/>
        <text x="400" y="455" font-family="serif" font-size="14" font-weight="bold" fill="%23451a03" text-anchor="middle" letter-spacing="3">AMBRE</text>
        <text x="400" y="475" font-family="serif" font-size="10" fill="%2378350f" text-anchor="middle" letter-spacing="1">EAU DE PARFUM</text>
        <line x1="360" y1="488" x2="440" y2="488" stroke="%23ca8a04" stroke-width="0.8"/>
        <text x="400" y="505" font-family="sans-serif" font-size="8" fill="%2392400e" text-anchor="middle">50 ML · 1.7 FL.OZ</text>
        
        <!-- Surface Imperfections: Finger Smudge on Glass -->
        <ellipse cx="340" cy="360" rx="16" ry="24" fill="%23ffffff" opacity="0.32" transform="rotate(15 340 360)"/>
        <ellipse cx="465" cy="540" rx="22" ry="14" fill="%23ffffff" opacity="0.25" transform="rotate(-10 465 540)"/>
        <!-- Dust Specks -->
        <circle cx="320" cy="400" r="1.5" fill="%23ffffff" opacity="0.8"/>
        <circle cx="480" cy="350" r="1.2" fill="%23ffffff" opacity="0.7"/>
        <circle cx="310" cy="520" r="1.8" fill="%23ffffff" opacity="0.85"/>
        <circle cx="470" cy="480" r="1.4" fill="%23ffffff" opacity="0.75"/>
        
        <!-- Red Sale Tag / Blemish (Distraction to remove) -->
        <rect x="470" y="325" width="46" height="28" rx="4" fill="%23ef4444" opacity="0.9" transform="rotate(12 470 325)"/>
        <text x="493" y="343" font-family="sans-serif" font-size="11" font-weight="bold" fill="%23ffffff" text-anchor="middle" transform="rotate(12 470 325)">$49</text>
      </g>
    </svg>`,
  },
  {
    id: 'leather-sneaker',
    name: 'Pro-Court Athletic Sneaker',
    category: 'Footwear & Apparel',
    description: 'White & navy leather sneaker with scuffs on sidewalk concrete.',
    defaultPrompt: 'Remove the concrete pavement background and isolate the leather sneaker on a pure white background with realistic floor contact shadow.',
    tags: ['Footwear', 'Scuffs', 'Sole Details'],
    suggestedPrompts: [
      'Isolate sneaker on pure white (#FFFFFF) with a crisp contact drop shadow.',
      'Place on a sleek matte black podium with electric cyan rim lighting.',
      'Clean scuffs and dirt marks along the white rubber midsole.',
      'Place on a sunlit studio wooden floor with soft ambient shadows.',
    ],
    thumbnail: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
      <defs>
        <!-- Concrete sidewalk texture -->
        <linearGradient id="concrete" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="%2394a3b8"/>
          <stop offset="50%" stop-color="%2364748b"/>
          <stop offset="100%" stop-color="%23475569"/>
        </linearGradient>
        <linearGradient id="sole" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="%23f8fafc"/>
          <stop offset="100%" stop-color="%23e2e8f0"/>
        </linearGradient>
        <filter id="sneakerShadow">
          <feDropShadow dx="-10" dy="25" stdDeviation="15" flood-color="%230f172a" flood-opacity="0.5"/>
        </filter>
      </defs>
      
      <!-- Messy Sidewalk Background -->
      <rect width="800" height="800" fill="url(%23concrete)"/>
      <line x1="0" y1="580" x2="800" y2="580" stroke="%23334155" stroke-width="6"/>
      <!-- Pavement cracks -->
      <path d="M 120 700 L 220 640 L 280 670" stroke="%231e293b" stroke-width="2" fill="none" opacity="0.6"/>
      <path d="M 600 620 L 680 660 L 750 630" stroke="%231e293b" stroke-width="2" fill="none" opacity="0.5"/>
      <!-- Fallen leaf distraction -->
      <ellipse cx="680" cy="540" rx="30" ry="15" fill="%239a3412" transform="rotate(35 680 540)"/>
      
      <!-- Sneaker Cast Shadow -->
      <ellipse cx="380" cy="560" rx="270" ry="36" fill="%230f172a" opacity="0.7"/>
      
      <!-- Sneaker Silhouette Group -->
      <g filter="url(%23sneakerShadow)">
        <!-- Rubber Sole -->
        <path d="M 140 540 C 200 540 280 550 420 540 C 530 530 630 525 650 480 C 650 450 620 440 590 450 C 470 460 380 470 280 465 C 190 460 140 480 130 500 Z" fill="url(%23sole)"/>
        <!-- Midsole Accent Line -->
        <path d="M 145 520 C 240 520 380 525 590 480" stroke="%230284c7" stroke-width="6" fill="none"/>
        
        <!-- Upper Body -->
        <path d="M 160 480 C 190 430 250 370 340 340 C 400 320 460 300 490 320 C 530 350 560 410 610 440 C 540 450 380 460 160 480 Z" fill="%23ffffff"/>
        
        <!-- Heel Counter & Collar (Navy) -->
        <path d="M 440 310 C 480 300 520 330 540 370 C 550 400 560 430 530 440 C 480 440 450 390 430 360 Z" fill="%231e3a8a"/>
        <!-- Ankle Collar -->
        <ellipse cx="460" cy="330" rx="35" ry="50" fill="%230f172a" transform="rotate(25 460 330)"/>
        
        <!-- Lacing System -->
        <path d="M 330 345 L 360 365 M 310 370 L 345 390 M 290 395 L 330 415 M 270 420 L 310 440" stroke="%23f1f5f9" stroke-width="5" stroke-linecap="round"/>
        
        <!-- Brand Swoop Overlay -->
        <path d="M 230 450 Q 360 410 490 350 Q 380 470 300 465 Z" fill="%230284c7"/>
        
        <!-- Dirt / Scuffs on Sole (To clean) -->
        <ellipse cx="210" cy="525" rx="20" ry="6" fill="%2378350f" opacity="0.45" transform="rotate(5 210 525)"/>
        <path d="M 520 500 Q 550 505 570 495" stroke="%23451a03" stroke-width="3" opacity="0.5"/>
        <circle cx="280" cy="530" r="3" fill="%23334155" opacity="0.7"/>
        <circle cx="450" cy="510" r="2.5" fill="%23334155" opacity="0.6"/>
      </g>
    </svg>`,
  },
  {
    id: 'ceramic-mug',
    name: 'Artisan Speckled Ceramic Mug',
    category: 'Home & Kitchen',
    description: 'Rustic stoneware mug on cluttered office desk with cords and coffee rings.',
    defaultPrompt: 'Remove the cluttered office desk background and coffee ring stain. Place the ceramic mug on a warm morning sunlit marble coaster with clean, cozy lighting.',
    tags: ['Ceramics', 'Stains', 'Cozy'],
    suggestedPrompts: [
      'Isolate mug on pure white (#FFFFFF) with a crisp contact drop shadow.',
      'Place on a warm rustic oak wood breakfast tray with soft steam rising.',
      'Remove coffee ring stain, desk wires, and scratches around the mug.',
      'Place on a terrazzo cafe table with morning botanical window shadows.',
    ],
    thumbnail: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
      <defs>
        <linearGradient id="officeDesk" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="%23d6d3d1"/>
          <stop offset="100%" stop-color="%23a8a29e"/>
        </linearGradient>
        <linearGradient id="mugGlaze" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="%23e7e5e4"/>
          <stop offset="30%" stop-color="%23fafaf9"/>
          <stop offset="70%" stop-color="%23f5f5f4"/>
          <stop offset="100%" stop-color="%23d6d3d1"/>
        </linearGradient>
        <filter id="mugShadow">
          <feDropShadow dx="8" dy="16" stdDeviation="14" flood-color="%23292524" flood-opacity="0.45"/>
        </filter>
      </defs>
      
      <!-- Cluttered Desk Background -->
      <rect width="800" height="800" fill="url(%23officeDesk)"/>
      <!-- Laptop edge in background -->
      <rect x="-40" y="80" width="300" height="420" rx="8" fill="%2371717a" opacity="0.4"/>
      <!-- USB Cable clutter -->
      <path d="M 500 120 Q 640 300 480 480 T 780 720" fill="none" stroke="%2318181b" stroke-width="7" opacity="0.5"/>
      <!-- Sticky note distraction -->
      <rect x="580" y="320" width="120" height="110" fill="%23fef08a" transform="rotate(-8 580 320)"/>
      <text x="640" y="380" font-family="sans-serif" font-size="14" fill="%23854d0e" text-anchor="middle" transform="rotate(-8 580 320)">CALL BOB</text>
      
      <!-- Ugly Coffee Ring Stain on Desk (To remove) -->
      <circle cx="340" cy="590" r="130" fill="none" stroke="%2378350f" stroke-width="12" opacity="0.35"/>
      <circle cx="340" cy="590" r="115" fill="none" stroke="%2392400e" stroke-width="4" opacity="0.25"/>
      
      <!-- Mug Cast Shadow -->
      <ellipse cx="400" cy="610" rx="150" ry="25" fill="%23292524" opacity="0.55"/>
      
      <!-- Ceramic Mug Group -->
      <g filter="url(%23mugShadow)">
        <!-- Mug Handle -->
        <path d="M 480 350 C 590 350 590 510 470 510" fill="none" stroke="url(%23mugGlaze)" stroke-width="32" stroke-linecap="round"/>
        <path d="M 480 350 C 580 350 580 510 470 510" fill="none" stroke="%23e7e5e4" stroke-width="18" stroke-linecap="round"/>
        
        <!-- Mug Cylinder Body -->
        <path d="M 270 310 C 270 300 510 300 510 310 L 490 580 C 490 600 290 600 290 580 Z" fill="url(%23mugGlaze)"/>
        
        <!-- Mug Lip Rim -->
        <ellipse cx="390" cy="310" rx="120" ry="24" fill="%23fafaf9" stroke="%2378350f" stroke-width="3"/>
        <!-- Steaming Fresh Coffee Inside -->
        <ellipse cx="390" cy="312" rx="110" ry="20" fill="%23451a03"/>
        <ellipse cx="390" cy="312" rx="90" ry="14" fill="%2378350f" opacity="0.6"/>
        
        <!-- Natural Ceramic Speckles -->
        <circle cx="320" cy="380" r="2" fill="%2378350f" opacity="0.6"/>
        <circle cx="350" cy="460" r="1.5" fill="%2378350f" opacity="0.7"/>
        <circle cx="420" cy="420" r="2.5" fill="%2378350f" opacity="0.5"/>
        <circle cx="460" cy="510" r="1.8" fill="%2378350f" opacity="0.6"/>
        <circle cx="380" cy="530" r="2.2" fill="%2378350f" opacity="0.6"/>
        
        <!-- Unwanted Coffee Drip / Smudge on Front -->
        <path d="M 360 326 C 360 360 364 380 368 410 C 372 414 364 420 362 416 C 358 380 355 350 355 326 Z" fill="%2378350f" opacity="0.75"/>
      </g>
    </svg>`,
  },
  {
    id: 'luxury-watch',
    name: 'Minimal Chronograph Watch',
    category: 'Jewelry & Watches',
    description: 'Stainless steel sapphire watch with harsh ceiling light glare and dust.',
    defaultPrompt: 'Remove the background and reflection glare on the sapphire crystal. Place on a premium matte charcoal pedestal with sharp metallic edge lighting.',
    tags: ['Stainless Steel', 'Sapphire Glass', 'Glare'],
    suggestedPrompts: [
      'Isolate on pure white (#FFFFFF) with a delicate soft contact shadow.',
      'Place on a matte slate-grey luxury pedestal with dramatic studio rim lighting.',
      'Remove harsh light glare and fingerprint smudges across the watch crystal.',
      'Place on a dark reflective black acrylic surface with an elegant mirror reflection.',
    ],
    thumbnail: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
      <defs>
        <linearGradient id="watchSteel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="%23f1f5f9"/>
          <stop offset="35%" stop-color="%23cbd5e1"/>
          <stop offset="70%" stop-color="%2364748b"/>
          <stop offset="100%" stop-color="%2394a3b8"/>
        </linearGradient>
        <linearGradient id="watchDial" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="%230f172a"/>
          <stop offset="100%" stop-color="%23020617"/>
        </linearGradient>
        <filter id="watchShadow">
          <feDropShadow dx="0" dy="20" stdDeviation="18" flood-color="%23020617" flood-opacity="0.6"/>
        </filter>
      </defs>
      
      <!-- Cluttered Background -->
      <rect width="800" height="800" fill="%23334155"/>
      <!-- Scattered office tools and cords -->
      <line x1="80" y1="120" x2="720" y2="280" stroke="%23475569" stroke-width="18" stroke-linecap="round"/>
      <circle cx="200" cy="650" r="90" fill="%231e293b" opacity="0.4"/>
      
      <ellipse cx="400" cy="600" rx="160" ry="30" fill="%23020617" opacity="0.6"/>
      
      <!-- Watch Group -->
      <g filter="url(%23watchShadow)">
        <!-- Leather Strap (Top & Bottom) -->
        <rect x="350" y="80" width="100" height="200" rx="6" fill="%2378350f"/>
        <rect x="350" y="520" width="100" height="200" rx="6" fill="%2378350f"/>
        <!-- Strap Stitching -->
        <line x1="358" y1="90" x2="358" y2="260" stroke="%23d97706" stroke-dasharray="6 4" stroke-width="2"/>
        <line x1="442" y1="90" x2="442" y2="260" stroke="%23d97706" stroke-dasharray="6 4" stroke-width="2"/>
        <line x1="358" y1="540" x2="358" y2="710" stroke="%23d97706" stroke-dasharray="6 4" stroke-width="2"/>
        <line x1="442" y1="540" x2="442" y2="710" stroke="%23d97706" stroke-dasharray="6 4" stroke-width="2"/>
        
        <!-- Steel Case -->
        <circle cx="400" cy="400" r="160" fill="url(%23watchSteel)"/>
        <!-- Bezel -->
        <circle cx="400" cy="400" r="142" fill="%230f172a" stroke="%2394a3b8" stroke-width="3"/>
        
        <!-- Dial -->
        <circle cx="400" cy="400" r="130" fill="url(%23watchDial)"/>
        
        <!-- Crown & Pushers -->
        <rect x="555" y="385" width="22" height="30" rx="3" fill="url(%23watchSteel)"/>
        <rect x="545" y="325" width="18" height="20" rx="2" fill="url(%23watchSteel)"/>
        <rect x="545" y="455" width="18" height="20" rx="2" fill="url(%23watchSteel)"/>
        
        <!-- Dial Hour Markers -->
        <g stroke="%23f8fafc" stroke-width="3">
          <line x1="400" y1="285" x2="400" y2="305"/>
          <line x1="400" y1="495" x2="400" y2="515"/>
          <line x1="285" y1="400" x2="305" y2="400"/>
          <line x1="495" y1="400" x2="515" y2="400"/>
        </g>
        
        <!-- Watch Hands -->
        <line x1="400" y1="400" x2="400" y2="310" stroke="%23ffffff" stroke-width="4" stroke-linecap="round"/>
        <line x1="400" y1="400" x2="470" y2="440" stroke="%23ffffff" stroke-width="5" stroke-linecap="round"/>
        <line x1="400" y1="400" x2="340" y2="450" stroke="%23ef4444" stroke-width="2"/>
        <circle cx="400" cy="400" r="6" fill="%23ef4444"/>
        
        <!-- Harsh Glass Glare Reflection (To remove) -->
        <path d="M 300 320 Q 420 310 500 360 Q 420 400 310 370 Z" fill="%23ffffff" opacity="0.45"/>
        <ellipse cx="360" cy="430" rx="35" ry="12" fill="%23ffffff" opacity="0.3" transform="rotate(-30 360 430)"/>
      </g>
    </svg>`,
  },
  {
    id: 'botanical-serum',
    name: 'Emerald Botanical Serum',
    category: 'Skincare & Cosmetics',
    description: 'Green glass dropper bottle with water stains and distracting tile grid.',
    defaultPrompt: 'Remove the harsh tile background and water stains. Place the serum bottle on a calm wellness spa stone surrounded by soft botanical eucalyptus shadows.',
    tags: ['Cosmetics', 'Dropper', 'Green Glass'],
    suggestedPrompts: [
      'Isolate on pure white (#FFFFFF) with a delicate soft contact shadow.',
      'Place in a luxury sunlit spa scene with organic eucalyptus and palm shadows.',
      'Remove water spots, lime residue, and surface dust on the green glass bottle.',
      'Place on a warm travertine stone plinth with gentle ambient lighting.',
    ],
    thumbnail: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
      <defs>
        <linearGradient id="emeraldGlass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="%23064e3b"/>
          <stop offset="35%" stop-color="%23059669"/>
          <stop offset="70%" stop-color="%2310b981"/>
          <stop offset="100%" stop-color="%23064e3b"/>
        </linearGradient>
        <filter id="serumShadow">
          <feDropShadow dx="0" dy="16" stdDeviation="15" flood-color="%23064e3b" flood-opacity="0.4"/>
        </filter>
      </defs>
      
      <!-- Distracting Tile Grid Background -->
      <rect width="800" height="800" fill="%23e2e8f0"/>
      <!-- Grout lines -->
      <line x1="266" y1="0" x2="266" y2="800" stroke="%2394a3b8" stroke-width="4"/>
      <line x1="533" y1="0" x2="533" y2="800" stroke="%2394a3b8" stroke-width="4"/>
      <line x1="0" y1="266" x2="800" y2="266" stroke="%2394a3b8" stroke-width="4"/>
      <line x1="0" y1="533" x2="800" y2="533" stroke="%2394a3b8" stroke-width="4"/>
      <!-- Water stains on tile -->
      <ellipse cx="210" cy="480" rx="30" ry="18" fill="%23cbd5e1" opacity="0.6"/>
      <ellipse cx="580" cy="380" rx="40" ry="24" fill="%23cbd5e1" opacity="0.6"/>
      
      <ellipse cx="400" cy="620" rx="130" ry="22" fill="%230f172a" opacity="0.45"/>
      
      <!-- Dropper Bottle Group -->
      <g filter="url(%23serumShadow)">
        <!-- Bottle Body -->
        <rect x="310" y="340" width="180" height="260" rx="24" fill="url(%23emeraldGlass)"/>
        
        <!-- Bottle Neck & Golden Collar -->
        <rect x="365" y="270" width="70" height="70" rx="6" fill="%23d97706"/>
        <rect x="370" y="275" width="60" height="60" rx="4" fill="%23f59e0b"/>
        <!-- Rubber Bulb (Pipette) -->
        <path d="M 375 270 C 375 190 425 190 425 270 Z" fill="%23f8fafc"/>
        
        <!-- Label -->
        <rect x="340" y="410" width="120" height="130" rx="4" fill="%23ffffff" opacity="0.95"/>
        <text x="400" y="445" font-family="serif" font-size="13" font-weight="bold" fill="%23064e3b" text-anchor="middle" letter-spacing="2">BOTANICA</text>
        <text x="400" y="465" font-family="sans-serif" font-size="9" fill="%23047857" text-anchor="middle" letter-spacing="1">HYDRATING SERUM</text>
        <line x1="365" y1="480" x2="435" y2="480" stroke="%2310b981" stroke-width="1"/>
        <text x="400" y="500" font-family="sans-serif" font-size="8" fill="%236b7280" text-anchor="middle">30 ML / 1 FL OZ</text>
        
        <!-- Water Droplet Marks on Glass (Distractions to clean) -->
        <circle cx="330" cy="370" r="6" fill="%23ffffff" opacity="0.5"/>
        <circle cx="470" cy="560" r="8" fill="%23ffffff" opacity="0.45"/>
        <circle cx="460" cy="380" r="4" fill="%23ffffff" opacity="0.6"/>
      </g>
    </svg>`,
  }
];

/**
 * Returns a pristine, retouched version of sample products responding to prompt instructions
 */
export function getRetouchedSample(productId: string, promptText: string): string | null {
  const lower = promptText.toLowerCase();
  const isPodium = lower.includes('podium') || lower.includes('pedestal') || lower.includes('plinth');
  const isMarble = lower.includes('marble') || lower.includes('bathroom') || lower.includes('counter');
  const isWood = lower.includes('wood') || lower.includes('tabletop') || lower.includes('oak') || lower.includes('rustic');
  const isBlackOrDark = lower.includes('black') || lower.includes('dark') || lower.includes('reflection') || lower.includes('acrylic');
  const isTransparent = lower.includes('transparent') || lower.includes('cutout') || lower.includes('isolate');

  if (productId === 'perfume-bottle') {
    let backdropSvg = '<rect width="800" height="800" fill="#ffffff"/>';
    let shadowSvg = '<ellipse cx="400" cy="615" rx="135" ry="18" fill="#cbd5e1" opacity="0.6"/>';

    if (isPodium) {
      backdropSvg = `
        <defs>
          <linearGradient id="podiumWall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#f8fafc"/>
            <stop offset="100%" stop-color="#e2e8f0"/>
          </linearGradient>
          <linearGradient id="stoneTop" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#e2e8f0"/>
            <stop offset="50%" stop-color="#f8fafc"/>
            <stop offset="100%" stop-color="#cbd5e1"/>
          </linearGradient>
        </defs>
        <rect width="800" height="800" fill="url(#podiumWall)"/>
        <!-- Soft morning sun window beam -->
        <polygon points="100,0 350,0 700,800 300,800" fill="#ffffff" opacity="0.4"/>
        <!-- Stone Podium Plinth -->
        <ellipse cx="400" cy="640" rx="230" ry="45" fill="#94a3b8" opacity="0.4"/>
        <path d="M 180 590 C 180 620 620 620 620 590 L 620 680 C 620 710 180 710 180 680 Z" fill="#cbd5e1"/>
        <ellipse cx="400" cy="590" rx="220" ry="40" fill="url(#stoneTop)" stroke="#e2e8f0" stroke-width="2"/>
      `;
      shadowSvg = '<ellipse cx="400" cy="590" rx="130" ry="18" fill="#64748b" opacity="0.45"/>';
    } else if (isMarble) {
      backdropSvg = `
        <defs>
          <linearGradient id="marbleWall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#f1f5f9"/>
            <stop offset="100%" stop-color="#e2e8f0"/>
          </linearGradient>
        </defs>
        <rect width="800" height="800" fill="url(#marbleWall)"/>
        <!-- Marble Surface with Delicate Veining -->
        <rect y="540" width="800" height="260" fill="#ffffff"/>
        <path d="M 40 550 Q 240 600 480 570 T 780 620" stroke="#cbd5e1" stroke-width="2" fill="none" opacity="0.7"/>
        <path d="M 120 640 Q 380 620 640 670" stroke="#94a3b8" stroke-width="1.5" fill="none" opacity="0.5"/>
        <path d="M 0 540 L 800 540" stroke="#cbd5e1" stroke-width="2"/>
        <!-- Subtle eucalyptus leaf shadow pattern -->
        <path d="M 680 80 Q 720 180 650 260" stroke="#64748b" stroke-width="24" stroke-linecap="round" fill="none" opacity="0.12"/>
      `;
      shadowSvg = '<ellipse cx="400" cy="580" rx="125" ry="16" fill="#64748b" opacity="0.35"/>';
    } else if (isTransparent) {
      backdropSvg = ''; // pure transparent
      shadowSvg = '<ellipse cx="400" cy="615" rx="135" ry="18" fill="#334155" opacity="0.25"/>';
    }

    // Cleaned bottle without smudges, dust specks, or red price tag
    const bottleSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
      <defs>
        <linearGradient id="amberGlass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#8a4b08" stop-opacity="0.85"/>
          <stop offset="25%" stop-color="#d97706" stop-opacity="0.95"/>
          <stop offset="50%" stop-color="#fbbf24" stop-opacity="0.8"/>
          <stop offset="75%" stop-color="#d97706" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#78350f" stop-opacity="0.85"/>
        </linearGradient>
        <linearGradient id="goldCap" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#fef08a"/>
          <stop offset="40%" stop-color="#eab308"/>
          <stop offset="70%" stop-color="#ca8a04"/>
          <stop offset="100%" stop-color="#854d0e"/>
        </linearGradient>
        <filter id="cleanShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="12" stdDeviation="12" flood-color="#0f172a" flood-opacity="0.25"/>
        </filter>
      </defs>
      ${backdropSvg}
      ${shadowSvg}
      <g filter="url(#cleanShadow)">
        <rect x="290" y="320" width="220" height="280" rx="20" fill="url(#amberGlass)"/>
        <rect x="302" y="380" width="196" height="206" rx="12" fill="#f59e0b" opacity="0.35"/>
        <rect x="365" y="275" width="70" height="45" rx="4" fill="url(#goldCap)"/>
        <rect x="350" y="180" width="100" height="95" rx="10" fill="url(#goldCap)"/>
        <rect x="330" y="420" width="140" height="110" rx="4" fill="#fffbeb" stroke="#ca8a04" stroke-width="1.5"/>
        <text x="400" y="455" font-family="serif" font-size="14" font-weight="bold" fill="#451a03" text-anchor="middle" letter-spacing="3">AMBRE</text>
        <text x="400" y="475" font-family="serif" font-size="10" fill="#78350f" text-anchor="middle" letter-spacing="1">EAU DE PARFUM</text>
        <line x1="360" y1="488" x2="440" y2="488" stroke="#ca8a04" stroke-width="0.8"/>
        <text x="400" y="505" font-family="sans-serif" font-size="8" fill="#92400e" text-anchor="middle">50 ML · 1.7 FL.OZ</text>
        <!-- Polished studio specular highlight -->
        <rect x="305" y="335" width="12" height="250" rx="6" fill="#ffffff" opacity="0.4"/>
      </g>
    </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(bottleSvg)}`;
  }

  if (productId === 'leather-sneaker') {
    let backdropSvg = '<rect width="800" height="800" fill="#ffffff"/>';
    let shadowColor = '#cbd5e1';

    if (isBlackOrDark) {
      backdropSvg = '<rect width="800" height="800" fill="#090d16"/><ellipse cx="400" cy="570" rx="290" ry="35" fill="#0284c7" opacity="0.2"/>';
      shadowColor = '#020617';
    } else if (isPodium) {
      backdropSvg = `
        <rect width="800" height="800" fill="#0f172a"/>
        <!-- Electric podium -->
        <ellipse cx="400" cy="570" rx="300" ry="40" fill="#1e293b" stroke="#0284c7" stroke-width="2"/>
      `;
    }

    const sneakerSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
      <defs>
        <linearGradient id="soleClean" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="100%" stop-color="#f1f5f9"/>
        </linearGradient>
        <filter id="cleanSneakerShadow">
          <feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#0f172a" flood-opacity="0.3"/>
        </filter>
      </defs>
      ${backdropSvg}
      <ellipse cx="380" cy="555" rx="260" ry="30" fill="${shadowColor}" opacity="0.6"/>
      <g filter="url(#cleanSneakerShadow)">
        <path d="M 140 540 C 200 540 280 550 420 540 C 530 530 630 525 650 480 C 650 450 620 440 590 450 C 470 460 380 470 280 465 C 190 460 140 480 130 500 Z" fill="url(#soleClean)"/>
        <path d="M 145 520 C 240 520 380 525 590 480" stroke="#0284c7" stroke-width="6" fill="none"/>
        <path d="M 160 480 C 190 430 250 370 340 340 C 400 320 460 300 490 320 C 530 350 560 410 610 440 C 540 450 380 460 160 480 Z" fill="#ffffff"/>
        <path d="M 440 310 C 480 300 520 330 540 370 C 550 400 560 430 530 440 C 480 440 450 390 430 360 Z" fill="#1e3a8a"/>
        <ellipse cx="460" cy="330" rx="35" ry="50" fill="#0f172a" transform="rotate(25 460 330)"/>
        <path d="M 330 345 L 360 365 M 310 370 L 345 390 M 290 395 L 330 415 M 270 420 L 310 440" stroke="#f1f5f9" stroke-width="5" stroke-linecap="round"/>
        <path d="M 230 450 Q 360 410 490 350 Q 380 470 300 465 Z" fill="#0284c7"/>
      </g>
    </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(sneakerSvg)}`;
  }

  if (productId === 'ceramic-mug') {
    const mugSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
      <defs>
        <linearGradient id="warmBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#faf5ee"/>
          <stop offset="100%" stop-color="#f3ece2"/>
        </linearGradient>
        <linearGradient id="oakWood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#d7ba9d"/>
          <stop offset="100%" stop-color="#b89b7b"/>
        </linearGradient>
        <linearGradient id="mugGlazeClean" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#f5f5f4"/>
          <stop offset="50%" stop-color="#ffffff"/>
          <stop offset="100%" stop-color="#e7e5e4"/>
        </linearGradient>
        <filter id="cleanMugShadow">
          <feDropShadow dx="0" dy="16" stdDeviation="14" flood-color="#78350f" flood-opacity="0.2"/>
        </filter>
      </defs>
      <rect width="800" height="800" fill="url(#warmBg)"/>
      <rect y="560" width="800" height="240" fill="url(#oakWood)"/>
      <!-- Natural wood grain -->
      <line x1="0" y1="620" x2="800" y2="620" stroke="#a88a68" stroke-width="1.5" opacity="0.6"/>
      <line x1="0" y1="700" x2="800" y2="700" stroke="#a88a68" stroke-width="1.5" opacity="0.6"/>
      <ellipse cx="400" cy="590" rx="140" ry="20" fill="#78350f" opacity="0.3"/>
      <!-- Soft morning steam -->
      <path d="M 370 290 Q 360 230 380 180" stroke="#ffffff" stroke-width="8" stroke-linecap="round" fill="none" opacity="0.5"/>
      <path d="M 410 290 Q 430 220 400 170" stroke="#ffffff" stroke-width="7" stroke-linecap="round" fill="none" opacity="0.4"/>
      <g filter="url(#cleanMugShadow)">
        <path d="M 480 350 C 590 350 590 510 470 510" fill="none" stroke="url(#mugGlazeClean)" stroke-width="32" stroke-linecap="round"/>
        <path d="M 480 350 C 580 350 580 510 470 510" fill="none" stroke="#ffffff" stroke-width="18" stroke-linecap="round"/>
        <path d="M 270 310 C 270 300 510 300 510 310 L 490 580 C 490 600 290 600 290 580 Z" fill="url(#mugGlazeClean)"/>
        <ellipse cx="390" cy="310" rx="120" ry="24" fill="#fafaf9" stroke="#78350f" stroke-width="2"/>
        <ellipse cx="390" cy="312" rx="110" ry="20" fill="#451a03"/>
        <circle cx="320" cy="380" r="2" fill="#78350f" opacity="0.5"/>
        <circle cx="350" cy="460" r="1.5" fill="#78350f" opacity="0.6"/>
        <circle cx="420" cy="420" r="2.5" fill="#78350f" opacity="0.4"/>
        <circle cx="460" cy="510" r="1.8" fill="#78350f" opacity="0.5"/>
      </g>
    </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(mugSvg)}`;
  }

  // Fallback pure white isolation for any sample
  const fallbackSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
    <rect width="800" height="800" fill="#ffffff"/>
    <ellipse cx="400" cy="610" rx="150" ry="20" fill="#cbd5e1" opacity="0.6"/>
    <text x="400" y="700" font-family="sans-serif" font-size="14" fill="#94a3b8" text-anchor="middle">Isolated Subject on Pure White</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(fallbackSvg)}`;
}

