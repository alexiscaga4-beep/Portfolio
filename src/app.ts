import { ARTWORKS, CASE_STUDIES, GRAPHIC_DESIGN_PROJECTS } from './data';
import { SoundSynthesizer } from './audio';

/**
 * MAIN APP CONTROLLER
 * Alexis Deniel Caga Portfolio
 *
 * Coordinates timeline scrubbing, SMPTE timecodes, artwork lightbox,
 * 4K reel video canvas simulator, case study modals, and form handling.
 */
export class PortfolioApp {
  public sound: SoundSynthesizer;
  private currentArtIndex: number = 0;
  private reelDurationSeconds: number = 260;
  private isVideoPlaying: boolean = false;
  private videoProgress: number = 0.25;
  private animFrameId: number | null = null;

  // DOM Elements
  private railFill: HTMLElement | null = null;
  private railPlayhead: HTMLElement | null = null;
  private railTC: HTMLElement | null = null;
  private railTrack: HTMLElement | null = null;
  private railLayers: NodeListOf<HTMLElement> | null = null;
  private sections: (HTMLElement | null)[] = [];

  // Lightbox & Modals
  private imageLightbox: HTMLElement | null = null;
  private lightboxImg: HTMLImageElement | null = null;
  private lightboxTitle: HTMLElement | null = null;
  private lightboxTag: HTMLElement | null = null;
  private lightboxDesc: HTMLElement | null = null;
  private videoModal: HTMLElement | null = null;
  private caseModal: HTMLElement | null = null;

  // Controls & HUD
  private soundToggleBtn: HTMLButtonElement | null = null;
  private perfToggleBtn: HTMLButtonElement | null = null;

  // Video Canvas Simulator
  private simCanvas: HTMLCanvasElement | null = null;
  private simCtx: CanvasRenderingContext2D | null = null;
  private simPlayBtn: HTMLElement | null = null;
  private simCenterPlayBtn: HTMLElement | null = null;
  private simScrubberFill: HTMLElement | null = null;
  private simTimeDisplay: HTMLElement | null = null;
  private simScrubberBar: HTMLElement | null = null;

  constructor() {
    this.sound = new SoundSynthesizer();
    this.initElements();
    this.initGraphicDesignShowcase();
    this.bindEvents();
    this.initTimelineScrubber();
    this.initVideoSimulation();
  }

  private initElements(): void {
    // Rail Navigation
    this.railFill = document.getElementById('railFill');
    this.railPlayhead = document.getElementById('railPlayhead');
    this.railTC = document.getElementById('railTC');
    this.railTrack = document.getElementById('railTrackContainer');
    this.railLayers = document.querySelectorAll<HTMLElement>('.rail-layer');

    // Section targets
    const selectors = [
      '#hero',
      '#story',
      '#arts',
      '#graphic-design',
      '#video-edit',
      '#skills',
      '#socials'
    ];
    this.sections = selectors.map(sel => document.querySelector<HTMLElement>(sel));

    // Modals
    this.imageLightbox = document.getElementById('imageLightbox');
    this.lightboxImg = document.getElementById('lightboxImg') as HTMLImageElement | null;
    this.lightboxTitle = document.getElementById('lightboxTitle');
    this.lightboxTag = document.getElementById('lightboxTag');
    this.lightboxDesc = document.getElementById('lightboxDesc');

    this.videoModal = document.getElementById('videoModal');
    this.caseModal = document.getElementById('caseModal');

    // HUD Buttons
    this.soundToggleBtn = document.getElementById('soundToggleBtn') as HTMLButtonElement | null;
    this.perfToggleBtn = document.getElementById('perfToggleBtn') as HTMLButtonElement | null;
  }

  // ============================================================
  // TIMELINE SCRUBBER & SMPTE TIMECODE
  // ============================================================
  public formatSMPTETimecode(pct: number): string {
    const totalSeconds = this.reelDurationSeconds * (pct / 100);
    const mm = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const ss = String(Math.floor(totalSeconds % 60)).padStart(2, '0');
    const ff = String(Math.floor((totalSeconds * 24) % 24)).padStart(2, '0');
    return `00:${mm}:${ss}:${ff}`;
  }

