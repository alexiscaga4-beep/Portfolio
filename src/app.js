/**
 * MAIN APP CONTROLLER
 * Alexis Deniel Caga Portfolio
 * 
 * Manages timeline scrubbing, Web Audio sound synthesizer,
 * artwork lightboxes, video reel canvas simulation, and forms.
 */

// Artwork Data Store
const ARTWORKS = [
  {
    title: "Giyu Tomioka — Water Breathing",
    tag: "FANART STUDY",
    category: "study",
    img: "./assets/images/giyu.png",
    date: "STUDY NO. 01",
    desc: "Dynamic contrast study focusing on water elemental lighting, haori textile patterns, and intense atmospheric depth. Crafted with meticulous brushwork and high-contrast rim lighting."
  },
  {
    title: "Original Character Concept — Solitary",
    tag: "ORIGINAL DESIGN",
    category: "character",
    img: "./assets/images/owncharacter1.png",
    date: "STUDY NO. 02",
    desc: "Original character design exploring modern streetwear aesthetics, facial proportions, and nuanced emotional expression in an urban night environment."
  },
  {
    title: "Toph Beifong — The Blind Bandit",
    tag: "FANART STUDY",
    category: "character",
    img: "./assets/images/toph.png",
    date: "STUDY NO. 03",
    desc: "Exploration of earthy chromatic palette, grounded dynamic stance, and earthbending resonance glow from Avatar: The Last Airbender."
  },
  {
    title: "Four Expressions — Character Sheet",
    tag: "ANATOMY & EMOTION",
    category: "study",
    img: "./assets/images/expressions.png",
    date: "STUDY NO. 04",
    desc: "Rigorous anatomical study into facial micro-movements, eye shape shifts, emotional tension, and expressive range across multiple lighting angles."
  },
  {
    title: "Atmospheric World Concept & Matte Painting",
    tag: "ENVIRONMENTAL CONCEPT",
    category: "environment",
    img: "./assets/images/background.png",
    date: "STUDY NO. 05",
    desc: "Expansive landscape study focusing on aerial perspective, cloud volume rendering, and dramatic sunset color temperature gradients."
  }
];

// Case Studies Data
const CASE_STUDIES = {
  case1: {
    tag: "CASE STUDY 01 // IDENTITY & KEY ART",
    title: "CYBERPUNK EDITORIAL KEY ART",
    body: "A comprehensive neo-noir visual system developed for high-impact promotional posters. Featuring bespoke typographic grids, custom Japanese glyph typesetting, and dual-tone chromatic aberration shaders designed to stand out on dark digital platforms."
  },
  case2: {
    tag: "CASE STUDY 02 // BRANDING & PACKAGING",
    title: "NOMAD COFFEE BRAND SYSTEM",
    body: "Complete brand architecture for a specialty artisanal coffee roaster. Included custom logomarks, tactile packaging foil stamps, sensory tasting note icons, and an editorial e-commerce aesthetic."
  },
  case3: {
    tag: "CASE STUDY 03 // SUSTAINABILITY CAMPAIGN",
    title: "ECO-SUSTAINABLE APPAREL REBRAND",
    body: "Holistic visual rebrand for an ethical streetwear manufacturer. Focused on unbleached earth tones, raw macro fabric photography, and a modular vector design system built for sustainable hangtags and lookbooks."
  },
  case4: {
    tag: "CASE STUDY 04 // GAMING & SYNTHWAVE",
    title: "CHRONO ARCADE GAME PROMOTION",
    body: "High-octane visual package for a retro-futurist indie arcade title. Produced dynamic Twitch stream overlays, animated tournament scoreboards, and commemorative physical poster prints."
  },
  case5: {
    tag: "CASE STUDY 05 // EDITORIAL PITCH DECK",
    title: "CREATIVE STUDIO SHOWCASE DECK",
    body: "Custom-crafted 40-slide agency capabilities presentation. Designed with high-contrast typography, interactive chart overlays, and minimalist editorial grid alignments."
  }
};

