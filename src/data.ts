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
  },

  // ==========================================
  // 🎨 BRANDING, PACKAGING & EDITORIAL
  // ==========================================
  {
    id: "project-01",
    title: "Nomad Coffee — Artisanal Identity & Packaging",
    tag: "BRAND IDENTITY & PACKAGING",
    category: "branding",
    img: "./assets/images/nomad-coffee-branding.svg",
    date: "CASE 01",
    client: "Nomad Roasters",
    desc: "Complete visual identity system for artisanal specialty coffee roasters. Featuring tactile foil textures, bespoke Canela typography, sensory tasting note icons, and sustainable kraft pouch packaging.",
    tools: ["Adobe Illustrator", "Photoshop", "Print Pre-press"]
  },
  {
    id: "project-02",
    title: "Cyberpunk Editorial Key Art & Typography",
    tag: "POSTER ART & TYPOGRAPHY",
    category: "posters",
    img: "./assets/images/cyberpunk-poster-design.svg",
    date: "CASE 02",
    client: "Editorial Fiction Press",
    desc: "Neo-noir typographic poster system combining Swiss grid discipline with chromatic aberration shaders. Features custom Japanese glyph typesetting, spot-UV gloss specifications, and B1 print sizing.",
    tools: ["Adobe Photoshop", "InDesign", "Typography Grid"]
  },
  {
    id: "project-03",
    title: "Aethel Sustainable Apparel Rebrand",
    tag: "BRAND REBRAND & MERCH",
    category: "branding",
    img: "./assets/images/aethel-apparel-rebrand.svg",
    date: "CASE 03",
    client: "Aethel Goods Co.",
    desc: "Holistic visual rebrand for an ethical circular streetwear manufacturer. Focused on raw unbleached cotton hangtags, soy-based ink care labels, earthy neutral chromatic palette, and geometric logomark.",
    tools: ["Adobe Illustrator", "Brand Strategy", "Packaging Mockups"]
  },
  {
    id: "project-04",
    title: "Chrono Arcade Synthwave Promotional Suite",
    tag: "GAMING & EVENT KEY ART",
    category: "posters",
    img: "./assets/images/chrono-arcade-keyart.svg",
    date: "CASE 04",
    client: "Chrono Indie Studios",
    desc: "High-octane visual package for a retro-futurist arcade title. Produced dynamic 4K streaming overlays, holographic badges, pixel art glyphs, and commemorative metallic foil poster prints.",
    tools: ["Photoshop", "After Effects", "Vector Art"]
  },
  {
    id: "project-05",
    title: "Kroma Studio Capabilities & Pitch Deck",
    tag: "EDITORIAL & PRESENTATION",
    category: "editorial",
    img: "./assets/images/kroma-pitchdeck-editorial.svg",
    date: "CASE 05",
    client: "Kroma Creative Agency",
    desc: "Bespoke 40-slide agency capabilities presentation. Designed with high-contrast typography, interactive chart overlays, minimalist editorial grid alignments, and modular 16:9 presentation templates.",
    tools: ["Figma", "Adobe InDesign", "Editorial Layout"]
  },
  {
    id: "project-06",
    title: "Lumina Botanicals Luxury Packaging Design",
    tag: "PACKAGING & PRODUCT DESIGN",
    category: "packaging",
    img: "./assets/images/lumina-packaging-design.svg",
    date: "CASE 06",
    client: "Lumina Organics",
    desc: "Minimalist luxury skincare packaging featuring custom amber apothecary glass bottles, clean Swiss typographic labels, tactile embossed paper boxes, and metallic gold foil stamping.",
    tools: ["Adobe Illustrator", "3D Mockup", "Packaging Dieline"]
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
  },
  case1: {
    tag: "CASE STUDY 01 // IDENTITY & PACKAGING",
    title: "NOMAD COFFEE BRAND SYSTEM",
    body: "Complete brand architecture for a specialty artisanal coffee roaster. Included custom logomarks, tactile packaging foil stamps, sensory tasting note icons, and an editorial e-commerce aesthetic built for high-end boutique retail.",
    deliverables: ["Primary & Secondary Logomarks", "Matte Pouch & Kraft Box Packaging", "Sensory Tasting Card System", "Brand Identity Guidelines Manual"]
  },
  case2: {
    tag: "CASE STUDY 02 // POSTER ART DIRECTION",
    title: "CYBERPUNK EDITORIAL KEY ART",
    body: "A comprehensive neo-noir visual system developed for high-impact promotional posters. Featuring bespoke typographic grids, custom Japanese glyph typesetting, and dual-tone chromatic aberration shaders designed to command immediate attention.",
    deliverables: ["B1 Format High-Res Print Masters", "Spot-UV Coating Separation Files", "Japanese Font Pairing Guidelines", "Limited Edition Numbered Posters"]
  },
  case3: {
    tag: "CASE STUDY 03 // SUSTAINABILITY REBRAND",
    title: "AETHEL APPAREL VISUAL REBRAND",
    body: "Holistic visual rebrand for an ethical streetwear manufacturer. Focused on unbleached earth tones, raw macro fabric textures, and a modular vector design system built for sustainable recycled hangtags and lookbooks.",
    deliverables: ["Modular Vector Brand Emblem", "Recycled Paper Hangtag Dielines", "Soy-Ink Care Label Typography", "Garment Care Icon Library"]
  },
  case4: {
    tag: "CASE STUDY 04 // GAMING & SYNTHWAVE",
    title: "CHRONO ARCADE GAME SUITE",
    body: "High-octane visual package for a retro-futurist indie arcade title. Produced dynamic Twitch stream overlays, animated tournament scoreboards, custom HUD typography, and commemorative physical poster prints.",
    deliverables: ["4K Broadcast Stream Overlays", "Custom Pixel Glyph Fontset", "Holographic Tournament Badges", "Promotional Key Art Posters"]
  },
  case5: {
    tag: "CASE STUDY 05 // EDITORIAL PITCH DECK",
    title: "KROMA STUDIO CAPABILITIES DECK",
    body: "Custom-crafted 40-slide agency capabilities presentation. Designed with high-contrast typography, interactive chart overlays, and minimalist editorial grid alignments for closing 6-figure enterprise client retainers.",
    deliverables: ["40-Slide Master Figma System", "Infographic & Chart Vector Assets", "Editorial Typography Scale", "Keynote & PDF Distribution Formats"]
  },
  case6: {
    tag: "CASE STUDY 06 // LUXURY PACKAGING",
    title: "LUMINA BOTANICALS PACKAGING",
    body: "Minimalist organic skincare line featuring custom amber glass bottles, Swiss typographic layout, tactile embossed paper boxes, and premium gold foil stamping for boutique luxury beauty retailers.",
    deliverables: ["30ml Amber Glass Label Specification", "Embossed Outer Box Packaging Dieline", "Gold Foil Vector Tooling Files", "Studio Product Mockup Suite"]
  }
};
