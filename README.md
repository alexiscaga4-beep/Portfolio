# Alexis Deniel Caga — Graphic Design Portfolio (TypeScript + Vite)

A high-performance, cinematic **Graphic Design & Brand Identity Portfolio** built for **Alexis Deniel Caga**, powered by **TypeScript**, **Three.js (WebGL)**, and **Vite**.

---

## 🎨 Focus: Graphic Design & Brand Identity

This portfolio is centered on **Graphic Design disciplines**:
- **Brand Identity Systems**: Logos, chromatic specs, typography scales, brand guidelines.
- **Product Packaging**: Retail boxes, coffee pouches, luxury apothecary glass labels, dielines.
- **Editorial Typography & Key Art**: Swiss grid layouts, bilingual poster typesetting, spot-UV specs.
- **Digital Marketing Suites**: Pitch decks, social media campaigns, stream overlays, brand assets.

---

## 📸 HOW TO ADD OR CHANGE PICTURES

Adding pictures to your portfolio is simple. You only need to touch **one folder** and **one file**:

### Step 1: Put Your Image in the `public/images/` Folder
Copy your design image (`.png`, `.jpg`, `.jpeg`, `.webp`, or `.svg`) into:
```
Portfolio/public/images/
```
*Example: Save your file as `public/images/my-brand-project.jpg`.*

---

### Step 2: Add Your Project in [src/data.ts](file:///c:/antigravity_projects/Portfolio/src/data.ts)
Open [src/data.ts](file:///c:/antigravity_projects/Portfolio/src/data.ts) and add your project to `GRAPHIC_DESIGN_PROJECTS`:

```typescript
{
  id: "project-07",
  title: "My Brand Design Name",
  tag: "BRAND IDENTITY & PACKAGING",
  category: "branding", // Pick one: 'branding' | 'posters' | 'packaging' | 'editorial'
  img: "./assets/images/my-brand-project.jpg", // (or "/images/my-brand-project.jpg")
  date: "CASE 07",
  client: "Client or Studio Name",
  desc: "Brief explanation of what you designed, fonts used, and color palette.",
  tools: ["Adobe Illustrator", "Photoshop", "Print Prep"]
}
```

### Step 3: That's It! ✨
Save the file! Your website automatically:
1. Renders your new design card in the **Featured Works** grid.
2. Applies 3D mouse hover tilt and zoom badge.
3. Connects category filtering (`BRANDING`, `POSTERS`, `PACKAGING`, `EDITORIAL`).
4. Generates a high-resolution lightbox inspector popup when clicked!

---

## 📁 Project Structure

```
Portfolio/
├── index.html            # Main HTML5 document with SEO & Graphic Design meta
├── style.css             # Cyber-editorial design tokens & responsive styles
├── package.json          # Vite + TypeScript + Three.js scripts & dependencies
├── tsconfig.json         # Strict TypeScript configuration
├── vite.config.ts        # Vite build configuration with chunking
├── vercel.json           # Vercel deployment configuration
├── public/
│   └── images/           # 💡 PUT YOUR PROJECT PICTURES HERE (.png, .jpg, .svg)
└── src/
    ├── types.ts          # Strongly-typed data models for DesignProject & CaseStudy
    ├── data.ts           # 💡 EDIT THIS FILE TO ADD/CHANGE PROJECT DETAILS
    ├── audio.ts          # Synthesized Web Audio API sound feedback
    ├── three-scene.ts    # Three.js 3D WebGL background cosmos
    ├── app.ts            # Dynamic project card renderer, filters & lightbox
    └── main.ts           # Application entry point & lifecycle bootstrap
```

---

## 💻 Local Commands

- **Run Dev Server**: `npm run dev` (Runs locally at `http://localhost:3000/`)
- **Type Check**: `npm run type-check`
- **Build for Production**: `npm run build`
- **Preview Build**: `npm run preview`

---

## 🌐 1-Click Deployment on Vercel

1. Commit and push your changes to GitHub:
   ```bash
   git add .
   git commit -m "Update portfolio with new graphic design projects"
   git push origin main
   ```
2. Connect your repo on [Vercel](https://vercel.com) — it will build and deploy automatically to edge CDN with fast global loading!
