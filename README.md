# Alexis Deniel Caga — 3D Scrollytelling Portfolio

A high-performance, cinematic **3D Scrollytelling Portfolio** built for **Alexis Deniel Caga** (Creative Technologist, Digital Artist, Graphic Designer, and Video Editor).

## 🚀 Key Highlights & Architecture

- **3D Scrollytelling Engine**: Built with **Three.js (WebGL)** featuring camera choreography, glowing wireframe geometric portals, and a 1,200-particle star cosmos that travels with you as you scroll up and down.
- **Signature Scrubber Rail & Timecode**: Real-time left-rail scrubber displaying active layer indicators, playhead position, and real-time SMPTE timecode (`00:MM:SS:FF`).
- **Curated Original Artworks**: Features high-resolution concept illustrations (*Giyu Tomioka Study*, *Own Character No. 1*, *Toph Beifong*, *Expression Studies*, and *Environment Matte Painting*) with interactive 3D tilt and a full-featured inspection lightbox.
- **4K Filmstrip Reel Simulator**: 35mm sprocket filmstrip with dynamic canvas audio visualizer and interactive playback controls.
- **Web Audio API Synthesizer**: Zero external audio files required — generates subtle futuristic UI tones natively in real time.
- **Optimized for Vercel Free Hosting**: 100% lightweight static delivery, edge-cached assets, 0ms cold-start, 60+ FPS performance.

---

## 📁 Project Structure

```
Portfolio/
├── index.html            # Main HTML5 document with full SEO & schema
├── style.css             # High-contrast cyber-editorial styling
├── vercel.json           # Vercel edge deployment configuration
├── src/
│   ├── three-scene.js    # Three.js 3D camera trajectory & WebGL particles
│   └── app.js            # App orchestrator, audio synth, lightbox & scrubber
└── assets/
    └── images/           # High-resolution original artworks & assets
        ├── giyu.png
        ├── owncharacter1.png
        ├── toph.png
        ├── expressions.png
        └── background.png
```

---

## 🌐 Deploy to Vercel (Free Hosting)

1. **Push to GitHub / GitLab / Bitbucket**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Alexis Deniel Caga 3D portfolio"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. **Import into Vercel**:
   - Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
   - Select your repository.
   - Framework Preset: **Other (Static)**
   - Click **Deploy** — your portfolio is live worldwide in seconds!