class PortfolioApp {
  constructor() {
    this.soundEnabled = true;
    this.audioCtx = null;
    this.currentArtIndex = 0;
    this.reelDurationSeconds = 260;
    this.isVideoPlaying = false;
    this.videoProgress = 0.25;
    this.animFrameId = null;

    this.initElements();
    this.bindEvents();
    this.initAudioContext();
    this.initTimelineScrubber();
    this.initVideoSimulation();
  }

  initElements() {
    // Rail Elements
    this.railFill = document.getElementById('railFill');
    this.railPlayhead = document.getElementById('railPlayhead');
    this.railTC = document.getElementById('railTC');
    this.railTrack = document.getElementById('railTrackContainer');
    this.railLayers = document.querySelectorAll('.rail-layer');

    // Section References
    this.sections = [
      '#hero',
      '#story',
      '#arts',
      '#graphic-design',
      '#video-edit',
      '#skills',
      '#socials'
    ].map(sel => document.querySelector(sel));

    // Modals
    this.imageLightbox = document.getElementById('imageLightbox');
    this.lightboxImg = document.getElementById('lightboxImg');
    this.lightboxTitle = document.getElementById('lightboxTitle');
    this.lightboxTag = document.getElementById('lightboxTag');
    this.lightboxDesc = document.getElementById('lightboxDesc');
    
    this.videoModal = document.getElementById('videoModal');
    this.caseModal = document.getElementById('caseModal');

    // Top HUD
    this.soundToggleBtn = document.getElementById('soundToggleBtn');
    this.perfToggleBtn = document.getElementById('perfToggleBtn');
  }

