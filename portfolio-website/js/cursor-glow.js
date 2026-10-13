/**
 * Custom Cursor & Interactive Card Glow Tracking
 * Implements mouse-tracking spotlight gradient over cards + smooth cursor ring
 */
class CursorGlowController {
  constructor() {
    this.dot = document.querySelector('.custom-cursor-dot');
    this.ring = document.querySelector('.custom-cursor-ring');

    this.mouse = { x: -100, y: -100 };
    this.ringPos = { x: -100, y: -100 };
    this.ease = 0.18; // Lerp factor

    this.initCursor();
    this.initCardGlow();
  }

  initCursor() {
    if (!this.dot || !this.ring) return;

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;

      // Position dot directly
      this.dot.style.left = `${this.mouse.x}px`;
      this.dot.style.top = `${this.mouse.y}px`;
    });

    // Hover effect on clickable elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .glass-card, .gallery-item');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => this.ring.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => this.ring.classList.remove('cursor-hover'));
    });

    // Hide on leave window
    document.addEventListener('mouseleave', () => {
      if (this.dot) this.dot.style.opacity = '0';
      if (this.ring) this.ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      if (this.dot) this.dot.style.opacity = '1';
      if (this.ring) this.ring.style.opacity = '1';
    });

    this.renderCursor();
  }

  renderCursor() {
    // Smooth trailing ring lerp
    this.ringPos.x += (this.mouse.x - this.ringPos.x) * this.ease;
    this.ringPos.y += (this.mouse.y - this.ringPos.y) * this.ease;

    if (this.ring) {
      this.ring.style.left = `${this.ringPos.x}px`;
      this.ring.style.top = `${this.ringPos.y}px`;
    }

    requestAnimationFrame(() => this.renderCursor());
  }

  initCardGlow() {
    // Dynamic Spotlight on Cards using event delegation
    document.addEventListener('mousemove', (e) => {
      const cards = document.querySelectorAll('.glass-card, .timeline-card, .github-repo-card');
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        // Check if mouse is somewhat near or inside card
        const isNear = (
          e.clientX >= rect.left - 50 &&
          e.clientX <= rect.right + 50 &&
          e.clientY >= rect.top - 50 &&
          e.clientY <= rect.bottom + 50
        );

        if (isNear) {
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
        }
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new CursorGlowController();
});
