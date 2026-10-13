/**
 * Interactive Academic Timeline Controller
 * Expands/collapses coursework, honors, and subject details on user click/interaction
 */
class AcademicTimelineController {
  constructor() {
    this.timelineCards = document.querySelectorAll('.timeline-card');
    this.init();
  }

  init() {
    this.timelineCards.forEach((card) => {
      // Click event
      card.addEventListener('click', (e) => {
        // Prevent accidental triggers if clicking an external link inside
        if (e.target.tagName === 'A') return;
        this.toggleCard(card);
      });

      // Keyboard accessible (Enter or Space)
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-expanded', 'false');

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleCard(card);
        }
      });
    });
  }

  toggleCard(targetCard) {
    const isExpanded = targetCard.classList.contains('expanded');

    // Optional: Collapse siblings if accordion behavior is preferred
    // For portfolio flexibility, let users expand multiple or toggle current:
    if (isExpanded) {
      targetCard.classList.remove('expanded');
      targetCard.setAttribute('aria-expanded', 'false');
      const hint = targetCard.querySelector('.timeline-toggle-hint span');
      if (hint) hint.textContent = 'View Coursework & Highlights ▼';
    } else {
      targetCard.classList.add('expanded');
      targetCard.setAttribute('aria-expanded', 'true');
      const hint = targetCard.querySelector('.timeline-toggle-hint span');
      if (hint) hint.textContent = 'Hide Details ▲';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new AcademicTimelineController();
});
