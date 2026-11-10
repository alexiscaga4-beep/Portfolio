import type { DesignProject, CaseStudy } from './types';

/**
 * =========================================================================
 * 💡 HOW TO ADD OR CHANGE PICTURES IN YOUR GRAPHIC DESIGN PORTFOLIO:
 * =========================================================================
 * 1. DROP YOUR IMAGE FILE:
 *    Place your image (.png, .jpg, .jpeg, .webp, or .svg) inside:
 *    -> `public/images/` (e.g. `public/images/my-poster.jpg`)
 *    (or `assets/images/my-poster.jpg`)
 *
 * 2. ADD / EDIT AN ENTRY BELOW:
 *    Add or edit an object in the `GRAPHIC_DESIGN_PROJECTS` array below with:
 *    - `title`: Name of your graphic design project
 *    - `category`: 'advertising' | 'branding' | 'posters' | 'packaging' | 'editorial'
 *    - `img`: "./assets/images/my-poster.jpg" (or "/images/my-poster.jpg")
 *    - `tag`: Badge tag (e.g. "PRODUCT ADVERTISEMENT", "BRAND IDENTITY", etc.)
 *    - `desc`: A short summary of your design concept & techniques
 *
 * 3. SAVE AND RELOAD:
 *    Your new picture will automatically render with interactive 3D tilt,
 *    category filtering, and high-resolution zoom lightbox!
 * =========================================================================
 */

export const GRAPHIC_DESIGN_PROJECTS: DesignProject[] = [
  // ==========================================
  // ⭐ DEBUT CLIENT WORK & CULTURAL POSTER
  // ==========================================
  {
    id: "client-debut-01",
    title: "National Indigenous Peoples Month — Commemorative Poster",
    tag: "1ST CLIENT COMMISSION // CULTURAL ADVOCACY",
    category: "posters client",
    img: "./assets/images/indigenous-peoples-month-poster.jpg",
    date: "1ST CLIENT WORK",
    client: "National Indigenous Peoples Month Campaign (Debut Client)",
    desc: "Official first client commission commemorating National Indigenous Peoples Month. Combines traditional indigenous dancer portraiture and Cordillera mountain scenery with bold split-tone serif typography, textured risograph paper grain, and rich cultural heritage color grading.",
    tools: ["Adobe Photoshop", "Client Poster Art Direction", "Typography Compositing", "Heritage Color Grading"]
  },

  // ==========================================
  // 🎓 ACADEMIC & SCHOOL DESIGN PROJECTS
  // ==========================================
  {
    id: "school-starbucks-01",
    title: "Starbucks Caramel Macchiato — Beverage Advertising Poster",
    tag: "SCHOOL PROJECT // BEVERAGE ADVERTISING",
    category: "advertising school posters",
    img: "./assets/images/starbucks-caramel-macchiato-poster.jpg",
    date: "SCHOOL PROJECT",
    client: "Starbucks Coffee (School Project)",
    desc: "Commercial beverage advertising poster created as a school design project. Showcases Starbucks Caramel Macchiato featuring dynamic layered iced espresso compositing, floating 3D coffee beans, iconic brand siren curves, and high-impact vertical stencil typography.",
    tools: ["Adobe Photoshop", "Product Retouching", "Typography Compositing", "Commercial Advertising"]
  },
  {
    id: "school-spiderman-01",
    title: "The Amazing Spider-Man — Cinematic Key Art Poster",
    tag: "SCHOOL PROJECT // MOVIE KEY ART",
    category: "posters school",
    img: "./assets/images/amazing-spiderman-poster.jpg",
    date: "SCHOOL PROJECT",
    client: "Marvel / The Amazing Spider-Man (School Project)",
    desc: "Atmospheric movie key art poster designed for a school creative project. Centers on a hooded, masked Spider-Man figure against a luminous blue night city skyline, woven through with intricate glowing spiderwebs and dramatic serif title typography.",
    tools: ["Adobe Photoshop", "Photo Manipulation", "Atmospheric Lighting", "Cinematic Poster Art"]
  },

  // ==========================================
  // ⭐ PRODUCT ADVERTISEMENT CAMPAIGNS
  // ==========================================
  {
    id: "product-ad-01",
    title: "Dracula — Limited Edition Taekwondo Shoes Campaign",
    tag: "PRODUCT ADVERTISEMENT // FOOTWEAR",
    category: "advertising",
    img: "./assets/images/dracula-taekwondo-ad.jpg",
    date: "CAMPAIGN 01",
    client: "Dracula Martial Arts / 德古拉",
    desc: "Commercial product advertisement poster showcasing Dracula limited edition professional Taekwondo training shoes. Engineered with dynamic red velocity ribbons, bold outline typography, and high-contrast studio rim lighting.",
    tools: ["Adobe Photoshop", "Product Retouching", "Typography Compositing"]
  },
  {
    id: "product-ad-03",
    title: "Delicious Sushi — Culinary Social Campaign & Poster",
    tag: "PRODUCT ADVERTISEMENT // FOOD & DINING",
    category: "advertising",
    img: "./assets/images/delicious-sushi-poster.png",
    date: "CAMPAIGN 03",
    client: "Artisanal Japanese Cuisine",
    desc: "High-energy promotional social media poster featuring an appetizing sushi platter arrangement, dynamic diagonal blue blocking, repeated typographic background textures, and high-conversion call-to-action layout.",
    tools: ["Adobe Illustrator", "Photoshop", "Social Ad Campaign"]
  }
];

