/**
 * Projects Filtering, Search & Dynamic Repository Link Controller
 * Real-time category filtering (All, Proper Projects, Mini Projects), live keyword search,
 * and dynamic specific repository URL resolution for GitHub buttons.
 */

const PROJECT_REGISTRY = {
  'vidarbha-urbanization': {
    title: 'Vidarbha Urbanization Impact Analysis',
    repoUrl: 'https://github.com/AashleshaS/vidarbha-urbanization-impact-analysis-'
  },
  'strategic-afforestation': {
    title: 'Strategic Afforestation Dashboard (DSS)',
    repoUrl: 'https://github.com/AashleshaS/Geospatial-Afforestation-Decision-Support-System'
  },
  'quizcraft-ai': {
    title: 'QuizCraft AI — Intelligent Quiz Platform',
    repoUrl: 'https://github.com/AashleshaS/Intelligent-Quiz-Generation-Agent'
  },
  'smart-green-air-quality-monitor': {
    title: 'Smart Green Air Quality Monitor',
    repoUrl: null
  },
  'institute-faq-chatbot': {
    title: 'Rule-Based Institute FAQ Chatbot',
    repoUrl: 'https://github.com/AashleshaS/FAQ-Chatbot'
  }
};

class ProjectsController {
  constructor() {
    this.filterContainer = document.querySelector('.projects-filter-nav');
    this.filterButtons = document.querySelectorAll('.projects-filter-nav .filter-chip-btn');
    this.searchInput = document.querySelector('.project-search-input');
    this.cards = document.querySelectorAll('.project-card');
    this.emptyState = document.getElementById('projects-empty-state');

    this.activeCategory = 'all';
    this.searchQuery = '';

    this.init();
  }

  init() {
    this.initProjectRepoLinks();

    // Event delegation on filter buttons
    if (this.filterContainer) {
      this.filterContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-chip-btn');
        if (!btn) return;

        this.filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        this.activeCategory = btn.dataset.filter || 'all';
        this.applyFilter();
      });
    }

    // Live search input
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        this.applyFilter();
      });
    }
  }

  /**
   * Ensures every project card's GitHub button dynamically targets its dedicated repository
   * URL and never defaults to the generic profile page.
   */
  initProjectRepoLinks() {
    this.cards.forEach((card) => {
      const projectId = card.dataset.projectId;
      const dataRepoUrl = card.dataset.repoUrl;
      const specificUrl = dataRepoUrl || (projectId && PROJECT_REGISTRY[projectId]?.repoUrl);

      const githubBtn = card.querySelector('.project-github-btn, .project-actions a');
      if (githubBtn && specificUrl) {
        githubBtn.setAttribute('href', specificUrl);
        githubBtn.setAttribute('target', '_blank');
        githubBtn.setAttribute('rel', 'noopener noreferrer');

        // Explicit click listener to guarantee proper navigation to the specific repo
        githubBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          // Native browser behavior will follow href with target="_blank"
        });
      }
    });
  }

  applyFilter() {
    let visibleCount = 0;

    this.cards.forEach((card) => {
      const category = card.dataset.category || '';
      const title = card.querySelector('.project-title')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('.project-desc')?.textContent.toLowerCase() || '';
      const tags = Array.from(card.querySelectorAll('.project-tags .badge'))
        .map((b) => b.textContent.toLowerCase())
        .join(' ');

      const matchesCategory =
        this.activeCategory === 'all' || category === this.activeCategory;

      const matchesSearch =
        this.searchQuery === '' ||
        title.includes(this.searchQuery) ||
        desc.includes(this.searchQuery) ||
        tags.includes(this.searchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        // Smooth transition trigger
        requestAnimationFrame(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        });
        visibleCount++;
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
          if (card.style.opacity === '0') {
            card.style.display = 'none';
          }
        }, 200);
      }
    });

    if (this.emptyState) {
      this.emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ProjectsController();
});