  // ============================================================
  // WEB AUDIO SYNTHESIZER (ZERO EXTERNAL ASSETS NEEDED)
  // ============================================================
  initAudioContext() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    } catch (e) {
      this.soundEnabled = false;
    }
  }

  playSynthTone(freq = 440, type = 'sine', duration = 0.08, gainVal = 0.08) {
    if (!this.soundEnabled || !this.audioCtx) return;
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, this.audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(gainVal, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (err) {
      // Audio playback quiet fallback
    }
  }

  playClickSound() {
    this.playSynthTone(880, 'triangle', 0.05, 0.05);
  }

  playWhooshSound() {
    this.playSynthTone(220, 'sine', 0.15, 0.07);
  }

  playSuccessSound() {
    if (!this.soundEnabled || !this.audioCtx) return;
    this.playSynthTone(523.25, 'sine', 0.1, 0.06);
    setTimeout(() => this.playSynthTone(659.25, 'sine', 0.1, 0.06), 80);
    setTimeout(() => this.playSynthTone(783.99, 'sine', 0.18, 0.08), 160);
  }

  // ============================================================
  // TIMELINE SCRUBBER & SMPTE TIMECODE
  // ============================================================
  formatSMPTETimecode(pct) {
    const totalSeconds = this.reelDurationSeconds * (pct / 100);
    const mm = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const ss = String(Math.floor(totalSeconds % 60)).padStart(2, '0');
    const ff = String(Math.floor((totalSeconds * 24) % 24)).padStart(2, '0');
    return `00:${mm}:${ss}:${ff}`;
  }

  initTimelineScrubber() {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const pct = maxScroll > 0 ? Math.min(100, Math.max(0, (scrollTop / maxScroll) * 100)) : 0;

      if (this.railFill) this.railFill.style.height = `${pct}%`;
      if (this.railPlayhead) this.railPlayhead.style.top = `${pct}%`;
      if (this.railTC) this.railTC.textContent = this.formatSMPTETimecode(pct);

      // Detect Active Section
      let activeIndex = 0;
      this.sections.forEach((sec, idx) => {
        if (!sec) return;
        const rect = sec.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.45) {
          activeIndex = idx;
        }
      });

      this.railLayers.forEach((layer, idx) => {
        layer.classList.toggle('active', idx === activeIndex);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    // Click/Scrub on Rail
    if (this.railTrack) {
      this.railTrack.addEventListener('click', (e) => {
        const rect = this.railTrack.getBoundingClientRect();
        const clickY = e.clientY - rect.top;
        const pct = Math.max(0, Math.min(1, clickY / rect.height));
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo({
          top: pct * maxScroll,
          behavior: 'smooth'
        });
        this.playWhooshSound();
      });
    }

    // Rail Layer Navigation
    this.railLayers.forEach(layer => {
      layer.addEventListener('click', () => {
        const targetSel = layer.getAttribute('data-target');
        const targetEl = document.querySelector(targetSel);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
          this.playWhooshSound();
        }
      });
    });
  }

  // ============================================================
  // ARTWORK LIGHTBOX & FILTERING
  // ============================================================
  openArtwork(index) {
    this.currentArtIndex = index;
    const art = ARTWORKS[index];
    if (!art) return;

    this.lightboxImg.src = art.img;
    this.lightboxImg.alt = art.title;
    this.lightboxTitle.textContent = art.title;
    this.lightboxTag.textContent = `${art.tag} // ${art.date}`;
    this.lightboxDesc.textContent = art.desc;

    this.imageLightbox.classList.add('active');
    this.imageLightbox.setAttribute('aria-hidden', 'false');
    this.playWhooshSound();
  }

  closeLightbox() {
    this.imageLightbox.classList.remove('active');
    this.imageLightbox.setAttribute('aria-hidden', 'true');
    this.playClickSound();
  }

  // ============================================================
  // 4K VIDEO PLAYER CANVAS SIMULATOR
  // ============================================================
  initVideoSimulation() {
    this.simCanvas = document.getElementById('videoSimCanvas');
    if (!this.simCanvas) return;
    this.simCtx = this.simCanvas.getContext('2d');
    this.simPlayBtn = document.getElementById('simPlayPauseBtn');
    this.simCenterPlayBtn = document.getElementById('videoSimPlayBtn');
    this.simScrubberFill = document.getElementById('simScrubberFill');
    this.simTimeDisplay = document.getElementById('simTimeDisplay');
    this.simScrubberBar = document.getElementById('simScrubberBar');

    const togglePlay = () => {
      this.isVideoPlaying = !this.isVideoPlaying;
      if (this.simPlayBtn) {
        this.simPlayBtn.textContent = this.isVideoPlaying ? '⏸ PAUSE' : '▶ PLAY';
      }
      if (this.simCenterPlayBtn) {
        this.simCenterPlayBtn.style.display = this.isVideoPlaying ? 'none' : 'flex';
      }
      this.playClickSound();
    };

    if (this.simPlayBtn) this.simPlayBtn.addEventListener('click', togglePlay);
    if (this.simCenterPlayBtn) this.simCenterPlayBtn.addEventListener('click', togglePlay);

    if (this.simScrubberBar) {
      this.simScrubberBar.addEventListener('click', (e) => {
        const rect = this.simScrubberBar.getBoundingClientRect();
        this.videoProgress = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        this.playClickSound();
      });
    }

    this.renderVideoCanvas();
  }

  renderVideoCanvas() {
    const draw = () => {
      this.animFrameId = requestAnimationFrame(draw);
      if (!this.simCtx) return;

      const w = this.simCanvas.width;
      const h = this.simCanvas.height;

      // Clear with deep cinema black
      this.simCtx.fillStyle = '#08080c';
      this.simCtx.fillRect(0, 0, w, h);

      if (this.isVideoPlaying) {
        this.videoProgress += 0.0012;
        if (this.videoProgress > 1) this.videoProgress = 0;
      }

      // Draw dynamic visualizer waveform
      const barCount = 48;
      const barWidth = (w - 120) / barCount;
      const time = Date.now() * 0.003;

      for (let i = 0; i < barCount; i++) {
        const freqHeight = Math.sin(i * 0.3 + time) * 80 + Math.cos(i * 0.5 - time) * 50 + 70;
        const x = 60 + i * barWidth;
        const y = h / 2 - freqHeight / 2;

        const grad = this.simCtx.createLinearGradient(0, y, 0, y + freqHeight);
        grad.addColorStop(0, '#FF5A36');
        grad.addColorStop(0.5, '#FFD23F');
        grad.addColorStop(1, '#38BDF8');

        this.simCtx.fillStyle = grad;
        this.simCtx.fillRect(x, y, barWidth - 4, freqHeight);
      }

      // Draw Center HUD crosshair
      this.simCtx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      this.simCtx.lineWidth = 1;
      this.simCtx.beginPath();
      this.simCtx.moveTo(w / 2 - 20, h / 2);
      this.simCtx.lineTo(w / 2 + 20, h / 2);
      this.simCtx.moveTo(w / 2, h / 2 - 20);
      this.simCtx.lineTo(w / 2, h / 2 + 20);
      this.simCtx.stroke();

      // Update Scrubber UI
      if (this.simScrubberFill) {
        this.simScrubberFill.style.width = `${this.videoProgress * 100}%`;
      }
      if (this.simTimeDisplay) {
        const currentSec = Math.floor(this.videoProgress * 134);
        const mm = String(Math.floor(currentSec / 60)).padStart(2, '0');
        const ss = String(currentSec % 60).padStart(2, '0');
        this.simTimeDisplay.textContent = `${mm}:${ss} / 02:14`;
      }
    };
    draw();
  }

  // ============================================================
  // CASE STUDY MODAL
  // ============================================================
  openCaseStudy(key) {
    const data = CASE_STUDIES[key];
    if (!data) return;

    document.getElementById('caseModalTag').textContent = data.tag;
    document.getElementById('caseModalTitle').textContent = data.title;
    document.getElementById('caseModalBody').innerHTML = `<p>${data.body}</p>`;

    this.caseModal.classList.add('active');
    this.caseModal.setAttribute('aria-hidden', 'false');
    this.playWhooshSound();
  }

  // ============================================================
  // EVENT BINDINGS
  // ============================================================
  bindEvents() {
    // Sound FX Toggle
    if (this.soundToggleBtn) {
      this.soundToggleBtn.addEventListener('click', () => {
        this.soundEnabled = !this.soundEnabled;
        const label = this.soundToggleBtn.querySelector('.hud-btn-text');
        if (label) label.textContent = this.soundEnabled ? 'SFX: ON' : 'SFX: OFF';
        if (this.soundEnabled) this.playSuccessSound();
      });
    }

    // Performance Mode Toggle
    if (this.perfToggleBtn) {
      let isHigh = true;
      this.perfToggleBtn.addEventListener('click', () => {
        isHigh = !isHigh;
        const label = this.perfToggleBtn.querySelector('.hud-btn-text');
        if (label) label.textContent = isHigh ? '60 FPS' : 'ECO 30FPS';
        if (window.portfolioScene) {
          window.portfolioScene.setPerformanceMode(isHigh);
        }
        this.playClickSound();
      });
    }

    // Artwork Click Triggers
    const artCards = document.querySelectorAll('.art-card');
    artCards.forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.getAttribute('data-index'), 10);
        this.openArtwork(idx);
      });
    });

    // Artwork Filter Pills
    const filterPills = document.querySelectorAll('.filter-pill');
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const filter = pill.getAttribute('data-filter');

        artCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
        this.playClickSound();
      });
    });

    // Lightbox Navigation
    const closeBtn = document.getElementById('lightboxCloseBtn');
    if (closeBtn) closeBtn.addEventListener('click', () => this.closeLightbox());

    const prevBtn = document.getElementById('lightboxPrev');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const newIndex = (this.currentArtIndex - 1 + ARTWORKS.length) % ARTWORKS.length;
        this.openArtwork(newIndex);
      });
    }

    const nextBtn = document.getElementById('lightboxNext');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const newIndex = (this.currentArtIndex + 1) % ARTWORKS.length;
        this.openArtwork(newIndex);
      });
    }

    // Video Showreel Modal Triggers
    const btnWatchReel = document.getElementById('btnWatchReel');
    if (btnWatchReel) {
      btnWatchReel.addEventListener('click', (e) => {
        e.preventDefault();
        this.videoModal.classList.add('active');
        this.isVideoPlaying = true;
        this.playWhooshSound();
      });
    }

    const filmCards = document.querySelectorAll('.film-clip-card');
    filmCards.forEach(card => {
      card.addEventListener('click', () => {
        const title = card.getAttribute('data-video-title');
        const role = card.getAttribute('data-role');
        document.getElementById('videoModalTitle').textContent = title;
        document.getElementById('videoTitleOverlay').textContent = title.toUpperCase();
        document.getElementById('videoModalRole').textContent = role;
        this.videoModal.classList.add('active');
        this.isVideoPlaying = true;
        this.playWhooshSound();
      });
    });

    const videoCloseBtn = document.getElementById('videoModalCloseBtn');
    if (videoCloseBtn) {
      videoCloseBtn.addEventListener('click', () => {
        this.videoModal.classList.remove('active');
        this.isVideoPlaying = false;
        this.playClickSound();
      });
    }

    // Graphic Design Case Study Buttons
    const caseButtons = document.querySelectorAll('.gd-link-btn');
    caseButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const modalKey = btn.getAttribute('data-modal');
        this.openCaseStudy(modalKey);
      });
    });

    const caseCloseBtn = document.getElementById('caseModalCloseBtn');
    if (caseCloseBtn) {
      caseCloseBtn.addEventListener('click', () => {
        this.caseModal.classList.remove('active');
        this.playClickSound();
      });
    }

    // Backdrop Click to Close
    document.querySelectorAll('.lightbox-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', () => {
        this.closeLightbox();
        if (this.videoModal) {
          this.videoModal.classList.remove('active');
          this.isVideoPlaying = false;
        }
        if (this.caseModal) this.caseModal.classList.remove('active');
      });
    });

    // ESC Key to close any active modal
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeLightbox();
        if (this.videoModal) {
          this.videoModal.classList.remove('active');
          this.isVideoPlaying = false;
        }
        if (this.caseModal) this.caseModal.classList.remove('active');
      } else if (e.key === 'ArrowRight' && this.imageLightbox.classList.contains('active')) {
        const nextIndex = (this.currentArtIndex + 1) % ARTWORKS.length;
        this.openArtwork(nextIndex);
      } else if (e.key === 'ArrowLeft' && this.imageLightbox.classList.contains('active')) {
        const prevIndex = (this.currentArtIndex - 1 + ARTWORKS.length) % ARTWORKS.length;
        this.openArtwork(prevIndex);
      }
    });

    // Discord Handle Copy Interaction
    const discordCard = document.getElementById('discordCard');
    if (discordCard) {
      discordCard.addEventListener('click', () => {
        const copyText = discordCard.getAttribute('data-copy') || 'alexrivera#0001';
        navigator.clipboard.writeText(copyText).then(() => {
          const indicator = discordCard.querySelector('.copy-indicator');
          if (indicator) {
            const original = indicator.textContent;
            indicator.textContent = '✓ COPIED TO CLIPBOARD!';
            indicator.style.color = '#34D399';
            this.playSuccessSound();
            setTimeout(() => {
              indicator.textContent = original;
              indicator.style.color = '';
            }, 2500);
          }
        });
      });
    }

    // Contact Form Submission (Simulated Dispatch)
    const form = document.getElementById('contactForm');
    const feedback = document.getElementById('formFeedback');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = document.getElementById('btnSubmitMessage');
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="btn-icon">⏳</span><span class="btn-text">DISPATCHING PACKET...</span>`;
        this.playWhooshSound();

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span class="btn-icon">✓</span><span class="btn-text">TRANSMISSION SENT</span>`;
          if (feedback) {
            feedback.className = 'form-feedback success';
            feedback.textContent = '>>> PACKET CONFIRMED: Thank you! Alexis Deniel Caga will respond to your transmission shortly.';
          }
          this.playSuccessSound();
          form.reset();
        }, 1200);
      });
    }
  }
}

// Launch Application
window.addEventListener('DOMContentLoaded', () => {
  window.portfolioApp = new PortfolioApp();
});