  private initTimelineScrubber(): void {
    const onScroll = (): void => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const pct = maxScroll > 0 ? Math.min(100, Math.max(0, (scrollTop / maxScroll) * 100)) : 0;

      if (this.railFill) this.railFill.style.height = `${pct}%`;
      if (this.railPlayhead) this.railPlayhead.style.top = `${pct}%`;
      if (this.railTC) this.railTC.textContent = this.formatSMPTETimecode(pct);

      let activeIndex = 0;
      this.sections.forEach((sec, idx) => {
        if (!sec) return;
        const rect = sec.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.45) {
          activeIndex = idx;
        }
      });

      if (this.railLayers) {
        this.railLayers.forEach((layer, idx) => {
          layer.classList.toggle('active', idx === activeIndex);
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    if (this.railTrack) {
      this.railTrack.addEventListener('click', (e: MouseEvent) => {
        if (!this.railTrack) return;
        const rect = this.railTrack.getBoundingClientRect();
        const clickY = e.clientY - rect.top;
        const pct = Math.max(0, Math.min(1, clickY / rect.height));
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo({
          top: pct * maxScroll,
          behavior: 'smooth'
        });
        this.sound.playWhoosh();
      });
    }

    if (this.railLayers) {
      this.railLayers.forEach(layer => {
        layer.addEventListener('click', () => {
          const targetSel = layer.getAttribute('data-target');
          if (targetSel) {
            const targetEl = document.querySelector(targetSel);
            if (targetEl) {
              targetEl.scrollIntoView({ behavior: 'smooth' });
              this.sound.playWhoosh();
            }
          }
        });
      });
    }
  }

  // ============================================================
  // GRAPHIC DESIGN SHOWCASE & LIGHTBOX
  // ============================================================
  private initGraphicDesignShowcase(): void {
    const grid = document.getElementById('artsGrid');
    if (!grid) return;

    // Dynamically render project cards from GRAPHIC_DESIGN_PROJECTS
    grid.innerHTML = GRAPHIC_DESIGN_PROJECTS.map((proj, idx) => {
      const isWide = idx === 0 || idx === 6 ? ' art-card-wide' : '';
      const isClientWork = proj.id.includes('client') || proj.date.includes('CLIENT');
      const isSchoolWork = proj.id.includes('school') || proj.date.includes('SCHOOL') || proj.category.includes('school');
      return `
        <article class="art-card glass-panel${isWide}${isClientWork ? ' client-highlight-card' : ''}${isSchoolWork && !isClientWork ? ' school-highlight-card' : ''}" data-category="${proj.category}" data-index="${idx}">
          <div class="art-media-wrap">
            <img src="${proj.img}" alt="${proj.title}" class="art-img" loading="lazy" onerror="this.onerror=null;if(this.src.indexOf('assets/images')!==-1){this.src=this.src.replace('assets/images','images')}else{this.src=this.src.replace('images','assets/images')}" />
            <div class="art-overlay">
              <span class="art-zoom-badge">🔍 INSPECT DESIGN</span>
            </div>
            ${isClientWork ? '<span class="client-star-badge">⭐ 1ST CLIENT WORK</span>' : ''}
            ${isSchoolWork && !isClientWork ? '<span class="school-badge">🎓 SCHOOL PROJECT</span>' : ''}
          </div>
          <div class="art-meta">
            <div class="art-top-row">
              <span class="art-tag">${proj.tag}</span>
              <span class="art-date">${proj.date}</span>
            </div>
            <h3 class="art-title">${proj.title}</h3>
            <p class="art-desc">${proj.desc}</p>
          </div>
        </article>
      `;
    }).join('');

    // Attach click listeners to cards
    const artCards = grid.querySelectorAll<HTMLElement>('.art-card');
    artCards.forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.getAttribute('data-index') || '0', 10);
        this.openArtwork(idx);
      });
    });

    // Artwork Filter Pills
    const filterPills = document.querySelectorAll<HTMLElement>('.filter-pill');
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const filter = pill.getAttribute('data-filter') || 'all';

        artCards.forEach(card => {
          const category = card.getAttribute('data-category') || '';
          const cats = category.split(' ');
          if (filter === 'all' || category === filter || cats.includes(filter)) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
        this.sound.playClick();
      });
    });
  }

  public openArtwork(index: number): void {
    this.currentArtIndex = index;
    const art = GRAPHIC_DESIGN_PROJECTS[index] || ARTWORKS[index];
    if (!art) return;

    if (this.lightboxImg) {
      this.lightboxImg.onerror = () => {
        if (this.lightboxImg && !this.lightboxImg.dataset.retried) {
          this.lightboxImg.dataset.retried = '1';
          const currentSrc = this.lightboxImg.src;
          this.lightboxImg.src = currentSrc.includes('assets/images')
            ? currentSrc.replace('assets/images', 'images')
            : currentSrc.replace('/images/', '/assets/images/');
        }
      };
      this.lightboxImg.dataset.retried = '';
      this.lightboxImg.src = art.img;
      this.lightboxImg.alt = art.title;
    }
    if (this.lightboxTitle) this.lightboxTitle.textContent = art.title;
    if (this.lightboxTag) this.lightboxTag.textContent = `${art.tag} // ${art.date}`;
    if (this.lightboxDesc) this.lightboxDesc.textContent = art.desc;

    const clientEl = document.getElementById('lightboxClient');
    if (clientEl && art.client) {
      clientEl.textContent = art.client;
    }

    const statusEl = document.getElementById('lightboxStatus');
    if (statusEl) {
      if (art.date.includes('CLIENT') || art.id.includes('client')) {
        statusEl.textContent = "OFFICIAL CLIENT WORK // DELIVERED";
      } else if (art.date.includes('SCHOOL') || art.id.includes('school') || art.category.includes('school')) {
        statusEl.textContent = "ACADEMIC SCHOOL PROJECT // HIGH-RES";
      } else {
        statusEl.textContent = "HIGH-RES VECTOR ASSET";
      }
    }

    if (this.imageLightbox) {
      this.imageLightbox.classList.add('active');
      this.imageLightbox.setAttribute('aria-hidden', 'false');
    }
    this.sound.playWhoosh();
  }

  public closeLightbox(): void {
    if (this.imageLightbox) {
      this.imageLightbox.classList.remove('active');
      this.imageLightbox.setAttribute('aria-hidden', 'true');
    }
    this.sound.playClick();
  }

  // ============================================================
  // 4K VIDEO PLAYER CANVAS SIMULATOR
  // ============================================================
  private initVideoSimulation(): void {
    this.simCanvas = document.getElementById('videoSimCanvas') as HTMLCanvasElement | null;
    if (!this.simCanvas) return;
    this.simCtx = this.simCanvas.getContext('2d');
    this.simPlayBtn = document.getElementById('simPlayPauseBtn');
    this.simCenterPlayBtn = document.getElementById('videoSimPlayBtn');
    this.simScrubberFill = document.getElementById('simScrubberFill');
    this.simTimeDisplay = document.getElementById('simTimeDisplay');
    this.simScrubberBar = document.getElementById('simScrubberBar');

    const togglePlay = (): void => {
      this.isVideoPlaying = !this.isVideoPlaying;
      if (this.simPlayBtn) {
        this.simPlayBtn.textContent = this.isVideoPlaying ? '⏸ PAUSE' : '▶ PLAY';
      }
      if (this.simCenterPlayBtn) {
        this.simCenterPlayBtn.style.display = this.isVideoPlaying ? 'none' : 'flex';
      }
      this.sound.playClick();
    };

    if (this.simPlayBtn) this.simPlayBtn.addEventListener('click', togglePlay);
    if (this.simCenterPlayBtn) this.simCenterPlayBtn.addEventListener('click', togglePlay);

    if (this.simScrubberBar) {
      this.simScrubberBar.addEventListener('click', (e: MouseEvent) => {
        if (!this.simScrubberBar) return;
        const rect = this.simScrubberBar.getBoundingClientRect();
        this.videoProgress = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        this.sound.playClick();
      });
    }

    this.renderVideoCanvas();
  }

  private renderVideoCanvas(): void {
    const draw = (): void => {
      this.animFrameId = requestAnimationFrame(draw);
      if (!this.simCtx || !this.simCanvas) return;

      const w = this.simCanvas.width;
      const h = this.simCanvas.height;

      // Deep cinema background
      this.simCtx.fillStyle = '#08080c';
      this.simCtx.fillRect(0, 0, w, h);

      if (this.isVideoPlaying) {
        this.videoProgress += 0.0012;
        if (this.videoProgress > 1) this.videoProgress = 0;
      }

      // Dynamic visualizer waveform
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

      // Center HUD crosshair
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
  public openCaseStudy(key: string): void {
    const data = CASE_STUDIES[key];
    if (!data) return;

    const tagEl = document.getElementById('caseModalTag');
    const titleEl = document.getElementById('caseModalTitle');
    const bodyEl = document.getElementById('caseModalBody');

    if (tagEl) tagEl.textContent = data.tag;
    if (titleEl) titleEl.textContent = data.title;
    
    let html = `<p>${data.body}</p>`;
    if (data.deliverables && data.deliverables.length > 0) {
      html += `
        <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid rgba(255,255,255,0.1);">
          <h4 style="font-family: var(--font-mono); font-size: 11px; color: var(--accent-amber); letter-spacing: 2px; margin-bottom: 10px;">CORE DELIVERABLES:</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
            ${data.deliverables.map(d => `<li style="font-size: 13px; color: var(--text-muted); display: flex; align-items: center; gap: 8px;"><span style="color: var(--accent);">✦</span> ${d}</li>`).join('')}
          </ul>
        </div>
      `;
    }
    if (bodyEl) bodyEl.innerHTML = html;

    if (this.caseModal) {
      this.caseModal.classList.add('active');
      this.caseModal.setAttribute('aria-hidden', 'false');
    }
    this.sound.playWhoosh();
  }

  // ============================================================
  // EVENT BINDINGS
  // ============================================================
  private bindEvents(): void {
    // Sound FX Toggle
    if (this.soundToggleBtn) {
      this.soundToggleBtn.addEventListener('click', () => {
        const isEnabled = this.sound.toggle();
        const label = this.soundToggleBtn?.querySelector('.hud-btn-text');
        if (label) label.textContent = isEnabled ? 'SFX: ON' : 'SFX: OFF';
      });
    }

    // Performance Mode Toggle
    if (this.perfToggleBtn) {
      let isHigh = true;
      this.perfToggleBtn.addEventListener('click', () => {
        isHigh = !isHigh;
        const label = this.perfToggleBtn?.querySelector('.hud-btn-text');
        if (label) label.textContent = isHigh ? '60 FPS' : 'ECO 30FPS';
        if (window.portfolioScene) {
          window.portfolioScene.setPerformanceMode(isHigh);
        }
        this.sound.playClick();
      });
    }



    // Lightbox Controls
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
      btnWatchReel.addEventListener('click', (e: MouseEvent) => {
        e.preventDefault();
        if (this.videoModal) {
          this.videoModal.classList.add('active');
          this.videoModal.setAttribute('aria-hidden', 'false');
        }
        this.isVideoPlaying = true;
        this.sound.playWhoosh();
      });
    }

    const filmCards = document.querySelectorAll<HTMLElement>('.film-clip-card');
    filmCards.forEach(card => {
      card.addEventListener('click', () => {
        const title = card.getAttribute('data-video-title') || '';
        const role = card.getAttribute('data-role') || '';

        const modalTitle = document.getElementById('videoModalTitle');
        const overlayTitle = document.getElementById('videoTitleOverlay');
        const modalRole = document.getElementById('videoModalRole');

        if (modalTitle) modalTitle.textContent = title;
        if (overlayTitle) overlayTitle.textContent = title.toUpperCase();
        if (modalRole) modalRole.textContent = role;

        if (this.videoModal) {
          this.videoModal.classList.add('active');
          this.videoModal.setAttribute('aria-hidden', 'false');
        }
        this.isVideoPlaying = true;
        this.sound.playWhoosh();
      });
    });

    const videoCloseBtn = document.getElementById('videoModalCloseBtn');
    if (videoCloseBtn) {
      videoCloseBtn.addEventListener('click', () => {
        if (this.videoModal) {
          this.videoModal.classList.remove('active');
          this.videoModal.setAttribute('aria-hidden', 'true');
        }
        this.isVideoPlaying = false;
        this.sound.playClick();
      });
    }

    // Graphic Design Case Study Buttons
    const caseButtons = document.querySelectorAll<HTMLElement>('.gd-link-btn');
    caseButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const modalKey = btn.getAttribute('data-modal');
        if (modalKey) this.openCaseStudy(modalKey);
      });
    });

    const caseCloseBtn = document.getElementById('caseModalCloseBtn');
    if (caseCloseBtn) {
      caseCloseBtn.addEventListener('click', () => {
        if (this.caseModal) {
          this.caseModal.classList.remove('active');
          this.caseModal.setAttribute('aria-hidden', 'true');
        }
        this.sound.playClick();
      });
    }

    // Backdrop Click to Close
    document.querySelectorAll<HTMLElement>('.lightbox-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', () => {
        this.closeLightbox();
        if (this.videoModal) {
          this.videoModal.classList.remove('active');
          this.videoModal.setAttribute('aria-hidden', 'true');
          this.isVideoPlaying = false;
        }
        if (this.caseModal) {
          this.caseModal.classList.remove('active');
          this.caseModal.setAttribute('aria-hidden', 'true');
        }
      });
    });

    // ESC Key & Arrow Navigation
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        this.closeLightbox();
        if (this.videoModal) {
          this.videoModal.classList.remove('active');
          this.videoModal.setAttribute('aria-hidden', 'true');
          this.isVideoPlaying = false;
        }
        if (this.caseModal) {
          this.caseModal.classList.remove('active');
          this.caseModal.setAttribute('aria-hidden', 'true');
        }
      } else if (e.key === 'ArrowRight' && this.imageLightbox?.classList.contains('active')) {
        const nextIndex = (this.currentArtIndex + 1) % ARTWORKS.length;
        this.openArtwork(nextIndex);
      } else if (e.key === 'ArrowLeft' && this.imageLightbox?.classList.contains('active')) {
        const prevIndex = (this.currentArtIndex - 1 + ARTWORKS.length) % ARTWORKS.length;
        this.openArtwork(prevIndex);
      }
    });

    // Discord Handle Copy Interaction
    const discordCard = document.getElementById('discordCard');
    if (discordCard) {
      discordCard.addEventListener('click', () => {
        const copyText = discordCard.getAttribute('data-copy') || 'alexrivera#0001';
        void navigator.clipboard.writeText(copyText).then(() => {
          const indicator = discordCard.querySelector<HTMLElement>('.copy-indicator');
          if (indicator) {
            const original = indicator.textContent;
            indicator.textContent = '✓ COPIED TO CLIPBOARD!';
            indicator.style.color = '#34D399';
            this.sound.playSuccess();
            setTimeout(() => {
              indicator.textContent = original;
              indicator.style.color = '';
            }, 2500);
          }
        });
      });
    }

    // Contact Form Submission (Simulated Dispatch)
    const form = document.getElementById('contactForm') as HTMLFormElement | null;
    const feedback = document.getElementById('formFeedback');
    if (form) {
      form.addEventListener('submit', (e: SubmitEvent) => {
        e.preventDefault();
        const submitBtn = document.getElementById('btnSubmitMessage') as HTMLButtonElement | null;
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `<span class="btn-icon">⏳</span><span class="btn-text">DISPATCHING PACKET...</span>`;
        }
        this.sound.playWhoosh();

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<span class="btn-icon">✓</span><span class="btn-text">TRANSMISSION SENT</span>`;
          }
          if (feedback) {
            feedback.className = 'form-feedback success';
            feedback.textContent = '>>> PACKET CONFIRMED: Thank you! Alexis Deniel Caga will respond to your transmission shortly.';
          }
          this.sound.playSuccess();
          form.reset();
        }, 1200);
      });
    }
  }

  public destroy(): void {
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
    }
  }
}
