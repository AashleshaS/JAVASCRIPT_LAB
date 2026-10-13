/**
 * Filterable Photo Gallery Controller
 * Dynamic Category Filtering & Fullscreen Lightbox Viewer with Slide Controls
 */
class PhotoGalleryController {
  constructor() {
    this.filterContainer = document.querySelector('.gallery-filter-nav');
    this.filterButtons = document.querySelectorAll('.gallery-filter-nav .filter-chip-btn');
    this.items = document.querySelectorAll('.gallery-item');

    this.lightbox = document.getElementById('gallery-lightbox-modal');
    this.lightboxImg = document.getElementById('gallery-lightbox-img');
    this.lightboxContent = document.getElementById('gallery-lightbox-content');
    this.lightboxCaption = document.getElementById('gallery-lightbox-caption');
    this.lightboxMeta = document.getElementById('gallery-lightbox-meta');
    this.prevBtn = document.querySelector('.gallery-prev');
    this.nextBtn = document.querySelector('.gallery-next');
    this.closeBtn = document.getElementById('gallery-lightbox-close');

    this.currentIndex = 0;
    this.visibleItems = Array.from(this.items);

    this.init();
  }

  init() {
    // Category Filtering
    if (this.filterContainer) {
      this.filterContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-chip-btn');
        if (!btn) return;

        this.filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter || 'all';
        this.filterGallery(filter);
      });
    }

    // Item click opens Lightbox
    this.items.forEach((item) => {
      item.addEventListener('click', () => {
        const visibleIdx = this.visibleItems.indexOf(item);
        if (visibleIdx !== -1) {
          this.openLightbox(visibleIdx);
        }
      });
    });

    // Close button
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeLightbox());
    }

    // Modal background click
    if (this.lightbox) {
      this.lightbox.addEventListener('click', (e) => {
        if (e.target === this.lightbox) {
          this.closeLightbox();
        }
      });
    }

    // Navigation buttons
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.showPrev();
      });
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.showNext();
      });
    }

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (!this.lightbox || !this.lightbox.classList.contains('active')) return;

      if (e.key === 'ArrowLeft') this.showPrev();
      if (e.key === 'ArrowRight') this.showNext();
      if (e.key === 'Escape') this.closeLightbox();
    });
  }

  filterGallery(category) {
    this.visibleItems = [];

    this.items.forEach((item) => {
      const itemCategory = item.dataset.category;
      if (category === 'all' || itemCategory === category) {
        item.style.display = 'block';
        requestAnimationFrame(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        });
        this.visibleItems.push(item);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
          if (item.style.opacity === '0') {
            item.style.display = 'none';
          }
        }, 200);
      }
    });
  }

  openLightbox(index) {
    this.currentIndex = index;
    this.updateLightboxContent();
    this.lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  showPrev() {
    if (this.visibleItems.length === 0) return;
    this.currentIndex = (this.currentIndex - 1 + this.visibleItems.length) % this.visibleItems.length;
    this.updateLightboxContent();
  }

  showNext() {
    if (this.visibleItems.length === 0) return;
    this.currentIndex = (this.currentIndex + 1) % this.visibleItems.length;
    this.updateLightboxContent();
  }

  updateLightboxContent() {
    const item = this.visibleItems[this.currentIndex];
    if (!item) return;

    const img = item.querySelector('.gallery-img');
    const placeholder = item.querySelector('.gallery-placeholder-visual');
    const caption = item.querySelector('.gallery-caption')?.textContent || '';
    const meta = item.querySelector('.gallery-meta')?.textContent || '';

    // Handle existing image vs placeholder graphic
    if (img && img.src) {
      if (this.lightboxImg) {
        this.lightboxImg.style.display = 'block';
        this.lightboxImg.src = img.src;
        this.lightboxImg.alt = caption;
        this.lightboxImg.onerror = () => {
          if (img.src.includes('Connection.jpeg')) {
            this.lightboxImg.src = 'assets/Connection.jpeg';
          } else if (img.src.includes('ICSIT26.jpeg')) {
            this.lightboxImg.src = 'assets/ICSIT26.jpeg';
          }
        };
      }
      const existingPlaceholder = this.lightboxContent?.querySelector('.lightbox-placeholder-preview');
      if (existingPlaceholder) existingPlaceholder.remove();
    } else if (placeholder) {
      if (this.lightboxImg) {
        this.lightboxImg.style.display = 'none';
      }
      let previewEl = this.lightboxContent?.querySelector('.lightbox-placeholder-preview');
      if (!previewEl) {
        previewEl = document.createElement('div');
        previewEl.className = 'lightbox-placeholder-preview';
        this.lightboxContent?.appendChild(previewEl);
      }
      previewEl.style.cssText = 'display:flex; flex-direction:column; align-items:center; justify-content:center; gap:1rem; padding:2.5rem; text-align:center; color:#fff; width:100%; height:100%;';
      previewEl.innerHTML = `
        <div style="font-size: 4rem;">${placeholder.querySelector('span')?.textContent || '📸'}</div>
        <h3 style="font-size: 1.5rem; font-weight: 700; color: #38bdf8;">${caption}</h3>
        <p style="font-size: 0.95rem; color: #94a3b8; max-width: 500px;">${meta}</p>
        <div style="font-family: monospace; font-size: 0.82rem; background: rgba(255,255,255,0.06); border: 1px dashed rgba(6,182,212,0.4); padding: 0.6rem 1.2rem; border-radius: 8px; color: #22d3ee;">
          [YOUR_IMAGE_PATH_HERE] • Provide high-res photograph
        </div>
      `;
    }

    if (this.lightboxCaption) {
      this.lightboxCaption.textContent = caption;
    }
    if (this.lightboxMeta) {
      this.lightboxMeta.textContent = meta;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new PhotoGalleryController();
});