// Alias for backwards compatibility with any existing imports
export const ARTWORKS = GRAPHIC_DESIGN_PROJECTS;

export const CASE_STUDIES: Record<string, CaseStudy> = {
  clientPoster: {
    tag: "FIRST CLIENT COMMISSION // CULTURAL ADVOCACY",
    title: "NATIONAL INDIGENOUS PEOPLES MONTH POSTER",
    body: "Official debut graphic design commission for a client celebrating National Indigenous Peoples Month. Combines traditional cultural heritage photography with bold modern typography compositing, textured risograph and film grain treatments, and dynamic landscape elevation grading.",
    deliverables: [
      "High-Resolution Print Poster (B1 & Social 1:1 Formats)",
      "Multi-Layer Depth Typography Composite (Foreground / Midground)",
      "Traditional Cultural Attire Color Grading & Retouching",
      "Textured Grain & Atmospheric Lighting System"
    ]
  },
  starbucksMacchiato: {
    tag: "SCHOOL PROJECT // BEVERAGE ADVERTISING",
    title: "STARBUCKS CARAMEL MACCHIATO POSTER",
    body: "Commercial beverage advertisement designed as an academic school project. Combines layered iced coffee transparency compositing, floating roasted coffee beans with realistic depth of field, Starbucks brand siren curves, and vertical stencil typography.",
    deliverables: [
      "Commercial Beverage Poster (Print & Digital Out-of-Home)",
      "Floating 3D Coffee Bean Particle Compositing",
      "Brand Vector Curve Background Integration",
      "Vertical Typographic Hierarchy & Stencil Layout"
    ]
  },
  schoolSpiderman: {
    tag: "SCHOOL PROJECT // CINEMATIC POSTER KEY ART",
    title: "THE AMAZING SPIDER-MAN KEY ART",
    body: "Academic design project exploring dark cinematic lighting and superhero poster art direction. Portrays a hooded Spider-Man figure against a luminous blue night city skyline, woven through with intricate glowing spiderwebs and dramatic serif title typography.",
    deliverables: [
      "Cinematic Movie Key Art Poster (High-Res Format)",
      "Multi-Layer City Skyline Depth Compositing",
      "Atmospheric Rim Lighting & Glowing Eye FX",
      "Custom Spiderweb Network & Serif Typography"
    ]
  },
  ad1: {
    tag: "CAMPAIGN 01 // FOOTWEAR ADVERTISING",
    title: "DRACULA TAEKWONDO SHOES AD",
    body: "Commercial promotional poster for the Dracula limited edition Taekwondo shoe line. Focus on athletic motion dynamics, high-contrast monochrome studio background with vivid red ribbon accents, and bilingual typography tailored to martial arts practitioners.",
    deliverables: ["Commercial Product Poster (B1 & Social Format)", "Dynamic Red Velocity Ribbon Compositing", "Bilingual Typography Hierarchy", "High-Resolution Studio Product Retouching"]
  },
  ad2: {
    tag: "SCHOOL PROJECT // BEVERAGE ADVERTISING",
    title: "STARBUCKS CARAMEL MACCHIATO POSTER",
    body: "Commercial beverage advertisement designed as an academic school project. Combines layered iced coffee transparency compositing, floating roasted coffee beans with realistic depth of field, Starbucks brand siren curves, and vertical stencil typography.",
    deliverables: [
      "Commercial Beverage Poster (Print & Digital Out-of-Home)",
      "Floating 3D Coffee Bean Particle Compositing",
      "Brand Vector Curve Background Integration",
      "Vertical Typographic Hierarchy & Stencil Layout"
    ]
  },
  ad3: {
    tag: "CAMPAIGN 03 // CULINARY SOCIAL CAMPAIGN",
    title: "DELICIOUS SUSHI PROMOTIONAL POSTER",
    body: "Eye-catching culinary promotional design built for digital menus and social media advertising. Features an overhead perspective circular sushi platter focal point, high-contrast diagonal brand ribbon, textured typographic watermark, and clear call-to-action metrics.",
    deliverables: ["Social Media Promotional Ad Suite", "Overhead Culinary Layout & Color Balancing", "Diagonal Typographic Grid Design", "Digital Call-To-Action (CTA) Banners"]
  }
};
